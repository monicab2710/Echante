package com.enchante.apiusers.controller;

import com.enchante.apiusers.controller.payload.LoginRequest;
import com.enchante.apiusers.controller.payload.LoginResponse;
import com.enchante.apiusers.controller.payload.ResetPasswordRequest;
import com.enchante.apiusers.controller.payload.SignUpRequest;
import com.enchante.apiusers.mail.EmailDetails;
import com.enchante.apiusers.mail.EmailService;
import com.enchante.apiusers.model.Role;
import com.enchante.apiusers.model.RoleName;
import com.enchante.apiusers.model.User;
import com.enchante.apiusers.repository.RoleRepository;
import com.enchante.apiusers.repository.UserRepository;
import com.enchante.apiusers.security.AppUser;
import com.enchante.apiusers.security.jwt.JwtUtils;
import com.enchante.apiusers.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.regex.Pattern;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/users/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final UserService userService;
    private final RoleRepository roleRepository;
    private final PasswordEncoder encoder;
    private final JwtUtils jwtUtils;
    private final EmailService emailService;

    public AuthController(AuthenticationManager authenticationManager, UserRepository userRepository, UserService userService, RoleRepository roleRepository, PasswordEncoder encoder, JwtUtils jwtUtils, EmailService emailService) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.userService = userService;
        this.roleRepository = roleRepository;
        this.encoder = encoder;
        this.jwtUtils = jwtUtils;
        this.emailService = emailService;
    }

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest, BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body("Invalid data");
        }
        if (!userRepository.existsUserByEmail(loginRequest.getEmail())) {
            return ResponseEntity.badRequest().body("Error: Email is not registered!");
        }

        try {

            Authentication authentication = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);

            AppUser userDetails = (AppUser) authentication.getPrincipal();

            String jwt = jwtUtils.generateToken(userDetails);

            /*HttpHeaders header = new HttpHeaders();
            header.add("Authorization", "Bearer " + jwt);*/

            //return ResponseEntity.ok().headers(header).body("User signed-in successfully!");

            LoginResponse response = new LoginResponse("User signed-in successfully!", "Bearer " + jwt);

            return ResponseEntity.ok().body(response);

        } catch (BadCredentialsException e) {

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Bad credentials");
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest, BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body("Invalid data");
        }
        if ((!isAlpha(signUpRequest.getName())) || (!isAlpha(signUpRequest.getLastName()))) {
            return ResponseEntity.badRequest().body("Invalid name and/or last name");
        }
        if (!validEmail(signUpRequest.getEmail())) {
            return ResponseEntity.badRequest().body("Invalid email");
        }
        if (!validPassword(signUpRequest.getPassword())) {
            return ResponseEntity.badRequest().body("Invalid password");
        }
        if (userRepository.existsUserByEmail(signUpRequest.getEmail())) {
            return ResponseEntity.badRequest().body("Error: Email is already in use!");
        }

        User user = new User(signUpRequest.getName(),
                signUpRequest.getLastName(),
                signUpRequest.getUserName(),
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()));

        Role role = roleRepository.findRoleByName(RoleName.ROLE_USER);
        user.setRole(role);
        userRepository.save(user);

        EmailDetails emailDetails = new EmailDetails();
        emailDetails.setRecipient(signUpRequest.getEmail());
        emailDetails.setSubject("¡Hola " + signUpRequest.getName() + "! Registro Exitoso - Enchanté");
        emailService.sendMail(emailDetails);

        return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully!");
    }

    /*
    @PostMapping("/signoff")
    public ResponseEntity<?> logoutUser(HttpServletRequest request) {
        return null;
    }
    */

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestParam String email) {

        Boolean isValidEmail = validEmail(email);
        if (!isValidEmail) {
            return ResponseEntity.badRequest().body("Invalid email");
        }

        String token = userService.forgotPassword(email);

        if (token == null) {
            return ResponseEntity.badRequest().body("Error: Email is not registered!");
        }

        String siteURL = "http://ec2-35-173-255-106.compute-1.amazonaws.com:3000/reset-password";

        String resetPasswordLink = siteURL + "?token=" + token;
        EmailDetails emailDetails = new EmailDetails();
        emailDetails.setRecipient(email);

        emailService.forgotPasswordMail(email, resetPasswordLink);
        return ResponseEntity.ok().body("We have sent a reset password link to your email. Please check.");

    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest request) {

        String message = userService.resetPassword(request);

        if (message.contains("Token")) {
            return ResponseEntity.badRequest().body(message);
        }

        return ResponseEntity.ok().body("You have successfully changed your password.");

    }

    public Boolean validEmail(String email) {

        String regexPatter = "^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$";

        return Pattern.compile(regexPatter).matcher(email).matches();
    }

    public Boolean isAlpha(String s) {

        String regexPattern = "^[a-zA-Z]*$";
        return Pattern.compile(regexPattern).matcher(s).matches();
    }

    public Boolean validPassword(String password) {

        String regexPattern = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\\S+$).{6,20}$";
        return Pattern.compile(regexPattern).matcher(password).matches();
    }

}
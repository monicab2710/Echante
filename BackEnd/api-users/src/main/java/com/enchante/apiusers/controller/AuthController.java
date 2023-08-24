package com.enchante.apiusers.controller;

import com.enchante.apiusers.controller.payload.LoginRequest;
import com.enchante.apiusers.controller.payload.LoginResponse;
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

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/users/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder encoder;
    private final JwtUtils jwtUtils;
    private final EmailService emailService;

    public AuthController(AuthenticationManager authenticationManager, UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder encoder, JwtUtils jwtUtils, EmailService emailService) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
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

}
package com.enchante.apiusers.service;

import com.enchante.apiusers.controller.payload.ResetPasswordRequest;
import com.enchante.apiusers.dto.UserDTO;
import com.enchante.apiusers.model.Role;
import com.enchante.apiusers.model.User;
import com.enchante.apiusers.repository.RoleRepository;
import com.enchante.apiusers.repository.UserRepository;
import net.bytebuddy.utility.RandomString;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.password.Pbkdf2PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final ModelMapper modelMapper;
    private final PasswordEncoder encoder;

    public UserServiceImpl(UserRepository userRepository, RoleRepository roleRepository, ModelMapper modelMapper, PasswordEncoder encoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.modelMapper = modelMapper;
        this.encoder = new Pbkdf2PasswordEncoder();
    }

    @Override
    public UserDTO getUserById(Integer id) {

        User user = userRepository.findById(id).orElse(null);

        if (user != null) {
            return modelMapper.map(user, UserDTO.class);
        }
        return null;
    }

    @Override
    public List<UserDTO> getAllUsers() {

        List<User> users = userRepository.findAll();
        List<UserDTO> usersDTO = new ArrayList<>();

        for (User user : users) {

            UserDTO uDTO = modelMapper.map(user, UserDTO.class);
            usersDTO.add(uDTO);
        }

        return usersDTO;
    }

    @Override
    public UserDTO createUser(UserDTO user) {

        if (userRepository.existsUserByEmail(user.getEmail())) {
            return null;
        }

        if (roleRepository.existsById(user.getRoleId())) {
            Role role = roleRepository.findById(user.getRoleId()).get();
            User u = modelMapper.map(user, User.class);
            u.setPassword(encoder.encode(user.getPassword()));
            u.setRole(role);
            userRepository.save(u);
            return modelMapper.map(u, UserDTO.class);
        }

        return null;

    }

    @Override
    public UserDTO updateUser(Integer id, UserDTO user) {

        User found = userRepository.findById(id).orElse(null);

        if (found != null) {

            if (!user.getEmail().equals(found.getEmail()) && userRepository.existsUserByEmail(user.getEmail())) {
                return null;
            }

            Role role = roleRepository.findById(user.getRoleId()).get();
            User u = modelMapper.map(user, User.class);
            u.setId(id);
            u.setPassword(encoder.encode(user.getPassword()));
            u.setRole(role);
            u = userRepository.save(u);
            return modelMapper.map(u, UserDTO.class);

        }

        return null;
    }

    @Override
    public void deleteUser(Integer id) {

        userRepository.deleteById(id);
    }

    @Override
    public String forgotPassword(String email) {

        User user = userRepository.findByEmail(email).orElse(null);
        if (user != null) {

            //String token = RandomString.make(255);
            String token = UUID.randomUUID().toString();
            user.setResetToken(token);
            userRepository.save(user);
            return token;
        }
        return null;
    }

    @Override
    public String resetPassword(ResetPasswordRequest request) {

        User user = userRepository.findByResetToken(request.getToken()).orElse(null);

        if (user != null) {

            user.setPassword(encoder.encode(request.getPassword()));
            user.setResetToken(null);
            userRepository.save(user);
            return "Password reset succeed";
        }
        return null;
    }

}
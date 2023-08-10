package com.enchante.apiusers.service;

import com.enchante.apiusers.dto.UserDTO;
import com.enchante.apiusers.model.User;
import com.enchante.apiusers.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    public UserServiceImpl(UserRepository userRepository, ModelMapper modelMapper) {
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
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

        User u = modelMapper.map(user, User.class);
        userRepository.save(u);
        return modelMapper.map(u, UserDTO.class);

    }

    @Override
    public UserDTO updateUser(Integer id, UserDTO user) {

        User found = userRepository.findById(id).orElse(null);

        if (found != null) {

            if (!user.getEmail().equals(found.getEmail()) && userRepository.existsUserByEmail(user.getEmail())) {
                return null;
            }

            User u = modelMapper.map(user, User.class);
            u.setId(id); // Asegurar que el ID sea el correcto
            u = userRepository.save(u);
            return modelMapper.map(u, UserDTO.class);

        }

        return null;
    }

    @Override
    public void deleteUser(Integer id) {

        userRepository.deleteById(id);
    }

}
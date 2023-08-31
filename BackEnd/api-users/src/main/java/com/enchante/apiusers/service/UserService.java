package com.enchante.apiusers.service;

import com.enchante.apiusers.controller.payload.ResetPasswordRequest;
import com.enchante.apiusers.dto.UserDTO;

import java.util.List;

public interface UserService {

    UserDTO getUserById(Integer id);

    List<UserDTO> getAllUsers();

    UserDTO createUser(UserDTO user);

    UserDTO updateUser(Integer id, UserDTO user);

    void deleteUser(Integer id);

    String forgotPassword(String email);

    String resetPassword(ResetPasswordRequest password);

}
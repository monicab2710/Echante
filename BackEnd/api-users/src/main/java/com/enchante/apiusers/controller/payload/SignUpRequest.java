package com.enchante.apiusers.controller.payload;

import lombok.Data;

@Data
public class SignUpRequest {

    private String name;
    private String lastName;
    private String userName;
    private String email;
    private String password;

}
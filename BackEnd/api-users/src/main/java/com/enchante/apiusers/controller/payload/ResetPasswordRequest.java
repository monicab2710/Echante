package com.enchante.apiusers.controller.payload;

import lombok.Data;

@Data
public class ResetPasswordRequest {

    private String token;
    private String password;

}
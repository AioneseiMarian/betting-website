package com.betting.backend.model.dto;

import lombok.Data;

@Data
public class AuthResponse {
    private String token;
    private UserDto user;
}
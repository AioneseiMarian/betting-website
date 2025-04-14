package com.betting.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/protected")
public class ProtectedController {
    @GetMapping("/resource")
    public String getProtectedResource() {
        return "This is a protected resource!";
    }
}
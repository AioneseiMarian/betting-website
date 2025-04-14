package com.betting.backend.model;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import jakarta.validation.constraints.NotBlank;

@Document(collection = "users")
@Data
public class User {
    @Id
    private String id;

    @NotBlank(message = "Email is required")
    @Indexed(unique = true) // Ensure email is unique in the collection
    private String email;

    @NotBlank(message = "Username is required")
    private String username;

    @NotBlank(message = "Password is required")
    private String password;

    @NotBlank(message = "User must have a role")
    private String role;
}

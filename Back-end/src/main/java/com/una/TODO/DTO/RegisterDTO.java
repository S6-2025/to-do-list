package com.una.TODO.DTO;

import com.una.TODO.Enum.Role;

public record RegisterDTO(
        String name,
        String email,
        String password,
        Role role
) {
}

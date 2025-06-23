package com.una.TODO.DTO;

import com.una.TODO.Enum.Role;

public record UpdateUserDTO(
        String name,
        String email,
        String password,
        Role role
) {
}

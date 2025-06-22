package com.una.TODO.DTO;

import com.una.TODO.Enum.Role;
import com.una.TODO.Models.Task;

import java.util.List;

public record UserDTO(
        String name,
        String email,
        Role role,
        List<Task> tasks
) {
}

package com.una.TODO.DTO;

import com.una.TODO.Enum.Role;
import java.util.List;

public record UserDTO(
        String name,
        String email,
        Role role,
        List<TaskResponseDTO> tasks
) {}

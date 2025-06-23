package com.una.TODO.DTO;

import com.una.TODO.Enum.Priority;
import com.una.TODO.Enum.Status;
import com.una.TODO.Models.User;

import java.time.LocalDate;

public record CreateTaskDTO(
        String title,
        String description,
        LocalDate startDate,
        LocalDate endDate,
        Priority priority,
        Status status,
        String ownerEmail
) {
}

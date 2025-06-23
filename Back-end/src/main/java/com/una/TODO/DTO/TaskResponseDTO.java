package com.una.TODO.DTO;

import com.una.TODO.Enum.Priority;
import com.una.TODO.Enum.Status;

import java.time.LocalDate;
import java.util.UUID;

public record TaskResponseDTO(
        UUID id,
        String title,
        String description,
        LocalDate startDate,
        LocalDate endDate,
        Priority priority,
        Status status,
        String ownerEmail
) {}

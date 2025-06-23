package com.una.TODO.Mapper;

import com.una.TODO.DTO.CreateTaskDTO;
import com.una.TODO.DTO.TaskResponseDTO;
import com.una.TODO.DTO.UpdateTaskDTO;
import com.una.TODO.Models.Task;
import com.una.TODO.Models.User;
import com.una.TODO.Repository.UserRepository;

public class TaskMapper {

    public static Task mapTask(CreateTaskDTO taskDTO, UserRepository userRepository){
        User owner = userRepository.findUserByEmail(taskDTO.ownerEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Task task = new Task(
                taskDTO.title(),
                taskDTO.description(),
                taskDTO.startDate(),
                taskDTO.endDate(),
                taskDTO.priority(),
                taskDTO.status()
        );

        task.setOwner(owner);

        return task;
    }


    public static void updateTaskFromDTO(Task existingTask, UpdateTaskDTO dto) {
        if (dto.title() != null) existingTask.setTitle(dto.title());
        if (dto.description() != null) existingTask.setDescription(dto.description());
        if (dto.startDate() != null) existingTask.setStartDate(dto.startDate());
        if (dto.endDate() != null) existingTask.setEndDate(dto.endDate());
        if (dto.priority() != null) existingTask.setPriority(dto.priority());
        if (dto.status() != null) existingTask.setStatus(dto.status());
    }

    public static TaskResponseDTO toDTO(Task task) {
        return new TaskResponseDTO(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.getStartDate(),
                task.getEndDate(),
                task.getPriority(),
                task.getStatus(),
                task.getOwner() != null ? task.getOwner().getEmail() : null
        );
    }

}

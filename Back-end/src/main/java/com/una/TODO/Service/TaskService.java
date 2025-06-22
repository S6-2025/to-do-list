package com.una.TODO.Service;

import com.una.TODO.DTO.CreateTaskDTO;
import com.una.TODO.DTO.UpdateTaskDTO;
import com.una.TODO.Models.Task;
import com.una.TODO.Models.User;
import com.una.TODO.Repository.TaskRepository;
import com.una.TODO.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

//import java.lang.reflect.Field;
import java.util.Comparator;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public List<Task> getTasks(){
        List<Task> tasks = taskRepository.findAll();
        if(tasks.isEmpty()){
            throw new RuntimeException("No tasks available");
        }
        return tasks;
    }

    public List<Task> getTasks(String ownerEmail){
        User owner = userRepository.findUserByEmail(ownerEmail)
                .orElseThrow(() -> new RuntimeException("No such user!"));
        List<Task> tasks = taskRepository.findTasksByOwner(owner)
                .orElseThrow(() -> new RuntimeException("No tasks available"));


        return tasks.stream()
                .sorted(
                        Comparator.comparing((Task task) -> task.getPriority().getLevel())
                                .thenComparing(Task::getEndDate)
                )
                .toList();
    }

    public String createTask(CreateTaskDTO task){
        taskRepository.save(TaskMapper.mapTask(task));
        return "Task created successfully";
    }

    public Task updateTask(UUID taskId, UpdateTaskDTO dto) {
        Task existingTask = taskRepository.findTaskById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found!"));

        TaskMapper.updateTaskFromDTO(existingTask, dto);

        return taskRepository.save(existingTask);
    }



    public void deleteTask(UUID taskId){
        Task task = taskRepository.findTaskById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found!"));

        taskRepository.delete(task);
    }



}
class TaskMapper{
    public static Task mapTask(CreateTaskDTO taskDTO){
        return new Task(
                taskDTO.title(),
                taskDTO.description(),
                taskDTO.startDate(),
                taskDTO.endDate(),
                taskDTO.priority(),
                taskDTO.status()
        );

    }

    public static void updateTaskFromDTO(Task existingTask, UpdateTaskDTO dto) {
        if (dto.title() != null) existingTask.setTitle(dto.title());
        if (dto.description() != null) existingTask.setDescription(dto.description());
        if (dto.startDate() != null) existingTask.setStartDate(dto.startDate());
        if (dto.endDate() != null) existingTask.setEndDate(dto.endDate());
        if (dto.priority() != null) existingTask.setPriority(dto.priority());
        if (dto.status() != null) existingTask.setStatus(dto.status());
    }


}
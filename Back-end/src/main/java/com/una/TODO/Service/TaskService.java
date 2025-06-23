package com.una.TODO.Service;

import com.una.TODO.DTO.CreateTaskDTO;
import com.una.TODO.DTO.UpdateTaskDTO;
import com.una.TODO.Mapper.TaskMapper;
import com.una.TODO.Models.Task;
import com.una.TODO.Models.User;
import com.una.TODO.Repository.TaskRepository;
import com.una.TODO.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    @Transactional
    public String createTask(CreateTaskDTO task){
        taskRepository.save(TaskMapper.mapTask(task,userRepository));
        return "Task created successfully";
    }

    @Transactional
    public Task updateTask(UUID taskId, UpdateTaskDTO dto) {
        Task existingTask = taskRepository.findTaskById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found!"));

        TaskMapper.updateTaskFromDTO(existingTask, dto);

        return taskRepository.save(existingTask);
    }


    @Transactional
    public void deleteTask(UUID taskId){
        Task task = taskRepository.findTaskById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found!"));

        User owner = task.getOwner();
        if(owner != null){
            owner.getTasks().remove(task); // remove da lista do user
            task.setOwner(null);            // remove referência no task
        }

        taskRepository.delete(task);
    }


}

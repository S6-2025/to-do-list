package com.una.TODO.Service;

import com.una.TODO.DTO.CreateTaskDTO;
import com.una.TODO.Models.Task;
import com.una.TODO.Models.User;
import com.una.TODO.Repository.TaskRepository;
import com.una.TODO.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.lang.reflect.Field;
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

    public Task updateTask(UUID taskId, Task updatedData){
        Task existingTask = taskRepository.findTaskById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found!"));

        return TaskMapper.checkAndUpdateFields(existingTask, updatedData);
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

    public static Task checkAndUpdateFields(Task existingTask, Task updateData) {
        Field[] fields = updateData.getClass().getFields();

        for (Field field : fields) {
            try {
                field.setAccessible(true);
                Object value = field.get(updateData);

                if (value != null) {
                    String fieldName = field.getName();
                    try {
                        Field userField = existingTask.getClass().getDeclaredField(fieldName);
                        userField.setAccessible(true);
                        userField.set(existingTask, value);
                        userField.setAccessible(false);
                    } catch (NoSuchFieldException e) {
                        System.out.println("Field doesnt exist in User class!");
                    }
                }
            } catch (Exception e) {
                e.printStackTrace();
            }

        }
        return existingTask;
    }
}
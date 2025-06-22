package com.una.TODO.Controllers;

import com.una.TODO.DTO.CreateTaskDTO;
import com.una.TODO.Models.Task;
import com.una.TODO.Service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService service;

    @GetMapping("/all")
    public ResponseEntity<Object> getAllTasks(){
        try{
            List<Task> tasks = service.getTasks();
            return ResponseEntity.ok(Map.ofEntries(
                    Map.entry("tasks", tasks)
            ));
        }catch (RuntimeException e){
            return ResponseEntity.status(404).body(e.getMessage());
        }catch (Exception e){
            return ResponseEntity.status(500).body("An unexpected error occurred!");
        }
    }
    @GetMapping("/")
    public ResponseEntity<Object> getTasksByOwner(@RequestParam(name = "email")String email){
        try{
            List<Task> tasks = service.getTasks(email);
            return ResponseEntity.ok(Map.ofEntries(
                    Map.entry("tasks", tasks)
            ));
        }catch (RuntimeException e){
            return ResponseEntity.status(404).body(e.getMessage());
        }catch (Exception e){
            return ResponseEntity.status(500).body("An unexpected error occurred!");
        }
    }

    @PostMapping("/create")
    @PreAuthorize("hasRole('PO') OR hasRole('SM')")

    public ResponseEntity<Object> createTask(@RequestBody CreateTaskDTO task){
        System.out.println("Chamei o create de task");
        try{
            return ResponseEntity.ok(service.createTask(task));
        }catch (RuntimeException e){
            return ResponseEntity.status(404).body(e.getMessage());
        }catch (Exception e){
            return ResponseEntity.status(500).body("An unexpected error occurred!");
        }
    }
}

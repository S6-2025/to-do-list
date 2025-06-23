package com.una.TODO.Controllers;

import com.una.TODO.DTO.CreateTaskDTO;
import com.una.TODO.DTO.TaskResponseDTO;
import com.una.TODO.DTO.UpdateTaskDTO;
import com.una.TODO.Models.Task;
import com.una.TODO.Mapper.TaskMapper;
import com.una.TODO.Service.TaskService;
import lombok.RequiredArgsConstructor;
import java.util.UUID;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService service;

    @GetMapping("/all")
    public ResponseEntity<Object> getAllTasks() {
        try {
            List<Task> tasks = service.getTasks();
            List<TaskResponseDTO> taskDTOs = tasks.stream()
                    .map(TaskMapper::toDTO)
                    .toList();

            return ResponseEntity.ok(Map.of("tasks", taskDTOs));
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        } catch (Exception e) {
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


//    delete:
    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('PO') OR hasRole('SM')")
    public ResponseEntity<Object> deleteTask(@PathVariable UUID id) {
        System.out.println("Deleting task with ID: " + id);
        try {
            service.deleteTask(id);
            return ResponseEntity.ok("Task deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An unexpected error occurred!");
        }
    }


    @PutMapping("/update/{id}")
    @PreAuthorize("hasRole('PO') OR hasRole('SM')")
    public ResponseEntity<Object> updateTask(@PathVariable UUID id, @RequestBody UpdateTaskDTO dto) {
        try {
            Task updated = service.updateTask(id, dto);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An unexpected error occurred!");
        }
    }




//    Testando o catch de role:

    @GetMapping("/check-role")
    public ResponseEntity<Object> checkRole() {
        var auth = SecurityContextHolder.getContext().getAuthentication();
        System.out.println("Auth: " + auth);
        if (auth == null) return ResponseEntity.status(401).body("Não autenticado");

        return ResponseEntity.ok(auth.getAuthorities());
    }

}

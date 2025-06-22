package com.una.TODO.Controllers;

import com.una.TODO.DTO.UpdateUserDTO;
import com.una.TODO.DTO.UserDTO;
import com.una.TODO.Models.User;
import com.una.TODO.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService service;

    @GetMapping("/user")
    public ResponseEntity<Object> getUserByEmail(@RequestParam(name="email") String email){
        try{
            UserDTO user = service.getUser(email);
            return ResponseEntity.ok(
                    Map.ofEntries(
                            Map.entry("user", user)
                    )
            );
        }
        catch (RuntimeException e){
            return ResponseEntity.status(404).body(e.getMessage());
        }
        catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.status(500).body("An unexpected error occurred!");
        }
    }

    @PatchMapping("/user")
    public ResponseEntity<Object> updateUser(@RequestParam(name="email") String email,  @RequestBody UpdateUserDTO updateData) {
        try{
            String tokenUpdated = service.updateUser(email, updateData);
            return ResponseEntity.ok(Map.ofEntries(Map.entry("token", tokenUpdated)));
        }catch (RuntimeException e){
            return ResponseEntity.status(404).body(e.getMessage());
        }
        catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.status(500).body("An unexpected error occurred!");
        }
    }

    @DeleteMapping("/user")
    @PreAuthorize("hasRole('PO') OR hasRole('SM')")
    public ResponseEntity<Object> deleteUser(@RequestParam(name = "email")String email){
        try{
            service.deleteUser(email);
            return ResponseEntity.ok("User deleted successfully");
        }catch (RuntimeException e){
            return ResponseEntity.status(404).body(e.getMessage());
        }
        catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.status(500).body("An unexpected error occurred!");
        }
    }





}

package com.una.TODO.Controllers;


import com.una.TODO.DTO.LoginDTO;
import com.una.TODO.DTO.RegisterDTO;
import com.una.TODO.Service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService service;

    @GetMapping("/login")
    public ResponseEntity<Object> login(@RequestBody LoginDTO loginData){
        try{
            String token = service.login(loginData);
            return ResponseEntity.ok(
                    Map.ofEntries(
                            Map.entry("token", token)
                    )
            );
        }catch (RuntimeException e){
            return ResponseEntity.status(404).body(e.getMessage());
        }catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.status(500).body("An unexpected error occurred!");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<Object> register(@RequestBody RegisterDTO registerData){
        try{
            String token = service.register(registerData);
            return ResponseEntity.ok(
                    Map.ofEntries(
                            Map.entry("token", token)
                    )
            );
        }catch (RuntimeException e){
            return ResponseEntity.status(404).body(e.getMessage());
        }catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.status(500).body("An unexpected error occurred!");
        }
    }



}

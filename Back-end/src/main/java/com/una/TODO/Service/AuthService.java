package com.una.TODO.Service;

import com.una.TODO.DTO.LoginDTO;
import com.una.TODO.DTO.RegisterDTO;
import com.una.TODO.Infra.Security.TokenService;
import com.una.TODO.Models.User;
import com.una.TODO.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Objects;

import static java.util.Map.entry;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;



    public String login(LoginDTO loginData){
        User user = userRepository.findUserByEmail(loginData.email())
                .orElseThrow(() -> new RuntimeException("User not Found!"));
        if(!passwordEncoder.matches(loginData.password(), user.getPassword())){
            throw new RuntimeException("Wrong email or password!");
        }
        return tokenService.generateToken(user);
    }

    public String register(RegisterDTO registerData){
        if(userRepository.findUserByEmail(registerData.email()).isPresent()){
            throw new RuntimeException("User already registered");
        }

        User newUser = new User(
                registerData.name(),
                registerData.email(),
                passwordEncoder.encode(registerData.password()),
                registerData.role()
        );
        userRepository.save(newUser);
        return tokenService.generateToken(newUser);
    }

}

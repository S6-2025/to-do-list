package com.una.TODO.Service;

import com.una.TODO.DTO.TaskResponseDTO;
import com.una.TODO.DTO.UpdateUserDTO;
import com.una.TODO.DTO.UserDTO;
import com.una.TODO.Infra.Security.TokenService;
import com.una.TODO.Mapper.TaskMapper;
import com.una.TODO.Models.User;
import com.una.TODO.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import java.util.UUID;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.lang.reflect.Field;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    public UserDTO getUserById(UUID id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<TaskResponseDTO> taskDTOs = user.getTasks().stream()
                .map(TaskMapper::toDTO)
                .toList();

        return new UserDTO(
                user.getName(),
                user.getEmail(),
                user.getRole(),
                taskDTOs
        );
    }

    public UserDTO getUser(String email) {
        User user = userRepository.findUserByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<TaskResponseDTO> taskDTOs = user.getTasks().stream()
                .map(TaskMapper::toDTO)
                .toList();

        return new UserDTO(
                user.getName(),
                user.getEmail(),
                user.getRole(),
                taskDTOs
        );
    }


    @Transactional
    public String updateUser(String email, UpdateUserDTO data) {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        String authenticatedEmail;

        if (principal instanceof User) {
            authenticatedEmail = ((User) principal).getEmail();
        } else if (principal instanceof String) {
            authenticatedEmail = (String) principal;
        } else {
            throw new RuntimeException("Usuário autenticado inválido");
        }

        System.out.println("Email recebido: " + email);
        System.out.println("Usuário autenticado: " + authenticatedEmail);

        if (!authenticatedEmail.trim().equalsIgnoreCase(email.trim())) {
            throw new RuntimeException("Você não tem permissão para alterar outro usuário.");
        }

        User existingUser = userRepository.findUserByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado!"));

        User updatedUser = UserMapper.checkAndUpdateFields(existingUser, data, passwordEncoder);
        System.out.println("Campos atualizados no usuário:");
        System.out.println(existingUser);
        userRepository.save(updatedUser); // Não esqueça de salvar

        return tokenService.generateToken(updatedUser);
    }

    public void deleteUser(String email){
        User user = userRepository.findUserByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found!"));

        userRepository.delete(user);
    }

}
@RequiredArgsConstructor
    class UserMapper{
        public static UserDTO mapUser(User user) {
            return new UserDTO(
                    user.getName(),
                    user.getEmail(),
                    user.getRole(),
                    user.getTasks().stream()
                            .map(TaskMapper::toDTO)
                            .collect(Collectors.toList())
            );

        }

    public static User checkAndUpdateFields(User user, UpdateUserDTO updateData, PasswordEncoder passwordEncoder){
        Field[] fields = updateData.getClass().getDeclaredFields();


        for(Field field : fields){
            try{
                field.setAccessible(true);
                Object value = field.get(updateData);

                if(value != null){
                    String fieldName = field.getName();
                    try{
                        Field userField = user.getClass().getDeclaredField(fieldName);
                        userField.setAccessible(true);

                        if(fieldName.equals("password")){
                            userField.set(user, passwordEncoder.encode((CharSequence) value));
                        }else{
                            userField.set(user, value);
                        }

                        userField.setAccessible(false);
                    }catch (NoSuchFieldException e){
                        System.out.println("Field doesnt exist in User class!");
                    }
                }


            }catch (Exception e){
                System.out.println(e.getMessage());
            }
        }
        return user;
    }
}
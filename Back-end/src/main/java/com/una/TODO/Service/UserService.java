package com.una.TODO.Service;

import com.una.TODO.DTO.UpdateUserDTO;
import com.una.TODO.DTO.UserDTO;
import com.una.TODO.Infra.Security.TokenService;
import com.una.TODO.Models.User;
import com.una.TODO.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.lang.reflect.Field;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    public UserDTO getUser(String email){
        User user = userRepository.findUserByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found!"));
        return UserMapper.mapUser(user);
    }

    public String updateUser(String email, UpdateUserDTO data){
        User existingUser = userRepository.findUserByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found!"));
        User updatedUser = UserMapper.checkAndUpdateFields(existingUser, data, passwordEncoder);
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
                user.getTasks()
        );

    }

    public static User checkAndUpdateFields(User user, UpdateUserDTO updateData, PasswordEncoder passwordEncoder){
        Field[] fields = updateData.getClass().getFields();

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
                e.printStackTrace();
            }
        }
        return user;
    }
}
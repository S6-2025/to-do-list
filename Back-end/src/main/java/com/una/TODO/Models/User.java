package com.una.TODO.Models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.una.TODO.Enum.Role;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
@Table(name = "users")
@RequiredArgsConstructor
@AllArgsConstructor
@NoArgsConstructor
public class User{
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    @NonNull private String name;

    @Column(nullable = false)
    @NonNull private String email;

    @Column(nullable = false)
    @NonNull private String password;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    @NonNull private Role role;

    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonManagedReference
    List<Task>tasks;

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", role=" + role +
                ", password='" + password + '\'' +
                '}';
    }
}

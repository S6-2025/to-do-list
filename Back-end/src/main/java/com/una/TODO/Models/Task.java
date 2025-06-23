package com.una.TODO.Models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.una.TODO.Enum.Priority;
import com.una.TODO.Enum.Status;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Getter
@Setter
@Table(name = "tasks")
@RequiredArgsConstructor
@AllArgsConstructor
@NoArgsConstructor
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    @NonNull private String title;

    @Column(nullable = false)
    @NonNull private String description;

    @Column(nullable = false)
    @NonNull private LocalDate startDate;

    @Column(nullable = false)
    @NonNull private LocalDate endDate;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    @NonNull private Priority priority;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    @NonNull private Status status;

    @ManyToOne()
    @JoinColumn(name = "owner_id", referencedColumnName = "id")
    @JsonBackReference
    private User owner;

}

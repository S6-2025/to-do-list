package com.una.TODO.Repository;

import com.una.TODO.Models.Task;
import com.una.TODO.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TaskRepository extends JpaRepository<Task, UUID> {
    Optional<Task> findTaskById(UUID id);
    Optional<Task> findTaskByTitle(String title);
    Optional<List<Task>> findTasksByOwner(User user);
}

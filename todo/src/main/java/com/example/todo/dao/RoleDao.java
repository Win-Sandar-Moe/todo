package com.example.todo.dao;

import com.example.todo.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleDao extends JpaRepository<Role,Long> {
    Optional<Role> findByRoleName(String roleName);
}

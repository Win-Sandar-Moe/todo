package com.example.todo.dao;

import com.example.todo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserDao extends JpaRepository<User,Long> {
@Query("""
        select u from User u where u.username = :userNameEmail or
                 u.email = :userNameEmail
        
        """)
Optional<User> findByUsernameOrEmail(@Param("userNameEmail") String userNameEmail);
}

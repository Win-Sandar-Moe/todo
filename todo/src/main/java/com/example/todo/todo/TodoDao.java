package com.example.todo.todo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TodoDao extends JpaRepository<Todo,Long> {

@Query("""
    select t from Todo t where t.user.username=:username
""")
    List<Todo>findAllTodos(@Param("username") String username);

}

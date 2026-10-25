package com.example.todo.todo;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PostFilter;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/todos")
@RequiredArgsConstructor

public class TodoController {
    private final TodoService todoService;
    private final TodoDao todoDao;
    @GetMapping
    public List<TodoResponse> getTodos(){
        return todoService.getTodos().stream()
                .map(this::todoResponse)
                .toList();
    }
    @GetMapping("/v2")
    public List<TodoResponse>getTodosV2(Principal principal){
        return todoService.getTodosV2(principal.getName()).stream()
                .map(this::todoResponse)
                .toList();
    }


    @PutMapping("/{id}")
    public TodoResponse toChangeCompletedStatus(@PathVariable Long id) {
        return todoResponse(todoService.toChangeCompletedStatus(id));
    }
    public record TodoResponse(
            Long id,
            String title,
            String description,
            boolean isCompleted){

    }
    @PostMapping
    public TodoResponse createTodo(@RequestBody TodoDto todoDto, Principal principal) {
        IO.println("User name:"+ principal.getName());
        return todoResponse(todoService.createTodo(todoDto,principal.getName()));
    }
    private TodoResponse todoResponse(Todo todo){
        return new TodoResponse(
                todo.getId(),
                todo.getTitle(),
                todo.getDescription(),
                todo.isCompleted());

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable Long id){
        todoService.deleteTodo(id);
        return ResponseEntity.ok().build();
    }


}

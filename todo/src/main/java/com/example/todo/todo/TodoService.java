package com.example.todo.todo;

import com.example.todo.dao.UserDao;
import com.example.todo.entity.User;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PostFilter;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TodoService {
    private final TodoDao todoDao;
    private final UserDao userDao;

    @Transactional
    public Todo createTodo(TodoDto todoDto,String username){
        var todo=new Todo(
                todoDto.title(),
                todoDto.description(),
                false);
        todo.setUser(getUser(username));
        return todoDao.save(todo);
    }
    private User getUser(String username) {
        return userDao.findByUsernameOrEmail(username)
                .orElse(null);
    }

    @PostAuthorize("returnObject != null && returnObject.user.username == authentication.name")
    @Transactional
    public Todo toChangeCompletedStatus(Long id) {
        Todo todo=todoDao.findById(id)
                .orElse(null);
        todo.setCompleted(!todo.isCompleted());
        return todoDao.save(todo);
    }

    @PostFilter("filterObject.user.username == authentication.name")
    public List<Todo> getTodos(){
        return todoDao.findAll();
    }

    public List<Todo> getTodosV2(String username){
        return todoDao.findAllTodos(username);
    }

    public void deleteTodo(long id){
        todoDao.deleteById(id);
    }

}


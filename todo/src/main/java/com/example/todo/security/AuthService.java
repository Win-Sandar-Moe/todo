package com.example.todo.security;

import com.example.todo.dao.RoleDao;
import com.example.todo.dao.UserDao;
import com.example.todo.entity.Role;
import com.example.todo.entity.User;
import lombok.RequiredArgsConstructor;

import org.jspecify.annotations.NonNull;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserDao userDao;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final RoleDao roleDao;

    public String login(String userNameEmail,String password){
        var auth=new UsernamePasswordAuthenticationToken(userNameEmail,password);
        Authentication authentication=authenticationManager.authenticate(auth);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return "%s login successfull.".formatted(authentication.getName());
    }


    public String register(String username,
                           String password,
                           String email){
        return register(createUser(username, password, email)
                ,"ROLE_USER");
    }

    private @NonNull User createUser(String username, String password, String email) {
        return new User(
                username,
                passwordEncoder.encode(password),
                email
        );

    }

    private String register(User user,String roleName) {
        roleDao.findByRoleName(roleName)
                .ifPresentOrElse(r ->{
                    user.addRole(r);
                    userDao.save(user);
                },()->{
                    Role role=new Role();
                    role.setRoleName(roleName);
                    user.addRole(roleDao.save(role));
                    userDao.save(user);
                });
        return "User registered successfully";
    }
}
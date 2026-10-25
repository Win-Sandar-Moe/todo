package com.example.todo.security;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;
    public record RegisterDto(String username,String password,String email){ }
    public record LoginDto(String userNameEmail,String password){}

@PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginDto loginDto){
        return ResponseEntity.ok(authService.login(
                loginDto.userNameEmail,
                loginDto.password
        ));
    }


    @PostMapping("/register")
    public ResponseEntity<String> register(
            @RequestBody RegisterDto registerDto
    ){
        return ResponseEntity.ok(authService.register(
                registerDto.username,
                registerDto.password,
                registerDto.email
        ));
    }
}

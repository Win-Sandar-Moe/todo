package com.example.todo.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name="users")
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    @Column(unique=true)
    private String username;
    private String password;
    private String email;


    public User(String username, String password, String email) {
        this.username = username;
        this.password = password;
        this.email = email;
    }
    @ManyToMany(fetch=FetchType.EAGER)
    @JoinTable(name="user_roles",
    joinColumns=@JoinColumn(name="user_id"),
    inverseJoinColumns = @JoinColumn(name="role_id"))
    private Set<Role> roles=new HashSet<>();
    public void addRole(Role role){
        this.roles.add(role);
    }




}

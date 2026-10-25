package com.example.todo.security;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.Nullable;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.List;

@Configuration
@RequiredArgsConstructor
@EnableMethodSecurity
public class SecurityConfig {
    private final UserDetailsService userDetailsService;
    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config
    ) throws Exception{
        return config.getAuthenticationManager();

    }
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)throws Exception{
       http.httpBasic(Customizer.withDefaults());

        http.authorizeHttpRequests(c->{

            c.requestMatchers("/api/auth/**").permitAll();
            c.anyRequest().authenticated();
        });
        http.cors(
                c->{
                    CorsConfigurationSource source=new CorsConfigurationSource()
                    {
                        @Override
                        public @Nullable CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
                            CorsConfiguration cors=
                                    new CorsConfiguration();
                            cors.setAllowedHeaders(List.of("*"));
                            cors.setAllowedMethods(List.of("*"));
                            cors.setAllowedOrigins(List.of("http://localhost:5173"));
                            cors.setExposedHeaders(List.of("*"));
                            cors.setAllowCredentials(true);
                            return cors;
                        }
                    };
                c.configurationSource(source);
                }
        );
        http.sessionManagement(s->
                s.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        http.csrf(c->c.disable());
        return http.build();
    }

}

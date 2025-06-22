package com.una.TODO.Infra.Security;

import com.una.TODO.Models.User;
import com.una.TODO.Repository.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
public class SecurityFilter extends OncePerRequestFilter {

    @Autowired
    private TokenService tokenService;

    @Autowired
    private UserRepository userRepository;


    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String path = request.getServletPath();

        // Ignora rotas públicas
        if (path.equals("/auth/login") || path.equals("/auth/register")) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = recoverToken(request);
        String login = tokenService.validateToken(token);

        if (login != null) {
            User user = userRepository.findUserByEmail(login)
                    .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

            var authorities = Collections.singletonList(
                    new SimpleGrantedAuthority("ROLE_" + user.getRole().toString().toUpperCase())
            );
            var authentication = new UsernamePasswordAuthenticationToken(user, null, authorities);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        filterChain.doFilter(request, response);
    }

    private String recoverToken(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            return authHeader.substring(7);
        }
        return null;
    }
}

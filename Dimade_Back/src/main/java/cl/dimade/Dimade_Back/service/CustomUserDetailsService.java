package cl.dimade.Dimade_Back.service;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import cl.dimade.Dimade_Back.model.Usuario;
import cl.dimade.Dimade_Back.repository.UsuarioRepository;

// Servicio personalizado para cargar detalles del usuario
@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        System.out.println("Buscando usuario con email: " + email);

        Usuario usuario = usuarioRepository.findByEmail(email).orElseThrow(() -> {
            System.out.println("Usuario no encontrado.");
            return new UsernameNotFoundException("Usuario no encontrado");
        });

        System.out.println("Usuario encontrado. Email: " + usuario.getEmail());

        return new User(usuario.getEmail(), usuario.getPassword(),
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + usuario.getRol())));
    }
}

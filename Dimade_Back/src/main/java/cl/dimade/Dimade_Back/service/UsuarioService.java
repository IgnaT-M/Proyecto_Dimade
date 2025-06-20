package cl.dimade.Dimade_Back.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import cl.dimade.Dimade_Back.model.Usuario;
import cl.dimade.Dimade_Back.repository.UsuarioRepository;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<Usuario> obtenerTodos() {
        return usuarioRepository.findAll();
    }

    public Usuario guardar(Usuario usuario) {
        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
        return usuarioRepository.save(usuario);
    }
    public Optional<Usuario> actualizar(String id, Usuario usuarioActualizado) {
    return usuarioRepository.findById(id).map(usuarioExistente -> {
        usuarioActualizado.setId(id);

        // Si viene una contraseña nueva, hashearla
        if (usuarioActualizado.getPassword() != null && !usuarioActualizado.getPassword().isEmpty()) {
            usuarioActualizado.setPassword(passwordEncoder.encode(usuarioActualizado.getPassword()));
        } else {
            usuarioActualizado.setPassword(usuarioExistente.getPassword()); // mantiene la actual
        }

        return usuarioRepository.save(usuarioActualizado);
    });
}


    public Optional<Usuario> buscarPorEmail(String email) {
        return usuarioRepository.findByEmail(email);
    }

    public void eliminar(String id) {
        usuarioRepository.deleteById(id);
    }
}

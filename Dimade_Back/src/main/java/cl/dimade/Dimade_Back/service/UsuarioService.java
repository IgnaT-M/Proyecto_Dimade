package cl.dimade.Dimade_Back.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cl.dimade.Dimade_Back.model.Usuario;
import cl.dimade.Dimade_Back.repository.UsuarioRepository;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository repository;

    @Autowired
    private SequenceGeneratorService sequenceGenerator;

    public List<Usuario> obtenerTodos() {
        return repository.findAll();
    }

    public Optional<Usuario> obtenerPorId(String id) {
        return repository.findById(id);
    }

    public Usuario guardar(Usuario usuario) {
        if (usuario.getId() == null) {
            usuario.setId(sequenceGenerator.generateStringSequence("usuario_sequence", "US"));
        }
        return repository.save(usuario);
    }

    public Optional<Usuario> buscarPorEmail(String email) {
        return repository.findByEmail(email);
    }

    public void eliminar(String id) {
        repository.deleteById(id);
    }

    public Optional<Usuario> actualizar(String id, Usuario usuarioActualizado) {
        return repository.findById(id).map(usuarioExistente -> {
            usuarioActualizado.setId(id);
            return repository.save(usuarioActualizado);
        });
    }
}

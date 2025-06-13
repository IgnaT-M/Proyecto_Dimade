package cl.dimade.Dimade_Back.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import cl.dimade.Dimade_Back.model.Usuario;

public interface UsuarioRepository extends MongoRepository<Usuario, String> {
    Optional<Usuario> findByCorreo(String correo);
}

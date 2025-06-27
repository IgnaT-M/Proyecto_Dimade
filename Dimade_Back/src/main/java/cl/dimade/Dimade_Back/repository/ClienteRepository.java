package cl.dimade.Dimade_Back.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import cl.dimade.Dimade_Back.model.Cliente;

public interface ClienteRepository extends MongoRepository<Cliente, String> {
    Optional<Cliente> findByRut(String rut);
}

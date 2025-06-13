package cl.dimade.Dimade_Back.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import cl.dimade.Dimade_Back.model.Proveedor;

public interface ProveedorRepository extends MongoRepository<Proveedor, String> {
    Optional<Proveedor> findByRut(String rut);
}

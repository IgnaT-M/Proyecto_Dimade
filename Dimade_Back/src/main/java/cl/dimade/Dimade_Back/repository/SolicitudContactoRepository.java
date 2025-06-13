package cl.dimade.Dimade_Back.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import cl.dimade.Dimade_Back.model.SolicitudContacto;

public interface SolicitudContactoRepository extends MongoRepository<SolicitudContacto, String> {
    List<SolicitudContacto> findByCorreo(String correo);
    List<SolicitudContacto> findByFechaEnvio(Date fechaEnvio);
}

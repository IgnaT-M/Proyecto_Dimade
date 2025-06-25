package cl.dimade.Dimade_Back.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import cl.dimade.Dimade_Back.model.SolicitudCotizacion;

public interface SolicitudCotizacionRepository extends MongoRepository<SolicitudCotizacion, String> {
    List<SolicitudCotizacion> findByRutSolicitante(String rutSolicitante);

    List<SolicitudCotizacion> findByFechaSolicitud(Date fechaSolicitud);

    List<SolicitudCotizacion> findByEstado(String estado);

}

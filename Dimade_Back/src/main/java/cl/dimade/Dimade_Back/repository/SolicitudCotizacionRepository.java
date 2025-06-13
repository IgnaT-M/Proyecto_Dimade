package cl.dimade.Dimade_Back.repository;

import cl.dimade.Dimade_Back.model.SolicitudCotizacion;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Date;
import java.util.List;

public interface SolicitudCotizacionRepository extends MongoRepository<SolicitudCotizacion, String> {
    List<SolicitudCotizacion> findByRutSolicitante(String rutSolicitante);
    List<SolicitudCotizacion> findByFechaSolicitud(Date fechaSolicitud);
    List<SolicitudCotizacion> findByEstado(String estado);
}

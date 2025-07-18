package cl.dimade.Dimade_Back.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cl.dimade.Dimade_Back.model.SolicitudCotizacion;
import cl.dimade.Dimade_Back.repository.SolicitudCotizacionRepository;

@Service
public class SolicitudCotizacionService {

    @Autowired
    private SolicitudCotizacionRepository repository;

    @Autowired
    private SequenceGeneratorService sequenceGenerator;

    public List<SolicitudCotizacion> obtenerTodas() {
        return repository.findAll();
    }

    public Optional<SolicitudCotizacion> obtenerPorId(String id) {
        return repository.findById(id);
    }

    public SolicitudCotizacion guardar(SolicitudCotizacion solicitud) {
        if (solicitud.getId() == null || solicitud.getId().isBlank()) {
            String idGenerado = sequenceGenerator.generateStringSequence("solicitudes_cotizacion_sequence", "SCZ");
            solicitud.setId(idGenerado);
        }
        return repository.save(solicitud);
    }

    public Optional<SolicitudCotizacion> actualizar(String id, SolicitudCotizacion actualizada) {
        return repository.findById(id).map(existente -> {
            actualizada.setId(id);
            return repository.save(actualizada);
        });
    }

    public void eliminar(String id) {
        repository.deleteById(id);
    }

    public List<SolicitudCotizacion> buscarPorRut(String rut) {
        return repository.findByRutSolicitante(rut);
    }

    public List<SolicitudCotizacion> buscarPorFecha(Date fecha) {
        return repository.findByFechaSolicitud(fecha);
    }

    public List<SolicitudCotizacion> buscarPorEstado(String estado) {
        return repository.findByEstado(estado);
    }
}

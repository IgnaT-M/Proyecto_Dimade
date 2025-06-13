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

    public List<SolicitudCotizacion> obtenerTodas() {
        return repository.findAll();
    }

    public Optional<SolicitudCotizacion> obtenerPorId(String id) {
        return repository.findById(id);
    }

    public SolicitudCotizacion guardar(SolicitudCotizacion solicitud) {
        return repository.save(solicitud);
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

package cl.dimade.Dimade_Back.service;

import cl.dimade.Dimade_Back.model.SolicitudContacto;
import cl.dimade.Dimade_Back.repository.SolicitudContactoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class SolicitudContactoService {

    @Autowired
    private SolicitudContactoRepository repository;

    public List<SolicitudContacto> obtenerTodas() {
        return repository.findAll();
    }

    public Optional<SolicitudContacto> obtenerPorId(String id) {
        return repository.findById(id);
    }

    public SolicitudContacto guardar(SolicitudContacto solicitud) {
        return repository.save(solicitud);
    }

    public void eliminar(String id) {
        repository.deleteById(id);
    }

    public List<SolicitudContacto> buscarPorCorreo(String correo) {
        return repository.findByCorreo(correo);
    }

    public List<SolicitudContacto> buscarPorFecha(Date fecha) {
        return repository.findByFechaEnvio(fecha);
    }
}

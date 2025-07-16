package cl.dimade.Dimade_Back.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cl.dimade.Dimade_Back.model.SolicitudContacto;
import cl.dimade.Dimade_Back.repository.SolicitudContactoRepository;

@Service
public class SolicitudContactoService {

    @Autowired
    private SolicitudContactoRepository repository;

    @Autowired
    private SequenceGeneratorService sequenceGeneratorService;

    public List<SolicitudContacto> obtenerTodas() {
        return repository.findAll();
    }

    public Optional<SolicitudContacto> obtenerPorId(String id) {
        return repository.findById(id);
    }

    public SolicitudContacto guardar(SolicitudContacto contacto) {
        if (contacto.getId() == null || contacto.getId().isBlank()) {
            String idGenerado = sequenceGeneratorService.generateStringSequence("solicitudcontacto_sequence", "SCT");
            contacto.setId(idGenerado); // Ej: "SCT001"
        }
        return repository.save(contacto);
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

    // Nuevo método de actualización
    public Optional<SolicitudContacto> actualizar(String id, SolicitudContacto nuevosDatos) {
        return repository.findById(id).map(contactoExistente -> {
            contactoExistente.setNombre(nuevosDatos.getNombre());
            contactoExistente.setCorreo(nuevosDatos.getCorreo());
            contactoExistente.setTelefono(nuevosDatos.getTelefono());
            contactoExistente.setMensaje(nuevosDatos.getMensaje());
            contactoExistente.setAsunto(nuevosDatos.getAsunto()); // 💥 AGREGAR ESTO
            contactoExistente.setEstado(nuevosDatos.getEstado()); // 💥 AGREGAR ESTO
            contactoExistente.setFechaEnvio(nuevosDatos.getFechaEnvio());
            return repository.save(contactoExistente);
        });
    }

}

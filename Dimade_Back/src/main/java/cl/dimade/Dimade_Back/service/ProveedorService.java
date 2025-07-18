package cl.dimade.Dimade_Back.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cl.dimade.Dimade_Back.model.Proveedor;
import cl.dimade.Dimade_Back.repository.ProveedorRepository;

@Service
public class ProveedorService {

    @Autowired
    private ProveedorRepository repository;

    @Autowired
    private SequenceGeneratorService sequenceGeneratorService;

    public List<Proveedor> obtenerTodos() {
        return repository.findAll();
    }

    public Optional<Proveedor> obtenerPorRut(String rut) {
        return repository.findByRut(rut);
    }

    public Optional<Proveedor> obtenerPorId(String id) {
        return repository.findById(id);
    }

    public Proveedor guardar(Proveedor proveedor) {
        if (proveedor.getId() == null || proveedor.getId().isBlank()) {
            String idGenerado = sequenceGeneratorService.generateStringSequence("proveedores_sequence", "PR");
            proveedor.setId(idGenerado);
        }
        return repository.save(proveedor);
    }

    public void eliminar(String id) {
        repository.deleteById(id);
    }

    public Optional<Proveedor> actualizar(String id, Proveedor proveedorActualizado) {
        return repository.findById(id).map(proveedorExistente -> {
            proveedorActualizado.setId(id);
            return repository.save(proveedorActualizado);
        });
    }
}

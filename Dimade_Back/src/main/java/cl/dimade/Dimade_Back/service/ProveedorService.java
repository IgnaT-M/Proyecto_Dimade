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

    public List<Proveedor> obtenerTodos() {
        return repository.findAll();
    }

    public Optional<Proveedor> obtenerPorRut(String rut) {
        return repository.findByRut(rut);
    }

    public Proveedor guardar(Proveedor proveedor) {
        return repository.save(proveedor);
    }

    public void eliminar(String id) {
        repository.deleteById(id);
    }
}

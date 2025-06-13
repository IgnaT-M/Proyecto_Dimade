package cl.dimade.Dimade_Back.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cl.dimade.Dimade_Back.model.Cliente;
import cl.dimade.Dimade_Back.repository.ClienteRepository;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository repository;

    public List<Cliente> obtenerTodos() {
        return repository.findAll();
    }

    public Optional<Cliente> obtenerPorRut(String rut) {
        return repository.findByRut(rut);
    }

    public Cliente guardar(Cliente cliente) {
        return repository.save(cliente);
    }

    public void eliminar(String id) {
        repository.deleteById(id);
    }
}

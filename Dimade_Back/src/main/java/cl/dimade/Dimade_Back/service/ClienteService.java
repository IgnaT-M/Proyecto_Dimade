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

    @Autowired
    private SequenceGeneratorService sequenceGenerator;

    public List<Cliente> obtenerTodos() {
        return repository.findAll();
    }

    public Optional<Cliente> obtenerPorId(String id) {
        return repository.findById(id);
    }

    public Optional<Cliente> obtenerPorRut(String rut) {
        return repository.findByRut(rut);
    }

    public Optional<Cliente> actualizar(String id, Cliente clienteActualizado) {
        return repository.findById(id).map(clienteExistente -> {
            clienteActualizado.setId(id);
            return repository.save(clienteActualizado);
        });
    }

    public Cliente guardar(Cliente cliente) {
        if (cliente.getId() == null || cliente.getId().isBlank()) {
            cliente.setId(sequenceGenerator.generateStringSequence("cliente_sequence", "CL"));
        }
        return repository.save(cliente);
    }

    public void eliminar(String id) {
        repository.deleteById(id);
    }
}

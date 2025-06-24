package cl.dimade.Dimade_Back.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cl.dimade.Dimade_Back.model.OrdenCompra;
import cl.dimade.Dimade_Back.repository.OrdenCompraRepository;

@Service
public class OrdenCompraService {

    @Autowired
    private OrdenCompraRepository repository;

    @Autowired
    private SequenceGeneratorService sequenceGeneratorService;

    public List<OrdenCompra> obtenerTodas() {
        return repository.findAll();
    }

    public Optional<OrdenCompra> obtenerPorId(String id) {
        return repository.findById(id);
    }

    public OrdenCompra guardar(OrdenCompra orden) {
        System.out.println("➡️ Intentando guardar orden: " + orden);

        if (orden.getId() == null || orden.getId().isBlank()) {
            String idGenerado = sequenceGeneratorService.generateStringSequence("ordenes_sequence", "OC");
            System.out.println("✅ ID generado: " + idGenerado);
            orden.setId(idGenerado);
        }

        return repository.save(orden);
    }

    public Optional<OrdenCompra> actualizarCompleta(String id, OrdenCompra actualizada) {
        return repository.findById(id).map(existente -> {
            actualizada.setId(id);
            return repository.save(actualizada);
        });
    }

    public Optional<OrdenCompra> actualizarEstado(String id, String nuevoEstado) {
        return repository.findById(id).map(orden -> {
            orden.setEstado(nuevoEstado);
            return repository.save(orden);
        });
    }

    public void eliminar(String id) {
        repository.deleteById(id);
    }

    public List<OrdenCompra> buscarPorRutCliente(String rutCliente) {
        return repository.findByRutCliente(rutCliente);
    }

    public List<OrdenCompra> buscarPorRutProveedor(String rutProveedor) {
        return repository.findByRutProveedor(rutProveedor);
    }

    public List<OrdenCompra> buscarPorRutorden(String rutorden) {
        return repository.findByRutCliente(rutorden);
    }

    public List<OrdenCompra> buscarPorTipo(String tipo) {
        return repository.findByTipo(tipo);
    }

    public List<OrdenCompra> buscarPorEstado(String estado) {
        return repository.findByEstado(estado);
    }
}

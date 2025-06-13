package cl.dimade.Dimade_Back.service;

import java.util.Date;
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

    public List<OrdenCompra> obtenerTodas() {
        return repository.findAll();
    }

    public Optional<OrdenCompra> obtenerPorId(String id) {
        return repository.findById(id);
    }

    public OrdenCompra guardar(OrdenCompra orden) {
        return repository.save(orden);
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

public List<OrdenCompra> buscarPorFecha(Date fecha) {
    return repository.findByFechaOrden(fecha);
}

public List<OrdenCompra> buscarPorTipo(String tipo) {
    return repository.findByTipo(tipo);
}

public List<OrdenCompra> buscarPorEstado(String estado) {
    return repository.findByEstado(estado);
}

}

package cl.dimade.Dimade_Back.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import cl.dimade.Dimade_Back.model.OrdenCompra;

public interface OrdenCompraRepository extends MongoRepository<OrdenCompra, String> {
    List<OrdenCompra> findByRutCliente(String rutCliente);
    List<OrdenCompra> findByRutProveedor(String rutProveedor);
    List<OrdenCompra> findByFechaOrden(Date fechaOrden);
    List<OrdenCompra> findByTipo(String tipo);
    List<OrdenCompra> findByEstado(String estado);
}

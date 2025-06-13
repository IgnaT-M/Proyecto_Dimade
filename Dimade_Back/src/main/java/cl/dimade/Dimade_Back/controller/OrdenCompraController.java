package cl.dimade.Dimade_Back.controller;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import cl.dimade.Dimade_Back.model.OrdenCompra;
import cl.dimade.Dimade_Back.service.OrdenCompraService;

@RestController
@RequestMapping("/api/ordenes")
@CrossOrigin(origins = "*")
public class OrdenCompraController {

    @Autowired
    private OrdenCompraService service;

    @GetMapping
    public List<OrdenCompra> listar() {
        return service.obtenerTodas();
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrdenCompra> obtener(@PathVariable String id) {
        Optional<OrdenCompra> orden = service.obtenerPorId(id);
        return orden.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<OrdenCompra> crear(@RequestBody OrdenCompra orden) {
        return new ResponseEntity<>(service.guardar(orden), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable String id) {
        service.eliminar(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/buscar/cliente/{rutCliente}")
public List<OrdenCompra> buscarPorRutCliente(@PathVariable String rutCliente) {
    return service.buscarPorRutCliente(rutCliente);
}

@GetMapping("/buscar/proveedor/{rutProveedor}")
public List<OrdenCompra> buscarPorRutProveedor(@PathVariable String rutProveedor) {
    return service.buscarPorRutProveedor(rutProveedor);
}

@GetMapping("/buscar/fecha")
public List<OrdenCompra> buscarPorFecha(@RequestParam("fecha") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date fecha) {
    return service.buscarPorFecha(fecha);
}

@GetMapping("/buscar/tipo/{tipo}")
public List<OrdenCompra> buscarPorTipo(@PathVariable String tipo) {
    return service.buscarPorTipo(tipo);
}

@GetMapping("/buscar/estado/{estado}")
public List<OrdenCompra> buscarPorEstado(@PathVariable String estado) {
    return service.buscarPorEstado(estado);
}

}

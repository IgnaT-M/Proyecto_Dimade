package cl.dimade.Dimade_Back.controller;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import cl.dimade.Dimade_Back.model.OrdenCompra;
import cl.dimade.Dimade_Back.service.OrdenCompraService;

@RestController
@RequestMapping("/api/ordenes-compra")
@CrossOrigin(origins = "http://localhost:5173")
public class OrdenCompraController {

    @Autowired
    private OrdenCompraService ordenCompraService;

    @GetMapping
    public List<OrdenCompra> obtenerTodas() {
        return ordenCompraService.obtenerTodas();
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrdenCompra> obtenerPorId(@PathVariable String id) {
        return ordenCompraService.obtenerPorId(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<OrdenCompra> crear(@RequestBody OrdenCompra ordenCompra) {
        OrdenCompra creada = ordenCompraService.guardar(ordenCompra);
        return new ResponseEntity<>(creada, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<OrdenCompra> actualizarCompleta(@PathVariable String id, @RequestBody OrdenCompra orden) {
        return ordenCompraService.actualizarCompleta(id, orden).map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}/estado")
    public ResponseEntity<OrdenCompra> actualizarEstado(@PathVariable String id, @RequestBody String estado) {
        return ordenCompraService.actualizarEstado(id, estado).map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable String id) {
        ordenCompraService.eliminar(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/cliente/{rut}")
    public List<OrdenCompra> buscarPorRutCliente(@PathVariable String rut) {
        return ordenCompraService.buscarPorRutCliente(rut);
    }

    @GetMapping("/proveedor/{rut}")
    public List<OrdenCompra> buscarPorRutProveedor(@PathVariable String rut) {
        return ordenCompraService.buscarPorRutProveedor(rut);
    }

    @GetMapping("/fecha")
    public List<OrdenCompra> buscarPorFecha(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date fecha) {
        return ordenCompraService.buscarPorFecha(fecha);
    }

    @GetMapping("/tipo/{tipo}")
    public List<OrdenCompra> buscarPorTipo(@PathVariable String tipo) {
        return ordenCompraService.buscarPorTipo(tipo);
    }

    @GetMapping("/estado/{estado}")
    public List<OrdenCompra> buscarPorEstado(@PathVariable String estado) {
        return ordenCompraService.buscarPorEstado(estado);
    }
}

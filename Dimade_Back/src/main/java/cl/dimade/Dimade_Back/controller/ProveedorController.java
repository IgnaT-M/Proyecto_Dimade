package cl.dimade.Dimade_Back.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cl.dimade.Dimade_Back.model.Proveedor;
import cl.dimade.Dimade_Back.service.ProveedorService;

// Controlador para gestionar proveedores
@RestController
@RequestMapping("/api/proveedores")
@CrossOrigin(origins = "${frontend.url}")
public class ProveedorController {

    @Autowired
    private ProveedorService service;

    // Obtener todos los proveedores
    @GetMapping
    public List<Proveedor> listar() {
        return service.obtenerTodos();
    }

    // Obtener proveedor por ID
    @GetMapping("/{id}")
    public ResponseEntity<Proveedor> obtenerPorId(@PathVariable String id) {
        return service.obtenerPorId(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    // Obtener proveedor por RUT
    @GetMapping("/rut/{rut}")
    public ResponseEntity<Proveedor> obtenerPorRut(@PathVariable String rut) {
        Optional<Proveedor> proveedor = service.obtenerPorRut(rut);
        return proveedor.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Crear proveedor
    @PostMapping
    public ResponseEntity<Proveedor> crear(@RequestBody Proveedor proveedor) {
        return new ResponseEntity<>(service.guardar(proveedor), HttpStatus.CREATED);
    }

    // Actualizar proveedor
    @PutMapping("/{id}")
    public ResponseEntity<Proveedor> actualizar(@PathVariable String id, @RequestBody Proveedor proveedor) {
        return service.actualizar(id, proveedor).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    // Eliminar proveedor
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable String id) {
        service.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}

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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import cl.dimade.Dimade_Back.model.SolicitudContacto;
import cl.dimade.Dimade_Back.service.SolicitudContactoService;

@RestController
@RequestMapping("/api/solicitudes-contacto")
@CrossOrigin(origins = "*")
public class SolicitudContactoController {

    @Autowired
    private SolicitudContactoService service;

    @GetMapping
    public List<SolicitudContacto> listar() {
        return service.obtenerTodas();
    }

    @GetMapping("/{id}")
    public ResponseEntity<SolicitudContacto> obtener(@PathVariable String id) {
        return service.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<SolicitudContacto> crear(@RequestBody SolicitudContacto solicitud) {
        return new ResponseEntity<>(service.guardar(solicitud), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable String id) {
        service.eliminar(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/buscar/correo/{correo}")
    public List<SolicitudContacto> buscarPorCorreo(@PathVariable String correo) {
        return service.buscarPorCorreo(correo);
    }

    @GetMapping("/buscar/fecha")
    public List<SolicitudContacto> buscarPorFecha(@RequestParam("fecha") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date fecha) {
        return service.buscarPorFecha(fecha);
    }
}

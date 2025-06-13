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

import cl.dimade.Dimade_Back.model.SolicitudCotizacion;
import cl.dimade.Dimade_Back.service.SolicitudCotizacionService;

@RestController
@RequestMapping("/api/solicitudes-cotizacion")
@CrossOrigin(origins = "*")
public class SolicitudCotizacionController {

    @Autowired
    private SolicitudCotizacionService service;

    @GetMapping
    public List<SolicitudCotizacion> listar() {
        return service.obtenerTodas();
    }

    @GetMapping("/{id}")
    public ResponseEntity<SolicitudCotizacion> obtener(@PathVariable String id) {
        return service.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<SolicitudCotizacion> crear(@RequestBody SolicitudCotizacion solicitud) {
        return new ResponseEntity<>(service.guardar(solicitud), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable String id) {
        service.eliminar(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/buscar/rut/{rut}")
    public List<SolicitudCotizacion> buscarPorRut(@PathVariable String rut) {
        return service.buscarPorRut(rut);
    }

    @GetMapping("/buscar/fecha")
    public List<SolicitudCotizacion> buscarPorFecha(@RequestParam("fecha") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date fecha) {
        return service.buscarPorFecha(fecha);
    }

    @GetMapping("/buscar/estado/{estado}")
    public List<SolicitudCotizacion> buscarPorEstado(@PathVariable String estado) {
        return service.buscarPorEstado(estado);
    }
}

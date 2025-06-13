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

import cl.dimade.Dimade_Back.model.RegistroFinanciero;
import cl.dimade.Dimade_Back.service.RegistroFinancieroService;

@RestController
@RequestMapping("/api/registros-financieros")
@CrossOrigin(origins = "*")
public class RegistroFinancieroController {

    @Autowired
    private RegistroFinancieroService service;

    @GetMapping
    public List<RegistroFinanciero> listar() {
        return service.obtenerTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<RegistroFinanciero> obtener(@PathVariable String id) {
        return service.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<RegistroFinanciero> crear(@RequestBody RegistroFinanciero registro) {
        return new ResponseEntity<>(service.guardar(registro), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable String id) {
        service.eliminar(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/buscar/tipo/{tipo}")
    public List<RegistroFinanciero> buscarPorTipo(@PathVariable String tipo) {
        return service.buscarPorTipo(tipo);
    }

    @GetMapping("/buscar/fecha")
    public List<RegistroFinanciero> buscarPorFecha(@RequestParam("fecha") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date fecha) {
        return service.buscarPorFecha(fecha);
    }

    @GetMapping("/buscar")
    public List<RegistroFinanciero> buscarPorTipoYFecha(@RequestParam String tipo, @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date fecha) {
    return service.buscarPorTipoYFecha(tipo, fecha);
}

}

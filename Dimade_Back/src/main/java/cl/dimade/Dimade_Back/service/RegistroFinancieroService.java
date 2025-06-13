package cl.dimade.Dimade_Back.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cl.dimade.Dimade_Back.model.RegistroFinanciero;
import cl.dimade.Dimade_Back.repository.RegistroFinancieroRepository;

@Service
public class RegistroFinancieroService {

    @Autowired
    private RegistroFinancieroRepository repository;

    public List<RegistroFinanciero> obtenerTodos() {
        return repository.findAll();
    }

    public Optional<RegistroFinanciero> obtenerPorId(String id) {
        return repository.findById(id);
    }

    public RegistroFinanciero guardar(RegistroFinanciero registro) {
        return repository.save(registro);
    }

    public void eliminar(String id) {
        repository.deleteById(id);
    }

    public List<RegistroFinanciero> buscarPorTipo(String tipo) {
        return repository.findByTipo(tipo);
    }

    public List<RegistroFinanciero> buscarPorFecha(Date fecha) {
        return repository.findByFecha(fecha);
    }
    public List<RegistroFinanciero> buscarPorTipoYFecha(String tipo, Date fecha) {
    return repository.findByTipoAndFecha(tipo, fecha);
}
}

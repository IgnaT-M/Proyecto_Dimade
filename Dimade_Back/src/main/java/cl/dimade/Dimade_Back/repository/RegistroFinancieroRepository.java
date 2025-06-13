package cl.dimade.Dimade_Back.repository;


import java.util.Date;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import cl.dimade.Dimade_Back.model.RegistroFinanciero;


public interface RegistroFinancieroRepository extends MongoRepository<RegistroFinanciero, String> {
    List<RegistroFinanciero> findByTipo(String tipo);
    List<RegistroFinanciero> findByFecha(Date fecha);
    List<RegistroFinanciero> findByTipoAndFecha(String tipo, Date fecha);
}

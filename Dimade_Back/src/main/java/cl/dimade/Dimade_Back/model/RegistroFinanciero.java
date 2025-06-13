package cl.dimade.Dimade_Back.model;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "registros_financieros")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegistroFinanciero {
    @Id
    private String id;

    private String tipo; // "Ingreso" o "Egreso"
    private Date fecha;
    private Double monto;
    private String concepto;
    private String observaciones;
}

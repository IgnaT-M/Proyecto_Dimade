package cl.dimade.Dimade_Back.model;

import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "solicitudes_cotizacion")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SolicitudCotizacion {
    @Id
    private String id;
    private String rutSolicitante;
    private String nombreSolicitante;
    private String direccion;
    private String correo;
    private String telefono;
    private Date fechaSolicitud;
    private String estado;
    private String detalle;
    private List<Object> productos;
    private String tipo;

}

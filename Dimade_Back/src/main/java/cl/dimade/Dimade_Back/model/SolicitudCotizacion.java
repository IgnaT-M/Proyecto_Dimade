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
    private String correo;
    private String telefono;
    private Date fechaSolicitud;
    private List<String> productosSolicitados; // IDs o nombres de productos
    private String estado; // Ej: Pendiente, Enviada, Aprobada, Rechazada
    private String detalle; // Comentario o requerimiento adicional
}

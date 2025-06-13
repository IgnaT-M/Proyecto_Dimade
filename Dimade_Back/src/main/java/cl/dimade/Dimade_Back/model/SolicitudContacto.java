package cl.dimade.Dimade_Back.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "solicitudes_contacto")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SolicitudContacto {
    @Id
    private String id;

    private String nombre;
    private String correo;
    private String telefono;
    private String asunto;
    private String mensaje;
    private Date fechaEnvio;
}

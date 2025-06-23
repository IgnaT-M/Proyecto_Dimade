package cl.dimade.Dimade_Back.model;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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

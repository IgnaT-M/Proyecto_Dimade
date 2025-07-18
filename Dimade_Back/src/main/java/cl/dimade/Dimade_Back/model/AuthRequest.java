package cl.dimade.Dimade_Back.model;

import lombok.Data;

// Clase que representa la solicitud de autenticación
@Data
public class AuthRequest {
    private String correo;
    private String password;
}

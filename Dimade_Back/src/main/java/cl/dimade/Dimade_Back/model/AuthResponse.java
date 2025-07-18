package cl.dimade.Dimade_Back.model;

import lombok.AllArgsConstructor;
import lombok.Data;

// Clase que representa la respuesta de autenticación
@Data
@AllArgsConstructor
public class AuthResponse {
    private String jwt;
}

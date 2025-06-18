package cl.dimade.Dimade_Back.model;

import lombok.Data;

@Data
public class AuthRequest {
    private String correo;
    private String password;
}

package cl.dimade.Dimade_Back.DTO;

import lombok.Data;

// DTO para la solicitud de restablecimiento de contraseña
@Data
public class ResetPasswordRequest {
    private String token;
    private String nuevaPassword;
}

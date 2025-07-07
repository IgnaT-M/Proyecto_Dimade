package cl.dimade.Dimade_Back.DTO;

import lombok.Data;

@Data
public class ResetPasswordRequest {
    private String token;
    private String nuevaPassword;
}

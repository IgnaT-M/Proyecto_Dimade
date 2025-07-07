package cl.dimade.Dimade_Back.model;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "password_reset_tokens")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PasswordResetToken {

    @Id
    private String token;

    @DBRef
    private Usuario usuario;

    private Date expiryDate;
}

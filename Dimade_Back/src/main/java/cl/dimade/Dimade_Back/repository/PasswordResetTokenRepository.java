package cl.dimade.Dimade_Back.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import cl.dimade.Dimade_Back.model.PasswordResetToken;

public interface PasswordResetTokenRepository extends MongoRepository<PasswordResetToken, String> {
    Optional<PasswordResetToken> findByToken(String token);
}

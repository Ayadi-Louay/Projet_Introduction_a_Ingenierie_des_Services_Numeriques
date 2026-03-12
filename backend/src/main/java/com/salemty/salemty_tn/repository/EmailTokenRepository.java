package com.salemty.salemty_tn.repository;

import com.salemty.salemty_tn.model.EmailToken;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmailTokenRepository extends MongoRepository<EmailToken, String> {
    Optional<EmailToken> findByToken(String token);

    Optional<EmailToken> findByEmailAndType(String email, String type);
}

package tn.Salemty.salemty_backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import tn.Salemty.salemty_backend.model.User;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByEmail(String email);
}
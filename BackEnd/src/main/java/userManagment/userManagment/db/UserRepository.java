package userManagment.userManagment.db;

import org.springframework.data.jpa.repository.JpaRepository;
import userManagment.userManagment.domain.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findUserByEmail (String email);
    Optional<User> findUserByEmailAndPassword (String email, String password);
}

package userManagment.userManagment.db;


import org.springframework.data.jpa.repository.JpaRepository;
import userManagment.userManagment.domain.Permission;

import java.util.Optional;

public interface PermissionRepository extends JpaRepository<Permission, Long> {

    Optional<Permission> findPermissionByName(String name);
}

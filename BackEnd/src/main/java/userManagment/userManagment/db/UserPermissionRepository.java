package userManagment.userManagment.db;


import org.springframework.data.jpa.repository.JpaRepository;
import userManagment.userManagment.domain.Permission;
import userManagment.userManagment.domain.User;
import userManagment.userManagment.domain.UserPermission;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

public interface UserPermissionRepository extends JpaRepository<UserPermission, Long> {

    Optional<UserPermission> findUserPermissionByUserAndPermission(User user, Permission permission);

    Optional<List<UserPermission>> findUserPermissionsByUser(User user);

    @Transactional
    void deleteAllByUser(User user);
}

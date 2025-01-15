package userManagment.userManagment.service.dishService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.token.TokenService;
import org.springframework.stereotype.Service;
import userManagment.userManagment.db.DishRepository;
import userManagment.userManagment.db.PermissionRepository;
import userManagment.userManagment.db.UserPermissionRepository;
import userManagment.userManagment.db.UserRepository;
import userManagment.userManagment.domain.Dish;
import userManagment.userManagment.domain.Permission;
import userManagment.userManagment.domain.User;
import userManagment.userManagment.exceptions.NoUserException;
import userManagment.userManagment.exceptions.NotAuthorizedException;
import userManagment.userManagment.security.MyTokenService;

import java.util.List;
import java.util.Optional;

@Service
public class DishServiceImpl implements DishService {

    @Autowired
    private DishRepository dishRepository;

    @Autowired
    private MyTokenService tokenService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PermissionRepository permissionRepository;

    @Autowired
    private UserPermissionRepository userPermissionRepository;

    private void checkPermission(String jwt, String permissionName) {
        Long id = tokenService.parseToken(jwt).get("id", Long.class);
        User user = userRepository.findById(id).orElseThrow(NoUserException::new);
        Permission permission = permissionRepository.findPermissionByName(permissionName)
                .orElseThrow(NotAuthorizedException::new);

        if (userPermissionRepository.findUserPermissionByUserAndPermission(user, permission).isEmpty()) {
            throw new NotAuthorizedException();
        }
    }

    @Override
    public Optional<Dish> findById(String jwt, Long id) {
//        checkPermission(jwt, "can_search_order");
        return dishRepository.findById(id);
    }

    @Override
    public List<Dish> findAll(String jwt) {
        return dishRepository.findAll();
    }

    @Override
    public Dish save(String jwt, Dish dish) {
        return dishRepository.save(dish);
    }

    @Override
    public void deleteById(String jwt, Long id) {
        checkPermission(jwt, "can_cancel_order");
        dishRepository.deleteById(id);
    }
}

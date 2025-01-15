package userManagment.userManagment.service.dishService;

import userManagment.userManagment.domain.Dish;

import java.util.List;
import java.util.Optional;

public interface DishService {
    Optional<Dish> findById(String jwt,Long id);
    List<Dish> findAll(String jwt);
    Dish save(String jwt,Dish dish);
    void deleteById(String jwt,Long id);
}
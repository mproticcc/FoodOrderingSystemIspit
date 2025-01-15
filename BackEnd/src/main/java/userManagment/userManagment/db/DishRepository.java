package userManagment.userManagment.db;

import org.springframework.data.jpa.repository.JpaRepository;
import userManagment.userManagment.domain.Dish;

public interface DishRepository extends JpaRepository<Dish, Long> {
}


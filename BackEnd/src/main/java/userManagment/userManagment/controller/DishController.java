package userManagment.userManagment.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import userManagment.userManagment.domain.Dish;
import userManagment.userManagment.service.dishService.DishService;

import java.util.List;
import java.util.Optional;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/dishes")
public class DishController {

    @Autowired
    private DishService dishService;

    @GetMapping("/{id}")
    public ResponseEntity<Dish> getDishById(@RequestHeader("Authorization") String jwt,@PathVariable Long id) {
        Optional<Dish> dish = dishService.findById(jwt,id);
        return dish.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/getAll")
    public List<Dish> getAllDishes(@RequestHeader("Authorization") String jwt) {
        return dishService.findAll(jwt);
    }

    @PostMapping
    public ResponseEntity<Dish> createDish(@RequestHeader("Authorization") String jwt,@RequestBody Dish dish) {
        Dish createdDish = dishService.save(jwt,dish);
        return new ResponseEntity<>(createdDish, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Dish> updateDish(@RequestHeader("Authorization") String jwt,@PathVariable Long id, @RequestBody Dish dish) {
        Optional<Dish> existingDish = dishService.findById(jwt,id);
        if (existingDish.isPresent()) {
            dish.setId(id);
            return ResponseEntity.ok(dishService.save(jwt,dish));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDish(@RequestHeader("Authorization") String jwt,@PathVariable Long id) {
        if (dishService.findById(jwt,id).isPresent()) {
            dishService.deleteById(jwt,id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}

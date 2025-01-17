package userManagment.userManagment.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import userManagment.userManagment.domain.Dish;
import userManagment.userManagment.domain.OrderItems;
import userManagment.userManagment.dtos.user.OrderRequest;
import userManagment.userManagment.service.orderItemsService.OrderItemsService;

import java.time.LocalDateTime;
import java.util.List;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/order-items")
public class OrderItemsController {

    @Autowired
    private OrderItemsService orderItemsService;
    @GetMapping
    public List<OrderItems> getAllOrderItems(@RequestHeader("Authorization") String jwt) {
        return orderItemsService.findAll(jwt);
    }
    @GetMapping("/user/{userId}")
    public List<OrderItems> getOrderItemsByCreatedByUserId(@RequestHeader("Authorization") String jwt, @PathVariable Long userId) {
        return orderItemsService.findByCreatedByUserId(jwt, userId);
    }
    @GetMapping("/order/{orderId}")
    public List<OrderItems> getOrderItemsByOrderId(@RequestHeader("Authorization") String jwt,@PathVariable Long orderId) {
        return orderItemsService.findByUserId(jwt,orderId);
    }

    @PostMapping("/create")
    public ResponseEntity<OrderItems> createOrderItem(
            @RequestHeader("Authorization") String jwt,
            @RequestBody OrderRequest orderRequest) {
        OrderItems createdOrderItem = orderItemsService.save(jwt, orderRequest.getUserId(), orderRequest.getDishes());
        return new ResponseEntity<>(createdOrderItem, HttpStatus.CREATED);
    }

    @PostMapping("/schedule")
    public ResponseEntity<?> scheduleOrder(  @RequestHeader("Authorization") String jwt, @RequestBody OrderRequest orderRequest) {

        if (orderRequest.getDate().isBefore(LocalDateTime.now())) {
            return ResponseEntity.badRequest().body("Zakazano vreme mora biti u budućnosti.");
        }

        boolean isScheduled = orderItemsService.scheduleOrder(jwt,orderRequest);

        if (isScheduled) {
            return ResponseEntity.ok("Porudžbina je uspešno zakazana.");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Došlo je do greške prilikom zakazivanja porudžbine.");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrderItem(@RequestHeader("Authorization") String jwt,@PathVariable Long id) {
        if (orderItemsService.findByOrderId(jwt,id).isEmpty()) {
            orderItemsService.deleteById(jwt,id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
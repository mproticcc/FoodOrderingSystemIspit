package userManagment.userManagment.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import userManagment.userManagment.domain.Dish;
import userManagment.userManagment.domain.OrderItems;
import userManagment.userManagment.dtos.user.OrderRequest;
import userManagment.userManagment.service.orderItemsService.OrderItemsService;

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

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrderItem(@RequestHeader("Authorization") String jwt,@PathVariable Long id) {
        if (orderItemsService.findByOrderId(jwt,id).isEmpty()) {
            orderItemsService.deleteById(jwt,id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
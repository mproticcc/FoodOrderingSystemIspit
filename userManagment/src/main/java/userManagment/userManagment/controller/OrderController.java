package userManagment.userManagment.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import userManagment.userManagment.domain.Orders;
import userManagment.userManagment.service.orderService.OrderService;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping("/{id}")
    public ResponseEntity<Orders> getOrderById(@RequestHeader("Authorization") String jwt,@PathVariable Long id) {
        Optional<Orders> order = orderService.findById(jwt,id);
        return order.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public List<Orders> getAllOrders(@RequestHeader("Authorization") String jwt) {
        return orderService.findAll(jwt);
    }

    @PostMapping
    public ResponseEntity<Orders> createOrder(@RequestHeader("Authorization") String jwt,@RequestBody Orders order) {
        Orders createdOrder = orderService.save(jwt,order);
        return new ResponseEntity<>(createdOrder, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Orders> updateOrder(@RequestHeader("Authorization") String jwt,@PathVariable Long id, @RequestBody Orders order) {
        Optional<Orders> existingOrder = orderService.findById(jwt,id);
        if (existingOrder.isPresent()) {
            order.setId(id);
            return ResponseEntity.ok(orderService.save(jwt,order));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@RequestHeader("Authorization") String jwt,@PathVariable Long id) {
        if (orderService.findById(jwt,id).isPresent()) {
            orderService.cancelOrder(jwt,id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/user/{userId}")
    public List<Orders> getOrdersByUserId(@RequestHeader("Authorization") String jwt,@PathVariable Long userId) {
        return orderService.findByCreatedById(jwt,userId);
    }

}

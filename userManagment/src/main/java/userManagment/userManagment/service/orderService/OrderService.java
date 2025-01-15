package userManagment.userManagment.service.orderService;

import userManagment.userManagment.domain.Orders;
import userManagment.userManagment.dtos.error.OrderErrorDto;

import java.util.List;
import java.util.Optional;

public interface OrderService {
    Optional<Orders> findById(String jwt,Long id);
    List<Orders> findAll(String jwt);
    Orders save(String jwt,Orders order);
    void deleteById(String jwt,Long id);
    List<Orders> findByCreatedById(String jwt,Long createdBy);
    void cancelOrder(String jwt, Long orderId);
}
package userManagment.userManagment.service.orderItemsService;

import userManagment.userManagment.domain.Dish;
import userManagment.userManagment.domain.OrderItems;
import userManagment.userManagment.dtos.error.OrderErrorDto;
import userManagment.userManagment.dtos.user.OrderRequest;

import java.util.List;

public interface OrderItemsService {
    List<OrderItems> findByUserId(String jwt,Long orderId);
    List<OrderItems> findByOrderId(String jwt,Long orderId);
    OrderItems save(String jwt, Long userId, List<Dish> dishes);
    void deleteById(String jwt, Long id);
    List<OrderItems> findAll(String jwt);
    List<OrderItems> findByCreatedByUserId(String jwt, Long userId);
    boolean scheduleOrder(String jwt,OrderRequest request);


}
package userManagment.userManagment.db;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import userManagment.userManagment.domain.OrderItems;

import java.util.List;

public interface OrderItemsRepository extends JpaRepository<OrderItems, Long> {
    @Query("SELECT oi FROM OrderItems oi WHERE oi.order.createdBy.id = :userId")
    List<OrderItems> findByUserId(@Param("userId") Long userId);
    List<OrderItems> findByOrderId(Long orderId);
    @Query("SELECT oi FROM OrderItems oi JOIN oi.order o WHERE o.createdBy = :userId")
    List<OrderItems> findByCreatedByUserId(@Param("userId") Long userId);


}
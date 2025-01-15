package userManagment.userManagment.db;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import userManagment.userManagment.domain.Orders;

import java.util.List;

public interface OrderRepository extends JpaRepository<Orders, Long> {
    List<Orders> findOrdersByCreatedBy(Long createdBy);
    @Query("SELECT COUNT(o) FROM Orders o WHERE o.status IN :statuses")
    long countByStatusIn(List<String> statuses);

}

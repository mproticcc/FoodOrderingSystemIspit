package userManagment.userManagment.service.orderService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import userManagment.userManagment.db.*;
import userManagment.userManagment.domain.*;
import userManagment.userManagment.exceptions.*;
import userManagment.userManagment.security.MyTokenService;
import javax.annotation.PostConstruct;
import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Service
public class OrderServiceImpl implements OrderService {



    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private MyTokenService tokenService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PermissionRepository permissionRepository;

    @Autowired
    private UserPermissionRepository userPermissionRepository;

    private final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);

    @PostConstruct
    public void initializeOrderStatusUpdater() {
        scheduler.scheduleAtFixedRate(this::updateOrderStatuses, 0, 5, TimeUnit.SECONDS);
    }

    private void updateOrderStatuses() {
        List<Orders> orders = orderRepository.findAll();
        for (Orders order : orders) {
            if ("CANCELED".equals(order.getStatus())) {
                continue;
            }
            if(order.getActive()){
                switch (order.getStatus()) {
                    case "ORDERED":
                        scheduleStatusChange(order, "PREPARING", 10);
                        break;
                    case "PREPARING":
                        scheduleStatusChange(order, "IN_DELIVERY", 15);
                        break;
                    case "IN_DELIVERY":
                        scheduleStatusChange(order, "DELIVERED", 20);
                        break;
                }
            }

        }
    }

    private void scheduleStatusChange(Orders order, String newStatus, int delaySeconds) {
        if ("CANCELED".equals(order.getStatus())) {
            return;
        }
        long delayWithDeviation = delaySeconds + (long) (Math.random() * 5);
        scheduler.schedule(() -> {
            if (orderRepository.existsById(order.getId())) {
                if(order.getActive() == false){
                    order.setStatus("CANCELED");
                    orderRepository.save(order);
                }
                else{
                    order.setStatus(newStatus);
                    orderRepository.save(order);
                }


            }
        }, delayWithDeviation, TimeUnit.SECONDS);
    }

    @Override
    public void cancelOrder(String jwt, Long orderId) {
        checkPermission(jwt, "can_cancel_order");
        Orders order = orderRepository.findById(orderId)
                .orElseThrow(() -> new EntityNotFoundException("Order not found"));

        if (!"ORDERED".equals(order.getStatus())) {
            throw new CancelOrderException();
        }

        order.setStatus("CANCELED");
        order.setActive(false);
        orderRepository.save(order);
    }
    private void checkPermission(String jwt, String permissionName) {
        Long id = tokenService.parseToken(jwt).get("id", Long.class);
        User user = userRepository.findById(id).orElseThrow(NoUserException::new);
        Permission permission = permissionRepository.findPermissionByName(permissionName)
                .orElseThrow(NotAuthorizedException::new);

        if (userPermissionRepository.findUserPermissionByUserAndPermission(user, permission).isEmpty()) {
            throw new NotAuthorizedException();
        }
    }

    @Override
    public Optional<Orders> findById(String jwt, Long id) {
        return orderRepository.findById(id);
    }

    @Override
    public List<Orders> findAll(String jwt) {
        return orderRepository.findAll();
    }

    @Override
    @Transactional
    public Orders save(String jwt, Orders order) {
        checkPermission(jwt, "can_place_order");
        return orderRepository.save(order);
    }

    @Override
    public void deleteById(String jwt, Long id) {
        checkPermission(jwt, "can_cancel_order");
        orderRepository.deleteById(id);
    }

    @Override
    public List<Orders> findByCreatedById(String jwt, Long createdBy) {

        return orderRepository.findOrdersByCreatedBy(createdBy);
    }


}

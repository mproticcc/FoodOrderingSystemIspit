package userManagment.userManagment.service.orderItemsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.objenesis.instantiator.basic.AccessibleInstantiator;
import org.springframework.stereotype.Service;
import userManagment.userManagment.db.*;
import userManagment.userManagment.domain.*;
import userManagment.userManagment.dtos.user.OrderRequest;
import userManagment.userManagment.exceptions.LimitOrderException;
import userManagment.userManagment.exceptions.NoUserException;
import userManagment.userManagment.exceptions.NotAuthorizedException;
import userManagment.userManagment.security.MyTokenService;

import javax.transaction.Transactional;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;


@Service
public class OrderItemsServiceImpl implements OrderItemsService {
    private static final int MAX_ACTIVE_ORDERS = 3;

    private final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);

    @Autowired
    private OrderItemsRepository orderItemsRepository;

    @Autowired
    private MyTokenService tokenService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderRepository ordersRepository;

    @Autowired
    private PermissionRepository permissionRepository;

    @Autowired
    private UserPermissionRepository userPermissionRepository;


    @Autowired
    private ErrorMessageRepository errorMessageRepository;

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
    public List<OrderItems> findByUserId(String jwt, Long orderId) {
        return orderItemsRepository.findByUserId(orderId);
    }

    @Override
    public List<OrderItems> findByOrderId(String jwt, Long orderId) {
        return orderItemsRepository.findByOrderId(orderId);
    }
    @Override
    public boolean scheduleOrder(String jwt,OrderRequest request) {
        checkPermission(jwt, "can_schedule_order");
        long delay = Duration.between(LocalDateTime.now(), request.getDate()).toMillis();

        scheduler.schedule(() -> {
            save(jwt,request.getUserId(), request.getDishes());
            System.out.println(delay);
        }, delay, TimeUnit.MILLISECONDS);

        return true;
    }
    @Override
    @Transactional
    public OrderItems save(String jwt, Long userId, List<Dish> dishes) {
        checkPermission(jwt, "can_place_order");

        // Provera maksimalnog broja aktivnih porudžbina
        long activeOrdersCount = ordersRepository.countByStatusIn(List.of("PREPARING", "IN_DELIVERY"));
        System.out.println(activeOrdersCount);
        if (activeOrdersCount >= MAX_ACTIVE_ORDERS) {
            String errorMessage = "Maksimalan broj istovremenih porudžbina je dostignut.";
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new IllegalArgumentException("User with ID " + userId + " not found"));

            ErrorMessage errorLog = new ErrorMessage();
            errorLog.setDate(LocalDateTime.now());
            errorLog.setUser(user);
            errorLog.setOperation("CREATE_ORDER");
            errorLog.setMessage(errorMessage);

            System.out.println(errorLog.toString());
            errorMessageRepository.save(errorLog);

            return null;
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User with ID " + userId + " not found"));

        Orders newOrder = new Orders();
        newOrder.setName(user.getName() + " " + user.getSurname());
        newOrder.setType("Default");
        newOrder.setDescription("Created by user " + user.getId());
        newOrder.setStatus("ORDERED");
        newOrder.setCreatedBy(user);
        newOrder.setActive(true);
        Orders savedOrder = ordersRepository.save(newOrder);

        List<OrderItems> orderItemsList = new ArrayList<>();
        for (Dish dish : dishes) {
            OrderItems orderItem = new OrderItems();
            orderItem.setDate(LocalDateTime.now());
            orderItem.setDish(dish);
            orderItem.setOrder(savedOrder);
            orderItemsList.add(orderItem);
        }
        orderItemsRepository.saveAll(orderItemsList);

        return orderItemsList.get(0);
    }

    @Override
    public void deleteById(String jwt, Long id) {
        checkPermission(jwt, "can_cancel_order");
        orderItemsRepository.deleteById(id);
    }
    @Override
    public List<OrderItems> findAll(String jwt) {
        return orderItemsRepository.findAll();
    }
    @Override
    public List<OrderItems> findByCreatedByUserId(String jwt, Long userId) {
        return orderItemsRepository.findByCreatedByUserId(userId);
    }


}
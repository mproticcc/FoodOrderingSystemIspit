package userManagment.userManagment.dtos.user;


import userManagment.userManagment.domain.Dish;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class OrderRequest {
    private Long userId;
    private List<Dish> dishes;
    private LocalDateTime date;
}
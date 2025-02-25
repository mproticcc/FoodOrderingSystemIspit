package userManagment.userManagment.dtos.user;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
public class ChangeUserDto {
    public Long id;
    public String name;
    public String surname;
    public String email;
    public List<String> permissions = new ArrayList<>();
}

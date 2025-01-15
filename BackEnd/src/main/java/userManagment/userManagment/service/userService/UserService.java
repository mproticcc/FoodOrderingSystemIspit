package userManagment.userManagment.service.userService;

import userManagment.userManagment.domain.User;
import userManagment.userManagment.dtos.user.*;

public interface UserService {

    void createUser(String jwt, CreateUserDto createUserDto);
    TokenResponseDto login(LoginDto loginDto);
    ReadUsersDto getUsers(String jwt);
    void changeUser(String jwt, ChangeUserDto changeUserDto);
    void deleteUser(String jwt, String email);
    UserDto getSingleUserByEmail(String jwt, String email);
}

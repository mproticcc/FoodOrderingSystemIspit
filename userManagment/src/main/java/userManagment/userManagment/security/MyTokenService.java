package userManagment.userManagment.security;

import io.jsonwebtoken.Claims;
import userManagment.userManagment.domain.User;

public interface MyTokenService {
    String generate(Claims claims);

    Claims parseToken(String jwt);

    User getUserByJwt(String jwt);
}

package userManagment.userManagment.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import userManagment.userManagment.db.UserRepository;
import userManagment.userManagment.domain.User;
import userManagment.userManagment.exceptions.NoUserException;

import java.util.Optional;

@Service
public class TokenServiceImpl implements MyTokenService {

    @Value("${oauth.jwt.secret}")
    private String jwtSecret;

    private UserRepository userRepository;

    public TokenServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public String generate(Claims claims) {
        return Jwts.builder()
                .setClaims(claims)
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }

    @Override
    public Claims parseToken(String jwt) {
        Claims claims;
        try {
            claims = Jwts.parser()
                    .setSigningKey(jwtSecret)
                    .parseClaimsJws(jwt)
                    .getBody();
        } catch (Exception e) {
            return null;
        }
        return claims;
    }

    public User getUserByJwt(String jwt){
        Long id = parseToken(jwt).get("id", Long.class);
        Optional<User> user = userRepository.findById(id);
        if(user.isEmpty()){
            throw new NoUserException();
        }
        return user.get();
    }
}

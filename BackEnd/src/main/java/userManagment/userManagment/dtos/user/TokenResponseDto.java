package userManagment.userManagment.dtos.user;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class TokenResponseDto {
    public String token;

    public TokenResponseDto(String token) {
        this.token = token;
    }
}

package userManagment.userManagment.exceptions;

import org.springframework.http.HttpStatus;

public class LimitOrderException extends CustomException{
    public LimitOrderException() {
        super("Maksimalan broj istovremenih porudžbina je dostignut!", ErrorCode.ORDER_LIMIT_REACHED, HttpStatus.FORBIDDEN);
    }
}
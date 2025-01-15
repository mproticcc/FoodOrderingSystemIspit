package userManagment.userManagment.exceptions;

import org.springframework.http.HttpStatus;

public class CancelOrderException extends CustomException {
    public CancelOrderException() {
        super("Order cannot be cancelled in its current state", ErrorCode.CANCEL_ORDER, HttpStatus.FORBIDDEN);
    }
}
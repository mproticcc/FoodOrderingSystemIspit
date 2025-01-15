package userManagment.userManagment.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import userManagment.userManagment.domain.ErrorMessage;
import userManagment.userManagment.service.errorMessageService.ErrorMessageService;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/errors")
public class ErrorMessageController {

    @Autowired
    private ErrorMessageService errorMessageService;

    @GetMapping()
    public ResponseEntity<List<ErrorMessage>> getAllErrorMessages() {
        List<ErrorMessage> errorMessages = errorMessageService.getAllErrorMessages();
        return new ResponseEntity<>(errorMessages, HttpStatus.OK);
    }

    @GetMapping("/usersErrors/{userId}")
    public ResponseEntity<List<ErrorMessage>> getAllUsersErrorMessages(@PathVariable Long userId) {
        List<ErrorMessage> errorMessages = errorMessageService.getAllUsersErrorMessages(userId);
        return new ResponseEntity<>(errorMessages, HttpStatus.OK);
    }
}

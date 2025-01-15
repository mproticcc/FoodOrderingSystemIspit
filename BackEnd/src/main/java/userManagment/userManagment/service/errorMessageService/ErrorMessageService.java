package userManagment.userManagment.service.errorMessageService;

import userManagment.userManagment.domain.ErrorMessage;

import java.util.List;

public interface ErrorMessageService {

    List<ErrorMessage> getAllErrorMessages();

    List<ErrorMessage> getAllUsersErrorMessages(Long userId);
}
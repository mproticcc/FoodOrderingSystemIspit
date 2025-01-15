package userManagment.userManagment.service.errorMessageService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import userManagment.userManagment.db.ErrorMessageRepository;
import userManagment.userManagment.domain.ErrorMessage;

import java.util.List;

@Service
public class ErrorMessageServiceImpl implements ErrorMessageService {
    @Autowired
    private ErrorMessageRepository errorMessageRepository;

    @Override
    public List<ErrorMessage> getAllErrorMessages() {
        return errorMessageRepository.findAll();
    }

    @Override
    public List<ErrorMessage> getAllUsersErrorMessages(Long userId) {
        return errorMessageRepository.findByUserId(userId);
    }
}
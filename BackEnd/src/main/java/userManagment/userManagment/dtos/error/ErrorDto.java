package userManagment.userManagment.dtos.error;

public class ErrorDto {
    public String message;
    public String operation;
    public String date;
    public String usisivacName;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getOperation() {
        return operation;
    }

    public void setOperation(String operation) {
        this.operation = operation;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getUsisivacName() {
        return usisivacName;
    }

    public void setUsisivacName(String usisivacName) {
        this.usisivacName = usisivacName;
    }
}

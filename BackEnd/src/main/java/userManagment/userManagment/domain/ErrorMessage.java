package userManagment.userManagment.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
@Entity
@Getter
@Setter
@Table(name = "error_message")
@NoArgsConstructor
@AllArgsConstructor
public class ErrorMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime date;
    @ManyToOne
    private User user;
    private String operation;
    private String message;

    @Override
    public String toString() {
        return "ErrorMessage{" +
                "id=" + id +
                ", date=" + date +
                ", user=" + user +
                ", operation='" + operation + '\'' +
                ", message='" + message + '\'' +
                '}';
    }
}
package userManagment.userManagment.domain;

import javax.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Orders {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String type;
    private String description;
    private String status;

    @ManyToOne
    @JoinColumn(name = "createdBy")
    private User createdBy;

    private Boolean active;

}
package com.mycompany.climate.model.settings;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class SettingsMode {

    @Id
    private long id;
    private String name;
    private String mode;

}

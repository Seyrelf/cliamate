package com.mycompany.climate.model.settings;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Table
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Data
public class SettingsPIDСoefficients {

    @Id
    private long id;
    private String name;
    private double pParam;
    private double iParam;
    private double dParam;

}

package com.mycompany.climate.repository.settings;

import com.mycompany.climate.model.settings.SettingsPIDСoefficients;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SettingsPIDСoefficientsRepository extends JpaRepository<SettingsPIDСoefficients,Long> {

    SettingsPIDСoefficients getByName(String name);

    List<SettingsPIDСoefficients> findTopByOrderByIdDesc();
}

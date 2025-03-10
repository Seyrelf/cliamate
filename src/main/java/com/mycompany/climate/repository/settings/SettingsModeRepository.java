package com.mycompany.climate.repository.settings;

import com.mycompany.climate.model.settings.SettingsMode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SettingsModeRepository extends JpaRepository<SettingsMode, Integer> {

    SettingsMode findTopByOrderByIdDesc();
}

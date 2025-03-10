package com.mycompany.climate.repository.settings;

import com.mycompany.climate.model.settings.SettingsClimate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SettingsClimateRepository extends JpaRepository<SettingsClimate, Long> {

    SettingsClimate findTopByOrderByIdDesc();
}

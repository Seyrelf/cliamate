package com.mycompany.climate.repository.settings;

import com.mycompany.climate.model.settings.SettingsDevice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SettingsDeviceRepository extends JpaRepository<SettingsDevice, Long> {

    SettingsDevice findTopByOrderByIdDesc();

}

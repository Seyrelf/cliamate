package com.mycompany.climate.repository.real;

import com.mycompany.climate.model.real.RealParamDevice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RealParamDeviceRepository extends JpaRepository<RealParamDevice, Long> {

    RealParamDevice findTopByOrderByIdDesc();
}

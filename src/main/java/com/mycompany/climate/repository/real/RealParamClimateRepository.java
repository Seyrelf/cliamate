package com.mycompany.climate.repository.real;

import com.mycompany.climate.model.real.RealParamClimate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RealParamClimateRepository extends JpaRepository<RealParamClimate, Integer> {

    RealParamClimate findTopByOrderByIdDesc();
}

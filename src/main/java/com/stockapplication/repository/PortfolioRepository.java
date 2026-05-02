package com.stockapplication.repository;

import com.stockapplication.model.Portfolio;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PortfolioRepository extends JpaRepository<Portfolio, Long> {

    Optional<Portfolio> findByDeviceId(String deviceId);
}

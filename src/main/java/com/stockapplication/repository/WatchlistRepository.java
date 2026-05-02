package com.stockapplication.repository;

import com.stockapplication.model.Watchlist;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WatchlistRepository extends JpaRepository<Watchlist, Long> {

    Optional<Watchlist> findByDeviceId(String deviceId);
}

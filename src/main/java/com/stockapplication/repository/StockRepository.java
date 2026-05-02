package com.stockapplication.repository;

import com.stockapplication.model.Stock;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StockRepository extends JpaRepository<Stock, Long> {

    Optional<Stock> findByTickerIgnoreCase(String ticker);

    List<Stock> findByTickerContainingIgnoreCaseOrNameContainingIgnoreCase(String ticker, String name);
}

package com.stockapplication.config;

import com.stockapplication.model.Stock;
import com.stockapplication.repository.StockRepository;
import java.util.List;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final StockRepository stockRepository;

    public DataInitializer(StockRepository stockRepository) {
        this.stockRepository = stockRepository;
    }

    @Override
    public void run(String... args) {
        if (stockRepository.count() > 0) {
            return;
        }

        List<Stock> initialStocks = List.of(
                new Stock(null, "AAPL", "Apple Inc.", 212.48, 1.37, "3.2T"),
                new Stock(null, "TSLA", "Tesla, Inc.", 178.91, -2.84, "571B"),
                new Stock(null, "MSFT", "Microsoft Corporation", 428.76, 0.94, "3.1T"),
                new Stock(null, "NVDA", "NVIDIA Corporation", 932.15, 3.41, "2.3T"),
                new Stock(null, "GOOGL", "Alphabet Inc.", 167.32, 0.58, "2.1T"),
                new Stock(null, "AMZN", "Amazon.com, Inc.", 183.64, -0.72, "1.9T"),
                new Stock(null, "META", "Meta Platforms, Inc.", 498.27, 2.16, "1.3T"),
                new Stock(null, "AMD", "Advanced Micro Devices, Inc.", 164.83, 1.88, "266B"),
                new Stock(null, "NFLX", "Netflix, Inc.", 623.54, -1.14, "269B"),
                new Stock(null, "JPM", "JPMorgan Chase & Co.", 198.45, 0.43, "569B")
        );

        stockRepository.saveAll(initialStocks);
    }
}

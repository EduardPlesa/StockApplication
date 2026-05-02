package com.stockapplication.service;

import com.stockapplication.model.Stock;
import com.stockapplication.repository.StockRepository;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import org.springframework.stereotype.Service;

@Service
public class StockPriceService {

    private final StockRepository stockRepository;
    private final Random random = new Random();

    public StockPriceService(StockRepository stockRepository) {
        this.stockRepository = stockRepository;
    }

    public List<Stock> getAllStocks() {
        return stockRepository.findAll();
    }

    public Optional<Stock> findByTicker(String ticker) {
        return stockRepository.findByTickerIgnoreCase(ticker);
    }

    public List<Stock> updateAllStockPrices(double maxPercentFluctuation) {
        List<Stock> stocks = stockRepository.findAll();

        for (Stock stock : stocks) {
            double priceChangePercent = (random.nextDouble() * (maxPercentFluctuation * 2)) - maxPercentFluctuation;
            double currentPrice = stock.getPrice() != null ? stock.getPrice() : 0.0;
            double updatedPrice = currentPrice * (1 + (priceChangePercent / 100));

            stock.setPrice(roundToTwoDecimals(updatedPrice));
            stock.setChangePercent(roundToTwoDecimals(priceChangePercent));
        }

        return stockRepository.saveAll(stocks);
    }

    private double roundToTwoDecimals(double value) {
        return Math.round(value * 100.0) / 100.0;
    }
}

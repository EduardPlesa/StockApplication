package com.stockapplication.service;

import com.stockapplication.dto.StockHistoryPoint;
import com.stockapplication.model.Stock;
import com.stockapplication.repository.StockRepository;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class StockPriceService {

    private static final DateTimeFormatter HISTORY_FORMATTER = DateTimeFormatter.ISO_LOCAL_DATE_TIME;

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

    public List<StockHistoryPoint> getStockHistory(String ticker) {
        Stock stock = findByTicker(ticker)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Stock not found for ticker: " + ticker
                ));

        List<StockHistoryPoint> history = new ArrayList<>();
        double simulatedPrice = stock.getPrice() != null ? stock.getPrice() : 100.0;
        LocalDateTime startTime = LocalDateTime.now().minusHours(24);

        for (int index = 0; index < 20; index++) {
            double fluctuationPercent = (random.nextDouble() * 4.0) - 2.0;
            simulatedPrice = simulatedPrice * (1 + (fluctuationPercent / 100.0));
            LocalDateTime timestamp = startTime.plusMinutes(Math.round((index * 24.0 * 60.0) / 19.0));

            history.add(new StockHistoryPoint(
                    timestamp.format(HISTORY_FORMATTER),
                    roundToTwoDecimals(simulatedPrice)
            ));
        }

        history.sort(Comparator.comparing(StockHistoryPoint::getTimestamp));
        return history;
    }

    private double roundToTwoDecimals(double value) {
        return Math.round(value * 100.0) / 100.0;
    }
}

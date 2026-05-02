package com.stockapplication.service;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class StockPriceScheduler {

    private static final double MAX_PERCENT_FLUCTUATION = 1.0;

    private final StockPriceService stockPriceService;

    public StockPriceScheduler(StockPriceService stockPriceService) {
        this.stockPriceService = stockPriceService;
    }

    @Scheduled(fixedRate = 5000)
    public void updateStockPrices() {
        stockPriceService.updateAllStockPrices(MAX_PERCENT_FLUCTUATION);
    }
}

package com.stockapplication.controller;

import com.stockapplication.dto.StockHistoryPoint;
import com.stockapplication.model.Stock;
import com.stockapplication.service.StockPriceService;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/stocks")
public class StockController {

    private final StockPriceService stockPriceService;

    public StockController(StockPriceService stockPriceService) {
        this.stockPriceService = stockPriceService;
    }

    @GetMapping
    public List<Stock> getAllStocks() {
        return stockPriceService.getAllStocks();
    }

    @GetMapping("/{ticker}")
    public Stock getStockByTicker(@PathVariable String ticker) {
        return stockPriceService.findByTicker(ticker)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Stock not found for ticker: " + ticker
                ));
    }

    @GetMapping("/{ticker}/history")
    public List<StockHistoryPoint> getStockHistory(@PathVariable String ticker) {
        return stockPriceService.getStockHistory(ticker);
    }

    @PostMapping("/update")
    public List<Stock> updateStocks() {
        return stockPriceService.updateAllStockPrices(3.0);
    }
}

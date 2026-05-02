package com.stockapplication.controller;

import com.stockapplication.dto.PortfolioSummaryResponse;
import com.stockapplication.dto.TradeRequest;
import com.stockapplication.model.Transaction;
import com.stockapplication.service.PortfolioService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/trade")
public class TradeController {

    private final PortfolioService portfolioService;

    public TradeController(PortfolioService portfolioService) {
        this.portfolioService = portfolioService;
    }

    @PostMapping
    public Transaction createTrade(@RequestBody TradeRequest request) {
        return portfolioService.executeBuyTrade(request);
    }

    @GetMapping("/portfolio/{deviceId}")
    public PortfolioSummaryResponse getPortfolioSummary(@PathVariable String deviceId) {
        return portfolioService.getPortfolioSummary(deviceId);
    }
}

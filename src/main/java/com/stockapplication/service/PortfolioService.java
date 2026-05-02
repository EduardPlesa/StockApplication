package com.stockapplication.service;

import com.stockapplication.dto.PortfolioSummaryResponse;
import com.stockapplication.dto.TradeRequest;
import com.stockapplication.model.Portfolio;
import com.stockapplication.model.Stock;
import com.stockapplication.model.Transaction;
import com.stockapplication.model.TransactionType;
import com.stockapplication.repository.PortfolioRepository;
import com.stockapplication.repository.StockRepository;
import com.stockapplication.repository.TransactionRepository;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class PortfolioService {

    private final PortfolioRepository portfolioRepository;
    private final TransactionRepository transactionRepository;
    private final StockRepository stockRepository;

    public PortfolioService(
            PortfolioRepository portfolioRepository,
            TransactionRepository transactionRepository,
            StockRepository stockRepository
    ) {
        this.portfolioRepository = portfolioRepository;
        this.transactionRepository = transactionRepository;
        this.stockRepository = stockRepository;
    }

    public Transaction executeBuyTrade(TradeRequest request) {
        if (request.getDeviceId() == null || request.getDeviceId().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "deviceId is required");
        }

        if (request.getTicker() == null || request.getTicker().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "ticker is required");
        }

        if (request.getQuantity() == null || request.getQuantity() <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "quantity must be greater than 0");
        }

        Stock stock = stockRepository.findByTickerIgnoreCase(request.getTicker())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Stock not found"));

        Portfolio portfolio = portfolioRepository.findByDeviceId(request.getDeviceId())
                .orElseGet(() -> portfolioRepository.save(new Portfolio(null, request.getDeviceId())));

        Transaction transaction = new Transaction(
                null,
                stock.getTicker(),
                request.getQuantity(),
                stock.getPrice(),
                TransactionType.BUY,
                LocalDateTime.now(),
                portfolio
        );

        return transactionRepository.save(transaction);
    }

    public PortfolioSummaryResponse getPortfolioSummary(String deviceId) {
        Portfolio portfolio = portfolioRepository.findByDeviceId(deviceId)
                .orElseGet(() -> new Portfolio(null, deviceId));

        List<Transaction> transactions = portfolio.getId() == null
                ? new ArrayList<>()
                : transactionRepository.findByPortfolio(portfolio);

        return new PortfolioSummaryResponse(
                deviceId,
                calculateTotalProfitLoss(transactions),
                transactions
        );
    }

    public double calculateTotalProfitLoss(List<Transaction> transactions) {
        double totalProfitLoss = 0.0;

        for (Transaction transaction : transactions) {
            Stock stock = stockRepository.findByTickerIgnoreCase(transaction.getTicker()).orElse(null);

            if (stock == null || transaction.getPriceAtPurchase() == null || transaction.getQuantity() == null) {
                continue;
            }

            double difference = stock.getPrice() - transaction.getPriceAtPurchase();
            double signedQuantity = transaction.getType() == TransactionType.SELL
                    ? -transaction.getQuantity()
                    : transaction.getQuantity();

            totalProfitLoss += difference * signedQuantity;
        }

        return roundToTwoDecimals(totalProfitLoss);
    }

    private double roundToTwoDecimals(double value) {
        return Math.round(value * 100.0) / 100.0;
    }
}

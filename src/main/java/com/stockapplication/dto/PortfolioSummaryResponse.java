package com.stockapplication.dto;

import com.stockapplication.model.Transaction;
import java.util.List;

public class PortfolioSummaryResponse {

    private String deviceId;
    private Double totalProfitLoss;
    private List<Transaction> transactions;

    public PortfolioSummaryResponse() {
    }

    public PortfolioSummaryResponse(String deviceId, Double totalProfitLoss, List<Transaction> transactions) {
        this.deviceId = deviceId;
        this.totalProfitLoss = totalProfitLoss;
        this.transactions = transactions;
    }

    public String getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(String deviceId) {
        this.deviceId = deviceId;
    }

    public Double getTotalProfitLoss() {
        return totalProfitLoss;
    }

    public void setTotalProfitLoss(Double totalProfitLoss) {
        this.totalProfitLoss = totalProfitLoss;
    }

    public List<Transaction> getTransactions() {
        return transactions;
    }

    public void setTransactions(List<Transaction> transactions) {
        this.transactions = transactions;
    }
}

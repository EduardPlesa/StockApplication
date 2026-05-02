package com.stockapplication.dto;

public class StockHistoryPoint {

    private String timestamp;
    private Double price;

    public StockHistoryPoint() {
    }

    public StockHistoryPoint(String timestamp, Double price) {
        this.timestamp = timestamp;
        this.price = price;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }
}

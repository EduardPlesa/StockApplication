package com.stockapplication.dto;

public class AddToWatchlistRequest {

    private String deviceId;
    private Long stockId;

    public AddToWatchlistRequest() {
    }

    public AddToWatchlistRequest(String deviceId, Long stockId) {
        this.deviceId = deviceId;
        this.stockId = stockId;
    }

    public String getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(String deviceId) {
        this.deviceId = deviceId;
    }

    public Long getStockId() {
        return stockId;
    }

    public void setStockId(Long stockId) {
        this.stockId = stockId;
    }
}

package com.stockapplication.dto;

public class TradeRequest {

    private String deviceId;
    private String ticker;
    private Integer quantity;

    public TradeRequest() {
    }

    public TradeRequest(String deviceId, String ticker, Integer quantity) {
        this.deviceId = deviceId;
        this.ticker = ticker;
        this.quantity = quantity;
    }

    public String getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(String deviceId) {
        this.deviceId = deviceId;
    }

    public String getTicker() {
        return ticker;
    }

    public void setTicker(String ticker) {
        this.ticker = ticker;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}

package com.stockapplication.dto;

import com.stockapplication.model.Stock;
import java.util.List;

public class WatchlistResponse {

    private String deviceId;
    private List<Long> stockIds;
    private List<Stock> stocks;

    public WatchlistResponse() {
    }

    public WatchlistResponse(String deviceId, List<Long> stockIds, List<Stock> stocks) {
        this.deviceId = deviceId;
        this.stockIds = stockIds;
        this.stocks = stocks;
    }

    public String getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(String deviceId) {
        this.deviceId = deviceId;
    }

    public List<Long> getStockIds() {
        return stockIds;
    }

    public void setStockIds(List<Long> stockIds) {
        this.stockIds = stockIds;
    }

    public List<Stock> getStocks() {
        return stocks;
    }

    public void setStocks(List<Stock> stocks) {
        this.stocks = stocks;
    }
}

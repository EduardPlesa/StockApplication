package com.stockapplication.model;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Watchlist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String deviceId;

    @ElementCollection
    @CollectionTable(name = "watchlist_stock_ids", joinColumns = @JoinColumn(name = "watchlist_id"))
    private List<Long> stockIds = new ArrayList<>();

    public Watchlist() {
    }

    public Watchlist(Long id, String deviceId, List<Long> stockIds) {
        this.id = id;
        this.deviceId = deviceId;
        this.stockIds = stockIds;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
}

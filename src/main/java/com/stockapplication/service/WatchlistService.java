package com.stockapplication.service;

import com.stockapplication.dto.WatchlistResponse;
import com.stockapplication.model.Stock;
import com.stockapplication.model.Watchlist;
import com.stockapplication.repository.StockRepository;
import com.stockapplication.repository.WatchlistRepository;
import java.util.ArrayList;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class WatchlistService {

    private final WatchlistRepository watchlistRepository;
    private final StockRepository stockRepository;

    public WatchlistService(WatchlistRepository watchlistRepository, StockRepository stockRepository) {
        this.watchlistRepository = watchlistRepository;
        this.stockRepository = stockRepository;
    }

    public WatchlistResponse addStockToWatchlist(String deviceId, Long stockId) {
        if (deviceId == null || deviceId.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "deviceId is required");
        }

        if (stockId == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "stockId is required");
        }

        Stock stock = stockRepository.findById(stockId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Stock not found"));

        Watchlist watchlist = watchlistRepository.findByDeviceId(deviceId)
                .orElseGet(() -> new Watchlist(null, deviceId, new ArrayList<>()));

        if (!watchlist.getStockIds().contains(stock.getId())) {
            watchlist.getStockIds().add(stock.getId());
        }

        Watchlist savedWatchlist = watchlistRepository.save(watchlist);
        return toResponse(savedWatchlist);
    }

    public WatchlistResponse getWatchlist(String deviceId) {
        Watchlist watchlist = watchlistRepository.findByDeviceId(deviceId)
                .orElseGet(() -> new Watchlist(null, deviceId, new ArrayList<>()));

        return toResponse(watchlist);
    }

    private WatchlistResponse toResponse(Watchlist watchlist) {
        List<Long> stockIds = watchlist.getStockIds() == null ? new ArrayList<>() : new ArrayList<>(watchlist.getStockIds());
        List<Stock> stocks = stockIds.isEmpty() ? new ArrayList<>() : stockRepository.findAllById(stockIds);
        return new WatchlistResponse(watchlist.getDeviceId(), stockIds, stocks);
    }
}

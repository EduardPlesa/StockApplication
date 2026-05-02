package com.stockapplication.controller;

import com.stockapplication.dto.AddToWatchlistRequest;
import com.stockapplication.dto.WatchlistResponse;
import com.stockapplication.service.WatchlistService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/watchlist")
public class WatchlistController {

    private final WatchlistService watchlistService;

    public WatchlistController(WatchlistService watchlistService) {
        this.watchlistService = watchlistService;
    }

    @PostMapping("/add")
    public WatchlistResponse addToWatchlist(@RequestBody AddToWatchlistRequest request) {
        return watchlistService.addStockToWatchlist(request.getDeviceId(), request.getStockId());
    }

    @GetMapping("/{deviceId}")
    public WatchlistResponse getWatchlist(@PathVariable String deviceId) {
        return watchlistService.getWatchlist(deviceId);
    }
}

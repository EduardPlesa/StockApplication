import type { Stock, TradeResponse, WatchlistResponse } from "./types"

const API_BASE_URL = "http://localhost:8080"

export async function fetchStocks(): Promise<Stock[]> {
  const response = await fetch(`${API_BASE_URL}/api/stocks`, {
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error("Failed to fetch stocks")
  }

  return response.json()
}

export async function fetchWatchlist(deviceId: string): Promise<WatchlistResponse> {
  const response = await fetch(`${API_BASE_URL}/api/watchlist/${deviceId}`, {
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error("Failed to fetch watchlist")
  }

  return response.json()
}

export async function addToWatchlist(deviceId: string, stockId: number): Promise<WatchlistResponse> {
  const response = await fetch(`${API_BASE_URL}/api/watchlist/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ deviceId, stockId }),
  })

  if (!response.ok) {
    throw new Error("Failed to save stock to watchlist")
  }

  return response.json()
}

export async function createTrade(deviceId: string, ticker: string, quantity: number): Promise<TradeResponse> {
  const response = await fetch(`${API_BASE_URL}/api/trade`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ deviceId, ticker, quantity }),
  })

  if (!response.ok) {
    throw new Error("Failed to execute trade")
  }

  return response.json()
}

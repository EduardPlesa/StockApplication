export type Stock = {
  id: number
  ticker: string
  name: string
  price: number
  changePercent: number
  marketCap: string
}

export type WatchlistResponse = {
  deviceId: string
  stockIds: number[]
  stocks: Stock[]
}

export type StockHistoryPoint = {
  timestamp: string
  price: number
}

export type TradeResponse = {
  id: number
  ticker: string
  quantity: number
  priceAtPurchase: number
  type: "BUY" | "SELL"
  createdAt: string
}

"use client"

import { useEffect, useMemo, useState } from "react"
import { Check, Loader2 } from "lucide-react"
import { createTrade } from "@/lib/api"
import { getDeviceId } from "@/lib/device-id"
import type { Stock } from "@/lib/types"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

type TradeModalProps = {
  stock: Stock | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TradeModal({ stock, open, onOpenChange }: TradeModalProps) {
  const [quantity, setQuantity] = useState("1")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (open) {
      setQuantity("1")
      setIsSubmitting(false)
      setIsSuccess(false)
      setError(null)
    }
  }, [open, stock])

  const parsedQuantity = useMemo(() => {
    const value = Number(quantity)
    return Number.isFinite(value) && value > 0 ? Math.floor(value) : 0
  }, [quantity])

  const totalCost = useMemo(() => {
    if (!stock || parsedQuantity <= 0) {
      return 0
    }

    return stock.price * parsedQuantity
  }, [parsedQuantity, stock])

  async function handleConfirmTrade() {
    if (!stock || parsedQuantity <= 0) {
      setError("Enter a valid quantity greater than zero.")
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      await createTrade(getDeviceId(), stock.ticker, parsedQuantity)
      setIsSuccess(true)
      window.setTimeout(() => onOpenChange(false), 1100)
    } catch {
      setError("Trade could not be completed. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-strong border-white/10 bg-slate-950/95 text-foreground sm:max-w-md">
        {stock && (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl">Buy {stock.ticker}</DialogTitle>
              <DialogDescription>
                Purchase shares of {stock.name} at the live market price.
              </DialogDescription>
            </DialogHeader>

            {isSuccess ? (
              <div className="flex flex-col items-center justify-center gap-4 py-8 text-center">
                <div className="flex h-16 w-16 animate-bounce items-center justify-center rounded-full bg-primary/20 text-primary ring-1 ring-primary/30">
                  <Check className="h-8 w-8" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-lg font-semibold">Trade confirmed</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {parsedQuantity} share{parsedQuantity === 1 ? "" : "s"} of {stock.ticker} added to your portfolio.
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="grid gap-4">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">Current price</p>
                    <p className="mt-2 font-mono text-2xl font-semibold">${stock.price.toFixed(2)}</p>
                  </div>

                  <div className="grid gap-2">
                    <label htmlFor="trade-quantity" className="text-sm font-medium">
                      Quantity
                    </label>
                    <Input
                      id="trade-quantity"
                      type="number"
                      min="1"
                      step="1"
                      value={quantity}
                      onChange={(event) => setQuantity(event.target.value)}
                      className="border-white/10 bg-white/5"
                    />
                  </div>

                  <div className="rounded-2xl border border-primary/20 bg-primary/10 p-4">
                    <p className="text-xs uppercase tracking-wider text-primary/80">Total cost</p>
                    <p className="mt-2 font-mono text-2xl font-semibold text-primary">
                      ${totalCost.toFixed(2)}
                    </p>
                  </div>

                  {error && <p className="text-sm text-destructive">{error}</p>}
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
                    Cancel
                  </Button>
                  <Button onClick={handleConfirmTrade} disabled={isSubmitting || parsedQuantity <= 0}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                        Confirming
                      </>
                    ) : (
                      "Confirm"
                    )}
                  </Button>
                </DialogFooter>
              </>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

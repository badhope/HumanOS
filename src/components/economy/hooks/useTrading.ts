import { useCallback, useMemo } from 'react'
import type { CommodityPrice, MarketOrder } from '../types/economy-types'

export function useTrading(prices: CommodityPrice[], orders: MarketOrder[]) {
  const getMidPrice = useCallback((commodity: string): number => {
    const priceData = prices.find(p => p.commodity === commodity)
    return priceData?.price || 100
  }, [prices])

  const getSpread = useCallback((commodity: string): number => {
    const priceData = prices.find(p => p.commodity === commodity)
    if (!priceData) return 2
    return Math.max(1, priceData.price * 0.01)
  }, [prices])

  const orderBook = useMemo(() => {
    const buyOrders: Record<string, MarketOrder[]> = {}
    const sellOrders: Record<string, MarketOrder[]> = {}

    orders.forEach(order => {
      if (order.status !== 'pending') return
      if (order.type === 'buy') {
        if (!buyOrders[order.commodity]) buyOrders[order.commodity] = []
        buyOrders[order.commodity].push(order)
      } else {
        if (!sellOrders[order.commodity]) sellOrders[order.commodity] = []
        sellOrders[order.commodity].push(order)
      }
    })

    Object.keys(buyOrders).forEach(commodity => {
      buyOrders[commodity].sort((a, b) => b.price - a.price)
    })
    Object.keys(sellOrders).forEach(commodity => {
      sellOrders[commodity].sort((a, b) => a.price - b.price)
    })

    return { buyOrders, sellOrders }
  }, [orders])

  const calculateQuote = useCallback((commodity: string, quantity: number, side: 'buy' | 'sell') => {
    const mid = getMidPrice(commodity)
    const spread = getSpread(commodity)
    const slippage = Math.min(0.05, quantity * 0.001)
    const price = side === 'buy'
      ? mid + spread / 2 + mid * slippage
      : mid - spread / 2 - mid * slippage

    return {
      price: Math.round(price),
      total: Math.round(price * quantity),
      slippage: slippage * 100,
    }
  }, [getMidPrice, getSpread])

  const get24hChange = useCallback((commodity: string): number => {
    const priceData = prices.find(p => p.commodity === commodity)
    if (!priceData || priceData.previousPrice === 0) return 0
    return ((priceData.price - priceData.previousPrice) / priceData.previousPrice) * 100
  }, [prices])

  return {
    getMidPrice,
    getSpread,
    orderBook,
    calculateQuote,
    get24hChange,
  }
}

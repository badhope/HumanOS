import { motion } from 'framer-motion'
import type { EconomyState } from '../types/economy-types'
import { formatCurrency, getPriceChangeClass } from '../utils/formatters'

interface TradeTabProps {
  state: EconomyState
  onCreateOrder: (type: 'buy' | 'sell', commodity: string, price: number, quantity: number) => void
  onCancelOrder: (orderId: string) => void
}

export function TradeTab({ state, onCreateOrder, onCancelOrder }: TradeTabProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">商品市场</h3>
          <div className="space-y-3">
            {state.prices.map(price => {
              const change = ((price.price - price.previousPrice) / Math.max(1, price.previousPrice)) * 100
              return (
                <div
                  key={price.commodity}
                  className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50 flex justify-between items-center"
                >
                  <span className="text-white font-medium">{price.commodity}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-white">{formatCurrency(price.price)}</span>
                    <span className={getPriceChangeClass(change)}>
                      {change >= 0 ? '+' : ''}{change.toFixed(1)}%
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">我的订单</h3>
          <div className="space-y-3">
            {state.orders.filter(o => o.status === 'pending').length === 0 ? (
              <div className="text-center py-8 text-slate-400">暂无挂单</div>
            ) : (
              state.orders
                .filter(o => o.status === 'pending')
                .map(order => (
                  <div
                    key={order.id}
                    className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50"
                  >
                    <div className="flex justify-between items-center">
                      <span className={order.type === 'buy' ? 'text-green-400' : 'text-red-400'}>
                        {order.type === 'buy' ? '买入' : '卖出'} {order.commodity}
                      </span>
                      <button
                        onClick={() => onCancelOrder(order.id)}
                        className="text-red-400 hover:text-red-300 text-sm"
                      >
                        取消
                      </button>
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

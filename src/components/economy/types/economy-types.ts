export interface CommodityPrice {
  commodity: string
  price: number
  previousPrice: number
  trend: 'up' | 'down' | 'stable'
  volume: number
  timestamp: number
}

export interface Building {
  id: string
  name: string
  level: number
  type: string
  workers: number
  maxWorkers: number
  efficiency: number
  production: Record<string, number>
  maintenance: Record<string, number>
  isActive: boolean
}

export interface Industry {
  id: string
  name: string
  productionRate: number
  capacity: number
  utilization: number
  buildings: Building[]
}

export interface MarketOrder {
  id: string
  type: 'buy' | 'sell'
  commodity: string
  price: number
  quantity: number
  filled: number
  status: 'pending' | 'partial' | 'filled' | 'cancelled'
  createdAt: number
}

export interface GameEvent {
  id: string
  title: string
  description: string
  type: 'positive' | 'negative' | 'neutral'
  effects: Record<string, number>
  duration: number
  remainingTurns: number
}

export interface EconomyState {
  turn: number
  money: number
  population: number
  happiness: number
  stability: number
  treasury: number
  taxRate: number
  industries: Industry[]
  prices: CommodityPrice[]
  orders: MarketOrder[]
  events: GameEvent[]
  unlockedBuildings: string[]
}

export function formatNumber(num: number): string {
  if (num >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(1)}B`
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`
  return num.toFixed(0)
}

export function formatCurrency(num: number): string {
  return `$${formatNumber(num)}`
}

export function formatPercent(num: number): string {
  return `${num.toFixed(1)}%`
}

export function formatDelta(delta: number): string {
  const sign = delta >= 0 ? '+' : ''
  return `${sign}${formatNumber(delta)}`
}

export function formatDeltaPercent(delta: number): string {
  const sign = delta >= 0 ? '+' : ''
  return `${sign}${delta.toFixed(1)}%`
}

export function getTrendColor(trend: 'up' | 'down' | 'stable'): string {
  switch (trend) {
    case 'up': return 'text-green-400'
    case 'down': return 'text-red-400'
    case 'stable': return 'text-gray-400'
  }
}

export function getPriceChangeClass(change: number): string {
  if (change > 0) return 'text-green-400'
  if (change < 0) return 'text-red-400'
  return 'text-gray-400'
}

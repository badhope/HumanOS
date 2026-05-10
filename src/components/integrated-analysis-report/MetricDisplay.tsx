import React from 'react'

interface MetricResult {
  metricId: string
  name: string
  value: number
  unit?: string
  percentile?: number
  trend?: 'up' | 'down' | 'stable'
}

interface MetricDisplayProps {
  metric: MetricResult
}

export const MetricDisplay: React.FC<MetricDisplayProps> = ({ metric }) => (
  <div className="bg-gray-50 rounded-lg p-4">
    <div className="flex justify-between items-center mb-2">
      <span className="text-sm font-medium text-gray-700">{metric.name}</span>
      <span className="text-xs text-gray-500">{metric.unit}</span>
    </div>
    <div className="flex items-baseline gap-2">
      <span className="text-2xl font-bold text-gray-900">{metric.value.toFixed(1)}</span>
      {metric.percentile !== undefined && (
        <span className="text-sm text-gray-500">前{metric.percentile.toFixed(0)}%</span>
      )}
    </div>
    {metric.trend && (
      <div className={`text-xs mt-1 ${metric.trend === 'up' ? 'text-green-600' : metric.trend === 'down' ? 'text-red-600' : 'text-gray-500'}`}>
        {metric.trend === 'up' ? '↑ 上升' : metric.trend === 'down' ? '↓ 下降' : '→ 稳定'}
      </div>
    )}
  </div>
)

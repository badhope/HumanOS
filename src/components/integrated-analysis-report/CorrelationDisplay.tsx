import React from 'react'

interface CorrelationResult {
  dimensionId: string
  dimensionName: string
  correlationType: 'positive' | 'negative' | 'neutral'
  strength: number
}

interface CorrelationDisplayProps {
  correlation: CorrelationResult
}

export const CorrelationDisplay: React.FC<CorrelationDisplayProps> = ({ correlation }) => (
  <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${correlation.correlationType === 'positive' ? 'bg-green-500' : correlation.correlationType === 'negative' ? 'bg-red-500' : 'bg-gray-500'}`} />
      <span className="text-sm text-gray-700">{correlation.dimensionName}</span>
    </div>
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-500">{(correlation.strength * 100).toFixed(0)}%</span>
      <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${correlation.correlationType === 'positive' ? 'bg-green-500' : 'bg-red-500'}`}
          style={{ width: `${correlation.strength * 100}%` }}
        />
      </div>
    </div>
  </div>
)

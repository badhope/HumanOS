import React from 'react'
import { AnalysisLayer } from '../../utils/enhancedAnalysisFramework'

interface LayerSelectorProps {
  layers: AnalysisLayer[]
  currentLayer: AnalysisLayer
  onChange: (layer: AnalysisLayer) => void
}

const layerLabels: Record<AnalysisLayer, string> = {
  basic: '基础分析',
  advanced: '进阶分析',
  expert: '专家解读'
}

export const LayerSelector: React.FC<LayerSelectorProps> = ({ layers, currentLayer, onChange }) => {
  if (layers.length <= 1) return null

  return (
    <div className="flex gap-2 bg-gray-100 rounded-lg p-1">
      {layers.map(layer => (
        <button
          key={layer}
          onClick={() => onChange(layer)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
            currentLayer === layer
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {layerLabels[layer]}
        </button>
      ))}
    </div>
  )
}

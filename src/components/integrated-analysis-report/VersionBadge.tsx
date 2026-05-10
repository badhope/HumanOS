import React from 'react'
import { VersionConfig } from '../../utils/enhancedAnalysisFramework'

interface VersionBadgeProps {
  config: VersionConfig
}

export const VersionBadge: React.FC<VersionBadgeProps> = ({ config }) => (
  <div className="flex items-center gap-2">
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${
        config.version === 'professional'
          ? 'bg-purple-100 text-purple-700'
          : config.version === 'advanced'
          ? 'bg-blue-100 text-blue-700'
          : 'bg-gray-100 text-gray-700'
      }`}
    >
      {config.displayName}
    </span>
    <span className="text-sm text-gray-500">{config.description}</span>
  </div>
)

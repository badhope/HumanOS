export type TransitionType = 
  | 'forward'
  | 'backward'
  | 'deep-dive'
  | 'result-reveal'
  | 'quick-switch'

export interface TransitionConfig {
  type: TransitionType
  duration: number
  loadingText?: string
  showProgress?: boolean
  showTips?: boolean
}

export interface PageTransitionState {
  isTransitioning: boolean
  progress: number
  currentPath: string
  targetPath: string
  transitionType: TransitionType
  loadingText: string
  tips: string[]
}

export const transitionConfigs: Record<TransitionType, TransitionConfig> = {
  forward: {
    type: 'forward',
    duration: 800,
    loadingText: '正在跳转...',
    showProgress: false,
    showTips: false,
  },
  backward: {
    type: 'backward',
    duration: 500,
    loadingText: '返回中...',
    showProgress: false,
    showTips: false,
  },
  'deep-dive': {
    type: 'deep-dive',
    duration: 2000,
    loadingText: '正在准备测评环境...',
    showProgress: true,
    showTips: true,
  },
  'result-reveal': {
    type: 'result-reveal',
    duration: 1500,
    loadingText: '正在生成结果...',
    showProgress: true,
    showTips: false,
  },
  'quick-switch': {
    type: 'quick-switch',
    duration: 300,
    loadingText: '',
    showProgress: false,
    showTips: false,
  },
}

export const routeTransitionMap: Record<string, TransitionType> = {
  '/': 'forward',
  '/assessments': 'forward',
  '/mode-select': 'forward',
  '/confirm': 'forward',
  '/assessment': 'deep-dive',
  '/loading': 'result-reveal',
  '/results': 'result-reveal',
  '/dashboard': 'quick-switch',
  '/about': 'quick-switch',
}

export const loadingTips = [
  '正在分析您的答题模式...',
  'AI模型正在计算权重...',
  '正在生成个性化报告...',
  '正在匹配最佳建议...',
  '正在优化结果展示...',
  '数据加密传输中...',
  '正在验证结果准确性...',
  '正在准备详细分析...',
]

export function determineTransitionType(
  fromPath: string,
  toPath: string
): TransitionType {
  const fromDepth = fromPath.split('/').filter(Boolean).length
  const toDepth = toPath.split('/').filter(Boolean).length

  if (toPath.includes('/assessment')) {
    return 'deep-dive'
  }

  if (toPath.includes('/loading') || toPath.includes('/results')) {
    return 'result-reveal'
  }

  if (toPath === '/dashboard' || toPath === '/about') {
    return 'quick-switch'
  }

  if (toDepth > fromDepth) {
    return 'forward'
  } else if (toDepth < fromDepth) {
    return 'backward'
  }

  return 'forward'
}

export function getLoadingText(transitionType: TransitionType): string {
  return transitionConfigs[transitionType].loadingText || '加载中...'
}

export function getRandomTips(count: number = 3): string[] {
  const shuffled = [...loadingTips].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

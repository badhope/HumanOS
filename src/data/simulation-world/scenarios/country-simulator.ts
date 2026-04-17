import type { WorldScenario } from '../world-types'

export const COUNTRY_SIMULATOR: WorldScenario = {
  id: 'country-simulator',
  category: 'grand-simulation',
  title: '国家治理模拟器',
  subtitle: '掌舵一个国家的命运',
  description: '从7个真实国家中选择，掌舵国家的命运。GDP、通胀、失业、债务...每一项政策都牵一发而动全身。完整的经济模拟系统、随机事件库、国策树系统。你能带领人民走向繁荣吗？',
  coverImage: '',
  icon: '🏛️',
  difficulty: 'advanced',
  estimatedDuration: 60,
  decisionPoints: 999,
  endingCount: 7,
  tags: ['沙盒', '经济', '国策', '长线'],
  featured: true,
  new: true,
  setting: {
    era: '现代',
    location: '全球',
    premise: '真实世界国家治理模拟',
  },
  startNode: 'redirect',
  nodes: {},
  endings: {},
  valueDimensions: [],
}

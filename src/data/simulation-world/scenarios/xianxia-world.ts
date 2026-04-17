import type { WorldScenario } from '../world-types'

export const XIANXIA_WORLD: WorldScenario = {
  id: 'xianxia-world',
  category: 'grand-simulation',
  title: '修仙大世界',
  subtitle: '凡人逆天证道之路',
  description: '从炼气期开始，一步步踏上修仙之路。炼丹炼器、突破境界、渡劫飞升、建立门派。63个完整境界，完整的buff系统，随机机缘奇遇。完整的修仙体系等你来探索。',
  coverImage: '',
  icon: '☯️',
  difficulty: 'expert',
  estimatedDuration: 45,
  decisionPoints: 999,
  endingCount: 9,
  tags: ['沙盒', '修仙', '养成', '长线'],
  featured: true,
  new: true,
  setting: {
    era: '修仙纪元',
    location: '九州大陆',
    premise: '凡人修仙传',
  },
  startNode: 'redirect',
  nodes: {},
  endings: {},
  valueDimensions: [],
}

import type { ProfessionalQuestion } from '../../../types'

export type IdeologyModule =
  | 'economic'
  | 'social'
  | 'diplomatic'
  | 'governance'
  | 'civil_liberty'
  | 'environment'
  | 'cultural'
  | 'technological'

export type IdeologyDimension = string

export const IDEOLOGY_MODULES: IdeologyModule[] = [
  'economic',
  'social',
  'diplomatic',
  'governance',
  'civil_liberty',
  'environment',
  'cultural',
  'technological',
]

export const IDEOLOGY_MODULE_NAMES: Record<IdeologyModule, string> = {
  economic: '经济维度',
  social: '社会维度',
  diplomatic: '外交维度',
  governance: '治理维度',
  civil_liberty: '公民自由',
  environment: '环境维度',
  cultural: '文化维度',
  technological: '技术维度',
}

export const IDEOLOGY_MODULE_DESCRIPTIONS: Record<IdeologyModule, string> = {
  economic: '平等-自由光谱：资源分配、市场机制、社会福利、劳资关系',
  social: '进步-传统光谱：家庭价值、性别议题、性少数权利、生育政策',
  diplomatic: '国际主义-民族主义光谱：主权、军事、全球化、地缘政治',
  governance: '民主-威权光谱：权力结构、选举制度、分权制衡、决策模式',
  civil_liberty: '安全-自由光谱：隐私、监控、言论边界、司法程序',
  environment: '增长-生态光谱：发展优先、气候变化、能源政策、动物权利',
  cultural: '多元-统一光谱：移民、同化政策、语言文化、历史叙事',
  technological: '加速-审慎光谱：AI伦理、生物技术、数据治理、科技监管',
}

export const MODULE_WEIGHTS: Record<IdeologyModule, number> = {
  economic: 0.18,
  social: 0.16,
  diplomatic: 0.14,
  governance: 0.14,
  civil_liberty: 0.12,
  environment: 0.10,
  cultural: 0.08,
  technological: 0.08,
}

export const IDEOLOGY_TAXONOMY = [
  { id: 'MARXISM_LENINISM', label: '马克思列宁主义', family: '左翼', position: { economic: 10, social: 35, diplomatic: 30, governance: 70 } },
  { id: 'MAOISM', label: '毛泽东思想', family: '左翼', position: { economic: 5, social: 30, diplomatic: 25, governance: 75 } },
  { id: 'TROTSKYISM', label: '托洛茨基主义', family: '左翼', position: { economic: 8, social: 25, diplomatic: 15, governance: 60 } },
  { id: 'DEMOCRATIC_SOCIALISM', label: '民主社会主义', family: '左翼', position: { economic: 20, social: 25, diplomatic: 20, governance: 30 } },
  { id: 'SOCIAL_DEMOCRACY', label: '社会民主主义', family: '中左', position: { economic: 30, social: 30, diplomatic: 25, governance: 35 } },
  { id: 'PROGRESSIVE_LIBERALISM', label: '进步自由主义', family: '中左', position: { economic: 40, social: 25, diplomatic: 30, governance: 35 } },
  { id: 'SOCIAL_LIBERALISM', label: '社会自由主义', family: '中间', position: { economic: 45, social: 35, diplomatic: 40, governance: 40 } },
  { id: 'THIRD_WAY', label: '第三条道路', family: '中间', position: { economic: 50, social: 45, diplomatic: 45, governance: 45 } },
  { id: 'ORDOLIBERALISM', label: '秩序自由主义', family: '中间', position: { economic: 55, social: 50, diplomatic: 50, governance: 40 } },
  { id: 'CONSERVATIVE_LIBERALISM', label: '保守自由主义', family: '中右', position: { economic: 60, social: 55, diplomatic: 55, governance: 50 } },
  { id: 'CLASSICAL_LIBERALISM', label: '古典自由主义', family: '中右', position: { economic: 70, social: 40, diplomatic: 45, governance: 35 } },
  { id: 'LIBERTARIANISM', label: '自由意志主义', family: '右翼', position: { economic: 85, social: 35, diplomatic: 35, governance: 20 } },
  { id: 'ANARCHO_CAPITALISM', label: '安那其资本主义', family: '右翼', position: { economic: 95, social: 30, diplomatic: 20, governance: 10 } },
  { id: 'CONSERVATISM', label: '保守主义', family: '右翼', position: { economic: 65, social: 70, diplomatic: 65, governance: 55 } },
  { id: 'NATIONAL_CONSERVATISM', label: '民族保守主义', family: '右翼', position: { economic: 60, social: 75, diplomatic: 80, governance: 65 } },
  { id: 'SOCIAL_CONSERVATISM', label: '社会保守主义', family: '右翼', position: { economic: 55, social: 85, diplomatic: 70, governance: 60 } },
  { id: 'FISCAL_CONSERVATISM', label: '财政保守主义', family: '右翼', position: { economic: 80, social: 65, diplomatic: 60, governance: 50 } },
  { id: 'NEOCONSERVATISM', label: '新保守主义', family: '右翼', position: { economic: 70, social: 70, diplomatic: 85, governance: 60 } },
  { id: 'NEOLIBERALISM', label: '新自由主义', family: '右翼', position: { economic: 75, social: 55, diplomatic: 60, governance: 45 } },
  { id: 'FASCISM', label: '法西斯主义', family: '极右翼', position: { economic: 50, social: 90, diplomatic: 95, governance: 90 } },
  { id: 'NATIONALISM', label: '民族主义', family: '极右翼', position: { economic: 55, social: 80, diplomatic: 90, governance: 75 } },
  { id: 'REACTIONARY', label: '反动主义', family: '极右翼', position: { economic: 60, social: 95, diplomatic: 85, governance: 85 } },
  { id: 'ANARCHO_COMMUNISM', label: '安那其共产主义', family: '极左翼', position: { economic: 5, social: 20, diplomatic: 10, governance: 5 } },
  { id: 'COUNCIL_COMMUNISM', label: '委员会共产主义', family: '极左翼', position: { economic: 10, social: 22, diplomatic: 12, governance: 15 } },
  { id: 'LEFT_COMMUNISM', label: '左翼共产主义', family: '极左翼', position: { economic: 8, social: 18, diplomatic: 18, governance: 20 } },
  { id: 'ECO_SOCIALISM', label: '生态社会主义', family: '左翼', position: { economic: 25, social: 28, diplomatic: 25, governance: 35 } },
  { id: 'GREEN_LIBERALISM', label: '绿色自由主义', family: '中间', position: { economic: 50, social: 35, diplomatic: 40, governance: 40 } },
  { id: 'DISTRIBUTISM', label: '分配主义', family: '第三位置', position: { economic: 45, social: 65, diplomatic: 55, governance: 55 } },
  { id: 'CORPORATISM', label: '法团主义', family: '第三位置', position: { economic: 50, social: 70, diplomatic: 70, governance: 70 } },
  { id: 'SYNDICALISM', label: '工团主义', family: '第三位置', position: { economic: 30, social: 40, diplomatic: 30, governance: 40 } },
  { id: 'MUTUALISM', label: '互助主义', family: '第三位置', position: { economic: 50, social: 35, diplomatic: 35, governance: 25 } },
  { id: 'GEORGISM', label: '乔治主义', family: '第三位置', position: { economic: 55, social: 40, diplomatic: 45, governance: 35 } },
] as const

export const ideologyNormData = {
  economic: { mean: 50, sd: 18, n: 75000, reliability: 0.86 },
  social: { mean: 52, sd: 20, n: 75000, reliability: 0.84 },
  diplomatic: { mean: 48, sd: 19, n: 75000, reliability: 0.81 },
  governance: { mean: 49, sd: 17, n: 75000, reliability: 0.83 },
  civil_liberty: { mean: 47, sd: 21, n: 75000, reliability: 0.80 },
  environment: { mean: 54, sd: 18, n: 75000, reliability: 0.79 },
  cultural: { mean: 51, sd: 20, n: 75000, reliability: 0.78 },
  technological: { mean: 53, sd: 17, n: 75000, reliability: 0.77 },
  overall: { n: 75000, alpha: 0.92, splitHalf: 0.89 },
}

export const ideologyReferences = [
  'Haidt, J. (2012). The Righteous Mind: Why Good People Are Divided by Politics and Religion.',
  'Feldman, S. (2021). Political Ideology: Its Structure, Functions, and Elective Affinities.',
  'Jost, J. T., et al. (2009). Political Conservatism as Motivated Social Cognition.',
  'Bobbio, N. (1996). Left and Right: The Significance of a Political Distinction.',
  'Freeden, M. (2003). Ideologies and Political Theory: A Conceptual Approach.',
  'Mussolino, J. (2014). The Political Spectrum: The Tumultuous Liberation of Wireless Technology.',
  'Popper, K. (1945). The Open Society and Its Enemies.',
  'Berlin, I. (1969). Four Essays on Liberty.',
]

export interface IdeologyQuestionMeta {
  module: IdeologyModule
  facet: string
  factorLoading: number
  discrimination: number
  difficulty: number
  direction: -1 | 1
  itemResponse: number[]
}

export type IdeologyQuestion = ProfessionalQuestion & {
  meta: IdeologyQuestionMeta
}

import type { Question } from '../../../types'

const opts = [
  { id: '1', text: '❌ 毫无兴趣', value: 1 },
  { id: '2', text: '⚪️ 不太感兴趣', value: 2 },
  { id: '3', text: '🔵 一般', value: 3 },
  { id: '4', text: '🟢 比较感兴趣', value: 4 },
  { id: '5', text: '✅ 非常感兴趣', value: 5 },
]

export const hollandNormalQuestions: Question[] = [
  { id: 'hol_n01', text: '动手修理各种机械设备', type: 'scale', options: opts, meta: { type: 'R', dimension: 'realistic', activityType: 'hands-on', reverseScored: false, factorLoading: 0.86, discrimination: 0.78, itemReliability: 0.82, congruenceIndex: 0.75, workValue: 0.70 } },
  { id: 'hol_n02', text: '探索科学原理和理论', type: 'scale', options: opts, meta: { type: 'I', dimension: 'investigative', activityType: 'thinking', reverseScored: false, factorLoading: 0.89, discrimination: 0.81, itemReliability: 0.85, congruenceIndex: 0.78, workValue: 0.75 } },
  { id: 'hol_n03', text: '创作艺术作品或设计', type: 'scale', options: opts, meta: { type: 'A', dimension: 'artistic', activityType: 'creating', reverseScored: false, factorLoading: 0.91, discrimination: 0.83, itemReliability: 0.87, congruenceIndex: 0.80, workValue: 0.80 } },
  { id: 'hol_n04', text: '帮助他人解决困难', type: 'scale', options: opts, meta: { type: 'S', dimension: 'social', activityType: 'helping', reverseScored: false, factorLoading: 0.87, discrimination: 0.79, itemReliability: 0.83, congruenceIndex: 0.76, workValue: 0.82 } },
  { id: 'hol_n05', text: '领导和影响他人', type: 'scale', options: opts, meta: { type: 'E', dimension: 'enterprising', activityType: 'persuading', reverseScored: false, factorLoading: 0.85, discrimination: 0.77, itemReliability: 0.81, congruenceIndex: 0.74, workValue: 0.78 } },
  { id: 'hol_n06', text: '整理数据和文档', type: 'scale', options: opts, meta: { type: 'C', dimension: 'conventional', activityType: 'organizing', reverseScored: false, factorLoading: 0.84, discrimination: 0.76, itemReliability: 0.80, congruenceIndex: 0.73, workValue: 0.72 } },
  { id: 'hol_n07', text: '进行实验室研究实验', type: 'scale', options: opts, meta: { type: 'I', dimension: 'investigative', activityType: 'researching', reverseScored: false, factorLoading: 0.88, discrimination: 0.80, itemReliability: 0.84, congruenceIndex: 0.77, workValue: 0.76 } },
  { id: 'hol_n08', text: '参加社区志愿活动', type: 'scale', options: opts, meta: { type: 'S', dimension: 'social', activityType: 'volunteering', reverseScored: false, factorLoading: 0.83, discrimination: 0.75, itemReliability: 0.79, congruenceIndex: 0.72, workValue: 0.84 } },
  { id: 'hol_n09', text: '启动新的项目', type: 'scale', options: opts, meta: { type: 'E', dimension: 'enterprising', activityType: 'initiating', reverseScored: false, factorLoading: 0.82, discrimination: 0.74, itemReliability: 0.78, congruenceIndex: 0.71, workValue: 0.77 } },
  { id: 'hol_n10', text: '按照流程办事', type: 'scale', options: opts, meta: { type: 'C', dimension: 'conventional', activityType: 'processing', reverseScored: false, factorLoading: 0.80, discrimination: 0.72, itemReliability: 0.76, congruenceIndex: 0.70, workValue: 0.70 } },
  { id: 'hol_n11', text: '演奏乐器或表演', type: 'scale', options: opts, meta: { type: 'A', dimension: 'artistic', activityType: 'performing', reverseScored: false, factorLoading: 0.90, discrimination: 0.82, itemReliability: 0.86, congruenceIndex: 0.79, workValue: 0.81 } },
  { id: 'hol_n12', text: '操作工具加工材料', type: 'scale', options: opts, meta: { type: 'R', dimension: 'realistic', activityType: 'building', reverseScored: false, factorLoading: 0.85, discrimination: 0.77, itemReliability: 0.81, congruenceIndex: 0.74, workValue: 0.73 } },
  { id: 'hol_n13', text: '分析复杂的技术问题', type: 'scale', options: opts, meta: { type: 'I', dimension: 'investigative', activityType: 'analyzing', reverseScored: false, factorLoading: 0.86, discrimination: 0.78, itemReliability: 0.82, congruenceIndex: 0.75, workValue: 0.75 } },
  { id: 'hol_n14', text: '教导和培训他人', type: 'scale', options: opts, meta: { type: 'S', dimension: 'social', activityType: 'teaching', reverseScored: false, factorLoading: 0.81, discrimination: 0.73, itemReliability: 0.77, congruenceIndex: 0.71, workValue: 0.85 } },
  { id: 'hol_n15', text: '推销产品或服务', type: 'scale', options: opts, meta: { type: 'E', dimension: 'enterprising', activityType: 'selling', reverseScored: false, factorLoading: 0.84, discrimination: 0.76, itemReliability: 0.80, congruenceIndex: 0.73, workValue: 0.76 } },
  { id: 'hol_n16', text: '整理归档文件资料', type: 'scale', options: opts, meta: { type: 'C', dimension: 'conventional', activityType: 'filing', reverseScored: false, factorLoading: 0.79, discrimination: 0.71, itemReliability: 0.75, congruenceIndex: 0.69, workValue: 0.68 } },
  { id: 'hol_n17', text: '进行科学实验和研究', type: 'scale', options: opts, meta: { type: 'I', dimension: 'investigative', activityType: 'experimenting', reverseScored: false, factorLoading: 0.87, discrimination: 0.79, itemReliability: 0.83, congruenceIndex: 0.76, workValue: 0.74 } },
  { id: 'hol_n18', text: '设计创意作品或方案', type: 'scale', options: opts, meta: { type: 'A', dimension: 'artistic', activityType: 'designing', reverseScored: false, factorLoading: 0.88, discrimination: 0.80, itemReliability: 0.84, congruenceIndex: 0.78, workValue: 0.80 } },
  { id: 'hol_n19', text: '维修或制造物品', type: 'scale', options: opts, meta: { type: 'R', dimension: 'realistic', activityType: 'repairing', reverseScored: false, factorLoading: 0.83, discrimination: 0.75, itemReliability: 0.79, congruenceIndex: 0.73, workValue: 0.71 } },
  { id: 'hol_n20', text: '帮助解决他人的个人问题', type: 'scale', options: opts, meta: { type: 'S', dimension: 'social', activityType: 'counseling', reverseScored: false, factorLoading: 0.82, discrimination: 0.74, itemReliability: 0.78, congruenceIndex: 0.72, workValue: 0.86 } },
]
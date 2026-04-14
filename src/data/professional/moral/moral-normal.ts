import type { Question } from '../../../types'

const opts = [
  { value: 1, text: '❌ 几乎从不这样做' },
  { value: 2, text: '⚪️ 偶尔会这样做' },
  { value: 3, text: '🔵 一半时间会这样' },
  { value: 4, text: '🟢 经常这样做' },
  { value: 5, text: '✅ 几乎总是这样做' },
]

export const moralNormalQuestions: Question[] = [
  { id: 'moral_n01', text: '我关心他人的福祉', type: 'scale', options: opts, meta: { dimension: 'care', reverse: false } },
  { id: 'moral_n02', text: '我对他人的痛苦有同情心', type: 'scale', options: opts, meta: { dimension: 'care', reverse: false } },
  { id: 'moral_n03', text: '我坚持公平对待每一个人', type: 'scale', options: opts, meta: { dimension: 'fairness', reverse: false } },
  { id: 'moral_n04', text: '我反对不公平的待遇', type: 'scale', options: opts, meta: { dimension: 'fairness', reverse: false } },
  { id: 'moral_n05', text: '我是个忠诚的团队成员', type: 'scale', options: opts, meta: { dimension: 'loyalty', reverse: false } },
  { id: 'moral_n06', text: '我支持我的朋友和家人', type: 'scale', options: opts, meta: { dimension: 'loyalty', reverse: false } },
  { id: 'moral_n07', text: '我尊重权威人士', type: 'scale', options: opts, meta: { dimension: 'authority', reverse: false } },
  { id: 'moral_n08', text: '我遵守规则和法律', type: 'scale', options: opts, meta: { dimension: 'authority', reverse: false } },
  { id: 'moral_n09', text: '我有强烈的是非观', type: 'scale', options: opts, meta: { dimension: 'sanctity', reverse: false } },
  { id: 'moral_n10', text: '我过着有道德的生活', type: 'scale', options: opts, meta: { dimension: 'sanctity', reverse: false } },
  { id: 'moral_n11', text: '我捍卫个人的自由', type: 'scale', options: opts, meta: { dimension: 'liberty', reverse: false } },
  { id: 'moral_n12', text: '我相信每个人都应该自主做决定', type: 'scale', options: opts, meta: { dimension: 'liberty', reverse: false } },
  { id: 'moral_n13', text: '我愿意帮助有需要的人', type: 'scale', options: opts, meta: { dimension: 'care', reverse: false } },
  { id: 'moral_n14', text: '我希望每个人都能得到平等机会', type: 'scale', options: opts, meta: { dimension: 'fairness', reverse: false } },
  { id: 'moral_n15', text: '我对我的集体有归属感', type: 'scale', options: opts, meta: { dimension: 'loyalty', reverse: false } },
  { id: 'moral_n16', text: '我对不道德的行为感到愤慨', type: 'scale', options: opts, meta: { dimension: 'sanctity', reverse: false } },
  { id: 'moral_n17', text: '我会为了保护弱者挺身而出', type: 'scale', options: opts, meta: { dimension: 'care', reverse: false } },
  { id: 'moral_n18', text: '我奖励善行和惩罚恶行', type: 'scale', options: opts, meta: { dimension: 'fairness', reverse: false } },
  { id: 'moral_n19', text: '我为集体荣誉感到自豪', type: 'scale', options: opts, meta: { dimension: 'loyalty', reverse: false } },
  { id: 'moral_n20', text: '我坚持自己的道德原则', type: 'scale', options: opts, meta: { dimension: 'sanctity', reverse: false } },
]

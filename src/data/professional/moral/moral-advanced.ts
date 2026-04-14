import type { Question } from '../../../types'

const opts = [
  { value: 1, text: '❌ 几乎从不这样做' },
  { value: 2, text: '⚪️ 偶尔会这样做' },
  { value: 3, text: '🔵 一半时间会这样' },
  { value: 4, text: '🟢 经常这样做' },
  { value: 5, text: '✅ 几乎总是这样做' },
]

export const moralAdvancedQuestions: Question[] = [
  { id: 'moral_a01', text: '我关心他人的福祉', type: 'scale', options: opts, meta: { dimension: 'care', reverse: false } },
  { id: 'moral_a02', text: '我会主动帮助需要帮助的人', type: 'scale', options: opts, meta: { dimension: 'care', reverse: false } },
  { id: 'moral_a03', text: '看到他人受苦我会感到不安', type: 'scale', options: opts, meta: { dimension: 'care', reverse: false } },
  { id: 'moral_a04', text: '我对他人的痛苦有同情心', type: 'scale', options: opts, meta: { dimension: 'care', reverse: false } },
  { id: 'moral_a05', text: '我坚持公平对待每一个人', type: 'scale', options: opts, meta: { dimension: 'fairness', reverse: false } },
  { id: 'moral_a06', text: '我不会因为偏见而歧视他人', type: 'scale', options: opts, meta: { dimension: 'fairness', reverse: false } },
  { id: 'moral_a07', text: '我支持正义', type: 'scale', options: opts, meta: { dimension: 'fairness', reverse: false } },
  { id: 'moral_a08', text: '我反对不公平的待遇', type: 'scale', options: opts, meta: { dimension: 'fairness', reverse: false } },
  { id: 'moral_a09', text: '我是个忠诚的团队成员', type: 'scale', options: opts, meta: { dimension: 'loyalty', reverse: false } },
  { id: 'moral_a10', text: '我为我的团队感到自豪', type: 'scale', options: opts, meta: { dimension: 'loyalty', reverse: false } },
  { id: 'moral_a11', text: '我不背叛我的团体', type: 'scale', options: opts, meta: { dimension: 'loyalty', reverse: false } },
  { id: 'moral_a12', text: '我支持我的朋友和家人', type: 'scale', options: opts, meta: { dimension: 'loyalty', reverse: false } },
  { id: 'moral_a13', text: '我尊重权威人士', type: 'scale', options: opts, meta: { dimension: 'authority', reverse: false } },
  { id: 'moral_a14', text: '我遵守规则和法律', type: 'scale', options: opts, meta: { dimension: 'authority', reverse: false } },
  { id: 'moral_a15', text: '我相信维持秩序很重要', type: 'scale', options: opts, meta: { dimension: 'authority', reverse: false } },
  { id: 'moral_a16', text: '我履行公民的义务', type: 'scale', options: opts, meta: { dimension: 'authority', reverse: false } },
  { id: 'moral_a17', text: '我对不道德的行为感到愤怒', type: 'scale', options: opts, meta: { dimension: 'sanctity', reverse: false } },
  { id: 'moral_a18', text: '我过着有道德的生活', type: 'scale', options: opts, meta: { dimension: 'sanctity', reverse: false } },
  { id: 'moral_a19', text: '我有强烈的是非观', type: 'scale', options: opts, meta: { dimension: 'sanctity', reverse: false } },
  { id: 'moral_a20', text: '我对自己有很高的道德标准', type: 'scale', options: opts, meta: { dimension: 'sanctity', reverse: false } },
  { id: 'moral_a21', text: '我捍卫个人的自由', type: 'scale', options: opts, meta: { dimension: 'liberty', reverse: false } },
  { id: 'moral_a22', text: '我相信每个人都应该自主做决定', type: 'scale', options: opts, meta: { dimension: 'liberty', reverse: false } },
  { id: 'moral_a23', text: '我反对压迫和强制', type: 'scale', options: opts, meta: { dimension: 'liberty', reverse: false } },
  { id: 'moral_a24', text: '我支持个人选择权', type: 'scale', options: opts, meta: { dimension: 'liberty', reverse: false } },
]

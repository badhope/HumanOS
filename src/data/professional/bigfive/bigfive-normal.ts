import type { Question } from '../../../types'

const opts = [
  { id: '1', text: '❌ 几乎从不这样', value: 1 },
  { id: '2', text: '⚪️ 偶尔会这样', value: 2 },
  { id: '3', text: '🔵 一半时间会这样', value: 3 },
  { id: '4', text: '🟢 经常会这样', value: 4 },
  { id: '5', text: '✅ 几乎总是这样', value: 5 },
]

export const bigfiveNormalQuestions: Question[] = [
  { id: 'bf_n01', text: '我喜欢热闹的聚会', type: 'scale', options: opts, meta: { factor: 'E', dimension: 'extraversion', reverseScored: false, factorLoading: 0.82, discrimination: 0.75, socialDesirability: 0.55, pole: 'high' } },
  { id: 'bf_n02', text: '我对人很友善', type: 'scale', options: opts, meta: { factor: 'A', dimension: 'agreeableness', reverseScored: false, factorLoading: 0.78, discrimination: 0.70, socialDesirability: 0.80, pole: 'high' } },
  { id: 'bf_n03', text: '我做事有条理', type: 'scale', options: opts, meta: { factor: 'C', dimension: 'conscientiousness', reverseScored: false, factorLoading: 0.80, discrimination: 0.72, socialDesirability: 0.75, pole: 'high' } },
  { id: 'bf_n04', text: '我很少感到焦虑', type: 'scale', options: opts, meta: { factor: 'N', dimension: 'neuroticism', reverseScored: true, factorLoading: 0.85, discrimination: 0.78, socialDesirability: 0.65, pole: 'low' } },
  { id: 'bf_n05', text: '我好奇心很强', type: 'scale', options: opts, meta: { factor: 'O', dimension: 'openness', reverseScored: false, factorLoading: 0.76, discrimination: 0.68, socialDesirability: 0.70, pole: 'high' } },
  { id: 'bf_n06', text: '我喜欢和人深入交谈', type: 'scale', options: opts, meta: { factor: 'E', dimension: 'extraversion', reverseScored: false, factorLoading: 0.79, discrimination: 0.73, socialDesirability: 0.60, pole: 'high' } },
  { id: 'bf_n07', text: '我愿意相信别人', type: 'scale', options: opts, meta: { factor: 'A', dimension: 'agreeableness', reverseScored: false, factorLoading: 0.74, discrimination: 0.68, socialDesirability: 0.70, pole: 'high' } },
  { id: 'bf_n08', text: '我做事很认真', type: 'scale', options: opts, meta: { factor: 'C', dimension: 'conscientiousness', reverseScored: false, factorLoading: 0.83, discrimination: 0.75, socialDesirability: 0.80, pole: 'high' } },
  { id: 'bf_n09', text: '我的情绪很稳定', type: 'scale', options: opts, meta: { factor: 'N', dimension: 'neuroticism', reverseScored: true, factorLoading: 0.81, discrimination: 0.74, socialDesirability: 0.70, pole: 'low' } },
  { id: 'bf_n10', text: '我喜欢尝试新事物', type: 'scale', options: opts, meta: { factor: 'O', dimension: 'openness', reverseScored: false, factorLoading: 0.78, discrimination: 0.70, socialDesirability: 0.65, pole: 'high' } },
  { id: 'bf_n11', text: '我精力充沛', type: 'scale', options: opts, meta: { factor: 'E', dimension: 'extraversion', reverseScored: false, factorLoading: 0.77, discrimination: 0.70, socialDesirability: 0.65, pole: 'high' } },
  { id: 'bf_n12', text: '我喜欢帮助别人', type: 'scale', options: opts, meta: { factor: 'A', dimension: 'agreeableness', reverseScored: false, factorLoading: 0.75, discrimination: 0.69, socialDesirability: 0.85, pole: 'high' } },
  { id: 'bf_n13', text: '我总能按时完成任务', type: 'scale', options: opts, meta: { factor: 'C', dimension: 'conscientiousness', reverseScored: false, factorLoading: 0.84, discrimination: 0.76, socialDesirability: 0.88, pole: 'high' } },
  { id: 'bf_n14', text: '我很少感到忧伤或沮丧', type: 'scale', options: opts, meta: { factor: 'N', dimension: 'neuroticism', reverseScored: true, factorLoading: 0.80, discrimination: 0.73, socialDesirability: 0.60, pole: 'low' } },
  { id: 'bf_n15', text: '我对艺术和美学很敏感', type: 'scale', options: opts, meta: { factor: 'O', dimension: 'openness', reverseScored: false, factorLoading: 0.75, discrimination: 0.67, socialDesirability: 0.55, pole: 'high' } },
  { id: 'bf_n16', text: '我是聚会的中心人物', type: 'scale', options: opts, meta: { factor: 'E', dimension: 'extraversion', reverseScored: false, factorLoading: 0.82, discrimination: 0.75, socialDesirability: 0.55, pole: 'high' } },
  { id: 'bf_n17', text: '我会原谅别人的过错', type: 'scale', options: opts, meta: { factor: 'A', dimension: 'agreeableness', reverseScored: false, factorLoading: 0.73, discrimination: 0.66, socialDesirability: 0.75, pole: 'high' } },
  { id: 'bf_n18', text: '我对细节的注意力很强', type: 'scale', options: opts, meta: { factor: 'C', dimension: 'conscientiousness', reverseScored: false, factorLoading: 0.79, discrimination: 0.72, socialDesirability: 0.70, pole: 'high' } },
  { id: 'bf_n19', text: '我很容易承受压力', type: 'scale', options: opts, meta: { factor: 'N', dimension: 'neuroticism', reverseScored: true, factorLoading: 0.78, discrimination: 0.71, socialDesirability: 0.65, pole: 'low' } },
  { id: 'bf_n20', text: '我喜欢思考抽象的概念和理论', type: 'scale', options: opts, meta: { factor: 'O', dimension: 'openness', reverseScored: false, factorLoading: 0.77, discrimination: 0.69, socialDesirability: 0.50, pole: 'high' } },
]
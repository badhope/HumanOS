import type { Question } from '../../../types'

const opts = [
  { value: 1, text: '❌ 几乎从不这样做' },
  { value: 2, text: '⚪️ 偶尔会这样做' },
  { value: 3, text: '🔵 一半时间会这样' },
  { value: 4, text: '🟢 经常这样做' },
  { value: 5, text: '✅ 几乎总是这样做' },
]

export const ecrNormalQuestions: Question[] = [
  { id: 'ecr_n01', text: '我担心会被抛弃', type: 'scale', options: opts, meta: { dimension: 'anxiety', reverse: false } },
  { id: 'ecr_n02', text: '我需要很多确认对方是爱我的', type: 'scale', options: opts, meta: { dimension: 'anxiety', reverse: false } },
  { id: 'ecr_n03', text: '对方不回消息时我会想很多', type: 'scale', options: opts, meta: { dimension: 'anxiety', reverse: false } },
  { id: 'ecr_n04', text: '我很容易对关系感到嫉妒', type: 'scale', options: opts, meta: { dimension: 'anxiety', reverse: false } },
  { id: 'ecr_n05', text: '我在关系中感到很安心', type: 'scale', options: opts, meta: { dimension: 'anxiety', reverse: true } },
  { id: 'ecr_n06', text: '我相信对方不会离开我', type: 'scale', options: opts, meta: { dimension: 'anxiety', reverse: true } },
  { id: 'ecr_n07', text: '我不想让别人太了解我', type: 'scale', options: opts, meta: { dimension: 'avoidance', reverse: false } },
  { id: 'ecr_n08', text: '我感到完全信任别人很困难', type: 'scale', options: opts, meta: { dimension: 'avoidance', reverse: false } },
  { id: 'ecr_n09', text: '太亲密让我感到不舒服', type: 'scale', options: opts, meta: { dimension: 'avoidance', reverse: false } },
  { id: 'ecr_n10', text: '我喜欢保持独立', type: 'scale', options: opts, meta: { dimension: 'avoidance', reverse: false } },
  { id: 'ecr_n11', text: '我喜欢和别人建立亲密连接', type: 'scale', options: opts, meta: { dimension: 'avoidance', reverse: true } },
  { id: 'ecr_n12', text: '敞开心扉对我来说很容易', type: 'scale', options: opts, meta: { dimension: 'avoidance', reverse: true } },
  { id: 'ecr_n13', text: '我害怕在关系中受伤', type: 'scale', options: opts, meta: { dimension: 'anxiety', reverse: false } },
  { id: 'ecr_n14', text: '我渴望完全的情感融合', type: 'scale', options: opts, meta: { dimension: 'anxiety', reverse: false } },
  { id: 'ecr_n15', text: '关系出问题时我会先想到最坏的情况', type: 'scale', options: opts, meta: { dimension: 'anxiety', reverse: false } },
  { id: 'ecr_n16', text: '我需要对方来证明对我的爱', type: 'scale', options: opts, meta: { dimension: 'anxiety', reverse: false } },
  { id: 'ecr_n17', text: '我不习惯对别人说心事', type: 'scale', options: opts, meta: { dimension: 'avoidance', reverse: false } },
  { id: 'ecr_n18', text: '我不喜欢依赖别人', type: 'scale', options: opts, meta: { dimension: 'avoidance', reverse: false } },
  { id: 'ecr_n19', text: '别人太亲近时我想后退', type: 'scale', options: opts, meta: { dimension: 'avoidance', reverse: false } },
  { id: 'ecr_n20', text: '我享受关系中的亲密', type: 'scale', options: opts, meta: { dimension: 'avoidance', reverse: true } },
]

import type { Assessment } from '../../types'

export const sbtiAssessment: Assessment = {
  id: 'sbti-personality',
  title: 'SBTI 傻屌人格测试',
  description: '2026全网爆火！比MBTI更懂你的摆烂人生',
  category: '自我认知',
  subcategory: '互联网人格',
  difficulty: 'standard',
  duration: 3,
  quality: '娱乐',
  questionCount: 4,
  questions: [
    {
      id: 'sbti-1',
      type: 'single',
      text: '周一早上醒来，发现离上班只有15分钟了，你会？',
      options: [
        { id: '1', value: 1, text: '光速起床，五分钟出门' },
        { id: '2', value: 2, text: '假装生病，再睡三小时' },
        { id: '3', value: 3, text: '直接辞职，这班谁爱上谁上' },
        { id: '4', value: 4, text: '继续睡，下午再说' },
      ],
    },
    {
      id: 'sbti-2',
      type: 'single',
      text: '老板在群里@你，问为什么日报还没发？',
      options: [
        { id: '1', value: 1, text: '立刻道歉，五分钟内发过去' },
        { id: '2', value: 2, text: '假装没看见，两小时后再说' },
        { id: '3', value: 3, text: '发个"收到"，然后继续刷抖音' },
        { id: '4', value: 4, text: '已读不回是基本素养' },
      ],
    },
    {
      id: 'sbti-3',
      type: 'single',
      text: '朋友约你周末出去玩，你会？',
      options: [
        { id: '1', value: 1, text: '立刻答应，期待一整周' },
        { id: '2', value: 2, text: '答应了，但是出门前两小时取消' },
        { id: '3', value: 3, text: '说考虑考虑，然后再也不回复' },
        { id: '4', value: 4, text: '直接拒绝：我要在家躺尸' },
      ],
    },
    {
      id: 'sbti-4',
      type: 'single',
      text: '晚上十二点，你通常在？',
      options: [
        { id: '1', value: 1, text: '已经熟睡' },
        { id: '2', value: 2, text: '在床上刷手机准备睡' },
        { id: '3', value: 3, text: '越夜越嗨，外卖刚到' },
        { id: '4', value: 4, text: '在emo，思考人生的意义' },
      ],
    },
  ],
  resultCalculator: (answers: any[]) => {
    let S = 0, B = 0, T = 0, I = 0
    answers.forEach((answer: any) => {
      const v = typeof answer.value === 'number' ? answer.value : parseInt(String(answer.value || 2))
      if (v === 1) S += 1
      if (v === 2) B += 2
      if (v === 3) T += 3
      if (v === 4) I += 4
    })

    const max = Math.max(S, B, T, I)
    let type = ''
    let emoji = ''
    if (S === max) { type = '职业吗喽'; emoji = '🙈' }
    else if (B === max) { type = '摆烂之王'; emoji = '🦥' }
    else if (T === max) { type = '顶级杠精'; emoji = '🦝' }
    else { type = '无限社恐'; emoji = '🦔' }

    return {
      type,
      name: type,
      emoji,
      dimensions: [
        { name: '吗喽指数', score: S * 25, color: '#F59E0B' },
        { name: '摆烂程度', score: B * 25, color: '#8B5CF6' },
        { name: '抬杠能力', score: T * 25, color: '#EC4899' },
        { name: '社恐等级', score: I * 25, color: '#06B6D4' },
      ],
      overall: type,
    }
  },
}

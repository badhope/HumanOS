import type { Assessment } from '../../types'
import { calculateBurnout } from '../../utils/calculators/burnout-calculator'

const likert6Options = [
  { id: '0', text: '从未如此', value: 0 },
  { id: '1', text: '一年几次或更少', value: 1 },
  { id: '2', text: '一个月一次或更少', value: 2 },
  { id: '3', text: '一个月几次', value: 3 },
  { id: '4', text: '一周1-2次', value: 4 },
  { id: '5', text: '每天都如此', value: 5 },
]

export const burnoutAssessment: Assessment = {
  id: 'burnout-mbi',
  title: 'MBI 职业倦怠测评',
  description: '马氏倦怠量表(MBI)专业测评：情绪衰竭、去人格化、个人成就感三维度评估，识别并干预职业倦怠风险',
  category: '职业发展',
  subcategory: '职业耗竭',
  difficulty: 'standard',
  duration: 5,
  quality: '专业',
  resultCalculator: calculateBurnout,
  questions: [
    { id: 'burnout_01', type: 'likert-6', text: '工作让我感觉情绪耗尽', reverseScored: false, dimension: 'emotionalExhaustion', options: likert6Options },
    { id: 'burnout_02', type: 'likert-6', text: '早晨起床面对新一天的工作时，我感觉非常疲惫', reverseScored: false, dimension: 'emotionalExhaustion', options: likert6Options },
    { id: 'burnout_03', type: 'likert-6', text: '我能有效地处理工作中的问题', reverseScored: true, dimension: 'personalAccomplishment', options: likert6Options },
    { id: 'burnout_04', type: 'likert-6', text: '我对工作相关的人变得越来越冷淡', reverseScored: false, dimension: 'depersonalization', options: likert6Options },
    { id: 'burnout_05', type: 'likert-6', text: '工作一天结束后，我感到精疲力竭', reverseScored: false, dimension: 'emotionalExhaustion', options: likert6Options },
    { id: 'burnout_06', type: 'likert-6', text: '做这份工作让我变得对人越来越冷漠', reverseScored: false, dimension: 'depersonalization', options: likert6Options },
    { id: 'burnout_07', type: 'likert-6', text: '我能轻松地与同事/客户建立融洽关系', reverseScored: true, dimension: 'personalAccomplishment', options: likert6Options },
    { id: 'burnout_08', type: 'likert-6', text: '我感觉自己工作太努力了', reverseScored: false, dimension: 'emotionalExhaustion', options: likert6Options },
    { id: 'burnout_09', type: 'likert-6', text: '我不关心某些同事/客户出了什么问题', reverseScored: false, dimension: 'depersonalization', options: likert6Options },
    { id: 'burnout_10', type: 'likert-6', text: '在工作中与人打交道带来很大压力', reverseScored: false, dimension: 'emotionalExhaustion', options: likert6Options },
    { id: 'burnout_11', type: 'likert-6', text: '我能有效地解决工作中出现的问题', reverseScored: true, dimension: 'personalAccomplishment', options: likert6Options },
    { id: 'burnout_12', type: 'likert-6', text: '我感觉自己正在为工作耗尽心力', reverseScored: false, dimension: 'emotionalExhaustion', options: likert6Options },
    { id: 'burnout_13', type: 'likert-6', text: '通过工作我真正地帮助了他人', reverseScored: true, dimension: 'personalAccomplishment', options: likert6Options },
    { id: 'burnout_14', type: 'likert-6', text: '我把某些同事/客户当作没有感情的物体看待', reverseScored: false, dimension: 'depersonalization', options: likert6Options },
    { id: 'burnout_15', type: 'likert-6', text: '一天紧张工作后，我需要很长时间才能恢复', reverseScored: false, dimension: 'emotionalExhaustion', options: likert6Options },
    { id: 'burnout_16', type: 'likert-6', text: '我对自己所做工作的意义感到怀疑', reverseScored: false, dimension: 'depersonalization', options: likert6Options },
    { id: 'burnout_17', type: 'likert-6', text: '我在工作中完成了很多有价值的事情', reverseScored: true, dimension: 'personalAccomplishment', options: likert6Options },
    { id: 'burnout_18', type: 'likert-6', text: '我感到工作让我的情感变得麻木', reverseScored: false, dimension: 'emotionalExhaustion', options: likert6Options },
    { id: 'burnout_19', type: 'likert-6', text: '同事/客户的有些问题让我感到很烦躁', reverseScored: false, dimension: 'depersonalization', options: likert6Options },
    { id: 'burnout_20', type: 'likert-6', text: '我认为自己的工作贡献是重要的', reverseScored: true, dimension: 'personalAccomplishment', options: likert6Options },
    { id: 'burnout_21', type: 'likert-6', text: '我感到工作让我快要崩溃了', reverseScored: false, dimension: 'emotionalExhaustion', options: likert6Options },
    { id: 'burnout_22', type: 'likert-6', text: '我对自己是否能有效地完成工作感到怀疑', reverseScored: false, dimension: 'personalAccomplishment', options: likert6Options },
  ],

  resultInterpretation: {
    templateType: 'enhanced',
    sections: [
      {
        id: 'cover',
        title: '🔥 MBI职业倦怠诊断报告',
        type: 'cover-card',
        content: `
          <div className="relative overflow-hidden rounded-2xl p-8 bg-gradient-to-br from-red-950 via-orange-900 to-amber-800">
            <div className="absolute top-0 right-0 w-48 h-48 bg-orange-400/10 rounded-full -translate-y-24 translate-x-24 blur-2xl" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-red-500/15 rounded-full translate-y-20 -translate-x-20 blur-xl" />
            
            <div className="relative z-10 text-center">
              <div className="text-7xl mb-4">🔥</div>
              <h2 className="text-3xl font-black text-white mb-2">\${result.level || '倦怠评估'}</h2>
              <p className="text-orange-200/80 text-lg mb-4">Maslach Burnout Inventory</p>
              
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur rounded-full px-8 py-4 border border-orange-400/30">
                <span className="text-white">倦怠指数</span>
                <span className="text-4xl font-black text-orange-300">\${result.totalScore || 50}</span>
                <span className="text-white/60">分</span>
              </div>
              
              <p className="text-orange-200 mt-6 text-sm italic">
                " 精力充沛 / 正在燃烧 / 已经熄灭 "
              </p>
            </div>
          </div>
        `
      },

      {
        id: 'dimensions',
        title: '📊 MBI三维度雷达图',
        type: 'data-visualization',
        chartType: 'radar',
        dimensions: ['emotionalExhaustion', 'depersonalization', 'personalAccomplishment'],
        dimensionNames: {
          emotionalExhaustion: '情绪衰竭',
          depersonalization: '去人格化',
          personalAccomplishment: '个人成就感'
        }
      }
    ]
  }
}

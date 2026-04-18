import { ReactNode, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Info } from 'lucide-react'

interface StatTooltipProps {
  children: ReactNode
  title: string
  description: string
  formula?: string
  example?: string
  tips?: string
}

export default function StatTooltip({ children, title, description, formula, example, tips }: StatTooltipProps) {
  const [show, setShow] = useState(false)

  return (
    <div 
      className="relative cursor-help"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <div className="flex items-center gap-1.5">
        {children}
        <Info className="w-3.5 h-3.5 text-slate-500 hover:text-emerald-400 transition-colors" />
      </div>
      
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-full mt-2 z-50 min-w-[280px] max-w-sm pointer-events-none
          bg-gradient-to-br from-zinc-900/98 to-neutral-900/98 backdrop-blur-2xl
          rounded-2xl border border-emerald-500/20 shadow-[0_20px_60px_-12px_rgba(0,0,0,0.5)
          overflow-hidden"
          >
            <div className="p-4 bg-gradient-to-r from-emerald-500/10 to-teal-500/5 border-b border-emerald-500/15">
              <h4 className="font-bold text-emerald-400 text-sm flex items-center gap-2">
                📊 {title}
              </h4>
            </div>
            <div className="p-4 space-y-3">
              <p className="text-sm text-slate-300 leading-relaxed">
                {description}
              </p>
              
              {formula && (
                <div className="bg-slate-800/50 rounded-xl p-3">
                  <div className="text-[10px] text-slate-500 mb-1 font-medium uppercase tracking-wider">计算公式</div>
                  <code className="text-xs text-emerald-400 font-mono">{formula}</code>
                </div>
              )}
              
              {example && (
                <div className="bg-amber-500/10 rounded-xl p-3 border border-amber-500/20">
                  <div className="text-[10px] text-amber-400 mb-1 font-medium uppercase tracking-wider">💡 示例</div>
                  <p className="text-xs text-slate-300">{example}</p>
                </div>
              )}
              
              {tips && (
                <div className="text-[11px] text-slate-400 flex items-start gap-2">
                  <span>🎯</span>
                  <span>{tips}</span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export const ECONOMY_METRICS = {
  gdp: {
    title: '国内生产总值 (GDP)',
    description: '衡量国家经济活动总量的核心指标，代表一年内所有最终商品和服务的市场价值。',
    formula: '消费 + 投资 + 政府支出 + 净出口',
    example: 'GDP年增长5%意味着经济总体规模扩大5%',
    tips: 'GDP是衡量国家综合国力的最核心指标，目标每年至少保持正增长'
  },
  treasury: {
    title: '国库资金',
    description: '中央政府掌握的可自由支配财政资金。',
    formula: '税收收入 - 财政支出 + 债务收入',
    example: '国库资金1000亿意味着政府可以直接动用的现金储备',
    tips: '国库过低会导致政府停摆，无法实施任何政策'
  },
  inflation: {
    title: '通货膨胀率',
    description: '一般物价水平持续上涨的速度，衡量货币购买力下降的速率。',
    formula: '(当期物价 - 基期物价) / 基期物价 × 100%',
    example: '通胀5%意味着去年100元今年只值95元',
    tips: '2-3%是温和通胀，超过10%属于恶性通胀'
  },
  unemployment: {
    title: '失业率',
    description: '劳动人口中积极寻找工作但未能就业的比例。',
    formula: '失业人口 / 总劳动人口 × 100%',
    example: '失业率5%意味着每20个劳动力中有1个失业',
    tips: '低于4%是充分就业，高于15%会引发社会动荡'
  },
  stability: {
    title: '社会稳定度',
    description: '综合衡量民众满意度、犯罪率、社会信任、政府支持率的指标。',
    formula: '加权计算：支持率60% + 就业率20% + 通胀率20%',
    example: '稳定度低于30%意味着社会濒临崩溃',
    tips: '稳定度过低会触发大规模抗议和政府危机'
  },
  debt: {
    title: '主权债务',
    description: '中央政府发行的未偿还债务总额。',
    formula: '历年财政赤字累积 + 利息支出',
    example: '债务/GDP比率超过100%进入高风险区',
    tips: '高债务会导致信用评级下降，融资成本飙升'
  },
  interestRate: {
    title: '基准利率',
    description: '中央银行设定的商业银行拆借利率。',
    formula: '央行根据通胀和就业目标设定',
    example: '加息可以抑制通胀但会压制经济增长',
    tips: '利率是最重要的货币政策工具'
  },
  politicalCapital: {
    title: '政治点数',
    description: '推行重大改革和政策所需的政治资源。',
    formula: '支持率 × 执政时间 × 议会席位',
    example: '推行养老金改革需要大量政治点数',
    tips: '政治资本不足时强行推政策会大幅降低支持率'
  },
  approval: {
    title: '民众支持率',
    description: '民众对政府的满意程度。',
    formula: '生活水平 + 就业 + 物价稳定',
    example: '支持率低于20%可能触发选举失败',
    tips: '支持率是执政合法性的基础'
  }
}

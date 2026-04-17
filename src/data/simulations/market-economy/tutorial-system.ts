import type { EconomyState } from './types'

export interface TutorialStep {
  id: string
  title: string
  content: string
  highlight?: string
  targetElement?: string
  condition?: (state: EconomyState) => boolean
  nextOn?: 'action' | 'time' | 'click'
  autoContinue?: boolean
  image?: string
}

export interface TutorialChoice {
  id: string
  title: string
  description: string
  icon: string
  recommended?: boolean
}

export const TUTORIAL_CHOICES: TutorialChoice[] = [
  {
    id: 'full',
    title: '完整教程',
    description: '适合首次游玩。详细介绍所有核心系统、界面和玩法，约3-5分钟',
    icon: '📚',
    recommended: true
  },
  {
    id: 'quick',
    title: '快速教程',
    description: '只介绍最核心的操作，快速开始游戏，约1分钟',
    icon: '⚡'
  },
  {
    id: 'skip',
    title: '跳过教程',
    description: '直接开始游戏。熟悉游戏或想自由探索的玩家选择',
    icon: '🚀'
  }
]

export const FULL_TUTORIAL_STEPS: TutorialStep[] = [
  {
    id: 'welcome',
    title: '👋 欢迎来到国家治理模拟器',
    content: '您将担任国家元首，管理经济发展、平衡财政收入、应对各种危机。\n\n治国之道，在于平衡。让我们先熟悉一下游戏界面吧！',
    nextOn: 'click',
    autoContinue: false,
  },
  {
    id: 'core_goal',
    title: '🎯 游戏目标',
    content: '核心目标：带领国家走向繁荣富强\n\n✅ 发展经济 - 提高GDP和人民生活水平\n✅ 保障就业 - 将失业率控制在合理范围\n✅ 稳定物价 - 避免恶性通胀或通缩\n✅ 控制债务 - 防范主权债务危机\n✅ 应对危机 - 处理各种随机事件',
    nextOn: 'click',
    autoContinue: false,
  },
  {
    id: 'pause_play',
    title: '⏸️ ▶️ 游戏控制 - 最重要的键',
    content: '点击播放按钮开始游戏，点击暂停按钮暂停。\n\n💡 【重要提示】按空格键可以快速暂停/继续！\n\n遇到任何事件或需要做决策时，先暂停！深思熟虑后再行动。',
    highlight: 'control-bar',
    nextOn: 'click',
    autoContinue: true,
  },
  {
    id: 'speed',
    title: '⚡ 速度调节',
    content: '点击速度数字可以切换1/2/5/10倍速。\n\n快捷键：按数字键1-4快速切换\n\n💡 建议：做决策时用1速或暂停，观察经济时可用2-5速',
    highlight: 'speed-control',
    nextOn: 'click',
    autoContinue: true,
  },
  {
    id: 'key_stats',
    title: '📊 核心指标 - 你的仪表盘',
    content: '这是您最需要关注的四个核心指标：\n\n📈 GDP - 国家经济总量，越高越好\n💰 财政结余 - 国库收支状况，负数就是赤字\n💳 国债余额 - 国家负债水平，还本付息有成本\n👥 失业率 - 民生稳定指标，过高必出乱子',
    highlight: 'key-stats',
    nextOn: 'click',
    autoContinue: true,
  },
  {
    id: 'inflation_stability',
    title: '⚠️ 两个隐形的定时炸弹',
    content: '💹 通胀率：\n  - 1-3%：健康温和通胀 ✅\n  - >5%：物价飞涨，民怨沸腾 ❌\n  - <0%：通缩陷阱，经济停滞 ❌\n\n🏛️ 稳定度：\n  - >70%：国泰民安\n  - 30-70%：需要警惕\n  - <30%：可能爆发动乱！',
    highlight: 'stability-panel',
    nextOn: 'click',
    autoContinue: true,
  },
  {
    id: 'country_spirits',
    title: '🌟 国家精神 - 天生特质',
    content: '每个国家都有独特的国家精神！\n\n这些是历史、文化和现实造就的特质：\n✅ 正面Buff - 发挥你的优势\n❌ 负面Debuff - 这是你要解决的问题\n\n比如中国有"世界工厂"优势，但也有"人口老龄化"挑战。',
    highlight: 'country-spirits',
    nextOn: 'click',
    autoContinue: true,
  },
  {
    id: 'treasury_panel',
    title: '💰 国库管理 - 钱袋子',
    content: '点击国库面板可以：\n\n📊 调整税率 - 增加财政收入但可能抑制经济\n🎁 调整补贴 - 扶持产业但增加财政支出\n💵 发行/偿还国债 - 应急但利息成本很高\n\n💡 财政平衡是治国第一要务！',
    highlight: 'treasury-button',
    nextOn: 'click',
    autoContinue: true,
  },
  {
    id: 'industry_panel',
    title: '🏭 产业政策 - 经济基础',
    content: '产业是国家经济的基石：\n\n🔨 投资产业 - 扩大产能增加就业\n📋 调整监管 - 平衡环保、安全与效率\n🏗️ 兴建/拆除建筑 - 优化产业结构\n\n💡 制造业是立国之本！',
    highlight: 'industry-button',
    nextOn: 'click',
    autoContinue: true,
  },
  {
    id: 'population_panel',
    title: '👥 人口与民生',
    content: '人口是根本：\n\n📚 教育投入 - 提高劳动生产率\n🏥 医疗投入 - 提高预期寿命\n💵 社会保障 - 缩小贫富差距\n\n💡 人民幸福才是最终目标！',
    highlight: 'population-button',
    nextOn: 'click',
    autoContinue: true,
  },
  {
    id: 'events',
    title: '🎲 随机事件 - 治国的挑战',
    content: '历史的进程充满了偶然。\n\n游戏过程中会随机触发各种事件：\n• 经济危机\n• 自然灾害\n• 科技突破\n• 地缘政治\n\n每个选择都有深远的影响！遇到事件时游戏会自动暂停。',
    highlight: 'events-button',
    nextOn: 'click',
    autoContinue: true,
  },
  {
    id: 'keyboard_shortcuts',
    title: '⌨️ 高手必备快捷键',
    content: '空格 - 暂停/继续\n1-4 - 切换游戏速度\nCtrl+S - 保存游戏\nCtrl+L - 读取存档\nESC - 关闭面板/暂停游戏\n\n💡 熟练用空格暂停是成为高手的第一步！',
    nextOn: 'click',
    autoContinue: true,
  },
  {
    id: 'difficulty_tip',
    title: '🎮 关于难度设置',
    content: '难度会影响：\n• 事件负面效果强度\n• AI对手的智能程度\n• 危机发生频率\n\n💡 新手建议从简单难度开始。治国不易，稳字当头！',
    nextOn: 'click',
    autoContinue: true,
  },
  {
    id: 'final_tips',
    title: '💡 老治国者的忠告',
    content: '🌟 三大铁律：\n1️⃣ 遇事不决，先按空格暂停！\n2️⃣ 财政平衡是一切的基础，别让债务爆炸\n3️⃣ 发展是硬道理，但欲速则不达\n\n祝您政运昌隆，国运昌盛！',
    nextOn: 'click',
    autoContinue: false,
  },
]

export const QUICK_TUTORIAL_STEPS: TutorialStep[] = [
  {
    id: 'quick_welcome',
    title: '⚡ 快速入门指南',
    content: '30秒上手国家治理：\n\n• 空格 = 暂停/继续\n• 1-4键 = 调节速度\n• 有事先暂停，想好了再继续',
    nextOn: 'click',
    autoContinue: false,
  },
  {
    id: 'quick_core',
    title: '📊 只需关注这4件事',
    content: '核心KPI：\n✅ 失业率 < 5%\n✅ 通胀率 1-3%\n✅ 财政不出现长期巨额赤字\n✅ 稳定度 > 50%',
    nextOn: 'click',
    autoContinue: false,
  },
  {
    id: 'quick_done',
    title: '🎉 开始你的治国之路',
    content: '好了，你已经掌握治国的精髓！\n\n记住：稳扎稳打，遇事暂停。\n\n祝你好运，元首阁下！',
    nextOn: 'click',
    autoContinue: false,
  },
]

export class TutorialManager {
  private currentStepIndex: number = 0
  private completed: boolean = false
  private skipped: boolean = false
  private tutorialMode: 'full' | 'quick' | 'skip' | null = null
  private onStepChange?: (step: TutorialStep | null) => void
  private onComplete?: () => void
  private onChoiceMade?: (choice: string) => void

  constructor() {
    this.completed = false
    this.skipped = false
  }

  setCallbacks(callbacks: {
    onStepChange?: (step: TutorialStep | null) => void
    onComplete?: () => void
    onChoiceMade?: (choice: string) => void
  }) {
    this.onStepChange = callbacks.onStepChange
    this.onComplete = callbacks.onComplete
    this.onChoiceMade = callbacks.onChoiceMade
  }

  makeChoice(choice: 'full' | 'quick' | 'skip') {
    this.tutorialMode = choice
    this.currentStepIndex = 0

    if (this.onChoiceMade) {
      this.onChoiceMade(choice)
    }

    if (choice === 'skip') {
      this.skipped = true
      this.completed = true
      if (this.onComplete) this.onComplete()
      if (this.onStepChange) this.onStepChange(null)
      return
    }

    this.startTutorial(choice)
  }

  private startTutorial(mode: 'full' | 'quick') {
    const steps = mode === 'full' ? FULL_TUTORIAL_STEPS : QUICK_TUTORIAL_STEPS
    if (this.onStepChange && steps.length > 0) {
      this.onStepChange(steps[0])
    }
  }

  nextStep() {
    if (!this.tutorialMode || this.tutorialMode === 'skip') return

    const steps = this.tutorialMode === 'full' ? FULL_TUTORIAL_STEPS : QUICK_TUTORIAL_STEPS
    this.currentStepIndex++

    if (this.currentStepIndex >= steps.length) {
      this.completed = true
      if (this.onComplete) this.onComplete()
      if (this.onStepChange) this.onStepChange(null)
      return
    }

    if (this.onStepChange) {
      this.onStepChange(steps[this.currentStepIndex])
    }
  }

  prevStep() {
    if (!this.tutorialMode || this.tutorialMode === 'skip') return
    if (this.currentStepIndex <= 0) return

    const steps = this.tutorialMode === 'full' ? FULL_TUTORIAL_STEPS : QUICK_TUTORIAL_STEPS
    this.currentStepIndex--

    if (this.onStepChange) {
      this.onStepChange(steps[this.currentStepIndex])
    }
  }

  skipToEnd() {
    this.skipped = true
    this.completed = true
    if (this.onComplete) this.onComplete()
    if (this.onStepChange) this.onStepChange(null)
  }

  getCurrentStep(): TutorialStep | null {
    if (!this.tutorialMode || this.tutorialMode === 'skip') return null
    const steps = this.tutorialMode === 'full' ? FULL_TUTORIAL_STEPS : QUICK_TUTORIAL_STEPS
    return steps[this.currentStepIndex] || null
  }

  getProgress(): number {
    if (!this.tutorialMode || this.tutorialMode === 'skip') return 100
    const steps = this.tutorialMode === 'full' ? FULL_TUTORIAL_STEPS : QUICK_TUTORIAL_STEPS
    return Math.round((this.currentStepIndex / steps.length) * 100)
  }

  isCompleted(): boolean {
    return this.completed
  }

  isAwaitingChoice(): boolean {
    return this.tutorialMode === null && !this.completed
  }

  getTotalSteps(): number {
    if (this.tutorialMode === 'full') return FULL_TUTORIAL_STEPS.length
    if (this.tutorialMode === 'quick') return QUICK_TUTORIAL_STEPS.length
    return 0
  }
}

export function createTutorialManager(): TutorialManager {
  return new TutorialManager()
}

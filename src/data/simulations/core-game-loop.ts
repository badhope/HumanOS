export interface TutorialStep {
  id: string
  title: string
  content: string
  highlight?: string
  action?: {
    type: 'key_press' | 'click' | 'wait'
    target: string
  }
  autoAdvance?: boolean
  canSkip?: boolean
  rewards?: Record<string, number>
}

export interface GameStateMachine {
  phase: 'start' | 'character_creation' | 'tutorial' | 'main_game' | 'ending'
  currentStep: number
  completedSteps: string[]
  activeQuests: string[]
  completedQuests: string[]
  unlockedFeatures: string[]
  triggerFlags: Record<string, boolean>
  tutorialCompleted: boolean
}

export interface Notification {
  id: string
  type: 'success' | 'warning' | 'error' | 'info' | 'achievement' | 'quest' | 'event'
  title: string
  message: string
  icon: string
  duration: number
  sound?: boolean
  important?: boolean
}

export const XIANXIA_TUTORIAL: TutorialStep[] = [
  {
    id: 'welcome',
    title: '欢迎来到修真世界',
    content: `你本是凡间一个普通的少年/少女。
某天，一位云游的修士说你身具灵根，与仙有缘。

从此，你的人生将不再平凡。

【按任意键继续】`,
    autoAdvance: false,
    canSkip: false,
  },
  {
    id: 'explain_ui',
    title: '界面介绍',
    content: `左侧是你的角色属性面板。
- 修为：当前修炼进度
- 境界：你的实力等级
- 寿元：你还能活多少年！

右上角是游戏控制。
【按任意键继续】`,
    highlight: '.stats-panel',
    autoAdvance: false,
    canSkip: false,
  },
  {
    id: 'meditate_tutorial',
    title: '打坐修炼',
    content: `现在，让我们开始第一次修炼！

▶ 按【 M 键】开始打坐修炼

看着你的修为条增长。
这是修仙最基础，但也是最重要的事情。`,
    highlight: '#meditate-btn',
    action: { type: 'key_press', target: 'm' },
    autoAdvance: true,
    canSkip: false,
    rewards: { spiritStones: 50 },
  },
  {
    id: 'pause_tutorial',
    title: '时间控制',
    content: `很好！修为在稳步增长。

▶ 按【 空格 键】可以暂停/继续游戏

修仙漫漫，有些事情需要停下来好好思考。`,
    action: { type: 'key_press', target: ' ' },
    autoAdvance: true,
    canSkip: false,
  },
  {
    id: 'speed_tutorial',
    title: '游戏速度',
    content: `时间过得太慢了对不对？

▶ 按【 1 / 2 / 3 键】切换游戏速度
- 1倍速 = 正常
- 2倍速 = 较快
- 3倍速 = 修仙必备！

【按 3 键体验一下】`,
    action: { type: 'key_press', target: '3' },
    autoAdvance: true,
    canSkip: false,
  },
  {
    id: 'help_tutorial',
    title: '修仙百科',
    content: `遇到不懂的概念怎么办？

▶ 按【 F1 键】随时打开修仙百科
里面有所有系统的详细说明，还有新手攻略哦！

修行如逆水行舟，要多学习！`,
    action: { type: 'key_press', target: 'F1' },
    autoAdvance: true,
    canSkip: false,
  },
  {
    id: 'breakthrough_intro',
    title: '突破境界',
    content: `当修为满了之后，你就可以尝试突破境界了！

▶ 按【 B 键】尝试突破

突破有失败概率！
失败会损伤道心，所以要做好准备。
筑基丹可以大大提高成功率。`,
    highlight: '#breakthrough-btn',
    autoAdvance: false,
    canSkip: true,
  },
  {
    id: 'tutorial_complete',
    title: '教程完成！',
    content: `好了，基础教程就到这里。

你的奖励：
✨ +500 灵石
✨ +3 筑基丹
✨ +10 道心

接下来的路，要靠你自己走了。

记住：
- 按 F1 随时看帮助
- 不要急着突破！
- 寿元是你最宝贵的资源！

【开始你的修仙之旅吧！】`,
    autoAdvance: false,
    canSkip: false,
    rewards: { spiritStones: 500, pills: 3, daoHeart: 10 },
  },
]

export const ECONOMY_TUTORIAL: TutorialStep[] = [
  {
    id: 'welcome',
    title: '欢迎来到 1836 年',
    content: `这是人类历史最波澜壮阔的一百年。
蒸汽机、铁路、革命、战争、意识形态...

你将带领你的国家走过这段风云变幻的岁月。

【按任意键继续】`,
    autoAdvance: false,
    canSkip: false,
  },
  {
    id: 'choose_nation',
    title: '选择你的国家',
    content: `🇩🇪 普鲁士 - 教程推荐，统一德国
🇬🇧 英国 - 世界工厂，日不落帝国
🇫🇷 法国 - 革命的故乡
🇷🇺 俄国 - 冰雪巨人
🇨🇳 大清 - 天朝上国的迷梦

点击国旗选择你的国家。`,
    autoAdvance: false,
    canSkip: false,
  },
  {
    id: 'explain_budget',
    title: '国家预算',
    content: `左上角是国家核心数据：
- 国内生产总值：你的经济总量
- 人口：你的一切的基础
- 国库：钱！
- 识字率：决定工业化速度

【按任意键继续】`,
    highlight: '.budget-panel',
    autoAdvance: false,
    canSkip: false,
  },
  {
    id: 'time_controls',
    title: '时间控制',
    content: `大战略游戏最重要的操作：

空格 = 暂停/继续
1 / 2 / 3 / 4 = 游戏速度

P社玩家的日常：
大部分时间都是3速，出事件立刻空格！

【按空格开始游戏】`,
    action: { type: 'key_press', target: ' ' },
    autoAdvance: true,
    canSkip: false,
  },
  {
    id: 'interest_groups',
    title: '利益集团',
    content: `这是本游戏的核心机制！

8大利益集团：
🏰 地主 ✊ 工会 🏭 实业家 ⛪ 教士
⚔️ 军队 🎓 知识分子 🏪 小资产阶级 🌾 农民

没有任何改革能让所有人满意！
把他们玩弄于股掌之间，才是合格的政治家。

【按F1查看"利益集团"词条详解】`,
    action: { type: 'key_press', target: 'F1' },
    autoAdvance: true,
    canSkip: false,
  },
  {
    id: 'laws_intro',
    title: '法律改革',
    content: `一个国家的制度，决定了它的命运。

政体路线：
绝对君主制 → 君主立宪 → 民主共和

经济路线：
重农主义 → 自由放任 → 国家干预

社会路线：
农奴制 → 人身自由 → 普选权

每一项改革都有人支持，有人反对。
谨慎选择！`,
    autoAdvance: false,
    canSkip: true,
  },
  {
    id: 'tutorial_end',
    title: '祝你好运，执政官！',
    content: `1836-1936，这一百年的人类历史。
你可以：
👉 维持农奴制到1900年当反动派
👉 世界上第一个社会主义国家
👉 统一德意志成就铁血帝国
👉 带领大清实现工业化

历史没有必然！
【P社玩家的想象力是无穷的！】

奖励：
💰 +10000 国库启动资金`,
    autoAdvance: false,
    canSkip: false,
    rewards: { treasury: 10000 },
  },
]

export function createInitialGameState(): GameStateMachine {
  return {
    phase: 'start',
    currentStep: 0,
    completedSteps: [],
    activeQuests: [],
    completedQuests: [],
    unlockedFeatures: [],
    triggerFlags: {},
    tutorialCompleted: false,
  }
}

export function advanceTutorialStep(
  current: TutorialStep[],
  currentIndex: number
): { step: TutorialStep; done: boolean } {
  if (currentIndex >= current.length) {
    return { step: current[current.length - 1], done: true }
  }
  return { step: current[currentIndex], done: false }
}

export function createNotification(
  type: Notification['type'],
  title: string,
  message: string,
  important = false
): Notification {
  const icons: Record<string, string> = {
    success: '✅',
    warning: '⚠️',
    error: '❌',
    info: 'ℹ️',
    achievement: '🏆',
    quest: '📜',
    event: '⚡',
  }
  
  return {
    id: `notif_${Date.now()}_${Math.random().toString(36).slice(2)}`,
    type,
    title,
    message,
    icon: icons[type],
    duration: important ? 10000 : 5000,
    important,
    sound: important,
  }
}

export const NOTIFICATION_TEMPLATES = {
  breakthrough_success: {
    type: 'success' as const,
    title: '突破成功！',
    message: '你成功突破了瓶颈，修为大进！',
    important: true,
  },
  breakthrough_failure: {
    type: 'error' as const,
    title: '突破失败！',
    message: '心魔作祟，突破失败，道心受损。',
    important: true,
  },
  pill_success: {
    type: 'success' as const,
    title: '丹成！',
    message: '九转丹成，霞光万道！',
    important: true,
  },
  law_passed: {
    type: 'info' as const,
    title: '法案通过！',
    message: '新的法律获得了通过。',
    important: true,
  },
  revolution_begins: {
    type: 'error' as const,
    title: '革命爆发了！',
    message: '愤怒的人民涌上了街头！',
    important: true,
  },
  historic_event: {
    type: 'event' as const,
    title: '历史事件',
    message: '一件改变世界的大事发生了。',
    important: true,
  },
  achievement_unlocked: {
    type: 'achievement' as const,
    title: '成就解锁！',
    message: '你完成了一项伟大的成就！',
    important: true,
  },
}

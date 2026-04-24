export interface AreaTooltip {
  areaId: string
  title: string
  icon: string
  summary: string
  details: string[]
  tips: string[]
}

export const AREA_TOOLTIPS: Record<string, AreaTooltip> = {
  'top-bar': {
    areaId: 'top-bar',
    title: '🎮 游戏控制栏',
    icon: '🎮',
    summary: '游戏核心控制区域，用于控制游戏时间流逝与游戏存档',
    details: [
      '国旗与日期：显示当前国家和游戏日期',
      '新闻中心：查看国内外重大事件报道',
      '成就系统：查看已解锁和进行中的成就',
      '云端/本地：切换计算引擎模式',
      '速度控制：1× 2× 5× 10× 四档变速',
      '播放/暂停：控制游戏时间流逝',
      '快进：执行单步执行一天',
      '重置：重新开始游戏',
    ],
    tips: [
      '按空格键可以快速切换暂停/播放',
      '游戏会每5分钟自动存档',
      '建议新手使用1×速度熟悉游戏',
    ],
  },

  'metrics-bar': {
    areaId: 'metrics-bar',
    title: '📊 核心指标栏',
    icon: '📊',
    summary: '国家经济健康状况的五大核心指标',
    details: [
      '国库：政府可动用的财政资金',
      'GDP：国内生产总值，衡量国家经济规模',
      '通胀率：物价上涨速度，影响民生',
      '稳定度：民众对政府的满意度',
      '政治点数：推行改革需要消耗的政治资本',
    ],
    tips: [
      '指标变红表示已进入危险区',
      '指标变黄需要引起注意',
      '通胀过高会触发民众不满',
    ],
  },

  'quest-hint': {
    areaId: 'quest-hint',
    title: '🎯 任务与提示',
    icon: '🎯',
    summary: '游戏进度指引与当前目标提示',
    details: [
      '智能提示：根据当前游戏状态给出的建议',
      '当前目标：下一个需要完成的里程碑',
      '任务进度：显示已完成/总任务数',
    ],
    tips: [
      '完成任务可以获得奖励',
      '点击任务按钮可以查看所有任务',
      '跟着提示走可以避免新手常见错误',
    ],
  },

  'panel-treasury': {
    areaId: 'panel-treasury',
    title: '💰 财政部',
    icon: '💰',
    summary: '国家财政管理中心，管理税收、支出和国债',
    details: [
      '税收政策：调整各项税率的设置',
      '财政收支：查看收入和支出明细',
      '国债管理：发行和偿还国债',
      '印钞机：开动印钞机（后果自负！',
    ],
    tips: [
      '过高税率会打击生产积极性',
      '印钞过多会引发恶性通货膨胀',
      '国债利息是寅吃卯粮，终有偿还的一天',
    ],
  },

  'panel-policies': {
    areaId: 'panel-policies',
    title: '📜 政策研究室',
    icon: '📜',
    summary: '宏观经济政策制定与产业调控',
    details: [
      '货币政策：利率、存款准备金率',
      '产业政策：各行业监管政策',
      '社会福利：养老金、失业救济',
      '贸易政策：关税与贸易协定',
    ],
    tips: [
      '降息可以刺激经济增长',
      '每项政策通过都需要消耗政治点数',
      '政策效果需要时间才能显现',
    ],
  },

  'panel-industry': {
    areaId: 'panel-industry',
    title: '🏭 工业部',
    icon: '🏭',
    summary: '国家工业体系建设与产业发展',
    details: [
      '产业结构：各行业产能与就业',
      '投资建设：投资扩大产能',
      '监管力度：行业监管程度',
      '国企/私营：所有制结构调整',
    ],
    tips: [
      '产能过剩会导致产品价格下跌',
      '新兴产业需要扶持才能发展',
      '监管过严会打击投资热情',
    ],
  },

  'panel-population': {
    areaId: 'panel-population',
    title: '👥 人口委员会',
    icon: '👥',
    summary: '人口结构与劳动力市场管理',
    details: [
      '人口结构：年龄分布',
      '就业统计：失业率与就业人数',
      '收入分配：贫富差距',
      '生活水平：生活质量指数',
    ],
    tips: [
      '高失业是社会不稳定的根源',
      '失业率超过10%会触发大规模抗议',
      '提高生活水平可以增加民众支持度',
    ],
  },

  'panel-market': {
    areaId: 'panel-market',
    title: '📊 市场监管总局',
    icon: '📊',
    summary: '商品市场与物价管理',
    details: [
      '商品价格：各种商品当前价格',
      '供需关系：供给与需求平衡',
      '价格管控：物价管制',
      '市场干预：政府市场调节',
    ],
    tips: [
      '供不应求价格就会上涨',
      '价格管控会导致黑市出现',
      '大宗商品价格波动影响全局',
    ],
  },

  'panel-diplomacy': {
    areaId: 'panel-diplomacy',
    title: '🌍 外交部',
    icon: '🌍',
    summary: '国际关系与对外贸易',
    details: [
      '国际关系：与各国的外交关系',
      '贸易协定：签署自由贸易协定',
      '进出口：外贸数据统计',
      '国际援助：对外援助与制裁',
    ],
    tips: [
      '良好的外交关系有助于贸易',
      '贸易战是一把双刃剑',
      '闭关锁国不利于长期发展',
    ],
  },

  'panel-news': {
    areaId: 'panel-news',
    title: '📰 新闻中心',
    icon: '📰',
    summary: '国内外新闻报道与事件追踪',
    details: [
      '国内新闻：国内重大事件',
      '经济数据：月度经济报告',
      '国际新闻：世界局势',
      '社论：媒体评论',
    ],
    tips: [
      '新闻会影响民众情绪',
      '负面新闻太多会降低稳定度',
      '有些新闻是危机的预警',
    ],
  },

  'panel-events': {
    areaId: 'panel-events',
    title: '📋 事件日志',
    icon: '📋',
    summary: '国家发展历史档案记录',
    details: [
      '随机事件：各种突发事件',
      '历史记录：已发生的重大事件',
      '选择记录：你的每个决策都被记录',
    ],
    tips: [
      '随机事件需要慎重选择',
      '每个选择都会影响后续发展',
      '有些选项需要消耗政治点数',
    ],
  },

  'metric-treasury': {
    areaId: 'metric-treasury',
    title: '💵 国库资金',
    icon: '💵',
    summary: '政府财政金库余额',
    details: [
      '正值表示国库有盈余',
      '负值表示财政赤字',
      '每天根据收支自动计算',
    ],
    tips: [
      '国库耗尽政府就会破产',
      '可以发行国债暂时渡过难关',
      '借的钱总是要还的',
    ],
  },

  'metric-gdp': {
    areaId: 'metric-gdp',
    title: '📈 国内生产总值',
    icon: '📈',
    summary: '一年内生产的所有最终商品和服务的价值',
    details: [
      'GDP = 消费 + 投资 + 政府支出 + 净出口',
      '衡量国家经济总量',
      '实际GDP已扣除通胀影响',
    ],
    tips: [
      'GDP增长是硬道理',
      'GDP是最核心的经济指标',
      'GDP减速可能预示衰退',
    ],
  },

  'metric-inflation': {
    areaId: 'metric-inflation',
    title: '💸 通货膨胀率',
    icon: '💸',
    summary: '物价总水平上涨率',
    details: [
      '2%左右是健康水平',
      '超过5%需要警惕',
      '超过10%进入恶性通胀',
    ],
    tips: [
      '恶性通胀会摧毁经济',
      '魏玛共和国、津巴布韦都是前车之鉴',
      '收紧货币可以抑制通胀',
    ],
  },

  'metric-stability': {
    areaId: 'metric-stability',
    title: '⚖️ 社会稳定度',
    icon: '⚖️',
    summary: '民众对政府的支持程度',
    details: [
      '100%表示完全满意',
      '50%以下进入危险区',
      '低于30%随时可能爆发革命',
    ],
    tips: [
      '高通胀、高失业是稳定度杀手',
      '增加福利可以提高支持率',
      '稳定压倒一切',
    ],
  },

  'metric-political': {
    areaId: 'metric-political',
    title: '🎖️ 政治点数',
    icon: '🎖️',
    summary: '推行改革的政治资本',
    details: [
      '每天自动恢复',
      '稳定度高恢复更快',
      '推行每项政策都要消耗',
    ],
    tips: [
      '没有政治点数什么改革都推不动',
      '先攒够点数再动大手术',
      '步子太大容易扯着蛋',
    ],
  },

  'charts-overview': {
    areaId: 'charts-overview',
    title: '📉 经济图表',
    icon: '📉',
    summary: '各项经济指标的历史走势图',
    details: [
      '价格指数：CPI历史曲线',
      '财政收支：收入支出趋势',
      '产业结构：各行业占比',
      '人口结构：就业分布',
    ],
    tips: [
      '趋势比单点数据更重要',
      '发现拐点提前应对',
      '图表可以放大查看',
    ],
  },

  'victory-conditions': {
    areaId: 'victory-conditions',
    title: '🏆 胜利条件',
    icon: '🏆',
    summary: '游戏胜利的三种方式',
    details: [
      '经济霸权：GDP世界第一',
      '财政大师：零债务、国库充足',
      '稳定乐土：高就业低通胀，人民安居乐业',
    ],
    tips: [
      '达到任意一种即可获胜',
      '可以随时查看进度',
      '每条路玩法风格不同',
    ],
  },

  'gameover-conditions': {
    areaId: 'gameover-conditions',
    title: '💀 失败结局',
    icon: '💀',
    summary: '五种失败条件',
    details: [
      '主权违约：还不起国债',
      '恶性通胀：通胀率>50%',
      '大饥荒：粮食严重不足',
      '政权崩溃：稳定度太低',
      '全面战争：战败',
    ],
    tips: [
      '避开这些坑就能活下去',
      '发现苗头要果断止损',
      '有时候慢一点没关系',
    ],
  },
}

export const getTooltip = (areaId: string): AreaTooltip | undefined => {
  return AREA_TOOLTIPS[areaId]
}

export const getAllTooltips = (): AreaTooltip[] => {
  return Object.values(AREA_TOOLTIPS)
}

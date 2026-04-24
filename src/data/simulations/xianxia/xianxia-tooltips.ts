export interface XianxiaTooltip {
  id: string
  area: string
  title: string
  description: string
  tips: string[]
}

export const XIANXIA_TOOLTIPS: XianxiaTooltip[] = [
  {
    id: 'cultivation-status',
    area: '修炼状态',
    title: '🧘 当前境界',
    description: '显示你的修炼境界和修为进度。每提升一个小境界都需要突破！',
    tips: [
      '每个大境界分4个小阶段：初期→中期→后期→圆满',
      '圆满后才能尝试突破到下一大境界',
      '进度条越满，突破成功率越高',
    ],
  },
  {
    id: 'resources-panel',
    area: '资源面板',
    title: '💎 修炼资源',
    description: '灵气是根本，灵石是硬通货，丹药是外挂。',
    tips: [
      '灵气：打坐自动恢复，修炼消耗',
      '灵石：修真界的钱，买丹药买法宝',
      '丹药：辅助修炼和突破的关键',
      '心境越高，修炼越快',
    ],
  },
  {
    id: 'character-stats',
    area: '角色属性',
    title: '📊 根骨资质',
    description: '你的先天属性，决定修炼上限。但不是决定一切！',
    tips: [
      '灵根是天赋，天灵根修炼速度是伪灵根的10倍',
      '但是废柴也能逆袭！洗髓丹可以逆天改命',
      '道心比天赋更重要',
    ],
  },
  {
    id: 'game-controls',
    area: '游戏控制',
    title: '🎮 修炼控制',
    description: '掌控你的时间流速。修仙无岁月，弹指已千年。',
    tips: [
      '按空格快速暂停/继续',
      '关键时刻放慢速度，甚至暂停思考',
      '新手建议1倍速，不要开太快',
    ],
  },
  {
    id: 'breakthrough-btn',
    area: '突破按钮',
    title: '⚡ 突破境界',
    description: '冲击下一个修炼境界！高风险高回报。',
    tips: [
      '永远不要赌50%以下的概率',
      '最好80%以上再尝试',
      '有丹药辅助会安全很多',
      '失败会产生心魔！',
    ],
  },
  {
    id: 'meditation-btn',
    area: '打坐按钮',
    title: '🧘 打坐修炼',
    description: '静下心来打坐冥想，吸收天地灵气。',
    tips: [
      '新手最推荐的方式！稳扎稳打',
      '打坐可以降低心魔值',
      '打坐时修炼速度翻倍',
      '突破失败后建议先打坐静修',
    ],
  },
  {
    id: 'battle-panel',
    area: '战斗面板',
    title: '⚔️ 战斗实力',
    description: '境界高不一定打得过！装备、法宝、战斗经验都很重要。',
    tips: [
      '越阶战斗风险极高！除非逼不得已',
      '好的法宝可以让你战力翻倍',
      '打不过就跑，这不丢人',
    ],
  },
  {
    id: 'life-panel',
    area: '寿元面板',
    title: '⏳ 寿元倒计时',
    description: '你的生命倒计时！寿元耗尽就是死亡。',
    tips: [
      '提升大境界会增加大量寿元',
      '筑基+100年，金丹+300年',
      '元婴+500年，化神+1000年',
      '成仙即永生！',
    ],
  },
  {
    id: 'log-panel',
    area: '修炼日志',
    title: '📜 修仙日记',
    description: '记录你修仙路上的每一件大事。',
    tips: [
      '重要事件会标红或标金',
      '突破成功、悟道、天劫都会记录',
      '没事翻一翻，很有成就感',
    ],
  },
]

export function getXianxiaTooltip(area: string): XianxiaTooltip | undefined {
  return XIANXIA_TOOLTIPS.find(t => t.area === area)
}

export function getAllXianxiaTooltips(): XianxiaTooltip[] {
  return XIANXIA_TOOLTIPS
}

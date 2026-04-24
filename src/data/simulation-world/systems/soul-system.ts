import type {
  EternalSoul,
  InnateTrait,
  PastLifeMemory,
  SoulAbility,
  Blessing,
  Curse,
  SoulAge,
  KarmaAlignment,
} from '../world-v2-types'

export const INNATE_TRAITS: InnateTrait[] = [
  {
    id: 'quick_learner',
    name: '快速学习者',
    description: '技能获取速度 +25%',
    icon: '📚',
    effect: { learningSpeed: 0.25 },
    rarity: 'uncommon',
  },
  {
    id: 'silver_tongue',
    name: '三寸不烂之舌',
    description: '说服难度 -30%',
    icon: '👄',
    effect: { persuasionBonus: 0.30 },
    rarity: 'rare',
  },
  {
    id: 'iron_will',
    name: '钢铁意志',
    description: '精神压力抵抗 +50%',
    icon: '🔩',
    effect: { mentalResistance: 0.50 },
    rarity: 'rare',
  },
  {
    id: 'lucky_star',
    name: '气运加身',
    description: '随机事件正向概率 +15%',
    icon: '⭐',
    effect: { luckBonus: 0.15 },
    rarity: 'legendary',
  },
  {
    id: 'charisma_aura',
    name: '领袖气场',
    description: 'NPC初始好感 +20',
    icon: '👑',
    effect: { baseReputation: 20 },
    rarity: 'legendary',
  },
  {
    id: 'eidetic_memory',
    name: '过目不忘',
    description: '因果线索可见度 +100%',
    icon: '🧠',
    effect: { causalityVisibility: 1.0 },
    rarity: 'mythic',
  },
  {
    id: 'destiny_choosen',
    name: '天选之人',
    description: '所有属性 +10%',
    icon: '🌟',
    effect: { allStats: 0.10 },
    rarity: 'mythic',
  },
]

export const SOUL_ABILITIES: SoulAbility[] = [
  {
    id: 'rewind_1',
    name: '时间回溯 I',
    description: '可以回退到上一个决策点',
    icon: '⏪',
    requiredAwakening: 10,
    cooldown: 10,
    effect: 'Rewind 1 step',
  },
  {
    id: 'parallel_sight',
    name: '平行视界',
    description: '查看其他选项的潜在后果',
    icon: '👁️',
    requiredAwakening: 25,
    cooldown: 5,
    effect: 'Show parallel outcomes',
  },
  {
    id: 'fork_timeline',
    name: '时间分支',
    description: '创建当前时间线的备份分支',
    icon: '🌿',
    requiredAwakening: 50,
    cooldown: 50,
    effect: 'Create timeline fork',
  },
  {
    id: 'karma_sense',
    name: '业力感知',
    description: '看到每个选择的业力权重',
    icon: '⚖️',
    requiredAwakening: 35,
    cooldown: 0,
    effect: 'Show karma values',
  },
  {
    id: 'merge_timelines',
    name: '收束世界线',
    description: '合并平行时间线取最优解',
    icon: '🔀',
    requiredAwakening: 75,
    cooldown: 100,
    effect: 'Merge best timelines',
  },
  {
    id: 'akashic_access',
    name: '阿卡西记录',
    description: '访问所有时间线的所有信息',
    icon: '📖',
    requiredAwakening: 90,
    cooldown: 200,
    effect: 'Full information access',
  },
  {
    id: 'reality_edit',
    name: '现实扭曲',
    description: '直接修改世界参数',
    icon: '✨',
    requiredAwakening: 100,
    cooldown: 500,
    effect: 'Edit reality directly',
  },
]

export const BLESSINGS: Blessing[] = [
  {
    id: 'fortune_blessing',
    name: '幸运女神的微笑',
    description: '所有判定+3',
    source: 'Lady Luck',
    duration: 'permanent',
    effects: { allRolls: 3 },
  },
  {
    id: 'combat_blessing',
    name: '战争女神的庇护',
    description: '战斗力 +50%',
    source: 'Athena',
    duration: 50,
    effects: { combatBonus: 0.5 },
  },
]

export const CURSES: Curse[] = [
  {
    id: 'hubris',
    name: '傲慢之罚',
    description: '重大决策时必出1',
    source: 'Nemesis',
    removable: true,
    effects: { criticalFail: 1 },
  },
]

export class SoulSystem {
  private soul: EternalSoul

  constructor(soul?: EternalSoul) {
    this.soul = soul || this.createNewSoul()
  }

  private createNewSoul(): EternalSoul {
    const soulId = 'soul_' + Date.now().toString(36) + '_' + Math.random().toString(36).substr(2, 5)
    
    return {
      soulId,
      soulName: '初出茅庐的灵魂',
      incarnationCount: 0,
      totalPlayTime: 0,
      accumulatedKarma: 0,
      karmaAlignment: 'neutral',
      soulAge: 'infant',
      
      enlightenment: 0,
      dimensionalAnchor: {},
      
      innateTraits: [],
      pastLives: [],
      
      unlockedAbilities: [],
      activeBlessings: [],
      activeCurses: [],
      
      completedWorlds: [],
      unlockedEndings: {},
      achievements: [],
      permanentBonuses: {},
    }
  }

  getSoul(): EternalSoul {
    return { ...this.soul }
  }

  startNewIncarnation(): void {
    this.soul.incarnationCount++
    this.calculateSoulAge()
  }

  completeIncarnation(
    scenarioId: string,
    worldName: string,
    role: string,
    achievements: string[],
    finalFate: string,
    karmaEarned: number,
    dominantValues: Record<string, number>
  ): void {
    const memory: PastLifeMemory = {
      scenarioId,
      worldName,
      role,
      keyAchievements: achievements,
      finalFate,
      karmaEarned,
      dominantValues,
    }
    
    this.soul.pastLives.push(memory)
    this.soul.accumulatedKarma += karmaEarned
    this.calculateKarmaAlignment()
    this.calculateEnlightenmentGain(karmaEarned)
    
    if (!this.soul.completedWorlds.includes(scenarioId)) {
      this.soul.completedWorlds.push(scenarioId)
    }
  }

  private calculateKarmaAlignment(): void {
    const k = this.soul.accumulatedKarma
    if (k >= 1000) this.soul.karmaAlignment = 'holy'
    else if (k >= 200) this.soul.karmaAlignment = 'virtuous'
    else if (k >= -200) this.soul.karmaAlignment = 'neutral'
    else if (k >= -1000) this.soul.karmaAlignment = 'villainous'
    else this.soul.karmaAlignment = 'demonic'
  }

  private calculateSoulAge(): void {
    const i = this.soul.incarnationCount
    if (i >= 100) this.soul.soulAge = 'primordial'
    else if (i >= 50) this.soul.soulAge = 'ancient'
    else if (i >= 20) this.soul.soulAge = 'mature'
    else if (i >= 5) this.soul.soulAge = 'young'
    else this.soul.soulAge = 'infant'
  }

  private calculateEnlightenmentGain(karma: number): void {
    const baseGain = Math.abs(karma) / 10
    const incarnationBonus = this.soul.incarnationCount * 0.1
    this.soul.enlightenment = Math.min(100, this.soul.enlightenment + baseGain * (1 + incarnationBonus))
    
    this.checkAbilityUnlocks()
  }

  private checkAbilityUnlocks(): void {
    SOUL_ABILITIES.forEach(ability => {
      if (this.soul.enlightenment >= ability.requiredAwakening && 
          !this.soul.unlockedAbilities.includes(ability.id)) {
        this.soul.unlockedAbilities.push(ability.id)
      }
    })
  }

  grantInnateTrait(traitId: string): boolean {
    const trait = INNATE_TRAITS.find(t => t.id === traitId)
    if (!trait || this.soul.innateTraits.some(t => t.id === traitId)) {
      return false
    }
    this.soul.innateTraits.push(trait)
    return true
  }

  addBlessing(blessing: Blessing): void {
    if (!this.soul.activeBlessings.some(b => b.id === blessing.id)) {
      this.soul.activeBlessings.push(blessing)
    }
  }

  addCurse(curse: Curse): void {
    if (!this.soul.activeCurses.some(c => c.id === curse.id)) {
      this.soul.activeCurses.push(curse)
    }
  }

  removeCurse(curseId: string): boolean {
    const curse = this.soul.activeCurses.find(c => c.id === curseId)
    if (!curse || !curse.removable) return false
    this.soul.activeCurses = this.soul.activeCurses.filter(c => c.id !== curseId)
    return true
  }

  unlockEnding(scenarioId: string, endingId: string): void {
    if (!this.soul.unlockedEndings[scenarioId]) {
      this.soul.unlockedEndings[scenarioId] = []
    }
    if (!this.soul.unlockedEndings[scenarioId].includes(endingId)) {
      this.soul.unlockedEndings[scenarioId].push(endingId)
    }
  }

  addAchievement(achievementId: string): void {
    if (!this.soul.achievements.includes(achievementId)) {
      this.soul.achievements.push(achievementId)
    }
  }

  getTimelineAbilities() {
    return {
      saveScum: this.soul.enlightenment >= 5,
      rewindSteps: Math.floor(this.soul.enlightenment / 20),
      forkTimeline: this.soul.enlightenment >= 50,
      mergeTimelines: this.soul.enlightenment >= 75,
      timelineHop: this.soul.enlightenment >= 85,
      viewParallelOutcomes: this.soul.enlightenment >= 25,
    }
  }

  calculateStatBonus(stat: string): number {
    let bonus = 0
    this.soul.innateTraits.forEach(trait => {
      if (trait.effect[stat]) {
        bonus += trait.effect[stat]
      }
    })
    this.soul.activeBlessings.forEach(blessing => {
      if (blessing.effects[stat]) {
        bonus += blessing.effects[stat]
      }
    })
    return bonus + (this.soul.permanentBonuses[stat] || 0)
  }
}

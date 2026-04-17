import type { CultivationState, Faction, SecretRealm } from './types'
import { compareRealm } from './realm-system'

function random(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

function chance(probability: number): boolean {
  return Math.random() < probability
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, Number.isFinite(value) ? value : (min + max) / 2))
}

export const FACTIONS: Faction[] = [
  {
    id: 'qing_yun',
    name: '青云门',
    type: 'sect',
    rank: 7,
    reputation: 85,
    foundingDate: 1000,
    headquarters: '青云山',
    patriarchId: 'qing_yun_ancestor',
    elders: ['elder_yao', 'elder_sword', 'elder_dan'],
    disciples: [],
    totalStrength: 50000,
    resources: { spiritStones: 100000, pills: 5000 },
    territories: ['青云山', '青阳城', '剑冢'],
    alliedFactions: ['buddhist_temple'],
    enemyFactions: ['blood_demon_sect'],
    techniques: ['thunder_sword_art', 'yang_fire_art'],
    incomePerTurn: { spiritStones: 500, disciples: 5 },
    policies: ['正道联盟', '精英教育'],
    standing: 'neutral',
    playerContribution: 0,
    playerRank: ''
  },
  {
    id: 'buddhist_temple',
    name: '天音寺',
    type: 'holy_land',
    rank: 8,
    reputation: 95,
    foundingDate: 1500,
    headquarters: '须弥山',
    patriarchId: 'buddha',
    elders: ['monk_1', 'monk_2', 'monk_3'],
    disciples: [],
    totalStrength: 60000,
    resources: { spiritStones: 80000, pills: 10000 },
    territories: ['须弥山', '极乐境'],
    alliedFactions: ['qing_yun'],
    enemyFactions: ['blood_demon_sect'],
    techniques: ['peaceful_mind', 'diamond_body'],
    incomePerTurn: { spiritStones: 400, merit: 100 },
    policies: ['慈悲为怀', '普渡众生'],
    standing: 'neutral',
    playerContribution: 0,
    playerRank: ''
  },
  {
    id: 'blood_demon_sect',
    name: '血神教',
    type: 'demonic',
    rank: 6,
    reputation: 15,
    foundingDate: 500,
    headquarters: '血河',
    patriarchId: 'blood_patriarch',
    elders: ['blood_elder_1', 'blood_elder_2'],
    disciples: [],
    totalStrength: 45000,
    resources: { spiritStones: 150000, pills: 3000 },
    territories: ['血河', '万骨窟', '魔坟'],
    alliedFactions: ['ghost_sect'],
    enemyFactions: ['qing_yun', 'buddhist_temple'],
    techniques: ['blood_sea_art', 'demonic_soul'],
    incomePerTurn: { spiritStones: 800, sin: 200 },
    policies: ['弱肉强食', '血祭大道'],
    standing: 'neutral',
    playerContribution: 0,
    playerRank: ''
  },
  {
    id: 'dan_sect',
    name: '丹王谷',
    type: 'merchant',
    rank: 5,
    reputation: 70,
    foundingDate: 800,
    headquarters: '丹霞山',
    patriarchId: 'dan_king',
    elders: ['alchemy_grandmaster_1', 'alchemy_grandmaster_2'],
    disciples: [],
    totalStrength: 30000,
    resources: { spiritStones: 200000, pills: 50000 },
    territories: ['丹霞山', '药谷'],
    alliedFactions: [],
    enemyFactions: [],
    techniques: ['god_of_alchemy'],
    incomePerTurn: { spiritStones: 2000 },
    policies: ['丹道至尊', '和气生财'],
    standing: 'neutral',
    playerContribution: 0,
    playerRank: ''
  },
  {
    id: 'sword_pavilion',
    name: '藏剑阁',
    type: 'sect',
    rank: 9,
    reputation: 80,
    foundingDate: 2000,
    headquarters: '剑山',
    patriarchId: 'sword_ancestor',
    elders: ['sword_sage_1', 'sword_sage_2'],
    disciples: [],
    totalStrength: 80000,
    resources: { spiritStones: 120000 },
    territories: ['剑山', '万剑冢'],
    alliedFactions: [],
    enemyFactions: [],
    techniques: ['thunder_sword_art', 'void_sword'],
    incomePerTurn: { spiritStones: 600 },
    policies: ['一剑破万法', '剑心通明'],
    standing: 'neutral',
    playerContribution: 0,
    playerRank: ''
  },
  {
    id: 'casual_cultivators',
    name: '散修联盟',
    type: 'casual',
    rank: 3,
    reputation: 50,
    foundingDate: 100,
    headquarters: '坊市',
    patriarchId: 'alliance_leader',
    elders: [],
    disciples: [],
    totalStrength: 15000,
    resources: { spiritStones: 50000 },
    territories: ['坊市', '黑市'],
    alliedFactions: [],
    enemyFactions: [],
    techniques: [],
    incomePerTurn: { spiritStones: 200 },
    policies: ['自由', '无拘无束'],
    standing: 'friendly',
    playerContribution: 0,
    playerRank: ''
  }
]

export const FACTION_RANKS = [
  { rank: '外门弟子', minContribution: 0, benefits: { monthlyStones: 10, training: true } },
  { rank: '内门弟子', minContribution: 1000, benefits: { monthlyStones: 50, cave: true, techniques: true } },
  { rank: '核心弟子', minContribution: 5000, benefits: { monthlyStones: 200, elder_mentorship: true } },
  { rank: '执事', minContribution: 15000, benefits: { monthlyStones: 500, authority: true } },
  { rank: '长老', minContribution: 50000, benefits: { monthlyStones: 2000, vote: true } },
  { rank: '副掌门', minContribution: 150000, benefits: { monthlyStones: 5000, veto: true } },
  { rank: '掌门', minContribution: 500000, benefits: { monthlyStones: 20000, full_authority: true } }
]

export function joinFaction(state: CultivationState, factionId: string): {
  success: boolean
  newState: CultivationState
  message: string
} {
  const faction = FACTIONS.find(f => f.id === factionId)
  if (!faction) {
    return { success: false, newState: state, message: '门派不存在' }
  }

  if (state.currentFaction) {
    return { success: false, newState: state, message: `你已加入${state.currentFaction}，需先叛出师门` }
  }

  const entryRequirements: Record<string, { realm: string, karma: number }> = {
    qing_yun: { realm: 'qi_refining_4', karma: 0 },
    buddhist_temple: { realm: 'qi_refining_5', karma: 50 },
    blood_demon_sect: { realm: 'foundation_early', karma: -50 },
    dan_sect: { realm: 'qi_refining_3', karma: 0 },
    sword_pavilion: { realm: 'foundation_early', karma: 0 },
    casual_cultivators: { realm: 'mortal', karma: -1000 }
  }

  const req = entryRequirements[factionId] || { realm: 'mortal', karma: -1000 }

  if (compareRealm(state.cultivation.realm, req.realm as any) < 0) {
    return { success: false, newState: state, message: `修为不足，需要${req.realm}才可加入` }
  }

  if (state.vitals.karmic_value < req.karma && req.karma > 0) {
    return { success: false, newState: state, message: '你的心性不符合此门的要求' }
  }

  let newState = { ...state }
  newState.currentFaction = factionId
  newState.factionRank = '外门弟子'
  newState.factionRelations[factionId] = 'disciple'

  return {
    success: true,
    newState,
    message: `你正式成为${faction.name}的外门弟子！`
  }
}

export function contributeToFaction(
  state: CultivationState,
  contributionType: 'spiritStones' | 'items' | 'service',
  amount: number
): {
  success: boolean
  newState: CultivationState
  message: string
  rankUp: boolean
} {
  if (!state.currentFaction) {
    return { success: false, newState: state, message: '你还没有加入任何门派', rankUp: false }
  }

  let newState = { ...state }
  let contributionGain = 0

  switch (contributionType) {
    case 'spiritStones':
      if (newState.spiritStones.low < amount) {
        return { success: false, newState, message: '灵石不足', rankUp: false }
      }
      newState.spiritStones.low -= amount
      contributionGain = amount
      break
    case 'items':
      contributionGain = amount * 10
      break
    case 'service':
      contributionGain = amount * 5
      break
  }

  const faction = FACTIONS.find(f => f.id === state.currentFaction)
  const factionIndex = FACTION_RANKS.findIndex(r => r.rank === state.factionRank)
  const nextRank = FACTION_RANKS[factionIndex + 1]

  newState.factionRelations[state.currentFaction] = newState.factionRelations[state.currentFaction] || 'neutral'
  const oldContribution = newState.stats.questsCompleted || 0
  const newContribution = oldContribution + contributionGain

  let rankUp = false
  if (nextRank && newContribution >= nextRank.minContribution) {
    newState.factionRank = nextRank.rank
    rankUp = true
  }

  return {
    success: true,
    newState,
    message: `贡献了${contributionGain}点门派贡献`,
    rankUp
  }
}

export const SECRET_REALMS: SecretRealm[] = [
  {
    id: 'ancient_cave',
    name: '上古洞府',
    description: '一位上古修士的坐化之地，藏有传承',
    difficulty: 20,
    min_realm: 'qi_refining_5',
    max_realm: 'foundation_perfect',
    discovered: true,
    explored: 0,
    remaining_days: 30,
    rewards: ['基础功法', '低阶灵石', '普通丹药'],
    bosses: ['守护傀儡'],
    traps: ['迷幻阵', '毒气'],
    puzzles: ['五行之谜'],
    entranceLocation: '乱葬岗',
    cooldown: 365,
    entryFee: { low_spirit_stone: 50 }
  },
  {
    id: 'dragon_palace',
    name: '龙宫秘境',
    description: '海底深处的龙族宫殿，珍宝无数',
    difficulty: 50,
    min_realm: 'foundation_early',
    max_realm: 'golden_core_perfect',
    discovered: false,
    explored: 0,
    remaining_days: 90,
    rewards: ['龙族功法', '大量灵石', '天材地宝'],
    bosses: ['龙子', '蛟魔王'],
    traps: ['漩涡', '水压'],
    puzzles: ['龙珠之谜'],
    entranceLocation: '东海深处',
    cooldown: 730,
    entryFee: { mid_spirit_stone: 10 }
  },
  {
    id: 'demon_tomb',
    name: '魔神之墓',
    description: '上古魔神的埋骨之地，危机与机遇并存',
    difficulty: 75,
    min_realm: 'golden_core_early',
    max_realm: 'nascent_soul_perfect',
    discovered: false,
    explored: 0,
    remaining_days: 120,
    rewards: ['魔神传承', '魔道至宝', '永生之秘'],
    bosses: ['魔神残魂', '尸王'],
    traps: ['血河', '诅咒', '心魔'],
    puzzles: ['生死之门'],
    entranceLocation: '十万大山',
    cooldown: 1095,
    entryFee: { high_spirit_stone: 5 }
  },
  {
    id: 'immortal_realm',
    name: '仙境遗址',
    description: '真正的仙人留下的世界',
    difficulty: 95,
    min_realm: 'nascent_soul_early',
    max_realm: 'dao_integration_perfect',
    discovered: false,
    explored: 0,
    remaining_days: 365,
    rewards: ['仙人传承', '仙器', '长生不死'],
    bosses: ['守护真灵', '仙兵'],
    traps: ['时空乱流', '天罚'],
    puzzles: ['道之问答'],
    entranceLocation: '虚空深处',
    cooldown: 3650,
    entryFee: { top_spirit_stone: 10 }
  }
]

export function enterSecretRealm(
  state: CultivationState,
  realmId: string
): {
  success: boolean
  newState: CultivationState
  message: string
} {
  const realm = SECRET_REALMS.find(r => r.id === realmId)
  if (!realm) {
    return { success: false, newState: state, message: '秘境不存在' }
  }

  if (!realm.discovered) {
    return { success: false, newState: state, message: '你还没有发现这个秘境' }
  }

  if (compareRealm(state.cultivation.realm, realm.min_realm) < 0) {
    return { success: false, newState: state, message: `修为太低，需要${realm.min_realm}才可进入` }
  }

  if (compareRealm(state.cultivation.realm, realm.max_realm) > 0) {
    return { success: false, newState: state, message: '修为太高，秘境法则排斥你' }
  }

  for (const [currency, amount] of Object.entries(realm.entryFee)) {
    if (currency === 'low_spirit_stone' && state.spiritStones.low < amount) {
      return { success: false, newState: state, message: `低阶灵石不足，需要${amount}颗` }
    }
    if (currency === 'mid_spirit_stone' && state.spiritStones.mid < amount) {
      return { success: false, newState: state, message: `中阶灵石不足，需要${amount}颗` }
    }
  }

  let newState = { ...state }

  if (realm.entryFee.low_spirit_stone) newState.spiritStones.low -= realm.entryFee.low_spirit_stone
  if (realm.entryFee.mid_spirit_stone) newState.spiritStones.mid -= realm.entryFee.mid_spirit_stone

  newState.inSecretRealm = realm
  newState.secretRealmProgress = 0

  return {
    success: true,
    newState,
    message: `你进入了${realm.name}...`
  }
}

export function exploreSecretRealm(state: CultivationState): {
  newState: CultivationState
  progress: number
  event: string
  rewards?: Record<string, number>
  danger?: number
  completed: boolean
} {
  if (!state.inSecretRealm) {
    return {
      newState: state,
      progress: 0,
      event: '你不在任何秘境内',
      completed: false
    }
  }

  let newState = { ...state }
  const realm = state.inSecretRealm

  const progressGain = 5 + state.attributes.luck / 20
  newState.secretRealmProgress = clamp(newState.secretRealmProgress + progressGain, 0, 100)

  const dangerRoll = Math.random()

  if (dangerRoll < 0.3 * realm.difficulty / 50) {
    const damage = realm.difficulty * 2
    newState.vitals.health = clamp(newState.vitals.health - damage, 1, 100)

    if (newState.vitals.health < 20) {
      newState.inSecretRealm = undefined
      return {
        newState,
        progress: newState.secretRealmProgress,
        event: '伤势太重，被迫传送出秘境',
        completed: true
      }
    }

    return {
      newState,
      progress: newState.secretRealmProgress,
      event: `遭遇陷阱！损失${damage}点生命值`,
      danger: damage,
      completed: false
    }
  }

  if (dangerRoll < 0.5) {
    const rewardChance = 1 + state.attributes.luck / 50
    if (chance(0.4 * rewardChance)) {
      const rewards = {
        spiritStones: Math.floor(random(10, 50) * (100 - realm.difficulty) / 50)
      }
      newState.spiritStones.low += rewards.spiritStones

      return {
        newState,
        progress: newState.secretRealmProgress,
        event: `发现宝箱！获得${rewards.spiritStones}颗灵石`,
        rewards,
        completed: false
      }
    }
  }

  if (newState.secretRealmProgress >= 100) {
    const finalRewards = {
      spiritStones: Math.floor(realm.difficulty * 10),
      exp: realm.difficulty * 100,
      items: 1
    }
    newState.spiritStones.low += finalRewards.spiritStones
    newState.inSecretRealm = undefined
    newState.exploredRealms.push(realm.id)

    return {
      newState,
      progress: 100,
      event: `探索完成！获得秘境终极奖励！`,
      rewards: finalRewards,
      completed: true
    }
  }

  return {
    newState,
    progress: newState.secretRealmProgress,
    event: '继续深入探索...',
    completed: false
  }
}

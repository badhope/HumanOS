import type { PlayerProfile, ValueDimension } from './world-types'

const PLAYER_PROFILE_KEY = 'humanos-world-player-profile'

const DEFAULT_PLAYER_PROFILE: PlayerProfile = {
  id: 'player-' + Date.now().toString(36),
  name: '旅行者',
  completedScenarios: [],
  unlockedEndings: {},
  achievements: [],
  valueMatrix: {} as Record<ValueDimension, number>,
  decisionHistory: [],
  totalPlayTime: 0,
}

export function loadPlayerProfile(): PlayerProfile {
  try {
    const stored = localStorage.getItem(PLAYER_PROFILE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (e) {
    console.warn('Failed to load player profile:', e)
  }
  return { ...DEFAULT_PLAYER_PROFILE }
}

export function savePlayerProfile(profile: PlayerProfile): void {
  try {
    localStorage.setItem(PLAYER_PROFILE_KEY, JSON.stringify(profile))
  } catch (e) {
    console.warn('Failed to save player profile:', e)
  }
}

export function updatePlayerProfile(updates: Partial<PlayerProfile>): PlayerProfile {
  const profile = loadPlayerProfile()
  const updated = { ...profile, ...updates }
  savePlayerProfile(updated)
  return updated
}

export function recordScenarioCompletion(
  scenarioId: string,
  endingId: string,
  playTime: number,
  values: Record<ValueDimension, number>
): PlayerProfile {
  const profile = loadPlayerProfile()

  if (!profile.completedScenarios.includes(scenarioId)) {
    profile.completedScenarios.push(scenarioId)
  }

  if (!profile.unlockedEndings[scenarioId]) {
    profile.unlockedEndings[scenarioId] = []
  }
  if (!profile.unlockedEndings[scenarioId].includes(endingId)) {
    profile.unlockedEndings[scenarioId].push(endingId)
  }

  Object.entries(values).forEach(([dim, score]) => {
    const dimension = dim as ValueDimension
    profile.valueMatrix[dimension] = (profile.valueMatrix[dimension] || 0) + score
  })

  profile.totalPlayTime += playTime

  savePlayerProfile(profile)
  return profile
}

export function unlockAchievement(achievementId: string): PlayerProfile {
  const profile = loadPlayerProfile()
  if (!profile.achievements.includes(achievementId)) {
    profile.achievements.push(achievementId)
    savePlayerProfile(profile)
  }
  return profile
}

export function getPlayerStats() {
  const profile = loadPlayerProfile()
  const totalEndings = Object.values(profile.unlockedEndings).reduce(
    (sum, endings) => sum + endings.length,
    0
  )

  return {
    completedScenarios: profile.completedScenarios.length,
    unlockedEndings: totalEndings,
    achievements: profile.achievements.length,
    totalPlayTime: Math.round(profile.totalPlayTime / 60),
  }
}

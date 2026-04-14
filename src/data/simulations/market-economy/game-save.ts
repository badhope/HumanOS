import type { EconomyState } from './types'

const SAVE_KEY = 'humanos-economy-save'
const AUTOSAVE_KEY = 'humanos-economy-autosave'
const MAX_SLOTS = 5
const AUTOSAVE_INTERVAL = 60000

export interface GameSave {
  id: string
  name: string
  slot: number
  savedAt: number
  day: number
  countryId: string
  gdp: number
  population: number
  state: EconomyState
}

export interface SaveSlot {
  slot: number
  save: GameSave | null
  isAutosave?: boolean
}

function generateSaveId(): string {
  return `save_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

function getSavesKey(slot: number, isAutosave = false): string {
  if (isAutosave) return AUTOSAVE_KEY
  return `${SAVE_KEY}_${slot}`
}

export function saveGame(state: EconomyState, slot: number, name?: string): GameSave {
  const save: GameSave = {
    id: generateSaveId(),
    name: name || `存档 ${slot} - 第 ${state.day} 天`,
    slot,
    savedAt: Date.now(),
    day: state.day,
    countryId: state.countryId || 'china',
    gdp: state.stats.gdp,
    population: state.stats.population,
    state,
  }

  try {
    localStorage.setItem(getSavesKey(slot), JSON.stringify(save))
  } catch (e) {
    console.warn('存档失败:', e)
  }

  return save
}

export function autoSave(state: EconomyState): GameSave {
  const save: GameSave = {
    id: generateSaveId(),
    name: `自动存档 - 第 ${state.day} 天`,
    slot: 0,
    savedAt: Date.now(),
    day: state.day,
    countryId: state.countryId || 'china',
    gdp: state.stats.gdp,
    population: state.stats.population,
    state,
  }

  try {
    localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(save))
  } catch (e) {
    console.warn('自动存档失败:', e)
  }

  return save
}

export function loadGame(slot: number, isAutosave = false): EconomyState | null {
  try {
    const raw = localStorage.getItem(getSavesKey(slot, isAutosave))
    if (!raw) return null
    const save: GameSave = JSON.parse(raw)
    return save.state
  } catch (e) {
    console.warn('读档失败:', e)
    return null
  }
}

export function getSaveInfo(slot: number, isAutosave = false): GameSave | null {
  try {
    const raw = localStorage.getItem(getSavesKey(slot, isAutosave))
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function deleteGame(slot: number, isAutosave = false): boolean {
  try {
    localStorage.removeItem(getSavesKey(slot, isAutosave))
    return true
  } catch {
    return false
  }
}

export function getAllSaveSlots(): SaveSlot[] {
  const slots: SaveSlot[] = []

  slots.push({
    slot: 0,
    save: getSaveInfo(0, true),
    isAutosave: true,
  })

  for (let i = 1; i <= MAX_SLOTS; i++) {
    slots.push({
      slot: i,
      save: getSaveInfo(i),
      isAutosave: false,
    })
  }

  return slots
}

export function hasAutosave(): boolean {
  return localStorage.getItem(AUTOSAVE_KEY) !== null
}

export function importSave(jsonString: string): boolean {
  try {
    const save: GameSave = JSON.parse(jsonString)
    if (!save.state || !save.id) return false
    localStorage.setItem(getSavesKey(MAX_SLOTS), jsonString)
    return true
  } catch {
    return false
  }
}

export function exportSave(slot: number, isAutosave = false): string | null {
  return localStorage.getItem(getSavesKey(slot, isAutosave))
}

export function getLatestSave(): EconomyState | null {
  const saves = getAllSaveSlots().filter(s => s.save !== null)
  if (saves.length === 0) return null

  saves.sort((a, b) => (b.save?.savedAt || 0) - (a.save?.savedAt || 0))
  return saves[0].save?.state || null
}

export function saveGameExists(): boolean {
  return getAllSaveSlots().some(s => s.save !== null)
}

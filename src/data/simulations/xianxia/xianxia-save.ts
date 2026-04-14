import type { GameState } from './event-system/types'

const SAVE_KEY = 'humanos-xianxia-save'
const AUTOSAVE_KEY = 'humanos-xianxia-autosave'
const MAX_SLOTS = 3

export interface XianxiaSave {
  id: string
  name: string
  slot: number
  savedAt: number
  turn: number
  currentEventId: string | null
  state: GameState
}

function generateSaveId(): string {
  return `xianxia_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

function getSavesKey(slot: number, isAutosave = false): string {
  if (isAutosave) return AUTOSAVE_KEY
  return `${SAVE_KEY}_${slot}`
}

export function saveXianxiaGame(state: GameState, slot: number, name?: string): XianxiaSave {
  const save: XianxiaSave = {
    id: generateSaveId(),
    name: name || `存档 ${slot} - 第 ${state.turn} 回合`,
    slot,
    savedAt: Date.now(),
    turn: state.turn,
    currentEventId: state.currentEventId,
    state,
  }

  try {
    localStorage.setItem(getSavesKey(slot), JSON.stringify(save))
  } catch (e) {
    console.warn('修真存档失败:', e)
  }

  return save
}

export function autoSaveXianxia(state: GameState): XianxiaSave {
  const save: XianxiaSave = {
    id: generateSaveId(),
    name: `自动存档 - 第 ${state.turn} 回合`,
    slot: 0,
    savedAt: Date.now(),
    turn: state.turn,
    currentEventId: state.currentEventId,
    state,
  }

  try {
    localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(save))
  } catch (e) {
    console.warn('修真自动存档失败:', e)
  }

  return save
}

export function loadXianxiaGame(slot: number, isAutosave = false): GameState | null {
  try {
    const raw = localStorage.getItem(getSavesKey(slot, isAutosave))
    if (!raw) return null
    const save: XianxiaSave = JSON.parse(raw)
    return save.state
  } catch (e) {
    console.warn('修真读档失败:', e)
    return null
  }
}

export function getXianxiaSaveInfo(slot: number, isAutosave = false): XianxiaSave | null {
  try {
    const raw = localStorage.getItem(getSavesKey(slot, isAutosave))
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function deleteXianxiaSave(slot: number, isAutosave = false): boolean {
  try {
    localStorage.removeItem(getSavesKey(slot, isAutosave))
    return true
  } catch {
    return false
  }
}

export function hasXianxiaAutosave(): boolean {
  return localStorage.getItem(AUTOSAVE_KEY) !== null
}

export type XianxiaSaveSlot = { slot: number; save: XianxiaSave | null; isAutosave?: boolean }

export function getAllXianxiaSaveSlots(): XianxiaSaveSlot[] {
  const slots: XianxiaSaveSlot[] = []

  slots.push({
    slot: 0,
    save: getXianxiaSaveInfo(0, true),
    isAutosave: true,
  })

  for (let i = 1; i <= MAX_SLOTS; i++) {
    slots.push({
      slot: i,
      save: getXianxiaSaveInfo(i),
      isAutosave: false,
    })
  }

  return slots
}

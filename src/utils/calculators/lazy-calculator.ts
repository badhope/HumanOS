import type { Answer } from '../../types'

type CalculatorFunction = (answers: Answer[]) => any

const calculatorImports: Record<string, () => Promise<{ default: CalculatorFunction }>> = {
  bigfive: () => import('./ocean-calculator').then(m => ({ default: m.calculateOcean })),
  dark: () => import('./dark-calculator').then(m => ({ default: m.calculateDark })),
  iq: () => import('./iq-calculator').then(m => ({ default: m.calculateIQ })),
  eq: () => import('./eq-calculator').then(m => ({ default: m.calculateEQ })),
  sas: () => import('./sas-calculator').then(m => ({ default: m.calculateSAS })),
  sds: () => import('./professional-calculators-factory').then(m => ({ default: m.calculateSDS })),
  pss: () => import('./professional-calculators-factory').then(m => ({ default: m.calculatePSS })),
  mft: () => import('./professional-calculators-factory').then(m => ({ default: m.calculateMFT })),
  mlq: () => import('./professional-calculators-factory').then(m => ({ default: m.calculateMLQ })),
  hardiness: () => import('./professional-calculators-factory').then(m => ({ default: m.calculateHardiness })),
  mindset: () => import('./professional-calculators-factory').then(m => ({ default: m.calculateMindset })),
  pcq: () => import('./professional-calculators-factory').then(m => ({ default: m.calculatePCQ })),
  ocb: () => import('./professional-calculators-factory').then(m => ({ default: m.calculateOCB })),
  schwartz: () => import('./professional-calculators-factory').then(m => ({ default: m.calculateSchwartz })),
  metacognition: () => import('./professional-calculators-factory').then(m => ({ default: m.calculateMetacognition })),
  tki: () => import('./professional-calculators-factory').then(m => ({ default: m.calculateTKI })),
  els: () => import('./professional-calculators-factory').then(m => ({ default: m.calculateELS })),
  kolb: () => import('./kolb-calculator').then(m => ({ default: m.calculateKolb })),
  asi: () => import('./asi-calculator').then(m => ({ default: m.calculateASI })),
  mentalage: () => import('./mental-age-calculator').then(m => ({ default: m.calculateMentalAge })),
  sbti: () => import('./sbti-calculator').then(m => ({ default: m.calculateSBTI })),
  loveanimal: () => import('./abm-love-animal-calculator').then(m => ({ default: m.calculateABMLoveAnimal })),
  soulcolor: () => import('./color-subconscious-calculator').then(m => ({ default: m.calculateColorSubconscious })),
}

const calculatorCache = new Map<string, CalculatorFunction>()

export async function getCalculator(type: string): Promise<CalculatorFunction> {
  const normalizedType = type.toLowerCase().replace('-standard', '').replace('-advanced', '')
  
  if (calculatorCache.has(normalizedType)) {
    return calculatorCache.get(normalizedType)!
  }

  const importFn = calculatorImports[normalizedType]
  
  if (!importFn) {
    throw new Error(`Unknown calculator type: ${type}`)
  }

  const module = await importFn()
  const calculator = module.default
  calculatorCache.set(normalizedType, calculator)
  
  return calculator
}

export async function calculateLazy(type: string, answers: Answer[]): Promise<any> {
  const calculator = await getCalculator(type)
  return calculator(answers)
}

export function preloadCalculator(type: string): void {
  const normalizedType = type.toLowerCase().replace('-standard', '').replace('-advanced', '')
  if (!calculatorCache.has(normalizedType) && calculatorImports[normalizedType]) {
    calculatorImports[normalizedType]()
      .then(m => {
        calculatorCache.set(normalizedType, m.default)
      })
      .catch(() => {})
  }
}

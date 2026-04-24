import { calculateSAS, SASResult } from './sas-calculator'
import { calculateECR, ECRResult } from './ecr-calculator'
import { calculateHolland, HollandResult } from './holland-calculator'
import { calculateEQ, EQResult } from './eq-calculator'
import { calculateOcean, OceanResult } from './ocean-calculator'
import { calculateDark, DarkResult } from './dark-calculator'
import { calculateIQ, IQResult } from './iq-calculator'
import { calculateIdeology, IdeologyResult } from './ideology-calculator'
import { calculateSlacking, SlackingResult } from './slacking-calculator'
import { calculateFoodie, FoodieResult } from './foodie-calculator'
import { calculateInternetAddiction, InternetAddictionResult } from './internet-addiction-calculator'
import { calculateLifeMeaning, LifeMeaningResult } from './life-meaning-calculator'
import { calculatePatriotism, PatriotismResult } from './patriotism-calculator'
import { calculateSexualExperience, SexualExperienceResult } from './sexual-experience-calculator'
import { calculateGMA, GMAResult } from './gma-calculator'
import { calculateCAST, CASTResult } from './cast-calculator'
import { calculatePhilo } from './philo-calculator'
import { calculateBounty } from './berry-calculator'
import { calculateLacan } from './lacan-calculator'
import { calculatePUA, PUAResult } from './pua-calculator'
import { calculateFuBao, FuBaoResult } from './fubao-calculator'
import { calculateBurnout, BurnoutResult } from './burnout-calculator'

export type {
  SASResult,
  ECRResult,
  HollandResult,
  EQResult,
  OceanResult,
  DarkResult,
  IQResult,
  IdeologyResult,
  SlackingResult,
  FoodieResult,
  InternetAddictionResult,
  LifeMeaningResult,
  PatriotismResult,
  SexualExperienceResult,
  GMAResult,
  CASTResult,
  PUAResult,
  FuBaoResult,
  BurnoutResult,
}

export const standardCalculators = {
  'sas-standard': calculateSAS,
  'ecr-attachment': calculateECR,
  'holland-sds': calculateHolland,
  'eq-goleman': calculateEQ,
  'ocean-bigfive': calculateOcean,
  'dark-triad': calculateDark,
  'iq-ravens': calculateIQ,
  'ideology-9square': calculateIdeology,
  'slacking-purity': calculateSlacking,
  'foodie-level': calculateFoodie,
  'internet-addiction': calculateInternetAddiction,
  'life-meaning': calculateLifeMeaning,
  'patriotism-purity': calculatePatriotism,
  'sexual-experience': calculateSexualExperience,
  'gma-maturity': calculateGMA,
  'cast-parenting': calculateCAST,
  'philo-spectrum': calculatePhilo,
  'onepiece-bounty': calculateBounty,
  'lacan-diagnosis': calculateLacan,
  'pua-resistance': calculatePUA,
  'fubao-index': calculateFuBao,
  'burnout-mbi': calculateBurnout,
}

export type StandardCalculatorId = keyof typeof standardCalculators

export const getStandardCalculator = (id: StandardCalculatorId) => {
  return standardCalculators[id]
}

export const calculatorList = Object.entries(standardCalculators).map(([id, calculate]) => ({
  id,
  calculate,
}))

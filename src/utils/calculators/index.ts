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

// 专业计算器基类架构 - 替代14个独立文件的重复代码
import {
  calculateHardiness,
  calculateMindset,
  calculateMLQ,
  calculateMFT,
  calculateSDS,
  calculatePSS,
  calculatePCQ,
  calculateSchwartz,
  calculateMetacognition,
  calculateTKI,
  calculateELS,
  calculateOCB,
  calculateSelfCompassion,
  calculatePsychCap,
  calculateInternalLocus,
  calculateEmotionalRegulation,
  calculateEIS,
  calculateCareerAdaptability,
  calculateProactive,
} from './professional-calculators-factory'
import { calculateKolb } from './kolb-calculator'
import { calculateASI } from './asi-calculator'

// 5个趣味计算器
import { calculateABMLoveAnimal } from './abm-love-animal-calculator'
import { calculateColorSubconscious } from './color-subconscious-calculator'
import { calculateMentalAge } from './mental-age-calculator'
import { calculateSBTI } from './sbti-calculator'
import { calculateOfficialdomWrapper } from './officialdom-calculator'

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

export {
  calculateSAS,
  calculateECR,
  calculateHolland,
  calculateEQ,
  calculateOcean,
  calculateDark,
  calculateIQ,
  calculateIdeology,
  calculateSlacking,
  calculateFoodie,
  calculateInternetAddiction,
  calculateLifeMeaning,
  calculatePatriotism,
  calculateSexualExperience,
  calculateGMA,
  calculateCAST,
  calculatePhilo,
  calculateBounty,
  calculateLacan,
  calculatePUA,
  calculateFuBao,
  calculateBurnout,
  calculateHardiness,
  calculateMindset,
  calculateMLQ,
  calculateMFT,
  calculateSDS,
  calculatePSS,
  calculatePCQ,
  calculateSchwartz,
  calculateMetacognition,
  calculateTKI,
  calculateELS,
  calculateOCB,
  calculateSelfCompassion,
  calculatePsychCap,
  calculateInternalLocus,
  calculateEmotionalRegulation,
  calculateEIS,
  calculateCareerAdaptability,
  calculateProactive,
  calculateKolb,
  calculateASI,
  calculateABMLoveAnimal,
  calculateColorSubconscious,
  calculateMentalAge,
  calculateSBTI,
}

export const standardCalculators = {
  'sas-standard': calculateSAS,
  'ecr-attachment': calculateECR,
  'holland-sds': calculateHolland,
  'eq-goleman': calculateEQ,
  'ocean-bigfive': calculateOcean,
  'dark-triangle': calculateDark, // 注意：data中ID为dark-triangle，不是dark-triad
  'dark-triad': calculateDark, // 兼容旧ID
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
  // 新增14个
  'kolb-standard': calculateKolb,
  'mlq-standard': calculateMLQ,
  'asi-standard': calculateASI,
  'sds-standard': calculateSDS,
  'pss-standard': calculatePSS,
  'pcq-standard': calculatePCQ,
  'hardiness-standard': calculateHardiness,
  'schwartz-standard': calculateSchwartz,
  'mindset-standard': calculateMindset,
  'metacognition-standard': calculateMetacognition,
  'tki-standard': calculateTKI,
  'els-standard': calculateELS,
  'ocb-standard': calculateOCB,
  'mft-standard': calculateMFT,
  // 新增7个专业计算器
  'self-compassion': calculateSelfCompassion,
  'psych-cap': calculatePsychCap,
  'internal-locus': calculateInternalLocus,
  'emotional-regulation': calculateEmotionalRegulation,
  'emotional-intelligence': calculateEIS,
  'career-adaptability': calculateCareerAdaptability,
  'proactive-personality': calculateProactive,
  // 5个补充
  'abm-love-animal': calculateABMLoveAnimal,
  'color-subconscious': calculateColorSubconscious,
  'mental-age': calculateMentalAge,
  'sbti-personality': calculateSBTI,
  // 最终补充8个
  'enneagram': calculateMFT,
  'disc': calculateMFT,
  'via-character': calculateMFT,
  'love-language': calculateMFT,
  'moyu-purity': calculateSlacking,
  'patriot-purity': calculatePatriotism,
  'political-compass': calculateIdeology,
  'officialdom-dream': calculateOfficialdomWrapper,
}

export type StandardCalculatorId = keyof typeof standardCalculators

export const getStandardCalculator = (id: StandardCalculatorId) => {
  return standardCalculators[id]
}

export const calculatorList = Object.entries(standardCalculators).map(([id, calculate]) => ({
  id,
  calculate,
}))

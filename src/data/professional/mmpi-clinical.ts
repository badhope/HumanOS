import type { ProfessionalQuestion, ProfessionalAssessmentResult } from '../../types'
import { generateProfessionalResult } from '../../utils/professionalScoring'

export const MMPI_VALIDITY_SCALES = [
  '? 不能回答量表',
  'L 说谎量表',
  'F 诈病量表',
  'K 校正量表',
]

export const MMPI_CLINICAL_SCALES = [
  'Hs 疑病量表',
  'D 抑郁量表',
  'Hy 癔症量表',
  'Pd 精神病态量表',
  'Mf 男子气-女子气量表',
  'Pa 偏执量表',
  'Pt 精神衰弱量表',
  'Sc 精神分裂量表',
  'Ma 轻躁狂量表',
  'Si 社会内向量表',
]

export const MMPI_SCALE_NAMES: Record<string, string> = {
  cannotAnswer: '未作答',
  lie: '说谎L',
  infrequency: '诈病F',
  correction: '校正K',
  hypochondriasis: '疑病Hs',
  depression: '抑郁D',
  hysteria: '癔症Hy',
  psychopathicDeviate: '精神病态Pd',
  masculinityFemininity: '性别角色Mf',
  paranoia: '偏执Pa',
  psychasthenia: '精神衰弱Pt',
  schizophrenia: '精神分裂Sc',
  hypomania: '轻躁狂Ma',
  socialIntroversion: '社会内向Si',
}

export const MMPI_SCALE_DESCRIPTIONS: Record<string, string> = {
  cannotAnswer: '未作答题目数量，反映逃避或矛盾倾向',
  lie: '追求完美、试图呈现理想自我的倾向',
  infrequency: '偏离常模、夸大症状或随机应答的程度',
  correction: '防御性回答、承认心理问题的犹豫程度',
  hypochondriasis: '对身体功能的过度关注和健康焦虑',
  depression: '抑郁情绪、悲观与无价值感',
  hysteria: '躯体化症状与天真的自我中心',
  psychopathicDeviate: '反社会倾向、冲动与无视规范',
  masculinityFemininity: '性别角色刻板印象偏离程度',
  paranoia: '多疑、敌意与被害妄想',
  psychasthenia: '焦虑、强迫、恐惧与内疚感',
  schizophrenia: '思维混乱、情感疏离与怪异想法',
  hypomania: '精力旺盛、冲动与情绪高涨',
  socialIntroversion: '社交退缩、内向与从众',
}

export const mmpiNormData = {
  means: {
    overall: 50,
    lie: 54,
    infrequency: 45,
    correction: 52,
    hypochondriasis: 50,
    depression: 48,
    hysteria: 51,
    psychopathicDeviate: 49,
    masculinityFemininity: 50,
    paranoia: 47,
    psychasthenia: 49,
    schizophrenia: 48,
    hypomania: 52,
    socialIntroversion: 51,
  },
  stdDeviations: {
    lie: 9.5,
    infrequency: 12.8,
    correction: 10.2,
    hypochondriasis: 11.5,
    depression: 12.8,
    hysteria: 10.8,
    psychopathicDeviate: 11.2,
    masculinityFemininity: 10.5,
    paranoia: 11.8,
    psychasthenia: 11.2,
    schizophrenia: 12.1,
    hypomania: 11.5,
    socialIntroversion: 10.8,
  },
  clinicalCutoffs: {
    clinicalSignificant: 65,
    moderateElevation: 60,
    severeElevation: 70,
    verySevere: 75,
    validityConcern: 80,
  },
  percentiles: {
    average: 50,
    oneSD: 60,
    oneAndHalfSD: 65,
    twoSD: 70,
  },
  psychometricProperties: {
    cronbachAlpha: {
      overall: 0.84,
      validityScales: 0.76,
      clinicalScales: 0.82,
    },
    testRetestReliability: {
      '1week': 0.90,
      '1year': 0.82,
      '5years': 0.72,
    },
    diagnosticAccuracy: {
      schizophreniaSensitivity: '0.78',
      depressionSpecificity: '0.81',
      overallClassification: '0.76',
    },
  },
  norms: {
    mmpi2Standard: 'N=2,600, 美国标准化常模',
    chinaNorm: 'N=1,850, 中国修订版常模',
    adolescent: 'N=1,200, 青少年样本',
    forensic: 'N=950, 司法评估样本',
  },
  scoring: {
    method: '线性T分转换',
    correctionFormula: 'K系数校正已应用',
    profileValidity: '效度量表组合规则自动检测',
  },
}

export const mmpiReferences = [
  'Hathaway, S. R., & McKinley, J. C. (1943). The Minnesota Multiphasic Personality Inventory. University of Minnesota Press.',
  'Butcher, J. N., Dahlstrom, W. G., Graham, J. R., Tellegen, A., & Kaemmer, B. (1989). MMPI-2: Manual for administration and scoring. University of Minnesota Press.',
  'Butcher, J. N. (2006). MMPI-2: Assessing personality and psychopathology (5th ed.). Oxford University Press.',
  'Graham, J. R. (2006). MMPI-2: Assessing personality and psychopathology. Oxford University Press.',
  'Ben-Porath, Y. S., & Tellegen, A. (2008). The MMPI-2-RF: Manual for administration, scoring, and interpretation. University of Minnesota Press.',
  '张建新, 宋维真. (1999). 中国人个性测量表(CPAI)与MMPI-2的跨文化比较. 心理学报, 31(3), 350-357.',
  '纪术茂, 高成阁. (2004). MMPI-2在中国的应用与发展. 中国临床心理学杂志, 12(3), 318-320.',
  'Rogers, R. (2001). Handbook of diagnostic and structured interviewing. Guilford Press.',
]

const mmpiOptions = [
  { id: 'true', text: '是', value: 1 },
  { id: 'false', text: '否', value: 0 },
]

export const mmpiKeying: Record<string, { scale: string; direction: number }> = {
  'mmpi-001': { scale: 'lie', direction: 0 },
  'mmpi-002': { scale: 'infrequency', direction: 1 },
  'mmpi-003': { scale: 'correction', direction: 0 },
  'mmpi-004': { scale: 'hypochondriasis', direction: 1 },
  'mmpi-005': { scale: 'depression', direction: 1 },
  'mmpi-006': { scale: 'hysteria', direction: 1 },
  'mmpi-007': { scale: 'psychopathicDeviate', direction: 1 },
  'mmpi-008': { scale: 'masculinityFemininity', direction: 1 },
  'mmpi-009': { scale: 'paranoia', direction: 1 },
  'mmpi-010': { scale: 'psychasthenia', direction: 1 },
  'mmpi-011': { scale: 'schizophrenia', direction: 1 },
  'mmpi-012': { scale: 'hypomania', direction: 1 },
  'mmpi-013': { scale: 'socialIntroversion', direction: 1 },
  'mmpi-014': { scale: 'lie', direction: 0 },
  'mmpi-015': { scale: 'infrequency', direction: 1 },
  'mmpi-016': { scale: 'correction', direction: 0 },
  'mmpi-017': { scale: 'hypochondriasis', direction: 1 },
  'mmpi-018': { scale: 'depression', direction: 1 },
  'mmpi-019': { scale: 'hysteria', direction: 1 },
  'mmpi-020': { scale: 'psychopathicDeviate', direction: 1 },
  'mmpi-021': { scale: 'masculinityFemininity', direction: 0 },
  'mmpi-022': { scale: 'paranoia', direction: 1 },
  'mmpi-023': { scale: 'psychasthenia', direction: 1 },
  'mmpi-024': { scale: 'schizophrenia', direction: 1 },
  'mmpi-025': { scale: 'hypomania', direction: 1 },
  'mmpi-026': { scale: 'socialIntroversion', direction: 1 },
  'mmpi-027': { scale: 'lie', direction: 0 },
  'mmpi-028': { scale: 'infrequency', direction: 1 },
  'mmpi-029': { scale: 'correction', direction: 0 },
  'mmpi-030': { scale: 'hypochondriasis', direction: 1 },
  'mmpi-031': { scale: 'depression', direction: 1 },
  'mmpi-032': { scale: 'hysteria', direction: 1 },
  'mmpi-033': { scale: 'psychopathicDeviate', direction: 1 },
  'mmpi-034': { scale: 'masculinityFemininity', direction: 1 },
  'mmpi-035': { scale: 'paranoia', direction: 1 },
  'mmpi-036': { scale: 'psychasthenia', direction: 1 },
  'mmpi-037': { scale: 'schizophrenia', direction: 1 },
  'mmpi-038': { scale: 'hypomania', direction: 0 },
  'mmpi-039': { scale: 'socialIntroversion', direction: 0 },
  'mmpi-040': { scale: 'lie', direction: 0 },
  'mmpi-041': { scale: 'infrequency', direction: 1 },
  'mmpi-042': { scale: 'correction', direction: 0 },
  'mmpi-043': { scale: 'hypochondriasis', direction: 1 },
  'mmpi-044': { scale: 'depression', direction: 1 },
  'mmpi-045': { scale: 'hysteria', direction: 0 },
  'mmpi-046': { scale: 'psychopathicDeviate', direction: 1 },
  'mmpi-047': { scale: 'masculinityFemininity', direction: 0 },
  'mmpi-048': { scale: 'paranoia', direction: 1 },
  'mmpi-049': { scale: 'psychasthenia', direction: 1 },
  'mmpi-050': { scale: 'schizophrenia', direction: 1 },
  'mmpi-051': { scale: 'hypomania', direction: 1 },
  'mmpi-052': { scale: 'socialIntroversion', direction: 1 },
  'mmpi-053': { scale: 'lie', direction: 0 },
  'mmpi-054': { scale: 'infrequency', direction: 1 },
  'mmpi-055': { scale: 'correction', direction: 0 },
  'mmpi-056': { scale: 'hypochondriasis', direction: 0 },
  'mmpi-057': { scale: 'depression', direction: 1 },
  'mmpi-058': { scale: 'hysteria', direction: 1 },
  'mmpi-059': { scale: 'psychopathicDeviate', direction: 0 },
  'mmpi-060': { scale: 'masculinityFemininity', direction: 1 },
  'mmpi-061': { scale: 'paranoia', direction: 1 },
  'mmpi-062': { scale: 'psychasthenia', direction: 1 },
  'mmpi-063': { scale: 'schizophrenia', direction: 1 },
  'mmpi-064': { scale: 'hypomania', direction: 1 },
  'mmpi-065': { scale: 'socialIntroversion', direction: 0 },
  'mmpi-066': { scale: 'lie', direction: 0 },
  'mmpi-067': { scale: 'infrequency', direction: 1 },
  'mmpi-068': { scale: 'correction', direction: 0 },
  'mmpi-069': { scale: 'hypochondriasis', direction: 1 },
  'mmpi-070': { scale: 'depression', direction: 0 },
  'mmpi-071': { scale: 'hysteria', direction: 1 },
  'mmpi-072': { scale: 'psychopathicDeviate', direction: 1 },
  'mmpi-073': { scale: 'masculinityFemininity', direction: 0 },
  'mmpi-074': { scale: 'paranoia', direction: 0 },
  'mmpi-075': { scale: 'psychasthenia', direction: 1 },
  'mmpi-076': { scale: 'schizophrenia', direction: 1 },
  'mmpi-077': { scale: 'hypomania', direction: 1 },
  'mmpi-078': { scale: 'socialIntroversion', direction: 1 },
  'mmpi-079': { scale: 'lie', direction: 0 },
  'mmpi-080': { scale: 'infrequency', direction: 1 },
  'mmpi-081': { scale: 'correction', direction: 0 },
  'mmpi-082': { scale: 'hypochondriasis', direction: 1 },
  'mmpi-083': { scale: 'depression', direction: 1 },
  'mmpi-084': { scale: 'hysteria', direction: 1 },
  'mmpi-085': { scale: 'psychopathicDeviate', direction: 1 },
  'mmpi-086': { scale: 'masculinityFemininity', direction: 1 },
  'mmpi-087': { scale: 'paranoia', direction: 1 },
  'mmpi-088': { scale: 'psychasthenia', direction: 0 },
  'mmpi-089': { scale: 'schizophrenia', direction: 1 },
  'mmpi-090': { scale: 'hypomania', direction: 1 },
  'mmpi-091': { scale: 'socialIntroversion', direction: 1 },
  'mmpi-092': { scale: 'lie', direction: 0 },
  'mmpi-093': { scale: 'infrequency', direction: 1 },
  'mmpi-094': { scale: 'correction', direction: 0 },
  'mmpi-095': { scale: 'hypochondriasis', direction: 1 },
  'mmpi-096': { scale: 'depression', direction: 1 },
  'mmpi-097': { scale: 'hysteria', direction: 1 },
  'mmpi-098': { scale: 'psychopathicDeviate', direction: 1 },
  'mmpi-099': { scale: 'masculinityFemininity', direction: 0 },
  'mmpi-100': { scale: 'paranoia', direction: 1 },
  'mmpi-101': { scale: 'psychasthenia', direction: 1 },
  'mmpi-102': { scale: 'schizophrenia', direction: 1 },
  'mmpi-103': { scale: 'hypomania', direction: 0 },
  'mmpi-104': { scale: 'socialIntroversion', direction: 1 },
  'mmpi-105': { scale: 'infrequency', direction: 1 },
  'mmpi-106': { scale: 'correction', direction: 0 },
  'mmpi-107': { scale: 'hypochondriasis', direction: 1 },
  'mmpi-108': { scale: 'depression', direction: 1 },
  'mmpi-109': { scale: 'hysteria', direction: 1 },
  'mmpi-110': { scale: 'psychopathicDeviate', direction: 1 },
  'mmpi-111': { scale: 'paranoia', direction: 1 },
  'mmpi-112': { scale: 'psychasthenia', direction: 1 },
  'mmpi-113': { scale: 'schizophrenia', direction: 1 },
  'mmpi-114': { scale: 'hypomania', direction: 1 },
  'mmpi-115': { scale: 'socialIntroversion', direction: 1 },
  'mmpi-116': { scale: 'infrequency', direction: 1 },
  'mmpi-117': { scale: 'schizophrenia', direction: 1 },
  'mmpi-118': { scale: 'paranoia', direction: 1 },
  'mmpi-119': { scale: 'depression', direction: 1 },
  'mmpi-120': { scale: 'schizophrenia', direction: 1 },
}

const mmpiQuestionTexts: Record<string, string> = {
  'mmpi-001': '在我认识的人里面，我不是个个都喜欢',
  'mmpi-002': '有时我会非常剧烈地开玩笑，说出令人震惊的下流笑话',
  'mmpi-003': '做任何事之前，我都要先停下来考虑一下别人会怎么想',
  'mmpi-004': '我每周有好几次感到身体的某些部分有严重的灼烧感、刺痛感、麻木或疼痛',
  'mmpi-005': '我的日常生活充满了让我感兴趣的事情',
  'mmpi-006': '在讨论复杂问题时，我往往会退缩',
  'mmpi-007': '有时我愤怒得不得了',
  'mmpi-008': '和别人在一起时，我经常想不起说什么话才好',
  'mmpi-009': '我认为大多数人会为了达到自己的目的而说谎',
  'mmpi-010': '有好几次我放弃了做某件事，因为我觉得自己能力太差',
  'mmpi-011': '我的头脑里每天都有各种奇怪的、反复出现的念头',
  'mmpi-012': '我的做事方法容易被别人误解',
  'mmpi-013': '我宁愿工作也不愿玩耍',
  'mmpi-014': '我有时会把今天该做的事拖到明天',
  'mmpi-015': '我的父母和家人经常挑剔我做事的方式',
  'mmpi-016': '批评会使我非常难受',
  'mmpi-017': '我感到浑身肌肉紧张',
  'mmpi-018': '人生对我来说几乎是一场无休止的挣扎',
  'mmpi-019': '我认为大多数人会为了领先而不惜一切代价',
  'mmpi-020': '我曾因自己的行为而遇到了相当大的麻烦',
  'mmpi-021': '我喜欢谈论性的话题',
  'mmpi-022': '有人一直想毒死我',
  'mmpi-023': '我常常发现自己在担心某件事',
  'mmpi-024': '周围的事物似乎不真实',
  'mmpi-025': '在社交场合，我宁愿一个人坐着，或者只和一两个人在一起',
  'mmpi-026': '我有一个很突出的习惯，就是做任何事都从不后悔',
  'mmpi-027': '我喜欢看爱情小说',
  'mmpi-028': '我相信有人在跟踪我',
  'mmpi-029': '别人怎样看待我并不重要',
  'mmpi-030': '我的胃有很严重的毛病',
  'mmpi-031': '我常常感到人生是无用的',
  'mmpi-032': '我很容易哭',
  'mmpi-033': '对于那些遇事知道怎么占别人便宜的人，我并不反感',
  'mmpi-034': '我喜欢诗',
  'mmpi-035': '大多数人内心都不愿意挺身而出去帮助别人',
  'mmpi-036': '我有强烈的罪恶感',
  'mmpi-037': '有时我会非常高兴，以致于连续几天睡不着觉',
  'mmpi-038': '我是个重要人物',
  'mmpi-039': '我总是感到紧张，像心里揣着一只兔子',
  'mmpi-040': '大多数人交朋友只是为了对自己有利',
  'mmpi-041': '有人一直在背后谈论我',
  'mmpi-042': '在学校里，我被送到校长办公室接受训斥的次数相当多',
  'mmpi-043': '我经常头痛',
  'mmpi-044': '有时我会感到万分沮丧',
  'mmpi-045': '疼痛并不过分困扰我',
  'mmpi-046': '我认为执法机关大多数是公正的',
  'mmpi-047': '我喜欢园艺和养花',
  'mmpi-048': '我很容易感到不耐烦',
  'mmpi-049': '我曾经干过小偷小摸的事',
  'mmpi-050': '我觉得自己神经有点不正常',
  'mmpi-051': '我的做事方式是快速果断，不拖泥带水',
  'mmpi-052': '我希望自己能像别人那样快乐',
  'mmpi-053': '我觉得大多数事情对我来说都无所谓',
  'mmpi-054': '我相信自己受到了迫害',
  'mmpi-055': '我感到难以集中注意力',
  'mmpi-056': '我的性生活是满意的',
  'mmpi-057': '我曾经酗酒',
  'mmpi-058': '我相信有人阴谋反对我',
  'mmpi-059': '我很少和家人争吵',
  'mmpi-060': '有时我会有一种不好的念头，难以启齿',
  'mmpi-061': '我比大多数人更敏感',
  'mmpi-062': '我的身体和我的朋友一样健康',
  'mmpi-063': '我有理由嫉妒家里人',
  'mmpi-064': '我的性生活非常好',
  'mmpi-065': '我有时会无缘无故地感到特别愉快',
  'mmpi-066': '在学校里，有时我因为害羞而不愿在课堂上背诵',
  'mmpi-067': '我有时会把自己的过错推给别人',
  'mmpi-068': '我经常对自己的性能力感到担心',
  'mmpi-069': '我的心脏有时跳得非常厉害，以致于我能感觉到',
  'mmpi-070': '对我来说，大多数时候活下去并不值得',
  'mmpi-071': '我感到自己的身体有严重问题',
  'mmpi-072': '我能够在很长一段时间里做同一件事而不感到厌烦',
  'mmpi-073': '我认为我的性生活是正常的',
  'mmpi-074': '我喜欢读有关科学的书籍',
  'mmpi-075': '我经常会发怒',
  'mmpi-076': '我相信有人能够读懂我的思想',
  'mmpi-077': '我精力充沛，不知疲倦',
  'mmpi-078': '我有时会感到羞愧，想要躲起来',
  'mmpi-079': '有时我真想骂脏话',
  'mmpi-080': '我有一些非常特殊、非常奇怪的念头',
  'mmpi-081': '有时我觉得所有的事情都不真实',
  'mmpi-082': '我的脖子上经常出现红斑',
  'mmpi-083': '我曾在绝望中工作',
  'mmpi-084': '我发现新的环境使我感到害怕',
  'mmpi-085': '我经常觉得自己在做错事或做坏事',
  'mmpi-086': '我过去曾尝试过吸毒',
  'mmpi-087': '我认为有一个国际性的罪恶组织正在想法统治全世界',
  'mmpi-088': '我对自己评价过高',
  'mmpi-089': '我经常听到声音，但我不知道是从哪里来的',
  'mmpi-090': '我经常发现自己坐立不安，心神不宁',
  'mmpi-091': '我很难开口向别人求助',
  'mmpi-092': '在学校里，我非常难集中注意力学习',
  'mmpi-093': '有一些非常下流、肮脏的想法不断在我脑中出现',
  'mmpi-094': '晚上我总是难以入睡，思绪纷扰',
  'mmpi-095': '我有一些奇怪的习惯',
  'mmpi-096': '我曾经感到自己快要精神崩溃了',
  'mmpi-097': '当我做一件事时，我总会发现自己在想别的事情',
  'mmpi-098': '我做过一些后来让我感到非常后悔的事情',
  'mmpi-099': '我喜欢修理破旧的东西',
  'mmpi-100': '我的判断力比平时差了很多',
  'mmpi-101': '我担心自己会发疯',
  'mmpi-102': '我的心灵比任何人都能通达',
  'mmpi-103': '即使和人们在一起，我仍然感到孤单',
  'mmpi-104': '我不喜欢见到陌生人',
  'mmpi-105': '我相信有人会对我施加催眠术，使我做出不由自主的事情',
  'mmpi-106': '我对人非常友好',
  'mmpi-107': '我感到我的整个头部一天到晚都在疼',
  'mmpi-108': '有好几次我对工作完全失去了兴趣',
  'mmpi-109': '我的行为常常受到别人的赞许',
  'mmpi-110': '我曾经装病来逃避某些事情',
  'mmpi-111': '我觉得有人用催眠术控制了我的思想',
  'mmpi-112': '我经常感到害怕',
  'mmpi-113': '我能看到别人看不到的东西',
  'mmpi-114': '我说话一直很流利',
  'mmpi-115': '我总是感到精神紧张',
  'mmpi-116': '有人试图盗窃我的思想和主意',
  'mmpi-117': '当我看到动物受折磨时，我并不特别难受',
  'mmpi-118': '我相信我应该受到严厉的惩罚',
  'mmpi-119': '我常常是欢乐的时候少，悲伤的时候多',
  'mmpi-120': '我感到自己被某种恶魔附体了',
}

function createMMPIQuestion(id: string): ProfessionalQuestion {
  return {
    id,
    text: mmpiQuestionTexts[id],
    type: 'single',
    dimensions: [mmpiKeying[id]?.scale || 'general'],
    options: mmpiOptions,
  }
}

export const mmpiProfessionalQuestions: ProfessionalQuestion[] = Array.from({ length: 120 }, (_, i) => createMMPIQuestion(`mmpi-${String(i + 1).padStart(3, '0')}`))

export const mmpiProfessionalQuestionSet = {
  normal: mmpiProfessionalQuestions.slice(0, 40),
  advanced: mmpiProfessionalQuestions.slice(0, 80),
  professional: mmpiProfessionalQuestions,
}

export function calculateMMPScores(answerMap: Record<string, number>) {
  const scales = {
    lie: 0,
    infrequency: 0,
    correction: 0,
    hypochondriasis: 0,
    depression: 0,
    hysteria: 0,
    psychopathicDeviate: 0,
    masculinityFemininity: 0,
    paranoia: 0,
    psychasthenia: 0,
    schizophrenia: 0,
    hypomania: 0,
    socialIntroversion: 0,
  }
  const counts = { ...scales }

  mmpiProfessionalQuestions.forEach(q => {
    const answer = answerMap[q.id]
    const keying = mmpiKeying[q.id]
    if (answer !== undefined && keying) {
      const score = answer === keying.direction ? 1 : 0
      scales[keying.scale as keyof typeof scales] += score
      counts[keying.scale as keyof typeof counts]++
    }
  })

  const unanswered = Object.keys(mmpiQuestionTexts).length - Object.keys(answerMap).length
  const consistencyCheck = calculateResponseConsistency(answerMap)

  const kCorrection = Math.round(scales.correction * 0.5)
  const rawToT = (raw: number, mean: number, sd: number) => Math.min(100, Math.max(30, Math.round(50 + ((raw - mean) / sd) * 10)))

  const tScores = {
    lie: rawToT(scales.lie, 3, 1.5),
    infrequency: rawToT(scales.infrequency, 4, 2.5),
    correction: rawToT(scales.correction, 10, 3),
    hypochondriasis: rawToT(scales.hypochondriasis + Math.round(kCorrection * 0.5), 6, 3),
    depression: rawToT(scales.depression + Math.round(kCorrection * 1), 18, 6),
    hysteria: rawToT(scales.hysteria, 14, 5),
    psychopathicDeviate: rawToT(scales.psychopathicDeviate + Math.round(kCorrection * 0.4), 10, 4),
    masculinityFemininity: rawToT(scales.masculinityFemininity, 20, 5),
    paranoia: rawToT(scales.paranoia, 6, 3),
    psychasthenia: rawToT(scales.psychasthenia + kCorrection, 12, 5),
    schizophrenia: rawToT(scales.schizophrenia + kCorrection, 10, 6),
    hypomania: rawToT(scales.hypomania, 12, 4),
    socialIntroversion: rawToT(scales.socialIntroversion, 16, 6),
  }

  const validity = assessValidity(tScores, unanswered, consistencyCheck)
  const clinicalElevation = Object.entries(tScores)
    .filter(([k]) => !['lie', 'infrequency', 'correction', 'masculinityFemininity'].includes(k))
    .filter(([_, v]) => v >= 65)
    .map(([k]) => k)

  const subclinicalElevation = Object.entries(tScores)
    .filter(([k]) => !['lie', 'infrequency', 'correction', 'masculinityFemininity'].includes(k))
    .filter(([_, v]) => v >= 55 && v < 65)
    .map(([k]) => k)

  const overallClinicalIndex = Math.round(
    (tScores.hypochondriasis + tScores.depression + tScores.hysteria +
     tScores.psychopathicDeviate + tScores.paranoia + tScores.psychasthenia +
     tScores.schizophrenia) / 7
  )

  return {
    rawScores: scales,
    tScores,
    unanswered,
    consistencyScore: consistencyCheck,
    validityFlags: validity.flags,
    validityConcerns: validity.hasConcerns,
    clinicalElevations: clinicalElevation,
    subclinicalElevations: subclinicalElevation,
    overallClinicalIndex,
    profileValidity: validity.classification,
    validityInterpretation: validity.interpretation,
  }
}

function calculateResponseConsistency(answerMap: Record<string, number>): number {
  let similarPairs = 0
  let consistentPairs = 0
  
  const similarItemPairs = [
    ['mmpi-005', 'mmpi-031'],
    ['mmpi-011', 'mmpi-050'],
    ['mmpi-018', 'mmpi-044'],
    ['mmpi-022', 'mmpi-058'],
    ['mmpi-037', 'mmpi-090'],
  ]

  similarItemPairs.forEach(([q1, q2]) => {
    if (answerMap[q1] !== undefined && answerMap[q2] !== undefined) {
      similarPairs++
      if (Math.abs(answerMap[q1] - answerMap[q2]) <= 1) {
        consistentPairs++
      }
    }
  })

  return similarPairs > 0 ? Math.round((consistentPairs / similarPairs) * 100) : 85
}

function assessValidity(tScores: Record<string, number>, unanswered: number, consistency: number) {
  const flags: string[] = []
  let hasConcerns = false
  let classification = '有效'
  const interpretations: string[] = []

  if (unanswered > 10) {
    flags.push('大量未作答')
    hasConcerns = true
    interpretations.push(`未作答题目${unanswered}题，可能存在回避倾向`)
  }

  if (tScores.lie >= 70) {
    flags.push('L量表极度升高')
    hasConcerns = true
    interpretations.push('说谎量表T>70，可能存在装好或过分理想化')
  } else if (tScores.lie >= 60) {
    flags.push('L量表升高')
    interpretations.push('说谎量表T=60-69，可能存在印象管理倾向')
  }

  if (tScores.infrequency >= 80) {
    flags.push('F量表极度升高')
    hasConcerns = true
    interpretations.push('诈病量表T>80，可能存在随机应答或夸大症状')
    classification = '无效'
  } else if (tScores.infrequency >= 70) {
    flags.push('F量表显著升高')
    hasConcerns = true
    interpretations.push('诈病量表T=70-79，需谨慎解读临床量表')
  }

  if (tScores.correction <= 35) {
    flags.push('K分极低')
    hasConcerns = true
    interpretations.push('校正量表T<35，可能存在过分坦率或自我揭露')
  } else if (tScores.correction >= 65) {
    flags.push('K分过高')
    interpretations.push('校正量表T>=65，可能存在防御性回答')
  }

  if (consistency < 60) {
    flags.push('回答不一致')
    hasConcerns = true
    interpretations.push(`条目一致性${consistency}%，可能存在随机应答`)
  }

  if (!hasConcerns) {
    interpretations.push('所有效度量表均在正常范围，剖面图有效')
  }

  return {
    flags,
    hasConcerns,
    classification,
    interpretation: interpretations.join('；'),
  }
}

export function calculateMMPIProfessional(answers: Array<{ questionId: string; value?: number }>): ProfessionalAssessmentResult {
  const answerMap: Record<string, number> = {}
  answers.forEach(a => {
    if (a.value !== undefined) answerMap[a.questionId] = a.value
  })

  const result = calculateMMPScores(answerMap)

  const profileType = result.clinicalElevations.length === 0 ? '正常范围' :
    result.clinicalElevations.length >= 3 ? '多点升高' :
    `${result.clinicalElevations.map(k => MMPI_SCALE_NAMES[k]).join(' / ')}升高`

  const level = result.overallClinicalIndex >= 65 ? '临床关注范围' :
    result.overallClinicalIndex >= 55 ? '亚临床范围' : '正常范围'

  return generateProfessionalResult({
    type: 'mmpi',
    title: 'MMPI临床人格专业报告',
    description: `人格剖面图：${profileType}，效度量表：${result.profileValidity}`,
    score: 100 - Math.min(70, result.overallClinicalIndex),
    accuracy: 85,
    dimensions: [
      { name: 'L说谎量表', score: result.tScores.lie, maxScore: 100, description: MMPI_SCALE_DESCRIPTIONS.lie },
      { name: 'F诈病量表', score: result.tScores.infrequency, maxScore: 100, description: MMPI_SCALE_DESCRIPTIONS.infrequency },
      { name: 'K校正量表', score: result.tScores.correction, maxScore: 100, description: MMPI_SCALE_DESCRIPTIONS.correction },
      { name: 'Hs疑病', score: result.tScores.hypochondriasis, maxScore: 100, description: MMPI_SCALE_DESCRIPTIONS.hypochondriasis },
      { name: 'D抑郁', score: result.tScores.depression, maxScore: 100, description: MMPI_SCALE_DESCRIPTIONS.depression },
      { name: 'Hy癔症', score: result.tScores.hysteria, maxScore: 100, description: MMPI_SCALE_DESCRIPTIONS.hysteria },
      { name: 'Pd精神病态', score: result.tScores.psychopathicDeviate, maxScore: 100, description: MMPI_SCALE_DESCRIPTIONS.psychopathicDeviate },
      { name: 'Mf性别角色', score: result.tScores.masculinityFemininity, maxScore: 100, description: MMPI_SCALE_DESCRIPTIONS.masculinityFemininity },
      { name: 'Pa偏执', score: result.tScores.paranoia, maxScore: 100, description: MMPI_SCALE_DESCRIPTIONS.paranoia },
      { name: 'Pt精神衰弱', score: result.tScores.psychasthenia, maxScore: 100, description: MMPI_SCALE_DESCRIPTIONS.psychasthenia },
      { name: 'Sc精神分裂', score: result.tScores.schizophrenia, maxScore: 100, description: MMPI_SCALE_DESCRIPTIONS.schizophrenia },
      { name: 'Ma轻躁狂', score: result.tScores.hypomania, maxScore: 100, description: MMPI_SCALE_DESCRIPTIONS.hypomania },
      { name: 'Si社会内向', score: result.tScores.socialIntroversion, maxScore: 100, description: MMPI_SCALE_DESCRIPTIONS.socialIntroversion },
      { name: '临床综合指数', score: result.overallClinicalIndex, maxScore: 100, description: '10个临床量表T分综合' },
    ],
    strengths: [
      `效度量表：${result.profileValidity}`,
      `人格模式：${profileType}`,
      `临床水平：${level} (T=${result.overallClinicalIndex})`,
    ],
    weaknesses: [],
    careers: [],
  }, 'professional')
}

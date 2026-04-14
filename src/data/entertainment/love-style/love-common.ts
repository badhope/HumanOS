export type LoveStyleType = 'eros' | 'ludus' | 'storge' | 'pragma' | 'mania' | 'agape'

export interface LoveStyleQuestionMeta {
  dimension: LoveStyleType
  reverse: boolean
  weight: number
}

export const styleProfiles: Record<LoveStyleType, {
  name: string
  title: string
  description: string
  quote: string
  strength: string
  weakness: string
  celebrities: string[]
}> = {
  eros: {
    name: '激情之爱',
    title: '浪漫主义者',
    description: '你相信一见钟情，追求灵魂层面的共鸣和强烈的化学吸引。对你来说爱是全身心的投入和极致的浪漫体验。颜值、气场、直觉的契合比什么都重要，你渴望的是电影般轰轰烈烈的爱情。',
    quote: '"遇见你爱意汹涌，看世间万物都浪漫心动。"',
    strength: '热情、浪漫、真诚、直觉敏锐',
    weakness: '激情褪去后的落差、容易理想化对方',
    celebrities: ['罗密欧与朱丽叶', '泰坦尼克号杰克', '贾宝玉', '王菲'],
  },
  ludus: {
    name: '游戏之爱',
    title: '爱情玩家',
    description: '爱是一场好玩的游戏，何必那么认真？你享受追逐和征服的过程，擅长暧昧和调情，讨厌被爱情束缚。对你来说保持魅力和选择权最重要，承诺是世界上最无聊的事情。',
    quote: '"认真你就输了。"',
    strength: '魅力四射、有趣、不粘人、享受当下',
    weakness: '难以建立深度联结、害怕承诺',
    celebrities: ['卡萨诺瓦', '渣男祖师爷', '韦小宝', '花花公子'],
  },
  storge: {
    name: '陪伴之爱',
    title: '青梅竹马派',
    description: '最好的爱情是细水长流的陪伴。你相信真正的爱情是从友情开始的，是日积月累的了解和默契。对你来说安全感、可靠、习惯彼此的存在比心跳更重要，爱就是平平淡淡过日子。',
    quote: '"陪伴是最长情的告白。"',
    strength: '稳定、忠诚、温暖、细水长流',
    weakness: '缺乏激情、太平淡容易厌倦',
    celebrities: ['黄磊孙莉', '张国立邓婕', '华盛顿夫妇', '夏目漱石'],
  },
  pragma: {
    name: '现实之爱',
    title: '人间清醒',
    description: '婚姻是精确的价值匹配，爱情是可以计算的。你会理智地考察对方的条件：家境、学历、工作、性格、三观。对你来说门当户对不是势利，而是对彼此的人生负责。',
    quote: '"爱情不能当饭吃。"',
    strength: '务实、负责任、考虑周全、高婚姻存活率',
    weakness: '过于计算、缺乏心动的感觉',
    celebrities: ['大多数相亲者', '投行精英', '沈亦臻', '苏明玉'],
  },
  mania: {
    name: '占有之爱',
    title: '浓烈偏执型',
    description: '爱就是极致的占有和疯狂的思念。你容易在爱中患得患失、嫉妒、缺乏安全感，需要对方不断证明爱意。你的爱是如此强烈，燃烧了对方，也燃烧了自己。',
    quote: '"你是我的，只能是我的。"',
    strength: '深情、专一、为爱奋不顾身',
    weakness: '情绪不稳定、容易给对方压力',
    celebrities: ['李莫愁', '甄嬛传安陵容', '歌剧魅影', '别和陌生人说话'],
  },
  agape: {
    name: '奉献之爱',
    title: '无我奉献者',
    description: '爱就是无条件的付出和牺牲。你把爱人的幸福放在自己之上，愿意为TA改变、等待、牺牲一切。你相信爱就是慈悲，就是谅解，就是不问值不值得。',
    quote: '"你安好，我随意。"',
    strength: '无私、宽容、伟大的牺牲精神',
    weakness: '容易失去自我、容易被辜负',
    celebrities: ['金岳霖', '杨绛', '特蕾莎修女', '母亲'],
  },
}

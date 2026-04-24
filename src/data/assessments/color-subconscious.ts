import type { Assessment } from '../../types'

const NINE_SOUL_COLORS = [
  { type: 'red', name: '火山橙灵魂', hex: '#F97316', emoji: '🔥', desc: '炽热奔放，永远年轻永远热泪盈眶' },
  { type: 'blue', name: '深海蓝灵魂', hex: '#0EA5E9', emoji: '🌊', desc: '冷静理性，内心深处藏着一片海' },
  { type: 'purple', name: '极光紫灵魂', hex: '#8B5CF6', emoji: '✨', desc: '神秘浪漫，自带艺术家氛围感' },
  { type: 'pink', name: '樱花粉灵魂', hex: '#EC4899', emoji: '🌸', desc: '温柔治愈，永远相信美好' },
  { type: 'green', name: '森林绿灵魂', hex: '#10B981', emoji: '🌲', desc: '平静温和，给人满满的安全感' },
  { type: 'gold', name: '日落金灵魂', hex: '#F59E0B', emoji: '☀️', desc: '温暖明亮，小太阳一样的存在' },
  { type: 'black', name: '宇宙黑灵魂', hex: '#1F2937', emoji: '🌙', desc: '深邃独立，外冷内热的孤狼' },
  { type: 'white', name: '云间白灵魂', hex: '#F3F4F6', emoji: '☁️', desc: '纯粹干净，出淤泥而不染' },
  { type: 'cyan', name: '薄荷青灵魂', hex: '#06B6D4', emoji: '🍃', desc: '清新脱俗，永远的少年心气' },
]

export const colorSubconsciousAssessment: Assessment = {
  id: 'color-subconscious',
  title: '色彩潜意识投射',
  description: '16道色彩心理学测试，看穿你灵魂的真实底色',
  category: '意识形态',
  subcategory: '潜意识',
  difficulty: 'standard',
  duration: 3,
  quality: '娱乐',
  questionCount: 16,
  questions: [
    { id: 'color-1', type: 'single', text: '闭上眼睛，你最先想到的颜色是？', dimension: 'extraversion', options: [
      { id: '1', value: 1, text: '🔴 炽热红' },
      { id: '2', value: 2, text: '🟡 明亮黄' },
      { id: '3', value: 3, text: '🔵 深海蓝' },
      { id: '4', value: 4, text: '⚫ 深邃黑' },
      { id: '5', value: 5, text: '⚪ 纯净白' },
    ]},
    { id: 'color-2', type: 'single', text: '你想用哪种颜色装饰卧室墙壁？', dimension: 'emotional', options: [
      { id: '1', value: 1, text: '大胆撞色，艺术墙' },
      { id: '2', value: 2, text: '莫兰迪灰/米白' },
      { id: '3', value: 3, text: '淡紫色/雾霾蓝' },
      { id: '4', value: 4, text: '奶白色/原木色' },
      { id: '5', value: 5, text: '全黑，遮光好睡觉' },
    ]},
    { id: 'color-3', type: 'single', text: '你觉得最治愈的颜色组合是？', dimension: 'emotional', options: [
      { id: '1', value: 1, text: '🔥 篝火 + 夜' },
      { id: '2', value: 2, text: '🌊 海 + 天' },
      { id: '3', value: 3, text: '🌅 晚霞 + 云' },
      { id: '4', value: 4, text: '🌲 树 + 阳光' },
      { id: '5', value: 5, text: '❄️ 雪 + 月光' },
    ]},
    { id: 'color-4', type: 'single', text: '挑选一件约会的衣服', dimension: 'extraversion', options: [
      { id: '1', value: 1, text: '热情红色，成为焦点' },
      { id: '2', value: 2, text: '经典黑色，永远不会错' },
      { id: '3', value: 3, text: '神秘紫色，氛围感拉满' },
      { id: '4', value: 4, text: '温柔白色，干净纯粹' },
      { id: '5', value: 5, text: '舒服就好，穿什么都行' },
    ]},
    { id: 'color-5', type: 'single', text: '你更喜欢哪种天气？', dimension: 'idealism', options: [
      { id: '1', value: 1, text: '☀️ 阳光灿烂的大晴天' },
      { id: '2', value: 2, text: '🌧️ 下雨的天气，适合睡觉' },
      { id: '3', value: 3, text: '❄️ 下雪，全世界都安静了' },
      { id: '4', value: 4, text: '🌆 黄昏日落时' },
      { id: '5', value: 5, text: '☁️ 阴天，不用出门' },
    ]},
    { id: 'color-6', type: 'single', text: '送礼物给朋友，你会选什么颜色的包装纸？', dimension: 'rebellion', options: [
      { id: '1', value: 1, text: '喜庆的大红色' },
      { id: '2', value: 2, text: '高级的哑光黑' },
      { id: '3', value: 3, text: '马卡龙的粉色' },
      { id: '4', value: 4, text: '淡雅的米白色' },
      { id: '5', value: 5, text: '怪诞的撞色设计' },
    ]},
    { id: 'color-7', type: 'single', text: '你觉得你的灵魂是什么颜色？', dimension: 'spirituality', options: [
      { id: '1', value: 1, text: '透明的，没有颜色' },
      { id: '2', value: 2, text: '五彩斑斓，随心情变' },
      { id: '3', value: 3, text: '深邃的，接近黑色' },
      { id: '4', value: 4, text: '温暖的，接近金色' },
      { id: '5', value: 5, text: '人是没有灵魂的' },
    ]},
    { id: 'color-8', type: 'single', text: '画一幅画，天空你会涂什么颜色？', dimension: 'idealism', options: [
      { id: '1', value: 1, text: '标准的蓝天白云' },
      { id: '2', value: 2, text: '粉紫色的梦幻渐变' },
      { id: '3', value: 3, text: '橘红色的火烧云' },
      { id: '4', value: 4, text: '深紫色的夜空' },
      { id: '5', value: 5, text: '灰色的，或者干脆不涂' },
    ]},
    { id: 'color-9', type: 'single', text: '你觉得最能代表"孤独"的颜色是？', dimension: 'spirituality', options: [
      { id: '1', value: 1, text: '深蓝色，像深海一样' },
      { id: '2', value: 2, text: '纯黑色，无边无际' },
      { id: '3', value: 3, text: '白色，空无一物' },
      { id: '4', value: 4, text: '灰色，灰蒙蒙的雾' },
      { id: '5', value: 5, text: '孤独不需要颜色' },
    ]},
    { id: 'color-10', type: 'single', text: '你觉得最能代表"愤怒"的颜色是？', dimension: 'rebellion', options: [
      { id: '1', value: 1, text: '血红色，爆炸的感觉' },
      { id: '2', value: 2, text: '黑色，沉默的爆发' },
      { id: '3', value: 3, text: '紫色，压抑的怒火' },
      { id: '4', value: 4, text: '白色，气到大脑空白' },
      { id: '5', value: 5, text: '透明，因为根本不在乎' },
    ]},
    { id: 'color-11', type: 'single', text: '你更喜欢哪种风格的壁纸？', dimension: 'spirituality', options: [
      { id: '1', value: 1, text: '霓虹赛博朋克' },
      { id: '2', value: 2, text: '极简黑白' },
      { id: '3', value: 3, text: '自然风景摄影' },
      { id: '4', value: 4, text: '抽象艺术' },
      { id: '5', value: 5, text: '纯黑，省电' },
    ]},
    { id: 'color-12', type: 'single', text: '买手机壳，你通常选什么颜色？', dimension: 'extraversion', options: [
      { id: '1', value: 1, text: '花里胡哨，越亮越好' },
      { id: '2', value: 2, text: '透明壳，展示原色' },
      { id: '3', value: 3, text: '经典黑，耐脏' },
      { id: '4', value: 4, text: '温柔的马卡龙色' },
      { id: '5', value: 5, text: '随便，能用就行' },
    ]},
    { id: 'color-13', type: 'single', text: '你觉得什么颜色最有"高级感"？', dimension: 'idealism', options: [
      { id: '1', value: 1, text: '金色，奢华的象征' },
      { id: '2', value: 2, text: '哑光黑，永不过时' },
      { id: '3', value: 3, text: '莫兰迪色系，质感至上' },
      { id: '4', value: 4, text: '纯白色，最纯粹的高级' },
      { id: '5', value: 5, text: '高级感都是智商税' },
    ]},
    { id: 'color-14', type: 'single', text: '看到红色，你第一反应是？', dimension: 'emotional', options: [
      { id: '1', value: 1, text: '危险，停止' },
      { id: '2', value: 2, text: '热情，爱情' },
      { id: '3', value: 3, text: '喜庆，过年' },
      { id: '4', value: 4, text: '愤怒，警告' },
      { id: '5', value: 5, text: '就是个颜色而已' },
    ]},
    { id: 'color-15', type: 'single', text: '看到蓝色，你第一反应是？', dimension: 'emotional', options: [
      { id: '1', value: 1, text: '忧郁，悲伤' },
      { id: '2', value: 2, text: '平静，安宁' },
      { id: '3', value: 3, text: '自由，天空大海' },
      { id: '4', value: 4, text: '理性，逻辑' },
      { id: '5', value: 5, text: '就是个颜色而已' },
    ]},
    { id: 'color-16', type: 'single', text: '如果人生只能选一种颜色，你选？', dimension: 'spirituality', options: [
      { id: '1', value: 1, text: '彩虹色，我全都要' },
      { id: '2', value: 2, text: '黑色，百搭不出错' },
      { id: '3', value: 3, text: '白色，一切皆有可能' },
      { id: '4', value: 4, text: '灰色，中间地带最安全' },
      { id: '5', value: 5, text: '透明色，我选择不存在' },
    ]},
  ],
  resultCalculator: (answers: any[]) => {
    const dimensionScores: Record<string, number[]> = {
      extraversion: [],
      emotional: [],
      idealism: [],
      rebellion: [],
      spirituality: [],
    }
    const dimensionMap: Record<string, string> = {
      'color-1': 'extraversion', 'color-4': 'extraversion', 'color-12': 'extraversion',
      'color-2': 'emotional', 'color-3': 'emotional', 'color-14': 'emotional', 'color-15': 'emotional',
      'color-5': 'idealism', 'color-8': 'idealism', 'color-13': 'idealism',
      'color-6': 'rebellion', 'color-10': 'rebellion',
      'color-7': 'spirituality', 'color-9': 'spirituality', 'color-11': 'spirituality', 'color-16': 'spirituality',
    }

    answers.forEach((answer: any) => {
      const qid = answer.questionId
      const dim = dimensionMap[qid] || 'spirituality'
      const v = typeof answer.value === 'number' ? answer.value : parseInt(String(answer.value || 3))
      dimensionScores[dim].push(v)
    })

    const scores: Record<string, number> = {}
    Object.keys(dimensionScores).forEach(key => {
      const arr = dimensionScores[key]
      const avg = arr.reduce((a, b) => a + b, 0) / Math.max(1, arr.length)
      scores[key] = Math.round(avg * 20)
    })

    const signature = scores.extraversion * 10000 + scores.emotional * 1000 + 
      scores.idealism * 100 + scores.rebellion * 10 + scores.spirituality
    
    const matchedColor = NINE_SOUL_COLORS[signature % 9]

    return {
      type: matchedColor.type,
      name: matchedColor.name,
      emoji: matchedColor.emoji,
      hex: matchedColor.hex,
      desc: matchedColor.desc,
      dimensionScores: scores,
      dimensions: [
        { name: '外向能量', score: scores.extraversion, color: '#F97316' },
        { name: '情感浓度', score: scores.emotional, color: '#8B5CF6' },
        { name: '理想主义', score: scores.idealism, color: '#EC4899' },
        { name: '反叛精神', score: scores.rebellion, color: '#0EA5E9' },
        { name: '灵性深度', score: scores.spirituality, color: '#10B981' },
      ],
      overall: matchedColor.name,
      allColors: NINE_SOUL_COLORS,
    }
  },
}

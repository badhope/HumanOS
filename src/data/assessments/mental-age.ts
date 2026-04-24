import type { Assessment } from '../../types'

export const mentalAgeAssessment: Assessment = {
  id: 'mental-age',
  title: '精神年龄诊断',
  description: '你的身体在上班，灵魂已经退休了吗？18道灵魂拷问，精准测出你的心智老化程度',
  category: '自我认知',
  subcategory: '心智成熟度',
  difficulty: 'standard',
  duration: 3,
  quality: '娱乐',
  questionCount: 18,
  questions: [
    { id: 'age-1', type: 'single', text: '朋友约你晚上 8 点出去聚餐，你的第一反应是？', dimension: 'cognition', options: [
      { id: '1', value: 1, text: '太好了！通宵都没问题！' },
      { id: '2', value: 2, text: '可以，但 11 点前必须回家' },
      { id: '3', value: 3, text: '能不能改到中午？晚上想早点睡' },
      { id: '4', value: 4, text: '算了吧，在家躺着最舒服' },
      { id: '5', value: 5, text: '别约了，有事微信说吧' },
    ]},
    { id: 'age-2', type: 'single', text: '看到一个很火的新梗，你会？', dimension: 'cognition', options: [
      { id: '1', value: 1, text: '立刻用上！5G冲浪选手' },
      { id: '2', value: 2, text: '去搜一下是什么意思' },
      { id: '3', value: 3, text: '看得懂就行，不用参与' },
      { id: '4', value: 4, text: '现在的年轻人真奇怪' },
      { id: '5', value: 5, text: '这帮人一天天净搞些没用的' },
    ]},
    { id: 'age-3', type: 'single', text: '朋友圈发什么内容？', dimension: 'cognition', options: [
      { id: '1', value: 1, text: '一天八条，吃喝拉撒都要发' },
      { id: '2', value: 2, text: '精心P图，每周一条营业' },
      { id: '3', value: 3, text: '半年一条，主要是转发' },
      { id: '4', value: 4, text: '只刷不发，神秘的观察者' },
      { id: '5', value: 5, text: '已经三年没发过了' },
    ]},
    { id: 'age-4', type: 'single', text: '跟人吵架，气得浑身发抖。第二天醒来你会？', dimension: 'emotional', options: [
      { id: '1', value: 1, text: '越想越气，必须骂回来！' },
      { id: '2', value: 2, text: '找朋友吐槽一整天' },
      { id: '3', value: 3, text: '有点不爽，但很快忘了' },
      { id: '4', value: 4, text: '这点小事犯不上' },
      { id: '5', value: 5, text: '啊？昨天吵架了？完全忘了' },
    ]},
    { id: 'age-5', type: 'single', text: '排队有人插你队，你会？', dimension: 'emotional', options: [
      { id: '1', value: 1, text: '当场怒斥！必须骂到他道歉' },
      { id: '2', value: 2, text: '大声提醒，让周围人都看着' },
      { id: '3', value: 3, text: '小声嘀咕一句算了' },
      { id: '4', value: 4, text: '算了算了，多一事不如少一事' },
      { id: '5', value: 5, text: '插就插吧，人家可能着急' },
    ]},
    { id: 'age-6', type: 'single', text: '喝奶茶，你会点？', dimension: 'emotional', options: [
      { id: '1', value: 1, text: '全糖加冰，快乐加倍！' },
      { id: '2', value: 2, text: '三分糖，加珍珠波霸' },
      { id: '3', value: 3, text: '无糖温热，健康最重要' },
      { id: '4', value: 4, text: '奶茶？还是泡枸杞吧' },
      { id: '5', value: 5, text: '喝白开水，最健康' },
    ]},
    { id: 'age-7', type: 'single', text: '周末你更倾向于？', dimension: 'social', options: [
      { id: '1', value: 1, text: '约满！五天局不停' },
      { id: '2', value: 2, text: '出去一天，在家一天' },
      { id: '3', value: 3, text: '见一两个好朋友就行' },
      { id: '4', value: 4, text: '有人约也不想动，下次吧' },
      { id: '5', value: 5, text: '谁也别来找我，我要修仙' },
    ]},
    { id: 'age-8', type: 'single', text: '很久没联系的同学约聚会，你会？', dimension: 'social', options: [
      { id: '1', value: 1, text: '太棒了！必须去！' },
      { id: '2', value: 2, text: '有时间就去' },
      { id: '3', value: 3, text: '看情况，熟的就去' },
      { id: '4', value: 4, text: '算了吧，没什么好聊的' },
      { id: '5', value: 5, text: '直接装没看见消息' },
    ]},
    { id: 'age-9', type: 'single', text: '对于熬夜，你的看法是？', dimension: 'social', options: [
      { id: '1', value: 1, text: '月亮不睡我不睡！' },
      { id: '2', value: 2, text: '偶尔熬一熬，咖啡续命' },
      { id: '3', value: 3, text: '熬夜是不可能的，命最重要' },
      { id: '4', value: 4, text: '十点准时睡，老年人作息' },
      { id: '5', value: 5, text: '九点就困了，躺下就能睡着' },
    ]},
    { id: 'age-10', type: 'single', text: '答应朋友的事搞砸了，你会？', dimension: 'responsibility', options: [
      { id: '1', value: 1, text: '啊！完了！我怎么这么没用！' },
      { id: '2', value: 2, text: '疯狂道歉，尽全力补救' },
      { id: '3', value: 3, text: '诚恳道歉，下次注意' },
      { id: '4', value: 4, text: '解释一下原因，尽力就好' },
      { id: '5', value: 5, text: '人嘛，难免的，理解一下' },
    ]},
    { id: 'age-11', type: 'single', text: '父母身体不舒服，你会？', dimension: 'responsibility', options: [
      { id: '1', value: 1, text: '没事，他们自己会去医院的' },
      { id: '2', value: 2, text: '提醒他们多喝热水' },
      { id: '3', value: 3, text: '网上搜搜怎么办，给点建议' },
      { id: '4', value: 4, text: '请假陪他们去医院' },
      { id: '5', value: 5, text: '立刻回家，全程陪着' },
    ]},
    { id: 'age-12', type: 'single', text: '看到年轻人的各种"幼稚"行为，你会觉得？', dimension: 'responsibility', options: [
      { id: '1', value: 1, text: '我也这样！一起玩！' },
      { id: '2', value: 2, text: '挺有意思的，年轻真好' },
      { id: '3', value: 3, text: '还行吧，不评价' },
      { id: '4', value: 4, text: '现在的年轻人啊...' },
      { id: '5', value: 5, text: '世风日下，人心不古' },
    ]},
    { id: 'age-13', type: 'single', text: '计划好的旅行被取消了，你会？', dimension: 'resilience', options: [
      { id: '1', value: 1, text: '心态炸了！必须骂三天' },
      { id: '2', value: 2, text: '郁闷一整天，然后再想办法' },
      { id: '3', value: 3, text: '可惜，但也没办法' },
      { id: '4', value: 4, text: '正好，在家休息也挺好' },
      { id: '5', value: 5, text: '塞翁失马，焉知非福' },
    ]},
    { id: 'age-14', type: 'single', text: '对于"爱自己"这句话，你怎么看？', dimension: 'resilience', options: [
      { id: '1', value: 1, text: '必须轰轰烈烈爱一场！' },
      { id: '2', value: 2, text: '努力让自己变得更好' },
      { id: '3', value: 3, text: '接受自己的不完美' },
      { id: '4', value: 4, text: '跟自己和解最重要' },
      { id: '5', value: 5, text: '我就这样了，爱咋咋地' },
    ]},
    { id: 'age-15', type: 'single', text: '朋友说你变了，你会？', dimension: 'resilience', options: [
      { id: '1', value: 1, text: '我哪里变了？你说清楚！' },
      { id: '2', value: 2, text: '真的吗？我改还不行吗' },
      { id: '3', value: 3, text: '人总是会变的嘛' },
      { id: '4', value: 4, text: '变就变了，关你屁事' },
      { id: '5', value: 5, text: '呵，你才发现啊' },
    ]},
    { id: 'age-16', type: 'single', text: '对于"成功"的定义，你更认同？', dimension: 'resilience', options: [
      { id: '1', value: 1, text: '出人头地，衣锦还乡' },
      { id: '2', value: 2, text: '财务自由，不用上班' },
      { id: '3', value: 3, text: '家庭幸福，身体健康' },
      { id: '4', value: 4, text: '内心平静，没有烦恼' },
      { id: '5', value: 5, text: '活着就已经赢了' },
    ]},
    { id: 'age-17', type: 'single', text: '看到网上各种"年龄焦虑"的文章，你会？', dimension: 'resilience', options: [
      { id: '1', value: 1, text: '完了完了我也焦虑了' },
      { id: '2', value: 2, text: '有点慌，我也落后了' },
      { id: '3', value: 3, text: '每个人节奏不一样' },
      { id: '4', value: 4, text: '贩卖焦虑的傻逼' },
      { id: '5', value: 5, text: '年龄只是个数字而已' },
    ]},
    { id: 'age-18', type: 'single', text: '如果能回到过去，你想回到几岁？', dimension: 'resilience', options: [
      { id: '1', value: 1, text: '18岁！青春无敌' },
      { id: '2', value: 2, text: '大学时代，无忧无虑' },
      { id: '3', value: 3, text: '刚工作的时候' },
      { id: '4', value: 4, text: '不想回去，现在就挺好' },
      { id: '5', value: 5, text: '越活越明白，现在就是最好的年纪' },
    ]},
  ],
  resultCalculator: (answers: any[]) => {
    const dimensions: Record<string, number[]> = {
      cognition: [],
      emotional: [],
      social: [],
      responsibility: [],
      resilience: [],
    }
    const dimensionMap: Record<string, string> = {
      'age-1': 'cognition', 'age-2': 'cognition', 'age-3': 'cognition',
      'age-4': 'emotional', 'age-5': 'emotional', 'age-6': 'emotional',
      'age-7': 'social', 'age-8': 'social', 'age-9': 'social',
      'age-10': 'responsibility', 'age-11': 'responsibility', 'age-12': 'responsibility',
      'age-13': 'resilience', 'age-14': 'resilience', 'age-15': 'resilience',
      'age-16': 'resilience', 'age-17': 'resilience', 'age-18': 'resilience',
    }

    answers.forEach((answer: any) => {
      const qid = answer.questionId
      const dim = dimensionMap[qid] || 'resilience'
      const v = typeof answer.value === 'number' ? answer.value : parseInt(String(answer.value || 3))
      dimensions[dim].push(v)
    })

    const scores: Record<string, number> = {}
    Object.keys(dimensions).forEach(key => {
      const arr = dimensions[key]
      const avg = arr.reduce((a, b) => a + b, 0) / Math.max(1, arr.length)
      scores[key] = Math.round((6 - avg) * 20)
    })

    const totalScore = (scores.cognition + scores.emotional + scores.social +
      scores.resilience * 0.5 + scores.responsibility * 0.5) / 4

    const LEVELS = [
      { min: 90, type: '永恒童心', emoji: '👶', age: 7 },
      { min: 75, type: '热血少年', emoji: '🔥', age: 18 },
      { min: 60, type: '新锐青年', emoji: '⚡', age: 25 },
      { min: 45, type: '成熟壮年', emoji: '🧠', age: 35 },
      { min: 30, type: '智慧长者', emoji: '🎣', age: 50 },
      { min: 0, type: '千年老妖', emoji: '🏛️', age: 99 },
    ]

    const level = LEVELS.find(l => totalScore >= l.min) || LEVELS[5]
    const mentalAge = level.age + Math.floor(Math.random() * 5)

    return {
      mentalAge,
      type: level.type,
      emoji: level.emoji,
      dimensionScores: scores,
      dimensions: [
        { name: '认知开放度', score: scores.cognition, color: '#8B5CF6' },
        { name: '情绪稳定性', score: scores.emotional, color: '#EC4899' },
        { name: '社交能量', score: scores.social, color: '#F97316' },
        { name: '责任担当', score: scores.responsibility, color: '#0EA5E9' },
        { name: '韧性恢复', score: scores.resilience, color: '#10B981' },
      ],
      overall: `${mentalAge}岁 · ${level.type}`,
    }
  },
}

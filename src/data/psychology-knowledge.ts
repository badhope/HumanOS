export interface PsychologyCard {
  id: string
  type: 'effect' | 'fact' | 'tip' | 'quote'
  title: string
  content: string
  source?: string
  icon: string
}

export const PSYCHOLOGY_KNOWLEDGE: PsychologyCard[] = [
  {
    id: '1',
    type: 'effect',
    title: '曝光效应',
    content: '我们会偏好自己熟悉的事物。只要经常出现，就能增加喜欢程度。这就是为什么日久生情比一见钟情更靠谱。',
    source: '扎荣茨 1968',
    icon: '🔆',
  },
  {
    id: '2',
    type: 'effect',
    title: '邓宁-克鲁格效应',
    content: '能力越差的人，越容易高估自己；能力越强的人，反而越容易低估自己。无知要比博学更容易产生自信。',
    source: '康奈尔大学',
    icon: '📊',
  },
  {
    id: '3',
    type: 'effect',
    title: '蔡格尼克效应',
    content: '未完成的事情，会比已完成的事情在你脑子里停留更久。这就是为什么没追完的剧总让人念念不忘。',
    source: '格式塔心理学',
    icon: '🔄',
  },
  {
    id: '4',
    type: 'effect',
    title: '霍桑效应',
    content: '当人们意识到自己正在被观察时，会刻意改变自己的行为表现。所以你被盯着的时候效率更高是真的。',
    source: '哈佛大学',
    icon: '👀',
  },
  {
    id: '5',
    type: 'effect',
    title: '破窗效应',
    content: '环境中的不良现象如果被放任存在，会诱使人们仿效，甚至变本加厉。所以房间乱了要赶紧收拾！',
    source: '犯罪心理学',
    icon: '🪟',
  },
  {
    id: '6',
    type: 'effect',
    title: '锚定效应',
    content: '人们做判断时，易受第一印象支配。砍价时先报一个离谱的低价，你就赢了一半。',
    source: '卡尼曼',
    icon: '⚓',
  },
  {
    id: '7',
    type: 'effect',
    title: '旁观者效应',
    content: '在场的旁观者越多，每个人出手相助的可能性就越低。求助时盯着一个人比喊大家更有用。',
    source: '社会心理学',
    icon: '👥',
  },
  {
    id: '8',
    type: 'effect',
    title: '皮格马利翁效应',
    content: '你期望什么，就会得到什么。人们会成为你相信他们能成为的样子。所以请多多赞美别人吧！',
    source: '罗森塔尔实验',
    icon: '✨',
  },
  {
    id: '9',
    type: 'fact',
    title: '大脑爱脑补',
    content: '你的大脑会自动把不完整的圆圈补成完整的。完形心理让我们天生讨厌残缺，追求圆满。',
    icon: '🧠',
  },
  {
    id: '10',
    type: 'fact',
    title: '音乐镇痛',
    content: '听喜欢的音乐可以显著减轻疼痛感。下次受伤时，可以试试戴上耳机。',
    icon: '🎵',
  },
  {
    id: '11',
    type: 'fact',
    title: '记忆可以修改',
    content: '每次回忆都是对记忆的一次重写。所以你记得的往事，可能已经不是它原本的样子了。',
    icon: '📝',
  },
  {
    id: '12',
    type: 'fact',
    title: '多任务是幻觉',
    content: '你的大脑并不能真正同时处理多个任务，它只是在快速切换而已。切换的成本比你想象的高得多。',
    icon: '🃏',
  },
  {
    id: '13',
    type: 'fact',
    title: '睡眠整理记忆',
    content: '睡觉的时候，大脑正在 replay 你今天发生的事情，把临时记忆整理成长期记忆。所以考前要睡觉！',
    icon: '😴',
  },
  {
    id: '14',
    type: 'fact',
    title: '色彩影响心理',
    content: '蓝色让人平静，红色让人警觉，绿色让人放松，黄色让人开心。环境的颜色一直在悄悄影响你。',
    icon: '🎨',
  },
  {
    id: '15',
    type: 'tip',
    title: '5秒法则',
    content: '想做什么就倒数 5-4-3-2-1 立刻行动！在大脑找到拖延的借口之前，就把事情做了。',
    icon: '⏱️',
  },
  {
    id: '16',
    type: 'tip',
    title: '两分钟原则',
    content: '如果一件事情两分钟内能做完，那就立刻去做，不要等。拖延的启动成本远大于执行成本。',
    icon: '⚡',
  },
  {
    id: '17',
    type: 'tip',
    title: '正念呼吸',
    content: '焦虑时，把所有注意力集中在呼吸上。大脑没办法同时关注两件事，这是最快的着陆技术。',
    icon: '🧘',
  },
  {
    id: '18',
    type: 'tip',
    title: '名字效应',
    content: '记住并叫出别人的名字，是获得好感最快的方式。每个人都觉得自己的名字最好听。',
    icon: '💬',
  },
  {
    id: '19',
    type: 'tip',
    title: '肢体先行',
    content: '情绪会改变肢体，但反过来也成立！强迫自己站直挺胸，自信心真的会提升。',
    icon: '💪',
  },
  {
    id: '20',
    type: 'tip',
    title: '沉默效应',
    content: '别人说话时，你保持沉默并看着他的眼睛，他会把更多真相说出来。沉默比追问更有压迫感。',
    icon: '🤫',
  },
  {
    id: '21',
    type: 'quote',
    title: '卡尔·荣格',
    content: '你的潜意识指引着你的人生，而你称其为命运。当潜意识被呈现，命运就被改写了。',
    icon: '💎',
  },
  {
    id: '22',
    type: 'quote',
    title: '阿德勒',
    content: '幸运的人一生都被童年治愈，不幸的人一生都在治愈童年。',
    icon: '💎',
  },
  {
    id: '23',
    type: 'quote',
    title: '弗洛姆',
    content: '不成熟的爱是因为我需要你，所以我爱你。成熟的爱是因为我爱你，所以我需要你。',
    icon: '💎',
  },
  {
    id: '24',
    type: 'quote',
    title: '王阳明',
    content: '破山中贼易，破心中贼难。',
    icon: '💎',
  },
  {
    id: '25',
    type: 'quote',
    title: '马斯洛',
    content: '为了避免对人性失望，我们必须首先放弃对人性的幻想。',
    icon: '💎',
  },
]

export function getDailyPsychology(count: number = 3) {
  const today = new Date().toISOString().split('T')[0]
  const seed = today.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  
  const shuffled = [...PSYCHOLOGY_KNOWLEDGE].sort((a, b) => {
    const hashA = (parseInt(a.id) * 31 + seed) % PSYCHOLOGY_KNOWLEDGE.length
    const hashB = (parseInt(b.id) * 31 + seed) % PSYCHOLOGY_KNOWLEDGE.length
    return hashA - hashB
  })
  
  return shuffled.slice(0, count)
}

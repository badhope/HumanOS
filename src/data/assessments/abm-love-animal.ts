import type { Assessment } from '../../types'

const TWELVE_LOVE_ANIMALS = [
  { type: 'dog', name: '金毛修勾', emoji: '🐕', desc: '忠诚粘人，给你全部的爱' },
  { type: 'cat', name: '傲娇猫咪', emoji: '🐱', desc: '嘴硬心软，爱你在心口难开' },
  { type: 'fox', name: '狡黠狐狸', emoji: '🦊', desc: '聪明撩人，永远有惊喜' },
  { type: 'rabbit', name: '软萌兔子', emoji: '🐰', desc: '敏感细腻，需要被呵护' },
  { type: 'wolf', name: '孤狼', emoji: '🐺', desc: '外冷内热，一生只爱一人' },
  { type: 'deer', name: '林间小鹿', emoji: '🦌', desc: '温柔治愈，自带氛围感' },
  { type: 'lion', name: '霸道狮子', emoji: '🦁', desc: '占有欲强，护妻狂魔' },
  { type: 'owl', name: '智慧猫头鹰', emoji: '🦉', desc: '冷静理性，恋爱脑绝缘体' },
  { type: 'penguin', name: '呆萌企鹅', emoji: '🐧', desc: '慢热专一认定就是一辈子' },
  { type: 'bear', name: '治愈棕熊', emoji: '🐻', desc: '踏实可靠，给你满满的安全感' },
  { type: 'dolphin', name: '浪漫海豚', emoji: '🐬', desc: '制造惊喜，仪式感天花板' },
  { type: 'swan', name: '优雅天鹅', emoji: '🦢', desc: '精神洁癖，灵魂伴侣至上' },
]

export const abmLoveAnimalAssessment: Assessment = {
  id: 'abm-love-animal',
  title: 'ABM 恋爱动物人格',
  description: '心动的信号官方同款！16道恋爱灵魂拷问，测出你的专属爱情动物系',
  category: '社交关系',
  subcategory: '恋爱模式',
  difficulty: 'standard',
  duration: 3,
  quality: '娱乐',
  questionCount: 16,
  questions: [
    { id: 'abm-1', type: 'single', text: '约会前一天晚上，你会？', dimension: 'dependency', options: [
      { id: '1', value: 1, text: '兴奋到睡不着，脑补各种场景' },
      { id: '2', value: 2, text: '精心搭配衣服，搜索约会攻略' },
      { id: '3', value: 3, text: '正常睡觉，随缘就好' },
      { id: '4', value: 4, text: '突然有点后悔，不想去了' },
      { id: '5', value: 5, text: '临睡前才想起，啊明天要约会？' },
    ]},
    { id: 'abm-2', type: 'single', text: '喜欢的人很久不回消息，你会？', dimension: 'dependency', options: [
      { id: '1', value: 1, text: '发满一屏表情包轰炸' },
      { id: '2', value: 2, text: '表面淡定，内心百爪挠心' },
      { id: '3', value: 3, text: '他不找我我也不找他' },
      { id: '4', value: 4, text: '算了，下一个更乖' },
      { id: '5', value: 5, text: '啊？我发过消息吗？' },
    ]},
    { id: 'abm-3', type: 'single', text: '恋爱中你最在意什么？', dimension: 'dependency', options: [
      { id: '1', value: 1, text: '无条件的偏爱和陪伴' },
      { id: '2', value: 2, text: '给彼此足够的空间' },
      { id: '3', value: 3, text: '灵魂共鸣，懂比爱重要' },
      { id: '4', value: 4, text: '开心就好，不纠结未来' },
      { id: '5', value: 5, text: '还是搞钱比较重要' },
    ]},
    { id: 'abm-4', type: 'single', text: '对方说要给你惊喜，你会？', dimension: 'initiative', options: [
      { id: '1', value: 1, text: '疯狂期待，每秒都在问好了吗' },
      { id: '2', value: 2, text: '假装淡定，内心狂喜' },
      { id: '3', value: 3, text: '反向侦查，提前剧透' },
      { id: '4', value: 4, text: '无所谓，平常心' },
      { id: '5', value: 5, text: '直接说别搞这些虚的' },
    ]},
    { id: 'abm-5', type: 'single', text: '冷战了，你会？', dimension: 'initiative', options: [
      { id: '1', value: 1, text: '立刻找他说清楚' },
      { id: '2', value: 2, text: '暗示一下，等他来找我' },
      { id: '3', value: 3, text: '谁错谁道歉，绝不妥协' },
      { id: '4', value: 4, text: '谁先说话谁是狗' },
      { id: '5', value: 5, text: '正好，趁机分手' },
    ]},
    { id: 'abm-6', type: 'single', text: '第一次约会，谁买单？', dimension: 'initiative', options: [
      { id: '1', value: 1, text: '谁约的谁买单' },
      { id: '2', value: 2, text: '我买我买，必须我来' },
      { id: '3', value: 3, text: 'AA最公平' },
      { id: '4', value: 4, text: '这次他买，下次我请回来' },
      { id: '5', value: 5, text: '肯定他买单啊，不然我跟他出来干嘛' },
    ]},
    { id: 'abm-7', type: 'single', text: '公开恋情，你会？', dimension: 'passion', options: [
      { id: '1', value: 1, text: '立刻发朋友圈，全世界宣布' },
      { id: '2', value: 2, text: '告诉最好的朋友们' },
      { id: '3', value: 3, text: '慢慢来，稳定了再说' },
      { id: '4', value: 4, text: '恋爱是两个人的事，没必要公开' },
      { id: '5', value: 5, text: '地下恋情，刺激' },
    ]},
    { id: 'abm-8', type: 'single', text: '情人节，你想要什么礼物？', dimension: 'passion', options: [
      { id: '1', value: 1, text: '999朵玫瑰 + 浪漫晚餐' },
      { id: '2', value: 2, text: '他用心准备的小惊喜' },
      { id: '3', value: 3, text: '直接转账，实在' },
      { id: '4', value: 4, text: '陪我一整天就好' },
      { id: '5', value: 5, text: '别送了，怪麻烦的' },
    ]},
    { id: 'abm-9', type: 'single', text: '对方犯了错，你会？', dimension: 'passion', options: [
      { id: '1', value: 1, text: '当场爆发，吵一架再说' },
      { id: '2', value: 2, text: '生闷气，等他来哄' },
      { id: '3', value: 3, text: '冷静下来好好沟通' },
      { id: '4', value: 4, text: '记小本本上，秋后算账' },
      { id: '5', value: 5, text: '无所谓，反正也没那么爱' },
    ]},
    { id: 'abm-10', type: 'single', text: '朋友约你，但是你跟对象约好了。你会？', dimension: 'emotional', options: [
      { id: '1', value: 1, text: '重色轻友，当然陪对象' },
      { id: '2', value: 2, text: '把对象也带上一起玩' },
      { id: '3', value: 3, text: '跟朋友改时间' },
      { id: '4', value: 4, text: '抱歉宝贝，朋友更重要' },
      { id: '5', value: 5, text: '成年人当然是全都要，两边跑' },
    ]},
    { id: 'abm-11', type: 'single', text: '看到对象跟异性正常聊天，你会？', dimension: 'emotional', options: [
      { id: '1', value: 1, text: '当场吃醋，立刻质问' },
      { id: '2', value: 2, text: '心里不爽，但表面不说' },
      { id: '3', value: 3, text: '正常社交，可以理解' },
      { id: '4', value: 4, text: '聊就聊呗，正好我也有人聊' },
      { id: '5', value: 5, text: '要不要我帮你追她？' },
    ]},
    { id: 'abm-12', type: 'single', text: '恋爱纪念日，你会记得吗？', dimension: 'emotional', options: [
      { id: '1', value: 1, text: '连第一次牵手的日子都记得清清楚楚' },
      { id: '2', value: 2, text: '提前很久就开始准备了' },
      { id: '3', value: 3, text: '哦？今天是纪念日？' },
      { id: '4', value: 4, text: '过那玩意儿干嘛' },
      { id: '5', value: 5, text: '我们在一起多久来着？' },
    ]},
    { id: 'abm-13', type: 'single', text: '对于未来，你会？', dimension: 'idealism', options: [
      { id: '1', value: 1, text: '连孩子叫什么都想好了' },
      { id: '2', value: 2, text: '认真规划我们的未来' },
      { id: '3', value: 3, text: '走一步看一步吧' },
      { id: '4', value: 4, text: '从来没想过那么远' },
      { id: '5', value: 5, text: '谁跟你有未来？' },
    ]},
    { id: 'abm-14', type: 'single', text: '你相信永远的爱情吗？', dimension: 'idealism', options: [
      { id: '1', value: 1, text: '相信，并且正在寻找' },
      { id: '2', value: 2, text: '相信，但不一定会发生在我身上' },
      { id: '3', value: 3, text: '不知道，走一步看一步' },
      { id: '4', value: 4, text: '不存在的，都是骗人的' },
      { id: '5', value: 5, text: '永远？这词听着就好笑' },
    ]},
    { id: 'abm-15', type: 'single', text: '对方提出同居，你会？', dimension: 'idealism', options: [
      { id: '1', value: 1, text: '太好了！终于可以天天在一起了' },
      { id: '2', value: 2, text: '可以试试，但要约法三章' },
      { id: '3', value: 3, text: '太快了，再等等吧' },
      { id: '4', value: 4, text: '绝对不行，保留神秘' },
      { id: '5', value: 5, text: '同居？那我还怎么约别人' },
    ]},
    { id: 'abm-16', type: 'single', text: '如果分手了，你会？', dimension: 'idealism', options: [
      { id: '1', value: 1, text: '哭三个月，再也不相信爱情了' },
      { id: '2', value: 2, text: '难过一阵子，然后重新开始' },
      { id: '3', value: 3, text: '体面分手，好聚好散' },
      { id: '4', value: 4, text: '下一个更乖，立刻找新的' },
      { id: '5', value: 5, text: '太好了！终于解放了！' },
    ]},
  ],
  resultCalculator: (answers: any[]) => {
    const dimensionScores: Record<string, number[]> = {
      dependency: [],
      initiative: [],
      passion: [],
      emotional: [],
      idealism: [],
    }
    const dimensionMap: Record<string, string> = {
      'abm-1': 'dependency', 'abm-2': 'dependency', 'abm-3': 'dependency',
      'abm-4': 'initiative', 'abm-5': 'initiative', 'abm-6': 'initiative',
      'abm-7': 'passion', 'abm-8': 'passion', 'abm-9': 'passion',
      'abm-10': 'emotional', 'abm-11': 'emotional', 'abm-12': 'emotional',
      'abm-13': 'idealism', 'abm-14': 'idealism', 'abm-15': 'idealism', 'abm-16': 'idealism',
    }

    answers.forEach((answer: any) => {
      const qid = answer.questionId
      const dim = dimensionMap[qid] || 'dependency'
      const v = typeof answer.value === 'number' ? answer.value : parseInt(String(answer.value || 3))
      dimensionScores[dim].push(v)
    })

    const scores: Record<string, number> = {}
    Object.keys(dimensionScores).forEach(key => {
      const arr = dimensionScores[key]
      const avg = arr.reduce((a, b) => a + b, 0) / Math.max(1, arr.length)
      scores[key] = Math.round(avg * 20)
    })

    const signature = scores.dependency * 10000 + scores.initiative * 1000 + 
      scores.passion * 100 + scores.emotional * 10 + scores.idealism
    
    const matchedAnimal = TWELVE_LOVE_ANIMALS[signature % 12]

    return {
      type: matchedAnimal.type,
      name: matchedAnimal.name,
      emoji: matchedAnimal.emoji,
      desc: matchedAnimal.desc,
      dimensionScores: scores,
      dimensions: [
        { name: '依赖度', score: scores.dependency, color: '#F59E0B' },
        { name: '主动性', score: scores.initiative, color: '#8B5CF6' },
        { name: '热情值', score: scores.passion, color: '#EC4899' },
        { name: '感性度', score: scores.emotional, color: '#F97316' },
        { name: '理想主义', score: scores.idealism, color: '#0EA5E9' },
      ],
      overall: matchedAnimal.name,
      allAnimals: TWELVE_LOVE_ANIMALS,
    }
  },
}

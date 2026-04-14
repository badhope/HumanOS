/**
 * ==============================================
 * 🧠 人生意义感深度测评 - 题目定义文件
 * ==============================================
 * 【测评设计】
 * - 总题数：25题
 * - 维度：5维度 × 5题/维度
 * - 题型：李克特5点量表
 * 
 * 【五大维度】【⚠️  与计算器严格对应！改了这里要改计算器！】
 * - selfRealization: 自我实现（马斯洛顶层需求）
 * - relationshipQuality: 人际关系质量（亲密关系深度）
 * - contribution: 社会奉献精神（利他精神）
 * - personalGrowth: 个人成长（终身学习）
 * - transcendence: 超越性追求（灵性与信仰）
 * 
 * 【理论基础】存在主义心理学 + 意义治疗法
 */

import type { Assessment } from '../../types'
import { calculateLifeMeaning } from '../../utils/calculators/life-meaning-calculator'

export const lifeMeaningAssessment: Assessment = {
  id: 'life-meaning',
  title: '人生意义感深度测评',
  description: '25道哲学拷问，测出你的存在主义等级。从虚无主义者到开悟大师，看看你对人生意义的理解达到了哪个层次。人为什么活着？这是个问题。',
  category: '人格心理',
  difficulty: 'standard',
  duration: 3,
  quality: '娱乐',
  resultCalculator: calculateLifeMeaning,
  questions: [
    { id: 'meaning-1', type: 'likert-5', text: '你有没有思考过"人活着到底是为了什么"这个问题？', reverseScored: false, dimension: 'selfRealization', options: [
      { id: '1', text: '从来没有，活着就活着呗', value: 1 },
      { id: '2', text: '偶尔闪过，但不影响生活', value: 2 },
      { id: '3', text: '时常思考，但没有答案', value: 3 },
      { id: '4', text: '经常深度思考，有自己的答案', value: 4 },
      { id: '5', text: '这就是我的毕生课题', value: 5 },
    ]},
    { id: 'meaning-2', type: 'likert-5', text: '你觉得自己的工作/学习有意义吗？', reverseScored: false, dimension: 'contribution', options: [
      { id: '1', text: '毫无意义，纯纯混日子', value: 1 },
      { id: '2', text: '就是混口饭吃而已', value: 2 },
      { id: '3', text: '有一点意义，创造一些价值', value: 3 },
      { id: '4', text: '挺有意义的，能帮到很多人', value: 4 },
      { id: '5', text: '这就是我的使命，改变世界', value: 5 },
    ]},
    { id: 'meaning-3', type: 'likert-5', text: '对于死亡这件事，你的看法是？', reverseScored: false, dimension: 'transcendence', options: [
      { id: '1', text: '不敢想，太可怕了', value: 1 },
      { id: '2', text: '人都会死，顺其自然吧', value: 2 },
      { id: '3', text: '正因为会死，活着才更珍贵', value: 3 },
      { id: '4', text: '死亡是另一种开始，没什么可怕的', value: 4 },
      { id: '5', text: '向死而生，每天都当最后一天活', value: 5 },
    ]},
    { id: 'meaning-4', type: 'likert-5', text: '你最好的朋友有几个？', reverseScored: false, dimension: 'relationshipQuality', options: [
      { id: '1', text: '0个，我就是一座孤岛', value: 1 },
      { id: '2', text: '1个，仅此而已', value: 2 },
      { id: '3', text: '2-3个，足够了', value: 3 },
      { id: '4', text: '4-5个，很幸运', value: 4 },
      { id: '5', text: '很多，而且都是真心的', value: 5 },
    ]},
    { id: 'meaning-5', type: 'likert-5', text: '过去一年，你觉得自己成长了多少？', reverseScored: false, dimension: 'personalGrowth', options: [
      { id: '1', text: '完全没有，原地踏步甚至倒退', value: 1 },
      { id: '2', text: '有一点，但不多', value: 2 },
      { id: '3', text: '还可以，比去年强一点', value: 3 },
      { id: '4', text: '进步很大，脱胎换骨', value: 4 },
      { id: '5', text: '每天都在进化，2.0版本持续更新', value: 5 },
    ]},
    { id: 'meaning-6', type: 'likert-5', text: '看到社会上的不公平现象，你会？', reverseScored: false, dimension: 'contribution', options: [
      { id: '1', text: '关我屁事，我又改变不了', value: 1 },
      { id: '2', text: '网上骂两句发泄一下', value: 2 },
      { id: '3', text: '同情，但也无能为力', value: 3 },
      { id: '4', text: '在力所能及的范围内伸出援手', value: 4 },
      { id: '5', text: '用行动去推动改变，哪怕很微小', value: 5 },
    ]},
    { id: 'meaning-7', type: 'likert-5', text: '你相信"命中注定"吗？', reverseScored: false, dimension: 'selfRealization', options: [
      { id: '1', text: '一切都是命中注定，努力没用', value: 1 },
      { id: '2', text: '大部分都是命，认了', value: 2 },
      { id: '3', text: '三分天注定，七分靠打拼', value: 3 },
      { id: '4', text: '我命由我不由天', value: 4 },
      { id: '5', text: '我就是自己的神，我说了算', value: 5 },
    ]},
    { id: 'meaning-8', type: 'likert-5', text: '对于"成功"的定义，你更认同？', reverseScored: false, dimension: 'transcendence', options: [
      { id: '1', text: '赚大钱，当大官，开豪车住豪宅', value: 1 },
      { id: '2', text: '比身边的人过得好就行', value: 2 },
      { id: '3', text: '家庭幸福，身体健康', value: 3 },
      { id: '4', text: '实现自己的价值，活出自己', value: 4 },
      { id: '5', text: '改变世界，留下点什么', value: 5 },
    ]},
    { id: 'meaning-9', type: 'likert-5', text: '和家人/爱人在一起时，你感到？', reverseScored: false, dimension: 'relationshipQuality', options: [
      { id: '1', text: '烦躁，想逃离', value: 1 },
      { id: '2', text: '没感觉，就那样', value: 2 },
      { id: '3', text: '还行，挺舒服的', value: 3 },
      { id: '4', text: '温暖，这就是港湾', value: 4 },
      { id: '5', text: '这就是我活着的全部意义', value: 5 },
    ]},
    { id: 'meaning-10', type: 'likert-5', text: '你有坚持了超过3年以上的爱好吗？', reverseScored: false, dimension: 'personalGrowth', options: [
      { id: '1', text: '没有，什么都是三分钟热度', value: 1 },
      { id: '2', text: '有过，但后来放弃了', value: 2 },
      { id: '3', text: '有，断断续续在坚持', value: 3 },
      { id: '4', text: '有一个，一直在坚持', value: 4 },
      { id: '5', text: '好几个，这些爱好就是我的生命', value: 5 },
    ]},
    { id: 'meaning-11', type: 'likert-5', text: '如果明天就是世界末日，你会后悔吗？', reverseScored: false, dimension: 'selfRealization', options: [
      { id: '1', text: '太后悔了，白活一辈子', value: 1 },
      { id: '2', text: '很多遗憾，要是能重来就好了', value: 2 },
      { id: '3', text: '有遗憾，但也没办法', value: 3 },
      { id: '4', text: '没什么遗憾，该体验的都体验了', value: 4 },
      { id: '5', text: '来吧！老子活够本了！', value: 5 },
    ]},
    { id: "meaning-12", type: 'likert-5', text: '你做过慈善/志愿者/帮助陌生人吗？', reverseScored: false, dimension: 'contribution', options: [
      { id: '1', text: '从来没有，我自己都顾不过来', value: 1 },
      { id: '2', text: '捐过几块钱，仅此而已', value: 2 },
      { id: '3', text: '偶尔会做一些力所能及的事', value: 3 },
      { id: '4', text: '经常参与，尽自己一份力', value: 4 },
      { id: '5', text: '这是我生活的重要部分', value: 5 },
    ]},
    { id: 'meaning-13', type: 'likert-5', text: '你对现在的生活满意吗？', reverseScored: false, dimension: 'selfRealization', options: [
      { id: '1', text: '非常不满意，简直是地狱', value: 1 },
      { id: '2', text: '不太满意，差远了', value: 2 },
      { id: '3', text: '一般般，马马虎虎', value: 3 },
      { id: '4', text: '挺满意的，比上不足比下有余', value: 4 },
      { id: '5', text: '完美！这就是我想要的人生', value: 5 },
    ]},
    { id: 'meaning-14', type: 'likert-5', text: '你觉得人类最终会走向何方？', reverseScored: false, dimension: 'transcendence', options: [
      { id: '1', text: '毁灭吧，赶紧的', value: 1 },
      { id: '2', text: '越来越糟，没有希望', value: 2 },
      { id: '3', text: '就那样吧，不好不坏', value: 3 },
      { id: '4', text: '曲折中前进，未来会更好', value: 4 },
      { id: '5', text: '星辰大海，我们的征途是宇宙', value: 5 },
    ]},
    { id: 'meaning-15', type: 'likert-5', text: '如果让你给自己写墓志铭，你会写什么？', reverseScored: false, dimension: 'transcendence', options: [
      { id: '1', text: '这个人白来了一趟', value: 1 },
      { id: '2', text: '一个普通人', value: 2 },
      { id: '3', text: '努力生活过的人', value: 3 },
      { id: '4', text: '爱过，活过，创造过', value: 4 },
      { id: '5', text: '我改变了世界一点点', value: 5 },
    ]},
    { id: 'meaning-16', type: 'likert-5', text: '你觉得自己是个有用的人吗？', reverseScored: false, dimension: 'selfRealization', options: [
      { id: '1', text: '完全没用，活着就是浪费空气', value: 1 },
      { id: '2', text: '没什么用，就是个凑数的', value: 2 },
      { id: '3', text: '还行吧，普通人一个', value: 3 },
      { id: '4', text: '挺有用的，能帮到不少人', value: 4 },
      { id: '5', text: '非常有用，我是很多人的依靠', value: 5 },
    ]},
    { id: 'meaning-17', type: 'likert-5', text: '你会主动关心和帮助身边的人吗？', reverseScored: false, dimension: 'contribution', options: [
      { id: '1', text: '不会，管好我自己就行了', value: 1 },
      { id: '2', text: '别人开口了才会帮', value: 2 },
      { id: '3', text: '看到了会顺手帮一下', value: 3 },
      { id: '4', text: '经常主动关心帮助别人', value: 4 },
      { id: '5', text: '助人为快乐之本，这就是我的生活方式', value: 5 },
    ]},
    { id: 'meaning-18', type: 'likert-5', text: '你相信有灵魂/来世吗？', reverseScored: false, dimension: 'transcendence', options: [
      { id: '1', text: '绝对没有，人死如灯灭', value: 1 },
      { id: '2', text: '应该没有，只是美好的想象', value: 2 },
      { id: '3', text: '不知道，宁可信其有', value: 3 },
      { id: '4', text: '相信有，这样生命才完整', value: 4 },
      { id: '5', text: '坚信不疑，死亡不是终点', value: 5 },
    ]},
    { id: 'meaning-19', type: 'likert-5', text: '你有能说心里话的人吗？', reverseScored: false, dimension: 'relationshipQuality', options: [
      { id: '1', text: '完全没有，我谁都不信', value: 1 },
      { id: '2', text: '几乎没有，什么都自己扛', value: 2 },
      { id: '3', text: '有一两个吧，偶尔会说说', value: 3 },
      { id: '4', text: '有几个，什么都可以说', value: 4 },
      { id: '5', text: '有很多，我被爱包围着', value: 5 },
    ]},
    { id: 'meaning-20', type: 'likert-5', text: '你有明确的人生目标吗？', reverseScored: false, dimension: 'personalGrowth', options: [
      { id: '1', text: '完全没有，走一步看一步', value: 1 },
      { id: '2', text: '有，但很模糊', value: 2 },
      { id: '3', text: '有大概的方向', value: 3 },
      { id: '4', text: '有清晰的短期目标', value: 4 },
      { id: '5', text: '有非常明确的人生蓝图，按计划执行中', value: 5 },
    ]},
    { id: 'meaning-21', type: 'likert-5', text: '你觉得自己对这个世界有贡献吗？', reverseScored: false, dimension: 'contribution', options: [
      { id: '1', text: '没有，我就是个消费者', value: 1 },
      { id: '2', text: '几乎没有，不给社会添乱就不错了', value: 2 },
      { id: '3', text: '有一点，做好本职工作就是贡献', value: 3 },
      { id: '4', text: '有不小的贡献，我的工作创造了很多价值', value: 4 },
      { id: '5', text: '有很大贡献，我正在改变世界', value: 5 },
    ]},
    { id: 'meaning-22', type: 'likert-5', text: '你觉得孤独吗？', reverseScored: false, dimension: 'relationshipQuality', options: [
      { id: '1', text: '深入骨髓的孤独，无人理解', value: 1 },
      { id: '2', text: '大部分时间都很孤独', value: 2 },
      { id: '3', text: '偶尔会感到孤独', value: 3 },
      { id: '4', text: '很少孤独，有人陪伴', value: 4 },
      { id: '5', text: '从不孤独，内心充盈而温暖', value: 5 },
    ]},
    { id: 'meaning-23', type: 'likert-5', text: '你每天都在学习新东西吗？', reverseScored: false, dimension: 'personalGrowth', options: [
      { id: '1', text: '从来不学，吃老本够了', value: 1 },
      { id: '2', text: '工作需要才被迫学', value: 2 },
      { id: '3', text: '偶尔会学点感兴趣的', value: 3 },
      { id: '4', text: '经常学习，保持成长', value: 4 },
      { id: '5', text: '每天都在进化，学习就是我的生活方式', value: 5 },
    ]},
    { id: 'meaning-24', type: 'likert-5', text: '你觉得自己的存在被需要吗？', reverseScored: false, dimension: 'relationshipQuality', options: [
      { id: '1', text: '完全不被需要，有没有我都一样', value: 1 },
      { id: '2', text: '很少被需要，可有可无', value: 2 },
      { id: '3', text: '有时候被需要', value: 3 },
      { id: '4', text: '挺多人需要我的', value: 4 },
      { id: '5', text: '很多人离不开我，我非常重要', value: 5 },
    ]},
    { id: 'meaning-25', type: 'likert-5', text: '十年后的你，会感谢现在的自己吗？', reverseScored: false, dimension: 'personalGrowth', options: [
      { id: '1', text: '绝对会骂死现在这个废物', value: 1 },
      { id: '2', text: '估计会很后悔', value: 2 },
      { id: '3', text: '不好说，看运气吧', value: 3 },
      { id: '4', text: '应该会感谢的', value: 4 },
      { id: '5', text: '一定会的！我正在创造未来', value: 5 },
    ]},
    { id: 'meaning-26', type: 'likert-5', text: '你相信命中注定吗？', reverseScored: false, dimension: 'transcendence', options: [
      { id: '1', text: '一切都是注定的，努力没用', value: 1 },
      { id: '2', text: '大部分都是命吧', value: 2 },
      { id: '3', text: '尽人事，听天命', value: 3 },
      { id: '4', text: '我命由我不由天', value: 4 },
      { id: '5', text: '我就是自己的神！', value: 5 },
    ]},
    { id: 'meaning-27', type: 'likert-5', text: '你做过的最有意义的事是什么？', reverseScored: false, dimension: 'contribution', options: [
      { id: '1', text: '还没做过什么有意义的事', value: 1 },
      { id: '2', text: '过好自己的小日子', value: 2 },
      { id: '3', text: '照顾好家人朋友', value: 3 },
      { id: '4', text: '帮助过一些需要帮助的人', value: 4 },
      { id: '5', text: '改变过世界，哪怕一点点', value: 5 },
    ]},
    { id: 'meaning-28', type: 'likert-5', text: '老了回顾一生，你最害怕什么？', reverseScored: false, dimension: 'existentialPurpose', options: [
      { id: '1', text: '没赚到钱，白活了', value: 1 },
      { id: '2', text: '没出过名，没人知道', value: 2 },
      { id: '3', text: '没玩够，太多遗憾', value: 3 },
      { id: '4', text: '没勇敢追求自己想要的', value: 4 },
      { id: '5', text: '从来没为自己活过', value: 5 },
    ]},
    { id: 'meaning-29', type: 'likert-5', text: '你觉得人生的终极目标应该是？', reverseScored: false, dimension: 'contribution', options: [
      { id: '1', text: '赚钱，赚更多的钱', value: 1 },
      { id: '2', text: '权力和地位', value: 2 },
      { id: '3', text: '家庭幸福，子孙满堂', value: 3 },
      { id: '4', text: '实现自我价值', value: 4 },
      { id: '5', text: '为人类文明留下点什么', value: 5 },
    ]},
    { id: 'meaning-30', type: 'likert-5', text: '朋友遇到困难时，你一般会？', reverseScored: false, dimension: 'relationshipQuality', options: [
      { id: '1', text: '假装没看见', value: 1 },
      { id: '2', text: '口头安慰几句', value: 2 },
      { id: '3', text: '能帮的就帮一把', value: 3 },
      { id: '4', text: '尽全力帮忙，出钱出力', value: 4 },
      { id: '5', text: '为了兄弟两肋插刀', value: 5 },
    ]},
    { id: 'meaning-31', type: 'likert-5', text: '对于死亡，你的看法是？', reverseScored: false, dimension: 'existentialPurpose', options: [
      { id: '1', text: '太可怕了，不敢想', value: 1 },
      { id: '2', text: '每个人都会死，没办法', value: 2 },
      { id: '3', text: '活好当下就行，不想那么多', value: 3 },
      { id: '4', text: '正因为会死，活着才有意义', value: 4 },
      { id: '5', text: '向死而生，每一天都是赚的', value: 5 },
    ]},
    { id: 'meaning-32', type: 'likert-5', text: '你做事情的驱动力是？', reverseScored: false, dimension: 'internalValidation', options: [
      { id: '1', text: '为了让别人看得起', value: 1 },
      { id: '2', text: '为了赚钱养家', value: 2 },
      { id: '3', text: '为了家人的期望', value: 3 },
      { id: '4', text: '主要是自己喜欢', value: 4 },
      { id: '5', text: '热爱！不给钱我也干', value: 5 },
    ]},
    { id: 'meaning-33', type: 'likert-5', text: '你觉得你留给世界的遗产是什么？', reverseScored: false, dimension: 'contribution', options: [
      { id: '1', text: '还遗产呢，不欠债就不错了', value: 1 },
      { id: '2', text: '给孩子留点钱', value: 2 },
      { id: '3', text: '美好的回忆就够了', value: 3 },
      { id: '4', text: '一些作品/成就', value: 4 },
      { id: '5', text: '改变了很多人的生活', value: 5 },
    ]},
    { id: 'meaning-34', type: 'likert-5', text: '你对现在的自己满意吗？', reverseScored: false, dimension: 'selfRealization', options: [
      { id: '1', text: '垃圾，废物一个', value: 1 },
      { id: '2', text: '不满意，太差了', value: 2 },
      { id: '3', text: '马马虎虎，就这样吧', value: 3 },
      { id: '4', text: '挺满意的，比上不足比下有余', value: 4 },
      { id: '5', text: '太酷了！我喜欢我自己', value: 5 },
    ]},
    { id: 'meaning-35', type: 'likert-5', text: '如果明天就是世界末日，你今天会做什么？', reverseScored: false, dimension: 'transcendence', options: [
      { id: '1', text: '赶紧把钱都花了', value: 1 },
      { id: '2', text: '跟家人在一起', value: 2 },
      { id: '3', text: '去见最想见的人', value: 3 },
      { id: '4', text: '去做一直不敢做的事', value: 4 },
      { id: '5', text: '和平常一样，没有遗憾', value: 5 },
    ]},
  ],
}

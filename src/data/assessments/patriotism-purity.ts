/**
 * ==============================================
 * 🇨🇳 爱国主义纯度测评 - 题目定义文件
 * ==============================================
 * 【测评设计】
 * - 总题数：25题
 * - 维度：5维度 × 5题/维度
 * - 题型：李克特5点量表（非常不同意→非常同意）
 * 
 * 【五大维度】【⚠️  与计算器严格对应！改了这里要改计算器！】
 * - nationalPride: 民族自豪感（看到国旗的激动程度）
 * - culturalConfidence: 文化自信心（对传统的态度）
 * - historicalIdentity: 历史认同感（民族记忆）
 * - socialResponsibility: 社会责任感（国家有需要我就上）
 * - internationalOutlook: 国际视野（大国公民心态）
 * 
 * 【评分方式】无反向题，正向累加计分
 */

import type { Assessment } from '../../types'
import { calculatePatriotism } from '../../utils/calculators/patriotism-calculator'

export const patriotismPurityAssessment: Assessment = {
  id: 'patriotism-purity',
  title: '爱国主义纯度测评',
  description: '25道灵魂拷问，测出你的爱国纯度。从恨国公知到战狼之神，看看你的红色基因有多浓！如果奇迹有颜色，那一定是中国红！',
  category: '意识形态',
  subcategory: '国家认同',
  difficulty: 'standard',
  duration: 4,
  quality: '娱乐',
  resultCalculator: calculatePatriotism,
  questions: [
    { id: 'patriot-1', type: 'likert-5', text: '看到升国旗奏国歌时，你会？', reverseScored: false, dimension: 'nationalPride', options: [
      { id: '1', text: '关我屁事，该干嘛干嘛', value: 1 },
      { id: '2', text: '象征性行个注目礼', value: 2 },
      { id: '3', text: '立正站好，心里有点小激动', value: 3 },
      { id: '4', text: '热血沸腾，眼泪在眼眶里打转', value: 4 },
      { id: '5', text: '我和我的祖国！一刻也不能分割！', value: 5 },
    ]},
    { id: 'patriot-2', type: 'likert-5', text: '国外品牌污蔑抹黑中国时，你会？', reverseScored: false, dimension: 'socialResponsibility', options: [
      { id: '1', text: '人家说的也有道理...', value: 1 },
      { id: '2', text: '理性吃瓜，我继续买', value: 2 },
      { id: '3', text: '以后不买这个牌子了', value: 3 },
      { id: '4', text: '转发扩散，呼吁大家一起抵制', value: 4 },
      { id: '5', text: '脱下鞋子就砸过去！', value: 5 },
    ]},
    { id: 'patriot-3', type: 'likert-5', text: '中国运动员在奥运会拿金牌时，你会？', reverseScored: false, dimension: 'nationalPride', options: [
      { id: '1', text: '谁拿金牌关我什么事', value: 1 },
      { id: '2', text: '哦，拿了啊，厉害', value: 2 },
      { id: '3', text: '哇！太棒了，为他们开心', value: 3 },
      { id: '4', text: '激动得跳起来，刷屏朋友圈', value: 4 },
      { id: '5', text: '哭了！这就是中国！中国万岁！', value: 5 },
    ]},
    { id: 'patriot-4', type: 'likert-5', text: '对于传统文化，你的看法是？', reverseScored: false, dimension: 'culturalConfidence', options: [
      { id: '1', text: '都是糟粕，外国的月亮比较圆', value: 1 },
      { id: '2', text: '过时了，没啥用', value: 2 },
      { id: '3', text: '取其精华，去其糟粕', value: 3 },
      { id: '4', text: '中华文化博大精深，值得传承', value: 4 },
      { id: '5', text: '此生无悔入华夏，来世还做中国人！', value: 5 },
    ]},
    { id: 'patriot-5', type: 'likert-5', text: '看到中国重大科技突破新闻时，你会？', reverseScored: false, dimension: 'historicalIdentity', options: [
      { id: '1', text: '肯定是造假的，有什么好吹的', value: 1 },
      { id: '2', text: '别人几十年前就有了', value: 2 },
      { id: '3', text: '哦，知道了，下一条', value: 3 },
      { id: '4', text: '厉害了我的国！转发点赞', value: 4 },
      { id: '5', text: '我们的征途是星辰大海！', value: 5 },
    ]},
    { id: 'patriot-6', type: 'likert-5', text: '对于国外的批评和质疑，你的态度是？', reverseScored: false, dimension: 'internationalOutlook', options: [
      { id: '1', text: '骂得好，中国就是有很多问题', value: 1 },
      { id: '2', text: '有则改之，无则加勉', value: 2 },
      { id: '3', text: '具体问题具体分析', value: 3 },
      { id: '4', text: '双标！中国怎么做都不对是吧？', value: 4 },
      { id: '5', text: '敢骂中国？键盘伺候！开战！', value: 5 },
    ]},
    { id: 'patriot-7', type: 'likert-5', text: '关于中国的历史，你认为？', reverseScored: false, dimension: 'historicalIdentity', options: [
      { id: '1', text: '中国历史就是一部愚昧史', value: 1 },
      { id: '2', text: '有辉煌也有黑暗，客观看待', value: 2 },
      { id: '3', text: '中华文明是伟大的文明', value: 3 },
      { id: '4', text: '5000年从未中断，这就是奇迹', value: 4 },
      { id: '5', text: '历史欠我们一个道歉，我们还世界一个奇迹', value: 5 },
    ]},
    { id: 'patriot-8', type: 'likert-5', text: '看到有人说"外国就是比中国好"，你会？', reverseScored: false, dimension: 'socialResponsibility', options: [
      { id: '1', text: '确实，我也想润', value: 1 },
      { id: '2', text: '每个人想法不同，无所谓', value: 2 },
      { id: '3', text: '各有各的好，理性看待', value: 3 },
      { id: '4', text: '你倒是说说哪方面好？', value: 4 },
      { id: '5', text: '赶紧滚！太平洋没加盖！', value: 5 },
    ]},
    { id: 'patriot-9', type: 'likert-5', text: '对于"中国制造"，你的看法是？', reverseScored: false, dimension: 'culturalConfidence', options: [
      { id: '1', text: '中国制造就是劣质的代名词', value: 1 },
      { id: '2', text: '便宜没好货，能买外国就买外国', value: 2 },
      { id: '3', text: '进步很大，但还有差距', value: 3 },
      { id: '4', text: '现在中国制造就是牛！', value: 4 },
      { id: '5', text: '中国智造，称霸全球！', value: 5 },
    ]},
    { id: 'patriot-10', type: 'likert-5', text: '发生重大灾难时，你觉得最可靠的是？', reverseScored: false, dimension: 'socialResponsibility', options: [
      { id: '1', text: '谁来都没用，自求多福', value: 1 },
      { id: '2', text: '还是得靠外国救援力量', value: 2 },
      { id: '3', text: '大家互相帮助吧', value: 3 },
      { id: '4', text: '解放军来了就有救了！', value: 4 },
      { id: '5', text: '人民子弟兵！这就是中国！', value: 5 },
    ]},
    { id: 'patriot-11', type: 'likert-5', text: '关于出国旅游/移民，你的想法是？', reverseScored: false, dimension: 'internationalOutlook', options: [
      { id: '1', text: '有钱赶紧润，国内就是垃圾场', value: 1 },
      { id: '2', text: '有机会就移民，国外确实好', value: 2 },
      { id: '3', text: '出国玩玩可以，还是家里好', value: 3 },
      { id: '4', text: '出国才发现，还是中国最好', value: 4 },
      { id: '5', text: '我生是中国人，死是中国魂！', value: 5 },
    ]},
    { id: 'patriot-12', type: 'likert-5', text: '看抗日题材的影视剧时，你会？', reverseScored: false, dimension: 'historicalIdentity', options: [
      { id: '1', text: '又是手撕鬼子神剧，真无聊', value: 1 },
      { id: '2', text: '拍得太假了，不符合历史', value: 2 },
      { id: '3', text: '铭记历史，勿忘国耻', value: 3 },
      { id: '4', text: '拳头硬了，想揍小鬼子', value: 4 },
      { id: '5', text: '大刀向鬼子们的头上砍去！', value: 5 },
    ]},
    { id: 'patriot-13', type: 'likert-5', text: '中国的政治制度，你认为？', reverseScored: false, dimension: 'culturalConfidence', options: [
      { id: '1', text: '不解释，你懂的', value: 1 },
      { id: '2', text: '很多问题，需要改革', value: 2 },
      { id: '3', text: '适合中国国情，有优势也有不足', value: 3 },
      { id: '4', text: '中国制度就是高效，就是好！', value: 4 },
      { id: '5', text: '这是人类最好的制度，灯塔！', value: 5 },
    ]},
    { id: 'patriot-14', type: 'likert-5', text: '清澈的爱，______', reverseScored: false, dimension: 'nationalPride', options: [
      { id: '1', text: '？什么东西', value: 1 },
      { id: '2', text: '听说过，没啥感觉', value: 2 },
      { id: '3', text: '只为中国', value: 3 },
      { id: '4', text: '破防了，致敬最可爱的人', value: 4 },
      { id: '5', text: '我已经哭得说不出话了', value: 5 },
    ]},
    { id: 'patriot-15', type: 'likert-5', text: '如果战争爆发，你愿意为国而战吗？', reverseScored: false, dimension: 'socialResponsibility', options: [
      { id: '1', text: '谁爱去谁去，我先润了', value: 1 },
      { id: '2', text: '应该轮不到我吧', value: 2 },
      { id: '3', text: '如果需要，我可以上', value: 3 },
      { id: '4', text: '时刻准备着！召必回！', value: 4 },
      { id: '5', text: '首战用我！用我必胜！', value: 5 },
    ]},
    { id: 'patriot-16', type: 'likert-5', text: '看到中国外交官在国际舞台上硬气发言时，你会？', reverseScored: false, dimension: 'nationalPride', options: [
      { id: '1', text: '又在打嘴炮，没意思', value: 1 },
      { id: '2', text: '说这些有什么用', value: 2 },
      { id: '3', text: '说得还行，不卑不亢', value: 3 },
      { id: '4', text: '太解气了！这就是大国风范！', value: 4 },
      { id: '5', text: '这就是中国！没有人可以欺负我们！', value: 5 },
    ]},
    { id: 'patriot-17', type: 'likert-5', text: '对于台湾问题，你的看法是？', reverseScored: false, dimension: 'historicalIdentity', options: [
      { id: '1', text: '赶紧独立吧，关我屁事', value: 1 },
      { id: '2', text: '维持现状就好', value: 2 },
      { id: '3', text: '和平统一最好', value: 3 },
      { id: '4', text: '一个中国原则不容挑战！', value: 4 },
      { id: '5', text: '解放台湾！刻不容缓！', value: 5 },
    ]},
    { id: 'patriot-18', type: 'likert-5', text: '你觉得中国在国际上的地位如何？', reverseScored: false, dimension: 'internationalOutlook', options: [
      { id: '1', text: '就是个笑话', value: 1 },
      { id: '2', text: '还很落后，没什么地位', value: 2 },
      { id: '3', text: '正在崛起的大国', value: 3 },
      { id: '4', text: '世界两极之一，举足轻重', value: 4 },
      { id: '5', text: '未来的世界领导者！', value: 5 },
    ]},
    { id: 'patriot-19', type: 'likert-5', text: '你会主动给身边人科普中国的成就吗？', reverseScored: false, dimension: 'culturalConfidence', options: [
      { id: '1', text: '有什么好吹的', value: 1 },
      { id: '2', text: '没兴趣', value: 2 },
      { id: '3', text: '聊到了就说几句', value: 3 },
      { id: '4', text: '经常会分享，挺自豪的', value: 4 },
      { id: '5', text: '我就是行走的爱国主义宣传大使！', value: 5 },
    ]},
    { id: 'patriot-20', type: 'likert-5', text: '看到新疆棉花等事件被西方抹黑时，你会？', reverseScored: false, dimension: 'internationalOutlook', options: [
      { id: '1', text: '无风不起浪，肯定有问题', value: 1 },
      { id: '2', text: '政治斗争而已，不关心', value: 2 },
      { id: '3', text: '支持新疆棉，继续买国货', value: 3 },
      { id: '4', text: '西方双标太恶心了！', value: 4 },
      { id: '5', text: '帝国主义亡我之心不死！干就完了！', value: 5 },
    ]},
    { id: 'patriot-21', type: 'likert-5', text: '国庆/建军节等节日，你会发朋友圈吗？', reverseScored: false, dimension: 'nationalPride', options: [
      { id: '1', text: '从来不发，太尴尬了', value: 1 },
      { id: '2', text: '看别人发，我不发', value: 2 },
      { id: '3', text: '偶尔会发，凑个热闹', value: 3 },
      { id: '4', text: '每年必发，发自内心的祝福', value: 4 },
      { id: '5', text: '不仅发，我还要组织大家一起祝福！', value: 5 },
    ]},
    { id: 'patriot-22', type: 'likert-5', text: '对于中国的抗疫表现，你怎么看？', reverseScored: false, dimension: 'socialResponsibility', options: [
      { id: '1', text: '一塌糊涂，满分10分我打0分', value: 1 },
      { id: '2', text: '很多问题，不如外国', value: 2 },
      { id: '3', text: '有得有失，不容易', value: 3 },
      { id: '4', text: '做得很好，中国就是负责任！', value: 4 },
      { id: '5', text: '举世无双！这就是中国制度的优越性！', value: 5 },
    ]},
    { id: 'patriot-23', type: 'likert-5', text: '你会主动了解中国历史和传统文化吗？', reverseScored: false, dimension: 'culturalConfidence', options: [
      { id: '1', text: '老掉牙的东西，没兴趣', value: 1 },
      { id: '2', text: '上学学过就够了', value: 2 },
      { id: '3', text: '看到感兴趣的会了解一下', value: 3 },
      { id: '4', text: '经常会看，很有意思', value: 4 },
      { id: '5', text: '我就是中华传统文化传承人！', value: 5 },
    ]},
    { id: 'patriot-24', type: 'likert-5', text: '看到中国航母/歼20等大国重器，你会？', reverseScored: false, dimension: 'historicalIdentity', options: [
      { id: '1', text: '劳民伤财，有什么用', value: 1 },
      { id: '2', text: '落后美国几十年', value: 2 },
      { id: '3', text: '挺厉害的，加油', value: 3 },
      { id: '4', text: '太帅了！这就是安全感！', value: 4 },
      { id: '5', text: '热泪盈眶！这盛世如你所愿！', value: 5 },
    ]},
    { id: 'patriot-25', type: 'likert-5', text: '对于"人类命运共同体"理念，你认为？', reverseScored: false, dimension: 'internationalOutlook', options: [
      { id: '1', text: '就是个口号而已', value: 1 },
      { id: '2', text: '太理想化了，不现实', value: 2 },
      { id: '3', text: '挺好的理念', value: 3 },
      { id: '4', text: '这才是中国的大国担当！', value: 4 },
      { id: '5', text: '中国为世界指明了方向！', value: 5 },
    ]},
    { id: 'patriot-26', type: 'likert-5', text: '看到中国运动员拿奥运金牌，你会？', reverseScored: false, dimension: 'nationalPride', options: [
      { id: '1', text: '跟我没关系', value: 1 },
      { id: '2', text: '哦，知道了', value: 2 },
      { id: '3', text: '挺厉害的', value: 3 },
      { id: '4', text: '激动！转发朋友圈', value: 4 },
      { id: '5', text: '热泪盈眶！中国牛逼！', value: 5 },
    ]},
    { id: 'patriot-27', type: 'likert-5', text: '国外品牌辱华，你会？', reverseScored: false, dimension: 'socialResponsibility', options: [
      { id: '1', text: '继续买，便宜就行', value: 1 },
      { id: '2', text: '没什么感觉', value: 2 },
      { id: '3', text: '以后不买了', value: 3 },
      { id: '4', text: '支持国货，转发抵制', value: 4 },
      { id: '5', text: '冲到实体店门口抗议！', value: 5 },
    ]},
    { id: 'patriot-28', type: 'likert-5', text: '清明节去烈士陵园扫墓，你认为？', reverseScored: false, dimension: 'historicalIdentity', options: [
      { id: '1', text: '形式主义，浪费时间', value: 1 },
      { id: '2', text: '学校组织就去', value: 2 },
      { id: '3', text: '应该去缅怀先烈', value: 3 },
      { id: '4', text: '主动去献花鞠躬', value: 4 },
      { id: '5', text: '这是中国人最起码的敬畏！', value: 5 },
    ]},
    { id: 'patriot-29', type: 'likert-5', text: '有人在网上抹黑中国，你会？', reverseScored: false, dimension: 'socialResponsibility', options: [
      { id: '1', text: '他说得好像也对', value: 1 },
      { id: '2', text: '看看就好，不说话', value: 2 },
      { id: '3', text: '点个举报', value: 3 },
      { id: '4', text: '留言反驳，澄清事实', value: 4 },
      { id: '5', text: '对线到天亮！爱国没有理智！', value: 5 },
    ]},
    { id: 'patriot-30', type: 'likert-5', text: '对于中国的抗疫成就，你认为？', reverseScored: false, dimension: 'culturalConfidence', options: [
      { id: '1', text: '都是吹出来的', value: 1 },
      { id: '2', text: '一般般吧', value: 2 },
      { id: '3', text: '确实做得不错', value: 3 },
      { id: '4', text: '这就是制度优势！', value: 4 },
      { id: '5', text: '生在中国是这辈子最幸运的事！', value: 5 },
    ]},
    { id: 'patriot-31', type: 'likert-5', text: '唱国歌升国旗时，你的心情是？', reverseScored: false, dimension: 'nationalPride', options: [
      { id: '1', text: '没感觉，例行公事', value: 1 },
      { id: '2', text: '跟着唱就行', value: 2 },
      { id: '3', text: '还是挺庄严的', value: 3 },
      { id: '4', text: '肃然起敬，行注目礼', value: 4 },
      { id: '5', text: '每次都热泪盈眶！', value: 5 },
    ]},
    { id: 'patriot-32', type: 'likert-5', text: '对于台湾问题，你的立场是？', reverseScored: false, dimension: 'nationalPride', options: [
      { id: '1', text: '维持现状就好', value: 1 },
      { id: '2', text: '顺其自然吧', value: 2 },
      { id: '3', text: '和平统一最好', value: 3 },
      { id: '4', text: '必须统一，没有商量', value: 4 },
      { id: '5', text: '解放军今天就登陆！', value: 5 },
    ]},
    { id: 'patriot-33', type: 'likert-5', text: '看到有人穿汉服，你认为？', reverseScored: false, dimension: 'culturalConfidence', options: [
      { id: '1', text: 'Cosplay而已，很奇怪', value: 1 },
      { id: '2', text: '拍照挺好看的', value: 2 },
      { id: '3', text: '挺好的文化复兴', value: 3 },
      { id: '4', text: '我也想买一套穿', value: 4 },
      { id: '5', text: '这才是中国人该穿的衣服！', value: 5 },
    ]},
    { id: 'patriot-34', type: 'likert-5', text: '对于"中国制造"，你的看法是？', reverseScored: false, dimension: 'culturalConfidence', options: [
      { id: '1', text: '质量差，不如进口', value: 1 },
      { id: '2', text: '便宜就行', value: 2 },
      { id: '3', text: '进步很大了', value: 3 },
      { id: '4', text: '很多领域已经世界领先', value: 4 },
      { id: '5', text: '中国制造就是世界第一！', value: 5 },
    ]},
    { id: 'patriot-35', type: 'likert-5', text: '如果明天开战，国家需要你，你会？', reverseScored: false, dimension: 'nationalPride', options: [
      { id: '1', text: '赶紧润出国', value: 1 },
      { id: '2', text: '找关系躲起来', value: 2 },
      { id: '3', text: '捐款支援前线', value: 3 },
      { id: '4', text: '若有战，召必回！', value: 4 },
      { id: '5', text: '第一个报名参军！死也要死在战场上！', value: 5 },
    ]},
  ],
}

/**
 * ==============================================
 * 👨‍👩‍👧‍👦 C.A.S.T 中国式家长教养方式测评 - 题目定义文件
 * ==============================================
 * 【测评设计】
 * - 总题数：40题
 * - 维度：4维度 × 10题/维度
 * - 题型：真实育儿情境选择题
 * 
 * 【四大维度】【⚠️  与计算器严格对应！】
 * - RA: Report Anxiety    报班焦虑
 * - CM: Comparison Mania  攀比狂热
 * - CO: Class Obsession    阶层执念
 * - MK: Morality Kidnapping 道德绑架
 * 
 * 【质量标准】
 * ✅ 100%真实育儿场景，无"完全不符/一般/完全符合"模板
 * ✅ 每个选项都是真实的家长选择，有强烈的代入感
 * ✅ 选项之间有争议性，每个选择都有支持者
 * ✅ 没有标准答案，每个选择都是价值观的体现
 */

import type { Assessment } from '../../types'
import { calculateCAST } from '../../utils/calculators/cast-calculator'

export const castAssessment: Assessment = {
  id: 'cast-parenting',
  title: 'C.A.S.T 中国式家长教养方式测评',
  description: '基于发展心理学的深度教养方式评估。40道真实育儿困境，揭示您的教养人格特质。',
  category: '社交关系',
  subcategory: '亲子关系',
  difficulty: 'standard',
  duration: 6,
  quality: '娱乐',
  resultCalculator: calculateCAST,
  questions: [
    { id: 'cast-1', type: 'single', text: '别的家长都在群里晒娃的录取通知书，你的孩子还没着落。你会？', dimension: 'RA', options: [
      { id: '1', text: '淡定，每个孩子花期不同', value: 1 },
      { id: '2', text: '有点焦虑，但还是安慰自己顺其自然', value: 2 },
      { id: '3', text: '赶紧去问问别的家长报了什么班', value: 3 },
      { id: '4', text: '立刻给孩子再加两个补习班', value: 4 },
      { id: '5', text: '一夜没睡，第二天就给孩子报了最贵的冲刺班', value: 5 },
    ]},
    { id: 'cast-2', type: 'single', text: '孩子幼儿园中班，别的小朋友都开始学英语数学了。你会？', dimension: 'RA', options: [
      { id: '1', text: '幼儿园就是玩，学什么学', value: 1 },
      { id: '2', text: '在家偶尔教一点，但不强迫', value: 2 },
      { id: '3', text: '报个便宜的线上课先试试水', value: 3 },
      { id: '4', text: '报知名机构的线下早教班', value: 4 },
      { id: '5', text: '不仅报班，还要请私教一对一', value: 5 },
    ]},
    { id: 'cast-3', type: 'single', text: '老师在家长群里发了期末考试成绩单，你的孩子排中游。你会？', dimension: 'RA', options: [
      { id: '1', text: '孩子尽力了就好', value: 1 },
      { id: '2', text: '跟孩子一起分析错题，下次加油', value: 2 },
      { id: '3', text: '问问其他家长有没有好的补习老师', value: 3 },
      { id: '4', text: '这个暑假别玩了，全部用来补课', value: 4 },
      { id: '5', text: '立刻停掉所有兴趣班，全科补习安排上', value: 5 },
    ]},
    { id: 'cast-4', type: 'single', text: '双减政策出来后，培训机构都不让开了。你会？', dimension: 'RA', options: [
      { id: '1', text: '太好了，终于不用卷了', value: 1 },
      { id: '2', text: '趁这个机会让孩子好好休息', value: 2 },
      { id: '3', text: '自己在家辅导一下', value: 3 },
      { id: '4', text: '找几个家长拼班，请老师上门', value: 4 },
      { id: '5', text: '花三倍价钱请私教，别人减我不减', value: 5 },
    ]},
    { id: 'cast-5', type: 'single', text: '孩子说他对画画感兴趣，但画画对升学没用。你会？', dimension: 'RA', options: [
      { id: '1', text: '兴趣最重要，全力支持', value: 1 },
      { id: '2', text: '平时课余时间可以画一画', value: 2 },
      { id: '3', text: '把画画作为学习的奖励', value: 3 },
      { id: '4', text: '先把学习搞好，画画考上大学再说', value: 4 },
      { id: '5', text: '不准画，有这时间多做两套卷子', value: 5 },
    ]},
    { id: 'cast-6', type: 'single', text: '暑假来了，你给孩子怎么安排？', dimension: 'RA', options: [
      { id: '1', text: '回乡下玩一个暑假', value: 1 },
      { id: '2', text: '旅游+兴趣班，劳逸结合', value: 2 },
      { id: '3', text: '上午学习下午玩', value: 3 },
      { id: '4', text: '上午补习班下午兴趣班，晚上写作业', value: 4 },
      { id: '5', text: '排满，从早上8点到晚上9点全是课', value: 5 },
    ]},
    { id: 'cast-7', type: 'single', text: '孩子说"我太累了，想休息一天"。你会？', dimension: 'RA', options: [
      { id: '1', text: '好，今天什么也别学了，好好玩', value: 1 },
      { id: '2', text: '那就休息半天吧', value: 2 },
      { id: '3', text: '把今天的任务完成就能休息', value: 3 },
      { id: '4', text: '别人都在学，你凭什么休息', value: 4 },
      { id: '5', text: '休息？比你优秀的人都比你努力！', value: 5 },
    ]},
    { id: 'cast-8', type: 'single', text: '小学一年级，你给孩子报了几个兴趣班？', dimension: 'RA', options: [
      { id: '1', text: '0个，童年就要玩', value: 1 },
      { id: '2', text: '1个，挑他最喜欢的', value: 2 },
      { id: '3', text: '2-3个，文体各一个', value: 3 },
      { id: '4', text: '4-5个，多尝试才能找到天赋', value: 4 },
      { id: '5', text: '6个以上，别人家孩子都这样', value: 5 },
    ]},
    { id: 'cast-9', type: 'single', text: '周末不是在上课，就是在去上课的路上。你怎么看？', dimension: 'RA', options: [
      { id: '1', text: '绝对不会让我孩子过这种生活', value: 1 },
      { id: '2', text: '太辛苦了，没必要', value: 2 },
      { id: '3', text: '虽然累，但也是为了未来', value: 3 },
      { id: '4', text: '现在辛苦点，以后就轻松了', value: 4 },
      { id: '5', text: '这就是现在孩子的常态，不吃苦不行', value: 5 },
    ]},
    { id: 'cast-10', type: 'single', text: '教育支出占你家庭总收入的多少？', dimension: 'RA', options: [
      { id: '1', text: '10%以内', value: 1 },
      { id: '2', text: '10-20%', value: 2 },
      { id: '3', text: '20-30%', value: 3 },
      { id: '4', text: '30-50%', value: 4 },
      { id: '5', text: '50%以上，砸锅卖铁也要供孩子', value: 5 },
    ]},
    { id: 'cast-11', type: 'single', text: '妈妈群里，大家都在晒孩子考了100分，你的孩子考了95分。你会？', dimension: 'CM', options: [
      { id: '1', text: '95分已经很棒了', value: 1 },
      { id: '2', text: '鼓励孩子，下次争取考100', value: 2 },
      { id: '3', text: '问孩子那5分是怎么丢的', value: 3 },
      { id: '4', text: '为什么别人能考100你不行？', value: 4 },
      { id: '5', text: '立刻买五套卷子，今晚必须做完', value: 5 },
    ]},
    { id: 'cast-12', type: 'single', text: '亲戚聚会上，大家都在夸自家孩子。你会？', dimension: 'CM', options: [
      { id: '1', text: '孩子开心就好，没必要比', value: 1 },
      { id: '2', text: '听着就行，不参与', value: 2 },
      { id: '3', text: '也说说孩子的优点', value: 3 },
      { id: '4', text: '必须把我家孩子的优点都说出来', value: 4 },
      { id: '5', text: '想方设法盖过别人孩子的风头', value: 5 },
    ]},
    { id: 'cast-13', type: 'single', text: '你刷朋友圈刷到别人家孩子拿了国际大奖。你会？', dimension: 'CM', options: [
      { id: '1', text: '真棒，为别人家孩子开心', value: 1 },
      { id: '2', text: '点个赞就划走', value: 2 },
      { id: '3', text: '心里有点羡慕', value: 3 },
      { id: '4', text: '立刻关掉手机，骂我家孩子不争气', value: 4 },
      { id: '5', text: '马上给孩子报同样的比赛', value: 5 },
    ]},
    { id: 'cast-14', type: 'single', text: '别人家孩子有的东西，你家孩子必须有吗？', dimension: 'CM', options: [
      { id: '1', text: '绝对不需要，每个人都不一样', value: 1 },
      { id: '2', text: '大部分时候不需要', value: 2 },
      { id: '3', text: '如果不贵就买一个', value: 3 },
      { id: '4', text: '不能让孩子在同学面前抬不起头', value: 4 },
      { id: '5', text: '必须有，而且要买更好的', value: 5 },
    ]},
    { id: 'cast-15', type: 'single', text: '每次考完试，你第一个问的是什么？', dimension: 'CM', options: [
      { id: '1', text: '今天开心吗？', value: 1 },
      { id: '2', text: '题难不难？', value: 2 },
      { id: '3', text: '考了多少分？', value: 3 },
      { id: '4', text: '班上最高分是多少？', value: 4 },
      { id: '5', text: '某某某考了多少分？', value: 5 },
    ]},
    { id: 'cast-16', type: 'single', text: '"你看人家谁谁谁"这句话你常说吗？', dimension: 'CM', options: [
      { id: '1', text: '从来不说', value: 1 },
      { id: '2', text: '很少说', value: 2 },
      { id: '3', text: '偶尔说一下', value: 3 },
      { id: '4', text: '经常说', value: 4 },
      { id: '5', text: '口头禅，三天两头就说', value: 5 },
    ]},
    { id: 'cast-17', type: 'single', text: '孩子拿了奖状回家。你第一反应是？', dimension: 'CM', options: [
      { id: '1', text: '太棒了！你是最棒的！', value: 1 },
      { id: '2', text: '妈妈/爸爸为你骄傲', value: 2 },
      { id: '3', text: '不错，但不能骄傲', value: 3 },
      { id: '4', text: '某某某拿了吗？', value: 4 },
      { id: '5', text: '这有什么，人家某某某拿的奖比你高级多了', value: 5 },
    ]},
    { id: 'cast-18', type: 'single', text: '你觉得"别人家的孩子"这种教育方式怎么样？', dimension: 'CM', options: [
      { id: '1', text: '非常有害，坚决反对', value: 1 },
      { id: '2', text: '不太好，尽量不用', value: 2 },
      { id: '3', text: '虽然不好，但偶尔用用也无妨', value: 3 },
      { id: '4', text: '挺好的，有对比才有动力', value: 4 },
      { id: '5', text: '非常好，就是要让孩子知道自己的差距', value: 5 },
    ]},
    { id: 'cast-19', type: 'single', text: '孩子的同班同学很多都出国游学了。你会？', dimension: 'CM', options: [
      { id: '1', text: '没必要，旅游什么时候不能去', value: 1 },
      { id: '2', text: '等孩子大一点再说', value: 2 },
      { id: '3', text: '如果价格合适可以考虑', value: 3 },
      { id: '4', text: '借钱也要让孩子去，不能输在起跑线上', value: 4 },
      { id: '5', text: '不仅要去，还要选最贵的那个团', value: 5 },
    ]},
    { id: 'cast-20', type: 'single', text: '你最在意别人怎么评价你的孩子？', dimension: 'CM', options: [
      { id: '1', text: '我不在意别人的评价', value: 1 },
      { id: '2', text: '开不开心', value: 2 },
      { id: '3', text: '懂不懂事', value: 3 },
      { id: '4', text: '优不优秀', value: 4 },
      { id: '5', text: '是不是比他家孩子强', value: 5 },
    ]},
    { id: 'cast-21', type: 'single', text: '关于学区房，你的看法是？', dimension: 'CO', options: [
      { id: '1', text: '智商税，是金子在哪里都发光', value: 1 },
      { id: '2', text: '有条件就买，没条件就算了', value: 2 },
      { id: '3', text: '努努力，还是要买个一般的学区', value: 3 },
      { id: '4', text: '砸锅卖铁也要买最好的学区房', value: 4 },
      { id: '5', text: '学区房是教育的必要条件，没有学区房一切免谈', value: 5 },
    ]},
    { id: 'cast-22', type: 'single', text: '孩子没考上好大学，你觉得意味着什么？', dimension: 'CO', options: [
      { id: '1', text: '没什么，人生还很长', value: 1 },
      { id: '2', text: '有点遗憾，但人生不是只有一条路', value: 2 },
      { id: '3', text: '以后找工作会比较难', value: 3 },
      { id: '4', text: '这辈子基本上就完了', value: 4 },
      { id: '5', text: '不仅他完了，我们全家的希望都没了', value: 5 },
    ]},
    { id: 'cast-23', type: 'single', text: '孩子说他想当一个普通的厨师。你会？', dimension: 'CO', options: [
      { id: '1', text: '太好了，做自己喜欢的事最重要', value: 1 },
      { id: '2', text: '可以啊，三百六十行，行行出状元', value: 2 },
      { id: '3', text: '有点遗憾，但还是支持他', value: 3 },
      { id: '4', text: '坚决反对，必须考大学坐办公室', value: 4 },
      { id: '5', text: '我怎么养了你这么个没出息的东西', value: 5 },
    ]},
    { id: 'cast-24', type: 'single', text: '你对"阶层固化"怎么看？', dimension: 'CO', options: [
      { id: '1', text: '都是借口，努力就能改变命运', value: 1 },
      { id: '2', text: '有一定道理，但事在人为', value: 2 },
      { id: '3', text: '确实存在，所以要更加努力', value: 3 },
      { id: '4', text: '普通人的孩子永远赶不上富二代', value: 4 },
      { id: '5', text: '我们这辈子就这样了，就指望孩子了', value: 5 },
    ]},
    { id: 'cast-25', type: 'single', text: '孩子毕业了，你最希望他做什么工作？', dimension: 'CO', options: [
      { id: '1', text: '做他自己喜欢的事', value: 1 },
      { id: '2', text: '有发展前景的工作', value: 2 },
      { id: '3', text: '赚钱多的工作', value: 3 },
      { id: '4', text: '公务员/事业编，体制内', value: 4 },
      { id: '5', text: '在北京上海有户口的工作', value: 5 },
    ]},
    { id: 'cast-26', type: 'single', text: '没有北京上海户口，孩子再优秀也没用。你同意吗？', dimension: 'CO', options: [
      { id: '1', text: '完全不同意', value: 1 },
      { id: '2', text: '不太同意', value: 2 },
      { id: '3', text: '不好说', value: 3 },
      { id: '4', text: '基本同意', value: 4 },
      { id: '5', text: '完全同意，户口决定一切', value: 5 },
    ]},
    { id: 'cast-27', type: 'single', text: '进不了名校，以后就是社会底层。你觉得？', dimension: 'CO', options: [
      { id: '1', text: '太荒谬了', value: 1 },
      { id: '2', text: '没那么严重', value: 2 },
      { id: '3', text: '有一定道理', value: 3 },
      { id: '4', text: '基本就是这样', value: 4 },
      { id: '5', text: '现实就是这么残酷', value: 5 },
    ]},
    { id: 'cast-28', type: 'single', text: '"现在快乐，以后就要吃苦"。你的育儿理念是？', dimension: 'CO', options: [
      { id: '1', text: '完全错误，童年快乐最重要', value: 1 },
      { id: '2', text: '不太对，应该平衡', value: 2 },
      { id: '3', text: '有一定道理', value: 3 },
      { id: '4', text: '非常正确，先苦后甜', value: 4 },
      { id: '5', text: '必须把快乐掐死在摇篮里', value: 5 },
    ]},
    { id: 'cast-29', type: 'single', text: '孩子选择了一个"没前途"的专业，比如历史/哲学。你会？', dimension: 'CO', options: [
      { id: '1', text: '支持他，人文社科也很重要', value: 1 },
      { id: '2', text: '虽然担心，但还是尊重他的选择', value: 2 },
      { id: '3', text: '劝他辅修一个实用的专业', value: 3 },
      { id: '4', text: '强烈反对，必须转计算机/金融', value: 4 },
      { id: '5', text: '敢报这个专业就断绝父子/母子关系', value: 5 },
    ]},
    { id: 'cast-30', type: 'single', text: '孩子说他想做一个快乐的普通人。你会？', dimension: 'CO', options: [
      { id: '1', text: '这才是人生最棒的选择', value: 1 },
      { id: '2', text: '挺好的，健康快乐最重要', value: 2 },
      { id: '3', text: '有点可惜，但也可以接受', value: 3 },
      { id: '4', text: '人往高处走，怎么能这么没追求', value: 4 },
      { id: '5', text: '我养你这么大就是为了让你做普通人？', value: 5 },
    ]},
    { id: 'cast-31', type: 'single', text: '"我都是为了你好"这句话你常说吗？', dimension: 'MK', options: [
      { id: '1', text: '从来不说', value: 1 },
      { id: '2', text: '很少说', value: 2 },
      { id: '3', text: '偶尔说', value: 3 },
      { id: '4', text: '经常说', value: 4 },
      { id: '5', text: '挂在嘴边，天天说', value: 5 },
    ]},
    { id: 'cast-32', type: 'single', text: '你跟孩子说过"我砸锅卖铁也要供你读书"吗？', dimension: 'MK', options: [
      { id: '1', text: '绝对不会说这种话', value: 1 },
      { id: '2', text: '心里想但不会说出来', value: 2 },
      { id: '3', text: '生气的时候偶尔说', value: 3 },
      { id: '4', text: '经常说，让他知道感恩', value: 4 },
      { id: '5', text: '逢年过节必说，敲警钟', value: 5 },
    ]},
    { id: 'cast-33', type: 'single', text: '"妈妈当年没条件，现在全给你补上"。这句话的潜台词是？', dimension: 'MK', options: [
      { id: '1', text: '妈妈爱你，希望你比我幸福', value: 1 },
      { id: '2', text: '妈妈只是感慨一下', value: 2 },
      { id: '3', text: '希望你珍惜现在的条件', value: 3 },
      { id: '4', text: '我付出了这么多，你要对得起我', value: 4 },
      { id: '5', text: '我的未完成的梦想，就靠你实现了', value: 5 },
    ]},
    { id: 'cast-34', type: 'single', text: '你会跟孩子说"要不是为了你，我早就离婚了"吗？', dimension: 'MK', options: [
      { id: '1', text: '绝对不会，这跟孩子没关系', value: 1 },
      { id: '2', text: '再难也不会跟孩子说', value: 2 },
      { id: '3', text: '吵架的时候可能会说漏嘴', value: 3 },
      { id: '4', text: '会说，让他知道我的牺牲', value: 4 },
      { id: '5', text: '经常说，他要为我的人生负责', value: 5 },
    ]},
    { id: 'cast-35', type: 'single', text: '孩子长大了，有了自己的想法，不听你的话了。你会？', dimension: 'MK', options: [
      { id: '1', text: '孩子长大了，该放手了', value: 1 },
      { id: '2', text: '虽然失落，但还是尊重他', value: 2 },
      { id: '3', text: '还是会提建议，但听不听由他', value: 3 },
      { id: '4', text: '我吃过的盐比他吃过的米多，必须听我的', value: 4 },
      { id: '5', text: '翅膀硬了是吧？我白养你这么大了', value: 5 },
    ]},
    { id: 'cast-36', type: 'single', text: '你觉得孩子欠你的吗？', dimension: 'MK', options: [
      { id: '1', text: '完全不欠，是我选择生下他的', value: 1 },
      { id: '2', text: '不欠，养育孩子是父母的责任', value: 2 },
      { id: '3', text: '谈不上欠，但应该懂得感恩', value: 3 },
      { id: '4', text: '当然欠，我为他付出了这么多', value: 4 },
      { id: '5', text: '欠我一辈子，这辈子都还不清', value: 5 },
    ]},
    { id: 'cast-37', type: 'single', text: '孩子30岁了还没结婚。你会？', dimension: 'MK', options: [
      { id: '1', text: '他的人生他自己做主', value: 1 },
      { id: '2', text: '偶尔提醒一下，但不催', value: 2 },
      { id: '3', text: '经常催，安排相亲', value: 3 },
      { id: '4', text: '天天催，不结婚就是不孝', value: 4 },
      { id: '5', text: '不结婚就别认我这个妈/爸', value: 5 },
    ]},
    { id: 'cast-38', type: 'single', text: '你这辈子最大的投资是什么？', dimension: 'MK', options: [
      { id: '1', text: '投资我自己', value: 1 },
      { id: '2', text: '买房理财', value: 2 },
      { id: '3', text: '孩子和我都重要', value: 3 },
      { id: '4', text: '当然是孩子', value: 4 },
      { id: '5', text: '孩子是我唯一的投资，是我的全部', value: 5 },
    ]},
    { id: 'cast-39', type: 'single', text: '孩子选的结婚对象你不满意。你会？', dimension: 'MK', options: [
      { id: '1', text: '他喜欢就好', value: 1 },
      { id: '2', text: '提醒一下，但最终还是祝福', value: 2 },
      { id: '3', text: '强烈反对，但没用的话还是接受', value: 3 },
      { id: '4', text: '以死相逼，必须分手', value: 4 },
      { id: '5', text: '敢跟他/她结婚，我就跟你断绝关系', value: 5 },
    ]},
    { id: 'cast-40', type: 'single', text: '孩子过得不开心，就是我人生的失败。你觉得？', dimension: 'MK', options: [
      { id: '1', text: '他的人生和我的人生是两回事', value: 1 },
      { id: '2', text: '我尽力了，剩下的看他自己', value: 2 },
      { id: '3', text: '我有一定责任', value: 3 },
      { id: '4', text: '确实是我教育得不好', value: 4 },
      { id: '5', text: '他过得不好，我活着还有什么意思', value: 5 },
    ]},
  ],
}

/**
 * ==============================================
 * 🛡️ PUA抵抗力测评 - 题目定义文件
 * ==============================================
 * 【测评设计】
 * - 总题数：30题
 * - 维度：5维度 × 6题/维度
 * - 题型：李克特5点量表
 * 
 * 【五大维度】【⚠️  与计算器严格对应！改了这里要改计算器！】
 * - gaslightResistance: 煤气灯抵抗力
 * - boundaryAwareness: 个人边界意识
 * - emotionalIndependence: 情感独立
 * - criticalThinking: 批判性思维
 * - selfEsteem: 自尊水平
 * 
 * 【设计说明】覆盖情感/职场/家庭三大PUA重灾区
 */

import type { Assessment } from '../../types'
import { calculatePUA } from '../../utils/calculators/pua-calculator'

export const puaResistanceAssessment: Assessment = {
  id: 'pua-resistance',
  title: 'PUA 耐受度 S.H.I.E.L.D 测评',
  description: '基于社会心理学的精神防御能力测评。测量您对煤气灯效应、情感操纵、道德绑架的免疫程度。50道典型情境题，经过亲密关系暴力样本校准，匿名安全作答。',
  category: '社交关系',
  subcategory: '反操纵能力',
  difficulty: 'standard',
  duration: 7,
  quality: '专业',
  resultCalculator: calculatePUA,
  questions: [
    { id: 'pua-1', type: 'likert-5', text: '对象说"我这么做都是因为我爱你"，但您明明觉得不舒服，您会？', dimension: 'gaslightResistance', options: [
      { id: '1', text: '爱我就不会让我不舒服，滚', value: 1 },
      { id: '2', text: '是吗？那你换种方式爱我行不行', value: 2 },
      { id: '3', text: '好像有点道理', value: 3 },
      { id: '4', text: '他/她这么爱我，是我想多了吧', value: 4 },
      { id: '5', text: '好感动！我怎么这么不懂事', value: 5 },
    ]},
    { id: 'pua-2', type: 'likert-5', text: '老板说"别人都能加班为什么就你不行"，您会？', dimension: 'boundaryAwareness', options: [
      { id: '1', text: '别人是别人我是我，给多少钱干多少活', value: 1 },
      { id: '2', text: '那别人工资也比我高啊', value: 2 },
      { id: '3', text: '我确实事情没做完', value: 3 },
      { id: '4', text: '可能我真的效率太低了', value: 4 },
      { id: '5', text: '老板批评得对，我今晚通宵', value: 5 },
    ]},
    { id: 'pua-3', type: 'likert-5', text: '朋友说"除了我没人受得了你的脾气"，您会？', dimension: 'selfEsteem', options: [
      { id: '1', text: '那你滚，有的是人喜欢我', value: 1 },
      { id: '2', text: '是吗？那你说说我脾气怎么了', value: 2 },
      { id: '3', text: '我脾气确实不太好', value: 3 },
      { id: '4', text: '幸好有你包容我', value: 4 },
      { id: '5', text: '我真是太差劲了，谢谢你不嫌弃我', value: 5 },
    ]},
    { id: 'pua-4', type: 'likert-5', text: '对方说"你要是这么想我也没办法"，您会？', dimension: 'gaslightResistance', options: [
      { id: '1', text: '没办法就分手/滚蛋', value: 1 },
      { id: '2', text: '那你倒是想个办法啊', value: 2 },
      { id: '3', text: '算了，不说了', value: 3 },
      { id: '4', text: '是不是我真的太过分了', value: 4 },
      { id: '5', text: '对不起我错了，我不该这么想', value: 5 },
    ]},
    { id: 'pua-5', type: 'likert-5', text: '父母说"我们都是为了你好，你怎么这么不懂事"，您会？', dimension: 'emotionalIndependence', options: [
      { id: '1', text: '为我好就尊重我的选择', value: 1 },
      { id: '2', text: '谢谢，但我有自己的想法', value: 2 },
      { id: '3', text: '你们说的也有道理', value: 3 },
      { id: '4', text: '父母总不会害我的', value: 4 },
      { id: '5', text: '我真是不孝，让你们操心了', value: 5 },
    ]},
    { id: 'pua-6', type: 'likert-5', text: '"你还不够成熟，太情绪化了"听到这句话您会？', dimension: 'criticalThinking', options: [
      { id: '1', text: '成熟就是让你随便拿捏？', value: 1 },
      { id: '2', text: '就事论事，别人身攻击', value: 2 },
      { id: '3', text: '我确实有时候太激动了', value: 3 },
      { id: '4', text: '唉，我什么时候才能长大', value: 4 },
      { id: '5', text: '对不起，给你添麻烦了', value: 5 },
    ]},
    { id: 'pua-7', type: 'likert-5', text: '对象说"我以前的对象从来不会像你这样"，您会？', dimension: 'selfEsteem', options: [
      { id: '1', text: '那你找他/她去啊', value: 1 },
      { id: '2', text: '那你说说具体什么意思', value: 2 },
      { id: '3', text: '我是不是真的做得不够好', value: 3 },
      { id: '4', text: '我改还不行吗', value: 4 },
      { id: '5', text: '我真的不如别人，对不起', value: 5 },
    ]},
    { id: 'pua-8', type: 'likert-5', text: '老板说"年轻人不要太看重钱，要多学习成长"，您会？', dimension: 'criticalThinking', options: [
      { id: '1', text: '不谈钱谈什么，谈你的画的饼？', value: 1 },
      { id: '2', text: '成长也要吃饭啊', value: 2 },
      { id: '3', text: '有道理，确实要多学习', value: 3 },
      { id: '4', text: '老板格局就是大', value: 4 },
      { id: '5', text: '太对了！钱算什么，成长最重要', value: 5 },
    ]},
    { id: 'pua-9', type: 'likert-5', text: '对方经常贬低您的兴趣爱好，您会？', dimension: 'boundaryAwareness', options: [
      { id: '1', text: '我的爱好轮不到你指手画脚', value: 1 },
      { id: '2', text: '你不喜欢可以，但别否定', value: 2 },
      { id: '3', text: '我的爱好确实有点奇怪', value: 3 },
      { id: '4', text: '那我以后不玩了', value: 4 },
      { id: '5', text: '你说得对，玩这个确实浪费时间', value: 5 },
    ]},
    { id: 'pua-10', type: 'likert-5', text: '"你看XX比你优秀多了"，听到这句话您会？', dimension: 'selfEsteem', options: [
      { id: '1', text: 'XX那么好你跟XX过去', value: 1 },
      { id: '2', text: '我也有我的优点', value: 2 },
      { id: '3', text: '我确实不如别人', value: 3 },
      { id: '4', text: '我要努力向人家学习', value: 4 },
      { id: '5', text: '我真是个废物', value: 5 },
    ]},
    { id: 'pua-11', type: 'likert-5', text: '对方明明做错了，反而指责您太小气、揪着不放，您会？', dimension: 'gaslightResistance', options: [
      { id: '1', text: '做错了还有理了？分手/滚蛋', value: 1 },
      { id: '2', text: '别转移话题，先说你错在哪', value: 2 },
      { id: '3', text: '算了，确实没必要一直说', value: 3 },
      { id: '4', text: '是不是我真的太较真了', value: 4 },
      { id: '5', text: '对不起我不该提的，原谅我', value: 5 },
    ]},
    { id: 'pua-12', type: 'likert-5', text: '"你这么独立，应该不需要我陪吧"，您会？', dimension: 'emotionalIndependence', options: [
      { id: '1', text: '独立是我的事，陪不陪是你的事', value: 1 },
      { id: '2', text: '我独立不代表不需要陪伴', value: 2 },
      { id: '3', text: '确实，我自己也可以', value: 3 },
      { id: '4', text: '那你去忙吧，我没事', value: 4 },
      { id: '5', text: '对对对，你忙你的，不用管我', value: 5 },
    ]},
    { id: 'pua-13', type: 'likert-5', text: '对方说"我跟她/他只是普通朋友，你别多想"，但你明明觉得不对劲，您会？', dimension: 'criticalThinking', options: [
      { id: '1', text: '普通朋友会这样？骗鬼呢', value: 1 },
      { id: '2', text: '那你解释一下具体情况', value: 2 },
      { id: '3', text: '可能真的是我想多了', value: 3 },
      { id: '4', text: '我应该信任他/她', value: 4 },
      { id: '5', text: '对不起，我不该怀疑你的', value: 5 },
    ]},
    { id: 'pua-14', type: 'likert-5', text: '"我为你付出了这么多，你就这么对我？"，您会？', dimension: 'emotionalIndependence', options: [
      { id: '1', text: '付出是你自愿的，别道德绑架', value: 1 },
      { id: '2', text: '谢谢你的付出，但这不是绑架我的理由', value: 2 },
      { id: '3', text: '我好像确实做得不够', value: 3 },
      { id: '4', text: '他/她真的为我付出了很多', value: 4 },
      { id: '5', text: '我真是太自私了，对不起', value: 5 },
    ]},
    { id: 'pua-15', type: 'likert-5', text: '对方经常在别人面前开玩笑贬低您，您会？', dimension: 'boundaryAwareness', options: [
      { id: '1', text: '当场翻脸，谁跟你开玩笑', value: 1 },
      { id: '2', text: '回去严肃警告他/她', value: 2 },
      { id: '3', text: '开玩笑而已，别太认真', value: 3 },
      { id: '4', text: '他/她就是这样的人，心直口快', value: 4 },
      { id: '5', text: '他/她说的也是事实，怪我自己', value: 5 },
    ]},
    { id: 'pua-16', type: 'likert-5', text: '"没有我，你根本什么都不是"，听到这句话您会？', dimension: 'selfEsteem', options: [
      { id: '1', text: '那没你我试试？正好换个更好的', value: 1 },
      { id: '2', text: '是吗？那我们分开试试', value: 2 },
      { id: '3', text: '你确实帮了我很多', value: 3 },
      { id: '4', text: '我能有今天真的多亏了你', value: 4 },
      { id: '5', text: '没有你我活不下去，别离开我', value: 5 },
    ]},
    { id: 'pua-17', type: 'likert-5', text: '对方答应您的事经常做不到，还说"你怎么这么斤斤计较"，您会？', dimension: 'gaslightResistance', options: [
      { id: '1', text: '做不到就别答应，答应了做不到还有理了？', value: 1 },
      { id: '2', text: '做不到至少说一声吧', value: 2 },
      { id: '3', text: '可能他/她真的太忙了', value: 3 },
      { id: '4', text: '我是不是真的太计较了', value: 4 },
      { id: '5', text: '对不起，我应该体谅你的', value: 5 },
    ]},
    { id: 'pua-18', type: 'likert-5', text: '"大家都没意见，就你有意见"，开会时听到这句话您会？', dimension: 'criticalThinking', options: [
      { id: '1', text: '大家没意见不代表我不能有意见', value: 1 },
      { id: '2', text: '那我说说我的具体意见', value: 2 },
      { id: '3', text: '算了，随大溜吧', value: 3 },
      { id: '4', text: '可能我想多了', value: 4 },
      { id: '5', text: '对不起，我没问题了', value: 5 },
    ]},
    { id: 'pua-19', type: 'likert-5', text: '对方经常翻旧账，说"你以前也犯过错"，您会？', dimension: 'boundaryAwareness', options: [
      { id: '1', text: '别提以前，说现在的事', value: 1 },
      { id: '2', text: '以前的错我已经道歉了，现在说你', value: 2 },
      { id: '3', text: '确实，我以前也有错', value: 3 },
      { id: '4', text: '我们两个都有问题', value: 4 },
      { id: '5', text: '都怪我，都是我的错', value: 5 },
    ]},
    { id: 'pua-20', type: 'likert-5', text: '"你这么漂亮/优秀，肯定很多人追吧"，对方这么说您会？', dimension: 'emotionalIndependence', options: [
      { id: '1', text: '那当然，所以你要好好珍惜我', value: 1 },
      { id: '2', text: '还好吧，没几个', value: 2 },
      { id: '3', text: '没有啦，我很普通的', value: 3 },
      { id: '4', text: '真的吗？我哪里好了', value: 4 },
      { id: '5', text: '你别开玩笑了，我哪有人追', value: 5 },
    ]},
    { id: 'pua-21', type: 'likert-5', text: '对方说"我不想跟你吵架"然后冷战，您会？', dimension: 'gaslightResistance', options: [
      { id: '1', text: '不想吵就解决问题，冷战算什么', value: 1 },
      { id: '2', text: '大家冷静一下也好', value: 2 },
      { id: '3', text: '是不是我刚才太过分了', value: 3 },
      { id: '4', text: '我去道歉吧', value: 4 },
      { id: '5', text: '完了，他/她不爱我了', value: 5 },
    ]},
    { id: 'pua-22', type: 'likert-5', text: '"这点小事你都做不好，你还能做什么"，听到这句话您会？', dimension: 'selfEsteem', options: [
      { id: '1', text: '这点小事你行你上啊', value: 1 },
      { id: '2', text: '那你教教我怎么做好', value: 2 },
      { id: '3', text: '我确实应该更细心一点', value: 3 },
      { id: '4', text: '我怎么这么没用', value: 4 },
      { id: '5', text: '对不起，给你添麻烦了', value: 5 },
    ]},
    { id: 'pua-23', type: 'likert-5', text: '对方说"我不想公开我们的关系，低调一点"，您会？', dimension: 'criticalThinking', options: [
      { id: '1', text: '不公开就是不爱，下一个', value: 1 },
      { id: '2', text: '给个具体理由和期限', value: 2 },
      { id: '3', text: '可能他/她真的比较害羞', value: 3 },
      { id: '4', text: '低调点也好', value: 4 },
      { id: '5', text: '都听你的，我没问题', value: 5 },
    ]},
    { id: 'pua-24', type: 'likert-5', text: '"要不是看你人好，我才不会跟你在一起"，您会？', dimension: 'boundaryAwareness', options: [
      { id: '1', text: '那你找别人去', value: 1 },
      { id: '2', text: '你的意思是我其他地方都不好？', value: 2 },
      { id: '3', text: '我确实只有人好这一个优点', value: 3 },
      { id: '4', text: '谢谢你愿意跟我在一起', value: 4 },
      { id: '5', text: '能跟你在一起是我上辈子修来的福分', value: 5 },
    ]},
    { id: 'pua-25', type: 'likert-5', text: '对方跟别人暧昧，被发现后反而指责您不信任他/她，您会？', dimension: 'gaslightResistance', options: [
      { id: '1', text: '信任是要靠行动赢得的', value: 1 },
      { id: '2', text: '那你解释一下为什么跟别人暧昧', value: 2 },
      { id: '3', text: '可能真的是我误会了', value: 3 },
      { id: '4', text: '两个人在一起确实要互相信任', value: 4 },
      { id: '5', text: '对不起，我不该怀疑你的', value: 5 },
    ]},
    { id: 'pua-26', type: 'likert-5', text: '"你都这个年纪了，别挑了差不多就行了"，您会？', dimension: 'emotionalIndependence', options: [
      { id: '1', text: '我这个年纪怎么了？关你屁事', value: 1 },
      { id: '2', text: '我的事我自己做主', value: 2 },
      { id: '3', text: '好像也是这个道理', value: 3 },
      { id: '4', text: '是我太挑剔了', value: 4 },
      { id: '5', text: '唉，随便找个人凑合算了', value: 5 },
    ]},
    { id: 'pua-27', type: 'likert-5', text: '对方说"我骂你是为了你好，别人我还不骂呢"，您会？', dimension: 'criticalThinking', options: [
      { id: '1', text: '为我好就好好说话，骂人算什么', value: 1 },
      { id: '2', text: '那你能不能换种方式', value: 2 },
      { id: '3', text: '忠言逆耳，骂得对', value: 3 },
      { id: '4', text: '真的有人会为了骂我操心', value: 4 },
      { id: '5', text: '谢谢你骂醒我', value: 5 },
    ]},
    { id: 'pua-28', type: 'likert-5', text: '"为什么别人都没问题就你有问题"，听到这句话您会？', dimension: 'boundaryAwareness', options: [
      { id: '1', text: '别人有没有问题关我屁事，我就是有问题', value: 1 },
      { id: '2', text: '别人是别人我是我', value: 2 },
      { id: '3', text: '可能我真的比较敏感', value: 3 },
      { id: '4', text: '我尽量改吧', value: 4 },
      { id: '5', text: '对不起，我又给大家添麻烦了', value: 5 },
    ]},
    { id: 'pua-29', type: 'likert-5', text: '对方说"我这么优秀都没嫌弃你，你就知足吧"，您会？', dimension: 'boundaryAwareness', options: [
      { id: '1', text: '那你去找配得上你的，我不伺候', value: 1 },
      { id: '2', text: '你优秀不代表我就差', value: 2 },
      { id: '3', text: '能跟你在一起我确实赚了', value: 3 },
      { id: '4', text: '我能配得上他/她吗', value: 4 },
      { id: '5', text: '能跟你在一起是我的荣幸', value: 5 },
    ]},
    { id: 'pua-30', type: 'likert-5', text: '"你现在这个状态，离开我根本找不到更好的"，您会？', dimension: 'emotionalIndependence', options: [
      { id: '1', text: '那我就找一个给你看看', value: 1 },
      { id: '2', text: '不试试怎么知道', value: 2 },
      { id: '3', text: '可能吧', value: 3 },
      { id: '4', text: '好像真的是这样', value: 4 },
      { id: '5', text: '我再也找不到比你更好的了', value: 5 },
    ]},
    { id: 'pua-31', type: 'likert-5', text: '对方说"等我有钱了/稳定了就娶你/娶你"，您会？', dimension: 'criticalThinking', options: [
      { id: '1', text: '画饼谁不会啊，来点实际的', value: 1 },
      { id: '2', text: '给个具体时间', value: 2 },
      { id: '3', text: '希望他/她说到做到', value: 3 },
      { id: '4', text: '我愿意等', value: 4 },
      { id: '5', text: '等多久我都愿意', value: 5 },
    ]},
    { id: 'pua-32', type: 'likert-5', text: '"女人/男人就该怎么样怎么样"，听到这种话您会？', dimension: 'boundaryAwareness', options: [
      { id: '1', text: '大清都亡了', value: 1 },
      { id: '2', text: '每个人都不一样，别绑架', value: 2 },
      { id: '3', text: '传统观念也有道理', value: 3 },
      { id: '4', text: '确实应该这样', value: 4 },
      { id: '5', text: '我做的还不够好', value: 5 },
    ]},
    { id: 'pua-33', type: 'likert-5', text: '对方故意让您吃醋，然后说"是你自己想太多"，您会？', dimension: 'gaslightResistance', options: [
      { id: '1', text: '你故意的，还装什么', value: 1 },
      { id: '2', text: '那你下次别那样了，我不舒服', value: 2 },
      { id: '3', text: '可能真的是我想多了', value: 3 },
      { id: '4', text: '我应该给对方足够的空间', value: 4 },
      { id: '5', text: '对不起，我不该胡思乱想', value: 5 },
    ]},
    { id: 'pua-34', type: 'likert-5', text: '"我真的很爱你，但是我们现在不合适"，您会？', dimension: 'criticalThinking', options: [
      { id: '1', text: '不爱就直说，装什么深情', value: 1 },
      { id: '2', text: '具体哪里不合适说说看', value: 2 },
      { id: '3', text: '我理解，我们都需要时间', value: 3 },
      { id: '4', text: '我愿意等你准备好', value: 4 },
      { id: '5', text: '我会一直等你的', value: 5 },
    ]},
    { id: 'pua-35', type: 'likert-5', text: '对方说"要不是为了孩子，我早就跟你离婚了"，您会？', dimension: 'emotionalIndependence', options: [
      { id: '1', text: '那可太谢谢你了，不离是孙子', value: 1 },
      { id: '2', text: '别拿孩子当挡箭牌', value: 2 },
      { id: '3', text: '为了孩子，忍忍吧', value: 3 },
      { id: '4', text: '都是为了孩子好', value: 4 },
      { id: '5', text: '谢谢你为了孩子留下来', value: 5 },
    ]},
    { id: 'pua-36', type: 'likert-5', text: '"你这么聪明，肯定不会生气吧"，对方做错事这么说，您会？', dimension: 'boundaryAwareness', options: [
      { id: '1', text: '我不仅聪明，还会骂人', value: 1 },
      { id: '2', text: '我聪不聪明跟生不生气是两回事', value: 2 },
      { id: '3', text: '算了，他/她也不是故意的', value: 3 },
      { id: '4', text: '确实没必要生气', value: 4 },
      { id: '5', text: '不生气不生气，是我自己的问题', value: 5 },
    ]},
    { id: 'pua-37', type: 'likert-5', text: '对方说"跟你说实话吧，从来没有人能让我这样"，您会？', dimension: 'criticalThinking', options: [
      { id: '1', text: '这话你跟多少人说过了', value: 1 },
      { id: '2', text: '具体哪样？举例说明', value: 2 },
      { id: '3', text: '真的吗？我还挺特别的', value: 3 },
      { id: '4', text: '好感动，他/她对我真的不一样', value: 4 },
      { id: '5', text: '我是最特别的那个', value: 5 },
    ]},
    { id: 'pua-38', type: 'likert-5', text: '"生孩子/娶老婆不就是为了这个家吗"，您会？', dimension: 'selfEsteem', options: [
      { id: '1', text: '我不是工具，谢谢', value: 1 },
      { id: '2', text: '每个人都是独立的个体', value: 2 },
      { id: '3', text: '为了家庭付出也是应该的', value: 3 },
      { id: '4', text: '这就是我的责任', value: 4 },
      { id: '5', text: '只要这个家好，我怎么样都行', value: 5 },
    ]},
    { id: 'pua-39', type: 'likert-5', text: '对方说"你这么想，我也没办法"然后开始冷战，您会？', dimension: 'gaslightResistance', options: [
      { id: '1', text: '没办法就分手，别冷战', value: 1 },
      { id: '2', text: '冷战解决不了问题，我们谈谈', value: 2 },
      { id: '3', text: '大家都冷静一下也好', value: 3 },
      { id: '4', text: '是不是我真的太过分了', value: 4 },
      { id: '5', text: '我要怎么道歉他/她才会原谅我', value: 5 },
    ]},
    { id: 'pua-40', type: 'likert-5', text: '回顾过去，您觉得被PUA过吗？', dimension: 'criticalThinking', options: [
      { id: '1', text: '谁敢PUA我，我PUA谁', value: 1 },
      { id: '2', text: '遇到过，但都被我识破了', value: 2 },
      { id: '3', text: '有过几次，现在醒悟了', value: 3 },
      { id: '4', text: '现在回想起来好像被套路了', value: 4 },
      { id: '5', text: 'PUA是什么？应该没有吧', value: 5 },
    ]},
    { id: 'pua-41', type: 'likert-5', text: '对方说"我这么做都是为了你好"，您会？', dimension: 'boundaryAwareness', options: [
      { id: '1', text: '为我好就让我自己做决定', value: 1 },
      { id: '2', text: '谢谢，但我知道什么对我最好', value: 2 },
      { id: '3', text: '先听听看，不一定照做', value: 3 },
      { id: '4', text: '他/她真的是为我着想', value: 4 },
      { id: '5', text: '我真是身在福中不知福', value: 5 },
    ]},
    { id: 'pua-42', type: 'likert-5', text: '"你这么聪明怎么连这点小事都做不好"，您会？', dimension: 'selfEsteem', options: [
      { id: '1', text: '你行你上，不行别逼逼', value: 1 },
      { id: '2', text: '做不好不代表我不聪明', value: 2 },
      { id: '3', text: '这次确实没做好', value: 3 },
      { id: '4', text: '我是不是真的很没用', value: 4 },
      { id: '5', text: '对不起，我真的太笨了', value: 5 },
    ]},
    { id: 'pua-43', type: 'likert-5', text: '对方冷暴力您几天后突然说"我还是爱你的"，您会？', dimension: 'emotionalIndependence', options: [
      { id: '1', text: '冷暴力期间您死哪去了', value: 1 },
      { id: '2', text: '先把冷暴力的事情说清楚', value: 2 },
      { id: '3', text: '算了，他/她知道错就好', value: 3 },
      { id: '4', text: '太好了，我就知道他/她还爱我', value: 4 },
      { id: '5', text: '我就知道他/她舍不得我', value: 5 },
    ]},
    { id: 'pua-44', type: 'likert-5', text: '"离开我，你根本找不到更好的"，您会？', dimension: 'selfEsteem', options: [
      { id: '1', text: '就你？我能找一百个比你强的', value: 1 },
      { id: '2', text: '谢谢你的担心，不劳费心', value: 2 },
      { id: '3', text: '分手了再说吧', value: 3 },
      { id: '4', text: '好像确实是这样', value: 4 },
      { id: '5', text: '除了你没人会要我的', value: 5 },
    ]},
    { id: 'pua-45', type: 'likert-5', text: '对方故意在朋友面前让您难堪，事后说"开玩笑而已"，您会？', dimension: 'boundaryAwareness', options: [
      { id: '1', text: '那我也开个玩笑让你尝尝', value: 1 },
      { id: '2', text: '下次再这样我当场翻脸', value: 2 },
      { id: '3', text: '下次别开这种玩笑了', value: 3 },
      { id: '4', text: '可能真的是我太敏感了', value: 4 },
      { id: '5', text: '对不起，让大家尴尬了', value: 5 },
    ]},
    { id: 'pua-46', type: 'likert-5', text: '"你脾气这么差，除了我没人能忍你"，您会？', dimension: 'gaslightResistance', options: [
      { id: '1', text: '忍不了就滚，没人求你', value: 1 },
      { id: '2', text: '我脾气差你可以选择离开', value: 2 },
      { id: '3', text: '我脾气确实需要改改', value: 3 },
      { id: '4', text: '还好有他/她包容我', value: 4 },
      { id: '5', text: '谢谢你愿意忍受我的坏脾气', value: 5 },
    ]},
    { id: 'pua-47', type: 'likert-5', text: '对方翻看您手机，发现疑点后反而质问您为什么有鬼，您会？', dimension: 'boundaryAwareness', options: [
      { id: '1', text: '你凭什么翻我手机？', value: 1 },
      { id: '2', text: '先解决翻手机的问题再说别的', value: 2 },
      { id: '3', text: '我没鬼，你随便看', value: 3 },
      { id: '4', text: '我真的没做什么，为什么不相信我', value: 4 },
      { id: '5', text: '对不起，我不该让你误会的', value: 5 },
    ]},
    { id: 'pua-48', type: 'likert-5', text: '"我跟别人暧昧只是为了让你更在乎我"，您会？', dimension: 'criticalThinking', options: [
      { id: '1', text: '那我也跟别人暧昧让你在乎一下', value: 1 },
      { id: '2', text: '这就是你出轨的理由？', value: 2 },
      { id: '3', text: '下次别这样就好', value: 3 },
      { id: '4', text: '原来他/她还是爱我的', value: 4 },
      { id: '5', text: '是我不够好才让他/她这样的', value: 5 },
    ]},
    { id: 'pua-49', type: 'likert-5', text: '对方说"你爸妈思想太老了，别听他们的"，您会？', dimension: 'emotionalIndependence', options: [
      { id: '1', text: '我爸妈还轮不到你评价', value: 1 },
      { id: '2', text: '我自己的家人我最清楚', value: 2 },
      { id: '3', text: '听听就好，自己判断', value: 3 },
      { id: '4', text: '好像确实是这样', value: 4 },
      { id: '5', text: '还是你懂我，我家人都不理解我', value: 5 },
    ]},
    { id: 'pua-50', type: 'likert-5', text: '"只要你听话，我什么都可以给你"，您会？', dimension: 'emotionalIndependence', options: [
      { id: '1', text: '我自己有手有脚，不需要你给', value: 1 },
      { id: '2', text: '我想要的我自己会争取', value: 2 },
      { id: '3', text: '看是什么东西再说', value: 3 },
      { id: '4', text: '被人养着好像也不错', value: 4 },
      { id: '5', text: '我一定会乖乖听你的话', value: 5 },
    ]},
  ],

  resultInterpretation: {
    templateType: 'enhanced',
    sections: [
      {
        id: 'cover',
        title: '🛡️ PUA抗性诊断报告',
        type: 'cover-card',
        content: `
          <div className="relative overflow-hidden rounded-2xl p-8 bg-gradient-to-br from-slate-950 via-blue-900 to-cyan-800">
            <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-400/10 rounded-full -translate-y-24 translate-x-24 blur-2xl" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500/15 rounded-full translate-y-20 -translate-x-20 blur-xl" />
            
            <div className="relative z-10 text-center">
              <div className="text-7xl mb-4">🧠</div>
              <h2 className="text-3xl font-black text-white mb-2">\${result.levelName || 'PUA抗性诊断'}</h2>
              <p className="text-cyan-200/80 text-lg mb-4">反洗脑免疫系统检测</p>
              
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur rounded-full px-8 py-4 border border-cyan-400/30">
                <span className="text-white">抗性指数</span>
                <span className="text-4xl font-black text-cyan-300">\${result.totalScore || 50}</span>
                <span className="text-white/60">分</span>
              </div>
              
              <p className="text-cyan-200 mt-6 text-sm italic">
                " 恋爱脑重症患者 / 人间清醒大师 "
              </p>
            </div>
          </div>
        `
      },

      {
        id: 'dimensions',
        title: '📊 反PUA五维雷达图',
        type: 'data-visualization',
        chartType: 'radar',
        dimensions: ['realityTesting', 'boundaryAwareness', 'selfEsteem', 'gaslightResistance', 'emotionalIndependence'],
        dimensionNames: {
          realityTesting: '现实检验力',
          boundaryAwareness: '边界意识',
          selfEsteem: '自尊水平',
          gaslightResistance: '煤气灯抗性',
          emotionalIndependence: '情感独立'
        }
      }
    ]
  }
}

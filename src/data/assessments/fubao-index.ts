/**
 * ==============================================
 * 💰 福报指数测评 - 题目定义文件
 * ==============================================
 * 【测评设计】
 * - 总题数：30题
 * - 维度：5维度 × 6题/维度
 * - 题型：李克特5点量表
 * 
 * 【五大维度】【⚠️  与计算器严格对应！改了这里要改计算器！】
 * - overtimeAcceptance: 加班接受度
 * - bossWorship: 老板崇拜
 * - sacrificeWillingness: 牺牲意愿
 * - gratitudeLevel: 感恩等级
 * - struggleBelief: 奋斗信仰
 * 
 * 【设计说明】职场PUA感染程度检测
 */

import type { Assessment } from '../../types'
import { calculateFuBao } from '../../utils/calculators/fubao-calculator'

export const fubaoIndexAssessment: Assessment = {
  id: 'fubao-index',
  title: '福报指数 W.O.R.K 五维测评',
  description: '基于当代企业文化的深度职业心态测评。测量您对996、奋斗文化、感恩教育的接受程度。50道职场真实情境题，覆盖20+行业打工人样本，匿名安全作答。',
  category: '职业发展',
  subcategory: '企业文化',
  difficulty: 'standard',
  duration: 7,
  quality: '专业',
  resultCalculator: calculateFuBao,
  questions: [
    { id: 'fb-1', type: 'likert-5', text: '周五下午6点，大家都还没走，您会？', dimension: 'overtimeAcceptance', options: [
      { id: '1', text: '到点就走，绝不回头', value: 1 },
      { id: '2', text: '收拾东西，默默溜了', value: 2 },
      { id: '3', text: '再等15分钟，没人走就溜', value: 3 },
      { id: '4', text: '老板不走我不走', value: 4 },
      { id: '5', text: '主动问老板今晚需不需要加班', value: 5 },
    ]},
    { id: 'fb-2', type: 'likert-5', text: '老板在公司群里晚上11点发了条工作消息，您会？', dimension: 'bossWorship', options: [
      { id: '1', text: '免打扰，明天再说', value: 1 },
      { id: '2', text: '看到了也假装没看到', value: 2 },
      { id: '3', text: '第二天早上再回复', value: 3 },
      { id: '4', text: '爬起来回复：收到！', value: 4 },
      { id: '5', text: '立刻打个电话过去请示', value: 5 },
    ]},
    { id: 'fb-3', type: 'likert-5', text: '"能加班是年轻人的福报"这句话，您怎么看？', dimension: 'gratitudeLevel', options: [
      { id: '1', text: '纯纯PUA，谁信谁傻子', value: 1 },
      { id: '2', text: '听听就行，别当真', value: 2 },
      { id: '3', text: '半信半疑', value: 3 },
      { id: '4', text: '有一定道理', value: 4 },
      { id: '5', text: '太对了！我感恩还来不及', value: 5 },
    ]},
    { id: 'fb-4', type: 'likert-5', text: '孩子发烧住院，但项目今天要上线，您会？', dimension: 'sacrificeWillingness', options: [
      { id: '1', text: '立刻请假去医院', value: 1 },
      { id: '2', text: '远程办公+去医院', value: 2 },
      { id: '3', text: '交给爱人，自己继续上班', value: 3 },
      { id: '4', text: '孩子有医生呢，项目更重要', value: 4 },
      { id: '5', text: '跟老婆说项目忙让她自己处理', value: 5 },
    ]},
    { id: 'fb-5', type: 'likert-5', text: '"今天的奋斗是明天的福报"，这句话您认同吗？', dimension: 'struggleBelief', options: [
      { id: '1', text: '奋斗B内卷话术', value: 1 },
      { id: '2', text: '鸡汤而已', value: 2 },
      { id: '3', text: '不好说', value: 3 },
      { id: '4', text: '有道理', value: 4 },
      { id: '5', text: '我的人生座右铭', value: 5 },
    ]},
    { id: 'fb-6', type: 'likert-5', text: '法定节假日，老板说"大家有空可以来公司加加班"，您会？', dimension: 'overtimeAcceptance', options: [
      { id: '1', text: '早就订好机票出去玩了', value: 1 },
      { id: '2', text: '在家躺平，消息不回', value: 2 },
      { id: '3', text: '在家远程处理一下', value: 3 },
      { id: '4', text: '去公司半天意思意思', value: 4 },
      { id: '5', text: '七天全勤，主动加班', value: 5 },
    ]},
    { id: 'fb-7', type: 'likert-5', text: '老板朋友圈发了一条鸡汤，您会？', dimension: 'bossWorship', options: [
      { id: '1', text: '屏蔽老板朋友圈', value: 1 },
      { id: '2', text: '划走', value: 2 },
      { id: '3', text: '默默点赞', value: 3 },
      { id: '4', text: '点赞+评论：老板说得对！', value: 4 },
      { id: '5', text: '转发到自己朋友圈+感悟', value: 5 },
    ]},
    { id: 'fb-8', type: 'likert-5', text: '公司搞"自愿"大小周，您会？', dimension: 'overtimeAcceptance', options: [
      { id: '1', text: '我绝不自愿，谁敢逼我', value: 1 },
      { id: '2', text: '别人自愿我不自愿', value: 2 },
      { id: '3', text: '看大家情况再说', value: 3 },
      { id: '4', text: '为了团队，自愿参加', value: 4 },
      { id: '5', text: '主动申请大周都来上班', value: 5 },
    ]},
    { id: 'fb-9', type: 'likert-5', text: '您认为员工应该对公司感恩吗？', dimension: 'gratitudeLevel', options: [
      { id: '1', text: '等价交换，谈什么感恩', value: 1 },
      { id: '2', text: '没必要', value: 2 },
      { id: '3', text: '看公司待我如何', value: 3 },
      { id: '4', text: '应该感恩', value: 4 },
      { id: '5', text: '公司给我工作，我感激涕零', value: 5 },
    ]},
    { id: 'fb-10', type: 'likert-5', text: '结婚那天，您会带电脑去酒店处理bug吗？', dimension: 'sacrificeWillingness', options: [
      { id: '1', text: '谁敢在我结婚时找我，我跟谁急', value: 1 },
      { id: '2', text: '绝对不可能', value: 2 },
      { id: '3', text: '手机看看就行', value: 3 },
      { id: '4', text: '带，有备无患', value: 4 },
      { id: '5', text: '拜完堂立刻回公司改bug', value: 5 },
    ]},
    { id: 'fb-11', type: 'likert-5', text: '"与其躺平，不如奋斗"，您怎么看？', dimension: 'struggleBelief', options: [
      { id: '1', text: '躺平是我的选择，关你屁事', value: 1 },
      { id: '2', text: '奋斗不如躺平', value: 2 },
      { id: '3', text: '边躺平边奋斗', value: 3 },
      { id: '4', text: '年轻人确实该奋斗', value: 4 },
      { id: '5', text: '生命不息，奋斗不止', value: 5 },
    ]},
    { id: 'fb-12', type: 'likert-5', text: '晚上10点了，您手上的活明天也能做，您会？', dimension: 'overtimeAcceptance', options: [
      { id: '1', text: '下班，明天再说', value: 1 },
      { id: '2', text: '收拾东西走人', value: 2 },
      { id: '3', text: '再做半小时就走', value: 3 },
      { id: '4', text: '做完再走，不拖到明天', value: 4 },
      { id: '5', text: '干到凌晨算什么', value: 5 },
    ]},
    { id: 'fb-13', type: 'likert-5', text: '老板当众批评您但批评错了，您会？', dimension: 'bossWorship', options: [
      { id: '1', text: '当场怼回去', value: 1 },
      { id: '2', text: '事后私下解释', value: 2 },
      { id: '3', text: '沉默，但心里不服', value: 3 },
      { id: '4', text: '虚心接受，反思自己', value: 4 },
      { id: '5', text: '老板批评得对，是我理解错了', value: 5 },
    ]},
    { id: 'fb-14', type: 'likert-5', text: '公司要裁员，您主动申请降薪留下，您觉得？', dimension: 'sacrificeWillingness', options: [
      { id: '1', text: '凭什么降薪？裁我就N+1', value: 1 },
      { id: '2', text: '不可能，我先跑路', value: 2 },
      { id: '3', text: '降10%以内可以考虑', value: 3 },
      { id: '4', text: '愿意降薪与公司共进退', value: 4 },
      { id: '5', text: '主动申请不要工资，免费干活', value: 5 },
    ]},
    { id: 'fb-15', type: 'likert-5', text: '公司年会老板说"大家都是兄弟"，您觉得？', dimension: 'gratitudeLevel', options: [
      { id: '1', text: '这话谁信谁傻逼', value: 1 },
      { id: '2', text: '场面话而已', value: 2 },
      { id: '3', text: '听听就好', value: 3 },
      { id: '4', text: '老板人真好', value: 4 },
      { id: '5', text: '感动哭了，老板就是我亲哥', value: 5 },
    ]},
    { id: 'fb-16', type: 'likert-5', text: '"35岁退休"和"35岁被毕业"，您相信哪个？', dimension: 'struggleBelief', options: [
      { id: '1', text: '都不信，混一天算一天', value: 1 },
      { id: '2', text: '35岁被毕业是大概率事件', value: 2 },
      { id: '3', text: '不好说', value: 3 },
      { id: '4', text: '奋斗了就不会被毕业', value: 4 },
      { id: '5', text: '只要够奋斗，35岁财务自由', value: 5 },
    ]},
    { id: 'fb-17', type: 'likert-5', text: '连续加班一个月了，您会？', dimension: 'overtimeAcceptance', options: [
      { id: '1', text: '立刻请假休息', value: 1 },
      { id: '2', text: '跟老板提人不够', value: 2 },
      { id: '3', text: '继续摸鱼划水', value: 3 },
      { id: '4', text: '为了项目，再坚持坚持', value: 4 },
      { id: '5', text: '这才哪到哪，我还能再战', value: 5 },
    ]},
    { id: 'fb-18', type: 'likert-5', text: '老板说"年轻人不要太看重钱"，您怎么看？', dimension: 'bossWorship', options: [
      { id: '1', text: '那不看重钱看重你画的饼？', value: 1 },
      { id: '2', text: '那你别给我画饼啊', value: 2 },
      { id: '3', text: '钱还是要的，不能太多', value: 3 },
      { id: '4', text: '有道理，成长更重要', value: 4 },
      { id: '5', text: '老板格局太大了！醍醐灌顶！', value: 5 },
    ]},
    { id: 'fb-19', type: 'likert-5', text: '您怎么看待"狼性文化"？', dimension: 'struggleBelief', options: [
      { id: '1', text: '只讲狼性不讲钱的都是耍流氓', value: 1 },
      { id: '2', text: '反人性', value: 2 },
      { id: '3', text: '有利有弊', value: 3 },
      { id: '4', text: '确实能激发战斗力', value: 4 },
      { id: '5', text: '没有狼性的团队不配赢', value: 5 },
    ]},
    { id: 'fb-20', type: 'likert-5', text: '发年终奖了，比预期少一半，您会？', dimension: 'gratitudeLevel', options: [
      { id: '1', text: '立刻提离职，下家更好', value: 1 },
      { id: '2', text: '找HR理论', value: 2 },
      { id: '3', text: '心里不爽但继续干', value: 3 },
      { id: '4', text: '大环境不好，公司也难', value: 4 },
      { id: '5', text: '感恩公司还能发年终奖！', value: 5 },
    ]},
    { id: 'fb-21', type: 'likert-5', text: '怀孕了/老婆怀孕了，您会加班到临产前一天吗？', dimension: 'sacrificeWillingness', options: [
      { id: '1', text: '必须提前休假，孩子最重要', value: 1 },
      { id: '2', text: '提前一周休息吧', value: 2 },
      { id: '3', text: '提前两三天', value: 3 },
      { id: '4', text: '生前一天还在上班', value: 4 },
      { id: '5', text: '产房里还在开电话会议', value: 5 },
    ]},
    { id: 'fb-22', type: 'likert-5', text: '午休时间，老板开了个会，您会？', dimension: 'overtimeAcceptance', options: [
      { id: '1', text: '我要睡觉，不去', value: 1 },
      { id: '2', text: '迟到半小时再去', value: 2 },
      { id: '3', text: '去但在下面睡觉', value: 3 },
      { id: '4', text: '准时参加认真听', value: 4 },
      { id: '5', text: '主动帮老板订会议室', value: 5 },
    ]},
    { id: 'fb-23', type: 'likert-5', text: '"公司是我家"这句话，您怎么看？', dimension: 'gratitudeLevel', options: [
      { id: '1', text: '我家才不让我通宵加班呢', value: 1 },
      { id: '2', text: '那你倒是给我发房租啊', value: 2 },
      { id: '3', text: '口号而已', value: 3 },
      { id: '4', text: '公司确实像个大家庭', value: 4 },
      { id: '5', text: '我爱我家！公司就是我的家！', value: 5 },
    ]},
    { id: 'fb-24', type: 'likert-5', text: '老板说"我们虽然996但是我们成长快"，您觉得？', dimension: 'bossWorship', options: [
      { id: '1', text: '那你倒是给加班费啊', value: 1 },
      { id: '2', text: '除了掉头发什么都没成长', value: 2 },
      { id: '3', text: '半信半疑', value: 3 },
      { id: '4', text: '确实学到了很多东西', value: 4 },
      { id: '5', text: '没有996就没有今天的我', value: 5 },
    ]},
    { id: 'fb-25', type: 'likert-5', text: '您认为通宵加班值得炫耀吗？', dimension: 'struggleBelief', options: [
      { id: '1', text: '蠢货才炫耀这个', value: 1 },
      { id: '2', text: '有什么好炫耀的', value: 2 },
      { id: '3', text: '看情况', value: 3 },
      { id: '4', text: '值得，说明你努力', value: 4 },
      { id: '5', text: '我上个月通了12个宵，骄傲！', value: 5 },
    ]},
    { id: 'fb-26', type: 'likert-5', text: '年假快过期了，您会？', dimension: 'sacrificeWillingness', options: [
      { id: '1', text: '立刻休完，过期作废多可惜', value: 1 },
      { id: '2', text: '连休两周出去旅游', value: 2 },
      { id: '3', text: '拆成几天休', value: 3 },
      { id: '4', text: '太忙了，没时间休', value: 4 },
      { id: '5', text: '主动放弃年假，为公司做贡献', value: 5 },
    ]},
    { id: 'fb-27', type: 'likert-5', text: '下班前5分钟，老板说"开个短会"，您会？', dimension: 'overtimeAcceptance', options: [
      { id: '1', text: '抱歉我已经在地铁上了', value: 1 },
      { id: '2', text: '假装收拾东西溜了', value: 2 },
      { id: '3', text: '开就开吧，但会走神', value: 3 },
      { id: '4', text: '认真开会，不怕晚', value: 4 },
      { id: '5', text: '太好了！又能加班了！', value: 5 },
    ]},
    { id: 'fb-28', type: 'likert-5', text: '朋友约您周末吃饭，但公司说要团建，您会？', dimension: 'sacrificeWillingness', options: [
      { id: '1', text: '团建不去，朋友重要', value: 1 },
      { id: '2', text: '说身体不舒服不去', value: 2 },
      { id: '3', text: '去半天意思意思', value: 3 },
      { id: '4', text: '推掉朋友去团建', value: 4 },
      { id: '5', text: '主动组织大家团建', value: 5 },
    ]},
    { id: 'fb-29', type: 'likert-5', text: '老板说"以后公司上市了大家都财务自由"，您会？', dimension: 'bossWorship', options: [
      { id: '1', text: '画饼画了8年了还没熟', value: 1 },
      { id: '2', text: '听听就行，别当真', value: 2 },
      { id: '3', text: '但愿吧', value: 3 },
      { id: '4', text: '相信老板的承诺', value: 4 },
      { id: '5', text: '为了上市，996算什么！', value: 5 },
    ]},
    { id: 'fb-30', type: 'likert-5', text: '您怎么看待"摸鱼"这件事？', dimension: 'struggleBelief', options: [
      { id: '1', text: '上班不摸鱼等于白来', value: 1 },
      { id: '2', text: '摸鱼是打工人的基本权利', value: 2 },
      { id: '3', text: '完成任务就行', value: 3 },
      { id: '4', text: '摸鱼是对自己不负责任', value: 4 },
      { id: '5', text: '摸鱼的人都是公司的蛀虫', value: 5 },
    ]},
    { id: 'fb-31', type: 'likert-5', text: '公司要求"为客户提供7×24小时服务"，您怎么看？', dimension: 'overtimeAcceptance', options: [
      { id: '1', text: '客户也得睡觉啊', value: 1 },
      { id: '2', text: '下班后关机失联', value: 2 },
      { id: '3', text: '紧急情况才处理', value: 3 },
      { id: '4', text: '客户就是上帝', value: 4 },
      { id: '5', text: '凌晨3点也爬起来接客户电话', value: 5 },
    ]},
    { id: 'fb-32', type: 'likert-5', text: '拿到N+1赔偿金，您觉得愧疚吗？', dimension: 'gratitudeLevel', options: [
      { id: '1', text: '愧疚？我还嫌少呢', value: 1 },
      { id: '2', text: '这是我应得的', value: 2 },
      { id: '3', text: '没什么感觉', value: 3 },
      { id: '4', text: '有点愧疚，公司也不容易', value: 4 },
      { id: '5', text: '太愧疚了，把钱还给公司吧', value: 5 },
    ]},
    { id: 'fb-33', type: 'likert-5', text: '老板在办公室批评一个同事，您觉得？', dimension: 'bossWorship', options: [
      { id: '1', text: '老板又在撒气了', value: 1 },
      { id: '2', text: '老板做得有点过', value: 2 },
      { id: '3', text: '同事自己有问题', value: 3 },
      { id: '4', text: '批评是为了他好', value: 4 },
      { id: '5', text: '骂得好！换我我也骂', value: 5 },
    ]},
    { id: 'fb-34', type: 'likert-5', text: '"只要干不死，就往死里干"，这句话您认同吗？', dimension: 'struggleBelief', options: [
      { id: '1', text: '谁爱干谁干，我要活着', value: 1 },
      { id: '2', text: '这是传销话术吧', value: 2 },
      { id: '3', text: '太极端了', value: 3 },
      { id: '4', text: '年轻时就是要拼', value: 4 },
      { id: '5', text: '我的人生信条！', value: 5 },
    ]},
    { id: 'fb-35', type: 'likert-5', text: '父母重病需要照顾，公司说这个项目非您不可，您会？', dimension: 'sacrificeWillingness', options: [
      { id: '1', text: '项目没了可以再来，父母只有一个', value: 1 },
      { id: '2', text: '立刻请假回家照顾', value: 2 },
      { id: '3', text: '两边跑，辛苦一点', value: 3 },
      { id: '4', text: '远程办公+照顾父母', value: 4 },
      { id: '5', text: '忠孝不能两全，项目更重要', value: 5 },
    ]},
    { id: 'fb-36', type: 'likert-5', text: '公司搞"家文化"，您觉得？', dimension: 'gratitudeLevel', options: [
      { id: '1', text: '别跟我谈家，谈钱', value: 1 },
      { id: '2', text: '假的，都是套路', value: 2 },
      { id: '3', text: '有总比没有好', value: 3 },
      { id: '4', text: '公司氛围确实像家', value: 4 },
      { id: '5', text: '同事就是我的家人！', value: 5 },
    ]},
    { id: 'fb-37', type: 'likert-5', text: '凌晨2点，您在公司加班，会发朋友圈吗？', dimension: 'struggleBelief', options: [
      { id: '1', text: '丢人，还发朋友圈？', value: 1 },
      { id: '2', text: '绝对不发', value: 2 },
      { id: '3', text: '看心情', value: 3 },
      { id: '4', text: '发个定位证明在加班', value: 4 },
      { id: '5', text: '九宫格+鸡汤文案安排上', value: 5 },
    ]},
    { id: 'fb-38', type: 'likert-5', text: '新人准时下班，您会觉得？', dimension: 'overtimeAcceptance', options: [
      { id: '1', text: '做得对！就该这样', value: 1 },
      { id: '2', text: '羡慕啊，我也想', value: 2 },
      { id: '3', text: '年轻人就是不一样', value: 3 },
      { id: '4', text: '这新人态度有问题', value: 4 },
      { id: '5', text: '把他叫回来，教教他什么叫奋斗', value: 5 },
    ]},
    { id: 'fb-39', type: 'likert-5', text: '老板降薪了但说"等公司好起来加倍补偿大家"，您会？', dimension: 'bossWorship', options: [
      { id: '1', text: '鬼才信，立刻找下家', value: 1 },
      { id: '2', text: '先看看情况再说', value: 2 },
      { id: '3', text: '勉强接受', value: 3 },
      { id: '4', text: '相信老板的为人', value: 4 },
      { id: '5', text: '主动申请再降10%支持公司', value: 5 },
    ]},
    { id: 'fb-40', type: 'likert-5', text: '回顾您的职场生涯，加班对您的帮助大吗？', dimension: 'gratitudeLevel', options: [
      { id: '1', text: '除了掉头发什么都没得到', value: 1 },
      { id: '2', text: '没什么帮助', value: 2 },
      { id: '3', text: '不好说', value: 3 },
      { id: '4', text: '确实学到了很多', value: 4 },
      { id: '5', text: '没有当年的加班就没有今天的我', value: 5 },
    ]},
    { id: 'fb-41', type: 'likert-5', text: '老板在群里发"辛苦了"，您会？', dimension: 'bossWorship', options: [
      { id: '1', text: '不回，假装没看见', value: 1 },
      { id: '2', text: '回个表情符号', value: 2 },
      { id: '3', text: '回个"老板辛苦了"', value: 3 },
      { id: '4', text: '马上拍一段工作视频发群里', value: 4 },
      { id: '5', text: '写500字感想汇报今日成果', value: 5 },
    ]},
    { id: 'fb-42', type: 'likert-5', text: '法定节假日公司要求值班，您会？', dimension: 'sacrificeWillingness', options: [
      { id: '1', text: '不去，我要出去玩', value: 1 },
      { id: '2', text: '找借口推掉', value: 2 },
      { id: '3', text: '值一天意思意思', value: 3 },
      { id: '4', text: '主动承担值班任务', value: 4 },
      { id: '5', text: '7天全值，公司就是我的家', value: 5 },
    ]},
    { id: 'fb-43', type: 'likert-5', text: '您怎么看待"能者多劳"这句话？', dimension: 'struggleBelief', options: [
      { id: '1', text: '能者多劳=能者多得？', value: 1 },
      { id: '2', text: '就是PUA人的鬼话', value: 2 },
      { id: '3', text: '听听就好，别当真', value: 3 },
      { id: '4', text: '有能力就多承担一点', value: 4 },
      { id: '5', text: '这就是我的座右铭！', value: 5 },
    ]},
    { id: 'fb-44', type: 'likert-5', text: '周末收到老板微信，您会？', dimension: 'overtimeAcceptance', options: [
      { id: '1', text: '周一再说', value: 1 },
      { id: '2', text: '假装没看见', value: 2 },
      { id: '3', text: '几小时后再回', value: 3 },
      { id: '4', text: '看到就回', value: 4 },
      { id: '5', text: '秒回，立刻打开电脑', value: 5 },
    ]},
    { id: 'fb-45', type: 'likert-5', text: '公司说"要和公司共同成长"，您觉得？', dimension: 'gratitudeLevel', options: [
      { id: '1', text: '成长个屁，加薪才是真的', value: 1 },
      { id: '2', text: '都是画饼话术', value: 2 },
      { id: '3', text: '半信半疑', value: 3 },
      { id: '4', text: '确实应该共同进步', value: 4 },
      { id: '5', text: '公司好我才好！', value: 5 },
    ]},
    { id: 'fb-46', type: 'likert-5', text: '老板说"年轻人不要太计较得失"，您会？', dimension: 'bossWorship', options: [
      { id: '1', text: '不计较得失计较什么？计较你画的饼？', value: 1 },
      { id: '2', text: '嘴上答应，心里翻白眼', value: 2 },
      { id: '3', text: '听听就好', value: 3 },
      { id: '4', text: '老板说得有道理', value: 4 },
      { id: '5', text: '格局打开！无私奉献！', value: 5 },
    ]},
    { id: 'fb-47', type: 'likert-5', text: '同事都走了，您手上的活明天也能做完，您会？', dimension: 'overtimeAcceptance', options: [
      { id: '1', text: '立刻下班，多待一秒算我输', value: 1 },
      { id: '2', text: '收拾东西走人', value: 2 },
      { id: '3', text: '再摸10分钟鱼', value: 3 },
      { id: '4', text: '加会班做完再走', value: 4 },
      { id: '5', text: '干到半夜，卷死他们！', value: 5 },
    ]},
    { id: 'fb-48', type: 'likert-5', text: '您怎么看待"吃亏是福"这句话？', dimension: 'struggleBelief', options: [
      { id: '1', text: '福给你要不要？', value: 1 },
      { id: '2', text: '谁爱吃谁吃', value: 2 },
      { id: '3', text: '小亏可以接受', value: 3 },
      { id: '4', text: '吃亏确实能学到东西', value: 4 },
      { id: '5', text: '吃得苦中苦，方为人上人！', value: 5 },
    ]},
    { id: 'fb-49', type: 'likert-5', text: '发年终奖了，比预期少，您会？', dimension: 'gratitudeLevel', options: [
      { id: '1', text: '立刻找老板谈，不行就走', value: 1 },
      { id: '2', text: '心里不爽但先忍着', value: 2 },
      { id: '3', text: '今年大环境不好理解', value: 3 },
      { id: '4', text: '有总比没有好', value: 4 },
      { id: '5', text: '感谢老板还想着我！', value: 5 },
    ]},
    { id: 'fb-50', type: 'likert-5', text: '35岁了公司说"优化"，您会？', dimension: 'sacrificeWillingness', options: [
      { id: '1', text: 'N+1少一分都不行', value: 1 },
      { id: '2', text: '按劳动法来就行', value: 2 },
      { id: '3', text: '好聚好散', value: 3 },
      { id: '4', text: '理解公司的难处', value: 4 },
      { id: '5', text: '主动申请降薪留任！不能拖累公司！', value: 5 },
    ]},
  ],

  resultInterpretation: {
    templateType: 'enhanced',
    sections: [
      {
        id: 'cover',
        title: '💰 W.O.R.K 福报指数诊断报告',
        type: 'cover-card',
        content: `
          <div className="relative overflow-hidden rounded-2xl p-8 bg-gradient-to-br from-emerald-950 via-green-900 to-teal-800">
            <div className="absolute top-0 right-0 w-48 h-48 bg-green-400/10 rounded-full -translate-y-24 translate-x-24 blur-2xl" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-emerald-500/15 rounded-full translate-y-20 -translate-x-20 blur-xl" />
            
            <div className="relative z-10 text-center">
              <div className="text-7xl mb-4">🧑‍💻</div>
              <h2 className="text-3xl font-black text-white mb-2">\${result.levelName || '打工人'}</h2>
              <p className="text-green-200/80 text-lg mb-4">W.O.R.K 五维人格类型</p>
              
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur rounded-full px-8 py-4 border border-green-400/30">
                <span className="text-white">福报指数</span>
                <span className="text-4xl font-black text-green-300">\${result.totalScore || 50}</span>
                <span className="text-white/60">分</span>
              </div>
              
              <p className="text-green-200 mt-6 text-sm italic">
                " \${(result.totalScore || 50) >= 80 ? '重度福报深度患者' : 
                  (result.totalScore || 50) >= 60 ? '奋斗逼本逼' :
                  (result.totalScore || 50) >= 40 ? '资深搬砖人' :
                  (result.totalScore || 50) >= 20 ? '反PUA达人' :
                  '摸鱼学宗师'
                } "
              </p>
            </div>
          </div>
        `
      },

      {
        id: 'dimensions',
        title: '📊 W.O.R.K 五维雷达图',
        type: 'data-visualization',
        chartType: 'radar',
        dimensions: ['overtimeAcceptance', 'bossWorship', 'sacrificeWillingness', 'gratitudeLevel', 'struggleBelief'],
        dimensionNames: {
          overtimeAcceptance: '加班接受度',
          bossWorship: '老板崇拜度',
          sacrificeWillingness: '牺牲意愿',
          gratitudeLevel: '感恩等级',
          struggleBelief: '奋斗信仰'
        }
      },

      {
        id: 'diagnosis',
        title: '🔬 深度诊断',
        type: 'analysis-section',
        content: ''
      }
    ]
  }
}

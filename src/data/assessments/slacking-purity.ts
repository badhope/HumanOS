/**
 * ==============================================
 * 🐟 打工人摸鱼纯度测评 - 题目定义文件
 * ==============================================
 * 【测评设计】
 * - 总题数：25题
 * - 维度：5维度 × 5题/维度
 * - 题型：李克特5点量表
 * 
 * 【五大维度】【⚠️  与计算器严格对应！改了这里要改计算器！】
 * - meetingEvading: 逃会技巧（开会坐哪，从不发言）
 * - pretendWorking: 假装工作（老板来了的条件反射）
 * - toiletEscape: 厕所逃逸（带薪拉屎时长）
 * - overtimeResistance: 反加班（到点就走）
 * - gossipExpert: 八卦专家（茶水间消息网）
 */

import type { Assessment } from '../../types'
import { calculateSlacking } from '../../utils/calculators/slacking-calculator'

export const slackingPurityAssessment: Assessment = {
  id: 'slacking-purity',
  title: '打工人摸鱼纯度测评',
  description: '25道灵魂拷问，测出你的摸鱼纯度等级，解锁"摸鱼之神"还是"社畜本畜"成就。带薪拉屎、假装工作、逃会技巧...看看你到底有多会摸！',
  category: '职业发展',
  subcategory: '职场行为',
  difficulty: 'standard',
  duration: 4,
  quality: '娱乐',
  resultCalculator: calculateSlacking,
  questions: [
    { id: 'slack-1', type: 'likert-5', text: '开会时，你永远坐在哪个位置？', reverseScored: false, dimension: 'meetingEvading', options: [
      { id: '1', text: '坐在老板正对面，积极发言抢镜头', value: 1 },
      { id: '2', text: '中间区域，偶尔参与讨论', value: 2 },
      { id: '3', text: '靠角落，假装认真记笔记', value: 3 },
      { id: '4', text: '最后一排，全程低头看手机', value: 4 },
      { id: '5', text: '人在哪里？我根本就没去', value: 5 },
    ]},
    { id: 'slack-2', type: 'likert-5', text: '老板突然出现在身后，你的条件反射是？', reverseScored: false, dimension: 'pretendWorking', options: [
      { id: '1', text: '直接给他看我在做什么，坦荡荡', value: 1 },
      { id: '2', text: '稍微调整一下屏幕角度', value: 2 },
      { id: '3', text: '熟练地Alt+Tab切换窗口', value: 3 },
      { id: '4', text: 'Win+D秒回桌面，假装在刷新', value: 4 },
      { id: '5', text: '根本不会发现，我装了老板键雷达', value: 5 },
    ]},
    { id: 'slack-3', type: 'likert-5', text: '上班期间上厕所，你的操作是？', reverseScored: false, dimension: 'toiletEscape', options: [
      { id: '1', text: '速战速决，5分钟内回到工位', value: 1 },
      { id: '2', text: '正常节奏，10分钟左右', value: 2 },
      { id: '3', text: '15分钟起步，顺便刷完朋友圈', value: 3 },
      { id: '4', text: '半小时，刷完一集短视频', value: 4 },
      { id: '5', text: '带充电宝，不腿麻不出来', value: 5 },
    ]},
    { id: 'slack-4', type: 'likert-5', text: '老板说"今晚加个班"，你的第一反应是？', reverseScored: false, dimension: 'overtimeResistance', options: [
      { id: '1', text: '没问题老板！保证完成任务', value: 1 },
      { id: '2', text: '好的，心里暗自吐槽', value: 2 },
      { id: '3', text: '问清楚加班费再说', value: 3 },
      { id: '4', text: '假装没看见，下班直接跑', value: 4 },
      { id: '5', text: '已读不回，明天再说', value: 5 },
    ]},
    { id: 'slack-5', type: 'likert-5', text: '公司的八卦消息，你总是？', reverseScored: false, dimension: 'gossipExpert', options: [
      { id: '1', text: '最后一个知道的，与世隔绝', value: 1 },
      { id: '2', text: '别人说了我才知道', value: 2 },
      { id: '3', text: '知道不少，但不传播', value: 3 },
      { id: '4', text: '八卦群管理员，消息中转站', value: 4 },
      { id: '5', text: '八卦源头，我就是瓜主', value: 5 },
    ]},
    { id: 'slack-6', type: 'likert-5', text: '上午10点，你已经去了几次茶水间？', reverseScored: false, dimension: 'toiletEscape', options: [
      { id: '1', text: '还没去过，一直在工作', value: 1 },
      { id: '2', text: '1次，接了杯水', value: 2 },
      { id: '3', text: '2-3次，顺便活动活动', value: 3 },
      { id: '4', text: '4次以上，每层楼都逛了', value: 4 },
      { id: '5', text: '住在茶水间了，刚泡完咖啡', value: 5 },
    ]},
    { id: 'slack-7', type: 'likert-5', text: '你的鼠标键盘操作速度？', reverseScored: false, dimension: 'pretendWorking', options: [
      { id: '1', text: '正常速度，该干嘛干嘛', value: 1 },
      { id: '2', text: '有人路过时会敲得快一点', value: 2 },
      { id: '3', text: '老板在就疯狂敲键盘', value: 3 },
      { id: '4', text: '永远在高速敲击，虽然在聊微信', value: 4 },
      { id: '5', text: 'Word空白文档敲了一下午', value: 5 },
    ]},
    { id: 'slack-8', type: 'likert-5', text: '线上会议，你一般在做什么？', reverseScored: false, dimension: 'meetingEvading', options: [
      { id: '1', text: '全程开摄像头，积极参与', value: 1 },
      { id: '2', text: '认真听，偶尔发言', value: 2 },
      { id: '3', text: '开着会议，同时做别的事', value: 3 },
      { id: '4', text: '静音闭麦，刷剧打游戏', value: 4 },
      { id: '5', text: '人呢？已经退会半小时了', value: 5 },
    ]},
    { id: 'slack-9', type: 'likert-5', text: '下午三点，你的状态是？', reverseScored: false, dimension: 'overtimeResistance', options: [
      { id: '1', text: '精力充沛，还能再干8小时', value: 1 },
      { id: '2', text: '正常工作，等着下班', value: 2 },
      { id: '3', text: '开始收拾东西，准备准点跑路', value: 3 },
      { id: '4', text: '电脑已关机，就等打卡', value: 4 },
      { id: '5', text: '已在家，刚睡醒午觉', value: 5 },
    ]},
    { id: 'slack-10', type: 'likert-5', text: '同事突然离职，你最关心的是？', reverseScored: false, dimension: 'gossipExpert', options: [
      { id: '1', text: '他的工作会不会分给我', value: 1 },
      { id: '2', text: '祝他找到更好的工作', value: 2 },
      { id: '3', text: '薪资涨了多少', value: 3 },
      { id: '4', text: '到底是跟谁撕逼了', value: 4 },
      { id: '5', text: '快！告诉我所有细节！', value: 5 },
    ]},
    { id: 'slack-11', type: 'likert-5', text: '带薪拉屎的时间，你一般控制在？', reverseScored: false, dimension: 'toiletEscape', options: [
      { id: '1', text: '5分钟以内，绝不占用工作时间', value: 1 },
      { id: '2', text: '10分钟，正常生理需求', value: 2 },
      { id: '3', text: '20分钟，这是基本操作', value: 3 },
      { id: '4', text: '30分钟以上，赚回本钱', value: 4 },
      { id: '5', text: '腿麻站不起来了，叫人来扶', value: 5 },
    ]},
    { id: 'slack-12', type: 'likert-5', text: '周五下午下班前10分钟安排的工作，你会？', reverseScored: false, dimension: 'overtimeResistance', options: [
      { id: '1', text: '加班也要做完再走', value: 1 },
      { id: '2', text: '下周一再说吧', value: 2 },
      { id: '3', text: '假装没看见，周一再说没收到', value: 3 },
      { id: '4', text: '直接回复：我已经下班了', value: 4 },
      { id: '5', text: '周四就请假了，谁也找不到我', value: 5 },
    ]},
    { id: 'slack-13', type: 'likert-5', text: '如何评价工作群里的"收到请回复"？', reverseScored: false, dimension: 'pretendWorking', options: [
      { id: '1', text: '秒回！这是职业素养', value: 1 },
      { id: '2', text: '看到了就回', value: 2 },
      { id: '3', text: '等别人回了我再回', value: 3 },
      { id: '4', text: '选择性失明，从不回复', value: 4 },
      { id: '5', text: '群消息已屏蔽，什么群？', value: 5 },
    ]},
    { id: 'slack-14', type: 'likert-5', text: '公司团建，你的选择是？', reverseScored: false, dimension: 'meetingEvading', options: [
      { id: '1', text: '组织者兼气氛组组长', value: 1 },
      { id: '2', text: '积极参与，开心玩耍', value: 2 },
      { id: '3', text: '人在心不在，玩手机为主', value: 3 },
      { id: '4', text: '找借口不去，宁愿在家躺平', value: 4 },
      { id: '5', text: '团建？我直接请假休年假', value: 5 },
    ]},
    { id: 'slack-15', type: 'likert-5', text: '新来的实习生比你还懂摸鱼，你会？', reverseScored: false, dimension: 'gossipExpert', options: [
      { id: '1', text: '举报他不务正业', value: 1 },
      { id: '2', text: '假装没看见', value: 2 },
      { id: '3', text: '跟他交流经验', value: 3 },
      { id: '4', text: '拜他为师，学习新技巧', value: 4 },
      { id: '5', text: '直接拉入伙，成立摸鱼教', value: 5 },
    ]},
    { id: 'slack-16', type: 'likert-5', text: '老板问"周末有空吗"，你的第一反应是？', reverseScored: false, dimension: 'overtimeResistance', options: [
      { id: '1', text: '有空老板！随时待命', value: 1 },
      { id: '2', text: '怎么了老板？（心里一紧）', value: 2 },
      { id: '3', text: '看情况，先问清楚什么事', value: 3 },
      { id: '4', text: '已有安排，假装没看见', value: 4 },
      { id: '5', text: '周末手机一律关机', value: 5 },
    ]},
    { id: 'slack-17', type: 'likert-5', text: '午休时间你一般睡多久？', reverseScored: false, dimension: 'toiletEscape', options: [
      { id: '1', text: '半小时，起来继续干活', value: 1 },
      { id: '2', text: '1小时，正常作息', value: 2 },
      { id: '3', text: '1.5小时，睡饱才有力气摸鱼', value: 3 },
      { id: '4', text: '2小时以上，自然醒', value: 4 },
      { id: '5', text: '直接睡到下班', value: 5 },
    ]},
    { id: 'slack-18', type: 'likert-5', text: '你电脑上的工作区有几个桌面？', reverseScored: false, dimension: 'pretendWorking', options: [
      { id: '1', text: '就一个桌面，坦坦荡荡', value: 1 },
      { id: '2', text: '2个，简单分类', value: 2 },
      { id: '3', text: '3个以上，区分工作和娱乐', value: 3 },
      { id: '4', text: '专门有一个桌面用来假装工作', value: 4 },
      { id: '5', text: '老板键一键切换6个桌面无缝衔接', value: 5 },
    ]},
    { id: 'slack-19', type: 'likert-5', text: '需要讨论的工作，你一般怎么处理？', reverseScored: false, dimension: 'meetingEvading', options: [
      { id: '1', text: '马上组织会议讨论', value: 1 },
      { id: '2', text: '开个短会快速解决', value: 2 },
      { id: '3', text: '能打字说就不开会', value: 3 },
      { id: '4', text: '找借口不参加会议', value: 4 },
      { id: '5', text: '我还有事先走了，你们讨论完告诉我结果', value: 5 },
    ]},
    { id: 'slack-20', type: 'likert-5', text: '关于公司的小道消息，你一般是？', reverseScored: false, dimension: 'gossipExpert', options: [
      { id: '1', text: '从不关心，两耳不闻窗外事', value: 1 },
      { id: '2', text: '听了就忘了，不往心里去', value: 2 },
      { id: '3', text: '默默吃瓜，从不外传', value: 3 },
      { id: '4', text: '选择性告诉几个要好的同事', value: 4 },
      { id: '5', text: '消息全网通，就没有我不知道的', value: 5 },
    ]},
    { id: 'slack-21', type: 'likert-5', text: '下班前半小时发现做不完了，你会？', reverseScored: false, dimension: 'overtimeResistance', options: [
      { id: '1', text: '加班也要做完', value: 1 },
      { id: '2', text: '加快速度，争取准点下班', value: 2 },
      { id: '3', text: '明天再说吧，天大地大下班最大', value: 3 },
      { id: '4', text: '故意放慢速度，等着明天做', value: 4 },
      { id: '5', text: '收拾东西直接跑路，做不完是明天的事', value: 5 },
    ]},
    { id: 'slack-22', type: 'likert-5', text: '站在工位上远远看到老板过来，你会？', reverseScored: false, dimension: 'pretendWorking', options: [
      { id: '1', text: '热情打招呼', value: 1 },
      { id: '2', text: '继续做自己的事', value: 2 },
      { id: '3', text: '切换到工作界面', value: 3 },
      { id: '4', text: '疯狂敲击键盘假装很忙', value: 4 },
      { id: '5', text: '钻进厕所躲10分钟', value: 5 },
    ]},
    { id: 'slack-23', type: 'likert-5', text: '公司培训/讲座，你一般？', reverseScored: false, dimension: 'meetingEvading', options: [
      { id: '1', text: '坐在第一排认真做笔记', value: 1 },
      { id: '2', text: '坐在中间认真听', value: 2 },
      { id: '3', text: '坐在最后一排玩手机', value: 3 },
      { id: '4', text: '签到完就溜了', value: 4 },
      { id: '5', text: '根本不去，谁爱去谁去', value: 5 },
    ]},
    { id: 'slack-24', type: 'likert-5', text: '发工资前一天摸鱼，你会？', reverseScored: false, dimension: 'toiletEscape', options: [
      { id: '1', text: '更加努力工作，不能被发现', value: 1 },
      { id: '2', text: '稍微收敛一点', value: 2 },
      { id: '3', text: '和平常一样', value: 3 },
      { id: '4', text: '明天就发工资了，今天必须摸回来', value: 4 },
      { id: '5', text: '直接带薪休假一天', value: 5 },
    ]},
    { id: 'slack-25', type: 'likert-5', text: '发现同事在摸鱼，你会？', reverseScored: false, dimension: 'gossipExpert', options: [
      { id: '1', text: '向老板举报', value: 1 },
      { id: '2', text: '提醒他老板来了', value: 2 },
      { id: '3', text: '假装没看见', value: 3 },
      { id: '4', text: '加入他一起摸', value: 4 },
      { id: '5', text: '拍照发摸鱼群，耻辱柱上墙', value: 5 },
    ]},
    { id: 'slack-26', type: 'likert-5', text: '远程办公时，摄像头一般开多久？', reverseScored: false, dimension: 'meetingEvading', options: [
      { id: '1', text: '全程开着摄像头', value: 1 },
      { id: '2', text: '只有发言时开', value: 2 },
      { id: '3', text: '开着但人不在镜头前', value: 3 },
      { id: '4', text: '找借口说摄像头坏了', value: 4 },
      { id: '5', text: '会议开始就闭麦关摄像头', value: 5 },
    ]},
    { id: 'slack-27', type: 'likert-5', text: '改需求的邮件下班前5分钟发来，你会？', reverseScored: false, dimension: 'overtimeResistance', options: [
      { id: '1', text: '立刻处理，今晚改完', value: 1 },
      { id: '2', text: '加个班，争取弄完', value: 2 },
      { id: '3', text: '明天再说吧', value: 3 },
      { id: '4', text: '假装没看到，周一再说', value: 4 },
      { id: '5', text: '已读不回，就说没收到', value: 5 },
    ]},
    { id: 'slack-28', type: 'likert-5', text: '领导在大群@你，你一般多久回复？', reverseScored: false, dimension: 'pretendWorking', options: [
      { id: '1', text: '秒回，这是职业素养', value: 1 },
      { id: '2', text: '5分钟内回复', value: 2 },
      { id: '3', text: '10-15分钟再回，显得我在忙', value: 3 },
      { id: '4', text: '等别人回了我再回', value: 4 },
      { id: '5', text: '下班了才回，说刚看到', value: 5 },
    ]},
    { id: 'slack-29', type: 'likert-5', text: '一天下来你大概要接几次水？', reverseScored: false, dimension: 'toiletEscape', options: [
      { id: '1', text: '1-2次，专注工作', value: 1 },
      { id: '2', text: '3-4次，正常节奏', value: 2 },
      { id: '3', text: '5-6次，顺便散步', value: 3 },
      { id: '4', text: '7-8次，每层都逛一遍', value: 4 },
      { id: '5', text: '接水绕路10分钟，主打一个散步', value: 5 },
    ]},
    { id: 'slack-30', type: 'likert-5', text: '同事偷偷跟你说"听说..."，你的反应是？', reverseScored: false, dimension: 'gossipExpert', options: [
      { id: '1', text: '不听不听，王八念经', value: 1 },
      { id: '2', text: '哦，听完就忘', value: 2 },
      { id: '3', text: '认真听，但是不传播', value: 3 },
      { id: '4', text: '拿出小本本记下来', value: 4 },
      { id: '5', text: '快说快说！我把所有人都拉进来', value: 5 },
    ]},
    { id: 'slack-31', type: 'likert-5', text: '客户说"下班前给我就行"，你会？', reverseScored: false, dimension: 'overtimeResistance', options: [
      { id: '1', text: '立刻动手，中午就给', value: 1 },
      { id: '2', text: '下班前一定交', value: 2 },
      { id: '3', text: '明天上班前给就行', value: 3 },
      { id: '4', text: '后天再说，他不急的', value: 4 },
      { id: '5', text: '他都下班了，下周再说', value: 5 },
    ]},
    { id: 'slack-32', type: 'likert-5', text: '部门合影，你会站在哪里？', reverseScored: false, dimension: 'meetingEvading', options: [
      { id: '1', text: 'C位，积极参与', value: 1 },
      { id: '2', text: '前排中间位置', value: 2 },
      { id: '3', text: '后排边缘位置', value: 3 },
      { id: '4', text: '找借口不去', value: 4 },
      { id: '5', text: '人呢？合影时早就溜了', value: 5 },
    ]},
    { id: 'slack-33', type: 'likert-5', text: '老板说"大家随便提意见"，你会？', reverseScored: false, dimension: 'pretendWorking', options: [
      { id: '1', text: '积极发言，提出改进建议', value: 1 },
      { id: '2', text: '提一些无关痛痒的建议', value: 2 },
      { id: '3', text: '领导说得对，我没意见', value: 3 },
      { id: '4', text: '沉默是金，绝不说话', value: 4 },
      { id: '5', text: '疯狂点头，心里：你开心就好', value: 5 },
    ]},
    { id: 'slack-34', type: 'likert-5', text: '楼梯间遇到其他部门的人，你会？', reverseScored: false, dimension: 'toiletEscape', options: [
      { id: '1', text: '热情打招呼聊天', value: 1 },
      { id: '2', text: '礼貌点头示意', value: 2 },
      { id: '3', text: '假装看手机', value: 3 },
      { id: '4', text: '多等一层电梯避开', value: 4 },
      { id: '5', text: '直接爬楼梯绕三层楼', value: 5 },
    ]},
    { id: 'slack-35', type: 'likert-5', text: '公司发了匿名吐槽问卷，你会？', reverseScored: false, dimension: 'gossipExpert', options: [
      { id: '1', text: '全五星好评', value: 1 },
      { id: '2', text: '随便填填，大家好才是真的好', value: 2 },
      { id: '3', text: '客观评价，有好有坏', value: 3 },
      { id: '4', text: '真实吐槽，反正匿名', value: 4 },
      { id: '5', text: '万字小作文，每条都截图发群', value: 5 },
    ]},
  ],
}

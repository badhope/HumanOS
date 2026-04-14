/**
 * ==============================================
 * 📱 网瘾程度深度测评 - 题目定义文件
 * ==============================================
 * 【测评设计】
 * - 总题数：25题
 * - 维度：5维度 × 5题/维度
 * - 题型：李克特5点量表
 * 
 * 【五大维度】【⚠️  与计算器严格对应！改了这里要改计算器！】
 * - dailyUsage: 日均使用时长（现实时间流逝量）
 * - socialMedia: 社交媒体依赖（点赞的魔性吸引力）
 * - gaming: 游戏沉迷度（再来亿把的决心）
 * - fomo: 错失恐惧（一分钟不看手机就慌）
 * - offlineAbility: 线下生存能力（脱离手机还能活吗）
 */

import type { Assessment } from '../../types'
import { calculateInternetAddiction } from '../../utils/calculators/internet-addiction-calculator'

export const internetAddictionAssessment: Assessment = {
  id: 'internet-addiction',
  title: '网瘾程度深度测评',
  description: '25道灵魂拷问，测出你的网瘾严重程度。从数字隐士到赛博飞升，看看你在互联网世界修仙到哪个段位了！',
  category: '娱乐趣味',
  difficulty: 'standard',
  duration: 4,
  quality: '娱乐',
  resultCalculator: calculateInternetAddiction,
  questions: [
    { id: 'net-1', type: 'likert-5', text: '你每天手机屏幕使用时间大约是？', reverseScored: false, dimension: 'dailyUsage', options: [
      { id: '1', text: '不到2小时，手机只是打电话的', value: 1 },
      { id: '2', text: '2-4小时，正常使用', value: 2 },
      { id: '3', text: '4-8小时，手机长在手上了', value: 3 },
      { id: '4', text: '8-12小时，除了睡觉都在刷', value: 4 },
      { id: '5', text: '12小时以上，充电线就是输血管', value: 5 },
    ]},
    { id: 'net-2', type: 'likert-5', text: '晚上睡觉前最后一件事和醒后第一件事是？', reverseScored: false, dimension: 'dailyUsage', options: [
      { id: '1', text: '关灯睡觉/起床喝水', value: 1 },
      { id: '2', text: '看一眼时间', value: 2 },
      { id: '3', text: '刷5分钟手机', value: 3 },
      { id: '4', text: '刷半小时以上', value: 4 },
      { id: '5', text: '我是抱着手机睡着的', value: 5 },
    ]},
    { id: 'net-3', type: 'likert-5', text: '朋友圈/微博/小红书/抖音，你每天刷多少？', reverseScored: false, dimension: 'socialMedia', options: [
      { id: '1', text: '我没有这些APP', value: 1 },
      { id: '2', text: '想起来才看一眼', value: 2 },
      { id: '3', text: '每天各刷十几分钟', value: 3 },
      { id: '4', text: '每个都要刷一小时以上', value: 4 },
      { id: '5', text: '吃瓜第一线，5分钟不刷就落伍', value: 5 },
    ]},
    { id: 'net-4', type: 'likert-5', text: '打游戏时女朋友/男朋友打电话来，你会？', reverseScored: false, dimension: 'gaming', options: [
      { id: '1', text: '立刻接，游戏算什么', value: 1 },
      { id: '2', text: '接完这波团再说', value: 2 },
      { id: '3', text: '挂掉，发消息说在忙', value: 3 },
      { id: '4', text: '静音，假装没看见', value: 4 },
      { id: '5', text: '分手吧，影响我输出了', value: 5 },
    ]},
    { id: 'net-5', type: 'likert-5', text: '半小时没看手机，你会？', reverseScored: false, dimension: 'fomo', options: [
      { id: '1', text: '没感觉，谁没事看手机', value: 1 },
      { id: '2', text: '拿过来解锁看一眼', value: 2 },
      { id: '3', text: '感觉错过了什么重要消息', value: 3 },
      { id: '4', text: '开始焦虑，反复刷消息列表', value: 4 },
      { id: '5', text: '直接心梗，手机丢了？', value: 5 },
    ]},
    { id: 'net-6', type: 'likert-5', text: '出门手机快没电了，你会？', reverseScored: false, dimension: 'offlineAbility', options: [
      { id: '1', text: '没事，回家再充', value: 1 },
      { id: '2', text: '省着点用', value: 2 },
      { id: '3', text: '找地方借个充电宝', value: 3 },
      { id: '4', text: '必须回家拿充电器，不去了', value: 4 },
      { id: '5', text: '原地去世，没有电怎么活', value: 5 },
    ]},
    { id: 'net-7', type: 'likert-5', text: '微信未读小红点，你一定要？', reverseScored: false, dimension: 'fomo', options: [
      { id: '1', text: '从来不管，攒着过年', value: 1 },
      { id: '2', text: '看到了就点掉', value: 2 },
      { id: '3', text: '必须全部点掉才舒服', value: 3 },
      { id: '4', text: '看到红点就焦虑，立刻点进去', value: 4 },
      { id: '5', text: '为了红点我可以卸载APP', value: 5 },
    ]},
    { id: 'net-8', type: 'likert-5', text: '周末休息，你一般在做什么？', reverseScored: false, dimension: 'gaming', options: [
      { id: '1', text: '出门运动/聚会/旅游', value: 1 },
      { id: '2', text: '看看书看看电影', value: 2 },
      { id: '3', text: '打几局游戏放松一下', value: 3 },
      { id: '4', text: '肝一天游戏，外卖都忘了点', value: 4 },
      { id: '5', text: '不下床，吃喝拉撒都在电脑前', value: 5 },
    ]},
    { id: 'net-9', type: 'likert-5', text: '朋友聚会吃饭，大家都在？', reverseScored: false, dimension: 'socialMedia', options: [
      { id: '1', text: '畅聊人生理想', value: 1 },
      { id: '2', text: '正常聊天，偶尔看手机', value: 2 },
      { id: '3', text: '边吃边各自刷手机', value: 3 },
      { id: '4', text: '全程沉默玩手机，零交流', value: 4 },
      { id: '5', text: '聚餐？我们都是连麦云聚餐', value: 5 },
    ]},
    { id: 'net-10', type: 'likert-5', text: '上厕所一定要带手机吗？', reverseScored: false, dimension: 'dailyUsage', options: [
      { id: '1', text: '从来不拿，专心拉屎', value: 1 },
      { id: '2', text: '忘记带就算了', value: 2 },
      { id: '3', text: '必须带，不然太无聊', value: 3 },
      { id: '4', text: '没手机我拉不出来', value: 4 },
      { id: '5', text: '腿麻了还在刷，蹲到虚脱', value: 5 },
    ]},
    { id: 'net-11', type: 'likert-5', text: '遇到问题第一反应是？', reverseScored: false, dimension: 'offlineAbility', options: [
      { id: '1', text: '自己思考解决', value: 1 },
      { id: '2', text: '问身边的人', value: 2 },
      { id: '3', text: '百度一下', value: 3 },
      { id: '4', text: '知乎/小红书/抖音搜攻略', value: 4 },
      { id: '5', text: '没有网我就是个废人', value: 5 },
    ]},
    { id: 'net-12', type: 'likert-5', text: '看到微博热搜"爆"了，你第一反应是？', reverseScored: false, dimension: 'fomo', options: [
      { id: '1', text: '关我屁事', value: 1 },
      { id: '2', text: '刷到了就看一眼', value: 2 },
      { id: '3', text: '点进去看看什么瓜', value: 3 },
      { id: '4', text: '立刻转发评论站队', value: 4 },
      { id: '5', text: '我就是那个放瓜的人', value: 5 },
    ]},
    { id: 'net-13', type: 'likert-5', text: '你的游戏皮肤/装备花了多少钱？', reverseScored: false, dimension: 'gaming', options: [
      { id: '1', text: '我从来不打游戏', value: 1 },
      { id: '2', text: '零氪玩家，白嫖万岁', value: 2 },
      { id: '3', text: '几百块，首充月卡党', value: 3 },
      { id: '4', text: '几千块，限定皮肤必买', value: 4 },
      { id: '5', text: '一辆首付，心悦三在向我招手', value: 5 },
    ]},
    { id: 'net-14', type: 'likert-5', text: '现在让你断网一天，你能做到吗？', reverseScored: false, dimension: 'offlineAbility', options: [
      { id: '1', text: '太简单了，我经常这样', value: 1 },
      { id: '2', text: '可以，看看书也挺好', value: 2 },
      { id: '3', text: '有点难受，但可以坚持', value: 3 },
      { id: '4', text: '不行！会死人的！', value: 4 },
      { id: '5', text: '建议直接送ICU抢救', value: 5 },
    ]},
    { id: 'net-15', type: 'likert-5', text: '你现在正在做什么？', reverseScored: false, dimension: 'dailyUsage', options: [
      { id: '1', text: '在看书，顺便做个测评', value: 1 },
      { id: '2', text: '工作间隙摸鱼', value: 2 },
      { id: '3', text: '躺在床上刷手机', value: 3 },
      { id: '4', text: '一边打游戏一边做测评', value: 4 },
      { id: '5', text: '蹲在厕所刷手机做测评', value: 5 },
    ]},
    { id: 'net-16', type: 'likert-5', text: '朋友跟你说一个八卦，你的第一反应是？', reverseScored: false, dimension: 'fomo', options: [
      { id: '1', text: '哦，挺好的', value: 1 },
      { id: '2', text: '有点好奇，但不追问', value: 2 },
      { id: '3', text: '赶紧告诉我细节！', value: 3 },
      { id: '4', text: '马上搜一下有没有相关瓜', value: 4 },
      { id: '5', text: '我早就知道了，比你知道的还多', value: 5 },
    ]},
    { id: 'net-17', type: 'likert-5', text: '连续玩多久游戏你会停下来休息？', reverseScored: false, dimension: 'gaming', options: [
      { id: '1', text: '半小时，最多一小时', value: 1 },
      { id: '2', text: '打一两局就休息', value: 2 },
      { id: '3', text: '赢一把就睡（一般3小时）', value: 3 },
      { id: '4', text: '不上分不下播，通宵都有可能', value: 4 },
      { id: '5', text: '休息是什么？我就是电子竞技本身', value: 5 },
    ]},
    { id: 'net-18', type: 'likert-5', text: '你关注了多少个博主/KOL/UP主？', reverseScored: false, dimension: 'socialMedia', options: [
      { id: '1', text: '不到10个，基本不看', value: 1 },
      { id: '2', text: '几十位，随便看看', value: 2 },
      { id: '3', text: '上百位，每天都刷', value: 3 },
      { id: '4', text: '几百位，关注列表比通讯录还长', value: 4 },
      { id: '5', text: '几千位，我是平台VIP鉴黄师', value: 5 },
    ]},
    { id: 'net-19', type: 'likert-5', text: '和现实朋友约见面，你们一般会？', reverseScored: false, dimension: 'offlineAbility', options: [
      { id: '1', text: '畅聊几小时，手机全程静音', value: 1 },
      { id: '2', text: '正常聊天，偶尔看手机', value: 2 },
      { id: '3', text: '找个有WIFI的地方各自玩手机', value: 3 },
      { id: '4', text: '拍张合照发朋友圈，然后各玩各的', value: 4 },
      { id: '5', text: '约什么见面，连麦打游戏不好吗？', value: 5 },
    ]},
    { id: 'net-20', type: 'likert-5', text: '凌晨3点你一般在干嘛？', reverseScored: false, dimension: 'dailyUsage', options: [
      { id: '1', text: '早就睡了，养生达人', value: 1 },
      { id: '2', text: '刚准备睡，刷最后5分钟', value: 2 },
      { id: '3', text: '精神抖擞，刷短视频停不下来', value: 3 },
      { id: '4', text: '打游戏/追剧/看直播中', value: 4 },
      { id: '5', text: '天怎么亮了？我才刚打开手机啊！', value: 5 },
    ]},
    { id: 'net-21', type: 'likert-5', text: '看到"仅三天可见"的朋友圈，你会？', reverseScored: false, dimension: 'socialMedia', options: [
      { id: '1', text: '无所谓，我不看朋友圈', value: 1 },
      { id: '2', text: '三天就三天呗', value: 2 },
      { id: '3', text: '有点好奇，但不会说什么', value: 3 },
      { id: '4', text: '这个人肯定有问题', value: 4 },
      { id: '5', text: '立刻找共同好友打听发生了什么', value: 5 },
    ]},
    { id: 'net-22', type: 'likert-5', text: '手机不在视线范围内，你会？', reverseScored: false, dimension: 'fomo', options: [
      { id: '1', text: '完全没感觉', value: 1 },
      { id: '2', text: '偶尔想拿起来看看', value: 2 },
      { id: '3', text: '总觉得错过了什么消息', value: 3 },
      { id: '4', text: '浑身难受，必须拿在手里', value: 4 },
      { id: '5', text: '洗澡都要带进浴室放歌', value: 5 },
    ]},
    { id: 'net-23', type: 'likert-5', text: '对于"电竞算不算体育"，你的看法是？', reverseScored: false, dimension: 'gaming', options: [
      { id: '1', text: '不算，就是玩物丧志', value: 1 },
      { id: '2', text: '就是个游戏而已', value: 2 },
      { id: '3', text: '算吧，也挺考验反应的', value: 3 },
      { id: '4', text: '当然算！电子竞技也是体育！', value: 4 },
      { id: '5', text: '这是人类的未来！我愿意为之奉献一生！', value: 5 },
    ]},
    { id: 'net-24', type: 'likert-5', text: '你能分清网络和现实的区别吗？', reverseScored: false, dimension: 'offlineAbility', options: [
      { id: '1', text: '当然，完全分的清', value: 1 },
      { id: '2', text: '基本没问题', value: 2 },
      { id: '3', text: '偶尔会把梗带到现实里', value: 3 },
      { id: '4', text: '经常把网上的事当真生气', value: 4 },
      { id: '5', text: '网络才是现实，现实就是个噩梦', value: 5 },
    ]},
    { id: 'net-25', type: 'likert-5', text: '如果让你选择，你愿意？', reverseScored: false, dimension: 'socialMedia', options: [
      { id: '1', text: '没有网络，回归田园生活', value: 1 },
      { id: '2', text: '每天少量上网即可', value: 2 },
      { id: '3', text: '正常生活工作，闲暇上网', value: 3 },
      { id: '4', text: '永远在线，信息就是生命', value: 4 },
      { id: '5', text: '意识上传互联网，赛博飞升！', value: 5 },
    ]},
    { id: 'net-26', type: 'likert-5', text: '断网24小时，你的反应是？', reverseScored: false, dimension: 'dailyUsage', options: [
      { id: '1', text: '正好清净一天', value: 1 },
      { id: '2', text: '看看书，没什么影响', value: 2 },
      { id: '3', text: '偶尔掏出手机看看', value: 3 },
      { id: '4', text: '坐立不安，魂不守舍', value: 4 },
      { id: '5', text: '报警！这是生存危机！', value: 5 },
    ]},
    { id: 'net-27', type: 'likert-5', text: '微信群@你，你一般多久回复？', reverseScored: false, dimension: 'socialMedia', options: [
      { id: '1', text: '看到了也懒得回', value: 1 },
      { id: '2', text: '几小时后再说', value: 2 },
      { id: '3', text: '半小时内回复', value: 3 },
      { id: '4', text: '5分钟内必回', value: 4 },
      { id: '5', text: '秒回！手机响立刻看', value: 5 },
    ]},
    { id: 'net-28', type: 'likert-5', text: '打游戏连跪10把，你会？', reverseScored: false, dimension: 'gaming', options: [
      { id: '1', text: '心态平和，退了做别的', value: 1 },
      { id: '2', text: '今天运气不好，明天再说', value: 2 },
      { id: '3', text: '再来最后一把！', value: 3 },
      { id: '4', text: '不赢一把今天不睡了', value: 4 },
      { id: '5', text: '砸键盘！今晚跟它杠上了', value: 5 },
    ]},
    { id: 'net-29', type: 'likert-5', text: '刷短视频，你的自制力是？', reverseScored: false, dimension: 'fomo', options: [
      { id: '1', text: '从来不刷，浪费时间', value: 1 },
      { id: '2', text: '每天控制在15分钟内', value: 2 },
      { id: '3', text: '半小时左右收手', value: 3 },
      { id: '4', text: '一刷就是两小时起步', value: 4 },
      { id: '5', text: '天怎么亮了？！', value: 5 },
    ]},
    { id: 'net-30', type: 'likert-5', text: '跟人吵架评论区对线，你会？', reverseScored: false, dimension: 'realityConfusion', options: [
      { id: '1', text: '划走，根本不在意', value: 1 },
      { id: '2', text: '呵呵一笑，关浏览器', value: 2 },
      { id: '3', text: '回复一句就跑', value: 3 },
      { id: '4', text: '必须辩赢为止', value: 4 },
      { id: '5', text: '查他IP人肉，不死不休', value: 5 },
    ]},
    { id: 'net-31', type: 'likert-5', text: '睡觉前最后一件事和醒来第一件事？', reverseScored: false, dimension: 'dailyUsage', options: [
      { id: '1', text: '看书/喝水，正常作息', value: 1 },
      { id: '2', text: '很少看手机', value: 2 },
      { id: '3', text: '看一眼时间消息', value: 3 },
      { id: '4', text: '刷完朋友圈才能睡', value: 4 },
      { id: '5', text: '手机就在枕头底下攥着', value: 5 },
    ]},
    { id: 'net-32', type: 'likert-5', text: '新出的爆款游戏，你一般多久玩？', reverseScored: false, dimension: 'gaming', options: [
      { id: '1', text: '从来不玩游戏', value: 1 },
      { id: '2', text: '半年后再说吧', value: 2 },
      { id: '3', text: '打折了再买', value: 3 },
      { id: '4', text: '发售当天入手', value: 4 },
      { id: '5', text: '预购！请假在家等解锁', value: 5 },
    ]},
    { id: 'net-33', type: 'likert-5', text: '3分钟不碰手机，你能忍多久？', reverseScored: false, dimension: 'attention', options: [
      { id: '1', text: '一天不碰也没事', value: 1 },
      { id: '2', text: '几小时没问题', value: 2 },
      { id: '3', text: '一小时就想看看', value: 3 },
      { id: '4', text: '10分钟必须摸一下', value: 4 },
      { id: '5', text: '手机不在手，跟裸体一样', value: 5 },
    ]},
    { id: 'net-34', type: 'likert-5', text: '看到热搜，你的第一反应是？', reverseScored: false, dimension: 'offlineAbility', options: [
      { id: '1', text: '跟我有什么关系', value: 1 },
      { id: '2', text: '吃个瓜就走', value: 2 },
      { id: '3', text: '发表一下自己的观点', value: 3 },
      { id: '4', text: '转发站队，必须骂两句', value: 4 },
      { id: '5', text: '这是今天最重要的事！', value: 5 },
    ]},
    { id: 'net-35', type: 'likert-5', text: '朋友聚会，大家都在玩手机，你会？', reverseScored: false, dimension: 'socialMedia', options: [
      { id: '1', text: '收起手机，聊天为主', value: 1 },
      { id: '2', text: '偶尔看看手机', value: 2 },
      { id: '3', text: '边聊边玩，两不误', value: 3 },
      { id: '4', text: '低头刷手机，谁也不理', value: 4 },
      { id: '5', text: '出来玩不就是换个地方玩手机吗？', value: 5 },
    ]},
  ],
}

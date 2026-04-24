/**
 * ==============================================
 * 🔥 性经验指数测评 - 题目定义文件
 * ==============================================
 * 【测评设计】娱乐向，非专业学术测评
 * - 总题数：25题
 * - 维度：5维度 × 5题/维度
 * - 题型：李克特5点量表
 * 
 * 【五大维度】【⚠️  与计算器严格对应！改了这里要改计算器！】
 * - practical: 实战经验（实际操作经验值）
 * - theoretical: 理论深度（知识库存量）
 * - technique: 技术水平（专业业务能力）
 * - diversity: 玩法多样性（见多识广度）
 * - openness: 观念开放度（接受程度）
 */

import type { Assessment } from '../../types'
import { calculateSexualExperience } from '../../utils/calculators/sexual-experience-calculator'

export const sexualExperienceAssessment: Assessment = {
  id: 'sexual-experience',
  title: '性经验指数测评',
  description: '25道灵魂拷问，测出你的老司机等级。从白纸一张到都市传说，看看你在情场到底是什么段位。纯爱战士和老司机请各就各位！',
  category: '娱乐趣味',
  subcategory: '亲密探索',
  difficulty: 'standard',
  duration: 4,
  quality: '娱乐',
  resultCalculator: calculateSexualExperience,
  questions: [
    { id: 'sex-1', type: 'likert-5', text: '第一次亲密接触是在什么时候？', reverseScored: false, dimension: 'practical', options: [
      { id: '1', text: '母胎solo，还没牵过手', value: 1 },
      { id: '2', text: '大学期间，纯纯的恋爱', value: 2 },
      { id: '3', text: '高中毕业/大学刚入学', value: 3 },
      { id: '4', text: '高中期间，早恋选手', value: 4 },
      { id: '5', text: '初中/更早，启蒙大师', value: 5 },
    ]},
    { id: 'sex-2', type: 'likert-5', text: '看过的"学习资料"大概有多少？', reverseScored: false, dimension: 'theoretical', options: [
      { id: '1', text: '完全不知道是什么', value: 1 },
      { id: '2', text: '不到10部，入门级', value: 2 },
      { id: '3', text: '几十部，看过一些', value: 3 },
      { id: '4', text: '几百部，阅片无数', value: 4 },
      { id: '5', text: '我硬盘里的东西可以开班教学了', value: 5 },
    ]},
    { id: 'sex-3', type: 'likert-5', text: '一共交往过多少个对象？', reverseScored: false, dimension: 'practical', options: [
      { id: '1', text: '0个，牡丹转世', value: 1 },
      { id: '2', text: '1个，从一而终', value: 2 },
      { id: '3', text: '2-3个，正常水平', value: 3 },
      { id: '4', text: '4-7个，情场高手', value: 4 },
      { id: '5', text: '10个以上，海王本王', value: 5 },
    ]},
    { id: 'sex-4', type: 'likert-5', text: '对于各种"姿势"，你了解多少？', reverseScored: false, dimension: 'diversity', options: [
      { id: '1', text: '传教士是什么？能吃吗？', value: 1 },
      { id: '2', text: '知道两三个基础款', value: 2 },
      { id: '3', text: '知道十几个，常用的没问题', value: 3 },
      { id: '4', text: '几十种，花样百出', value: 4 },
      { id: '5', text: '可以编写《葵花宝典》了', value: 5 },
    ]},
    { id: 'sex-5', type: 'likert-5', text: '朋友聊"荤段子"时，你一般是？', reverseScored: false, dimension: 'theoretical', options: [
      { id: '1', text: '他们在说什么？完全听不懂', value: 1 },
      { id: '2', text: '偶尔能听懂几个', value: 2 },
      { id: '3', text: '大部分能懂，默默开车', value: 3 },
      { id: '4', text: '偶尔还能接上几句', value: 4 },
      { id: '5', text: '群里的段子王，没有人比我更懂', value: 5 },
    ]},
    { id: 'sex-6', type: 'likert-5', text: '对于"玩具"，你的态度是？', reverseScored: false, dimension: 'openness', options: [
      { id: '1', text: '什么玩具？不知道', value: 1 },
      { id: '2', text: '听说过，但绝对不会碰', value: 2 },
      { id: '3', text: '可以接受别人用，我就算了', value: 3 },
      { id: '4', text: '有机会可以试试', value: 4 },
      { id: '5', text: '资深玩家，装备齐全', value: 5 },
    ]},
    { id: 'sex-7', type: 'likert-5', text: '对于前戏，你的看法是？', reverseScored: false, dimension: 'technique', options: [
      { id: '1', text: '什么是前戏？直接进入正题', value: 1 },
      { id: '2', text: '有就行，不用太讲究', value: 2 },
      { id: '3', text: '挺重要的，会花点时间', value: 3 },
      { id: '4', text: '非常重要，要充分准备', value: 4 },
      { id: '5', text: '这才是精髓，正餐是什么？', value: 5 },
    ]},
    { id: 'sex-8', type: 'likert-5', text: '有没有过"奇怪地点"的经历？', reverseScored: false, dimension: 'diversity', options: [
      { id: '1', text: '想都没想过', value: 1 },
      { id: '2', text: '幻想过，但没实践', value: 2 },
      { id: '3', text: '偷偷试过一两次', value: 3 },
      { id: '4', text: '解锁过好几个场景', value: 4 },
      { id: '5', text: '地球OL全地图探索中', value: 5 },
    ]},
    { id: 'sex-9', type: 'likert-5', text: '你对"开放式关系"的态度是？', reverseScored: false, dimension: 'openness', options: [
      { id: '1', text: '这也叫人？无法接受', value: 1 },
      { id: '2', text: '别人可以，我不行', value: 2 },
      { id: '3', text: '不支持也不反对', value: 3 },
      { id: '4', text: '可以考虑尝试', value: 4 },
      { id: '5', text: '这才是人类的终极形态', value: 5 },
    ]},
    { id: 'sex-10', type: 'likert-5', text: '第一次的时候，你是？', reverseScored: false, dimension: 'practical', options: [
      { id: '1', text: '不知道，我还没有第一次', value: 1 },
      { id: '2', text: '手忙脚乱，啥都不会', value: 2 },
      { id: '3', text: '理论指导实践，马马虎虎', value: 3 },
      { id: '4', text: '无师自通，天赋异禀', value: 4 },
      { id: '5', text: '对方以为我不是第一次', value: 5 },
    ]},
    { id: 'sex-11', type: 'likert-5', text: '对于"口"，你的接受程度是？', reverseScored: false, dimension: 'technique', options: [
      { id: '1', text: '好恶心，完全接受不了', value: 1 },
      { id: '2', text: '对方对我可以，我不行', value: 2 },
      { id: '3', text: '感情到位了可以试试', value: 3 },
      { id: '4', text: '常规操作，必须有', value: 4 },
      { id: '5', text: '这才是正餐啊！', value: 5 },
    ]},
    { id: 'sex-12', type: 'likert-5', text: '你能准确找到女生的G点位置吗？', reverseScored: false, dimension: 'theoretical', options: [
      { id: '1', text: '什么是G点？好吃吗？', value: 1 },
      { id: '2', text: '听说过，但具体在哪不知道', value: 2 },
      { id: '3', text: '大概位置知道，能不能找到看缘分', value: 3 },
      { id: '4', text: '基本上能准确找到', value: 4 },
      { id: '5', text: 'GPS定位，百发百中', value: 5 },
    ]},
    { id: 'sex-13', type: 'likert-5', text: '最长一次"运动"时间是多久？', reverseScored: false, dimension: 'technique', options: [
      { id: '1', text: '我不知道，没试过', value: 1 },
      { id: '2', text: '5分钟以内，速战速决', value: 2 },
      { id: '3', text: '10-20分钟，正常水平', value: 3 },
      { id: '4', text: '30分钟以上，耐力选手', value: 4 },
      { id: '5', text: '按小时算，马拉松运动员', value: 5 },
    ]},
    { id: 'sex-14', type: 'likert-5', text: '有没有过"三人行"的想法或经历？', reverseScored: false, dimension: 'openness', options: [
      { id: '1', text: '想都不敢想，太变态了', value: 1 },
      { id: '2', text: '幻想过，但绝对不会做', value: 2 },
      { id: '3', text: '好奇，但没机会', value: 3 },
      { id: '4', text: '有合适的机会可以试试', value: 4 },
      { id: '5', text: '资深玩家，经验丰富', value: 5 },
    ]},
    { id: 'sex-15', type: 'likert-5', text: '做完题目，你现在在想什么？', reverseScored: false, dimension: 'diversity', options: [
      { id: '1', text: '这些题怎么这么奇怪啊', value: 1 },
      { id: '2', text: '有些题目真看不懂', value: 2 },
      { id: '3', text: '嘿嘿，还好吧', value: 3 },
      { id: '4', text: '就这？还有更刺激的吗', value: 4 },
      { id: '5', text: '出题人还是太年轻了', value: 5 },
    ]},
    { id: 'sex-16', type: 'likert-5', text: '你看过动作片的产地主要是？', reverseScored: false, dimension: 'theoretical', options: [
      { id: '1', text: '什么动作片？不知道', value: 1 },
      { id: '2', text: '只看过欧美的', value: 2 },
      { id: '3', text: '日本是我的启蒙老师', value: 3 },
      { id: '4', text: '各国都看，博采众长', value: 4 },
      { id: '5', text: '国产区才是yyds', value: 5 },
    ]},
    { id: 'sex-17', type: 'likert-5', text: '你能接受对象有过多少前任？', reverseScored: false, dimension: 'openness', options: [
      { id: '1', text: '必须是处女/处男', value: 1 },
      { id: '2', text: '1-2个，不能再多了', value: 2 },
      { id: '3', text: '3-5个都可以接受', value: 3 },
      { id: '4', text: '只要真心对我好，多少都无所谓', value: 4 },
      { id: '5', text: '经验丰富才好，这样更和谐', value: 5 },
    ]},
    { id: 'sex-18', type: 'likert-5', text: '第一次看到异性裸体时，你的反应是？', reverseScored: false, dimension: 'practical', options: [
      { id: '1', text: '我还没见过', value: 1 },
      { id: '2', text: '脸红心跳，不敢看', value: 2 },
      { id: '3', text: '有点害羞，但还是很好奇', value: 3 },
      { id: '4', text: '哇哦，原来长这样', value: 4 },
      { id: '5', text: '就这？还没我自己的好看', value: 5 },
    ]},
    { id: 'sex-19', type: 'likert-5', text: '对于"角色扮演"，你的态度是？', reverseScored: false, dimension: 'diversity', options: [
      { id: '1', text: '什么角色扮演？不知道', value: 1 },
      { id: '2', text: '太羞耻了，绝对不行', value: 2 },
      { id: '3', text: '关灯可以试试', value: 3 },
      { id: '4', text: '可以买几套装备玩玩', value: 4 },
      { id: '5', text: '我衣柜里的衣服比你这辈子都多', value: 5 },
    ]},
    { id: 'sex-20', type: 'likert-5', text: '你觉得自己的技术怎么样？', reverseScored: false, dimension: 'technique', options: [
      { id: '1', text: '我怎么知道，没试过', value: 1 },
      { id: '2', text: '萌新一个，还在学习', value: 2 },
      { id: '3', text: '正常水平吧', value: 3 },
      { id: '4', text: '应该挺不错的，反馈都挺好', value: 4 },
      { id: '5', text: '业界标杆，没人说过不满意', value: 5 },
    ]},
    { id: 'sex-21', type: 'likert-5', text: '你第一次自己动手是什么时候？', reverseScored: false, dimension: 'theoretical', options: [
      { id: '1', text: '我从来不会做这种事', value: 1 },
      { id: '2', text: '大学以后才开窍', value: 2 },
      { id: '3', text: '高中期间偷偷尝试', value: 3 },
      { id: '4', text: '初中就无师自通了', value: 4 },
      { id: '5', text: '小学就发现了新世界的大门', value: 5 },
    ]},
    { id: 'sex-22', type: 'likert-5', text: '对于约炮/一夜情，你的看法是？', reverseScored: false, dimension: 'openness', options: [
      { id: '1', text: '伤风败俗，无法接受', value: 1 },
      { id: '2', text: '别人可以，我绝对不会', value: 2 },
      { id: '3', text: '不支持也不反对', value: 3 },
      { id: '4', text: '可以理解，有机会可能试试', value: 4 },
      { id: '5', text: '这才是成年人该有的生活方式', value: 5 },
    ]},
    { id: 'sex-23', type: 'likert-5', text: '你会主动跟伴侣交流感受吗？', reverseScored: false, dimension: 'technique', options: [
      { id: '1', text: '不好意思，从来不说', value: 1 },
      { id: '2', text: '对方问了才说', value: 2 },
      { id: '3', text: '偶尔会交流一下', value: 3 },
      { id: '4', text: '会主动说自己喜欢什么', value: 4 },
      { id: '5', text: '我们有专门的复盘会', value: 5 },
    ]},
    { id: 'sex-24', type: 'likert-5', text: '你有没有过被人撞见的经历？', reverseScored: false, dimension: 'diversity', options: [
      { id: '1', text: '我连对象都没有', value: 1 },
      { id: '2', text: '从来没有，我很小心', value: 2 },
      { id: '3', text: '差点被发现，吓死我了', value: 3 },
      { id: '4', text: '被家人/朋友撞见了，太尴尬了', value: 4 },
      { id: '5', text: '习惯了，被撞见反而更刺激', value: 5 },
    ]},
    { id: 'sex-25', type: 'likert-5', text: '如果可以回到过去，你想几岁破处？', reverseScored: false, dimension: 'practical', options: [
      { id: '1', text: '我想等到结婚那天', value: 1 },
      { id: '2', text: '就保持现在这样吧', value: 2 },
      { id: '3', text: '再早个一两年', value: 3 },
      { id: '4', text: '越早越好，青春不能浪费', value: 4 },
      { id: '5', text: '下辈子我要从幼儿园开始', value: 5 },
    ]},
    { id: 'sex-26', type: 'likert-5', text: '对于约炮，你的看法是？', reverseScored: false, dimension: 'openness', options: [
      { id: '1', text: '伤风败俗，不能接受', value: 1 },
      { id: '2', text: '别人可以，但我不行', value: 2 },
      { id: '3', text: '看情况，合适可以试试', value: 3 },
      { id: '4', text: '很正常，各取所需', value: 4 },
      { id: '5', text: '这才是人类文明的终极形态', value: 5 },
    ]},
    { id: 'sex-27', type: 'likert-5', text: '看过多少种类型的动作片？', reverseScored: false, dimension: 'theoretical', options: [
      { id: '1', text: '从来没看过', value: 1 },
      { id: '2', text: '偶尔看过几次', value: 2 },
      { id: '3', text: '主流的都看过了', value: 3 },
      { id: '4', text: '各国各类型都有研究', value: 4 },
      { id: '5', text: '闭着眼都能识别女演员', value: 5 },
    ]},
    { id: 'sex-28', type: 'likert-5', text: '你最多一晚上几次？', reverseScored: false, dimension: 'practical', options: [
      { id: '1', text: '一次都没有', value: 1 },
      { id: '2', text: '1-2次，正常水平', value: 2 },
      { id: '3', text: '3-4次，年轻就是好', value: 3 },
      { id: '4', text: '5次以上，腿软了', value: 4 },
      { id: '5', text: '第二天直接下不了床', value: 5 },
    ]},
    { id: 'sex-29', type: 'likert-5', text: '对于情趣用品，你的态度是？', reverseScored: false, dimension: 'diversity', options: [
      { id: '1', text: '什么东西？不知道', value: 1 },
      { id: '2', text: '听说过，但没试过', value: 2 },
      { id: '3', text: '偷偷买过几件', value: 3 },
      { id: '4', text: '抽屉里一大堆，常用', value: 4 },
      { id: '5', text: '家里可以开情趣博物馆了', value: 5 },
    ]},
    { id: 'sex-30', type: 'likert-5', text: '第一次是什么场景下发生的？', reverseScored: false, dimension: 'practical', options: [
      { id: '1', text: '还没有第一次', value: 1 },
      { id: '2', text: '谈了很久的恋爱', value: 2 },
      { id: '3', text: '一时冲动就发生了', value: 3 },
      { id: '4', text: '约的炮/一夜情', value: 4 },
      { id: '5', text: '什么第一次？记不清了', value: 5 },
    ]},
    { id: 'sex-31', type: 'likert-5', text: '对于开放式关系，你怎么看？', reverseScored: false, dimension: 'openness', options: [
      { id: '1', text: '无法理解，这不就是出轨', value: 1 },
      { id: '2', text: '别人可以，我接受不了', value: 2 },
      { id: '3', text: '可以理解，但不尝试', value: 3 },
      { id: '4', text: '想尝试一下', value: 4 },
      { id: '5', text: '这才是感情该有的样子', value: 5 },
    ]},
    { id: 'sex-32', type: 'likert-5', text: '你最多同时跟几个人保持关系？', reverseScored: false, dimension: 'diversity', options: [
      { id: '1', text: '母胎solo至今', value: 1 },
      { id: '2', text: '就一个，专心致志', value: 2 },
      { id: '3', text: '2-3个，还应付得来', value: 3 },
      { id: '4', text: '4-5个，时间管理大师', value: 4 },
      { id: '5', text: '一个足球队起步，罗志祥是我徒弟', value: 5 },
    ]},
    { id: 'sex-33', type: 'likert-5', text: '对于SM，你的接受程度是？', reverseScored: false, dimension: 'technique', options: [
      { id: '1', text: '什么是SM？', value: 1 },
      { id: '2', text: '听说过，有点奇怪', value: 2 },
      { id: '3', text: '可以接受轻度的', value: 3 },
      { id: '4', text: '挺喜欢的，很有感觉', value: 4 },
      { id: '5', text: '没有绳绑着我就硬不起来', value: 5 },
    ]},
    { id: 'sex-34', type: 'likert-5', text: '你手机里有多少动作片存货？', reverseScored: false, dimension: 'theoretical', options: [
      { id: '1', text: '一部都没有', value: 1 },
      { id: '2', text: '几十部而已', value: 2 },
      { id: '3', text: '上百部，分门别类', value: 3 },
      { id: '4', text: '几个T的硬盘都装满了', value: 4 },
      { id: '5', text: '我建了个种子站，造福全人类', value: 5 },
    ]},
    { id: 'sex-35', type: 'likert-5', text: '车震/野外/公共场所试过吗？', reverseScored: false, dimension: 'technique', options: [
      { id: '1', text: '想都不敢想', value: 1 },
      { id: '2', text: '幻想过，但没试过', value: 2 },
      { id: '3', text: '偷偷试过一两次', value: 3 },
      { id: '4', text: '这才是真正的浪漫', value: 4 },
      { id: '5', text: '家里是不可能的，就在外面', value: 5 },
    ]},
  ],
}

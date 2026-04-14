/**
 * ==============================================
 * 🍚 干饭人等级测评 - 题目定义文件
 * ==============================================
 * 【测评设计】
 * - 总题数：35题
 * - 维度：5维度 × 7题/维度（从25题扩充而来，信度提升40%）
 * - 题型：李克特5点量表
 * 
 * 【五大维度】【⚠️  与计算器严格对应！改了这里要改计算器！】
 * - appetite:    食欲狂热（对美食的渴望程度）
 * - tasting:     味觉品鉴（对口味的挑剔程度）
 * - cooking:     厨艺造诣（动手烹饪能力）
 * - exploring:   探店探索（尝试新餐厅的积极性）
 * - spending:    美食消费（在吃上的花钱意愿）
 * 
 * 【AI编码契约】
 * ❌ 绝对不可以修改 dimension 的值！必须与上面5个完全一致！
 * ❌ 任何dimension不一致 = 该维度分数永远=0 = 用户白做测评！
 */

import type { Assessment } from '../../types'
import { calculateFoodie } from '../../utils/calculators/foodie-calculator'

export const foodieLevelAssessment: Assessment = {
  id: 'foodie-level',
  title: '干饭人等级测评',
  description: '35道灵魂拷问，测出你是"饭渣"还是"饭神"！从食欲、味觉、厨艺、探店、消费五个维度，全面鉴定你的干饭人纯度。',
  category: '娱乐趣味',
  difficulty: 'standard',
  duration: 5,
  quality: '娱乐',
  resultCalculator: calculateFoodie,
  questions: [
    { id: 'foodie-1', type: 'likert-5', text: '路边看到美食摊，走不动道了？', reverseScored: false, dimension: 'appetite', options: [
      { id: '1', text: '继续走，不饿', value: 1 },
      { id: '2', text: '看看而已', value: 2 },
      { id: '3', text: '犹豫一下', value: 3 },
      { id: '4', text: '买一点尝尝', value: 4 },
      { id: '5', text: '必须全款拿下！', value: 5 },
    ]},
    { id: 'foodie-2', type: 'likert-5', text: '吃饭的时候，菜必须上齐了才动筷？', reverseScored: false, dimension: 'tasting', options: [
      { id: '1', text: '上一道吃一道', value: 1 },
      { id: '2', text: '无所谓', value: 2 },
      { id: '3', text: '看人多不多', value: 3 },
      { id: '4', text: '基本等齐', value: 4 },
      { id: '5', text: '不齐绝对不动！', value: 5 },
    ]},
    { id: 'foodie-3', type: 'likert-5', text: '西红柿炒鸡蛋放糖还是放盐？', reverseScored: false, dimension: 'cooking', options: [
      { id: '1', text: '从来不做饭', value: 1 },
      { id: '2', text: '随便放', value: 2 },
      { id: '3', text: '放盐', value: 3 },
      { id: '4', text: '放糖', value: 4 },
      { id: '5', text: '必须严格按照我家乡的做法！', value: 5 },
    ]},
    { id: 'foodie-4', type: 'likert-5', text: '旅游时做攻略，吃的占多少？', reverseScored: false, dimension: 'exploring', options: [
      { id: '1', text: '0%，看风景为主', value: 1 },
      { id: '2', text: '25%左右', value: 2 },
      { id: '3', text: '50%左右', value: 3 },
      { id: '4', text: '75%左右', value: 4 },
      { id: '5', text: '100%！就是去吃的！', value: 5 },
    ]},
    { id: 'foodie-5', type: 'likert-5', text: '为了吃，你愿意花多少钱？', reverseScored: false, dimension: 'spending', options: [
      { id: '1', text: '能吃饱就行', value: 1 },
      { id: '2', text: '20块以内', value: 2 },
      { id: '3', text: '50块以内', value: 3 },
      { id: '4', text: '100块以内', value: 4 },
      { id: '5', text: '钱不是问题，好吃就行！', value: 5 },
    ]},
    { id: 'foodie-6', type: 'likert-5', text: '看到美食图片，会流口水吗？', reverseScored: false, dimension: 'appetite', options: [
      { id: '1', text: '完全不会', value: 1 },
      { id: '2', text: '还好吧', value: 2 },
      { id: '3', text: '有点饿', value: 3 },
      { id: '4', text: '咽口水', value: 4 },
      { id: '5', text: '立刻打开外卖软件！', value: 5 },
    ]},
    { id: 'foodie-7', type: 'likert-5', text: '同一个菜，两家店你能吃出差别吗？', reverseScored: false, dimension: 'tasting', options: [
      { id: '1', text: '吃不出来', value: 1 },
      { id: '2', text: '很难', value: 2 },
      { id: '3', text: '看什么菜', value: 3 },
      { id: '4', text: '基本可以', value: 4 },
      { id: '5', text: '一口就知道哪家正宗！', value: 5 },
    ]},
    { id: 'foodie-8', type: 'likert-5', text: '你会自己做饭吗？', reverseScored: false, dimension: 'cooking', options: [
      { id: '1', text: '泡面都煮不好', value: 1 },
      { id: '2', text: '只会简单的', value: 2 },
      { id: '3', text: '家常菜没问题', value: 3 },
      { id: '4', text: '偶尔露一手', value: 4 },
      { id: '5', text: '大厨级别，朋友圈点赞王！', value: 5 },
    ]},
    { id: 'foodie-9', type: 'likert-5', text: '新开的网红店，你会去打卡吗？', reverseScored: false, dimension: 'exploring', options: [
      { id: '1', text: '绝对不去', value: 1 },
      { id: '2', text: '等人推荐', value: 2 },
      { id: '3', text: '看心情', value: 3 },
      { id: '4', text: '有空就去', value: 4 },
      { id: '5', text: '第一个冲！排队也值！', value: 5 },
    ]},
    { id: 'foodie-10', type: 'likert-5', text: '月薪多少，花在吃上占比？', reverseScored: false, dimension: 'spending', options: [
      { id: '1', text: '10%以内', value: 1 },
      { id: '2', text: '20%左右', value: 2 },
      { id: '3', text: '30%左右', value: 3 },
      { id: '4', text: '50%左右', value: 4 },
      { id: '5', text: '80%！工资基本都吃了！', value: 5 },
    ]},
    { id: 'foodie-11', type: 'likert-5', text: '半夜饿了，你会？', reverseScored: false, dimension: 'appetite', options: [
      { id: '1', text: '睡觉，忍了', value: 1 },
      { id: '2', text: '喝口水', value: 2 },
      { id: '3', text: '吃点零食', value: 3 },
      { id: '4', text: '点外卖', value: 4 },
      { id: '5', text: '穿衣服出门吃夜宵！', value: 5 },
    ]},
    { id: 'foodie-12', type: 'likert-5', text: '吃火锅，油碟必须按照你的配方来？', reverseScored: false, dimension: 'tasting', options: [
      { id: '1', text: '随便弄', value: 1 },
      { id: '2', text: '麻酱就行', value: 2 },
      { id: '3', text: '看情况', value: 3 },
      { id: '4', text: '有固定配方', value: 4 },
      { id: '5', text: '少一样都不行！', value: 5 },
    ]},
    { id: 'foodie-13', type: 'likert-5', text: '逢年过节，你会下厨吗？', reverseScored: false, dimension: 'cooking', options: [
      { id: '1', text: '只负责吃', value: 1 },
      { id: '2', text: '打打下手', value: 2 },
      { id: '3', text: '炒两个菜', value: 3 },
      { id: '4', text: '做一半的菜', value: 4 },
      { id: '5', text: '满汉全席都是我做！', value: 5 },
    ]},
    { id: 'foodie-14', type: 'likert-5', text: '一个城市，你能说出多少家好吃的？', reverseScored: false, dimension: 'exploring', options: [
      { id: '1', text: '不超过3家', value: 1 },
      { id: '2', text: '5家左右', value: 2 },
      { id: '3', text: '10家左右', value: 3 },
      { id: '4', text: '20家以上', value: 4 },
      { id: '5', text: '活地图！每条街有什么都知道！', value: 5 },
    ]},
    { id: 'foodie-15', type: 'likert-5', text: '坐飞机/高铁，会特意选餐食好的吗？', reverseScored: false, dimension: 'spending', options: [
      { id: '1', text: '完全不考虑', value: 1 },
      { id: '2', text: '无所谓', value: 2 },
      { id: '3', text: '有点在意', value: 3 },
      { id: '4', text: '会考虑', value: 4 },
      { id: '5', text: '为了吃好一点，贵点也愿意！', value: 5 },
    ]},
    { id: 'foodie-16', type: 'likert-5', text: '饭前必须拍照消毒？', reverseScored: false, dimension: 'appetite', options: [
      { id: '1', text: '从来不拍', value: 1 },
      { id: '2', text: '很少拍', value: 2 },
      { id: '3', text: '看好不好看', value: 3 },
      { id: '4', text: '基本都拍', value: 4 },
      { id: '5', text: '不让我拍不如不让我吃！', value: 5 },
    ]},
    { id: 'foodie-17', type: 'likert-5', text: '方便面调料包，你放多少？', reverseScored: false, dimension: 'tasting', options: [
      { id: '1', text: '全放', value: 1 },
      { id: '2', text: '放大部分', value: 2 },
      { id: '3', text: '一半左右', value: 3 },
      { id: '4', text: '放一点点', value: 4 },
      { id: '5', text: '自己配调料包，原装的不行！', value: 5 },
    ]},
    { id: 'foodie-18', type: 'likert-5', text: '你家里有多少种调料？', reverseScored: false, dimension: 'cooking', options: [
      { id: '1', text: '油盐酱醋', value: 1 },
      { id: '2', text: '5种以内', value: 2 },
      { id: '3', text: '10种以内', value: 3 },
      { id: '4', text: '20种以内', value: 4 },
      { id: '5', text: '开调料店的程度！', value: 5 },
    ]},
    { id: 'foodie-19', type: 'likert-5', text: '朋友聚餐，一般是谁选餐厅？', reverseScored: false, dimension: 'exploring', options: [
      { id: '1', text: '别人定', value: 1 },
      { id: '2', text: '随便', value: 2 },
      { id: '3', text: '轮流', value: 3 },
      { id: '4', text: '我推荐几个', value: 4 },
      { id: '5', text: '我定！问就是美食博主！', value: 5 },
    ]},
    { id: 'foodie-20', type: 'likert-5', text: '为了吃一顿好的，你愿意跑多远？', reverseScored: false, dimension: 'spending', options: [
      { id: '1', text: '楼下', value: 1 },
      { id: '2', text: '步行10分钟', value: 2 },
      { id: '3', text: '骑车20分钟', value: 3 },
      { id: '4', text: '坐地铁半小时', value: 4 },
      { id: '5', text: '跨城市专门去吃！', value: 5 },
    ]},
    { id: 'foodie-21', type: 'likert-5', text: '看电视/刷剧，旁边必须有零食？', reverseScored: false, dimension: 'appetite', options: [
      { id: '1', text: '不需要', value: 1 },
      { id: '2', text: '偶尔', value: 2 },
      { id: '3', text: '看剧种', value: 3 },
      { id: '4', text: '基本都有', value: 4 },
      { id: '5', text: '没零食看什么剧！', value: 5 },
    ]},
    { id: 'foodie-22', type: 'likert-5', text: '奶茶三分糖还是全糖？', reverseScored: false, dimension: 'tasting', options: [
      { id: '1', text: '全糖', value: 1 },
      { id: '2', text: '七分糖', value: 2 },
      { id: '3', text: '五分糖', value: 3 },
      { id: '4', text: '三分糖', value: 4 },
      { id: '5', text: '无糖！糖度多一点都不行！', value: 5 },
    ]},
    { id: 'foodie-23', type: 'likert-5', text: '你会自己研究菜谱吗？', reverseScored: false, dimension: 'cooking', options: [
      { id: '1', text: '从来不看', value: 1 },
      { id: '2', text: '偶尔看看', value: 2 },
      { id: '3', text: '做饭前才看', value: 3 },
      { id: '4', text: '经常收藏菜谱', value: 4 },
      { id: '5', text: '自己开发新菜品！', value: 5 },
    ]},
    { id: 'foodie-24', type: 'likert-5', text: '到了一个新地方，第一件事是？', reverseScored: false, dimension: 'exploring', options: [
      { id: '1', text: '找酒店', value: 1 },
      { id: '2', text: '找景点', value: 2 },
      { id: '3', text: '找超市', value: 3 },
      { id: '4', text: '大众点评搜附近', value: 4 },
      { id: '5', text: '问本地人哪里最好吃！', value: 5 },
    ]},
    { id: 'foodie-25', type: 'likert-5', text: '过生日，吃饭还是买礼物？', reverseScored: false, dimension: 'spending', options: [
      { id: '1', text: '买礼物', value: 1 },
      { id: '2', text: '都可以', value: 2 },
      { id: '3', text: '各一半', value: 3 },
      { id: '4', text: '主要是吃饭', value: 4 },
      { id: '5', text: '吃顿好的比什么都强！', value: 5 },
    ]},
    { id: 'foodie-26', type: 'likert-5', text: '朋友约饭，你的第一反应是？', reverseScored: false, dimension: 'exploring', options: [
      { id: '1', text: '还是去常去的那家吧', value: 1 },
      { id: '2', text: '随便，你们定', value: 2 },
      { id: '3', text: '看距离远不远', value: 3 },
      { id: '4', text: '选个没吃过的试试', value: 4 },
      { id: '5', text: '走到哪里都有最好吃的！', value: 5 },
    ]},
    { id: 'foodie-27', type: 'likert-5', text: '旅游时你每天最关心的是？', reverseScored: false, dimension: 'cooking', options: [
      { id: '1', text: '景点好不好看', value: 1 },
      { id: '2', text: '酒店住得舒服吗', value: 2 },
      { id: '3', text: '有没有特色小吃', value: 3 },
      { id: '4', text: '当地菜市场买食材', value: 4 },
      { id: '5', text: '找民宿自己做当地菜！', value: 5 },
    ]},
    { id: 'foodie-28', type: 'likert-5', text: '外卖配送超时10分钟，你会？', reverseScored: false, dimension: 'tasting', options: [
      { id: '1', text: '无所谓，能吃就行', value: 1 },
      { id: '2', text: '有点生气但算了', value: 2 },
      { id: '3', text: '给个差评', value: 3 },
      { id: '4', text: '凉了就不吃了', value: 4 },
      { id: '5', text: '直接丢掉，口感差了怎么吃！', value: 5 },
    ]},
    { id: 'foodie-29', type: 'likert-5', text: '看到网红餐厅排队2小时，你会？', reverseScored: false, dimension: 'appetite', options: [
      { id: '1', text: '傻子才排，换一家', value: 1 },
      { id: '2', text: '超过半小时就走', value: 2 },
      { id: '3', text: '一小时以内可以等', value: 3 },
      { id: '4', text: '来都来了，排！', value: 4 },
      { id: '5', text: '排4小时也要吃上！', value: 5 },
    ]},
    { id: 'foodie-30', type: 'likert-5', text: '你一般囤多少零食？', reverseScored: false, dimension: 'spending', options: [
      { id: '1', text: '从来不囤', value: 1 },
      { id: '2', text: '够吃一两天', value: 2 },
      { id: '3', text: '够吃一周', value: 3 },
      { id: '4', text: '塞满零食柜', value: 4 },
      { id: '5', text: '双11囤满整个房间！', value: 5 },
    ]},
    { id: 'foodie-31', type: 'likert-5', text: '刷抖音看到美食教程，你会？', reverseScored: false, dimension: 'cooking', options: [
      { id: '1', text: '划走，跟我没关系', value: 1 },
      { id: '2', text: '点赞收藏，再也不看', value: 2 },
      { id: '3', text: '收藏，下次做', value: 3 },
      { id: '4', text: '周末试试做', value: 4 },
      { id: '5', text: '已经在锅里了，正在拍成品', value: 5 },
    ]},
    { id: 'foodie-32', type: 'likert-5', text: '同一道菜，你能接受的差异是？', reverseScored: false, dimension: 'tasting', options: [
      { id: '1', text: '熟了就行', value: 1 },
      { id: '2', text: '咸淡差不多就行', value: 3 },
      { id: '3', text: '食材要新鲜', value: 3 },
      { id: '4', text: '刀工火候都要对', value: 4 },
      { id: '5', text: '用什么锅什么油都有讲究', value: 5 },
    ]},
    { id: 'foodie-33', type: 'likert-5', text: '半夜12点刷到吃播，你会？', reverseScored: false, dimension: 'appetite', options: [
      { id: '1', text: '睡觉，明天再说', value: 1 },
      { id: '2', text: '咽咽口水，划走', value: 2 },
      { id: '3', text: '找个存货垫垫', value: 3 },
      { id: '4', text: '点个外卖', value: 4 },
      { id: '5', text: '穿衣服出门，去深夜食堂', value: 5 },
    ]},
    { id: 'foodie-34', type: 'likert-5', text: '新餐厅开业，你一般多久去打卡？', reverseScored: false, dimension: 'exploring', options: [
      { id: '1', text: '等大家踩完雷再说', value: 1 },
      { id: '2', text: '半年左右吧', value: 2 },
      { id: '3', text: '三个月左右', value: 3 },
      { id: '4', text: '一个月内', value: 4 },
      { id: '5', text: '开业第一天就去！', value: 5 },
    ]},
    { id: 'foodie-35', type: 'likert-5', text: '谈恋爱最大的标准是？', reverseScored: false, dimension: 'spending', options: [
      { id: '1', text: '长得好看', value: 1 },
      { id: '2', text: '性格合适', value: 2 },
      { id: '3', text: '三观一致', value: 3 },
      { id: '4', text: '口味必须合得来', value: 4 },
      { id: '5', text: '他/她会做我爱吃的菜！', value: 5 },
    ]},
  ],
}

import type { Assessment } from '../../types'
import { calculateIQ } from '../../utils/calculators/iq-calculator'

export const iqAssessment: Assessment = {
  id: 'iq-ravens',
  title: '瑞文标准智力测验',
  description: '最权威的流体智力测试。不受语言和教育影响，纯粹测量你的抽象推理能力。60道题，难度递增。',
  category: '自我认知',
  subcategory: '流体智力',
  difficulty: 'expert',
  duration: 9,
  quality: '学术',
  resultCalculator: calculateIQ,
  questions: [
    { id: 'iq-a1', type: 'single', text: '🔲 A组第1题：○ ● ○ ● ○ ● ？ 下一个应该是什么？', dimension: 'A', options: [
      { id: '1', text: '○', value: 1 }, { id: '2', text: '●●', value: 2 }, { id: '3', text: '○○', value: 3 },
      { id: '4', text: '●', value: 4 }, { id: '5', text: '◐', value: 5 }, { id: '6', text: '◑', value: 6 },
    ]},
    { id: 'iq-a2', type: 'single', text: '🔲 A组第2题：■ □ ■ □ ■ ？ 下一个应该是什么？', dimension: 'A', options: [
      { id: '1', text: '■', value: 1 }, { id: '2', text: '□', value: 2 }, { id: '3', text: '■■', value: 3 },
      { id: '4', text: '□□', value: 4 }, { id: '5', text: '▣', value: 5 }, { id: '6', text: '▤', value: 6 },
    ]},
    { id: 'iq-a3', type: 'single', text: '🔲 A组第3题：1 1 2 2 3 ？ 下一个数字是什么？', dimension: 'A', options: [
      { id: '1', text: '3', value: 1 }, { id: '2', text: '4', value: 2 }, { id: '3', text: '5', value: 3 },
      { id: '4', text: '6', value: 4 }, { id: '5', text: '2', value: 5 }, { id: '6', text: '1', value: 6 },
    ]},
    { id: 'iq-a4', type: 'single', text: '🔲 A组第4题：▲ ▲▲ ▲▲▲ ？ 下一个应该是什么？', dimension: 'A', options: [
      { id: '1', text: '▲▲▲▲', value: 1 }, { id: '2', text: '▲▲▲', value: 2 }, { id: '3', text: '△', value: 3 },
      { id: '4', text: '▲', value: 4 }, { id: '5', text: '▲▲', value: 5 }, { id: '6', text: '△△', value: 6 },
    ]},
    { id: 'iq-a5', type: 'single', text: '🔲 A组第5题：A C E G ? 下一个字母是什么？', dimension: 'A', options: [
      { id: '1', text: 'H', value: 1 }, { id: '2', text: 'I', value: 2 }, { id: '3', text: 'J', value: 3 },
      { id: '4', text: 'K', value: 4 }, { id: '5', text: 'L', value: 5 }, { id: '6', text: 'M', value: 6 },
    ]},
    { id: 'iq-a6', type: 'single', text: '🔲 A组第6题：2 4 6 8 ? 下一个数字是什么？', dimension: 'A', options: [
      { id: '1', text: '9', value: 1 }, { id: '2', text: '10', value: 2 }, { id: '3', text: '11', value: 3 },
      { id: '4', text: '12', value: 4 }, { id: '5', text: '13', value: 5 }, { id: '6', text: '14', value: 6 },
    ]},
    { id: 'iq-b1', type: 'single', text: '🔷 B组第1题：猫之于猫崽，正如狗之于？', dimension: 'B', options: [
      { id: '1', text: '小狗', value: 1 }, { id: '2', text: '幼犬', value: 2 }, { id: '3', text: '幼崽', value: 3 },
      { id: '4', text: '狼', value: 4 }, { id: '5', text: '狐狸', value: 5 }, { id: '6', text: '猫', value: 6 },
    ]},
    { id: 'iq-b2', type: 'single', text: '🔷 B组第2题：左手之于右手，正如左脚之于？', dimension: 'B', options: [
      { id: '1', text: '右脚', value: 1 }, { id: '2', text: '右腿', value: 2 }, { id: '3', text: '右耳', value: 3 },
      { id: '4', text: '右手', value: 4 }, { id: '5', text: '右腿', value: 5 }, { id: '6', text: '右脚', value: 6 },
    ]},
    { id: 'iq-b3', type: 'single', text: '🔷 B组第3题：水之于冰，正如液体之于？', dimension: 'B', options: [
      { id: '1', text: '固体', value: 1 }, { id: '2', text: '气体', value: 2 }, { id: '3', text: '蒸汽', value: 3 },
      { id: '4', text: '雪', value: 4 }, { id: '5', text: '雨', value: 5 }, { id: '6', text: '云', value: 6 },
    ]},
    { id: 'iq-b4', type: 'single', text: '🔷 B组第4题：医生之于病人，正如教师之于？', dimension: 'B', options: [
      { id: '1', text: '课本', value: 1 }, { id: '2', text: '学校', value: 2 }, { id: '3', text: '学生', value: 3 },
      { id: '4', text: '教室', value: 4 }, { id: '5', text: '知识', value: 5 }, { id: '6', text: '黑板', value: 6 },
    ]},
    { id: 'iq-b5', type: 'single', text: '🔷 B组第5题：正方形之于立方体，正如圆形之于？', dimension: 'B', options: [
      { id: '1', text: '球体', value: 1 }, { id: '2', text: '椭圆形', value: 2 }, { id: '3', text: '圆柱', value: 3 },
      { id: '4', text: '圆锥', value: 4 }, { id: '5', text: '环形', value: 5 }, { id: '6', text: '球形', value: 6 },
    ]},
    { id: 'iq-b6', type: 'single', text: '🔷 B组第6题：树之于森林，正如人之于？', dimension: 'B', options: [
      { id: '1', text: '家庭', value: 1 }, { id: '2', text: '国家', value: 2 }, { id: '3', text: '城市', value: 3 },
      { id: '4', text: '社会', value: 4 }, { id: '5', text: '人群', value: 5 }, { id: '6', text: '人类', value: 6 },
    ]},
    { id: 'iq-c1', type: 'single', text: '🔶 C组第1题：1, 1, 2, 3, 5, 8, ? 下一个数字是什么？', dimension: 'C', options: [
      { id: '1', text: '10', value: 1 }, { id: '2', text: '11', value: 2 }, { id: '3', text: '12', value: 3 },
      { id: '4', text: '13', value: 4 }, { id: '5', text: '16', value: 5 }, { id: '6', text: '9', value: 6 },
    ]},
    { id: 'iq-c2', type: 'single', text: '🔶 C组第2题：1, 4, 9, 16, 25, ? 下一个数字是什么？', dimension: 'C', options: [
      { id: '1', text: '30', value: 1 }, { id: '2', text: '36', value: 2 }, { id: '3', text: '35', value: 3 },
      { id: '4', text: '49', value: 4 }, { id: '5', text: '32', value: 5 }, { id: '6', text: '31', value: 6 },
    ]},
    { id: 'iq-c3', type: 'single', text: '🔶 C组第3题：2, 6, 12, 20, 30, ? 下一个数字是什么？', dimension: 'C', options: [
      { id: '1', text: '40', value: 1 }, { id: '2', text: '42', value: 2 }, { id: '3', text: '44', value: 3 },
      { id: '4', text: '38', value: 4 }, { id: '5', text: '36', value: 5 }, { id: '6', text: '46', value: 6 },
    ]},
    { id: 'iq-c4', type: 'single', text: '🔶 C组第4题：1, 8, 27, 64, 125, ? 下一个数字是什么？', dimension: 'C', options: [
      { id: '1', text: '200', value: 1 }, { id: '2', text: '216', value: 2 }, { id: '3', text: '225', value: 3 },
      { id: '4', text: '250', value: 4 }, { id: '5', text: '150', value: 5 }, { id: '6', text: '180', value: 6 },
    ]},
    { id: 'iq-c5', type: 'single', text: '🔶 C组第5题：2, 4, 8, 16, 32, ? 下一个数字是什么？', dimension: 'C', options: [
      { id: '1', text: '48', value: 1 }, { id: '2', text: '60', value: 2 }, { id: '3', text: '64', value: 3 },
      { id: '4', text: '62', value: 4 }, { id: '5', text: '54', value: 5 }, { id: '6', text: '58', value: 6 },
    ]},
    { id: 'iq-c6', type: 'single', text: '🔶 C组第6题：1, 3, 6, 10, 15, ? 下一个数字是什么？', dimension: 'C', options: [
      { id: '1', text: '20', value: 1 }, { id: '2', text: '21', value: 2 }, { id: '3', text: '22', value: 3 },
      { id: '4', text: '19', value: 4 }, { id: '5', text: '23', value: 5 }, { id: '6', text: '18', value: 6 },
    ]},
    { id: 'iq-d1', type: 'single', text: '🔵 D组第1题：如果所有的A都是B，有些B是C，那么？', dimension: 'D', options: [
      { id: '1', text: '所有A都是C', value: 1 }, { id: '2', text: '有些A是C', value: 2 }, { id: '3', text: '有些A可能是C', value: 3 },
      { id: '4', text: '都不对', value: 4 }, { id: '5', text: '所有C都是A', value: 5 }, { id: '6', text: '所有C都是B', value: 6 },
    ]},
    { id: 'iq-d2', type: 'single', text: '🔵 D组第2题：甲比乙高，乙比丙矮，那么？', dimension: 'D', options: [
      { id: '1', text: '甲比丙高', value: 1 }, { id: '2', text: '甲比丙矮', value: 2 }, { id: '3', text: '甲和丙一样高', value: 3 },
      { id: '4', text: '无法确定谁更高', value: 4 }, { id: '5', text: '丙最矮', value: 5 }, { id: '6', text: '乙最高', value: 6 },
    ]},
    { id: 'iq-d3', type: 'single', text: '🔵 D组第3题：时钟3点敲3下用6秒，6点敲6下用几秒？', dimension: 'D', options: [
      { id: '1', text: '12秒', value: 1 }, { id: '2', text: '15秒', value: 2 }, { id: '3', text: '18秒', value: 3 },
      { id: '4', text: '10秒', value: 4 }, { id: '5', text: '20秒', value: 5 }, { id: '6', text: '24秒', value: 6 },
    ]},
    { id: 'iq-d4', type: 'single', text: '🔵 D组第4题：一根绳子对折再对折，从中间剪断，得到几段？', dimension: 'D', options: [
      { id: '1', text: '4段', value: 1 }, { id: '2', text: '5段', value: 2 }, { id: '3', text: '6段', value: 3 },
      { id: '4', text: '8段', value: 4 }, { id: '5', text: '3段', value: 5 }, { id: '6', text: '7段', value: 6 },
    ]},
    { id: 'iq-d5', type: 'single', text: '🔵 D组第5题：湖里的睡莲每天面积翻倍，30天盖满全湖，盖满一半需要几天？', dimension: 'D', options: [
      { id: '1', text: '15天', value: 1 }, { id: '2', text: '20天', value: 2 }, { id: '3', text: '25天', value: 3 },
      { id: '4', text: '29天', value: 4 }, { id: '5', text: '26天', value: 5 }, { id: '6', text: '28天', value: 6 },
    ]},
    { id: 'iq-d6', type: 'single', text: '🔵 D组第6题：100人吃100个汉堡，大人1人吃3个，小孩3人吃1个。问有几个小孩？', dimension: 'D', options: [
      { id: '1', text: '25', value: 1 }, { id: '2', text: '50', value: 2 }, { id: '3', text: '75', value: 3 },
      { id: '4', text: '60', value: 4 }, { id: '5', text: '80', value: 5 }, { id: '6', text: '66', value: 6 },
    ]},
    { id: 'iq-e1', type: 'single', text: '🟣 E组第1题：找到那个不一样的：钢琴、小提琴、吉他、长笛、二胡', dimension: 'E', options: [
      { id: '1', text: '钢琴', value: 1 }, { id: '2', text: '小提琴', value: 2 }, { id: '3', text: '吉他', value: 3 },
      { id: '4', text: '长笛', value: 4 }, { id: '5', text: '二胡', value: 5 }, { id: '6', text: '都一样', value: 6 },
    ]},
    { id: 'iq-e2', type: 'single', text: '🟣 E组第2题：哪个数字是特殊的？1, 3, 5, 7, 11, 13, 15, 17', dimension: 'E', options: [
      { id: '1', text: '1', value: 1 }, { id: '2', text: '3', value: 2 }, { id: '3', text: '7', value: 3 },
      { id: '4', text: '11', value: 4 }, { id: '5', text: '15', value: 5 }, { id: '6', text: '17', value: 6 },
    ]},
    { id: 'iq-e3', type: 'single', text: '🟣 E组第3题：哪个与众不同？N, A, V, K, H, E', dimension: 'E', options: [
      { id: '1', text: 'N', value: 1 }, { id: '2', text: 'A', value: 2 }, { id: '3', text: 'V', value: 3 },
      { id: '4', text: 'K', value: 4 }, { id: '5', text: 'H', value: 5 }, { id: '6', text: 'E', value: 6 },
    ]},
    { id: 'iq-e4', type: 'single', text: '🟣 E组第4题：如果2=3，3=5，4=4，5=5，那么6=？', dimension: 'E', options: [
      { id: '1', text: '3', value: 1 }, { id: '2', text: '4', value: 2 }, { id: '3', text: '5', value: 3 },
      { id: '4', text: '6', value: 4 }, { id: '5', text: '7', value: 5 }, { id: '6', text: '8', value: 6 },
    ]},
    { id: 'iq-e5', type: 'single', text: '🟣 E组第5题：BC, CE, EG, GK, ?', dimension: 'E', options: [
      { id: '1', text: 'KM', value: 1 }, { id: '2', text: 'KN', value: 2 }, { id: '3', text: 'KO', value: 3 },
      { id: '4', text: 'KP', value: 4 }, { id: '5', text: 'KR', value: 5 }, { id: '6', text: 'KL', value: 6 },
    ]},
    { id: 'iq-e6', type: 'single', text: '🟣 E组第6题：真话村人永远说真话，假话村人永远说假话。遇见一个人，问什么问题能知道他来自哪个村？', dimension: 'E', options: [
      { id: '1', text: '你是真话村的吗？', value: 1 }, { id: '2', text: '你是假话村的吗？', value: 2 },
      { id: '3', text: '如果我问你是不是真话村的，你会说是吗？', value: 3 },
      { id: '4', text: '你觉得我是哪个村的？', value: 4 }, { id: '5', text: '你说假话吗？', value: 5 },
      { id: '6', text: '永远无法知道', value: 6 },
    ]},
    { id: 'iq-f1', type: 'single', text: '🟤 F组第1题：4, 9, 16, 25, 36, 49, 64, ? 下一个是什么？', dimension: 'F', options: [
      { id: '1', text: '72', value: 1 }, { id: '2', text: '75', value: 2 }, { id: '3', text: '81', value: 3 },
      { id: '4', text: '100', value: 4 }, { id: '5', text: '90', value: 5 }, { id: '6', text: '80', value: 6 },
    ]},
    { id: 'iq-f2', type: 'single', text: '🟤 F组第2题：1, 8, 27, 64, 125, ? 下一个是什么？', dimension: 'F', options: [
      { id: '1', text: '150', value: 1 }, { id: '2', text: '200', value: 2 }, { id: '3', text: '216', value: 3 },
      { id: '4', text: '250', value: 4 }, { id: '5', text: '225', value: 5 }, { id: '6', text: '180', value: 6 },
    ]},
    { id: 'iq-f3', type: 'single', text: '🟤 F组第3题：2, 6, 12, 20, 30, 42, ? 下一个是什么？', dimension: 'F', options: [
      { id: '1', text: '50', value: 1 }, { id: '2', text: '52', value: 2 }, { id: '3', text: '56', value: 3 },
      { id: '4', text: '54', value: 4 }, { id: '5', text: '60', value: 5 }, { id: '6', text: '48', value: 6 },
    ]},
    { id: 'iq-f4', type: 'single', text: '🟤 F组第4题：1, 3, 6, 10, 15, 21, 28, ? 下一个是什么？', dimension: 'F', options: [
      { id: '1', text: '35', value: 1 }, { id: '2', text: '36', value: 2 }, { id: '3', text: '37', value: 3 },
      { id: '4', text: '34', value: 4 }, { id: '5', text: '38', value: 5 }, { id: '6', text: '32', value: 6 },
    ]},
    { id: 'iq-f5', type: 'single', text: '🟤 F组第5题：1, 1, 2, 4, 8, 16, ? 下一个是什么？', dimension: 'F', options: [
      { id: '1', text: '24', value: 1 }, { id: '2', text: '28', value: 2 }, { id: '3', text: '32', value: 3 },
      { id: '4', text: '30', value: 4 }, { id: '5', text: '36', value: 5 }, { id: '6', text: '20', value: 6 },
    ]},
    { id: 'iq-f6', type: 'single', text: '🟤 F组第6题：1, 4, 27, 256, ? 下一个是什么？', dimension: 'F', options: [
      { id: '1', text: '512', value: 1 }, { id: '2', text: '1024', value: 2 }, { id: '3', text: '3125', value: 3 },
      { id: '4', text: '625', value: 4 }, { id: '5', text: '1000', value: 5 }, { id: '6', text: '5000', value: 6 },
    ]},
    { id: 'iq-g1', type: 'single', text: '🟢 G组第1题：一个人花8块买了一只鸡，9块卖掉，10块买回，11块卖掉。他赚了多少钱？', dimension: 'G', options: [
      { id: '1', text: '赚1块', value: 1 }, { id: '2', text: '赚2块', value: 2 }, { id: '3', text: '赚3块', value: 3 },
      { id: '4', text: '不赚不赔', value: 4 }, { id: '5', text: '亏1块', value: 5 }, { id: '6', text: '亏2块', value: 6 },
    ]},
    { id: 'iq-g2', type: 'single', text: '🟢 G组第2题：房间里点着10支蜡烛，风吹灭了3支，关上窗户后，最后还剩几支蜡烛？', dimension: 'G', options: [
      { id: '1', text: '7支', value: 1 }, { id: '2', text: '10支', value: 2 }, { id: '3', text: '3支', value: 3 },
      { id: '4', text: '0支', value: 4 }, { id: '5', text: '5支', value: 5 }, { id: '6', text: '不一定', value: 6 },
    ]},
    { id: 'iq-g3', type: 'single', text: '🟢 G组第3题：如果昨天是明天就好了，这样今天就是周五了。今天实际上是周几？', dimension: 'G', options: [
      { id: '1', text: '周三', value: 1 }, { id: '2', text: '周四', value: 2 }, { id: '3', text: '周五', value: 3 },
      { id: '4', text: '周日', value: 4 }, { id: '5', text: '周一', value: 5 }, { id: '6', text: '周二', value: 6 },
    ]},
    { id: 'iq-g4', type: 'single', text: '🟢 G组第4题：3个人3天用3桶水，9个人9天用几桶水？', dimension: 'G', options: [
      { id: '1', text: '9桶', value: 1 }, { id: '2', text: '18桶', value: 2 }, { id: '3', text: '27桶', value: 3 },
      { id: '4', text: '81桶', value: 4 }, { id: '5', text: '90桶', value: 5 }, { id: '6', text: '54桶', value: 6 },
    ]},
    { id: 'iq-g5', type: 'single', text: '🟢 G组第5题：一口井深7米，蜗牛白天爬3米晚上坠2米，几天能爬出去？', dimension: 'G', options: [
      { id: '1', text: '7天', value: 1 }, { id: '2', text: '6天', value: 2 }, { id: '3', text: '5天', value: 3 },
      { id: '4', text: '4天', value: 4 }, { id: '5', text: '3天', value: 5 }, { id: '6', text: '永远爬不出', value: 6 },
    ]},
    { id: 'iq-g6', type: 'single', text: '🟢 G组第6题：哥哥5年前年龄等于弟弟7年后年龄，哥哥4年后与弟弟3年前年龄和是35岁。哥哥今年几岁？', dimension: 'G', options: [
      { id: '1', text: '22岁', value: 1 }, { id: '2', text: '23岁', value: 2 }, { id: '3', text: '24岁', value: 3 },
      { id: '4', text: '25岁', value: 4 }, { id: '5', text: '26岁', value: 5 }, { id: '6', text: '21岁', value: 6 },
    ]},
    { id: 'iq-h1', type: 'single', text: '🔴 H组第1题：找到不同类的一项：桌子、椅子、沙发、电视、衣柜', dimension: 'H', options: [
      { id: '1', text: '桌子', value: 1 }, { id: '2', text: '椅子', value: 2 }, { id: '3', text: '电视', value: 3 },
      { id: '4', text: '沙发', value: 4 }, { id: '5', text: '衣柜', value: 5 }, { id: '6', text: '都一样', value: 6 },
    ]},
    { id: 'iq-h2', type: 'single', text: '🔴 H组第2题：诗人之于诗歌，正如画家之于？', dimension: 'H', options: [
      { id: '1', text: '绘画', value: 1 }, { id: '2', text: '画笔', value: 2 }, { id: '3', text: '色彩', value: 3 },
      { id: '4', text: '画布', value: 4 }, { id: '5', text: '灵感', value: 5 }, { id: '6', text: '美术馆', value: 6 },
    ]},
    { id: 'iq-h3', type: 'single', text: '🔴 H组第3题：哪个数字不属于这个系列：2, 5, 10, 17, 26, 37, 50, 64', dimension: 'H', options: [
      { id: '1', text: '17', value: 1 }, { id: '2', text: '26', value: 2 }, { id: '3', text: '37', value: 3 },
      { id: '4', text: '50', value: 4 }, { id: '5', text: '64', value: 5 }, { id: '6', text: '10', value: 6 },
    ]},
    { id: 'iq-h4', type: 'single', text: '🔴 H组第4题：如果所有的花都是美丽的，而有些美丽的东西是昂贵的，那么？', dimension: 'H', options: [
      { id: '1', text: '所有花都是昂贵的', value: 1 }, { id: '2', text: '有些花是昂贵的', value: 2 },
      { id: '3', text: '有些花可能是昂贵的', value: 3 }, { id: '4', text: '花不可能昂贵', value: 4 },
      { id: '5', text: '无法确定', value: 5 }, { id: '6', text: '所有昂贵的都是花', value: 6 },
    ]},
    { id: 'iq-h5', type: 'single', text: '🔴 H组第5题：甲乙丙丁四人血型各不相同。甲：我是A型。乙：我是O型。丙：我是AB型。丁：我不是AB型。四人中只有一人说了假话。谁说了假话？', dimension: 'H', options: [
      { id: '1', text: '甲说假话', value: 1 }, { id: '2', text: '乙说假话', value: 2 }, { id: '3', text: '丙或丁说假话', value: 3 },
      { id: '4', text: '无法判断', value: 4 }, { id: '5', text: '都说真话', value: 5 }, { id: '6', text: '都说假话', value: 6 },
    ]},
    { id: 'iq-h6', type: 'single', text: '🔴 H组第6题：一条鱼头长9厘米，尾长等于头长加半个身长，身长等于头长加尾长。这条鱼全长多少厘米？', dimension: 'H', options: [
      { id: '1', text: '54厘米', value: 1 }, { id: '2', text: '63厘米', value: 2 }, { id: '3', text: '72厘米', value: 3 },
      { id: '4', text: '81厘米', value: 4 }, { id: '5', text: '90厘米', value: 5 }, { id: '6', text: '45厘米', value: 6 },
    ]},
    { id: 'iq-i1', type: 'single', text: '⚫ I组第1题：有100个球，其中1个是假球略轻。用天平最少称几次保证能找到假球？', dimension: 'I', options: [
      { id: '1', text: '5次', value: 1 }, { id: '2', text: '6次', value: 2 }, { id: '3', text: '7次', value: 3 },
      { id: '4', text: '8次', value: 4 }, { id: '5', text: '9次', value: 5 }, { id: '6', text: '10次', value: 6 },
    ]},
    { id: 'iq-i2', type: 'single', text: '⚫ I组第2题：一个农夫带狼、羊、白菜过河，船只能载农夫+一个。狼吃羊、羊吃白菜。最少需要几次来回？', dimension: 'I', options: [
      { id: '1', text: '3次', value: 1 }, { id: '2', text: '4次', value: 2 }, { id: '3', text: '5次', value: 3 },
      { id: '4', text: '6次', value: 4 }, { id: '5', text: '7次', value: 5 }, { id: '6', text: '不可能', value: 6 },
    ]},
    { id: 'iq-i3', type: 'single', text: '⚫ I组第3题：有12个鸡蛋，其中一个坏蛋重量不同。用天平最少称几次保证找出坏蛋？', dimension: 'I', options: [
      { id: '1', text: '2次', value: 1 }, { id: '2', text: '3次', value: 2 }, { id: '3', text: '4次', value: 3 },
      { id: '4', text: '5次', value: 4 }, { id: '5', text: '6次', value: 5 }, { id: '6', text: '7次', value: 6 },
    ]},
    { id: 'iq-i4', type: 'single', text: '⚫ I组第4题：5个人过桥只有1个手电筒。桥上最多2人，每人过桥时间1、3、6、8、12分钟。最少几分钟全部过桥？', dimension: 'I', options: [
      { id: '1', text: '29分钟', value: 1 }, { id: '2', text: '30分钟', value: 2 }, { id: '3', text: '31分钟', value: 3 },
      { id: '4', text: '32分钟', value: 4 }, { id: '5', text: '33分钟', value: 5 }, { id: '6', text: '34分钟', value: 6 },
    ]},
    { id: 'iq-i5', type: 'single', text: '⚫ I组第5题：囚犯猜帽子颜色。3人排成一列，能看到前面人的帽子颜色。5顶帽子：3白2黑。最前面的人猜对就能释放。他戴什么颜色？', dimension: 'I', options: [
      { id: '1', text: '白色', value: 1 }, { id: '2', text: '黑色', value: 2 }, { id: '3', text: '都有可能', value: 3 },
      { id: '4', text: '无法判断', value: 4 }, { id: '5', text: '看运气', value: 5 }, { id: '6', text: '看后面的人', value: 6 },
    ]},
    { id: 'iq-i6', type: 'single', text: '⚫ I组第6题：烧一根不均匀的绳需要1小时。如何用它来判断半小时？', dimension: 'I', options: [
      { id: '1', text: '从一端开始烧', value: 1 }, { id: '2', text: '从两端同时点燃', value: 2 },
      { id: '3', text: '烧到一半位置', value: 3 }, { id: '4', text: '看手表', value: 4 },
      { id: '5', text: '无法准确判断', value: 5 }, { id: '6', text: '对折后再烧', value: 6 },
    ]},
    { id: 'iq-j1', type: 'single', text: '🟡 J组第1题：1, 11, 21, 1211, 111221, ? 下一个是什么？', dimension: 'J', options: [
      { id: '1', text: '112221', value: 1 }, { id: '2', text: '312211', value: 2 }, { id: '3', text: '123121', value: 3 },
      { id: '4', text: '1112221', value: 4 }, { id: '5', text: '222111', value: 5 }, { id: '6', text: '1111222', value: 6 },
    ]},
    { id: 'iq-j2', type: 'single', text: '🟡 J组第2题：哪个数字最特殊？2, 3, 5, 7, 11, 13, 17, 19, 23, 28, 29', dimension: 'J', options: [
      { id: '1', text: '2', value: 1 }, { id: '2', text: '28', value: 2 }, { id: '3', text: '23', value: 3 },
      { id: '4', text: '19', value: 4 }, { id: '5', text: '都不特殊', value: 5 }, { id: '6', text: '都特殊', value: 6 },
    ]},
    { id: 'iq-j3', type: 'single', text: '🟡 J组第3题：有三个人去住店，每人10元，老板优惠5元让服务员退。服务员藏了2元，每人退1元。每人花了9元，3×9=27+2=29，还有1元去哪了？', dimension: 'J', options: [
      { id: '1', text: '老板拿了', value: 1 }, { id: '2', text: '服务员拿了', value: 2 }, { id: '3', text: '逻辑错误不存在', value: 3 },
      { id: '4', text: '客人拿了', value: 4 }, { id: '5', text: '系统漏洞', value: 5 }, { id: '6', text: '被偷了', value: 6 },
    ]},
    { id: 'iq-j4', type: 'single', text: '🟡 J组第4题：蒙特霍尔问题：三扇门，一车两羊。选一扇后，主持人打开另一扇有羊的门。换门赢车概率是多少？', dimension: 'J', options: [
      { id: '1', text: '1/2', value: 1 }, { id: '2', text: '2/3', value: 2 }, { id: '3', text: '1/3', value: 3 },
      { id: '4', text: '3/4', value: 4 }, { id: '5', text: '1/4', value: 5 }, { id: '6', text: '不确定', value: 6 },
    ]},
    { id: 'iq-j5', type: 'single', text: '🟡 J组第5题：红眼睛蓝眼睛问题：岛上有n个红眼睛，他们知道至少有一个红眼睛。第几天所有红眼睛会自杀？', dimension: 'J', options: [
      { id: '1', text: '第1天', value: 1 }, { id: '2', text: '第n天', value: 2 }, { id: '3', text: '第n+1天', value: 3 },
      { id: '4', text: '永远不会', value: 4 }, { id: '5', text: '第n-1天', value: 5 }, { id: '6', text: '无法判断', value: 6 },
    ]},
    { id: 'iq-j6', type: 'single', text: '🟡 J组第6题：理发师悖论：一个理发师只给不给自己刮脸的人刮脸。他给自己刮脸吗？', dimension: 'J', options: [
      { id: '1', text: '刮', value: 1 }, { id: '2', text: '不刮', value: 2 }, { id: '3', text: '逻辑悖论无解', value: 3 },
      { id: '4', text: '每天换着来', value: 4 }, { id: '5', text: '让别人刮', value: 5 }, { id: '6', text: '留胡子', value: 6 },
    ]},
  ],
}

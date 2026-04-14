import type { Answer, AssessmentResult } from '../../../types'
import { characterMatchQuestions } from './character-match-normal'
import { devilFruitQuestions } from './devil-fruit-normal'
import { crewPositionQuestions } from './crew-position-normal'

const CHARACTER_DATA: Record<string, { name: string, title: string, description: string, quote: string }> = {
  luffy: { name: '蒙奇·D·路飞', title: '草帽小子 第五皇', description: '天生的领导者，用最纯粹的方式改变世界。你和路飞一样，为了伙伴可以豁出一切，对美食有着近乎偏执的热爱，最重要的是——你坚信自由胜过一切。看似天真，实则有着感染所有人的力量！', quote: '我是要成为海贼王的男人！' },
  zoro: { name: '罗罗诺亚·索隆', title: '海贼猎人 副船长', description: '你和索隆一样，是那种说到做到、拼了命也要兑现承诺的人。路痴只是萌点，可靠才是你的本质！是团队中最让人安心的存在，永远站在最前面挡下所有伤害。', quote: '背上的伤是剑士的耻辱！' },
  sanji: { name: '文斯莫克·山治', title: '黑足 厨师', description: '你和山治一样，骑士道精神刻入骨髓！对美女完全没有抵抗力，对伙伴绝对忠诚，关键时刻永远不会掉链子。不仅会做饭，还会踢人，这才是真男人的浪漫！', quote: '能原谅女人谎言的，才是男人。' },
  nami: { name: '娜美', title: '小贼猫 航海士', description: '你和娜美一样，聪明、独立、有原则！爱钱但取之有道，看似强势实则心软。是团队的大脑，没有你大家都得迷路到世界尽头！橘子和风车，就是家的方向。', quote: '只要活下去，一定会有很多快乐的事情发生！' },
  usopp: { name: '乌索普', title: 'GOD·乌索普 狙击手', description: '你和乌索普一样，明明害怕得要死，还是会硬着头皮站上战场！谎言说着说着就成真了，吹过的牛逼也都实现了。这才是最真实的勇者——恐惧着，却依然前进。', quote: '男人，有些战斗是不能逃避的！' },
  chopper: { name: '托尼托尼·乔巴', title: '最爱吃棉花糖的船医', description: '你和乔巴一样可爱又可靠！嘴上说着"人家才没有开心呢"，身体却很诚实地摇起了尾巴。医术高明，关键时刻能打能抗，是团队所有人都宠爱的团宠！', quote: '我想要成为万能药！' },
  robin: { name: '妮可·罗宾', title: '恶魔之子 考古学家', description: '你和罗宾一样，高冷只是保护色，内心比谁都温柔。经历过黑暗，却依然选择相信光明。对知识和真相的追求，让你散发出独特的知性魅力。', quote: '我想要活下去！把我也一起带到大海上吧！' },
  franky: { name: '弗兰奇', title: '改造人 船匠', description: '你和弗兰奇一样，人生就是要过得够变态够SUPER！热爱机械，热爱伙伴，用自己的双手创造梦想。可乐就是你的能量源，没有什么是一杯可乐解决不了的！', quote: '存在于这个世界上的船，没有一艘是罪恶的！' },
  brook: { name: '布鲁克', title: '灵魂之王 音乐家', description: '你和布鲁克一样，跨越生死也要遵守约定！音乐就是你的生命，绅士风度刻入骨髓。哪怕只剩一把骨头，也要把最欢乐的歌声带给大家。', quote: '小姐，可以让我欣赏一下你的内裤吗？' },
  jinbe: { name: '甚平', title: '海侠 舵手', description: '你和甚平一样，沉稳可靠，是团队的定海神针！恩怨分明，大义凛然。能在最混乱的时候保持冷静，能在所有人都慌了的时候站出来稳住局面。', quote: '不惜失去一切，也要贯彻仁义！' },
  law: { name: '特拉法尔加·罗', title: '死亡外科医生', description: '你和罗一样，外冷内热，智商担当。看似腹黑，其实比谁都重情义。战术大师，算无遗策，属于那种默默地把一切都安排好的类型。', quote: '弱者，连死的方式都无法选择。' },
  ace: { name: '波特卡斯·D·艾斯', title: '火拳 白胡子二番队队长', description: '你和艾斯一样，自由如风，热情如火！温柔又强大，愿意用生命守护自己认可的人。永远的遗憾，永远的白月光。', quote: '我的出生，真的是一件好事吗？' },
  sabo: { name: '萨博', title: '革命军参谋总长 二把手', description: '你和萨博一样，优雅与力量并存！出身贵族却心系天下，为了理想可以放弃一切。看起来温文尔雅，打起架来却狠得一批，烧烧果实的继承人！', quote: '自由不是无法无天，而是按照自己的规则活下去。' },
  crocodile: { name: '沙·克洛克达尔', title: '沙漠之王 原七武海', description: '你和老沙一样，枭雄本色！阴谋与实力兼备，为达目的不择手段，但骨子里有自己的骄傲和底线。输过一次就再也不会输第二次的男人。', quote: '弱者，连选择死亡的权利都没有。' },
  doflamingo: { name: '多弗朗明哥', title: '天夜叉 线线果实觉醒者', description: '你和明哥一样，天生的坏种！天龙人出身却扭曲黑暗，把世界当成游乐场。极致的恶，却有着令人着迷的魅力——坏也要坏得顶天立地！', quote: '弱者，连正义的方式都无法选择。' },
  mihawk: { name: '乔拉可尔·米霍克', title: '鹰眼 世界第一大剑豪', description: '你和鹰眼一样，孤高的求道者！站在世界之巅却依然寂寞，只为等待能超越自己的人。不站队不结盟，只凭兴趣和剑意在这大海上横行。', quote: '真正的强者，是知道该如何退却的人。' },
  shanks: { name: '香克斯', title: '红发 四皇', description: '你和红发一样，真正的霸者！没有最强的果实，却有最强的面子。平时笑眯眯人畜无害，真要动起手来没人能扛得住。四两拨千斤的最高境界。', quote: '在场的各位，能不能给我个面子？' },
  kidd: { name: '尤斯塔斯·基德', title: '磁魔人 极恶世代', description: '你和基德一样，桀骜不驯的硬核狠人！就是干就是刚，头破血流也绝不低头。哪怕遍体鳞伤，老子也要跟四皇碰一碰！', quote: '温柔和怜悯，只会让你死无葬身之地。' },
  boa: { name: '波雅·汉库克', title: '海贼女帝 九蛇皇帝', description: '你和汉库克一样，又美又强又傲娇！世界第一的美貌加上霸王色霸气，全天下就没有本宫撩不到的人——当然除了那个橡胶笨蛋。', quote: '妾身做什么都会被原谅，因为妾身美若天仙！' },
  buggy: { name: '巴基', title: '千两道化 十字公会', description: '你和巴基大神一样，气运之子！实力不重要，名气才重要。手下全是大神，自己负责搞笑和装逼，一不小心就成了四皇。这才是真正的海贼王！', quote: '我可是要成为海贼王的男人...的船员！' },
  enel: { name: '艾尼路', title: '神 响雷果实', description: '你和艾尼路一样，无敌是多么寂寞！在自己的领域就是绝对的神，只可惜运气不好遇到了主角。去了月球就是爷，月球也是海！', quote: '在这无限大的月球上，我就是神。' },
  rob_lucci: { name: '罗布·路奇', title: 'CP9 六式天才', description: '你和路奇一样，冷酷的杀戮兵器！绝对的秩序信奉者，为了正义可以不择手段。猫猫果实豹形态，速度与力量的完美结合。', quote: '正义，是要靠力量来贯彻的。' },
  caesar: { name: 'M·凯撒·库朗', title: '疯狂科学家 瓦斯果实', description: '你和凯撒一样，搞笑的反派天才！虽然人品不咋地，但科技树是真的点满了。坏归坏，但真的很有趣。', quote: '科学的力量是没有极限的！咯咯咯！' },
  carrot: { name: '加洛特', title: '月狮 毛皮族', description: '你和加洛特一样，元气满满的小太阳！平时萌萌哒，满月变身直接御姐气场拉满。活力无限，是团队里的小开心果。', quote: '我要和大家一起冒险！' },
  perona: { name: '佩罗娜', title: '幽灵公主 灵灵果实', description: '你和佩罗娜一样，哥特系小可爱！看起来是反派，其实是傲娇小公举。消极幽灵专治各种不服，索隆见了都要跪。', quote: '真是太消极了～' },
}

const FRUIT_DATA: Record<string, { name: string, rarity: string, description: string, example: string }> = {
  nika: { name: '人人果实·幻兽种·尼卡形态', rarity: '⭐⭐⭐⭐⭐ 传说级', description: '传说中的解放战士！最自由、最搞笑、最离谱的能力。橡胶的特性加上神级的想象力，没有什么做不到的！', example: '蒙奇·D·路飞' },
  sun_god_nika: { name: '人人果实·幻兽种·尼卡形态', rarity: '⭐⭐⭐⭐⭐ 传说级', description: '传说中的解放战士！最自由、最搞笑、最离谱的能力。橡胶的特性加上神级的想象力，没有什么做不到的！', example: '蒙奇·D·路飞' },
  magma: { name: '熔岩果实', rarity: '⭐⭐⭐⭐⭐ 毁灭级', description: '攻击力天花板！没有什么是岩浆烧不掉的，绝对的力量，绝对的毁灭。', example: '赤犬' },
  light: { name: '闪光果实', rarity: '⭐⭐⭐⭐⭐ 光速级', description: '天下武功，唯快不破！黄猿的快乐你不懂，速度就是力量。', example: '黄猿' },
  ice: { name: '冰冻果实', rarity: '⭐⭐⭐⭐ 自然系', description: '绝对零度！冻结大海，冻结时间，冻结一切。', example: '青雉' },
  thunder: { name: '响雷果实', rarity: '⭐⭐⭐⭐⭐ 神级', description: '我就是神！百万伏特的绝对支配，除了橡胶人谁也不怕。', example: '艾尼路' },
  quake: { name: '震震果实', rarity: '⭐⭐⭐⭐⭐ 世界最强', description: '毁灭世界的力量！可以震动空气、震动大地、震动大海。', example: '白胡子、黑胡子' },
  dark: { name: '暗暗果实', rarity: '⭐⭐⭐⭐⭐ 最凶恶', description: '引力黑洞！吸收一切，无效化一切能力，恶魔果实的克星。', example: '黑胡子' },
  shadow: { name: '影子果实', rarity: '⭐⭐⭐⭐ 幽灵级', description: '掌控别人的影子！可以制造僵尸军团，还可以给自己开BUFF。', example: '月光莫利亚' },
  poison: { name: '毒毒果实', rarity: '⭐⭐⭐⭐ 剧毒级', description: '碰一下就GG！毒龙、毒巨兵、毒之巨兵，全屏毒气警告。', example: '麦哲伦' },
  phoenix: { name: '鸟鸟果实·幻兽种·不死鸟形态', rarity: '⭐⭐⭐⭐⭐ 涅槃级', description: '浴火重生！不死不灭，蓝色火焰可以治愈一切伤害。', example: '马尔科' },
  dragon: { name: '鱼鱼果实·幻兽种·青龙形态', rarity: '⭐⭐⭐⭐⭐ 四皇级', description: '神龙降世！呼风唤雨，热息毁天灭地。', example: '凯多' },
  buddha: { name: '人人果实·幻兽种·大佛形态', rarity: '⭐⭐⭐⭐⭐ 元帅级', description: '化身佛陀！巨大的金身带来压倒性的力量。', example: '战国' },
  ope: { name: '手术果实', rarity: '⭐⭐⭐⭐⭐ 究极级', description: '空间王者！ROOM之内我就是神，甚至可以赐予人类永生。', example: '特拉法尔加·罗' },
  string: { name: '线线果实', rarity: '⭐⭐⭐⭐ 觉醒级', description: '操控一切！寄生线、鸟笼、觉醒之后连地面都变成线。', example: '多弗朗明哥' },
  soul: { name: '灵魂果实', rarity: '⭐⭐⭐⭐ 灵魂级', description: '灵魂抽取！可以把寿命注入物体，制造霍米兹军团。', example: '大妈' },
  gravity: { name: '重力果实', rarity: '⭐⭐⭐⭐ 陨石级', description: '天降陨石！可以操控重力，飞天遁地无所不能。', example: '藤虎' },
  door: { name: '门门果实', rarity: '⭐⭐⭐ 空间系', description: '想去哪里就去哪里！开门就是任意门。', example: '布鲁诺' },
  mirror: { name: '镜镜果实', rarity: '⭐⭐⭐ 空间系', description: '镜像世界！复制对手，穿越镜子，偷袭神器。', example: '布蕾' },
  slow: { name: '迟钝果实', rarity: '⭐⭐⭐ 时间系', description: '时间减速！30秒的绝对支配，可惜使用者是个笨蛋。', example: '福克西' },
  hormone: { name: '荷尔蒙果实', rarity: '⭐⭐⭐ 人体改造', description: '性别自由！可以改变人的性别、情绪、战斗力。', example: '伊万科夫' },
  ghost: { name: '灵灵果实', rarity: '⭐⭐⭐ 精神系', description: '消极幽灵！再强的人也会变得消极到不想活。', example: '佩罗娜' },
  paw: { name: '肉球果实', rarity: '⭐⭐⭐⭐ 神级', description: '弹开一切！可以弹开伤害、弹开疲劳、弹开空气。', example: '大熊' },
  baro: { name: '屏障果实', rarity: '⭐⭐⭐ 绝对防御', description: '无敌屏障！只要我不想被打，谁也打不到我。', example: '巴托洛米奥' },
  chop: { name: '四分五裂果实', rarity: '⭐⭐⭐ 幸运S', description: '砍不死！斩击无效，巴基大神永远滴神。', example: '巴基' },
  smoke: { name: '烟雾果实', rarity: '⭐⭐⭐ 自然系', description: '烟雾缭绕！虽然老是输，但逼格还是有的。', example: '斯摩格' },
  sand: { name: '沙沙果实', rarity: '⭐⭐⭐⭐ 自然系', description: '沙漠之王！吸干一切水分，沙尘暴毁天灭地。', example: '克洛克达尔' },
  flare: { name: '烧烧果实', rarity: '⭐⭐⭐⭐ 自然系', description: '炎帝降世！火焰就是我的武器，火拳穿心！', example: '艾斯、萨博' },
  ace: { name: '烧烧果实', rarity: '⭐⭐⭐⭐ 自然系', description: '炎帝降世！火焰就是我的武器，火拳穿心！', example: '艾斯、萨博' },
  gas: { name: '瓦斯果实', rarity: '⭐⭐⭐ 科学家', description: '毒气专家！虽然人品不行，但科学是无辜的。', example: '凯撒' },
  snow: { name: '雪雪果实', rarity: '⭐⭐⭐ 自然系', description: '冰雪女王！冻结一切，美丽又致命。', example: '莫奈' },
  wax: { name: '蜡蜡果实', rarity: '⭐⭐⭐ 超人系', description: '蜡烛大师！可以做出任何形状的蜡烛。', example: 'Mr.3' },
  kilo: { name: '公斤果实', rarity: '⭐⭐⭐ 超人系', description: '体重自由！一吨砸下来谁顶得住。', example: 'Miss.情人节' },
  mythical_zoan: { name: '动物系·幻兽种', rarity: '⭐⭐⭐⭐⭐ 幻兽级', description: '传说中的神兽之力！不仅有动物系的超强恢复力，还有各种神话级别的特殊能力。站在恶魔果实金字塔顶端的存在！', example: '马尔科、战国、凯多' },
  ancient_zoan: { name: '动物系·古代种', rarity: '⭐⭐⭐⭐ 珍稀级', description: '远古生物的原始力量！超强的防御力和生命力，一旦兽化就变成战争机器。简单粗暴，但就是强！', example: '三灾、凌空六子' },
  zoan: { name: '动物系', rarity: '⭐⭐⭐ 优秀级', description: '三倍快乐！人形态、兽人形态、兽形态随意切换。身体素质全面提升，打不死的小强就是你！', example: 'CP9、乔巴' },
  logia: { name: '自然系', rarity: '⭐⭐⭐⭐ 幻神级', description: '元素化就是最大的bug！免疫物理攻击，大范围AOE清场，新手村的绝对王者。', example: '三大将、艾斯、烟男' },
  special_paramythia: { name: '特殊超人系', rarity: '⭐⭐⭐⭐ 逆天级', description: '改变世界规则的能力！时间、空间、因果...没有什么是不能操控的。觉醒之后就是神级！', example: '罗、多弗朗明哥、巴雷特' },
  paramythia: { name: '超人系', rarity: '⭐⭐⭐ 潜力级', description: '想象力比能力本身更重要！最有开发潜力的果种。觉醒之后毁天灭地，普通人也能玩出神级操作！', example: '白胡子、金狮子、大熊' },
  swordsman: { name: '无上大快刀', rarity: '⭐⭐⭐⭐⭐ 剑圣级', description: '什么恶魔果实？老子不需要！一剑破万法，修炼剑道的极致才是真男人的选择！', example: '鹰眼、索隆、红发' },
  clown: { name: '四分五裂果实', rarity: '⭐⭐⭐⭐⭐ 神运级', description: '巴基大神专属！运气也是实力的一部分，而且是最重要的那部分。', example: '巴基' },
  smile: { name: '人造SMILE果实', rarity: '⭐⭐ 残次品', description: '要么笑要么死！快乐的代价就是失去其他表情。', example: '给赋者们' },
  immortal: { name: '手术果实·不老手术', rarity: '⭐⭐⭐⭐⭐ 禁忌级', description: '永生的代价！获得永恒的生命，但也意味着永恒的孤独。', example: '历代手术果实能力者' },
  op: { name: '手术果实', rarity: '⭐⭐⭐⭐⭐ 究极级', description: '空间王者！ROOM之内我就是神，甚至可以赐予人类永生。', example: '特拉法尔加·罗' },
  yomi: { name: '黄泉果实', rarity: '⭐⭐⭐⭐ 不死级', description: '再来一条命！死了也能回来，灵魂出窍到处浪。', example: '布鲁克' },
}

const POSITION_DATA: Record<string, { name: string, importance: string, description: string, icon: string }> = {
  captain: { name: '船长', importance: '⭐⭐⭐⭐⭐ 灵魂人物', description: '没有你，这个团就不存在！指引方向，做出决断，用你的人格魅力把所有人凝聚在一起。', icon: '👑' },
  first_mate: { name: '副船长', importance: '⭐⭐⭐⭐⭐ 定海神针', description: '船长犯傻的时候，就是你该出场的时候了！所有人都慌了的时候，你就是那个定海神针。', icon: '🛡️' },
  swordsman: { name: '剑士', importance: '⭐⭐⭐⭐⭐ 最强之刃', description: '只要我还站着，就没有人能越过我伤到船长！迷路只是萌点，可靠才是本质。', icon: '⚔️' },
  navigator: { name: '航海士', importance: '⭐⭐⭐⭐⭐ 大海的向导', description: '没有什么暴风雨能难倒我！因为我就是暴风雨本身。', icon: '🧭' },
  cook: { name: '厨师', importance: '⭐⭐⭐⭐⭐ 生命保障', description: '饿肚子的人没资格谈梦想！敢浪费食物的人就算是船长我也照踢不误。', icon: '🍳' },
  sniper: { name: '狙击手', importance: '⭐⭐⭐⭐ 远程王者', description: '距离不是问题，问题是我想不想打你！我说我要死了就真的要死了——因为我从不说谎。', icon: '🎯' },
  doctor: { name: '船医', importance: '⭐⭐⭐⭐ 健康守护神', description: '就算你们都放弃了，我也不会放弃任何一个人！卖萌也是很重要的工作。', icon: '💊' },
  archaeologist: { name: '考古学家', importance: '⭐⭐⭐⭐ 历史解密者', description: '真相只有一个！而我就是那个找到真相的人。知识就是力量，我就是行走的图书馆。', icon: '📜' },
  shipwright: { name: '船匠', importance: '⭐⭐⭐⭐ 船的守护者', description: '变态是赞美，不接受反驳！没有什么是一杯可乐解决不了的，如果有就两杯。', icon: '🔧' },
  musician: { name: '音乐家', importance: '⭐⭐⭐ 灵魂歌者', description: '人死了就什么都没了，但音乐是永恒的！宴会是海上最重要的仪式。', icon: '🎵' },
  helmsman: { name: '舵手', importance: '⭐⭐⭐⭐ 航行掌控者', description: '大海是我的游乐场，风浪是我的游乐场设施！船就是我的生命，敢碰她我就跟你拼命。', icon: '⚓' },
  treasurer: { name: '财政大臣', importance: '⭐⭐⭐ 管钱的', description: '敢偷我钱的人，我就让他知道什么是真正的绝望！钱要花在刀刃上。', icon: '💰' },
  mascot: { name: '团宠/吉祥物', importance: '⭐⭐⭐⭐⭐ 治愈核心', description: '可爱就是正义！所有人都爱你，你就是治愈一切的力量。', icon: '🐾' },
  comedian: { name: '搞笑担当', importance: '⭐⭐⭐ 气氛调节者', description: '大家都很正经的时候，总得有个人出来搞搞笑！欢乐才是冒险的真谛。', icon: '🤡' },
  tsukkomi: { name: '吐槽担当', importance: '⭐⭐⭐ 逻辑担当', description: '打架我不行，但吐槽你们谁也不行！维持船上的正常三观就靠我了。', icon: '💢' },
  strategist: { name: '军师/参谋', importance: '⭐⭐⭐⭐ 战术大师', description: '计划是死的，人是活的，随机应变才是王道！算无遗策，智斗无双。', icon: '🧠' },
  diplomat: { name: '外交官', importance: '⭐⭐⭐ 和平大使', description: '没有永远的敌人，只有永远的利益！能不动手就不动手。', icon: '🤝' },
  intelligence: { name: '情报官', importance: '⭐⭐⭐ 信息中枢', description: '知己知彼百战不殆，情报就是最好的武器！', icon: '🕵️' },
  everybody: { name: '伙伴', importance: '⭐⭐⭐⭐⭐ 核心', description: '海贼王可以不当，但伙伴不能不救！我们是家人啊！', icon: '🏴‍☠️' },
  blacksmith: { name: '武器专家', importance: '⭐⭐ 兵器保养', description: '刀钝了？枪坏了？找我就对了！', icon: '⚒️' },
  quartermaster: { name: '军需官', importance: '⭐⭐ 后勤保障', description: '物资储备，补给采购！船上永远不会缺东西。', icon: '📦' },
  stylist: { name: '造型师', importance: '⭐ 颜值担当', description: '形象很重要！我们可是要上报纸封面的。', icon: '💄' },
  conscience: { name: '船上的良心', importance: '⭐⭐⭐ 道德底线', description: '阻止船长犯傻，制止大家乱来！维持船上的正常三观。', icon: '✨' },
  chronicler: { name: '记录员', importance: '⭐⭐ 传说记录者', description: '我们的冒险，要让全世界都知道！', icon: '📖' },
}

function calculateCharacterMatch(answers: Answer[]): AssessmentResult {
  const scores: Record<string, number> = {}
  answers.forEach(answer => {
    const question = characterMatchQuestions.find(q => q.id === answer.questionId)
    if (question?.meta?.characters) {
      question.meta.characters.forEach((char: string) => {
        if (!scores[char]) scores[char] = 0
        scores[char] += (answer.value || 3) * (question.meta?.weight || 1)
      })
    }
  })

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1])
  const topChar = sorted[0][0]
  const charInfo = CHARACTER_DATA[topChar] || CHARACTER_DATA.luffy

  return {
    type: 'onepiece-character',
    title: `🎭 ${charInfo.name}`,
    description: charInfo.title,
    score: Math.round((sorted[0][1] / (sorted[0][1] + (sorted[1]?.[1] || 0))) * 100),
    accuracy: 0.85,
    dimensions: [
      { name: '匹配度', score: Math.round((sorted[0][1] / 150) * 100), maxScore: 100, description: `${charInfo.name}相似度` },
    ],
    strengths: [charInfo.quote],
    weaknesses: [],
    careers: [],
    meta: {
      character: topChar,
      characterName: charInfo.name,
      description: charInfo.description,
      topMatches: sorted.slice(0, 3).map(([id, score]) => ({
        name: CHARACTER_DATA[id]?.name || id,
        score: Math.round((score / 150) * 100),
      })),
    },
  }
}

function calculateDevilFruit(answers: Answer[]): AssessmentResult {
  const scores: Record<string, number> = {}
  answers.forEach(answer => {
    const question = devilFruitQuestions.find(q => q.id === answer.questionId)
    if (question?.meta?.fruits) {
      const fruits = question.meta.fruits as string[]
      fruits.forEach(fruit => {
        if (!scores[fruit]) scores[fruit] = 0
        scores[fruit] += (answer.value || 3) * (question.meta?.weight || 1)
      })
    }
  })

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1])
  const topFruit = sorted[0][0]
  const fruitInfo = FRUIT_DATA[topFruit] || FRUIT_DATA.paramythia

  return {
    type: 'onepiece-devil-fruit',
    title: `🍎 ${fruitInfo.name}`,
    description: fruitInfo.rarity,
    score: Math.round((sorted[0][1] / 100) * 100),
    accuracy: 0.88,
    dimensions: [
      { name: '契合度', score: Math.min(100, Math.round((sorted[0][1] / 80) * 100)), maxScore: 100, description: '与你的灵魂契合度' },
    ],
    strengths: [`代表人物：${fruitInfo.example}`],
    weaknesses: [],
    careers: [],
    meta: {
      fruit: topFruit,
      fruitName: fruitInfo.name,
      description: fruitInfo.description,
      rarity: fruitInfo.rarity,
      topMatches: sorted.slice(0, 4).map(([id, score]) => ({
        name: FRUIT_DATA[id]?.name || id,
        score: Math.round((score / 80) * 100),
      })),
    },
  }
}

function calculateCrewPosition(answers: Answer[]): AssessmentResult {
  const scores: Record<string, number> = {}
  answers.forEach(answer => {
    const question = crewPositionQuestions.find(q => q.id === answer.questionId)
    if (question?.meta?.positions) {
      const positions = question.meta.positions as string[]
      positions.forEach(position => {
        if (!scores[position]) scores[position] = 0
        scores[position] += (answer.value || 3) * (question.meta?.weight || 1)
      })
    }
  })

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1])
  const topPosition = sorted[0][0]
  const positionInfo = POSITION_DATA[topPosition] || POSITION_DATA.mascot

  return {
    type: 'onepiece-crew-position',
    title: `${positionInfo.icon} ${positionInfo.name}`,
    description: positionInfo.importance,
    score: Math.round((sorted[0][1] / 40) * 100),
    accuracy: 0.90,
    dimensions: [
      { name: '胜任度', score: Math.min(100, Math.round((sorted[0][1] / 35) * 100)), maxScore: 100, description: '你的岗位匹配度' },
    ],
    strengths: [positionInfo.description],
    weaknesses: [],
    careers: [],
    meta: {
      position: topPosition,
      positionName: positionInfo.name,
      description: positionInfo.description,
      importance: positionInfo.importance,
      icon: positionInfo.icon,
      allPositions: sorted.slice(0, 5).map(([id, score]) => ({
        name: POSITION_DATA[id]?.name || id,
        icon: POSITION_DATA[id]?.icon || '❓',
        score: Math.min(100, Math.round((score / 35) * 100)),
      })),
    },
  }
}

export const onepieceEntrance = {
  id: 'onepiece-main',
  title: '🏴‍☠️ 海贼王测评专区',
  description: '伟大航路的勇者，你准备好了吗？内含角色匹配、恶魔果实鉴定等三大专业测评，海米专属认证！',
  icon: '🏴‍☠️',
  modes: [
    {
      id: 'character-match',
      title: '🗺️ 角色匹配',
      description: '测一测你是海贼王里的谁？基于行为风格的深度匹配，27个角色全覆盖',
      questionCount: 90,
      difficulty: 'standard',
    },
    {
      id: 'devil-fruit',
      title: '🍎 恶魔果实鉴定',
      description: '50道题鉴定适合你的恶魔果实，含幻兽种/尼卡等稀有分支',
      questionCount: 50,
      difficulty: 'standard',
    },
    {
      id: 'crew-position',
      title: '⚓ 船员定位',
      description: '如果加入草帽团，你会担任什么职位？19个船上位置全覆盖',
      questionCount: 40,
      difficulty: 'standard',
    },
  ],
}

export const characterMatchAssessment = {
  id: 'onepiece-character-match',
  title: '🗺️ 海贼王角色匹配',
  description: '测一测你是海贼王里的谁？基于行为风格的深度匹配，27个角色全覆盖',
  category: '娱乐趣味',
  difficulty: 'standard',
  duration: 15,
  questionCount: 90,
  questions: characterMatchQuestions,
  resultCalculator: calculateCharacterMatch,
  tag: '🎭 灵魂拷问',
}

export const devilFruitAssessment = {
  id: 'onepiece-devil-fruit',
  title: '🍎 恶魔果实鉴定',
  description: '50道题鉴定适合你的恶魔果实，含幻兽种/尼卡/手术果实等稀有分支',
  category: '娱乐趣味',
  difficulty: 'standard',
  duration: 8,
  questionCount: 50,
  questions: devilFruitQuestions,
  resultCalculator: calculateDevilFruit,
  tag: '✨ 能力觉醒',
}

export const crewPositionAssessment = {
  id: 'onepiece-crew-position',
  title: '⚓ 草帽团船员定位',
  description: '如果加入草帽团，你会担任什么职位？19个船上位置全覆盖',
  category: '娱乐趣味',
  difficulty: 'standard',
  duration: 7,
  questionCount: 40,
  questions: crewPositionQuestions,
  resultCalculator: calculateCrewPosition,
  tag: '🏴‍☠️ 上船',
}

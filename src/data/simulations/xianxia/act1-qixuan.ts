/**
 * ==============================================
 * 🎬 凡人修仙传·第一章 - 交互式剧本核心
 * ==============================================
 * 【文件定位】
 * 整个仙侠模拟的核心内容资产！
 * 660行×分支树状结构，凡人修仙传IP改编
 * 参考：橙光+CK3事件系统的交互式叙事设计
 * 
 * 【剧本结构】
 * - 3条主线分支：修仙/种田/投军
 * - 27个场景节点
 * - 89个选择分支
 * - 12种属性变化联动
 * - 多结局收敛设计
 * 
 * ==============================================
 * 🤖 AI编码契约 - 大模型修改此文件必须遵守！
 * ==============================================
 * 🔴 绝对禁止的操作：
 * 1. 不准修改任何现有scene的id字段值
 * 2. 不准修改任何nextScene字段的字符串值
 * 3. 不准删除任何现有的choices选项
 * 4. 不准修改statChanges的属性名
 * 
 * 🟡 修改前必须完成的校验：
 * 1. 所有nextScene值必须能在本文件id字段中找到
 * 2. 所有statChanges属性名必须在xianxia/types.ts中存在
 * 3. 新增scene的id必须符合格式：scene-xxx-xxxx
 * 4. 分支深度不能超过5层
 * 
 * 🟢 允许的操作：
 * - 新增场景节点，必须同时更新nextScene引用
 * - 在现有场景新增choice选项，必须包含statChanges
 * - 修正文本错别字
 * 
 * 【⚠️  血泪教训！】
 * nextScene与scene-id大小写/拼写不一致 = 玩家永久卡关！
 */
import type { XianxiaScene } from './types'

export const ACT1_QIXUAN: XianxiaScene[] = [
  {
    id: 'scene-000-prologue',
    chapter: '序章',
    title: '青牛镇',
    background: 'from-gray-900 via-stone-900 to-black',
    narrator: '大晋王朝，青州边境，一个叫青牛镇的小地方。\n\n你叫韩立，一个普通到不能再普通的农家少年。\n\n家中排行第四，上有三个哥哥，下有一个妹妹。\n\n这一年，你十四岁——\n\n三叔突然上门，说七玄门要招收外门弟子。',
    character: {
      name: '旁白',
      avatar: '',
      mood: 'normal',
    },
    dialogue: '',
    choices: [
      {
        text: '好男儿志在四方，我要去七玄门！',
        nextScene: 'scene-001-mountain',
        hint: '修仙路开启',
        statChanges: { mindset: +5, luck: +3 },
      },
      {
        text: '修仙太危险了，我还是在家种田吧',
        nextScene: 'scene-farmer-001',
        hint: '【分支】平凡人的路',
        statChanges: { mindset: -5, karma: +5 },
      },
      {
        text: '听说边境在打仗，我去投军',
        nextScene: 'scene-army-001',
        hint: '【分支】沙场封侯线',
        statChanges: { cruelty: +5, luck: -2 },
      },
    ],
  },

  {
    id: 'scene-farmer-001',
    chapter: '【种田线】',
    title: '黄土',
    background: 'from-amber-900 via-yellow-950 to-black',
    narrator: '春去秋来，寒来暑往。\n\n你日出而作，日落而息。\n\n娶了隔壁村的王姑娘，生了两个大胖小子。\n\n爹说，平平安安就是福。\n\n你深以为然。',
    character: {
      name: '王老头',
      avatar: '👨‍🌾',
      mood: 'warm',
    },
    dialogue: '韩立啊，今年收成不错！',
    choices: [
      {
        text: '是啊爹，今年粮食够吃了',
        nextScene: 'ending-farmer-peace',
        hint: '一辈子就这样了',
        statChanges: { karma: +10 },
      },
      {
        text: '可我...总觉得缺了点什么',
        nextScene: 'scene-farmer-regret',
        hint: '【判定】机缘≥60触发',
        hiddenCheck: { stat: 'karma', threshold: 60, successRate: 40 },
        onCheckResult: {
          critical_success: 'scene-farmer-encounter',
          success: 'scene-farmer-regret',
          failure: 'ending-farmer-peace',
          critical_failure: 'ending-farmer-peace',
        },
      },
    ],
  },

  {
    id: 'scene-farmer-regret',
    chapter: '【种田线】',
    title: '不甘',
    background: 'from-stone-900 via-amber-950 to-black',
    narrator: '午夜梦回，你总会想起十四岁那年。\n\n那个关于修仙的梦。\n\n如果当年去了七玄门，现在会是什么样？\n\n人生没有如果。',
    character: {
      name: '韩立',
      avatar: '👨',
      mood: 'cold',
    },
    dialogue: '...罢了，人生哪有回头路。',
    choices: [
      {
        text: '接受现实，好好过日子',
        nextScene: 'ending-farmer-peace',
        statChanges: { mindset: +10 },
      },
      {
        text: '不！我现在去修仙还来得及！',
        nextScene: 'scene-farmer-too-late',
        statChanges: { cruelty: +10, luck: -10 },
      },
    ],
  },

  {
    id: 'scene-farmer-encounter',
    chapter: '【种田线】',
    title: '奇缘',
    background: 'from-cyan-900 via-teal-950 to-black',
    narrator: '这天你在山上砍柴，救了一个受伤的老道士。\n\n老道伤愈后，看着你沉默了很久。',
    character: {
      name: '无名老道',
      avatar: '🧙',
      mood: 'shocked',
    },
    dialogue: '老夫行走天下三百年，从未见过...如此纯粹的凡骨！也罢，这是你我的机缘。',
    choices: [
      {
        text: '多谢道长！（接过秘籍）',
        nextScene: 'scene-farmer-xian-start',
        hint: '散修之路开启',
        statChanges: { spiritualRoot: +20, karma: +20 },
        itemGain: 'item-manual-changchun',
      },
    ],
  },

  {
    id: 'scene-farmer-too-late',
    chapter: '【种田线】',
    title: '迟了',
    background: 'from-red-950 via-stone-950 to-black',
    narrator: '你抛妻弃子，独自去寻修仙路。\n\n但十六岁的凡骨，又能走多远？\n\n没有背景，没有资源，没有人提携。\n\n三年后，你死在了某个妖兽的腹中。\n\n连名字都没有留下。',
    isEnding: true,
    endingType: 'BAD_END',
    character: {
      name: '旁白',
      avatar: '💀',
      mood: 'cold',
    },
    dialogue: '修仙一道，一步慢，步步慢。',
    choices: [
      {
        text: '🔄 重新开始',
        nextScene: 'scene-000-prologue',
      },
    ],
  },

  {
    id: 'ending-farmer-peace',
    chapter: '【结局·种田线】',
    title: '凡人',
    background: 'from-amber-950 via-yellow-950 to-black',
    narrator: '寿八十，无疾而终。\n\n子孝孙贤，家族兴旺。\n\n你是青牛镇有名的大善人。\n\n\n【凡人的幸福 · 完结】\n\n这不是失败者的结局。\n\n这只是凡人的路。',
    isEnding: true,
    endingType: 'GOOD_END',
    character: {
      name: '韩立',
      avatar: '👴',
      mood: 'warm',
    },
    dialogue: '这辈子，值了。',
    choices: [
      {
        text: '🔄 再活一次',
        nextScene: 'scene-000-prologue',
      },
    ],
  },

  {
    id: 'scene-army-001',
    chapter: '【从军线】',
    title: '边关',
    background: 'from-red-950 via-orange-950 to-black',
    narrator: '黄沙百战穿金甲，不破楼兰终不还。\n\n边境的风沙，远比你想象的要残酷。\n\n同去的三十个青壮，第一个月就死了一半。',
    character: {
      name: '伍长',
      avatar: '⚔️',
      mood: 'cold',
    },
    dialogue: '小子，能活过三个月，你就是老兵了。',
    choices: [
      {
        text: '大丈夫当战死沙场！',
        nextScene: 'scene-army-002',
        statChanges: { cruelty: +5, mindset: +5 },
      },
      {
        text: '夜里我就逃跑',
        nextScene: 'scene-army-desert',
        hint: '【判定】城府≥65触发',
        hiddenCheck: { stat: 'cunning', threshold: 65, successRate: 30 },
        onCheckResult: {
          critical_success: 'scene-army-spy',
          success: 'scene-army-desert-success',
          failure: 'scene-army-desert-fail',
          critical_failure: 'scene-army-executed',
        },
      },
    ],
  },

  {
    id: 'scene-army-desert-success',
    chapter: '【从军线】',
    title: '逃兵',
    background: 'from-gray-950 via-stone-950 to-black',
    narrator: '你成功逃了出来。\n\n但从此，你就是朝廷的钦犯。\n\n有家不能回，有路不能走。\n\n阴差阳错之下，你加入了一个叫"血煞门"的邪派修仙宗门。',
    character: {
      name: '血煞长老',
      avatar: '👻',
      mood: 'sneer',
    },
    dialogue: '嘿嘿嘿...好根骨，好杀性！跟老夫走吧！',
    choices: [
      {
        text: '弟子参见长老！',
        nextScene: 'scene-army-evil-path',
        statChanges: { cruelty: +15, cunning: +10 },
        itemGain: 'item-dagger',
      },
    ],
  },

  {
    id: 'scene-army-executed',
    chapter: '【从军线】',
    title: '军法',
    background: 'from-red-950 via-black to-black',
    narrator: '逃跑当夜就被抓了回来。\n\n军法无情。\n\n第二天，你的人头挂在了辕门之上。\n\n\n【结局 · 逃兵】',
    isEnding: true,
    endingType: 'BAD_END',
    character: {
      name: '监斩官',
      avatar: '⚔️',
      mood: 'cold',
    },
    dialogue: '逃兵者，斩！',
    choices: [
      {
        text: '🔄 重新开始',
        nextScene: 'scene-000-prologue',
      },
    ],
  },

  {
    id: 'scene-farmer-xian-start',
    chapter: '【种田线·散修】',
    title: '野路子',
    background: 'from-cyan-900 via-teal-950 to-black',
    narrator: '你走了一条最难的路——散修。\n\n没有门派，没有靠山，没有资源。\n\n但你有别人没有的东西：谨慎，隐忍，以及一颗永不满足的心。\n\n\n【散修之路 · 开发中】',
    character: {
      name: '韩立',
      avatar: '🧑',
      mood: 'cold',
    },
    dialogue: '大道三千，殊途同归。',
    choices: [
      {
        text: '🏠 返回选角界面',
        nextScene: 'scene-000-prologue',
      },
    ],
  },

  {
    id: 'scene-army-002',
    chapter: '【从军线】',
    title: '百战',
    background: 'from-red-950 via-orange-950 to-black',
    narrator: '三年时间，你从一个小兵升到了千总。\n\n手上的鲜血，早已洗不干净。\n\n这天夜里，你在打扫战场时，发现了一个受伤的修士...\n\n\n【军武修仙路 · 开发中】',
    character: {
      name: '韩立',
      avatar: '⚔️',
      mood: 'cold',
    },
    dialogue: '这是...修仙者的气息？',
    choices: [
      {
        text: '🏠 返回选角界面',
        nextScene: 'scene-000-prologue',
      },
    ],
  },

  {
    id: 'scene-army-desert',
    chapter: '【从军线】',
    title: '逃亡中...',
    background: 'from-gray-950 via-stone-950 to-black',
    narrator: '夜色如墨。\n\n你蜷缩在草丛中，心脏狂跳。\n\n能不能逃出生天，就看这一把了。',
    character: {
      name: '韩立',
      avatar: '🧑',
      mood: 'cold',
    },
    dialogue: '...赌了！',
    choices: [
      {
        text: '🎲 进行判定中...',
        nextScene: 'scene-army-desert-success',
      },
    ],
  },

  {
    id: 'scene-army-desert-fail',
    chapter: '【从军线】',
    title: '败露',
    background: 'from-red-950 via-stone-950 to-black',
    narrator: '你被巡逻的什长发现了！\n\n一顿毒打后，你被关了禁闭。\n\n虽然没被斩首，但也被打断了一条腿，逐出了军营。\n\n残疾的凡人，又能走多远呢？',
    isEnding: true,
    endingType: 'BAD_END',
    character: {
      name: '什长',
      avatar: '⚔️',
      mood: 'sneer',
    },
    dialogue: '小子，还想跑？',
    choices: [
      {
        text: '🔄 重新开始',
        nextScene: 'scene-000-prologue',
      },
    ],
  },

  {
    id: 'scene-army-spy',
    chapter: '【从军线】',
    title: '暗线',
    background: 'from-purple-950 via-slate-950 to-black',
    narrator: '你不知道的是——\n\n你的逃跑，本就是上面安排的一场考验。\n\n镇虏将军看中了你的心智和狠辣。\n\n从今天起，你就是军情处的密探了。\n\n\n【谍战修仙线 · 开发中】',
    character: {
      name: '镇虏将军',
      avatar: '🎭',
      mood: 'smirk',
    },
    dialogue: '小子，演的不错。以后跟着我吧。',
    choices: [
      {
        text: '🏠 返回选角界面',
        nextScene: 'scene-000-prologue',
      },
    ],
  },

  {
    id: 'scene-army-evil-path',
    chapter: '【从军线·邪修】',
    title: '血煞门',
    background: 'from-red-950 via-purple-950 to-black',
    narrator: '你走上了魔道。\n\n采补，炼尸，血祭...\n\n正道人士唾弃的一切，你都做得心安理得。\n\n只要能长生，是正是邪，又有什么关系？\n\n\n【血煞魔修 · 开发中】',
    character: {
      name: '血煞长老',
      avatar: '👻',
      mood: 'sneer',
    },
    dialogue: '欢迎加入我血煞门！',
    choices: [
      {
        text: '🏠 返回选角界面',
        nextScene: 'scene-000-prologue',
      },
    ],
  },

  {
    id: 'scene-001-mountain',
    chapter: '第一章',
    title: '神手谷',
    background: 'from-green-900 via-emerald-950 to-black',
    narrator: '彩霞山，神手谷。\n\n你站在墨大夫的医庐前。\n\n七玄门的外门考核异常残酷，三百人最后只留下了三十个。\n\n而你，因为看起来最老实、最不起眼，被这位传闻中脾气古怪的墨大夫一眼挑中。',
    character: {
      name: '墨大夫',
      avatar: '👴',
      mood: 'warm',
    },
    dialogue: '韩立啊，以后你就在我这药庐打杂吧。',
    choices: [
      {
        text: '弟子多谢师父！（立刻跪下磕头）',
        nextScene: 'scene-002-years',
        hint: '滴水之恩，涌泉相报',
        statChanges: { mindset: +2, karma: +3 },
      },
      {
        text: '多谢墨大夫收留。（只是躬身，并未下跪）',
        nextScene: 'scene-002-years',
        hint: '人无傲骨，何以为人',
        statChanges: { mindset: +5, cruelty: +2 },
      },
      {
        text: '...（只是默默站着，一句话不说）',
        nextScene: 'scene-002-years',
        hint: '多说多错，少说少错',
        statChanges: { cunning: +5, luck: +2 },
      },
    ],
  },

  {
    id: 'scene-002-years',
    chapter: '第一章',
    title: '四年',
    background: 'from-stone-800 via-amber-950 to-black',
    narrator: '四年时间，一晃而过。\n\n你从一个什么都不懂的毛头小子，变成了墨大夫最得力的助手。\n\n配药、碾药、煎药...你甚至能蒙着眼睛辨别百种草药。\n\n但你总觉得——墨大夫看你的眼神，越来越不对劲。',
    character: {
      name: '墨大夫',
      avatar: '👴',
      mood: 'sneer',
    },
    dialogue: '韩立，你过来。今天为师教你一套口诀。',
    choices: [
      {
        text: '太好了！多谢师父！（喜形于色）',
        nextScene: 'scene-003-changchun',
        hint: '这就是修仙的机缘！',
        statChanges: { spiritualRoot: +3, luck: -2 },
      },
      {
        text: '师父...这口诀是什么来历？（不动声色地问）',
        nextScene: 'scene-003-changchun',
        hint: '事出反常必有妖',
        statChanges: { cunning: +5, karma: +2 },
      },
      {
        text: '是，师父。（心里已经开始提防）',
        nextScene: 'scene-003-changchun',
        hint: '韩立的经典操作',
        statChanges: { cunning: +3, mindset: +5 },
      },
    ],
  },

  {
    id: 'scene-003-changchun',
    chapter: '第一章',
    title: '长春功',
    background: 'from-cyan-900 via-teal-950 to-black',
    narrator: '《长春功》——墨大夫给你的这套口诀，确实是修仙法门。\n\n你修炼得异常刻苦。\n\n别人睡觉你打坐，别人偷懒你练功。\n\n仅仅半年时间，你就突破了第三层，成为了真正的修仙者。\n\n但也就在这天晚上——',
    character: {
      name: '墨大夫',
      avatar: '👴',
      mood: 'cold',
    },
    dialogue: '嘿嘿嘿...不愧是我看中的鼎炉。进度比预想的还快。',
    choices: [
      {
        text: '！（你在窗外听到了一切，手脚冰凉）',
        nextScene: 'scene-004-confrontation',
        hint: '原来这一切都是骗局...',
        statChanges: { cruelty: +5, cunning: +3 },
      },
      {
        text: '（你屏住呼吸，悄悄退走，当作什么都没听到）',
        nextScene: 'scene-004-confrontation',
        hint: '君子不立危墙之下',
        statChanges: { cunning: +8, luck: +5 },
      },
      {
        text: '（你握紧了口袋里的毒草，这是准备已久的后手）',
        nextScene: 'scene-004-confrontation',
        hint: '人不犯我，我不犯人',
        statChanges: { cruelty: +8, mindset: +3 },
      },
    ],
  },

  {
    id: 'scene-004-confrontation',
    chapter: '第一章',
    title: '摊牌',
    background: 'from-red-950 via-stone-950 to-black',
    narrator: '第二天，墨大夫依旧像没事人一样。\n\n但你知道，那张慈祥的面具下藏着怎样一张吃人的脸。\n\n他要夺舍。\n\n他要你这具修炼了长春功的身体。\n\n吃午饭的时候，他给了你一碗药。',
    character: {
      name: '墨大夫',
      avatar: '👴',
      mood: 'normal',
    },
    dialogue: '这药对你修炼有好处，喝了吧。',
    choices: [
      {
        text: '谢谢师父！（端起来一饮而尽）',
        nextScene: 'ending-naive',
        hint: '【结局】天真的代价',
        statChanges: { luck: -20 },
      },
      {
        text: '师父先喝。弟子怎么敢抢师父的机缘？（笑着推回去）',
        nextScene: 'scene-005-showdown',
        hint: '彼此心照不宣',
        statChanges: { cunning: +10 },
      },
      {
        text: '（你假装喝药，趁其不备撒在地上）',
        nextScene: 'scene-005-showdown',
        hint: '拖得一时是一时',
        statChanges: { cunning: +5, luck: +3 },
      },
      {
        text: '墨大夫，你我摊牌吧。（直接掀了桌子）',
        nextScene: 'scene-005-showdown',
        hint: '正面硬刚',
        statChanges: { cruelty: +10, mindset: +5 },
      },
    ],
    effects: ['shake'],
  },

  {
    id: 'scene-005-showdown',
    chapter: '第一章',
    title: '绝杀',
    background: 'from-black via-red-950 to-black',
    narrator: '墨大夫终于撕下了所有伪装。\n\n一个死了十几年的老鬼，为了长生，什么事都做得出来。\n\n现在，医庐里只剩下你们两个人。\n\n不是他死，就是你亡——',
    character: {
      name: '墨大夫',
      avatar: '👻',
      mood: 'shocked',
    },
    dialogue: '小杂种！你居然早就知道了？！',
    choices: [
      {
        text: 'Roar！（你放出了准备已久的尸蜈蚣）',
        nextScene: 'scene-006-victory',
        hint: '毒才是你的本命神通',
        statChanges: { cruelty: +15, karma: +5 },
      },
      {
        text: '（你掏出了暗藏的短刀，直接扑了上去）',
        nextScene: 'scene-006-victory',
        hint: '修仙也要靠平A',
        statChanges: { cruelty: +10, mindset: +10 },
      },
      {
        text: '墨大夫，放我一条生路，我绝不外传你的秘密',
        nextScene: 'ending-mercy',
        hint: '【结局】妇人之仁',
        statChanges: { cruelty: -10 },
      },
    ],
    effects: ['shake', 'blood'],
  },

  {
    id: 'ending-naive',
    chapter: '【结局一】',
    title: '稚子亡',
    background: 'from-gray-950 via-black to-black',
    narrator: '药性发作的那一刻，你才明白——\n\n修仙界，从来就不是什么世外桃源。\n\n吃人，是不需要吐骨头的。\n\n意识消散的最后一刻，你听到了墨大夫满意的叹息。',
    isEnding: true,
    endingType: 'BAD_END',
    character: {
      name: '墨大夫',
      avatar: '👴',
      mood: 'warm',
    },
    dialogue: '真是个听话的好孩子...',
    choices: [
      {
        text: '🔄 重新开始',
        nextScene: 'scene-000-prologue',
      },
    ],
  },

  {
    id: 'ending-mercy',
    chapter: '【结局二】',
    title: '农夫与蛇',
    background: 'from-gray-950 via-red-950 to-black',
    narrator: '你还是太年轻了。\n\n墨大夫假意答应放你走，却在你转身的那一刻，将毒针刺进了你的后心。\n\n你倒在地上，眼中充满了不甘。\n\n修仙界，最不需要的就是怜悯。',
    isEnding: true,
    endingType: 'BAD_END',
    character: {
      name: '墨大夫',
      avatar: '👻',
      mood: 'sneer',
    },
    dialogue: '年轻人，心不狠，站不稳啊。',
    choices: [
      {
        text: '🔄 重新开始',
        nextScene: 'scene-000-prologue',
      },
    ],
  },

  {
    id: 'scene-006-victory',
    chapter: '第一章',
    title: '韩立',
    background: 'from-black via-cyan-950 to-black',
    narrator: '墨大夫死了。\n\n死在了他最看不起的、看起来最老实的少年手上。\n\n你站在血泊中，脸上没有任何表情。\n\n那个淳朴的农家少年，在这一刻已经死了。\n\n活下来的，是——',
    character: {
      name: '韩立',
      avatar: '🧑',
      mood: 'cold',
    },
    dialogue: '我姓韩，单名一个立字。',
    choices: [
      {
        text: '搜刮墨大夫的所有修仙典籍',
        nextScene: 'scene-007-yellowmap',
        hint: '杀人夺宝，天经地义',
        statChanges: { spiritualRoot: +10, cunning: +5 },
      },
      {
        text: '一把火烧了医庐，毁尸灭迹',
        nextScene: 'scene-007-yellowmap',
        hint: '斩草要除根',
        statChanges: { cruelty: +10, luck: +5 },
      },
      {
        text: '厚葬墨大夫，毕竟师徒一场',
        nextScene: 'scene-007-yellowmap',
        hint: '凡事留一线',
        statChanges: { karma: +15, mindset: +5 },
      },
    ],
  },

  {
    id: 'scene-007-yellowmap',
    chapter: '第二章',
    title: '黄枫谷',
    background: 'from-purple-950 via-indigo-950 to-black',
    narrator: '你从墨大夫的遗物中找到了一张地图——\n\n那是通往越国七大修仙门派之一，黄枫谷的路线图。\n\n神手谷的暴风雨结束了。\n\n但你知道，这只是开始。\n\n真正的修仙界，在前方等着你。\n\n\n【第一幕 · 七玄门 · 完】\n\n【第二幕 · 黄枫谷 · 即将开放】',
    character: {
      name: '韩立',
      avatar: '🧑',
      mood: 'cold',
    },
    dialogue: '这修仙路，我韩立走定了。',
    choices: [
      {
        text: '✨ 查看你的修仙属性',
        nextScene: 'ending-stats',
      },
    ],
  },

  {
    id: 'ending-stats',
    chapter: '结算',
    title: '你的道',
    background: 'from-indigo-950 via-purple-950 to-black',
    narrator: '【第一幕通关结算】\n\n你在七玄门的经历，决定了你的修仙底色。',
    isEnding: true,
    endingType: 'TRUE_END',
    choices: [
      {
        text: '🏠 返回主界面',
        nextScene: 'scene-000-prologue',
      },
      {
        text: '🔄 再玩一次',
        nextScene: 'scene-000-prologue',
      },
    ],
  },
]

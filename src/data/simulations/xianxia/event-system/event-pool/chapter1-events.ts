import type { GameEvent } from '../types'

export const CHAPTER1_EVENTS: GameEvent[] = [
  {
    id: 'intro_prologue',
    chapter: '第一章·七玄门',
    title: '序章',
    weight: 100,
    priority: 100,
    cooldown: 999,
    maxOccurrences: 1,
    onceOnly: true,
    tags: ['intro'],
    conditions: {
      AND: [
        { type: 'hidden', key: 'day', operator: '==', value: 1 },
        { type: 'flag', key: 'intro_done', operator: '!has', value: true },
      ],
    },
    narrator: '七玄门·百草堂\n\n时值深冬，寒风凛冽。\n\n你叫韩立，一个普通的山村少年。三天前，你怀着忐忑的心情，来到了这江湖上赫赫有名的七玄门。\n\n和你同来的几十个孩子，大多都家中有些背景，或是天生根骨不凡。\n\n而你，只是因为村长说这里管饭。\n\n"那个穿灰衣的，过来。"',
    character: {
      name: '墨大夫',
      avatar: '👴',
      mood: 'normal',
    },
    background: 'from-slate-900 via-stone-900 to-zinc-900',
    effects: {
      flags: ['intro_done'],
    },
    choices: [
      {
        id: '1',
        text: '乖乖走过去',
        effects: {
          hidden: { hanli_suspicion: 5 },
          relationships: { mo_haofu: 5 },
        },
      },
      {
        id: '2',
        text: '先观察一下周围的情况再说',
        effects: {
          stats: { mindset: 2 },
          hidden: { hanli_suspicion: 10 },
          relationships: { mo_haofu: -5 },
        },
      },
    ],
  },

  {
    id: 'mo_first_test',
    chapter: '第一章·七玄门',
    title: '考验',
    weight: 80,
    priority: 90,
    cooldown: 999,
    maxOccurrences: 1,
    onceOnly: true,
    tags: ['story', 'mo_haofu'],
    is_mainline: true,
    deadline_day: 5,
    fallback_trigger_day: 4,
    conditions: {
      AND: [
        { type: 'flag', key: 'intro_done', operator: 'has', value: true },
        { type: 'flag', key: 'mo_test_done', operator: '!has', value: true },
        { type: 'hidden', key: 'day', operator: '>=', value: 2 },
      ],
    },
    narrator: '墨大夫的手指搭在你的脉门上。\n\n他的手指冰凉，像是某种冷血动物。\n\n"资质平平..."他皱了皱眉。\n\n过了一会儿，他突然扔过来一本薄薄的册子。\n\n"三天之内，把上面的东西背下来。"',
    character: {
      name: '墨大夫',
      avatar: '👴',
      mood: 'cold',
    },
    background: 'from-stone-900 via-slate-800 to-zinc-900',
    effects: {
      flags: ['mo_test_done'],
    },
    choices: [
      {
        id: '1',
        text: '是，师傅',
        effects: {
          stats: { mindset: 2 },
          hidden: { mo_haofu_trust: 10 },
          relationships: { mo_haofu: 10 },
        },
      },
      {
        id: '2',
        text: '试探性地问：不知这是...？',
        hiddenCheck: { stat: 'cunning', threshold: 50 },
      },
    ],
  },

  {
    id: 'dorm_bullying',
    chapter: '第一章·七玄门',
    title: '宿舍',
    weight: 40,
    priority: 80,
    cooldown: 999,
    maxOccurrences: 1,
    onceOnly: true,
    tags: ['conflict'],
    conditions: {
      AND: [
        { type: 'stat', key: 'spiritualRoot', operator: '<', value: 45 },
        { type: 'hidden', key: 'qixuan_reputation', operator: '<', value: 30 },
        { type: 'flag', key: 'intro_done', operator: 'has', value: true },
      ],
    },
    narrator: '夜里，你被人踹醒了。\n\n几个年纪比你大的师兄弟围在你床边。\n\n"小子，听说你今天让墨大夫刮目相看了？"领头的那个狞笑着。\n\n"七玄门的规矩，新人要懂孝敬。"',
    character: {
      name: '王师兄',
      avatar: '🧔',
      mood: 'sneer',
    },
    background: 'from-zinc-900 via-slate-900 to-neutral-900',
    choices: [
      {
        id: '1',
        text: '忍气吞声，任他们搜身',
        effects: {
          stats: { cruelty: 3, mindset: 5 },
          hidden: { qixuan_reputation: -15, demonic_tendency: 10 },
        },
      },
      {
        id: '2',
        text: '抄起床边的凳子砸过去',
        effects: {
          stats: { cruelty: 15, luck: -5 },
          hidden: { qixuan_reputation: 25, mo_haofu_trust: -15, demonic_tendency: 20 },
        },
      },
      {
        id: '3',
        text: '往水壶里偷偷下毒',
        conditions: {
          AND: [
            { type: 'stat', key: 'cunning', operator: '>=', value: 60 },
            { type: 'item', key: 'item-poison-centipede', operator: 'has', value: true },
          ],
        },
        effects: {
          stats: { cruelty: 25 },
          hidden: { demonic_tendency: 50 },
          flags: ['killed_bully'],
          removeItems: ['item-poison-centipede'],
        },
      },
    ],
  },

  {
    id: 'medicine_on_table',
    chapter: '第一章·七玄门',
    title: '聚气散',
    weight: 35,
    priority: 85,
    cooldown: 999,
    maxOccurrences: 1,
    onceOnly: true,
    tags: ['story', 'choice'],
    conditions: {
      AND: [
        { type: 'hidden', key: 'day', operator: '==', value: 3 },
        { type: 'relationship', key: 'mo_haofu', operator: '>=', value: 5 },
        { type: 'flag', key: 'intro_done', operator: 'has', value: true },
      ],
    },
    narrator: '墨大夫出去了。\n\n桌上放着三瓶晶莹的丹药。\n\n瓶塞没有盖严，飘出阵阵异香。\n\n你认得这是聚气散，武林中人梦寐以求的宝物。\n\n药架后面，似乎有一双眼睛在看着你。',
    character: {
      name: '墨大夫',
      avatar: '👴',
      mood: 'normal',
    },
    background: 'from-amber-900 via-stone-800 to-zinc-900',
    choices: [
      {
        id: '1',
        text: '三瓶全部拿走',
        effects: {
          stats: { cunning: -10 },
          hidden: { hanli_suspicion: 50, mo_haofu_trust: -40, medicine_residue: 60 },
          relationships: { mo_haofu: -50 },
          inventory: ['item_energy_pill', 'item_energy_pill', 'item_energy_pill'],
        },
      },
      {
        id: '2',
        text: '一瓶都不动',
        effects: {
          stats: { mindset: 5 },
          hidden: { mo_haofu_trust: 20, hanli_suspicion: -10 },
          relationships: { mo_haofu: 25 },
        },
      },
      {
        id: '3',
        text: '倒出一半，加水还原',
        conditions: {
          AND: [{ type: 'stat', key: 'cunning', operator: '>=', value: 60 }],
        },
        effects: {
          stats: { cunning: 10 },
          hidden: { mo_haofu_trust: 10, hanli_suspicion: 15, medicine_residue: 30 },
          inventory: ['item_energy_pill'],
        },
      },
    ],
  },

  {
    id: 'zhang_reminder',
    chapter: '第一章·七玄门',
    title: '提醒',
    weight: 25,
    priority: 70,
    cooldown: 999,
    maxOccurrences: 1,
    onceOnly: true,
    tags: ['story', 'warning'],
    conditions: {
      AND: [
        { type: 'hidden', key: 'hanli_suspicion', operator: '>=', value: 30 },
        { type: 'cooldown', key: 'medicine_on_table', operator: '>', value: 0 },
        { type: 'flag', key: 'intro_done', operator: 'has', value: true },
      ],
    },
    narrator: '张大夫把你拉到一边。\n\n他欲言又止，脸上满是挣扎。\n\n"听我一句劝..."\n\n"墨大夫这个人，不简单。"\n\n"那些消失的徒弟，不是学成下山了。"',
    character: {
      name: '张大夫',
      avatar: '🧓',
      mood: 'warm',
    },
    background: 'from-slate-800 via-stone-700 to-zinc-800',
    choices: [
      {
        id: '1',
        text: '多谢张叔提醒',
        effects: {
          stats: { mindset: 3 },
          hidden: { immortal_fate: 10 },
          flags: ['knows_mo_secret'],
        },
      },
      {
        id: '2',
        text: '我相信师傅自有道理',
        effects: {
          hidden: { mo_haofu_trust: 15 },
          relationships: { mo_haofu: 15 },
        },
      },
    ],
  },

  {
    id: 'become_disciple',
    chapter: '第一章·七玄门',
    title: '收徒',
    weight: 30,
    priority: 75,
    cooldown: 999,
    maxOccurrences: 1,
    onceOnly: true,
    tags: ['story', 'major'],
    conditions: {
      AND: [
        { type: 'hidden', key: 'day', operator: '>=', value: 5 },
        { type: 'hidden', key: 'mo_haofu_trust', operator: '>=', value: 10 },
        { type: 'flag', key: 'intro_done', operator: 'has', value: true },
      ],
    },
    narrator: '墨大夫今天的心情似乎特别好。\n\n"韩立，你跟我有段日子了。"他慢慢呷了口茶。\n\n"老夫看你心性还不错。"他放下茶杯，直视着你。\n\n"可愿拜入老夫门下，做我的入室弟子？"',
    character: {
      name: '墨大夫',
      avatar: '👴',
      mood: 'warm',
    },
    background: 'from-stone-800 via-amber-900 to-zinc-900',
    choices: [
      {
        id: '1',
        text: '弟子愿意！师父在上，请受徒儿一拜',
        effects: {
          stats: { mindset: 5 },
          hidden: { mo_haofu_trust: 30, hanli_suspicion: -20 },
          relationships: { mo_haofu: 40 },
          flags: ['mo_disciple'],
          inventory: ['item_changgong'],
        },
      },
      {
        id: '2',
        text: '弟子资质愚钝，怕是会辱没师门',
        effects: {
          stats: { cunning: 10 },
          hidden: { mo_haofu_trust: -10, hanli_suspicion: 10 },
          relationships: { mo_haofu: -15 },
        },
      },
      {
        id: '3',
        text: '弟子想再考虑几日',
        effects: {
          stats: { mindset: 5, cunning: 5 },
          hidden: { hanli_suspicion: 5 },
          relationships: { mo_haofu: 5 },
        },
      },
    ],
  },

  {
    id: 'mysterious_bead',
    chapter: '第一章·七玄门',
    title: '珠子',
    weight: 10,
    priority: 95,
    cooldown: 999,
    maxOccurrences: 1,
    onceOnly: true,
    tags: ['rare', 'immortal'],
    conditions: {
      AND: [
        { type: 'hidden', key: 'time_of_day', operator: '==', value: 'night' },
        { type: 'hidden', key: 'immortal_fate', operator: '>=', value: 65 },
        { type: 'random', key: 'chance', operator: '<=', value: 30 },
        { type: 'flag', key: 'intro_done', operator: 'has', value: true },
      ],
    },
    narrator: '你做了一个奇怪的梦。\n\n梦里是一片无边无际的黑暗。\n\n虚空中，一颗不起眼的灰色珠子在载沉载浮。\n\n珠子上，刻着两个你不认识的古字。\n\n就在你想要触摸它的时候，你醒了。',
    background: 'from-slate-950 via-blue-950 to-black',
    effects: {
      stats: { spiritualRoot: 20, karma: 30, luck: 15 },
      hidden: { immortal_fate: 50 },
      flags: ['has_xiaozhu'],
    },
    choices: [
      {
        id: '1',
        text: '这梦...绝不简单',
        effects: {
          stats: { cunning: 5 },
          hidden: { immortal_fate: 10 },
        },
      },
      {
        id: '2',
        text: '不过是个梦罢了',
        effects: {
          hidden: { immortal_fate: -10 },
        },
      },
    ],
  },

  {
    id: 'medicine_reaction',
    chapter: '第一章·七玄门',
    title: '反噬',
    weight: 20,
    priority: 80,
    cooldown: 999,
    maxOccurrences: 1,
    onceOnly: true,
    tags: ['negative', 'crisis'],
    conditions: {
      AND: [
        { type: 'hidden', key: 'medicine_residue', operator: '>=', value: 40 },
        { type: 'hidden', key: 'day', operator: '>=', value: 7 },
        { type: 'flag', key: 'intro_done', operator: 'has', value: true },
      ],
    },
    narrator: '你开始咳血。\n\n不是那种普通的咳。\n\n五脏六腑都在燃烧，每一次呼吸都带着铁锈的味道。\n\n你知道是那些丹药出问题了。\n\n墨大夫站在门口冷冷地看着你，像是在观察什么实验品。',
    character: {
      name: '墨大夫',
      avatar: '👴',
      mood: 'sneer',
    },
    background: 'from-red-950 via-stone-900 to-black',
    choices: [
      {
        id: '1',
        text: '运功强行压制',
        hiddenCheck: { stat: 'mindset', threshold: 60 },
      },
      {
        id: '2',
        text: '跪下求墨大夫救你',
        effects: {
          stats: { spiritualRoot: -5, cruelty: 10 },
          hidden: { medicine_residue: -30, mo_haofu_trust: 20 },
          relationships: { mo_haofu: 20 },
        },
      },
    ],
  },

  {
    id: 'elder_wang_invite',
    chapter: '第一章·七玄门',
    title: '邀约',
    weight: 15,
    priority: 60,
    cooldown: 999,
    maxOccurrences: 1,
    onceOnly: true,
    tags: ['story', 'faction'],
    conditions: {
      AND: [
        { type: 'hidden', key: 'qixuan_reputation', operator: '>=', value: 25 },
        { type: 'hidden', key: 'day', operator: '>=', value: 8 },
        { type: 'flag', key: 'intro_done', operator: 'has', value: true },
      ],
    },
    narrator: '王长老派人来请你。\n\n这位七玄门的实权人物，你只远远见过几次。\n\n"墨老鬼那里有什么好的？"他开门见山。\n\n"跟着我，七玄门的武功秘籍随你挑。"',
    character: {
      name: '王长老',
      avatar: '👨‍🦳',
      mood: 'normal',
    },
    background: 'from-stone-800 via-purple-900 to-zinc-900',
    choices: [
      {
        id: '1',
        text: '多谢长老厚爱，弟子愿意',
        effects: {
          stats: { cunning: 10 },
          hidden: { qixuan_reputation: 20, mo_haofu_trust: -50 },
          relationships: { elder_wang: 30, mo_haofu: -40 },
          flags: ['joined_wang_faction'],
        },
      },
      {
        id: '2',
        text: '弟子还是跟着墨大夫比较好',
        effects: {
          hidden: { mo_haofu_trust: 15 },
          relationships: { mo_haofu: 20, elder_wang: -30 },
        },
      },
    ],
  },

  {
    id: 'sudden_death',
    chapter: '第一章·七玄门',
    title: '意外',
    weight: 5,
    priority: 50,
    cooldown: 999,
    maxOccurrences: 1,
    onceOnly: true,
    tags: ['ending', 'bad'],
    conditions: {
      AND: [
        { type: 'stat', key: 'luck', operator: '<', value: 20 },
        { type: 'relationship', key: 'mo_haofu', operator: '<', value: -25 },
        { type: 'random', key: 'chance', operator: '<=', value: 15 },
      ],
    },
    narrator: '这天你喝完药，感觉有些不对。\n\n五脏六腑像是火烧一样。\n\n你挣扎着想站起来，却重重地摔在地上。\n\n朦胧中，你仿佛看到墨大夫站在门口，冷冷地看着你。\n\n\n【BAD END - 试药死人】',
    character: {
      name: '墨大夫',
      avatar: '👴',
      mood: 'sneer',
    },
    background: 'from-red-950 via-black to-black',
    isEnding: true,
    endingType: 'BAD_END',
    choices: [
      {
        id: '1',
        text: '......',
        effects: {
          endGame: true,
        },
      },
    ],
  },

  {
    id: 'used_centipede_poison',
    chapter: '第一章·七玄门',
    title: '剧毒',
    weight: 0,
    priority: 100,
    cooldown: 999,
    maxOccurrences: 1,
    onceOnly: true,
    tags: ['special', 'item_trigger'],
    conditions: { AND: [] },
    narrator: '你取出了那瓶尸蜈蚣毒。\n\n这墨绿色的液体散发着奇异的腥臭，连瓷瓶都变得冰凉刺骨。\n\n一滴足以毒死十头壮牛。\n\n你可以用它来对付任何人...但首先，你得决定用在谁身上。',
    character: {
      name: '韩立',
      avatar: '👦',
      mood: 'normal',
    },
    background: 'from-emerald-950 via-stone-900 to-black',
    choices: [
      {
        id: '1',
        text: '找机会下在墨大夫的药里',
        hiddenCheck: { stat: 'cunning', threshold: 60 },
      },
      {
        id: '2',
        text: '用在经常欺负你的师哥身上',
        effects: {
          stats: { cruelty: 20 },
          hidden: { demonic_tendency: 30, hanli_suspicion: 50 },
          flags: ['killed_senior_brother'],
        },
      },
      {
        id: '3',
        text: '还是先收起来再说',
        effects: {
          stats: { mindset: 5 },
        },
      },
    ],
  },

  {
    id: 'daily_grind_herbs',
    chapter: '第一章·七玄门',
    title: '日常',
    weight: 30,
    priority: 10,
    cooldown: 1,
    maxOccurrences: 10,
    onceOnly: false,
    tags: ['daily', 'routine'],
    conditions: {
      AND: [
        { type: 'flag', key: 'intro_done', operator: 'has', value: true },
        { type: 'cooldown', key: 'daily_grind_herbs', operator: '==', value: 0 },
      ],
    },
    narrator: '又是平凡的一天。\n\n百草堂弥漫着浓重的药味。\n\n墨大夫不在，师哥们都在偷懒打牌。\n\n你默默捣着草药，盘算着接下来的路。',
    background: 'from-stone-800 via-amber-950 to-stone-900',
    choices: [
      {
        id: '1',
        text: '老老实实捣药',
        effects: {
          stats: { mindset: 1 },
          hidden: { mo_haofu_trust: 2 },
          relationships: { mo_haofu: 2 },
        },
      },
      {
        id: '2',
        text: '偷拿几株珍贵药材私藏',
        conditions: {
          AND: [{ type: 'stat', key: 'cunning', operator: '>=', value: 35 }],
        },
        effects: {
          stats: { cunning: 2 },
          hidden: { qixuan_reputation: -5, hanli_suspicion: 5 },
          inventory: ['item_energy_pill'],
        },
      },
      {
        id: '3',
        text: '和师哥们一起打牌',
        effects: {
          stats: { luck: 1 },
          hidden: { qixuan_reputation: 5 },
        },
      },
    ],
  },

  {
    id: 'night_practice',
    chapter: '第一章·七玄门',
    title: '夜练',
    weight: 25,
    priority: 15,
    cooldown: 1,
    maxOccurrences: 8,
    onceOnly: false,
    tags: ['daily', 'training'],
    conditions: {
      AND: [
        { type: 'hidden', key: 'time_of_day', operator: '==', value: 'night' },
        { type: 'flag', key: 'intro_done', operator: 'has', value: true },
      ],
    },
    narrator: '夜深人静，万籁俱寂。\n\n你辗转反侧，无法入眠。\n\n远处传来不知名的虫鸣，更添几分焦躁。',
    background: 'from-slate-900 via-blue-950 to-black',
    choices: [
      {
        id: '1',
        text: '偷偷打坐修炼',
        effects: {
          stats: { spiritualRoot: 3, mindset: 1 },
          hidden: { immortal_fate: 3 },
        },
      },
      {
        id: '2',
        text: '出去走走',
        effects: {
          stats: { luck: 2 },
          hidden: { immortal_fate: 5 },
        },
      },
      {
        id: '3',
        text: '强迫自己睡觉',
        effects: {
          stats: { spiritualRoot: 1 },
        },
      },
    ],
  },

  {
    id: 'mo_secretly_watch',
    chapter: '第一章·七玄门',
    title: '窥视',
    weight: 20,
    priority: 30,
    cooldown: 3,
    maxOccurrences: 3,
    onceOnly: false,
    tags: ['story', 'mo_haofu'],
    conditions: {
      AND: [
        { type: 'hidden', key: 'hanli_suspicion', operator: '>=', value: 20 },
        { type: 'relationship', key: 'mo_haofu', operator: '>=', value: 10 },
        { type: 'flag', key: 'intro_done', operator: 'has', value: true },
      ],
    },
    narrator: '这晚你路过墨大夫的书房。\n\n里面亮着灯，似乎还有人说话。\n\n"那小子...根骨虽差...但心性...可以一试..."\n\n门缝里，你看见墨大夫对着一面铜镜自言自语。',
    character: {
      name: '墨大夫',
      avatar: '👴',
      mood: 'cold',
    },
    background: 'from-zinc-900 via-stone-950 to-black',
    effects: {
      hidden: { hanli_suspicion: 20 },
    },
    choices: [
      {
        id: '1',
        text: '继续偷看一会儿',
        hiddenCheck: { stat: 'cunning', threshold: 50 },
      },
      {
        id: '2',
        text: '悄悄离开',
        effects: {
          stats: { mindset: 2 },
        },
      },
      {
        id: '3',
        text: '故意弄出声音提醒他',
        effects: {
          hidden: { mo_haofu_trust: -10 },
          relationships: { mo_haofu: -5 },
        },
      },
    ],
  },

  {
    id: 'fellow_apprentice_fight',
    chapter: '第一章·七玄门',
    title: '冲突',
    weight: 20,
    priority: 25,
    cooldown: 2,
    maxOccurrences: 3,
    onceOnly: false,
    tags: ['interaction', 'combat'],
    conditions: {
      AND: [
        { type: 'hidden', key: 'qixuan_reputation', operator: '<=', value: 10 },
        { type: 'flag', key: 'intro_done', operator: 'has', value: true },
      ],
    },
    narrator: '"站住！"\n\n几个师哥拦住了你。\n\n"听说你最近很讨墨大夫喜欢啊？"\n\n为首的那个嘴角挂着冷笑，手里转着一把短刀。',
    character: {
      name: '张师兄',
      avatar: '🧔',
      mood: 'sneer',
    },
    background: 'from-slate-800 via-red-950 to-stone-900',
    choices: [
      {
        id: '1',
        text: '服软道歉',
        effects: {
          stats: { cruelty: -2 },
          hidden: { qixuan_reputation: -10 },
        },
      },
      {
        id: '2',
        text: '跟他们拼了',
        effects: {
          stats: { cruelty: 5, mindset: 2 },
          hidden: { qixuan_reputation: 10, mo_haofu_trust: -5 },
        },
      },
      {
        id: '3',
        text: '用钱收买',
        conditions: {
          AND: [{ type: 'item', key: 'item-silver', operator: 'has', value: true }],
        },
        effects: {
          hidden: { qixuan_reputation: 20 },
          removeItems: ['item-silver'],
        },
      },
    ],
  },

  {
    id: 'found_hidden_book',
    chapter: '第一章·七玄门',
    title: '古籍',
    weight: 10,
    priority: 40,
    cooldown: 999,
    maxOccurrences: 1,
    onceOnly: true,
    tags: ['discovery', 'rare'],
    conditions: {
      AND: [
        { type: 'stat', key: 'luck', operator: '>=', value: 50 },
        { type: 'hidden', key: 'immortal_fate', operator: '>=', value: 60 },
        { type: 'flag', key: 'intro_done', operator: 'has', value: true },
      ],
    },
    narrator: '你在柴房劈柴。\n\n斧头碰到了什么硬硬的东西。\n\n刨开浮土，是一个油布包。\n\n里面是一本泛黄的古籍，封面上写着四个古篆字：\n\n【长生诀】',
    background: 'from-amber-900 via-yellow-950 to-stone-900',
    choices: [
      {
        id: '1',
        text: '自己藏起来偷偷研究',
        effects: {
          stats: { spiritualRoot: 10, cunning: 5 },
          hidden: { immortal_fate: 15, demonic_tendency: 5 },
          inventory: ['item_changgong'],
        },
      },
      {
        id: '2',
        text: '献给墨大夫',
        effects: {
          stats: { mindset: 5 },
          hidden: { mo_haofu_trust: 30, hanli_suspicion: -20 },
          relationships: { mo_haofu: 40 },
        },
      },
      {
        id: '3',
        text: '烧毁，当作没看见',
        effects: {
          stats: { mindset: 10, luck: 5 },
          hidden: { demonic_tendency: -20 },
        },
      },
    ],
  },

  {
    id: 'medicine_overdose_crisis',
    chapter: '第一章·七玄门',
    title: '药力发作',
    weight: 15,
    priority: 50,
    cooldown: 999,
    maxOccurrences: 1,
    onceOnly: true,
    tags: ['crisis', 'negative'],
    conditions: {
      AND: [
        { type: 'hidden', key: 'medicine_residue', operator: '>=', value: 60 },
        { type: 'flag', key: 'intro_done', operator: 'has', value: true },
      ],
    },
    narrator: '你感觉浑身燥热难耐。\n\n这些日子偷偷服用的丹药，药力终于积累到了临界点。\n\n经脉像是要爆裂一般剧痛。\n\n你倒在地上，意识渐渐模糊...',
    background: 'from-red-900 via-orange-950 to-black',
    choices: [
      {
        id: '1',
        text: '运功抵抗',
        hiddenCheck: { stat: 'mindset', threshold: 55 },
      },
      {
        id: '2',
        text: '找墨大夫求救',
        effects: {
          stats: { spiritualRoot: -10, cruelty: 5 },
          hidden: { medicine_residue: -30, mo_haofu_trust: 5, hanli_suspicion: 30 },
          relationships: { mo_haofu: 10 },
        },
      },
      {
        id: '3',
        text: '服食养颜丹解毒',
        conditions: {
          AND: [{ type: 'item', key: 'item_healing_pill', operator: 'has', value: true }],
        },
        effects: {
          stats: { spiritualRoot: 5 },
          hidden: { medicine_residue: -50, poison_resistance: 15 },
          removeItems: ['item_healing_pill'],
        },
      },
    ],
  },

  {
    id: 'mo_haofu_night_visit',
    chapter: '第一章·七玄门',
    title: '夜访',
    weight: 60,
    priority: 90,
    cooldown: 999,
    maxOccurrences: 1,
    onceOnly: true,
    tags: ['story', 'mo_haofu'],
    is_mainline: true,
    deadline_day: 21,
    fallback_trigger_day: 18,
    difficulty_scaling: {
      stat: 'cunning',
      base_threshold: 70,
      per_point_reduction: 1,
      min_threshold: 30,
    },
    conditions: {
      OR: [
        {
          AND: [
            { type: 'hidden', key: 'mo_haofu_trust', operator: '>=', value: 40 },
            { type: 'hidden', key: 'time_of_day', operator: '==', value: 'night' },
            { type: 'flag', key: 'intro_done', operator: 'has', value: true },
          ],
        },
        {
          AND: [
            { type: 'hidden', key: 'day', operator: '>=', value: 18 },
            { type: 'flag', key: 'intro_done', operator: 'has', value: true },
          ],
        },
      ],
    } as unknown as import('../types').ConditionGroup,
    narrator: '笃笃笃。\n\n深夜有人敲门。\n\n开门一看，竟是墨大夫。\n\n"跟我来。"他的声音听不出喜怒。\n\n你跟着他来到了百草堂最深处的密室。',
    character: {
      name: '墨大夫',
      avatar: '👴',
      mood: 'normal',
    },
    background: 'from-stone-900 via-zinc-950 to-black',
    choices: [
      {
        id: '1',
        text: '听从吩咐',
        effects: {
          hidden: { mo_haofu_trust: 15, immortal_fate: 20 },
          relationships: { mo_haofu: 20 },
          flags: ['mo_true_disciple'],
        },
      },
      {
        id: '2',
        text: '暗中戒备',
        effects: {
          stats: { cunning: 5 },
          hidden: { hanli_suspicion: 15 },
        },
      },
    ],
  },

  {
    id: 'overdose_success',
    chapter: '第一章·七玄门',
    title: '因祸得福',
    weight: 0,
    priority: 100,
    cooldown: 999,
    maxOccurrences: 1,
    onceOnly: true,
    tags: ['success', 'check_result'],
    conditions: { AND: [] },
    narrator: '剧痛过后，你反而感到一股清凉的气息从丹田升起。\n\n原来这丹药虽有毒性，但大难不死反而让你冲破了瓶颈。\n\n塞翁失马，焉知非福。',
    background: 'from-emerald-900 via-teal-950 to-black',
    effects: {
      stats: { spiritualRoot: 15, mindset: 10 },
      hidden: { medicine_residue: -40, poison_resistance: 30, immortal_fate: 10 },
    },
    choices: [
      {
        id: '1',
        text: '继续修炼',
        effects: {
          stats: { spiritualRoot: 5 },
        },
      },
    ],
  },

  {
    id: 'overdose_failure',
    chapter: '第一章·七玄门',
    title: '走火入魔',
    weight: 0,
    priority: 100,
    cooldown: 999,
    maxOccurrences: 1,
    onceOnly: true,
    tags: ['failure', 'check_result'],
    conditions: { AND: [] },
    narrator: '你没能抵抗住药力的反噬。\n\n一股黑血从嘴角流出。\n\n从此，你的心性大变，变得更加残忍嗜杀...\n\n但也因祸得福，破而后立，修为竟也突飞猛进。',
    background: 'from-purple-950 via-red-950 to-black',
    effects: {
      stats: { spiritualRoot: 20, cruelty: 30, luck: -10 },
      hidden: { medicine_residue: -20, demonic_tendency: 80, poison_resistance: 20 },
      flags: ['demonic_path'],
    },
    choices: [
      {
        id: '1',
        text: '这就是...魔道吗？',
        effects: {},
      },
    ],
  },
]

export const ALL_EVENTS = [...CHAPTER1_EVENTS]

export interface XianxiaConcept {
  id: string
  term: string
  category: 'realm' | 'cultivation' | 'resources' | 'technique' | 'game-mechanic' | 'strategy'
  icon: string
  definition: string
  formula?: string
  mechanic?: string
  strategy?: string
  examples?: string[]
  related?: string[]
}

export const XIANXIA_CONCEPTS: XianxiaConcept[] = [
  {
    id: 'realm-overview',
    term: '修炼境界总览',
    category: 'realm',
    icon: '🏔️',
    definition: '修真界的修炼等级体系，从凡人开始逐步进阶，每一步都是质的飞跃。',
    strategy: '每个大境界分：初期→中期→后期→圆满。圆满后才能突破到下一境界。境界越高，寿元越长，实力越强。',
    related: ['qi-refining', 'foundation', 'golden-core', 'nascent-soul', 'immortal'],
  },
  {
    id: 'qi-refining',
    term: '炼气期',
    category: 'realm',
    icon: '🌬️',
    definition: '修真之路的起点，引气入体，打通经脉，是所有修士的必经之路。',
    mechanic: '炼气分9层。寿元约100岁。可以使用基础法术。',
    strategy: '新手期！打牢根基最重要，不要急于突破。炼气9层圆满再筑基成功率会高很多。',
    examples: ['绝大多数修士终其一生都在炼气期'],
    related: ['foundation', 'spiritual-root', 'breakthrough'],
  },
  {
    id: 'foundation',
    term: '筑基期',
    category: 'realm',
    icon: '🏔️',
    definition: '真正踏上修真之路的标志，在丹田中筑就道基，真气液化。',
    mechanic: '筑基分：初期/中期/后期/圆满。寿元约200岁。可以御剑飞行。',
    strategy: '筑基是第一道大坎！准备充分再尝试。最好炼气9层圆满，有筑基丹辅助。',
    examples: ['宗门内门弟子标准'],
    related: ['qi-refining', 'golden-core', 'foundation-pill'],
  },
  {
    id: 'golden-core',
    term: '金丹期',
    category: 'realm',
    icon: '💎',
    definition: '丹成九转，大道可期！金丹修士已是一方豪强。',
    mechanic: '金丹分四阶。寿元500岁。金丹是修士真正的核心，被破即死。',
    strategy: '结成金丹才算真正登堂入室！这一步要经历心魔劫，道心要稳。',
    examples: ['宗门长老级战力', '凡人界的传奇存在'],
    related: ['nascent-soul', 'inner-demon', 'breakthrough'],
  },
  {
    id: 'nascent-soul',
    term: '元婴期',
    category: 'realm',
    icon: '👶',
    definition: '破丹成婴，元神不灭！元婴修士已是真正的陆地神仙。',
    mechanic: '元婴分四阶。寿元1000岁。元婴离体可以夺舍重生。',
    strategy: '元婴是大宗门的支柱！每一位元婴的诞生都意味着宗门兴盛百年。',
    examples: ['大宗门主级战力', '可以开山立派'],
    related: ['golden-core', 'soul-fusion', 'seizure'],
  },
  {
    id: 'soul-fusion',
    term: '化神期',
    category: 'realm',
    icon: '🔮',
    definition: '婴神合一，法力无边！举手投足山崩地裂。',
    mechanic: '化神分四阶。寿元2000岁。可以撕裂空间短途传送。',
    strategy: '化神修士已经可以影响一洲气运！言出法随，凡俗王朝的兴衰只在一念之间。',
    examples: ['真正的陆地神仙'],
    related: ['nascent-soul', 'tribulation', 'dao-integration'],
  },
  {
    id: 'body-tribulation',
    term: '炼虚/渡劫期',
    category: 'realm',
    icon: '⚡',
    definition: '天人感应，天劫降临！渡过九九天劫便可飞升。',
    mechanic: '渡劫期。每百年一次小天劫，千年迎来飞升劫。',
    strategy: '渡劫是修仙最大的坎！渡不过就是灰飞烟灭。九死一生的考验。',
    examples: ['玄界顶级战力', '一只脚踏入仙界'],
    related: ['heavenly-tribulation', 'void-refining', 'ascension'],
  },
  {
    id: 'dao-integration',
    term: '合体/大乘期',
    category: 'realm',
    icon: '🧘',
    definition: '万法归一，与道合真！玄界至尊。',
    mechanic: '大乘期。寿元近乎无限。等待飞升契机。',
    strategy: '大乘不轻易出手！每一次出手都逆天改命，会遭天谴。',
    examples: ['玄界至尊', '万年不出的老怪物'],
    related: ['immortal', 'heavenly-tribulation', 'ascension'],
  },
  {
    id: 'immortal',
    term: '仙 境',
    category: 'realm',
    icon: '🌟',
    definition: '飞升仙界，与天同寿，真正的长生不老！',
    mechanic: '仙人！游戏终极目标。',
    strategy: '万中无一！十万年不一定能出一个仙人。',
    examples: ['只存在于传说中的存在'],
    related: ['ascension', 'heavenly-tribulation', 'dao-integration'],
  },
  {
    id: 'spiritual-qi',
    term: '灵 气',
    category: 'resources',
    icon: '✨',
    definition: '天地间的本源能量，修士修炼的根本。',
    mechanic: '游戏中最核心的资源。每秒自动恢复，打坐可以加速。',
    formula: '灵气 = 根骨资质 × 功法效率 × 灵脉浓度',
    strategy: '灵气就是一切！有条件就去灵脉之地闭关。灵气越浓郁修炼越快。',
    related: ['spiritual-root', 'cultivation-speed', 'spirit-stone'],
  },
  {
    id: 'spiritual-root',
    term: '灵 根',
    category: 'cultivation',
    icon: '🌳',
    definition: '修士的天赋本质，决定修炼速度的上限。',
    mechanic: '分：伪灵根<四灵根<三灵根<双灵根<单灵根<天灵根<先天道体。',
    strategy: '灵根天注定！但是后天可以逆天改命。洗髓伐脉可以提升灵根品质。',
    examples: ['天灵根万年一遇', '废柴流主角通常是伪灵根'],
    related: ['cultivation-speed', 'innate-talent'],
  },
  {
    id: 'cultivation-speed',
    term: '修炼速度',
    category: 'game-mechanic',
    icon: '🚀',
    definition: '每日获得的修为值。',
    formula: '修炼速度 = 灵根 × 功法 × 丹药 × 心境 × 灵脉浓度',
    mechanic: '游戏中实时计算，可以在状态栏查看。',
    strategy: '不要追求绝对的快！过快容易根基不稳，突破成功率降低。稳扎稳打才是王道。',
    related: ['spiritual-root', 'technique', 'pill', 'enlightenment'],
  },
  {
    id: 'breakthrough',
    term: '突 破',
    category: 'game-mechanic',
    icon: '💥',
    definition: '从一个小境界晋升到下一个境界的过程。',
    mechanic: `成功率受以下因素影响：
  • 当前境界的完成度（越接近圆满越高）
  • 丹药辅助
  • 心境稳定度
  • 根基扎实程度`,
    strategy: '永远不要赌概率！至少80%成功率再尝试突破。一旦失败损失巨大，还会留下心魔。',
    examples: ['筑基成功率通常只有30%左右'],
    related: ['foundation', 'inner-demon', 'breakthrough-pill'],
  },
  {
    id: 'foundation-pill',
    term: '筑基丹',
    category: 'resources',
    icon: '💊',
    definition: '辅助筑基的极品丹药，能大幅提高筑基成功率。',
    mechanic: '完美筑基丹可以提升40%成功率。每颗筑基丹都是无价之宝。',
    strategy: '一定要弄到筑基丹再筑基！没有丹药硬闯就是九死一生。',
    examples: ['三大宗门每十年才出三颗'],
    related: ['foundation', 'pill', 'alchemy'],
  },
  {
    id: 'inner-demon',
    term: '心 魔',
    category: 'cultivation',
    icon: '👹',
    definition: '修士内心的阴暗面，突破时会趁虚而入。',
    mechanic: '突破失败会增加心魔值。心魔过高突破成功率骤降。',
    strategy: '打坐静修可以降低心魔。境界越高心魔越可怕。金丹期心魔劫可以直接让你道消身亡。',
    examples: ['走火入魔都是心魔作祟'],
    related: ['breakthrough', 'meditation', 'enlightenment'],
  },
  {
    id: 'heavenly-tribulation',
    term: '天 劫',
    category: 'cultivation',
    icon: '⚡',
    definition: '天道对修士的考验，越是逆天的存在天劫越可怕。',
    mechanic: '炼虚期开始每百年一次小天劫。大乘飞升是九九八十一道灭世神雷。',
    strategy: '天劫硬抗是傻子！准备好护身法宝、渡劫大阵、替死符。能作弊就作弊！',
    examples: ['渡劫成功的百不存一'],
    related: ['body-tribulation', 'immortal', 'ascension'],
  },
  {
    id: 'meditation',
    term: '打 坐',
    category: 'technique',
    icon: '🧘',
    definition: '修士最基础的修炼方式，排除杂念吸收灵气。',
    mechanic: '打坐时修炼速度×2，可以降低心魔，稳定心境。',
    strategy: '新手最推荐的方式！不要好高骛远，老老实实打坐一百年再说。',
    related: ['spiritual-qi', 'inner-demon', 'cultivation-speed'],
  },
  {
    id: 'enlightenment',
    term: '悟 道',
    category: 'technique',
    icon: '💡',
    definition: '灵光一闪，顿悟大道！可遇不可求的机缘。',
    mechanic: '悟道时修炼速度×10，还可能创造新功法。概率事件。',
    strategy: '多游历，多读书，多经历世事。心境到了自然就顿悟了。',
    examples: ['闭死关千年不如一朝悟道'],
    related: ['dao', 'cultivation-speed', 'technique'],
  },
  {
    id: 'pill',
    term: '丹 药',
    category: 'resources',
    icon: '💊',
    definition: '凝练天地精华而成的丹药，辅助修炼的神物。',
    mechanic: '分：下品→中品→上品→极品→丹王→仙丹。',
    strategy: '是药三分毒！丹药可以辅助但不能依赖。药渣是无法成仙的。',
    examples: ['筑基丹、聚气丹、洗髓丹、九转金丹'],
    related: ['foundation-pill', 'alchemy', 'cultivation-speed'],
  },
  {
    id: 'spirit-stone',
    term: '灵 石',
    category: 'resources',
    icon: '💎',
    definition: '修真界的硬通货，蕴含精纯灵气的矿石。',
    mechanic: '1上品灵石=100中品=10000下品。可以直接吸收里面的灵气。',
    strategy: '无钱寸步难行！丹药、法宝、功法什么都要灵石。想办法赚灵石！',
    examples: ['宗门任务赏金、炼丹炼器、开宗立派收徒'],
    related: ['alchemy', 'artifacts', 'sect'],
  },
  {
    id: 'alchemy',
    term: '炼 丹',
    category: 'technique',
    icon: '🔥',
    definition: '以灵药为材，丹火为引，炼制丹药的技艺。',
    mechanic: '成功率受：丹方理解、火焰品质、药材年份、心境影响。',
    strategy: '炼丹是最赚钱的技能！但是也最烧钱。成丹率30%就可以出师了。',
    examples: ['成丹还要看丹劫，雷火洗炼成仙丹'],
    related: ['pill', 'foundation-pill', 'spirit-fire'],
  },
  {
    id: 'artifacts',
    term: '法 宝',
    category: 'resources',
    icon: '⚔️',
    definition: '注入法力的武器防具，威力无穷。',
    mechanic: '分：法器→宝器→灵器→法宝→古宝→仙器。本命法宝可以随主人成长。',
    strategy: '本命法宝一定要好好温养！修士可以死，法宝不能丢。',
    examples: ['诛仙剑、太极图、盘古幡、金刚琢'],
    related: ['artifact-refining', 'life-bound-artifact'],
  },
  {
    id: 'sect',
    term: '宗 门',
    category: 'game-mechanic',
    icon: '🏛️',
    definition: '修士聚集的修炼组织，提供资源和庇护。',
    mechanic: '外门→内门→核心→长老→太上→掌门。地位越高资源越多。',
    strategy: '加入宗门发育更快！但是也有义务和勾心斗角。散修自由但资源匮乏。',
    examples: ['青云门、天音寺、鬼王宗', '魔道正道势不两立'],
    related: ['technique', 'pill', 'mission'],
  },
  {
    id: 'life-bound-artifact',
    term: '本命法宝',
    category: 'cultivation',
    icon: '💖',
    definition: '与修士心神相连的法宝，一损俱损一荣俱荣。',
    mechanic: '金丹期才能炼制。用精血日夜温养，可以进化升级。',
    strategy: '本命法宝越早炼越好！陪伴你一生的伙伴。用心培养，后期比你还强。',
    related: ['golden-core', 'artifacts', 'artifact-refining'],
  },
  {
    id: 'seizure',
    term: '夺 舍',
    category: 'technique',
    icon: '👻',
    definition: '元婴期以上才能使用的禁术，舍弃肉身夺取他人身体。',
    mechanic: '成功率极低。失败就是魂飞魄散。成功也会损伤道基。',
    strategy: '不到万不得已不要用！天衍四九，人遁其一。这是修士最后的退路。',
    related: ['nascent-soul', 'inner-demon'],
  },
  {
    id: 'ascension',
    term: '飞 升',
    category: 'cultivation',
    icon: '🚀',
    definition: '破碎虚空，飞升仙界！修仙之路的终极目标。',
    mechanic: '游戏终极胜利条件。大乘期圆满度过天劫即可飞升。',
    strategy: '飞升只是开始！仙界才是真正的战场。但是能飞升就已经赢了99.99%的人。',
    examples: ['百万年不一定有一个'],
    related: ['immortal', 'heavenly-tribulation', 'dao-integration'],
  },
  {
    id: 'origins-system',
    term: '出身系统',
    category: 'game-mechanic',
    icon: '🎭',
    definition: '5种出身决定你的修仙人生。',
    mechanic: `5种可选择出身：

🏛️ 宗门弟子【简单】
  名门正派内门弟子，开局资源多
  ✅ 开局筑基丹x2，青云门功法
  ❌ 无法入魔道，宗门义务多

🏃 散修【普通】
  无门无派，逍遥自在
  ✅ 可加入任何门派，完全自由
  ❌ 开局只有50灵石，功法残破

👑 世家子弟【简单】
  修真家族嫡子，资源无限
  ✅ 开局2000灵石+传家法宝
  ❌ 家族义务，包办婚姻

💀 废柴流【噩梦难度】
  灵根残破，人人欺凌
  ✅ 玉佩里有万年老爷爷！主角光环
  ❌ 开局地狱难度，疯狂被打脸

😈 魔教圣子【困难】
  正道公敌，内部倾轧
  ✅ 开局就是筑基期+魔功
  ❌ 人人得而诛之，心魔极重`,
    strategy: '废柴流看起来最难，但有主角光环！能不能触发玉佩老爷爷，就看你的运气了。',
    related: ['difficulty', 'main-quest'],
  },
  {
    id: 'phases-system',
    term: '游戏阶段',
    category: 'game-mechanic',
    icon: '🎯',
    definition: '五大游戏阶段，循序渐进的成长路线。',
    mechanic: `阶段1：初入仙途
  炼气期，打牢基础，新手教程

阶段2：筑基大业
  冲击筑基，选择宗门，遇见道侣

阶段3：金丹大道
  渡心魔劫，成为长老，收徒传艺

阶段4：元婴老祖
  宗门支柱，纵横人界，参与战争

阶段5：渡劫飞升
  大乘渡劫，了结尘缘，飞升仙界

每个阶段解锁新功能，触发专属事件。`,
    strategy: '不要提前尝试跳阶段！筑基期就别想元婴的事。',
    related: ['realms', 'main-quest'],
  },
  {
    id: 'endings-system',
    term: '八大结局',
    category: 'game-mechanic',
    icon: '🎬',
    definition: '你的选择决定最终归宿。',
    mechanic: `🌟【真结局】破碎虚空
  渡劫成功，飞升仙界

🏛️【好结局】开宗立派
  建立万载大宗，受万代朝拜

💕【好结局】神仙眷侣
  与道侣携手归隐，不问世事

👿【魔道结局】魔尊降临
  一统魔界，我命由我不由天

🐉【隐藏结局】世界之祖
  炼化整个世界，自己当天道

💀【坏结局】坐化归西
  寿元耗尽，碌碌无为

⚡【坏结局】形神俱灭
  渡劫失败，灰飞烟灭

👹【坏结局】走火入魔
  心魔反噬，沦为怪物`,
    strategy: '飞升不是唯一的出路，有时候留在凡间当老祖反而更潇洒。',
    related: ['game-over', 'tribulation'],
  },
  {
    id: 'novice-guide',
    term: '新手修仙完整攻略',
    category: 'strategy',
    icon: '📖',
    definition: '从零开始的修真指南，小白也能成仙。',
    strategy: `【炼气期：第1-1000天】
  ✅ 目标：炼气9层圆满
  ✅ 每天老老实实打坐，不要瞎搞
  ✅ 不要想越级挑战，会死的
  ✅ 攒钱买筑基丹！！！

【筑基期：第1001-5000天】
  ✅ 目标：筑基圆满
  ✅ 至少80%成功率再筑基！！
  ✅ 开始修炼一门真正的功法
  ✅ 适当接宗门任务赚灵石

【金丹期：第5001天以后】
  ✅ 恭喜你，已经超越90%的玩家
  ✅ 可以考虑炼丹/炼器选一副业
  ✅ 开始准备渡心魔劫
  ✅ 炼制本命法宝

⚠️ 修真界生存法则：
  1. 打不过就跑，君子不立危墙之下
  2. 陌生人的东西不要乱捡
  3. 隐藏实力，扮猪吃虎是王道
  4. 道心要稳，不要急于求成
  5. 活着，比什么都重要`,
    related: ['qi-refining', 'foundation', 'golden-core'],
  },
  {
    id: 'keyboard-shortcuts',
    term: '快捷键',
    category: 'game-mechanic',
    icon: '⌨️',
    definition: '提高修仙效率的快捷键。',
    examples: [
      '空格 - 暂停/继续',
      'F1 - 打开修仙百科',
      'ESC - 返回',
      '1/2/3 - 切换游戏速度',
      'B - 尝试突破',
      'M - 打坐修炼',
    ],
    related: ['game-ui'],
  },
  {
    id: 'techniques-system',
    term: '功法系统',
    category: 'cultivation',
    icon: '📜',
    definition: '修炼心法是提升修为速度的根本。',
    mechanic: `8种已实装的功法：
  • 基础吐纳法（凡级）
  • 紫气东来诀（地阶）
  • 九阳神功（天阶）
  • 九阴真经（天阶）
  • 玉清仙诀（仙级）
  • 化魔大法（天阶）
  • 金刚不坏神功（天阶）
  • 虚空呼吸法（仙级）
  
  功法分：凡→地→天→仙 四阶`,
    strategy: '功法不是越高级越好！魔功进境快但心魔重。正派功法稳扎稳打。',
    examples: ['九阳配金刚，天下无敌', '九阴配化魔，魔道至尊'],
    related: ['cultivation-speed', 'breakthrough', 'inner-demon'],
  },
  {
    id: 'alchemy-system',
    term: '炼丹系统',
    category: 'technique',
    icon: '🔥',
    definition: '炼丹是修士最重要的副职业。',
    mechanic: `9种丹药已实装：
  • 聚气丹：回蓝药，新手必备
  • 筑基丹：筑基成功率+40%
  • 金丹大道丹：结丹专用
  • 培元丹：修炼加速50%
  • 延寿丹：+50年寿元
  • 洗髓丹：提升灵根品质
  • 元婴丹：破丹成婴辅助
  • 渡劫仙丹：天劫威力-30%
  • 九转还魂丹：复活一次！`,
    strategy: '洗髓丹是废柴逆袭的神器！但是成功率只有15%。',
    examples: ['筑基丹：一颗筑基丹，十条修士命', '九转还魂丹：阎王要你三更死，丹药留你到五更'],
    related: ['pill', 'foundation-pill', 'breakthrough'],
  },
  {
    id: 'divine-abilities',
    term: '神通系统',
    category: 'technique',
    icon: '⚡',
    definition: '境界提升后解锁的各种神通法术。',
    mechanic: `9种神通已实装：
  炼气期：火球术、水镜术
  筑基：剑气纵横、大地囚笼
  金丹：金丹真火、化虹之术
  元婴：元婴出窍
  化神：九霄神雷
  大乘：袖里乾坤`,
    strategy: '打不过就用化虹之术跑路！修仙界第一守则：活着。',
    related: ['combat', 'breakthrough', 'realm'],
  },
  {
    id: 'sect-system',
    term: '宗门系统',
    category: 'game-mechanic',
    icon: '🏛️',
    definition: '6大宗门供你选择加入，正邪两道任你选。',
    mechanic: `正道三巨頭：
  • 青云门：天下正道之首，剑道至尊
  • 天音寺：佛门正宗，渡化世人
  
  魔道四大派：
  • 鬼王宗：魔教第一实力，血炼大法
  • 合欢派：采补幻术，魅惑天下
  • 万毒门：用毒天下第一
  
  中立：
  • 逍遥剑派：逍遥自在`,
    strategy: '青云门最适合新手。魔道资源多但正邪值会掉。',
    examples: ['魔道功法进境快但心魔重', '正道资源少但心魔低'],
    related: ['righteous', 'demonic', 'reputation'],
  },
  {
    id: 'dao-companion',
    term: '道侣系统',
    category: 'cultivation',
    icon: '💕',
    definition: '修真路漫漫，何不找个伴一起走？',
    mechanic: '每位道侣有不同的天赋和专精：\n• 丹道专精：炼丹成功率+50%\n• 器道专精：炼器成功率+50%\n• 战斗专精：你的战力+30%\n• 辅助专精：双修修炼速度翻倍',
    strategy: '道侣不是越多越好！花心会引发修罗场事件。',
    related: ['dual-cultivation', 'events', 'favor'],
  },
  {
    id: 'random-events',
    term: '随机事件',
    category: 'game-mechanic',
    icon: '🎲',
    definition: '修仙界充满了奇遇和危险。',
    mechanic: `10种事件已实装：
  • 神秘老者传功
  • 山谷发现天材地宝
  • 遇到未来道侣
  • 心魔劫来袭
  • 发现宗门阴谋
  • 上古遗迹探险
  • 同门切磋较艺
  • 突破失败受伤
  • 一朝悟道顿悟
  • 正邪路口抉择`,
    strategy: '上古遗迹是最容易暴富的，也是最容易暴毙的。',
    examples: ['遇到神秘老者要恭敬，人家可能是渡劫老怪', '不要黑吃黑，道心会掉'],
    related: ['opportunity', 'crisis', 'sect-conspiracy'],
  },
  {
    id: 'xianxia-achievements',
    term: '成就系统',
    category: 'game-mechanic',
    icon: '🏆',
    definition: '8大修仙成就等你解锁。',
    strategy: '有些成就非常难。不嗑药筑基几乎是地狱难度。',
    examples: [
      '丹石无用：不用丹药筑基成功',
      '破碎虚空：飞升成仙',
      '神仙眷侣：道侣好感度满值',
      '丹道大宗师：炼制出渡劫仙丹',
    ],
    related: ['breakthrough', 'foundation', 'immortal'],
  },
]

export function searchXianxiaConcepts(term: string): XianxiaConcept[] {
  const searchTerm = term.toLowerCase()
  return XIANXIA_CONCEPTS.filter(c => 
    c.term.toLowerCase().includes(searchTerm) ||
    c.definition.toLowerCase().includes(searchTerm) ||
    c.category.toLowerCase().includes(searchTerm)
  )
}

export function getXianxiaConceptsByCategory(category: XianxiaConcept['category']): XianxiaConcept[] {
  return XIANXIA_CONCEPTS.filter(c => c.category === category)
}

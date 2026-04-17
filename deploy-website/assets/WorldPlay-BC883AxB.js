var V=Object.defineProperty;var A=(a,n,t)=>n in a?V(a,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[n]=t;var w=(a,n,t)=>A(a,typeof n!="symbol"?n+"":n,t);import{j as e}from"./three-mKEHXfdI.js";import{f as H,r as g}from"./vendor-fEUEPB2a.js";import{u as z}from"./useTransitionNavigate-CVM7qShw.js";import{G as y}from"./GlowCard-CLObW7Zk.js";import"./index-t__6Mf-C.js";import{m as x,A as S}from"./motion-4XSS6jZK.js";import{U as $,j as U,ad as W,r as Y,y as G,ae as B,af as J,s as X,o as K}from"./ui-DUWL9IFQ.js";const E="humanos-world-player-profile",Z={id:"player-"+Date.now().toString(36),name:"旅行者",completedScenarios:[],unlockedEndings:{},achievements:[],valueMatrix:{},decisionHistory:[],totalPlayTime:0};function Q(){try{const a=localStorage.getItem(E);if(a)return JSON.parse(a)}catch(a){console.warn("Failed to load player profile:",a)}return{...Z}}function ee(a){try{localStorage.setItem(E,JSON.stringify(a))}catch(n){console.warn("Failed to save player profile:",n)}}function te(a,n,t,r){const i=Q();return i.completedScenarios.includes(a)||i.completedScenarios.push(a),i.unlockedEndings[a]||(i.unlockedEndings[a]=[]),i.unlockedEndings[a].includes(n)||i.unlockedEndings[a].push(n),Object.entries(r).forEach(([m,u])=>{const o=m;i.valueMatrix[o]=(i.valueMatrix[o]||0)+u}),i.totalPlayTime+=t,ee(i),i}const ie={id:"french-revolution-1789",category:"historical",title:"法国大革命：1789",subtitle:"自由与死亡的十字路口",description:"1789年的巴黎，空气中弥漫着革命的气息。作为第三等级的代表，你将如何在历史的漩涡中做出选择？支持君主立宪？还是拥护共和？每一个决策都将改写历史。",coverImage:"",icon:"⚔️",difficulty:"intermediate",estimatedDuration:15,decisionPoints:8,endingCount:5,tags:["历史","政治","革命","法国","18世纪"],featured:!0,setting:{era:"1789-1794",location:"法国 巴黎",premise:"你是一位年轻的律师，来自第三等级。三级会议刚刚召开，历史的大门正在你面前打开。"},startNode:"intro",valueDimensions:["liberty","equality","order","tradition","progress","justice","authority","collectivism"],nodes:{intro:{id:"intro",type:"narrative",title:"序章：凡尔赛的早晨",year:"1789年5月5日",location:"凡尔赛宫",context:"历史的转折点",content:`1789年的春天，凡尔赛宫的空气中弥漫着不安的气息。

你站在人群之中，作为第三等级的代表——一个外省来的年轻律师，与无数和你一样的人站在一起。贵族们穿着华丽的礼服，僧侣们身着长袍，而你们——第三等级的代表们——穿着简单的黑衣。

国王路易十六刚刚发表了他那犹豫不决的演说。国库空虚，饥荒蔓延，人民在挨饿，而特权阶级拒绝放弃他们的特权。

"我们是谁？"有人在人群中喊道，"我们是国家！如果他们拒绝与我们一起开会，我们就自己开会！"

人群开始骚动。`,nextNode:"d1_tennis_court"},d1_tennis_court:{id:"d1_tennis_court",type:"decision",title:"网球场誓言",year:"1789年6月20日",location:"圣路易街网球场",context:"第一个重大选择",content:`三天前，国王下令关闭会议厅。第三等级的代表们愤怒地聚集到附近的网球场。

米拉波伯爵站在桌子上大声疾呼："我们在这里，是因为人民的意志！除非制定了宪法，否则我们绝不离开！"

现在，所有人的目光都转向了起草誓言的时刻。`,options:[{id:"radical",text:'坚决支持："不立宪，毋宁死！"',description:"完全支持革命，要求彻底的变革",consequences:"你成为激进派的领袖人物之一",valueLoadings:[{dimension:"liberty",weight:2},{dimension:"equality",weight:2},{dimension:"progress",weight:1.5},{dimension:"tradition",weight:-1}],nextNode:"d2_bastille"},{id:"moderate",text:'谨慎支持："我们应该与国王对话"',description:"支持改革，但寻求与王室妥协",consequences:"你成为温和派的中坚力量",valueLoadings:[{dimension:"liberty",weight:1},{dimension:"equality",weight:.5},{dimension:"order",weight:.5}],nextNode:"d2_bastille"},{id:"conservative",text:'表示担忧："这太冒险了，我们应该解散"',description:"担心失控，主张保守方案",consequences:"你被贴上保王派的标签",valueLoadings:[{dimension:"order",weight:2},{dimension:"tradition",weight:2},{dimension:"authority",weight:1},{dimension:"liberty",weight:-1}],nextNode:"d2_bastille"}]},d2_bastille:{id:"d2_bastille",type:"decision",title:"攻占巴士底狱",year:"1789年7月14日",location:"巴士底狱",context:"暴力的开端",content:`整个巴黎沸腾了。

人民手持武器，包围了巴士底狱——这座象征着王权专制的古老监狱。守军开枪了，人群中倒下了几十具尸体。

作为国民自卫军的一员，你站在人群的最前列。典狱长德洛内举起了白旗，但愤怒的民众已经失控。

"杀死他！吊死他！"人群在咆哮。`,options:[{id:"violence",text:'高呼："暴君的走狗！死有余辜！"',description:"支持人民的正义愤怒，暴力是必要的恶",consequences:"暴力的闸门一旦打开，就再也无法关闭",valueLoadings:[{dimension:"justice",weight:1.5},{dimension:"collectivism",weight:1},{dimension:"order",weight:-2}],nextNode:"d3_king_decision"},{id:"merciful",text:'大声制止："法治！我们要的是法治！"',description:"即使是敌人也应该受到公正的审判",consequences:"有人称赞你的理智，有人骂你是懦夫",valueLoadings:[{dimension:"justice",weight:1},{dimension:"order",weight:1},{dimension:"equality",weight:.5}],nextNode:"d3_king_decision"},{id:"disturbed",text:"默默转身，在混乱中离开",description:"这一切让你感到恐惧和不安",consequences:"你的内心开始怀疑这场革命",valueLoadings:[{dimension:"order",weight:1.5},{dimension:"tradition",weight:.5},{dimension:"liberty",weight:-.5}],nextNode:"d3_king_decision"}]},d3_king_decision:{id:"d3_king_decision",type:"decision",title:"国王的审判",year:"1793年1月",location:"国民公会",context:"人类历史上最重大的审判之一",content:`路易十六被关在圣殿塔里。国民公会正在辩论他的命运。

"叛国者！"罗伯斯庇尔在演讲，"路易必须死，因为祖国必须生！"

巴黎的民众聚集在窗外高呼"处死！处死！"

而你——作为国民公会的代表——手握决定国王生死的一票。

历史学家们将为这次投票争论几百年。`,options:[{id:"death",text:'投票支持死刑："共和国的敌人没有仁慈可言"',description:"彻底处决君主制，决不妥协",consequences:"你选择了革命的纯洁性",valueLoadings:[{dimension:"equality",weight:2.5},{dimension:"justice",weight:1.5},{dimension:"tradition",weight:-2},{dimension:"authority",weight:-1.5}],nextNode:"ending_robespierre"},{id:"imprison",text:'投票支持监禁："仁慈是文明的标志"',description:"反对死刑，主张监禁或流放",consequences:"吉伦特派赞扬你的人道主义",valueLoadings:[{dimension:"justice",weight:1},{dimension:"liberty",weight:.5},{dimension:"order",weight:.5}],nextNode:"ending_girondin"},{id:"restore",text:'反对审判："国王是合法的君主"',description:"君主制仍然是法国最好的选择",consequences:"你被打上反革命的烙印",valueLoadings:[{dimension:"tradition",weight:2.5},{dimension:"order",weight:2},{dimension:"authority",weight:1.5},{dimension:"equality",weight:-2}],nextNode:"ending_monarchist"}]},ending_robespierre:{id:"ending_robespierre",type:"ending",title:"美德的专制",content:`你选择了与罗伯斯庇尔同行。

国王被处决了，吉伦特派被处决了，埃贝尔派被处决了，丹东派也被处决了。断头台太忙了，巴黎的血流成河。

你成了革命法庭的陪审员，每天宣判几十个人的死刑。你告诉自己这是必要的，为了共和国的纯洁，为了未来的美好。

直到热月9日那天。

当你被押上断头台时，你终于明白了——试图在人间建造天堂的人，最终只会制造地狱。`},ending_girondin:{id:"ending_girondin",type:"ending",title:"温和派的悲剧",content:`你站在吉伦特派一边，相信自由和秩序可以并存。

但历史没有给中间派留下位置。激进派称你们是"革命的叛徒"，保王派骂你们是"弑君的乱党"。

1793年秋天，你和其他吉伦特派代表一起被送上了断头台。

临刑前，你大声喊道："革命，就像 Saturn 一样，吞噬了自己的孩子！"

你的遗言成了永恒的警世名言。`},ending_monarchist:{id:"ending_monarchist",type:"ending",title:"流亡者",content:`投票后，你连夜逃离了巴黎。

科布伦茨、维也纳、圣彼得堡...你在欧洲各国的宫廷间流浪，呼吁欧洲君主们武装干涉，扑灭革命的火焰。

你活了下来，见证了拿破仑的崛起与覆灭，见证了波旁王朝的复辟。

1815年，当你重新踏上法国的土地时，你已经是一个白发苍苍的老人了。

大革命摧毁的一切又回来了——但什么都不一样了。那个你所熟悉的旧世界，永远消失了。`}},endings:{robespierre:{id:"robespierre",title:"美德的专制",summary:"你成为了恐怖统治的一员，最终也被革命吞噬",content:"革命是一把双刃剑。当你拥抱暴力的时候，终究会成为暴力的牺牲品。",characterFate:"热月政变中被处决，享年36岁",rarity:"uncommon",valueProfile:["equality","justice","collectivism","authority"]},girondin:{id:"girondin",title:"温和派的悲剧",summary:"你在革命的两个极端之间被碾碎",content:"中庸之道是高贵的，但历史往往不站在温和派一边。",characterFate:"1793年被送上断头台",rarity:"rare",valueProfile:["justice","liberty","order","equality"]},monarchist:{id:"monarchist",title:"流亡者",summary:"你选择了旧世界，在异乡度过余生",content:"秩序和传统是文明的基石，但也可能成为进步的枷锁。",characterFate:"流亡二十二年，波旁复辟后归国",rarity:"common",valueProfile:["tradition","order","authority","stability"]}}},ne={id:"modern-china-life",category:"life",title:"当代青年人生模拟",subtitle:"1995-2035，一个普通人的四十年",description:"出生在改革开放后的中国，你将经历高考、大学、就业、婚姻、育儿。每一个选择都通向不同的人生。",coverImage:"",icon:"🎭",difficulty:"beginner",estimatedDuration:20,decisionPoints:12,endingCount:7,tags:["人生","现代","成长"],setting:{era:"1995-2035",location:"中国",premise:"你是一个出生在改革开放后的普通青年，你的每一个选择都将塑造你的人生。"},startNode:"childhood",valueDimensions:["liberty","equality","order","tradition","progress","individualism","collectivism","meritocracy","compassion","stability","innovation","autonomy","reason"],nodes:{childhood:{id:"childhood",type:"narrative",title:"童年",year:"1995年",location:"普通小城",content:'你出生在一个普通的家庭。父母都是工薪阶层。他们对你寄予厚望。"好好学习，将来考上好大学"——这是他们最常说的话。',nextNode:"college_entrance"},college_entrance:{id:"college_entrance",type:"narrative",title:"高考",year:"2013年",location:"家乡",content:"高考结束了。你考上了一所还不错的大学。专业是计算机。父母很高兴，他们觉得你将来肯定有出息。",nextNode:"graduation"},graduation:{id:"graduation",type:"narrative",title:"毕业",year:"2017年",location:"大学校园",content:"四年很快就过去了。你站在人生的十字路口。考研？出国？还是工作？同学们都在做出自己的选择。",nextNode:"work_huawei"},midlife_crisis:{id:"midlife_crisis",type:"narrative",title:"中年危机",year:"2029年",location:"某座城市",content:"你36岁了。上有老，下有小。公司在裁员。房贷还有20年。孩子的教育，父母的健康，你的发际线——一切都在提醒你：不再年轻了。",nextNode:"ending_ordinary"},ending_ordinary:{id:"ending_ordinary",type:"ending",title:"平凡之路",content:"大多数人的一生，就是这样。没有惊天动地，没有大富大贵。但是有一个温暖的家。这就够了。"}},endings:{ordinary:{id:"ordinary",title:"平凡之路",rarity:"common",summary:"你选择了大多数人走的路。平凡，但是真实。",content:`大多数人的一生，就是这样。

没有惊天动地，没有大富大贵。

但是有一个温暖的家，有健康的父母，有懂事的孩子。

这就够了。

真的够了。`,characterFate:"你活成了大多数。但这绝不是失败。",valueProfile:["tradition","stability","order","collectivism"]},fire:{id:"fire",title:"FIRE运动实践者",rarity:"rare",summary:"你选择了退出游戏。",content:`当所有人都在卷的时候，你选择了不玩了。

这需要巨大的勇气。

你放弃了社会认可的成功标准，按照自己的意愿生活。

这才是真正的自由。`,characterFate:"你终于活成了自己。",valueProfile:["liberty","autonomy","individualism","reason"]},public_welfare:{id:"public_welfare",title:"公益之路",rarity:"legendary",summary:"你选择了为他人而活。",content:`你放弃了高薪的工作，投身于公益事业。

有人说你傻。

但你找到了真正的自我价值。

你的生命因为有意义而更加厚重。`,characterFate:"你用生命温暖了这个时代。",valueProfile:["compassion","justice","equality","collectivism"]},entrepreneur:{id:"entrepreneur",title:"创业路上",rarity:"uncommon",summary:"你选择了九死一生的道路。",content:`你失败了很多次。

但你没有放弃。

你知道大多数创业都会失败。

但你还是选择了这条路。

这本身就是一种勇气。`,characterFate:"你没有后悔过。",valueProfile:["innovation","progress","meritocracy","individualism"]},academia:{id:"academia",title:"象牙塔里",rarity:"rare",summary:"你选择了知识的道路。",content:`你读了博士。

然后做了博士后。

然后继续做研究。

别人说你读傻了。

但你知道自己在做什么。`,characterFate:"有些事情，总要有人去做。",valueProfile:["reason","progress","innovation","meritocracy"]},government:{id:"government",title:"官场人生",rarity:"rare",summary:"你选择了这条最复杂的路。",content:`你进了体制。

一步步往上走。

见过太多的人和事。

你变成了自己曾经讨厌的那种人？

或者说，你成熟了。`,characterFate:"你守住了底线。",valueProfile:["order","stability","authority","collectivism"]},legendary_elite:{id:"legendary_elite",title:"时代精英",rarity:"legendary",summary:"你站上了金字塔的顶端。",content:`你成功了。

无论是财富还是地位。

你成了别人口中的「那个人」。

但是你快乐吗？

也许吧。`,characterFate:"你得到了一切，也失去了一切。",valueProfile:["meritocracy","progress","authority","individualism"]}}},ae={id:"china-civilization",category:"civilization",title:"中华文明起源",subtitle:"公元前3000年，带领你的部落走向文明",description:"回到五千年前的黄河流域，作为部落首领，你将面对洪水、饥荒、外敌。每一个决策都将塑造这个文明的基因。",coverImage:"",icon:"🏛️",difficulty:"intermediate",estimatedDuration:25,decisionPoints:10,endingCount:6,tags:["文明","上古","中国","建设"],featured:!0,new:!0,author:"HumanOS Team",releaseDate:"2026-04-11",setting:{era:"公元前3000年-公元前2000年",location:"黄河流域",premise:"你是一个有数百人的部落首领。洪水年年泛滥，邻近部落虎视眈眈。文明的火种，由你守护。"},valueDimensions:["order","tradition","collectivism","stability","progress","innovation","authority","compassion"],startNode:"tribal_leader",nodes:{tribal_leader:{id:"tribal_leader",type:"decision",title:"部落首领",content:`公元前2800年，黄河之畔。

你站在高台上，看着你的族人在河边耕种。

雨季即将到来。去年的洪水平息还不到一年，人们心中的恐惧仍未散去。

长老告诉你，河对岸的神农部落派人来说，如果我们愿意奉他们为共主，可以得到治水的技术。

而你的少壮派将军则主张突袭，先下手为强。

巫祝在祭坛前占卜了三天三夜，说"天命在水，不在人"。`,year:"公元前2800年",location:"黄河之滨",context:"文明的第一道选择题",options:[{id:"submit",text:"奉神农氏为共主",description:"换取治水技术，保全族人",consequences:"获得技术，但失去独立 · 融入更大的部落联盟",valueLoadings:[{dimension:"stability",weight:2},{dimension:"collectivism",weight:2},{dimension:"tradition",weight:1}],nextNode:"alliance"},{id:"war",text:"突袭神农部落",description:"抢在雨季来临前征服他们",consequences:"风险巨大，但如果成功 · 你的部落将成为核心",valueLoadings:[{dimension:"authority",weight:2},{dimension:"meritocracy",weight:2},{dimension:"innovation",weight:1}],nextNode:"war_path"},{id:"self_reliance",text:"自己治水",description:"相信自己族人的力量",consequences:"最难的路，但如果走通 · 一个全新的传统将在这里诞生",valueLoadings:[{dimension:"progress",weight:2},{dimension:"innovation",weight:2},{dimension:"collectivism",weight:2}],nextNode:"self_water_management"}]},alliance:{id:"alliance",type:"narrative",title:"部落联盟",content:`你带着礼物和族人，渡过了黄河。

神农氏的首领热情地接待了你。

你看到了他们的沟渠系统，看到了他们如何划分田地。

两个部落合并了。

新的问题很快出现：谁来做真正的决策者？`,year:"公元前2795年",location:"联盟大会",nextNode:"alliance_leadership"},alliance_leadership:{id:"alliance_leadership",type:"decision",title:"权力的平衡",content:`联盟的第三年。

神农氏的长老们习惯了由他们制定规则。

但你的族人带来的勇气和战斗力，是联盟不可或缺的。

现在神农氏首领年老体衰。

有人提议你应该成为新的共主。

也有人说应该恢复古老的禅让制。`,year:"公元前2790年",location:"联盟议事厅",options:[{id:"seize_power",text:"成为共主",description:"你应该掌握最高权力",consequences:"权力集中 · 但传统势力会不满",valueLoadings:[{dimension:"authority",weight:2},{dimension:"order",weight:1}],nextNode:"kingdom_path"},{id:"shanrang",text:"建立禅让制",description:"有德者居之",consequences:"伟大的政治传统 · 但你的子孙可能永远失去权力",valueLoadings:[{dimension:"tradition",weight:3},{dimension:"collectivism",weight:2},{dimension:"meritocracy",weight:2}],nextNode:"virtue_kingdom"}]},war_path:{id:"war_path",type:"narrative",title:"战争之路",content:`战斗在黎明时分打响。

你的战士们勇猛无比。

神农部落的人没有想到会遭到突袭。

胜利了。

你站在他们首领的尸体前。

这个老人口中还念叨着"水"字。

你得到了治水的图纸，还有一个沉甸甸的问题：

用这样的手段得到的东西，值得吗？`,year:"公元前2798年",location:"战场",nextNode:"war_aftermath"},war_aftermath:{id:"war_aftermath",type:"decision",title:"征服者的选择",content:`战俘们跪在你面前。

将军说，全部杀掉，以绝后患。

巫祝说，选一些作为人祭，平息神怒。

你最小的儿子说，让他们活下来，教我们治水。

阳光照在青铜斧上，反射出你自己的脸。

你是什么样的人？`,year:"公元前2798年",location:"胜利者的营地",options:[{id:"massacre",text:"全部处决",description:"残忍，但没有后患",consequences:"恐怖统治的开始 · 你的名字将成为传说中的凶名",valueLoadings:[{dimension:"authority",weight:3},{dimension:"order",weight:1}],nextNode:"tyrant_path"},{id:"assimilate",text:"吸收他们",description:"让他们成为我们的一份子",consequences:"文明融合 · 但需要几代人的时间消化",valueLoadings:[{dimension:"collectivism",weight:2},{dimension:"progress",weight:2},{dimension:"compassion",weight:1}],nextNode:"melting_pot"}]},self_water_management:{id:"self_water_management",type:"narrative",title:"自己动手",content:`你把所有的青壮年都组织了起来。

第一个月，没有人相信这能成功。

第一个雨季来了。

堤坝第一次挡住了洪水。

族人们在堤坝上欢呼，淋雨。

你发现了一个简单的道理：

当人们为了同一个目标一起劳作的时候，他们会产生一种超越血缘的纽带。

这种纽带，就是国家。`,year:"公元前2790年",location:"黄河大堤",nextNode:"water_success"},water_success:{id:"water_success",type:"decision",title:"水利国家",content:`治水成功后的第十年。

周围的部落都来归附你。

他们听说了你的成就。

现在你有了成千上万的子民。

你需要一个永久的中心。

你需要一套规则。`,year:"公元前2780年",location:"新的聚居地",options:[{id:"bureaucracy",text:"建立官僚体系",description:"按能力任命官员",consequences:"理性的国家机器诞生 · 但也会有腐败",valueLoadings:[{dimension:"order",weight:3},{dimension:"progress",weight:2},{dimension:"meritocracy",weight:2}],nextNode:"bureaucratic_state"},{id:"ritual",text:"建立礼乐制度",description:"用仪式和音乐教化人民",consequences:"文明的深度将无与伦比 · 但等级会固化",valueLoadings:[{dimension:"tradition",weight:3},{dimension:"order",weight:2},{dimension:"collectivism",weight:2}],nextNode:"ritual_civilization"}]},kingdom_path:{id:"kingdom_path",type:"ending",title:"王国的奠基",content:`你成为了王。

你的子孙将继承你的王位。

一千年后，你的后代将建立第一个王朝。

人们会忘记你的名字，

但是你建立的秩序，

将成为这个文明最深处的记忆。`},virtue_kingdom:{id:"virtue_kingdom",type:"ending",title:"禅让的传说",content:`你建立了禅让制。

你老了之后，把位置传给了最贤能的年轻人，而不是你的儿子。

这个传统延续了很多代。

几千年后，人们仍然会说起那个"天下为公"的黄金时代。

成为传说中的圣王。

这比任何王朝都更长久。`},tyrant_path:{id:"tyrant_path",type:"ending",title:"暴君的遗产",content:`用恐怖维持的统治，很有效率。

没有人敢反对你。

你活着的时候，建起了巨大的工程。

但是你死之后，你的帝国立刻分崩离析。

人们烧毁了你的宫殿。

但是有一样东西留了下来：

暴力可以建立秩序。

这个教训，后世的人们永远不会忘记。`},melting_pot:{id:"melting_pot",type:"ending",title:"文明熔炉",content:`两个部落融合了。

没有胜利者，也没有失败者。

他们的神变成了我们的神，他们的技术变成了我们的技术。

一百年后，没有人记得那场战争。

这就是中华文明最核心的秘密：

从来不是我们征服了谁，

而是我们把谁，变成了我们。`},bureaucratic_state:{id:"bureaucratic_state",type:"ending",title:"水利官僚国家",content:`因为治水，我们需要精确的测量。

因为治水，我们需要统一的调度。

因为治水，我们发明了文字，用来记录。

因为治水，我们建立了世界上第一个官僚体系。

这一切的起点，

不过是五千年前，

你站在河边的那个决定。`},ritual_civilization:{id:"ritual_civilization",type:"ending",title:"礼乐文明",content:`你建立了一套复杂的仪式系统。

不同等级的人，用不同的礼器，听不同的音乐。

每个人都知道自己的位置。

社会像一个精密的乐器。

两千年后，周公和孔子将会"恢复"你创立的制度。

而这个文明，

将成为世界上最讲"礼"的文明。`}},endings:{kingdom_path:{id:"kingdom_path",title:"王国奠基者",rarity:"common",summary:"你建立了一个世袭王朝的雏形。",content:"王权的种子被埋下了。一千年后将破土而出。",characterFate:"你的血脉将延续很久很久。",valueProfile:["order","authority","stability","tradition"]},virtue_kingdom:{id:"virtue_kingdom",title:"尧舜之治",rarity:"legendary",summary:'你创造了"天下为公"的传说。',content:`圣王的传说，照耀了这个文明五千年。

即使在最黑暗的时代，

人们仍然相信，

政治应该是道德的延伸。`,characterFate:"你成为了中国人心目中理想统治者的原型。",valueProfile:["collectivism","meritocracy","virtue","tradition"]},tyrant_path:{id:"tyrant_path",title:"铁血始祖",rarity:"rare",summary:"用暴力和恐怖建立秩序。",content:`你证明了力量就是一切。

这堂课，

后世每一个王朝的建立者，

都学得很好。`,characterFate:"你的方法比你的名字流传得更久。",valueProfile:["authority","order","stability"]},melting_pot:{id:"melting_pot",title:"文明熔炉",rarity:"uncommon",summary:"海纳百川，有容乃大。",content:`这就是中华文明最大的秘密。

没有征服者，没有被征服者。

只有"我们"。`,characterFate:"包容的基因，写进了这个文明的DNA。",valueProfile:["collectivism","progress","compassion","stability"]},bureaucratic_state:{id:"bureaucratic_state",title:"水利帝国",rarity:"rare",summary:"因为治水，你创造了世界上第一个理性国家。",content:`大规模公共工程需要大规模组织。

而大规模组织，

催生了世界上最早熟的官僚制度。

这个制度，

至今仍在运转。`,characterFate:"你是大一统传统的真正缔造者。",valueProfile:["order","progress","meritocracy","collectivism"]},ritual_civilization:{id:"ritual_civilization",title:"礼乐之邦",rarity:"rare",summary:"你用礼和乐，而不是刀剑，教化了人民。",content:`音乐使人和谐。

仪式使人敬畏。

两千五百年后，

孔子说：

"周监于二代，郁郁乎文哉！"

他不知道，

这个传统，

从你就开始了。`,characterFate:"你创造了人类历史上最优雅的政治文明。",valueProfile:["tradition","order","collectivism","compassion"]}}},se={id:"country-simulator",category:"grand-simulation",title:"国家治理模拟器",subtitle:"掌舵一个国家的命运",description:"从7个真实国家中选择，掌舵国家的命运。GDP、通胀、失业、债务...每一项政策都牵一发而动全身。完整的经济模拟系统、随机事件库、国策树系统。你能带领人民走向繁荣吗？",coverImage:"",icon:"🏛️",difficulty:"advanced",estimatedDuration:60,decisionPoints:999,endingCount:7,tags:["沙盒","经济","国策","长线"],featured:!0,new:!0,setting:{era:"现代",location:"全球",premise:"真实世界国家治理模拟"},startNode:"redirect",nodes:{},endings:{},valueDimensions:[]},re={id:"xianxia-world",category:"grand-simulation",title:"修仙大世界",subtitle:"凡人逆天证道之路",description:"从炼气期开始，一步步踏上修仙之路。炼丹炼器、突破境界、渡劫飞升、建立门派。63个完整境界，完整的buff系统，随机机缘奇遇。完整的修仙体系等你来探索。",coverImage:"",icon:"☯️",difficulty:"expert",estimatedDuration:45,decisionPoints:999,endingCount:9,tags:["沙盒","修仙","养成","长线"],featured:!0,new:!0,setting:{era:"修仙纪元",location:"九州大陆",premise:"凡人修仙传"},startNode:"redirect",nodes:{},endings:{},valueDimensions:[]},q={};function v(a){q[a.id]=a}v(ie);v(ne);v(ae);v(se);v(re);function oe(a){return q[a]}class C{constructor(n,t){w(this,"scenario");w(this,"state");w(this,"playerProfile");const r=oe(n);if(!r)throw new Error(`Scenario ${n} not found`);this.scenario=r,this.playerProfile=t||this.createEmptyProfile(),this.state=this.createInitialState()}createEmptyProfile(){return{id:"anonymous",name:"旅行者",completedScenarios:[],unlockedEndings:{},achievements:[],valueMatrix:{},decisionHistory:[],totalPlayTime:0}}createInitialState(){const n={};return this.scenario.valueDimensions.forEach(t=>{n[t]=0}),{scenarioId:this.scenario.id,currentNodeId:this.scenario.startNode,visitedNodes:[this.scenario.startNode],decisionPath:[],accumulatedValues:n,startTime:Date.now(),currentPlayTime:0}}getScenario(){return this.scenario}getCurrentNode(){return this.scenario.nodes[this.state.currentNodeId]}getState(){return{...this.state,currentPlayTime:Date.now()-this.state.startTime}}advanceNarrative(){const n=this.getCurrentNode();return n.type!=="narrative"||!n.nextNode?null:(this.state.currentNodeId=n.nextNode,this.state.visitedNodes.push(n.nextNode),this.getCurrentNode())}makeDecision(n){const t=this.getCurrentNode();if(t.type!=="decision"||!t.options)return null;const r=t.options.find(i=>i.id===n);return r?(this.state.decisionPath.push({nodeId:t.id,optionId:r.id,optionText:r.text,valueLoadings:r.valueLoadings}),r.valueLoadings.forEach(i=>{this.state.accumulatedValues[i.dimension]=(this.state.accumulatedValues[i.dimension]||0)+i.weight}),this.state.currentNodeId=r.nextNode,this.state.visitedNodes.push(r.nextNode),this.getCurrentNode()):null}hasEnded(){return this.getCurrentNode().type==="ending"}getDominantValues(n=3){return Object.entries(this.state.accumulatedValues).map(([t,r])=>({dimension:t,score:r})).sort((t,r)=>Math.abs(r.score)-Math.abs(t.score)).slice(0,n)}generateValueProfile(){const n=Object.entries(this.state.accumulatedValues).map(([o,l])=>({dimension:o,score:l})).sort((o,l)=>Math.abs(l.score)-Math.abs(o.score)),t=n.filter(o=>Math.abs(o.score)>=1.5).slice(0,5),r=n.filter(o=>Math.abs(o.score)<.5&&o.score!==0).map(o=>o.dimension),i=[];[["liberty","order"],["equality","meritocracy"],["individualism","collectivism"],["tradition","progress"],["nationalism","globalism"],["authority","autonomy"],["stability","innovation"]].forEach(([o,l])=>{const h=this.state.accumulatedValues[o]||0,f=this.state.accumulatedValues[l]||0;Math.abs(h)>1&&Math.abs(f)>1&&h*f<0&&i.push([o,l])});const u=this.determineArchetype(t);return{dominant:t,balanced:r,conflicts:i,archetype:u.name,archetypeDescription:u.description}}determineArchetype(n){const t=new Set(n.map(r=>r.dimension));return t.has("order")&&t.has("tradition")?{name:"保守守护者",description:"你珍视传统与秩序，相信经过时间检验的制度与价值。稳定是你最大的追求。"}:t.has("progress")&&t.has("equality")?{name:"进步理想主义者",description:"你坚信社会可以变得更好，平等与公正是你不懈的追求。"}:t.has("liberty")&&t.has("individualism")?{name:"自由个人主义者",description:"个人自由是最高价值，每个人都应该为自己的人生负责。"}:t.has("collectivism")&&t.has("equality")?{name:"社群主义者",description:"你相信共同体的力量，没有人是孤岛，我们彼此相连。"}:t.has("justice")&&t.has("compassion")?{name:"慈悲审判者",description:"公义与怜悯在你心中并存，你追求一个既公平又有人情味的世界。"}:{name:"平衡现实主义者",description:"你拒绝极端，在各种价值中寻找微妙的平衡。世界是复杂的，答案从不简单。"}}generateResult(){const t=this.getCurrentNode().id.replace("ending_",""),r=this.scenario.endings[t]||Object.values(this.scenario.endings)[0],i=this.generateValueProfile(),m=this.state.decisionPath.slice(-5).map(l=>({choice:l.optionText,impact:this.getDecisionImpact(l.valueLoadings),values:l.valueLoadings.filter(h=>Math.abs(h.weight)>=.5).map(h=>h.dimension)})),u=this.matchHistoricalFigure(i),o=Math.round((Date.now()-this.state.startTime)/1e3);return te(this.scenario.id,t,o,this.state.accumulatedValues),{scenarioId:this.scenario.id,scenarioTitle:this.scenario.title,ending:r,playTime:o,decisionCount:this.state.decisionPath.length,valueProfile:i,keyDecisions:m,archetypeMatch:u}}getDecisionImpact(n){const t=n.filter(i=>Math.abs(i.weight)>=.8);return t.length===0?"这个选择没有体现强烈的价值倾向":`价值倾向: ${t.map(i=>`${i.weight>0?"+":"-"}${i.dimension}`).join(", ")}`}matchHistoricalFigure(n){const t=new Set(n.dominant.slice(0,3).map(u=>u.dimension)),r=[{name:"拿破仑·波拿巴",values:new Set(["order","authority","nationalism","meritocracy"]),description:"如拿破仑一般，你相信强者创造秩序，用铁腕推动进步。"},{name:"马克西米连·罗伯斯庇尔",values:new Set(["equality","justice","collectivism","authority"]),description:"你对平等和正义有着近乎狂热的追求，不惜一切代价实现理想。"},{name:"孔多塞侯爵",values:new Set(["progress","reason","equality","liberty"]),description:"理性与进步的信徒，相信人类可以通过知识不断自我完善。"},{name:"埃德蒙·伯克",values:new Set(["tradition","order","stability","authority"]),description:"审慎的保守主义者，相信传统是历代智慧的结晶。"},{name:"托马斯·潘恩",values:new Set(["liberty","equality","progress","reason"]),description:"自由的使者，相信人的天赋权利可以推翻一切不合理的制度。"}];let i=r[0],m=0;return r.forEach(u=>{const l=[...t].filter(h=>u.values.has(h)).length/Math.max(t.size,1);l>m&&(m=l,i=u)}),{historicalFigure:i.name,description:i.description,similarity:Math.round(m*100)}}restart(){this.state=this.createInitialState()}}function pe(){const{scenarioId:a}=H(),{navigate:n}=z(),[t,r]=g.useState(null),[i,m]=g.useState(null),[u,o]=g.useState(null),[l,h]=g.useState(!1),[f,j]=g.useState(!1),[d,_]=g.useState(null),[N,L]=g.useState(!1),p=g.useRef(null);g.useEffect(()=>{if(a==="country-simulator"){n("/simulation/country");return}if(a==="xianxia-world"){n("/simulation/xianxia");return}if(a){const s=new C(a);p.current=s,r(s),m(s.getCurrentNode())}return()=>{p.current=null}},[a,n]);const F=g.useCallback(()=>{!p.current||l||(h(!0),setTimeout(()=>{const s=p.current.advanceNarrative();s&&m(s),h(!1)},400))},[l]),D=g.useCallback(s=>{!p.current||l||(o(s.id),h(!0),setTimeout(()=>{const c=p.current.makeDecision(s.id);if(p.current.hasEnded()){const b=p.current.generateResult();_(b),j(!0)}else c&&m(c);o(null),h(!1)},600))},[l]),I=g.useCallback(()=>{if(a){const s=new C(a);p.current=s,r(s),m(s.getCurrentNode()),j(!1),_(null)}},[a]);if(!t||!i)return e.jsx("div",{className:"min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center",children:e.jsx("div",{className:"text-white text-xl",children:"正在加载世界..."})});const P=t.getScenario(),k=t.getState(),M=t.getDominantValues(4),T={common:"from-slate-500 to-slate-600",uncommon:"from-green-500 to-emerald-500",rare:"from-blue-500 to-indigo-500",legendary:"from-amber-500 to-orange-500"},R={common:"普通",uncommon:"稀有",rare:"珍贵",legendary:"传说"};if(f&&d)return e.jsx("div",{className:"min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-6",children:e.jsxs("div",{className:"max-w-4xl mx-auto",children:[e.jsxs(x.div,{initial:{opacity:0,y:30},animate:{opacity:1,y:0},className:"text-center mb-12",children:[e.jsxs("div",{className:`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${T[d.ending.rarity]} text-white text-sm font-bold mb-6`,children:["🌟 ",R[d.ending.rarity],"结局"]}),e.jsx("h1",{className:"text-4xl font-bold text-white mb-4",children:d.ending.title}),e.jsx("p",{className:"text-violet-400 text-lg max-w-2xl mx-auto",children:d.ending.summary})]}),e.jsxs(y,{className:"mb-8 p-8",children:[e.jsx("div",{className:"prose prose-invert max-w-none",children:e.jsx("p",{className:"text-slate-300 text-lg leading-relaxed whitespace-pre-wrap",children:d.ending.content})}),d.ending.characterFate&&e.jsx("div",{className:"mt-6 p-4 bg-violet-500/10 border border-violet-500/20 rounded-xl",children:e.jsxs("p",{className:"text-violet-300 italic text-center text-lg",children:["「 ",d.ending.characterFate," 」"]})})]}),d.archetypeMatch.historicalFigure&&e.jsx(x.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.2},children:e.jsx(y,{className:"mb-8 p-6 bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-amber-500/20",children:e.jsxs("div",{className:"flex items-start gap-4",children:[e.jsx("div",{className:"w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0",children:e.jsx($,{className:"w-6 h-6 text-amber-400"})}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-lg font-bold text-amber-300 mb-1",children:"历史人物匹配"}),e.jsx("p",{className:"text-white font-medium text-xl mb-2",children:d.archetypeMatch.historicalFigure}),e.jsx("p",{className:"text-slate-400",children:d.archetypeMatch.description}),e.jsxs("p",{className:"text-amber-400 text-sm mt-2",children:["相似度: ",d.archetypeMatch.similarity,"%"]})]})]})})}),e.jsxs(y,{className:"mb-8 p-6",children:[e.jsxs("h3",{className:"text-xl font-bold text-white mb-6 flex items-center gap-2",children:[e.jsx(U,{className:"w-5 h-5 text-violet-400"}),"你的价值画像"]}),e.jsxs("div",{className:"mb-6 p-4 bg-violet-500/10 border border-violet-500/20 rounded-xl",children:[e.jsx("h4",{className:"text-violet-300 font-bold mb-1",children:d.valueProfile.archetype}),e.jsx("p",{className:"text-slate-400 text-sm",children:d.valueProfile.archetypeDescription})]}),e.jsx("div",{className:"grid sm:grid-cols-2 gap-4",children:d.valueProfile.dominant.map(({dimension:s,score:c})=>e.jsxs("div",{className:"p-4 bg-slate-800/50 rounded-xl",children:[e.jsx("div",{className:"text-white font-medium mb-2 capitalize",children:s}),e.jsx("div",{className:"h-2 bg-slate-700 rounded-full overflow-hidden",children:e.jsx("div",{className:`h-full transition-all duration-1000 rounded-full ${c>0?"bg-gradient-to-r from-emerald-500 to-green-400":"bg-gradient-to-r from-red-500 to-rose-400"}`,style:{width:`${Math.min(Math.abs(c)*25,100)}%`}})}),e.jsxs("div",{className:"text-right text-sm text-slate-400 mt-1",children:[c>0?"+":"",c.toFixed(1)]})]},s))})]}),e.jsxs(y,{className:"mb-8 p-6",children:[e.jsx("h3",{className:"text-xl font-bold text-white mb-6",children:"关键决策回顾"}),e.jsx("div",{className:"space-y-3",children:d.keyDecisions.map((s,c)=>e.jsxs(x.div,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{delay:c*.1},className:"flex items-start gap-4 p-4 bg-slate-800/30 rounded-xl",children:[e.jsx("div",{className:"w-8 h-8 rounded-full bg-violet-500/20 text-violet-400 flex items-center justify-center font-bold flex-shrink-0",children:c+1}),e.jsxs("div",{className:"flex-1",children:[e.jsx("div",{className:"text-white font-medium",children:s.choice}),e.jsx("div",{className:"text-slate-400 text-sm mt-1",children:s.impact}),s.values.length>0&&e.jsx("div",{className:"flex flex-wrap gap-2 mt-2",children:s.values.map(b=>e.jsx("span",{className:"px-2 py-0.5 rounded bg-violet-500/20 text-violet-300 text-xs",children:b},b))})]})]},c))})]}),e.jsxs("div",{className:"flex justify-center gap-4 flex-wrap",children:[e.jsxs(x.button,{whileHover:{scale:1.05},whileTap:{scale:.95},onClick:I,className:"px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl flex items-center gap-2",children:[e.jsx(W,{className:"w-5 h-5"}),"重新开始"]}),e.jsxs(x.button,{whileHover:{scale:1.05},whileTap:{scale:.95},onClick:()=>n("/world/hall"),className:"px-6 py-3 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-xl flex items-center gap-2",children:[e.jsx(Y,{className:"w-5 h-5"}),"返回世界大厅"]})]})]})});const O=k.visitedNodes.length/Object.keys(P.nodes).length*100;return e.jsxs("div",{className:"min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900",children:[e.jsx("div",{className:"sticky top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800",children:e.jsxs("div",{className:"max-w-4xl mx-auto px-6 py-4",children:[e.jsxs("div",{className:"flex items-center justify-between mb-3",children:[e.jsxs("button",{onClick:()=>n("/world/hall"),className:"flex items-center gap-2 text-slate-400 hover:text-white transition-colors",children:[e.jsx(G,{className:"w-5 h-5"}),"返回大厅"]}),e.jsx("h2",{className:"text-white font-bold hidden sm:block",children:P.title}),e.jsx("button",{onClick:()=>L(!N),className:"flex items-center gap-2 text-slate-400 hover:text-violet-400 transition-colors",children:N?e.jsxs(e.Fragment,{children:[e.jsx(B,{className:"w-5 h-5"}),e.jsx("span",{className:"hidden sm:inline",children:"隐藏"})]}):e.jsxs(e.Fragment,{children:[e.jsx(J,{className:"w-5 h-5"}),e.jsx("span",{className:"hidden sm:inline",children:"价值倾向"})]})})]}),e.jsx("div",{className:"h-1.5 bg-slate-800 rounded-full overflow-hidden",children:e.jsx(x.div,{className:"h-full bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500",style:{width:`${Math.min(O,100)}%`},transition:{duration:.5}})})]})}),e.jsx(S,{children:N&&e.jsx(x.div,{initial:{opacity:0,y:-20},animate:{opacity:1,y:0},exit:{opacity:0,y:-20},className:"sticky top-20 z-40 max-w-4xl mx-auto px-6 mb-4",children:e.jsx("div",{className:"bg-slate-800/90 backdrop-blur-xl rounded-xl p-4 border border-slate-700",children:e.jsx("div",{className:"flex flex-wrap gap-3",children:M.map(({dimension:s,score:c})=>e.jsxs("span",{className:`px-3 py-1.5 rounded-lg text-sm font-medium ${c>0?"bg-emerald-500/20 text-emerald-300":"bg-rose-500/20 text-rose-300"}`,children:[s,": ",c>0?"+":"",c.toFixed(1)]},s))})})})}),e.jsxs("div",{className:"max-w-4xl mx-auto px-6 py-8",children:[e.jsx(S,{mode:"wait",children:e.jsxs(x.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},exit:{opacity:0,y:-20},transition:{duration:.4},children:[e.jsxs("div",{className:"mb-6",children:[i.year&&e.jsxs("div",{className:"flex items-center gap-2 text-slate-400 text-sm mb-2",children:[e.jsx(X,{className:"w-4 h-4"}),e.jsx("span",{children:i.year}),i.location&&e.jsxs("span",{children:["· ",i.location]})]}),e.jsx("h1",{className:"text-2xl sm:text-3xl font-bold text-white mb-2",children:i.title}),i.context&&e.jsxs("p",{className:"text-amber-400/80 text-sm",children:["📜 ",i.context]})]}),e.jsx(y,{className:"mb-8 p-6 sm:p-8",children:e.jsx("div",{className:"prose prose-invert max-w-none",children:e.jsx("p",{className:"text-slate-300 text-lg leading-relaxed whitespace-pre-line",children:i.content})})}),i.type==="narrative"&&e.jsx("div",{className:"flex justify-center",children:e.jsxs(x.button,{whileHover:{scale:1.05},whileTap:{scale:.95},onClick:F,disabled:l,className:"px-8 py-4 bg-gradient-to-r from-violet-500 to-purple-500 text-white font-medium rounded-xl flex items-center gap-2 disabled:opacity-50",children:["继续",e.jsx(K,{className:"w-5 h-5"})]})}),i.type==="decision"&&i.options&&e.jsxs("div",{className:"space-y-4",children:[e.jsx("p",{className:"text-center text-slate-400 mb-2",children:"做出你的选择："}),i.options.map((s,c)=>e.jsxs(x.button,{initial:{opacity:0,x:c%2===0?-30:30},animate:{opacity:1,x:0},transition:{delay:c*.1},whileHover:{scale:1.02,x:5},whileTap:{scale:.98},onClick:()=>D(s),disabled:l,className:`w-full text-left p-6 rounded-xl border-2 transition-all duration-200 ${u===s.id?"border-violet-500 bg-violet-500/20":"border-slate-700 bg-slate-800/50 hover:border-violet-500/50 hover:bg-slate-800"} disabled:opacity-50`,children:[e.jsx("div",{className:"font-bold text-white text-lg mb-2",children:s.text}),s.description&&e.jsx("p",{className:"text-slate-400 text-sm mb-3",children:s.description}),s.consequences&&e.jsxs("p",{className:"text-violet-400 text-sm",children:["⚡ ",s.consequences]})]},s.id))]})]},i.id)}),e.jsx("div",{className:"mt-12 text-center text-slate-500 text-sm",children:e.jsxs("p",{children:["已做出 ",k.decisionPath.length," 个决策"]})})]})]})}export{pe as default};

/**
 * ==============================================
 * 🏛️ D.R.E.A.M 官场人格五维测评 - 题目定义文件
 * ==============================================
 * 【测评设计】
 * - 总题数：40题
 * - 维度：5维度 × 8题/维度
 * - 题型：情境选择题，每题选项与具体场景强相关
 * 
 * 【五大维度】【⚠️  与计算器严格对应！】
 * - D: Dominance           支配欲（控制、领导、话语权）
 * - R: Risk Aversion       风险规避（保守、稳妥、不犯错）
 * - E: Emotional Control   情绪控制（城府、隐忍、不动声色）
 * - A: Ambiguity Tolerance 悟性（读懂潜台词、察言观色）
 * - M: Machiavellianism    马基雅维利（权谋、利益、手段）
 * 
 * 【质量标准】
 * ✅ 100%情境化题目，无"完全不符/一般/完全符合"模板
 * ✅ 每个选项都有明确的行为指向，无歧义
 * ✅ 选项之间有争议性，不同人会选不同答案
 * ✅ 没有"政治正确"的标准答案
 */

import type { Assessment } from '../../types'
import { calculateOfficialdom } from '../../data/professional/officialdom/officialdom-calculator'

export const officialdomAssessment: Assessment = {
  id: 'officialdom-dream',
  title: 'D.R.E.A.M 官场人格五维测评',
  description: '基于现代组织行为学的深度人格测评。40道真实职场情境，揭示您在权力结构中的核心特质与生存策略。',
  category: '社会生存',
  difficulty: 'expert',
  duration: 6,
  quality: '入门',
  resultCalculator: calculateOfficialdom,
  questions: [
    { id: 'off-1', type: 'single', text: '部门开会，领导让大家自由发言。你有一个很好的想法，但跟领导刚才说的不太一样。你会？', dimension: 'D', options: [
      { id: '1', text: '领导怎么说就怎么干，没必要唱反调', value: 1 },
      { id: '2', text: '会后私下找领导说说我的想法', value: 2 },
      { id: '3', text: '先肯定领导，再委婉提出我的补充想法', value: 3 },
      { id: '4', text: '直接发言，把我的想法完整说出来', value: 4 },
      { id: '5', text: '不仅要说，还要当场争取让大家支持我的想法', value: 5 },
    ]},
    { id: 'off-2', type: 'single', text: '跟你平级的同事，总想指挥你帮他做事情。你会？', dimension: 'D', options: [
      { id: '1', text: '能帮就帮，大家都是同事', value: 1 },
      { id: '2', text: '心里不爽，但还是会帮忙', value: 2 },
      { id: '3', text: '找借口推脱，说我自己也很忙', value: 3 },
      { id: '4', text: '直接拒绝，这不是我的工作', value: 4 },
      { id: '5', text: '反过来指挥他帮我做事', value: 5 },
    ]},
    { id: 'off-3', type: 'single', text: '团队做决策，大家意见分歧很大，争论了一个小时还没结果。你会？', dimension: 'D', options: [
      { id: '1', text: '听领导的，领导说咋办就咋办', value: 1 },
      { id: '2', text: '哪边人多我支持哪边', value: 2 },
      { id: '3', text: '提议大家投票表决', value: 3 },
      { id: '4', text: '提出一个折中方案，让大家都能接受', value: 4 },
      { id: '5', text: '直接拍板，就按我说的来，出了问题我负责', value: 5 },
    ]},
    { id: 'off-4', type: 'single', text: '新来的领导能力明显不如你，很多决策都很蠢。你会？', dimension: 'D', options: [
      { id: '1', text: '领导说什么我就做什么', value: 1 },
      { id: '2', text: '心里吐槽，但表面服从', value: 2 },
      { id: '3', text: '私下跟同事一起吐槽', value: 3 },
      { id: '4', text: '找合适的机会委婉地提建议', value: 4 },
      { id: '5', text: '按正确的方式做，让领导按照我的思路走', value: 5 },
    ]},
    { id: 'off-5', type: 'single', text: '年底评优，你功劳最大，但领导把名额给了另一个同事。你会？', dimension: 'D', options: [
      { id: '1', text: '算了，下次再说吧', value: 1 },
      { id: '2', text: '心里不舒服，但也只能接受', value: 2 },
      { id: '3', text: '跟关系好的同事抱怨几句', value: 3 },
      { id: '4', text: '找领导单独聊聊，表达我的不满', value: 4 },
      { id: '5', text: '不仅要找领导，还要让大家都知道这不公平', value: 5 },
    ]},
    { id: 'off-6', type: 'single', text: '一群人一起出去吃饭，大家都在纠结吃什么。你会？', dimension: 'D', options: [
      { id: '1', text: '随便，吃什么都行', value: 1 },
      { id: '2', text: '跟着大家的意见走', value: 2 },
      { id: '3', text: '提出几个选项让大家选', value: 3 },
      { id: '4', text: '直接推荐一家我觉得不错的', value: 4 },
      { id: '5', text: '直接定地方，就去这家，别纠结了', value: 5 },
    ]},
    { id: 'off-7', type: 'single', text: '下属工作能力很差，同样的错误犯了三次。你会？', dimension: 'D', options: [
      { id: '1', text: '算了，他已经很努力了', value: 1 },
      { id: '2', text: '耐心再教他一遍', value: 2 },
      { id: '3', text: '严肃地提醒他注意', value: 3 },
      { id: '4', text: '当众批评，让他长记性', value: 4 },
      { id: '5', text: '想办法把他调走或者换掉', value: 5 },
    ]},
    { id: 'off-8', type: 'single', text: '在大领导的会议上，你的部门被点名批评，但这个问题主要是其他部门造成的。你会？', dimension: 'D', options: [
      { id: '1', text: '认错，有则改之无则加勉', value: 1 },
      { id: '2', text: '先认错，会后再说', value: 2 },
      { id: '3', text: '解释一下情况，但不点名', value: 3 },
      { id: '4', text: '当场说明这是哪个部门的问题', value: 4 },
      { id: '5', text: '不仅说明，还要把那个部门的其他问题也抖出来', value: 5 },
    ]},
    { id: 'off-9', type: 'single', text: '领导让你负责一个全新的项目，没有先例，风险很大。你会？', dimension: 'R', options: [
      { id: '1', text: '太好了，这是展现能力的好机会', value: 1 },
      { id: '2', text: '虽然有风险，但还是愿意试试', value: 2 },
      { id: '3', text: '先接下来，做着看', value: 3 },
      { id: '4', text: '建议领导先做个试点，不要全面铺开', value: 4 },
      { id: '5', text: '想办法推掉，这种项目背锅的可能性太大', value: 5 },
    ]},
    { id: 'off-10', type: 'single', text: '一份重要的文件，领导让你先签字，他后签。你会？', dimension: 'R', options: [
      { id: '1', text: '直接签，领导都发话了', value: 1 },
      { id: '2', text: '看完内容就签', value: 2 },
      { id: '3', text: '找同事一起商量一下再签', value: 3 },
      { id: '4', text: '等领导签完我再签', value: 4 },
      { id: '5', text: '不仅不签，还要留下书面证据说明是领导让签的', value: 5 },
    ]},
    { id: 'off-11', type: 'single', text: '单位要搞改革，让大家提意见。你会？', dimension: 'R', options: [
      { id: '1', text: '大胆提，改革就是要破旧立新', value: 1 },
      { id: '2', text: '提一些建设性的意见', value: 2 },
      { id: '3', text: '只提无关痛痒的意见', value: 3 },
      { id: '4', text: '说没意见，完全支持领导', value: 4 },
      { id: '5', text: '不仅不提，还要劝别人也别乱提', value: 5 },
    ]},
    { id: 'off-12', type: 'single', text: '其他部门都在抢一个有油水的项目。你会？', dimension: 'R', options: [
      { id: '1', text: '必须抢下来，这是我们部门的机会', value: 1 },
      { id: '2', text: '积极争取一下', value: 2 },
      { id: '3', text: '看情况再说', value: 3 },
      { id: '4', text: '不抢，好处多的地方风险也大', value: 4 },
      { id: '5', text: '不仅不抢，还要离得远远的', value: 5 },
    ]},
    { id: 'off-13', type: 'single', text: '快下班了，领导突然发了一个紧急工作通知在群里，@了所有人。你会？', dimension: 'R', options: [
      { id: '1', text: '立刻回复收到，马上开始做', value: 1 },
      { id: '2', text: '回复收到，明天再说', value: 2 },
      { id: '3', text: '等别人先回复我再回复', value: 3 },
      { id: '4', text: '假装没看到，明天再说', value: 4 },
      { id: '5', text: '不仅不回复，还要关机，就说没看到', value: 5 },
    ]},
    { id: 'off-14', type: 'single', text: '同事让你在一份你没参与的材料上签字证明。你会？', dimension: 'R', options: [
      { id: '1', text: '都是同事，签就签了', value: 1 },
      { id: '2', text: '相信他，签字', value: 2 },
      { id: '3', text: '大概看看内容就签', value: 3 },
      { id: '4', text: '抱歉，这个字我不能签', value: 4 },
      { id: '5', text: '不仅不签，还要跟他说以后这种事别找我', value: 5 },
    ]},
    { id: 'off-15', type: 'single', text: '大领导下来调研，让大家畅所欲言，说"说错了也没关系"。你会？', dimension: 'R', options: [
      { id: '1', text: '有什么说什么，实事求是', value: 1 },
      { id: '2', text: '主要说成绩，稍微提一点问题', value: 2 },
      { id: '3', text: '只说好话，领导爱听什么说什么', value: 3 },
      { id: '4', text: '让别人先说，我顺着说', value: 4 },
      { id: '5', text: '闭口不言，让别人去说', value: 5 },
    ]},
    { id: 'off-16', type: 'single', text: '你发现了一个明显的制度漏洞。你会？', dimension: 'R', options: [
      { id: '1', text: '立刻向领导汇报，建议整改', value: 1 },
      { id: '2', text: '在合适的场合提出来', value: 2 },
      { id: '3', text: '跟关系好的同事说说', value: 3 },
      { id: '4', text: '我知道就行，不说', value: 4 },
      { id: '5', text: '不仅不说，还要偷偷利用这个漏洞', value: 5 },
    ]},
    { id: 'off-17', type: 'single', text: '开会的时候，有人当众冤枉你，把他的锅甩给你。你会？', dimension: 'E', options: [
      { id: '1', text: '当场拍桌子，跟他吵起来', value: 1 },
      { id: '2', text: '立刻反驳，说这不是我的责任', value: 2 },
      { id: '3', text: '脸色很难看，但还是忍住了', value: 3 },
      { id: '4', text: '面无表情，等他说完再解释', value: 4 },
      { id: '5', text: '微笑着听完，然后轻轻一句话就让他打脸', value: 5 },
    ]},
    { id: 'off-18', type: 'single', text: '你非常讨厌的一个同事，反而升职了，成了你的顶头上司。你会？', dimension: 'E', options: [
      { id: '1', text: '立刻提交辞职信，老子不伺候了', value: 1 },
      { id: '2', text: '公开表达不满，处处跟他作对', value: 2 },
      { id: '3', text: '心里恨死了，但表面该咋样咋样', value: 3 },
      { id: '4', text: '主动过去祝贺，表示以后好好配合', value: 4 },
      { id: '5', text: '不仅祝贺，还要真心实意地辅佐他', value: 5 },
    ]},
    { id: 'off-19', type: 'single', text: '你前一天晚上跟老婆/老公吵架了，心情极差。第二天上班你会？', dimension: 'E', options: [
      { id: '1', text: '把情绪带到工作中，见谁都没好脸色', value: 1 },
      { id: '2', text: '脸色很难看，大家都能看出来我心情不好', value: 2 },
      { id: '3', text: '尽量克制，但偶尔还是会发作', value: 3 },
      { id: '4', text: '没人能看出来我心情不好', value: 4 },
      { id: '5', text: '不仅没人看出来，我还能跟大家开玩笑', value: 5 },
    ]},
    { id: 'off-20', type: 'single', text: '你做了一件特别漂亮的事，大领导在全公司大会上表扬了你。你会？', dimension: 'E', options: [
      { id: '1', text: '得意洋洋，恨不得让所有人都知道', value: 1 },
      { id: '2', text: '脸上掩饰不住的开心', value: 2 },
      { id: '3', text: '微笑着说谢谢领导', value: 3 },
      { id: '4', text: '谦虚地说这是大家的功劳', value: 4 },
      { id: '5', text: '把功劳全给领导和团队，自己一点都不留', value: 5 },
    ]},
    { id: 'off-21', type: 'single', text: '开会的时候，领导讲了一个非常冷的笑话。你会？', dimension: 'E', options: [
      { id: '1', text: '面无表情，一点都不笑', value: 1 },
      { id: '2', text: '尴尬地假笑一下', value: 2 },
      { id: '3', text: '配合地笑一笑', value: 3 },
      { id: '4', text: '哈哈大笑，真的很好笑', value: 4 },
      { id: '5', text: '不仅大笑，还要接住梗讲一个更好笑的', value: 5 },
    ]},
    { id: 'off-22', type: 'single', text: '下属犯了一个低级错误，给你造成了很大的麻烦。你会？', dimension: 'E', options: [
      { id: '1', text: '破口大骂，让他滚蛋', value: 1 },
      { id: '2', text: '严厉批评，罚他加班', value: 2 },
      { id: '3', text: '严肃批评，但还是给他一次机会', value: 3 },
      { id: '4', text: '不发脾气，跟他一起解决问题', value: 4 },
      { id: '5', text: '不仅不生气，还要安慰他，说犯错是好事', value: 5 },
    ]},
    { id: 'off-23', type: 'single', text: '在酒桌上，有人故意刁难你，让你喝你喝不了的酒。你会？', dimension: 'E', options: [
      { id: '1', text: '直接翻脸，说我不喝', value: 1 },
      { id: '2', text: '很为难，但还是硬着头皮喝了', value: 2 },
      { id: '3', text: '找个理由推掉', value: 3 },
      { id: '4', text: '喝一半，表示诚意但实在喝不了', value: 4 },
      { id: '5', text: '几句话就让对方心甘情愿地替你喝了', value: 5 },
    ]},
    { id: 'off-24', type: 'single', text: '你知道同事在背后说你坏话。你会？', dimension: 'E', options: [
      { id: '1', text: '找他当面对质，撕破脸', value: 1 },
      { id: '2', text: '也在背后说他坏话', value: 2 },
      { id: '3', text: '心里记恨，但表面不说', value: 3 },
      { id: '4', text: '假装不知道，正常相处', value: 4 },
      { id: '5', text: '不仅假装不知道，还要对他更好', value: 5 },
    ]},
    { id: 'off-25', type: 'single', text: '领导在群里发了一条消息："大家最近辛苦了"。下面没人回复。你会？', dimension: 'A', options: [
      { id: '1', text: '不回复，跟大家保持一致', value: 1 },
      { id: '2', text: '等别人回复了我再回复', value: 2 },
      { id: '3', text: '回复一个"👍"表情包', value: 3 },
      { id: '4', text: '回复："不辛苦，为了项目！"', value: 4 },
      { id: '5', text: '立刻私信领导："领导您才是真的辛苦，要注意身体啊"', value: 5 },
    ]},
    { id: 'off-26', type: 'single', text: '你跟领导汇报工作，他听完说"知道了"。这是什么意思？', dimension: 'A', options: [
      { id: '1', text: '就是知道了，没有别的意思', value: 1 },
      { id: '2', text: '他对这个结果还算满意', value: 2 },
      { id: '3', text: '他不太满意，但不想多说', value: 3 },
      { id: '4', text: '他希望我不要再继续说了', value: 4 },
      { id: '5', text: '他在等我主动说下一步计划', value: 5 },
    ]},
    { id: 'off-27', type: 'single', text: '开会时，领导突然问你："你对小王这个方案怎么看？"小王是他的亲信。你会？', dimension: 'A', options: [
      { id: '1', text: '实话实说，有一说一', value: 1 },
      { id: '2', text: '主要说优点，缺点一笔带过', value: 2 },
      { id: '3', text: '全是优点，一点缺点都不说', value: 3 },
      { id: '4', text: '先夸方案，然后说"如果再xx就更完美了"', value: 4 },
      { id: '5', text: '不仅夸方案，还要夸小王这个人', value: 5 },
    ]},
    { id: 'off-28', type: 'single', text: '领导跟你说："这件事原则上同意"。你应该理解为？', dimension: 'A', options: [
      { id: '1', text: '可以做了', value: 1 },
      { id: '2', text: '基本可以做', value: 2 },
      { id: '3', text: '还要再请示一下', value: 3 },
      { id: '4', text: '现在还不行，再等等', value: 4 },
      { id: '5', text: '绝对不行，但我不想直接说不行', value: 5 },
    ]},
    { id: 'off-29', type: 'single', text: '两个领导吵架，都来找你评理。你会？', dimension: 'A', options: [
      { id: '1', text: '说实话，谁对我就支持谁', value: 1 },
      { id: '2', text: '各打五十大板', value: 2 },
      { id: '3', text: '说我级别不够，不敢评理', value: 3 },
      { id: '4', text: '分别说对方的好话，让他们都开心', value: 4 },
      { id: '5', text: '把矛盾引向别的地方，让他们一致对外', value: 5 },
    ]},
    { id: 'off-30', type: 'single', text: '领导带你去应酬，席间有人说"你们单位那个某某某真是个废物"。那个人你还挺熟的。你会？', dimension: 'A', options: [
      { id: '1', text: '为朋友辩护，说他其实很厉害', value: 1 },
      { id: '2', text: '不说话，假装没听见', value: 2 },
      { id: '3', text: '跟着笑笑，不表态', value: 3 },
      { id: '4', text: '说"我跟他不熟，不太了解"', value: 4 },
      { id: '5', text: '跟着一起骂，骂得比他还凶', value: 5 },
    ]},
    { id: 'off-31', type: 'single', text: '你去找领导签字，他看都没看就签了。这说明什么？', dimension: 'A', options: [
      { id: '1', text: '领导信任我', value: 1 },
      { id: '2', text: '领导很忙', value: 2 },
      { id: '3', text: '这份文件不重要', value: 3 },
      { id: '4', text: '领导不想为这份文件负责', value: 4 },
      { id: '5', text: '出了问题就是我的锅', value: 5 },
    ]},
    { id: 'off-32', type: 'single', text: '平时跟你关系很一般的同事，突然对你特别热情。你会？', dimension: 'A', options: [
      { id: '1', text: '他人真好，之前是我误会了', value: 1 },
      { id: '2', text: '挺开心的，多个朋友挺好', value: 2 },
      { id: '3', text: '可能他有什么事需要我帮忙', value: 3 },
      { id: '4', text: '热情归热情，但我要提高警惕', value: 4 },
      { id: '5', text: '不仅警惕，还要反过来套他的话，看看他到底想干嘛', value: 5 },
    ]},
    { id: 'off-33', type: 'single', text: '一个跟你关系很好的同事犯了一个严重的错误，只有你知道。你会？', dimension: 'M', options: [
      { id: '1', text: '帮他隐瞒，我们是朋友', value: 1 },
      { id: '2', text: '劝他主动承认错误', value: 2 },
      { id: '3', text: '假装不知道', value: 3 },
      { id: '4', text: '匿名举报', value: 4 },
      { id: '5', text: '不仅举报，还要把自己摘干净', value: 5 },
    ]},
    { id: 'off-34', type: 'single', text: '两个候选人竞争一个岗位，你手里有一票。A能力强，B是领导的亲戚。你会？', dimension: 'M', options: [
      { id: '1', text: '投给A，任人唯贤', value: 1 },
      { id: '2', text: '犹豫很久，最后还是投给A', value: 2 },
      { id: '3', text: '投给B，没办法', value: 3 },
      { id: '4', text: '投给B，顺便让领导知道是我投的', value: 4 },
      { id: '5', text: '投给B，还要当着A的面说我投的是你', value: 5 },
    ]},
    { id: 'off-35', type: 'single', text: '部门取得了一个很大的成绩，主要功劳是你的。开总结会时领导绝口不提你，全说是他自己的功劳。你会？', dimension: 'M', options: [
      { id: '1', text: '当场打断，说清楚功劳是谁的', value: 1 },
      { id: '2', text: '会后找领导理论', value: 2 },
      { id: '3', text: '跟同事抱怨几句', value: 3 },
      { id: '4', text: '算了，领导心里有数就行', value: 4 },
      { id: '5', text: '不仅不生气，还要上去祝贺领导，夸他领导有方', value: 5 },
    ]},
    { id: 'off-36', type: 'single', text: '你发现一个同事在偷偷做损害公司利益的事情。你会？', dimension: 'M', options: [
      { id: '1', text: '立刻揭发，这是原则问题', value: 1 },
      { id: '2', text: '委婉地提醒他', value: 2 },
      { id: '3', text: '假装没看见', value: 3 },
      { id: '4', text: '抓住他的把柄，让他听我的', value: 4 },
      { id: '5', text: '不仅不揭发，还要加入进去分一杯羹', value: 5 },
    ]},
    { id: 'off-37', type: 'single', text: '单位要提拔一个人，你和另一个同事是最有力的竞争者。你会？', dimension: 'M', options: [
      { id: '1', text: '公平竞争，各凭本事', value: 1 },
      { id: '2', text: '好好表现，争取让领导选我', value: 2 },
      { id: '3', text: '多跟领导走动走动', value: 3 },
      { id: '4', text: '有意无意地跟领导说说对手的缺点', value: 4 },
      { id: '5', text: '设个局，让对手犯个严重错误', value: 5 },
    ]},
    { id: 'off-38', type: 'single', text: '大领导的秘书私下跟你要一份保密的材料。你会？', dimension: 'M', options: [
      { id: '1', text: '直接拒绝，这是保密材料', value: 1 },
      { id: '2', text: '很为难，但还是不给', value: 2 },
      { id: '3', text: '先给领导打电话请示一下', value: 3 },
      { id: '4', text: '给，但要让他留下书面证据', value: 4 },
      { id: '5', text: '偷偷给，就当什么都没发生过', value: 5 },
    ]},
    { id: 'off-39', type: 'single', text: '你的下属能力很强，野心很大，已经威胁到你的位置了。你会？', dimension: 'M', options: [
      { id: '1', text: '好好培养，长江后浪推前浪', value: 1 },
      { id: '2', text: '继续重用，但保持警惕', value: 2 },
      { id: '3', text: '把一些不重要的工作给他', value: 3 },
      { id: '4', text: '想办法把他调到别的部门去', value: 4 },
      { id: '5', text: '给他挖个坑，让他犯个大错走人', value: 5 },
    ]},
    { id: 'off-40', type: 'single', text: '你的直接领导和大领导之间有很深的矛盾。你会？', dimension: 'M', options: [
      { id: '1', text: '站在直接领导这边，他是我的顶头上司', value: 1 },
      { id: '2', text: '站在大领导这边，他的官更大', value: 2 },
      { id: '3', text: '保持中立，谁都不得罪', value: 3 },
      { id: '4', text: '两边都讨好，两边都押注', value: 4 },
      { id: '5', text: '假装站在直接领导这边，实际偷偷给大领导递情报', value: 5 },
    ]},
  ],
}

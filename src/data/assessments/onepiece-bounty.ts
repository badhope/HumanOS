import type { Assessment } from '../../types'
import { calculateBounty } from '../../utils/calculators/berry-calculator'

export const bountyAssessment: Assessment = {
  id: 'onepiece-bounty',
  title: '🏴‍☠️ 海贼王赏金测评',
  description: '基于战力、势力、威胁度、名声、潜力五大维度，参考海军本部悬赏标准，精确计算你在海贼王世界的悬赏金额。SSS级四皇？还是D级打杂？50道沉浸式情境题，深度还原伟大航路冒险体验！',
  category: '娱乐趣味',
  subcategory: '动漫同人',
  difficulty: 'lite',
  duration: 7,
  quality: '娱乐',
  resultCalculator: calculateBounty,
  questions: [
    { id: 'berry-1', type: 'likert-5', dimension: 'combatPower', text: '一对一战斗，我能正面打赢海军本部少将', options: [{ id: '1', text: '完全不可能', value: 1 }, { id: '2', text: '不太可能', value: 2 }, { id: '3', text: '说不定', value: 3 }, { id: '4', text: '应该可以', value: 4 }, { id: '5', text: '绝对没问题', value: 5 }] },
    { id: 'berry-2', type: 'likert-5', dimension: 'influence', text: '我可以轻易召集1000人以上的追随者', options: [{ id: '1', text: '完全不可能', value: 1 }, { id: '2', text: '不太可能', value: 2 }, { id: '3', text: '说不定', value: 3 }, { id: '4', text: '应该可以', value: 4 }, { id: '5', text: '绝对没问题', value: 5 }] },
    { id: 'berry-3', type: 'likert-5', dimension: 'threatLevel', text: '五老星会把我列入需要特别关注的名单', options: [{ id: '1', text: '完全不可能', value: 1 }, { id: '2', text: '不太可能', value: 2 }, { id: '3', text: '说不定', value: 3 }, { id: '4', text: '应该可以', value: 4 }, { id: '5', text: '绝对没问题', value: 5 }] },
    { id: 'berry-4', type: 'likert-5', dimension: 'notoriety', text: '我的名字在伟大航路后半段无人不知', options: [{ id: '1', text: '完全不可能', value: 1 }, { id: '2', text: '不太可能', value: 2 }, { id: '3', text: '说不定', value: 3 }, { id: '4', text: '应该可以', value: 4 }, { id: '5', text: '绝对没问题', value: 5 }] },
    { id: 'berry-5', type: 'likert-5', dimension: 'potential', text: '我相信自己未来能达到四皇级别', options: [{ id: '1', text: '完全不可能', value: 1 }, { id: '2', text: '不太可能', value: 2 }, { id: '3', text: '说不定', value: 3 }, { id: '4', text: '应该可以', value: 4 }, { id: '5', text: '绝对没问题', value: 5 }] },
    { id: 'berry-6', type: 'likert-5', dimension: 'combatPower', text: '我至少掌握了两种以上的霸气', options: [{ id: '1', text: '完全不可能', value: 1 }, { id: '2', text: '不太可能', value: 2 }, { id: '3', text: '说不定', value: 3 }, { id: '4', text: '应该可以', value: 4 }, { id: '5', text: '绝对没问题', value: 5 }] },
    { id: 'berry-7', type: 'likert-5', dimension: 'influence', text: '至少有一个国家愿意与我结盟', options: [{ id: '1', text: '完全不可能', value: 1 }, { id: '2', text: '不太可能', value: 2 }, { id: '3', text: '说不定', value: 3 }, { id: '4', text: '应该可以', value: 4 }, { id: '5', text: '绝对没问题', value: 5 }] },
    { id: 'berry-8', type: 'likert-5', dimension: 'threatLevel', text: '我知道关于空白100年的某些真相', options: [{ id: '1', text: '完全不可能', value: 1 }, { id: '2', text: '不太可能', value: 2 }, { id: '3', text: '说不定', value: 3 }, { id: '4', text: '应该可以', value: 4 }, { id: '5', text: '绝对没问题', value: 5 }] },
    { id: 'berry-9', type: 'likert-5', dimension: 'notoriety', text: '报纸经常报道我的事迹', options: [{ id: '1', text: '完全不可能', value: 1 }, { id: '2', text: '不太可能', value: 2 }, { id: '3', text: '说不定', value: 3 }, { id: '4', text: '应该可以', value: 4 }, { id: '5', text: '绝对没问题', value: 5 }] },
    { id: 'berry-10', type: 'likert-5', dimension: 'potential', text: '我的成长速度超出所有人预期', options: [{ id: '1', text: '完全不可能', value: 1 }, { id: '2', text: '不太可能', value: 2 }, { id: '3', text: '说不定', value: 3 }, { id: '4', text: '应该可以', value: 4 }, { id: '5', text: '绝对没问题', value: 5 }] },
    { id: 'berry-11', type: 'likert-5', dimension: 'combatPower', text: '挨了一发冥王炮我还能站着', options: [{ id: '1', text: '完全不可能', value: 1 }, { id: '2', text: '不太可能', value: 2 }, { id: '3', text: '说不定', value: 3 }, { id: '4', text: '应该可以', value: 4 }, { id: '5', text: '绝对没问题', value: 5 }] },
    { id: 'berry-12', type: 'likert-5', dimension: 'influence', text: '我的手下中至少有能单挑中将的干部', options: [{ id: '1', text: '完全不可能', value: 1 }, { id: '2', text: '不太可能', value: 2 }, { id: '3', text: '说不定', value: 3 }, { id: '4', text: '应该可以', value: 4 }, { id: '5', text: '绝对没问题', value: 5 }] },
    { id: 'berry-13', type: 'likert-5', dimension: 'threatLevel', text: '我有能力颠覆一个加盟国的政权', options: [{ id: '1', text: '完全不可能', value: 1 }, { id: '2', text: '不太可能', value: 2 }, { id: '3', text: '说不定', value: 3 }, { id: '4', text: '应该可以', value: 4 }, { id: '5', text: '绝对没问题', value: 5 }] },
    { id: 'berry-14', type: 'likert-5', dimension: 'notoriety', text: '很多海贼以我的名字作为悬赏目标', options: [{ id: '1', text: '完全不可能', value: 1 }, { id: '2', text: '不太可能', value: 2 }, { id: '3', text: '说不定', value: 3 }, { id: '4', text: '应该可以', value: 4 }, { id: '5', text: '绝对没问题', value: 5 }] },
    { id: 'berry-15', type: 'likert-5', dimension: 'potential', text: '我拥有D之一族的意志', options: [{ id: '1', text: '完全不可能', value: 1 }, { id: '2', text: '不太可能', value: 2 }, { id: '3', text: '说不定', value: 3 }, { id: '4', text: '应该可以', value: 4 }, { id: '5', text: '绝对没问题', value: 5 }] },
    { id: 'berry-16', type: 'likert-5', dimension: 'combatPower', text: '我可以与王下七武海正面抗衡', options: [{ id: '1', text: '完全不可能', value: 1 }, { id: '2', text: '不太可能', value: 2 }, { id: '3', text: '说不定', value: 3 }, { id: '4', text: '应该可以', value: 4 }, { id: '5', text: '绝对没问题', value: 5 }] },
    { id: 'berry-17', type: 'likert-5', dimension: 'influence', text: '我拥有自己的领土和舰队', options: [{ id: '1', text: '完全不可能', value: 1 }, { id: '2', text: '不太可能', value: 2 }, { id: '3', text: '说不定', value: 3 }, { id: '4', text: '应该可以', value: 4 }, { id: '5', text: '绝对没问题', value: 5 }] },
    { id: 'berry-18', type: 'likert-5', dimension: 'threatLevel', text: '海军需要出动大将级才能对付我', options: [{ id: '1', text: '完全不可能', value: 1 }, { id: '2', text: '不太可能', value: 2 }, { id: '3', text: '说不定', value: 3 }, { id: '4', text: '应该可以', value: 4 }, { id: '5', text: '绝对没问题', value: 5 }] },
    { id: 'berry-19', type: 'likert-5', dimension: 'notoriety', text: '我的海贼团在超新星中名列前茅', options: [{ id: '1', text: '完全不可能', value: 1 }, { id: '2', text: '不太可能', value: 2 }, { id: '3', text: '说不定', value: 3 }, { id: '4', text: '应该可以', value: 4 }, { id: '5', text: '绝对没问题', value: 5 }] },
    { id: 'berry-20', type: 'likert-5', dimension: 'potential', text: '我的果实能力还有巨大的觉醒空间', options: [{ id: '1', text: '完全不可能', value: 1 }, { id: '2', text: '不太可能', value: 2 }, { id: '3', text: '说不定', value: 3 }, { id: '4', text: '应该可以', value: 4 }, { id: '5', text: '绝对没问题', value: 5 }] },
    { id: 'berry-21', type: 'likert-5', dimension: 'combatPower', text: '我有霸王色霸气的资质', options: [{ id: '1', text: '完全不可能', value: 1 }, { id: '2', text: '不太可能', value: 2 }, { id: '3', text: '说不定', value: 3 }, { id: '4', text: '应该可以', value: 4 }, { id: '5', text: '绝对没问题', value: 5 }] },
    { id: 'berry-22', type: 'likert-5', dimension: 'influence', text: '多个地下势力都要给我面子', options: [{ id: '1', text: '完全不可能', value: 1 }, { id: '2', text: '不太可能', value: 2 }, { id: '3', text: '说不定', value: 3 }, { id: '4', text: '应该可以', value: 4 }, { id: '5', text: '绝对没问题', value: 5 }] },
    { id: 'berry-23', type: 'likert-5', dimension: 'threatLevel', text: '我在革命军也有相当的影响力', options: [{ id: '1', text: '完全不可能', value: 1 }, { id: '2', text: '不太可能', value: 2 }, { id: '3', text: '说不定', value: 3 }, { id: '4', text: '应该可以', value: 4 }, { id: '5', text: '绝对没问题', value: 5 }] },
    { id: 'berry-24', type: 'likert-5', dimension: 'notoriety', text: '小孩子听到我的名字都会停止哭泣', options: [{ id: '1', text: '完全不可能', value: 1 }, { id: '2', text: '不太可能', value: 2 }, { id: '3', text: '说不定', value: 3 }, { id: '4', text: '应该可以', value: 4 }, { id: '5', text: '绝对没问题', value: 5 }] },
    { id: 'berry-25', type: 'likert-5', dimension: 'potential', text: '我是被尼卡选中的人', options: [{ id: '1', text: '完全不可能', value: 1 }, { id: '2', text: '不太可能', value: 2 }, { id: '3', text: '说不定', value: 3 }, { id: '4', text: '应该可以', value: 4 }, { id: '5', text: '绝对没问题', value: 5 }] },
    { id: 'berry-26', type: 'likert-5', dimension: 'combatPower', text: '我硬抗过海军大将的全力一击', options: [{ id: '1', text: '完全不可能', value: 1 }, { id: '2', text: '不太可能', value: 2 }, { id: '3', text: '说不定', value: 3 }, { id: '4', text: '应该可以', value: 4 }, { id: '5', text: '绝对没问题', value: 5 }] },
    { id: 'berry-27', type: 'likert-5', dimension: 'influence', text: '鱼人族、巨人族等都愿意与我合作', options: [{ id: '1', text: '完全不可能', value: 1 }, { id: '2', text: '不太可能', value: 2 }, { id: '3', text: '说不定', value: 3 }, { id: '4', text: '应该可以', value: 4 }, { id: '5', text: '绝对没问题', value: 5 }] },
    { id: 'berry-28', type: 'likert-5', dimension: 'threatLevel', text: '我有能力发动古代兵器', options: [{ id: '1', text: '完全不可能', value: 1 }, { id: '2', text: '不太可能', value: 2 }, { id: '3', text: '说不定', value: 3 }, { id: '4', text: '应该可以', value: 4 }, { id: '5', text: '绝对没问题', value: 5 }] },
    { id: 'berry-29', type: 'likert-5', dimension: 'notoriety', text: '我的悬赏令贴满了罗格镇的每一面墙', options: [{ id: '1', text: '完全不可能', value: 1 }, { id: '2', text: '不太可能', value: 2 }, { id: '3', text: '说不定', value: 3 }, { id: '4', text: '应该可以', value: 4 }, { id: '5', text: '绝对没问题', value: 5 }] },
    { id: 'berry-30', type: 'likert-5', dimension: 'potential', text: '我必将成为海贼王', options: [{ id: '1', text: '完全不可能', value: 1 }, { id: '2', text: '不太可能', value: 2 }, { id: '3', text: '说不定', value: 3 }, { id: '4', text: '应该可以', value: 4 }, { id: '5', text: '绝对没问题', value: 5 }] },
    { id: 'berry-31', type: 'likert-5', dimension: 'combatPower', text: '我曾在单挑中击败过悬赏5亿以上的海贼', options: [{ id: '1', text: '完全不可能', value: 1 }, { id: '2', text: '不太可能', value: 2 }, { id: '3', text: '说不定', value: 3 }, { id: '4', text: '应该可以', value: 4 }, { id: '5', text: '绝对没问题', value: 5 }] },
    { id: 'berry-32', type: 'likert-5', dimension: 'influence', text: '我是地下世界的皇帝之一', options: [{ id: '1', text: '完全不可能', value: 1 }, { id: '2', text: '不太可能', value: 2 }, { id: '3', text: '说不定', value: 3 }, { id: '4', text: '应该可以', value: 4 }, { id: '5', text: '绝对没问题', value: 5 }] },
    { id: 'berry-33', type: 'likert-5', dimension: 'threatLevel', text: '世界政府抹除了我的存在记录', options: [{ id: '1', text: '完全不可能', value: 1 }, { id: '2', text: '不太可能', value: 2 }, { id: '3', text: '说不定', value: 3 }, { id: '4', text: '应该可以', value: 4 }, { id: '5', text: '绝对没问题', value: 5 }] },
    { id: 'berry-34', type: 'likert-5', dimension: 'notoriety', text: '我的绰号在四海闻风丧胆', options: [{ id: '1', text: '完全不可能', value: 1 }, { id: '2', text: '不太可能', value: 2 }, { id: '3', text: '说不定', value: 3 }, { id: '4', text: '应该可以', value: 4 }, { id: '5', text: '绝对没问题', value: 5 }] },
    { id: 'berry-35', type: 'likert-5', dimension: 'potential', text: '乔伊波伊的意志在我身上显现', options: [{ id: '1', text: '完全不可能', value: 1 }, { id: '2', text: '不太可能', value: 2 }, { id: '3', text: '说不定', value: 3 }, { id: '4', text: '应该可以', value: 4 }, { id: '5', text: '绝对没问题', value: 5 }] },
    { id: 'berry-36', type: 'likert-5', dimension: 'combatPower', text: '我在四皇团中能排进前三战力', options: [{ id: '1', text: '完全不可能', value: 1 }, { id: '2', text: '不太可能', value: 2 }, { id: '3', text: '说不定', value: 3 }, { id: '4', text: '应该可以', value: 4 }, { id: '5', text: '绝对没问题', value: 5 }] },
    { id: 'berry-37', type: 'likert-5', dimension: 'influence', text: '我可以发动世界级的战争', options: [{ id: '1', text: '完全不可能', value: 1 }, { id: '2', text: '不太可能', value: 2 }, { id: '3', text: '说不定', value: 3 }, { id: '4', text: '应该可以', value: 4 }, { id: '5', text: '绝对没问题', value: 5 }] },
    { id: 'berry-38', type: 'likert-5', dimension: 'threatLevel', text: '我的存在本身就是对世界政府的挑战', options: [{ id: '1', text: '完全不可能', value: 1 }, { id: '2', text: '不太可能', value: 2 }, { id: '3', text: '说不定', value: 3 }, { id: '4', text: '应该可以', value: 4 }, { id: '5', text: '绝对没问题', value: 5 }] },
    { id: 'berry-39', type: 'likert-5', dimension: 'notoriety', text: '每一个新生海贼都听过我的传说', options: [{ id: '1', text: '完全不可能', value: 1 }, { id: '2', text: '不太可能', value: 2 }, { id: '3', text: '说不定', value: 3 }, { id: '4', text: '应该可以', value: 4 }, { id: '5', text: '绝对没问题', value: 5 }] },
    { id: 'berry-40', type: 'likert-5', dimension: 'potential', text: '我将开启大海贼时代的新篇章', options: [{ id: '1', text: '完全不可能', value: 1 }, { id: '2', text: '不太可能', value: 2 }, { id: '3', text: '说不定', value: 3 }, { id: '4', text: '应该可以', value: 4 }, { id: '5', text: '绝对没问题', value: 5 }] },
    { id: 'berry-41', type: 'likert-5', dimension: 'combatPower', text: '我能在大将的追击下全身而退', options: [{ id: '1', text: '完全不可能', value: 1 }, { id: '2', text: '不太可能', value: 2 }, { id: '3', text: '说不定', value: 3 }, { id: '4', text: '应该可以', value: 4 }, { id: '5', text: '绝对没问题', value: 5 }] },
    { id: 'berry-42', type: 'likert-5', dimension: 'combatPower', text: '霸王色霸气是我的标配技能', options: [{ id: '1', text: '完全不可能', value: 1 }, { id: '2', text: '不太可能', value: 2 }, { id: '3', text: '说不定', value: 3 }, { id: '4', text: '应该可以', value: 4 }, { id: '5', text: '绝对没问题', value: 5 }] },
    { id: 'berry-43', type: 'likert-5', dimension: 'influence', text: '至少有三位七武海愿意与我结盟', options: [{ id: '1', text: '完全不可能', value: 1 }, { id: '2', text: '不太可能', value: 2 }, { id: '3', text: '说不定', value: 3 }, { id: '4', text: '应该可以', value: 4 }, { id: '5', text: '绝对没问题', value: 5 }] },
    { id: 'berry-44', type: 'likert-5', dimension: 'influence', text: '我的部下人数超过一万人', options: [{ id: '1', text: '完全不可能', value: 1 }, { id: '2', text: '不太可能', value: 2 }, { id: '3', text: '说不定', value: 3 }, { id: '4', text: '应该可以', value: 4 }, { id: '5', text: '绝对没问题', value: 5 }] },
    { id: 'berry-45', type: 'likert-5', dimension: 'threatLevel', text: '我摧毁过至少一个海军支部', options: [{ id: '1', text: '完全不可能', value: 1 }, { id: '2', text: '不太可能', value: 2 }, { id: '3', text: '说不定', value: 3 }, { id: '4', text: '应该可以', value: 4 }, { id: '5', text: '绝对没问题', value: 5 }] },
    { id: 'berry-46', type: 'likert-5', dimension: 'threatLevel', text: '我从推进城LEVEL6成功越狱', options: [{ id: '1', text: '完全不可能', value: 1 }, { id: '2', text: '不太可能', value: 2 }, { id: '3', text: '说不定', value: 3 }, { id: '4', text: '应该可以', value: 4 }, { id: '5', text: '绝对没问题', value: 5 }] },
    { id: 'berry-47', type: 'likert-5', dimension: 'notoriety', text: '海军高层开会时重点讨论我', options: [{ id: '1', text: '完全不可能', value: 1 }, { id: '2', text: '不太可能', value: 2 }, { id: '3', text: '说不定', value: 3 }, { id: '4', text: '应该可以', value: 4 }, { id: '5', text: '绝对没问题', value: 5 }] },
    { id: 'berry-48', type: 'likert-5', dimension: 'notoriety', text: '平民听到我的名字就会哭泣', options: [{ id: '1', text: '完全不可能', value: 1 }, { id: '2', text: '不太可能', value: 2 }, { id: '3', text: '说不定', value: 3 }, { id: '4', text: '应该可以', value: 4 }, { id: '5', text: '绝对没问题', value: 5 }] },
    { id: 'berry-49', type: 'likert-5', dimension: 'potential', text: 'D之一族的血脉在我体内流淌', options: [{ id: '1', text: '完全不可能', value: 1 }, { id: '2', text: '不太可能', value: 2 }, { id: '3', text: '说不定', value: 3 }, { id: '4', text: '应该可以', value: 4 }, { id: '5', text: '绝对没问题', value: 5 }] },
    { id: 'berry-50', type: 'likert-5', dimension: 'potential', text: '我就是那个被选中的乔伊波伊', options: [{ id: '1', text: '完全不可能', value: 1 }, { id: '2', text: '不太可能', value: 2 }, { id: '3', text: '说不定', value: 3 }, { id: '4', text: '应该可以', value: 4 }, { id: '5', text: '绝对没问题', value: 5 }] },
  ],

  resultInterpretation: {
    templateType: 'enhanced',
    sections: [
      {
        id: 'cover',
        title: '🏴‍☠️ 海军本部悬赏令',
        type: 'cover-card',
        content: `
          <div className="relative overflow-hidden rounded-2xl p-8 bg-gradient-to-br from-amber-950 via-orange-900 to-yellow-800">
            <div className="absolute top-0 right-0 w-48 h-48 bg-yellow-400/10 rounded-full -translate-y-24 translate-x-24 blur-2xl" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-red-500/15 rounded-full translate-y-20 -translate-x-20 blur-xl" />
            
            <div className="relative z-10 text-center">
              <div className="absolute inset-0 border-4 border-amber-400/30 rounded-2xl pointer-events-none" />
              <div className="text-6xl mb-4">☠️</div>
              <h2 className="text-4xl font-black text-amber-100 mb-2">\${result.rank || 'D级海贼'}</h2>
              <p className="text-amber-200/80 text-lg mb-4">\${result.title || '东海新人'}</p>
              
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-900/80 to-amber-800/80 backdrop-blur rounded-full px-8 py-4 border-2 border-amber-400/50">
                <span className="text-amber-200">悬赏金额</span>
                <span className="text-4xl font-black text-yellow-200">\${result.bounty || 5000000}</span>
                <span className="text-amber-200">贝利</span>
              </div>
              
              <p className="text-amber-200 mt-6 text-lg italic">
                " \${(result.bounty || 5000000) >= 3000000000 ? '海军本部最高级别通缉！' : 
                  (result.bounty || 5000000) >= 1000000000 ? '将星/灾害级威胁！' :
                  (result.bounty || 5000000) >= 300000000 ? '超新星级别！' :
                  (result.bounty || 5000000) >= 100000000 ? '值得关注的新人' :
                  '东海的小角色'
                } "
              </p>
            </div>
          </div>
        `
      },

      {
        id: 'dimensions',
        title: '⚔️ 五维战力雷达',
        type: 'data-visualization',
        chartType: 'radar',
        dimensions: ['combatPower', 'influence', 'threatLevel', 'notoriety', 'potential'],
        dimensionNames: {
          combatPower: '战斗力',
          influence: '势力值',
          threatLevel: '威胁度',
          notoriety: '知名度',
          potential: '成长性'
        },
        content: `
          <div className="space-y-4 mt-6">
            <div className="grid grid-cols-5 gap-2">
              <div className="text-center p-3 bg-red-900/30 rounded-lg">
                <div className="text-2xl">⚔️</div>
                <div className="text-white font-bold">\${result.dimensions?.combatPower || 50}</div>
                <div className="text-gray-400 text-xs">战斗力</div>
              </div>
              <div className="text-center p-3 bg-blue-900/30 rounded-lg">
                <div className="text-2xl">👥</div>
                <div className="text-white font-bold">\${result.dimensions?.influence || 50}</div>
                <div className="text-gray-400 text-xs">势力值</div>
              </div>
              <div className="text-center p-3 bg-orange-900/30 rounded-lg">
                <div className="text-2xl">💥</div>
                <div className="text-white font-bold">\${result.dimensions?.threatLevel || 50}</div>
                <div className="text-gray-400 text-xs">威胁度</div>
              </div>
              <div className="text-center p-3 bg-purple-900/30 rounded-lg">
                <div className="text-2xl">📢</div>
                <div className="text-white font-bold">\${result.dimensions?.notoriety || 50}</div>
                <div className="text-gray-400 text-xs">知名度</div>
              </div>
              <div className="text-center p-3 bg-green-900/30 rounded-lg">
                <div className="text-2xl">⭐</div>
                <div className="text-white font-bold">\${result.dimensions?.potential || 50}</div>
                <div className="text-gray-400 text-xs">成长性</div>
              </div>
            </div>
          </div>
        `
      },

      {
        id: 'tier',
        title: '🏆 海贼评级认定',
        type: 'analysis-section',
        content: ''
      }
    ],

    levelDescriptions: {
      SSS: { title: '海上皇帝', advice: '就是你把海军本部掀了？' },
      SS: { title: '皇团干部', advice: '大将以下，众生平等' },
      S: { title: '超新星', advice: '极恶世代，未来可期' },
      A: { title: '七武海', advice: '合法海贼，持证上船' },
      B: { title: '新人海贼', advice: '海贼王的路还很长' },
      C: { title: '杂鱼', advice: '先活过伟大航路再说吧' }
    }
  }
}

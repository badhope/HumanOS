// ECR成人依恋量表补充题目
// 用于扩展专业版题目集

export interface ECRSupplementQuestion {
  id: string
  text: string
  subscale: 'anxiety' | 'avoidance'
  reverseScored: boolean
}

export const ecrSupplementQuestions: ECRSupplementQuestion[] = [
  { id: 'ecr-sup-1', text: '当伴侣没有及时回复我的消息时，我会感到焦虑', subscale: 'anxiety', reverseScored: false },
  { id: 'ecr-sup-2', text: '我经常担心伴侣会离开我', subscale: 'anxiety', reverseScored: false },
  { id: 'ecr-sup-3', text: '我需要伴侣经常表达对我的爱', subscale: 'anxiety', reverseScored: false },
  { id: 'ecr-sup-4', text: '我害怕在亲密关系中受到伤害', subscale: 'anxiety', reverseScored: false },
  { id: 'ecr-sup-5', text: '我经常怀疑伴侣是否真的爱我', subscale: 'anxiety', reverseScored: false },
  { id: 'ecr-sup-6', text: '当伴侣与他人亲近时，我会感到嫉妒', subscale: 'anxiety', reverseScored: false },
  { id: 'ecr-sup-7', text: '我需要伴侣不断确认我们的关系', subscale: 'anxiety', reverseScored: false },
  { id: 'ecr-sup-8', text: '我担心自己不够好，配不上伴侣', subscale: 'anxiety', reverseScored: false },
  { id: 'ecr-sup-9', text: '我害怕被伴侣抛弃', subscale: 'anxiety', reverseScored: false },
  { id: 'ecr-sup-10', text: '我经常检查伴侣是否还爱我', subscale: 'anxiety', reverseScored: false },
  { id: 'ecr-sup-11', text: '我需要伴侣时刻关注我的感受', subscale: 'anxiety', reverseScored: false },
  { id: 'ecr-sup-12', text: '我担心伴侣会找到更好的人', subscale: 'anxiety', reverseScored: false },
  { id: 'ecr-sup-13', text: '我害怕在关系中失去自我', subscale: 'anxiety', reverseScored: false },
  { id: 'ecr-sup-14', text: '我经常需要伴侣的安慰和支持', subscale: 'anxiety', reverseScored: false },
  { id: 'ecr-sup-15', text: '我担心自己的表现会让伴侣失望', subscale: 'anxiety', reverseScored: false },
  { id: 'ecr-sup-16', text: '我害怕伴侣会厌倦我', subscale: 'anxiety', reverseScored: false },
  { id: 'ecr-sup-17', text: '我需要伴侣时刻陪伴在我身边', subscale: 'anxiety', reverseScored: false },
  { id: 'ecr-sup-18', text: '我担心伴侣不够重视我', subscale: 'anxiety', reverseScored: false },
  { id: 'ecr-sup-19', text: '我害怕在关系中失去控制', subscale: 'anxiety', reverseScored: false },
  { id: 'ecr-sup-20', text: '我经常担心关系会结束', subscale: 'anxiety', reverseScored: false },
  { id: 'ecr-sup-21', text: '我需要伴侣不断证明对我的爱', subscale: 'anxiety', reverseScored: false },
  { id: 'ecr-sup-22', text: '我害怕伴侣会背叛我的信任', subscale: 'anxiety', reverseScored: false },
  { id: 'ecr-sup-23', text: '我担心自己无法满足伴侣的需求', subscale: 'anxiety', reverseScored: false },
  { id: 'ecr-sup-24', text: '我害怕在关系中变得脆弱', subscale: 'anxiety', reverseScored: false },
  { id: 'ecr-sup-25', text: '我经常需要伴侣的认可和肯定', subscale: 'anxiety', reverseScored: false },
  { id: 'ecr-sup-26', text: '我担心伴侣会对我失去兴趣', subscale: 'anxiety', reverseScored: false },
  { id: 'ecr-sup-27', text: '我害怕被伴侣拒绝', subscale: 'anxiety', reverseScored: false },
  { id: 'ecr-sup-28', text: '我需要伴侣时刻了解我的想法', subscale: 'anxiety', reverseScored: false },
  { id: 'ecr-sup-29', text: '我担心伴侣不够理解我', subscale: 'anxiety', reverseScored: false },
  { id: 'ecr-sup-30', text: '我害怕在关系中受到伤害', subscale: 'anxiety', reverseScored: false },
  { id: 'ecr-sup-31', text: '我经常需要伴侣的承诺和保证', subscale: 'anxiety', reverseScored: false },
  { id: 'ecr-sup-32', text: '我担心伴侣会离开我去寻找更好的人', subscale: 'anxiety', reverseScored: false },
  { id: 'ecr-sup-33', text: '我更喜欢保持一定的情感距离', subscale: 'avoidance', reverseScored: false },
  { id: 'ecr-sup-34', text: '我不喜欢过于亲密的关系', subscale: 'avoidance', reverseScored: false },
  { id: 'ecr-sup-35', text: '我倾向于独立解决问题，不依赖他人', subscale: 'avoidance', reverseScored: false },
  { id: 'ecr-sup-36', text: '我害怕在关系中失去自由', subscale: 'avoidance', reverseScored: false },
  { id: 'ecr-sup-37', text: '我不喜欢向他人展示脆弱的一面', subscale: 'avoidance', reverseScored: false },
  { id: 'ecr-sup-38', text: '我倾向于保持情感上的距离', subscale: 'avoidance', reverseScored: false },
  { id: 'ecr-sup-39', text: '我不喜欢依赖他人', subscale: 'avoidance', reverseScored: false },
  { id: 'ecr-sup-40', text: '我害怕在关系中变得过于依赖', subscale: 'avoidance', reverseScored: false },
  { id: 'ecr-sup-41', text: '我更喜欢独自处理问题', subscale: 'avoidance', reverseScored: false },
  { id: 'ecr-sup-42', text: '我不喜欢他人过度关心我', subscale: 'avoidance', reverseScored: false },
  { id: 'ecr-sup-43', text: '我倾向于避免深入的情感交流', subscale: 'avoidance', reverseScored: false },
  { id: 'ecr-sup-44', text: '我害怕在关系中失去独立性', subscale: 'avoidance', reverseScored: false },
  { id: 'ecr-sup-45', text: '我不喜欢与他人分享内心感受', subscale: 'avoidance', reverseScored: false },
  { id: 'ecr-sup-46', text: '我倾向于保持个人空间', subscale: 'avoidance', reverseScored: false },
  { id: 'ecr-sup-47', text: '我害怕在关系中受到束缚', subscale: 'avoidance', reverseScored: false },
  { id: 'ecr-sup-48', text: '我不喜欢他人过度依赖我', subscale: 'avoidance', reverseScored: false },
  { id: 'ecr-sup-49', text: '我倾向于避免过于亲密的接触', subscale: 'avoidance', reverseScored: false },
  { id: 'ecr-sup-50', text: '我害怕在关系中失去自我', subscale: 'avoidance', reverseScored: false },
  { id: 'ecr-sup-51', text: '我不喜欢他人知道我的弱点', subscale: 'avoidance', reverseScored: false },
  { id: 'ecr-sup-52', text: '我倾向于保持情感上的独立', subscale: 'avoidance', reverseScored: false },
  { id: 'ecr-sup-53', text: '我害怕在关系中变得脆弱', subscale: 'avoidance', reverseScored: false },
  { id: 'ecr-sup-54', text: '我不喜欢与他人过度亲近', subscale: 'avoidance', reverseScored: false },
  { id: 'ecr-sup-55', text: '我倾向于避免依赖他人', subscale: 'avoidance', reverseScored: false },
  { id: 'ecr-sup-56', text: '我害怕在关系中失去控制', subscale: 'avoidance', reverseScored: false },
  { id: 'ecr-sup-57', text: '我不喜欢他人过度介入我的生活', subscale: 'avoidance', reverseScored: false },
  { id: 'ecr-sup-58', text: '我倾向于保持一定的距离', subscale: 'avoidance', reverseScored: false },
  { id: 'ecr-sup-59', text: '我害怕在关系中承担过多责任', subscale: 'avoidance', reverseScored: false },
  { id: 'ecr-sup-60', text: '我不喜欢他人过度关注我', subscale: 'avoidance', reverseScored: false },
  { id: 'ecr-sup-61', text: '我倾向于避免情感上的依赖', subscale: 'avoidance', reverseScored: false },
  { id: 'ecr-sup-62', text: '我害怕在关系中失去个人空间', subscale: 'avoidance', reverseScored: false },
  { id: 'ecr-sup-63', text: '我不喜欢与他人分享个人问题', subscale: 'avoidance', reverseScored: false },
  { id: 'ecr-sup-64', text: '我倾向于保持独立的生活方式', subscale: 'avoidance', reverseScored: false }
]

export const allECRSupplementQuestions = ecrSupplementQuestions

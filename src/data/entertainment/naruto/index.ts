import { nindoQuestions, calculateNindoResult } from './naruto-nindo'
import { chakraQuestions, calculateChakraResult } from './naruto-chakra'

export { NARUTO_CHARACTERS, CHAKRA_NATURES, KEKKEIGENKAI, VILLAGES, RANKS } from './naruto-common'
export { nindoQuestions, calculateNindoResult } from './naruto-nindo'
export { chakraQuestions, calculateChakraResult } from './naruto-chakra'
export * from './nindo-normal'
export * from './chakra-normal'

export const narutoQuestionSets = {
  'nindo-test': nindoQuestions,
  'chakra-test': chakraQuestions,
}

export const narutoEntrance = {
  id: 'naruto-main',
  title: '火影忍者忍界大战',
  description: '木叶飞舞之处，火亦生生不息！',
  icon: '🍃',
  totalQuestions: 60,
  totalFeatures: 5,
  modes: [
    {
      id: 'nindo-test',
      title: '🔥 忍道测试',
      description: '测一测你最像哪位火影角色，你的忍道是什么？',
      duration: 8,
      questionCount: 40,
      characters: 12,
    },
    {
      id: 'chakra-test',
      title: '⚡ 查克拉属性',
      description: '7大查克拉属性测试，看看你有没有血继限界？',
      duration: 5,
      questionCount: 20,
      kekkeigenkai: 8,
    },
    {
      id: 'full-ninja',
      title: '📜 完整忍者档案',
      description: '忍道+查克拉属性=官方忍者认证！',
      duration: 15,
      questionCount: 60,
      isPremium: true,
    },
  ],
}

export * from './harrypotter-common'
export * from './harrypotter-sorting'
export * from './harrypotter-wand'
export * from './harrypotter-patronus'
export * from './sorting-normal'
export * from './wand-normal'
export * from './patronus-normal'

import { sortingHatQuestions } from './harrypotter-sorting'
import { wandSelectionQuestions } from './harrypotter-wand'
import { patronusQuestions } from './harrypotter-patronus'

export const harrypotterQuestionSets = {
  'sorting-hat': sortingHatQuestions,
  'wand-selection': wandSelectionQuestions,
  'patronus-charm': patronusQuestions,
}

export const harrypotterEntrance = {
  id: 'harrypotter-main',
  title: '哈利波特魔法世界',
  description: '欢迎来到霍格沃茨，年轻的巫师！',
  icon: '⚡',
  totalQuestions: sortingHatQuestions.length + wandSelectionQuestions.length + patronusQuestions.length,
  totalFeatures: 4,
  modes: [
    {
      id: 'sorting-hat',
      title: '分院帽测试',
      description: '你属于哪个学院？让分院帽来决定！',
      duration: 10,
      questionCount: sortingHatQuestions.length,
      houses: 4,
    },
    {
      id: 'wand-selection',
      title: '奥利凡德魔杖店',
      description: '选择你的专属魔杖，开启魔法之旅',
      duration: 5,
      questionCount: wandSelectionQuestions.length,
      wandTypes: 40,
    },
    {
      id: 'patronus-charm',
      title: '守护神咒',
      description: '呼神护卫！发现你的守护神兽',
      duration: 7,
      questionCount: patronusQuestions.length,
      rarityLevels: 3,
    },
    {
      id: 'full-wizard',
      title: '完整巫师档案',
      description: '学院+魔杖+守护神 完整巫师测评',
      duration: 20,
      questionCount: sortingHatQuestions.length + wandSelectionQuestions.length + patronusQuestions.length,
      certification: '霍格沃茨认证',
    },
  ],
}

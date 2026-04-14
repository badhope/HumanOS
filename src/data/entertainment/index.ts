export { harrypotterEntrance } from './harrypotter'
export { narutoEntrance } from './naruto'
export * from './dnd-alignment'
export * from './love-style'

export const entertainmentEntrances = [
  {
    id: 'harrypotter',
    title: '哈利波特',
    icon: '⚡',
    entrance: './harrypotter',
    status: 'beta',
  },
  {
    id: 'naruto',
    title: '火影忍者',
    icon: '🍃',
    entrance: './naruto',
    status: 'beta',
  },
  {
    id: 'dnd-alignment',
    title: 'DND阵营九宫格',
    icon: '⚔️',
    entrance: './dnd-alignment',
    status: 'online',
  },
  {
    id: 'love-style',
    title: '恋爱风格鉴定',
    icon: '💕',
    entrance: './love-style',
    status: 'online',
  },
  {
    id: 'pokemon',
    title: '宝可梦',
    icon: '⚪',
    entrance: './pokemon',
    status: 'planned',
  },
]

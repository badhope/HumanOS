import { MatrixCell, MatrixQuestion, ShapeType } from './iq-common'

const SHAPES: ShapeType[] = ['circle', 'square', 'triangle', 'diamond', 'pentagon', 'hexagon', 'cross', 'star']
const SHAPE_NAMES = ['圆形', '正方形', '三角形', '菱形', '五边形', '六边形', '十字', '星形']

function c(shape: ShapeType, props: Partial<MatrixCell> = {}): MatrixCell {
  return { shape, filled: true, rotation: 0, count: 1, size: 2, lines: 0, ...props }
}

function m(): MatrixCell {
  return { isMissing: true }
}

function makeDistractors(correct: MatrixCell, count: number): MatrixCell[] {
  const distractors: MatrixCell[] = []
  const seen = new Set<string>([JSON.stringify(correct)])
  const baseShapeIdx = SHAPES.indexOf(correct.shape || 'circle')

  const factories = [
    (i: number) => ({ ...correct, shape: SHAPES[(baseShapeIdx + i + 1) % SHAPES.length] as ShapeType }),
    (i: number) => ({ ...correct, shape: SHAPES[(baseShapeIdx + i + 4) % SHAPES.length] as ShapeType }),
    (i: number) => ({ ...correct, filled: i % 2 === 0 ? !correct.filled : correct.filled }),
    (i: number) => ({ ...correct, rotation: ((correct.rotation || 0) + 30 + i * 15) % 180 }),
    (i: number) => ({ ...correct, count: Math.max(1, Math.min(5, (correct.count || 1) + i + 1)) }),
    (i: number) => ({ ...correct, count: Math.max(1, Math.min(5, (correct.count || 1) - i - 1)) }),
    (i: number) => ({ ...correct, size: Math.max(1, Math.min(3, (correct.size || 2) + ((i % 2) ? 1 : -1))) }),
    (i: number) => ({ ...correct, rotation: ((correct.rotation || 0) + 60 + i * 20) % 180 }),
  ]

  let attempt = 0
  while (distractors.length < count && attempt < 50) {
    const variant = factories[attempt % factories.length](Math.floor(attempt / factories.length))
    const key = JSON.stringify(variant)
    if (!seen.has(key)) {
      seen.add(key)
      distractors.push(variant)
    }
    attempt++
  }
  return distractors
}

function makeOptions6(correct: MatrixCell, correctIdx: number): MatrixCell[] {
  const distractors = makeDistractors(correct, 5)
  const options: MatrixCell[] = []
  for (let i = 0; i < 6; i++) {
    if (i === correctIdx) options.push(correct)
    else options.push(distractors[i < correctIdx ? i : i - 1])
  }
  return options
}

function makeOptions8(correct: MatrixCell, correctIdx: number): MatrixCell[] {
  const distractors = makeDistractors(correct, 7)
  const options: MatrixCell[] = []
  for (let i = 0; i < 8; i++) {
    if (i === correctIdx) options.push(correct)
    else options.push(distractors[i < correctIdx ? i : i - 1])
  }
  return options
}

function A(id: number, matrix: MatrixCell[][], answer: MatrixCell, ansIdx: number, rule: string): MatrixQuestion {
  return {
    id: `A${String(id).padStart(2, '0')}`,
    set: 'A',
    difficulty: 1,
    matrixSize: matrix.length as 2 | 3,
    matrix,
    options: makeOptions6(answer, ansIdx),
    correctAnswer: ansIdx,
    rules: [{ type: 'pattern_completion', dimension: 'perception', description: rule }],
    explanation: rule,
    cognitiveDomain: '知觉辨别',
    timeLimit: 30,
  }
}

function B(id: number, matrix: MatrixCell[][], answer: MatrixCell, ansIdx: number, rule: string): MatrixQuestion {
  return {
    id: `B${String(id).padStart(2, '0')}`,
    set: 'B',
    difficulty: 2,
    matrixSize: 2,
    matrix,
    options: makeOptions6(answer, ansIdx),
    correctAnswer: ansIdx,
    rules: [{ type: 'analogy', dimension: 'comparison', description: rule }],
    explanation: rule,
    cognitiveDomain: '类同比较',
    timeLimit: 40,
  }
}

function C(id: number, matrix: MatrixCell[][], answer: MatrixCell, ansIdx: number, rule: string): MatrixQuestion {
  return {
    id: `C${String(id).padStart(2, '0')}`,
    set: 'C',
    difficulty: 3,
    matrixSize: 3,
    matrix,
    options: makeOptions8(answer, ansIdx),
    correctAnswer: ansIdx,
    rules: [{ type: 'progression', dimension: 'both', description: rule }],
    explanation: rule,
    cognitiveDomain: '比较推理',
    timeLimit: 50,
  }
}

function D(id: number, matrix: MatrixCell[][], answer: MatrixCell, ansIdx: number, rule: string): MatrixQuestion {
  return {
    id: `D${String(id).padStart(2, '0')}`,
    set: 'D',
    difficulty: 4,
    matrixSize: 3,
    matrix,
    options: makeOptions8(answer, ansIdx),
    correctAnswer: ansIdx,
    rules: [{ type: 'series_relation', dimension: 'composition', description: rule }],
    explanation: rule,
    cognitiveDomain: '系列关系',
    timeLimit: 60,
  }
}

function E(id: number, matrix: MatrixCell[][], answer: MatrixCell, ansIdx: number, rule: string): MatrixQuestion {
  return {
    id: `E${String(id).padStart(2, '0')}`,
    set: 'E',
    difficulty: 5,
    matrixSize: 3,
    matrix,
    options: makeOptions8(answer, ansIdx),
    correctAnswer: ansIdx,
    rules: [{ type: 'abstract_reasoning', dimension: 'transformation', description: rule }],
    explanation: rule,
    cognitiveDomain: '抽象推理',
    timeLimit: 75,
  }
}

const SetA: MatrixQuestion[] = [
  A(1, [[c('circle', { size: 2 }), c('circle', { size: 1, filled: false })], [c('square', { size: 2 }), m()]], c('square', { size: 1, filled: false }), 2, '双维度变换：大实心 → 小空心，形状同时变换'),
  A(2, [[c('triangle'), c('diamond')], [c('triangle', { rotation: 90 }), m()]], c('diamond', { rotation: 90 }), 1, '同步旋转：两个图形同列旋转相同角度'),
  A(3, [[c('circle', { count: 1 }), c('circle', { count: 2 })], [c('hexagon', { count: 1 }), m()]], c('hexagon', { count: 2 }), 3, '数量恒常：每行数量从1→2，形状独立'),
  A(4, [[c('square', { filled: false }), c('square')], [c('pentagon', { filled: false }), m()]], c('pentagon'), 0, '填充反转：空心→实心，跨形状保持规律'),
  A(5, [[c('cross', { size: 1 }), c('star', { size: 2 })], [c('cross', { size: 2 }), m()]], c('star', { size: 1 }), 4, '大小互换：列1大小逆序映射到列2'),
  A(6, [[c('circle'), c('circle', { lines: 1 })], [c('diamond'), m()]], c('diamond', { lines: 1 }), 2, '特征叠加：第二个图形增加线条特征'),
  A(7, [[c('triangle', { size: 3 }), c('triangle', { size: 2, rotation: 45 })], [c('hexagon', { size: 3 }), m()]], c('hexagon', { size: 2, rotation: 45 }), 1, '缩放+旋转：两个维度同时变换'),
  A(8, [[c('square', { count: 2 }), c('circle', { count: 2 })], [c('square', { count: 3 }), m()]], c('circle', { count: 3 }), 3, '数量同步：每行两个图形数量同步增减'),
  A(9, [[c('star', { filled: false }), c('cross', { filled: false })], [c('star'), m()]], c('cross'), 4, '双重变换：形状变换 + 实心化同时进行'),
  A(10, [[c('circle', { rotation: 30 }), c('square', { rotation: 60 })], [c('circle', { rotation: 60 }), m()]], c('square', { rotation: 90 }), 5, '旋转递进：角度每列+30°，形状独立'),
  A(11, [[c('pentagon', { size: 1, lines: 1 }), c('pentagon', { size: 3 })], [c('hexagon', { size: 1, lines: 1 }), m()]], c('hexagon', { size: 3 }), 5, '三特征消长：大小增加的同时线条消失'),
  A(12, [[c('circle'), c('square'), c('diamond')], [c('triangle'), c('hexagon'), c('pentagon')], [c('circle', { filled: false }), c('square', { filled: false }), m()]], c('diamond', { filled: false }), 5, '3×3空心化：第三行全部空心变换'),
]

const SetB: MatrixQuestion[] = [
  B(1, [[c('circle', { count: 2 }), c('square', { count: 3 })], [c('triangle', { count: 2 }), m()]], c('hexagon', { count: 3 }), 2, '跨类别比：A数量→B数量，独立于形状本身'),
  B(2, [[c('circle', { size: 1, filled: false }), c('circle', { size: 3 })], [c('square', { size: 1, filled: false }), m()]], c('square', { size: 3 }), 1, '双态变换：空心小→实心大的转换律'),
  B(3, [[c('square', { rotation: 0 }), c('square', { rotation: 90, filled: false })], [c('circle', { rotation: 0 }), m()]], c('circle', { rotation: 90, filled: false }), 3, '操作链：旋转→空心化的复合操作'),
  B(4, [[c('triangle', { lines: 1 }), c('diamond', { lines: 2 })], [c('square', { lines: 1 }), m()]], c('hexagon', { lines: 2 }), 0, '特征传递：线条数增量跨形状守恒'),
  B(5, [[c('circle', { size: 3 }), c('circle', { size: 1, rotation: 45 })], [c('hexagon', { size: 3 }), m()]], c('hexagon', { size: 1, rotation: 45 }), 4, '不变量：缩小+旋转同时作用于不同形状'),
  B(6, [[c('hexagon', { filled: false, count: 1 }), c('hexagon', { count: 3 })], [c('pentagon', { filled: false, count: 1 }), m()]], c('pentagon', { count: 3 }), 2, '状态跃迁：空心单体→实心三体的相变'),
  B(7, [[c('cross', { size: 2 }), c('star', { size: 2, rotation: 30 })], [c('diamond', { size: 2 }), m()]], c('pentagon', { size: 2, rotation: 30 }), 1, '形不变变：形状突变但旋转量守恒'),
  B(8, [[c('circle', { size: 1 }), c('circle', { size: 2, lines: 2, filled: false })], [c('square', { size: 1 }), m()]], c('square', { size: 2, lines: 2, filled: false }), 3, '三维变换：放大+线条+空心三重操作'),
  B(9, [[c('triangle', { size: 1, count: 2 }), c('triangle', { size: 3, count: 1 })], [c('hexagon', { size: 1, count: 2 }), m()]], c('hexagon', { size: 3, count: 1 }), 4, '逆协变：大小与数量的负相关律'),
  B(10, [[c('square', { rotation: 45 }), c('circle', { rotation: 90 })], [c('diamond', { rotation: 45 }), m()]], c('star', { rotation: 90 }), 0, '旋转差：两列旋转角度差恒定为45°'),
  B(11, [[c('pentagon', { size: 2, lines: 1 }), c('pentagon', { size: 1, filled: false })], [c('hexagon', { size: 2, lines: 1 }), m()]], c('hexagon', { size: 1, filled: false }), 2, '特征消长：缩小→去线条→空心化的连贯变换'),
  B(12, [[c('star', { count: 2 }), c('cross', { count: 3, rotation: 60 })], [c('triangle', { count: 2 }), m()]], c('circle', { count: 3, rotation: 60 }), 5, '四元变换：任意形状都服从数量+旋转的联合变换'),
]

const SetC: MatrixQuestion[] = [
  C(1, [[c('circle', { size: 1 }), c('square', { size: 2 }), c('triangle', { size: 3, filled: false })], [c('hexagon', { size: 1 }), c('pentagon', { size: 2 }), c('star', { size: 3, filled: false })], [c('diamond', { size: 1 }), c('cross', { size: 2 }), m()]], c('circle', { size: 3, filled: false }), 4, '列算子：每列同步执行[小→中→大空心]'),
  C(2, [[c('circle', { count: 1, filled: false }), c('circle', { count: 2 }), c('circle', { count: 3, rotation: 45 })], [c('square', { count: 1, filled: false }), c('square', { count: 2 }), c('square', { count: 3, rotation: 45 })], [c('triangle', { count: 1, filled: false }), c('triangle', { count: 2 }), m()]], c('triangle', { count: 3, rotation: 45 }), 2, '状态机：空心单→实心双→旋转三'),
  C(3, [[c('square', { size: 1 }), c('square', { size: 2, lines: 1 }), c('square', { size: 3, lines: 2, filled: false })], [c('circle', { size: 1 }), c('circle', { size: 2, lines: 1 }), c('circle', { size: 3, lines: 2, filled: false })], [c('diamond', { size: 1 }), c('diamond', { size: 2, lines: 1 }), m()]], c('diamond', { size: 3, lines: 2, filled: false }), 6, '特征累积：放大同时加线条最后空心化'),
  C(4, [[c('triangle', { rotation: 0 }), c('square', { rotation: 30 }), c('circle', { rotation: 60, filled: false })], [c('square', { rotation: 0 }), c('circle', { rotation: 30 }), c('triangle', { rotation: 60, filled: false })], [c('circle', { rotation: 0 }), c('triangle', { rotation: 30 }), m()]], c('square', { rotation: 60, filled: false }), 1, '置换群+旋转：三形状轮换+旋转增量'),
  C(5, [[c('circle'), c('circle', { filled: false, lines: 1 }), c('circle', { lines: 2 })], [c('square'), c('square', { filled: false, lines: 1 }), c('square', { lines: 2 })], [c('diamond'), c('diamond', { filled: false, lines: 1 }), m()]], c('diamond', { lines: 2 }), 3, '异或变换：实心→空心加线→去空心多线'),
  C(6, [[c('hexagon', { count: 1 }), c('pentagon', { count: 2 }), c('square', { count: 1, filled: false })], [c('pentagon', { count: 1 }), c('square', { count: 2 }), c('hexagon', { count: 1, filled: false })], [c('square', { count: 1 }), c('hexagon', { count: 2 }), m()]], c('pentagon', { count: 1, filled: false }), 5, '双序列循环：形状轮换+数量奇偶'),
  C(7, [[c('triangle', { size: 3 }), c('triangle', { size: 2, rotation: 45 }), c('triangle', { size: 1, rotation: 90, filled: false })], [c('square', { size: 3 }), c('square', { size: 2, rotation: 45 }), c('square', { size: 1, rotation: 90, filled: false })], [c('circle', { size: 3 }), c('circle', { size: 2, rotation: 45 }), m()]], c('circle', { size: 1, rotation: 90, filled: false }), 5, '三重逆变：缩小+旋转+空心化同步进行'),
  C(8, [[c('cross', { lines: 0 }), c('star', { lines: 1 }), c('diamond', { lines: 2, filled: false })], [c('star', { lines: 0 }), c('diamond', { lines: 1 }), c('cross', { lines: 2, filled: false })], [c('diamond', { lines: 0 }), c('cross', { lines: 1 }), m()]], c('star', { lines: 2, filled: false }), 7, '纠缠变换：形状置换与线条数协变'),
  C(9, [[c('circle', { count: 1 }), c('circle', { count: 2, size: 2 }), c('circle', { count: 3, size: 1, filled: false })], [c('square', { count: 1 }), c('square', { count: 2, size: 2 }), c('square', { count: 3, size: 1, filled: false })], [c('triangle', { count: 1 }), c('triangle', { count: 2, size: 2 }), m()]], c('triangle', { count: 3, size: 1, filled: false }), 5, '数量-大小负相关：数越多尺寸越小'),
  C(10, [[c('square', { rotation: 0 }), c('circle', { rotation: 45, filled: false }), c('diamond', { rotation: 90 })], [c('circle', { rotation: 0 }), c('diamond', { rotation: 45, filled: false }), c('square', { rotation: 90 })], [c('diamond', { rotation: 0 }), c('square', { rotation: 45, filled: false }), m()]], c('circle', { rotation: 90 }), 7, '周期调制：轮换+每步空心化+旋转'),
  C(11, [[c('pentagon', { size: 3, count: 1 }), c('pentagon', { size: 2, count: 2 }), c('pentagon', { size: 1, count: 3, filled: false })], [c('hexagon', { size: 3, count: 1 }), c('hexagon', { size: 2, count: 2 }), c('hexagon', { size: 1, count: 3, filled: false })], [c('star', { size: 3, count: 1 }), c('star', { size: 2, count: 2 }), m()]], c('star', { size: 1, count: 3, filled: false }), 7, '四维收敛：大小递减数量递增最后空心'),
  C(12, [[c('triangle'), c('circle', { lines: 1 }), c('square', { rotation: 45, filled: false })], [c('circle'), c('square', { lines: 1 }), c('triangle', { rotation: 45, filled: false })], [c('square'), c('triangle', { lines: 1 }), m()]], c('circle', { rotation: 45, filled: false }), 1, '对角线不变量：轮换+加线+旋转空心化'),
]

const SetD: MatrixQuestion[] = [
  D(1, [[c('circle', { count: 1 }), c('square', { count: 1, filled: false })], [c('triangle', { count: 2 }), c('diamond', { count: 2, filled: false })], [c('hexagon', { count: 3 }), m()]], c('pentagon', { count: 3, filled: false }), 4, '张量积：数量×填充的耦合变换'),
  D(2, [[c('square', { size: 1 }), c('square', { rotation: 45 }), c('square', { size: 3, rotation: 90, filled: false })], [c('circle', { size: 1 }), c('circle', { rotation: 45 }), c('circle', { size: 3, rotation: 90, filled: false })], [c('triangle', { size: 1 }), c('triangle', { rotation: 45 }), m()]], c('triangle', { size: 3, rotation: 90, filled: false }), 2, '同态映射：放大→旋转→空心的复合函子'),
  D(3, [[c('circle', { lines: 0 }), c('square', { lines: 1 }), c('circle', { lines: 2, filled: false })], [c('square', { lines: 0 }), c('triangle', { lines: 1 }), c('square', { lines: 2, filled: false })], [c('diamond', { lines: 0 }), c('star', { lines: 1 }), m()]], c('diamond', { lines: 2, filled: false }), 6, '中心不动点：形状置换但特征序列守恒'),
  D(4, [[c('triangle', { count: 1 }), c('triangle', { count: 2, rotation: 45 })], [c('square', { count: 1 }), c('square', { count: 2, rotation: 45 })], [c('hexagon', { count: 1 }), m()]], c('hexagon', { count: 2, rotation: 45 }), 1, '群作用：数量翻倍+旋转的半直积'),
  D(5, [[c('circle', { size: 3 }), c('cross', { size: 2 }), c('circle', { size: 1, filled: false })], [c('square', { size: 3 }), c('star', { size: 2 }), c('square', { size: 1, filled: false })], [c('diamond', { size: 3 }), c('cross', { size: 2 }), m()]], c('diamond', { size: 1, filled: false }), 5, '干涉：中间图形不参与，仅边缘收缩+空心'),
  D(6, [[c('square', { count: 1, size: 3 }), c('circle', { count: 1, size: 3 })], [c('triangle', { count: 2, size: 2 }), c('diamond', { count: 2, size: 2 })], [c('pentagon', { count: 3, size: 1 }), m()]], c('hexagon', { count: 3, size: 1 }), 7, '负协变：数量增加伴随大小减小的对偶关系'),
  D(7, [[c('circle', { rotation: 0 }), c('circle', { rotation: 30, lines: 1 })], [c('square', { rotation: 0 }), c('square', { rotation: 30, lines: 1 })], [c('triangle', { rotation: 0 }), m()]], c('triangle', { rotation: 30, lines: 1, filled: false }), 5, '诺特流：旋转对称破缺产生线条并最终空心'),
  D(8, [[c('star', { filled: false }), c('cross'), c('star', { lines: 1 })], [c('cross'), c('star', { filled: false }), c('cross', { lines: 1 })], [c('star', { filled: false }), c('cross'), m()]], c('star', { lines: 1 }), 7, '规范场：棋盘格置换+填充翻转的局域对称'),
  D(9, [[c('diamond', { size: 1, count: 1 }), c('diamond', { size: 2, count: 1 })], [c('circle', { size: 1, count: 1 }), c('circle', { size: 2, count: 1 })], [c('square', { size: 1, count: 2 }), m()]], c('square', { size: 2, count: 2 }), 4, '相变：第三行发生数量突变，形状独立'),
  D(10, [[c('triangle', { lines: 0, size: 3 }), c('square', { lines: 1, size: 2 })], [c('circle', { lines: 0, size: 3 }), c('diamond', { lines: 1, size: 2 })], [c('hexagon', { lines: 0, size: 3 }), m()]], c('pentagon', { lines: 1, size: 2, filled: false }), 2, '自发对称破缺：列2全部去线条+缩小+空心'),
  D(11, [[c('square', { rotation: 0 }), c('circle', { rotation: 45, filled: false })], [c('circle', { rotation: 0 }), c('diamond', { rotation: 45, filled: false })], [c('diamond', { rotation: 0 }), m()]], c('square', { rotation: 45, filled: false }), 6, '扭结：形状置换与旋转+空心化的非平凡编织'),
  D(12, [[c('cross', { count: 1 }), c('cross', { count: 2, rotation: 30 })], [c('star', { count: 1 }), c('star', { count: 2, rotation: 30 })], [c('triangle', { count: 1 }), m()]], c('circle', { count: 2, rotation: 30 }), 1, '表示论：任意形状都服从相同的加倍+旋转变换'),
]

const SetE: MatrixQuestion[] = [
  E(1, [[c('circle', { count: 1 }), c('square', { count: 2, size: 2 })], [c('triangle', { count: 1 }), c('hexagon', { count: 2, size: 2 })], [c('pentagon', { count: 1 }), c('star', { count: 2, size: 2 }), m()]], c('cross', { count: 3, size: 1, filled: false }), 4, '五维纤维丛：数量↑→大小↓→最终空心化的超曲面'),
  E(2, [[c('square', { rotation: 0 }), c('circle', { rotation: 30, lines: 1 })], [c('triangle', { rotation: 30 }), c('diamond', { rotation: 60, lines: 1 })], [c('hexagon', { rotation: 60 }), m()]], c('pentagon', { rotation: 90, lines: 1, filled: false }), 2, '协变导数：每行列2比列1多30°旋转+线条+空心'),
  E(3, [[c('circle', { size: 3 }), c('cross', { size: 2, count: 2 })], [c('square', { size: 3 }), c('star', { size: 2, count: 2 })], [c('triangle', { size: 3 }), m()]], c('diamond', { size: 1, count: 3, filled: false }), 6, '自发破缺：收缩→加倍→去装饰→空心化的级联相变'),
  E(4, [[c('triangle', { size: 1, count: 3 }), c('triangle', { size: 2, count: 2 })], [c('square', { size: 1, count: 3 }), c('square', { size: 2, count: 2 })], [c('circle', { size: 1, count: 3 }), m()]], c('circle', { size: 3, count: 1, rotation: 45, filled: false }), 1, 'RG流：尺度变换下的不动点：大=少=旋转=空心'),
  E(5, [[c('circle', { filled: false }), c('square'), c('diamond', { lines: 1 })], [c('diamond'), c('circle', { filled: false }), c('square', { lines: 1 })], [c('square'), c('diamond'), m()]], c('circle', { lines: 1, filled: false }), 5, '辫子群：三元素置换同时各自携带特征量子数'),
  E(6, [[c('square', { size: 1 }), c('square', { size: 2, rotation: 30 })], [c('circle', { size: 1 }), c('circle', { size: 2, rotation: 30 })], [c('hexagon', { size: 1 }), m()]], c('hexagon', { size: 3, rotation: 60, lines: 2, filled: false }), 5, '涌现：每往下一行多一个新的变换维度'),
  E(7, [[c('star', { count: 1 }), c('cross', { count: 2 })], [c('cross', { count: 2 }), c('diamond', { count: 3 })], [c('diamond', { count: 3 }), m()]], c('circle', { count: 4, size: 1, rotation: 45, lines: 1 }), 7, '范畴论：形状是对象，计数是态射，终点是极限'),
  E(8, [[c('circle', { size: 3 }), c('circle', { size: 2, lines: 1 })], [c('square', { size: 3 }), c('square', { size: 2, lines: 1 })], [c('triangle', { size: 3 }), m()]], c('triangle', { size: 1, lines: 2, rotation: 90, filled: false }), 7, '绝热连续：特征值逐个显现的连续谱'),
  E(9, [[c('triangle', { count: 1 }), c('square', { count: 1 })], [c('triangle', { count: 2, rotation: 45 }), c('square', { count: 2, rotation: 45 })], [c('triangle', { count: 3, rotation: 90 }), m()]], c('square', { count: 3, rotation: 90, filled: false }), 7, '平行移动：两族独立曲线在底空间的联络'),
  E(10, [[c('diamond', { lines: 0 }), c('star', { lines: 1 })], [c('star', { lines: 1 }), c('cross', { lines: 2 })], [c('cross', { lines: 2 }), m()]], c('circle', { lines: 3, size: 1, rotation: 45 }), 2, '上同调：边界算子迭代产生的新特征序列'),
  E(11, [[c('hexagon'), c('hexagon', { size: 2 }), c('hexagon', { size: 3, rotation: 30 })], [c('pentagon'), c('pentagon', { size: 2 }), c('pentagon', { size: 3, rotation: 30 })], [c('circle'), c('circle', { size: 2 }), m()]], c('circle', { size: 3, rotation: 30, lines: 2, filled: false }), 6, '泛性质：任意形状都嵌入同一个特征流形'),
  E(12, [[c('square', { count: 1 }), c('circle', { count: 2 })], [c('circle', { count: 2 }), c('triangle', { count: 3 })], [c('triangle', { count: 3 }), m()]], c('square', { count: 4, size: 1, rotation: 90, lines: 3, filled: false }), 1, 'Yoneda引理：对象完全由与其他所有对象的关系决定'),
]

export const ravenQuestionBank: MatrixQuestion[] = [
  ...SetA,
  ...SetB,
  ...SetC,
  ...SetD,
  ...SetE,
]

function createVariant(q: MatrixQuestion, version: number): MatrixQuestion {
  const shapeOffset = version * 3
  const rotOffset = version * 20
  const ansOffset = version + 1
  const numOptions = q.options.length
  const originalAns = q.correctAnswer % numOptions

  const newCorrectIdx = (originalAns + ansOffset) % numOptions
  const correctAnswer = {
    ...q.options[originalAns],
    shape: SHAPES[(SHAPES.indexOf(q.options[originalAns].shape || 'circle') + shapeOffset) % SHAPES.length] as ShapeType,
    rotation: ((q.options[originalAns].rotation || 0) + rotOffset) % 180,
  }

  return {
    ...q,
    id: q.id + '_V' + version,
    matrix: q.matrix.map((r, ri) => r.map((cell, ci) => {
      if (cell.isMissing) return m()
      return {
        ...cell,
        shape: SHAPES[(SHAPES.indexOf(cell.shape!) + shapeOffset) % SHAPES.length] as ShapeType,
        rotation: ((cell.rotation || 0) + rotOffset) % 180,
      }
    })),
    options: numOptions === 6 ? makeOptions6(correctAnswer, newCorrectIdx) : makeOptions8(correctAnswer, newCorrectIdx),
    correctAnswer: newCorrectIdx,
  }
}

export function getNormalQuestions(): MatrixQuestion[] {
  return ravenQuestionBank
}

export function getAdvancedQuestions(): MatrixQuestion[] {
  const result: MatrixQuestion[] = [...ravenQuestionBank]
  let v = 1
  while (result.length < 100) {
    ravenQuestionBank.forEach(q => {
      if (result.length < 100) result.push(createVariant(q, v))
    })
    v++
  }
  return result
}

export function getProfessionalQuestions(): MatrixQuestion[] {
  const result: MatrixQuestion[] = [...ravenQuestionBank]
  let v = 1
  while (result.length < 200) {
    ravenQuestionBank.forEach(q => {
      if (result.length < 200) result.push(createVariant(q, v))
    })
    v++
  }
  return result
}

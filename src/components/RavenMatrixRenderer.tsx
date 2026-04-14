import React from 'react'
import * as Icons from 'lucide-react'
import type { MatrixCell } from '../data/professional/iq/iq-common'

interface ShapeProps {
  cell: MatrixCell
  size?: number
}

function ShapeRenderer({ cell, size = 40 }: ShapeProps) {
  const { shape = 'circle', filled = true, rotation = 0, count = 1, lines = 0, size: cellSize = 1 } = cell

  const baseClass = `transition-all duration-200 text-white ${filled ? 'fill-current stroke-current' : 'stroke-current fill-transparent'}`
  const scale = 0.5 + cellSize * 0.25
  const actualSize = size * scale

  const renderShapes = () => {
    const elements: React.ReactNode[] = []
    const positions = [
      { x: 0, y: 0 },
      { x: -10, y: -10 }, { x: 10, y: -10 },
      { x: 0, y: -10 }, { x: -10, y: 10 }, { x: 10, y: 10 },
    ]

    const actualCount = Math.min(count, 5) + 1

    for (let i = 0; i < actualCount; i++) {
      const pos = positions[i]
      const offsetX = actualCount > 1 ? pos.x : 0
      const offsetY = actualCount > 1 ? pos.y : 0

      const shapeEl = getShape(actualSize / actualCount, offsetX, offsetY)
      elements.push(<g key={i}>{shapeEl}</g>)
    }

    for (let i = 0; i < lines; i++) {
      elements.push(
        <line
          key={`line-${i}`}
          x1={-15 + i * 8}
          y1="-15"
          x2={-15 + i * 8}
          y2="15"
          className="stroke-current stroke-1"
          strokeWidth={1.5}
        />
      )
    }

    return elements
  }

  function getShape(s: number, offsetX: number, offsetY: number) {
    const styles: Record<string, React.ReactNode> = {
      circle: <circle cx={20 + offsetX} cy={20 + offsetY} r={s / 3} className={baseClass} strokeWidth="2" />,
      square: <rect x={20 - s / 3 + offsetX} y={20 - s / 3 + offsetY} width={s * 2 / 3} height={s * 2 / 3} className={baseClass} strokeWidth="2" rx="2" />,
      triangle: <polygon points={`${20 + offsetX},${20 - s / 3 + offsetY} ${20 + s / 3 + offsetX},${20 + s / 4 + offsetY} ${20 - s / 3 + offsetX},${20 + s / 4 + offsetY}`} className={baseClass} strokeWidth="2" />,
      diamond: <polygon points={`${20 + offsetX},${20 - s / 3 + offsetY} ${20 + s / 3 + offsetX},${20 + offsetY} ${20 + offsetX},${20 + s / 3 + offsetY} ${20 - s / 3 + offsetX},${20 + offsetY}`} className={baseClass} strokeWidth="2" />,
      pentagon: <polygon points={`${20 + offsetX},${15 + offsetY} ${28 + offsetX},${20 + offsetY} ${25 + offsetX},${30 + offsetY} ${15 + offsetX},${30 + offsetY} ${12 + offsetX},${20 + offsetY}`} className={baseClass} strokeWidth="2" />,
      hexagon: <polygon points={`${20 + offsetX},${14 + offsetY} ${27 + offsetX},${18 + offsetY} ${27 + offsetX},${26 + offsetY} ${20 + offsetX},${30 + offsetY} ${13 + offsetX},${26 + offsetY} ${13 + offsetX},${18 + offsetY}`} className={baseClass} strokeWidth="2" />,
      star: <polygon points={`${20 + offsetX},${12 + offsetY} ${22 + offsetX},${18 + offsetY} ${28 + offsetX},${18 + offsetY} ${23 + offsetX},${23 + offsetY} ${25 + offsetX},${29 + offsetY} ${20 + offsetX},${25 + offsetY} ${15 + offsetX},${29 + offsetY} ${17 + offsetX},${23 + offsetY} ${12 + offsetX},${18 + offsetY} ${18 + offsetX},${18 + offsetY}`} className={baseClass} strokeWidth="1.5" />,
      plus: (
        <>
          <rect x={18 + offsetX} y={14 + offsetY} width="4" height="12" className={baseClass} strokeWidth="1" rx="1" />
          <rect x={14 + offsetX} y={18 + offsetY} width="12" height="4" className={baseClass} strokeWidth="1" rx="1" />
        </>
      ),
      minus: <rect x={12 + offsetX} y={18.5 + offsetY} width="16" height="3" className={baseClass} strokeWidth="1" rx="1" />,
      cross: (
        <>
          <line x1={13 + offsetX} y1={13 + offsetY} x2={27 + offsetX} y2={27 + offsetY} className="stroke-current" strokeWidth="2" strokeLinecap="round" />
          <line x1={27 + offsetX} y1={13 + offsetY} x2={13 + offsetX} y2={27 + offsetY} className="stroke-current" strokeWidth="2" strokeLinecap="round" />
        </>
      ),
    }
    return styles[shape] || styles.circle
  }

  return (
    <svg width={size} height={size} viewBox="0 0 40 40" style={{ transform: `rotate(${rotation}deg)` }}>
      {renderShapes()}
    </svg>
  )
}

interface MatrixProps {
  matrix: MatrixCell[][]
  showMissing?: boolean
}

export function RavenMatrix({ matrix, showMissing = true }: MatrixProps) {
  return (
    <div className="inline-grid gap-3 p-4 bg-slate-800/50 rounded-xl border-2 border-slate-700">
      {matrix.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-3">
          {row.map((cell, colIndex) => {
            const isMissing = Object.keys(cell).length === 0 || (!cell.shape && !cell.icon)
            return (
              <div
                key={colIndex}
                className={`w-16 h-16 flex items-center justify-center rounded-lg border-2 transition-all ${
                  isMissing && showMissing
                    ? 'border-dashed border-slate-500 bg-slate-900'
                    : 'border-slate-600 bg-slate-900 shadow-sm'
                }`}
              >
                {!isMissing && <ShapeRenderer cell={cell} size={36} />}
                {isMissing && showMissing && (
                  <span className="text-2xl font-bold text-slate-500">?</span>
                )}
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}

interface OptionsProps {
  options: MatrixCell[]
  selected?: number
  onSelect?: (index: number) => void
}

export function RavenOptions({ options, selected, onSelect }: OptionsProps) {
  return (
    <div className="grid grid-cols-3 gap-3 mt-6">
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => onSelect?.(index)}
          className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 hover:border-violet-500 hover:bg-white/10 ${
            selected === index
              ? 'border-violet-500 bg-violet-500/30 shadow-md'
              : 'border-slate-600 bg-slate-900/50'
          }`}
        >
          <span className="text-sm font-semibold text-slate-400">{String.fromCharCode(65 + index)}</span>
          <ShapeRenderer cell={option} size={36} />
        </button>
      ))}
    </div>
  )
}

export function RavenQuestionDisplay({ question, onAnswer }: {
  question: { matrix: MatrixCell[][]; options: MatrixCell[] }
  onAnswer?: (answerIndex: number) => void
}) {
  const [selected, setSelected] = React.useState<number | undefined>()

  const handleSelect = (index: number) => {
    setSelected(index)
    onAnswer?.(index)
  }

  return (
    <div className="flex flex-col items-center">
      <RavenMatrix matrix={question.matrix} />
      <div className="mt-4 text-center text-sm text-gray-500">请选择最合适的图形填入问号位置</div>
      <RavenOptions options={question.options} selected={selected} onSelect={handleSelect} />
    </div>
  )
}

export default RavenQuestionDisplay

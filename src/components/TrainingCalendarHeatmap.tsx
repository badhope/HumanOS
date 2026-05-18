import { useState, useMemo } from 'react'
import { ChevronLeft, ChevronRight, Dumbbell } from 'lucide-react'
import type { TrainingRecord } from '../store'

interface TrainingCalendarHeatmapProps {
  trainingRecords: TrainingRecord[]
}

const WEEKDAY_LABELS = ['日', '一', '二', '三', '四', '五', '六']

const INTENSITY_COLORS = [
  'bg-white/[0.03]',
  'bg-violet-500/25',
  'bg-violet-500/45',
  'bg-violet-500/65',
  'bg-violet-500/85',
]

const INTENSITY_TEXT = [
  'text-white/30',
  'text-white/70',
  'text-white/80',
  'text-white',
  'text-white',
]

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay()
}

function formatDateStr(year: number, month: number, day: number): string {
  const m = String(month + 1).padStart(2, '0')
  const d = String(day).padStart(2, '0')
  return `${year}-${m}-${d}`
}

export default function TrainingCalendarHeatmap({ trainingRecords }: TrainingCalendarHeatmapProps) {
  const today = new Date()
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [hoveredDay, setHoveredDay] = useState<string | null>(null)
  const [animating, setAnimating] = useState(false)

  const trainingByDate = useMemo(() => {
    const map = new Map<string, number>()
    trainingRecords.forEach((r) => {
      const dateStr = new Date(r.completedAt).toISOString().split('T')[0]
      map.set(dateStr, (map.get(dateStr) || 0) + 1)
    })
    return map
  }, [trainingRecords])

  const goToPrevMonth = () => {
    if (animating) return
    setAnimating(true)
    setTimeout(() => {
      if (viewMonth === 0) {
        setViewYear((y) => y - 1)
        setViewMonth(11)
      } else {
        setViewMonth((m) => m - 1)
      }
      setAnimating(false)
    }, 150)
  }

  const goToNextMonth = () => {
    if (animating) return
    setAnimating(true)
    setTimeout(() => {
      if (viewMonth === 11) {
        setViewYear((y) => y + 1)
        setViewMonth(0)
      } else {
        setViewMonth((m) => m + 1)
      }
      setAnimating(false)
    }, 150)
  }

  const goToToday = () => {
    if (animating) return
    setAnimating(true)
    setTimeout(() => {
      setViewYear(today.getFullYear())
      setViewMonth(today.getMonth())
      setAnimating(false)
    }, 150)
  }

  const daysInMonth = getDaysInMonth(viewYear, viewMonth)
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth)
  const todayStr = today.toISOString().split('T')[0]
  const isCurrentMonth = viewYear === today.getFullYear() && viewMonth === today.getMonth()

  const monthName = `${viewYear}年${viewMonth + 1}月`

  return (
    <div className="bg-white/5 rounded-2xl p-4 sm:p-5 border border-white/10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={goToPrevMonth}
            disabled={animating}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-50 flex items-center justify-center text-white/60 hover:text-white transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <h3 className="text-sm sm:text-base font-semibold text-white select-none min-w-[90px] sm:min-w-[110px] text-center">
            {monthName}
          </h3>
          <button
            onClick={goToNextMonth}
            disabled={animating}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-50 flex items-center justify-center text-white/60 hover:text-white transition-colors"
          >
            <ChevronRight size={16} />
          </button>
          {!isCurrentMonth && (
            <button
              onClick={goToToday}
              disabled={animating}
              className="ml-1 sm:ml-2 px-2 sm:px-3 py-1 rounded-lg text-[10px] sm:text-xs bg-violet-500/10 text-violet-400 hover:bg-violet-500/20 disabled:opacity-50 transition-colors"
            >
              今天
            </button>
          )}
        </div>
        <div className="text-[10px] sm:text-xs text-white/40 flex items-center gap-1">
          <Dumbbell size={12} className="text-violet-400" />
          <span>{trainingRecords.length} 次训练</span>
        </div>
      </div>

      <div className={`transition-opacity duration-150 ${animating ? 'opacity-0' : 'opacity-100'}`}>
        <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
          {WEEKDAY_LABELS.map((label) => (
            <div
              key={label}
              className="text-center text-[10px] sm:text-xs font-medium text-white/40 py-1 sm:py-2"
            >
              {label}
            </div>
          ))}

          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square" />
          ))}

          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1
            const dateStr = formatDateStr(viewYear, viewMonth, day)
            const count = trainingByDate.get(dateStr) || 0
            const intensity = Math.min(count, 4)
            const isToday = dateStr === todayStr
            const isFuture = dateStr > todayStr
            const isHovered = hoveredDay === dateStr

            return (
              <div
                key={dateStr}
                className="relative"
                onMouseEnter={() => !isFuture && setHoveredDay(dateStr)}
                onMouseLeave={() => setHoveredDay(null)}
              >
                <div
                  className={`
                    aspect-square rounded-lg sm:rounded-xl flex flex-col items-center justify-center
                    transition-all duration-150 cursor-default select-none relative
                    ${isFuture ? 'bg-white/[0.02]' : INTENSITY_COLORS[intensity]}
                    ${isToday ? 'ring-1 sm:ring-2 ring-amber-400/70 shadow-[0_0_10px_rgba(251,191,36,0.2)]' : ''}
                    ${isHovered && !isFuture ? 'scale-105 z-10' : ''}
                  `}
                >
                  <span
                    className={`
                      text-[10px] sm:text-xs leading-none
                      ${isFuture ? 'text-white/20' :
                        isToday ? 'font-bold text-white' :
                        INTENSITY_TEXT[intensity]}
                    `}
                  >
                    {day}
                  </span>
                  {count > 0 && (
                    <div className="flex gap-[2px] mt-0.5 sm:mt-1">
                      {Array.from({ length: Math.min(count, 3) }).map((_, j) => (
                        <div
                          key={j}
                          className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-white/80"
                        />
                      ))}
                      {count > 3 && (
                        <span className="text-[7px] sm:text-[8px] text-white/50 leading-none ml-0.5">
                          +
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {isHovered && !isFuture && (
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1.5 sm:mb-2 z-20 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-slate-800 border border-white/10 shadow-xl whitespace-nowrap pointer-events-none">
                    <div className="text-[10px] sm:text-xs text-white font-medium">
                      {dateStr}
                    </div>
                    <div className="text-[10px] sm:text-xs text-violet-400">
                      {count > 0 ? `${count} 次训练` : '无训练记录'}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div className="flex items-center justify-end gap-1.5 sm:gap-2 mt-3 sm:mt-4 text-[10px] sm:text-xs text-white/40">
        <span>少</span>
        {INTENSITY_COLORS.map((color, i) => (
          <div
            key={i}
            className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded ${color}`}
          />
        ))}
        <span>多</span>
      </div>
    </div>
  )
}
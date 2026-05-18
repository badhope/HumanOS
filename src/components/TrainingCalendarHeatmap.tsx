import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Calendar, Dumbbell } from 'lucide-react'
import type { TrainingRecord } from '../store'

interface TrainingCalendarHeatmapProps {
  trainingRecords: TrainingRecord[]
}

const WEEKDAY_LABELS = ['日', '一', '二', '三', '四', '五', '六']

const INTENSITY_COLORS = [
  { bg: 'bg-white/[0.04]', text: 'text-white/50' },
  { bg: 'bg-violet-500/20', text: 'text-white/70' },
  { bg: 'bg-violet-500/40', text: 'text-white/80' },
  { bg: 'bg-violet-500/60', text: 'text-white' },
  { bg: 'bg-violet-500/85', text: 'text-white' },
]

const INTENSITY_BG_STYLE = [
  undefined,
  'rgba(139,92,246,0.2)',
  'rgba(139,92,246,0.4)',
  'rgba(139,92,246,0.6)',
  'rgba(139,92,246,0.85)',
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

  const trainingByDate = useMemo(() => {
    const map = new Map<string, number>()
    trainingRecords.forEach((r) => {
      const dateStr = new Date(r.completedAt).toISOString().split('T')[0]
      map.set(dateStr, (map.get(dateStr) || 0) + 1)
    })
    return map
  }, [trainingRecords])

  const goToPrevMonth = () => {
    if (viewMonth === 0) {
      setViewYear((y) => y - 1)
      setViewMonth(11)
    } else {
      setViewMonth((m) => m - 1)
    }
  }

  const goToNextMonth = () => {
    if (viewMonth === 11) {
      setViewYear((y) => y + 1)
      setViewMonth(0)
    } else {
      setViewMonth((m) => m + 1)
    }
  }

  const goToToday = () => {
    setViewYear(today.getFullYear())
    setViewMonth(today.getMonth())
  }

  const daysInMonth = getDaysInMonth(viewYear, viewMonth)
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth)
  const todayStr = today.toISOString().split('T')[0]
  const isCurrentMonth = viewYear === today.getFullYear() && viewMonth === today.getMonth()

  const totalCells = firstDay + daysInMonth
  const totalRows = Math.ceil(totalCells / 7)

  const monthName = `${viewYear}年${viewMonth + 1}月`

  return (
    <div className="bg-white/5 rounded-2xl p-4 sm:p-5 border border-white/10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={goToPrevMonth}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <h3 className="text-sm sm:text-base font-semibold text-white select-none min-w-[90px] sm:min-w-[110px] text-center">
            {monthName}
          </h3>
          <button
            onClick={goToNextMonth}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
          >
            <ChevronRight size={16} />
          </button>
          {!isCurrentMonth && (
            <button
              onClick={goToToday}
              className="ml-1 sm:ml-2 px-2 sm:px-3 py-1 rounded-lg text-[10px] sm:text-xs bg-violet-500/10 text-violet-400 hover:bg-violet-500/20 transition-colors"
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

      <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
        {WEEKDAY_LABELS.map((label) => (
          <div
            key={label}
            className="text-center text-[10px] sm:text-xs font-medium text-white/40 py-1 sm:py-2"
          >
            {label}
          </div>
        ))}

        <AnimatePresence mode="wait">
          <motion.div
            key={`${viewYear}-${viewMonth}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-7 gap-1 sm:gap-1.5 col-span-7"
          >
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
              const color = INTENSITY_COLORS[intensity]

              return (
                <div
                  key={dateStr}
                  className="relative"
                  onMouseEnter={() => setHoveredDay(dateStr)}
                  onMouseLeave={() => setHoveredDay(null)}
                >
                  <div
                    className={`aspect-square rounded-lg sm:rounded-xl flex flex-col items-center justify-center transition-all duration-200 cursor-default select-none
                      ${isFuture ? 'bg-white/[0.02]' : color.bg}
                      ${isToday ? 'ring-1 sm:ring-2 ring-amber-400/60 shadow-[0_0_12px_rgba(251,191,36,0.15)]' : ''}
                      ${!isFuture && !isToday && count === 0 ? 'bg-white/[0.03]' : ''}
                      ${isHovered && !isFuture ? 'scale-105 z-10 shadow-lg' : ''}
                    `}
                    style={isHovered && !isFuture ? {
                      backgroundColor: INTENSITY_BG_STYLE[intensity],
                    } : undefined}
                  >
                    <span
                      className={`text-[10px] sm:text-xs leading-none ${
                        isFuture ? 'text-white/20' :
                        isToday ? 'font-bold text-white' :
                        color.text
                      }`}
                    >
                      {day}
                    </span>
                    {count > 0 && (
                      <div className="flex gap-[1px] mt-0.5 sm:mt-1">
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

                  <AnimatePresence>
                    {isHovered && !isFuture && (
                      <motion.div
                        initial={{ opacity: 0, y: 4, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1.5 sm:mb-2 z-20 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-slate-800 border border-white/10 shadow-xl whitespace-nowrap pointer-events-none"
                      >
                        <div className="text-[10px] sm:text-xs text-white font-medium">
                          {dateStr}
                        </div>
                        <div className="text-[10px] sm:text-xs text-violet-400">
                          {count > 0 ? `${count} 次训练` : '无训练记录'}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-end gap-1.5 sm:gap-2 mt-3 sm:mt-4 text-[10px] sm:text-xs text-white/40">
        <span>少</span>
        {INTENSITY_COLORS.map((color, i) => (
          <div
            key={i}
            className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded ${i === 0 ? 'bg-white/[0.03]' : color.bg}`}
          />
        ))}
        <span>多</span>
      </div>
    </div>
  )
}
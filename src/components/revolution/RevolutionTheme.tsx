import type { ReactNode } from 'react'

export const REVOLUTION_COLORS = {
  blood_red: '#8B0000',
  tricolor_blue: '#002654',
  tricolor_white: '#FFFFFF',
  tricolor_red: '#CE1126',
  gold: '#D4AF37',
  parchment: '#F5E6C8',
  ink: '#1A1A1A',
  guillotine: '#4A4A4A',
  fire: '#FF4500',
  nobility: '#4B0082',
  clergy: '#8B4513',
  bourgeois: '#2E8B57',
  people: '#CD853F',
}

interface RevolutionCardProps {
  children: ReactNode
  variant?: 'blood' | 'noble' | 'parchment' | 'fire'
  glow?: boolean
  className?: string
  onClick?: () => void
}

export function RevolutionCard({
  children,
  variant = 'parchment',
  glow = false,
  className = '',
  onClick,
}: RevolutionCardProps) {
  const variants = {
    blood: 'bg-gradient-to-br from-[#8B0000]/90 to-[#4A0000] border-2 border-red-800',
    noble: 'bg-gradient-to-br from-[#4B0082]/90 to-[#2E0854] border-2 border-purple-600',
    parchment: 'bg-gradient-to-br from-[#F5E6C8] to-[#E6D4B8] border-2 border-amber-700 text-[#1A1A1A]',
    fire: 'bg-gradient-to-br from-[#FF4500]/90 to-[#8B0000] border-2 border-orange-500',
  }

  return (
    <div
      className={`
        relative rounded-lg p-6
        ${variants[variant]}
        ${glow ? 'shadow-2xl shadow-red-900/30' : 'shadow-xl'}
        ${onClick ? 'cursor-pointer hover:scale-[1.02] transition-transform duration-300' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

interface TricolorBannerProps {
  title: string
  subtitle?: string
  icon?: ReactNode
}

export function TricolorBanner({ title, subtitle, icon }: TricolorBannerProps) {
  return (
    <div className="relative w-full overflow-hidden rounded-lg mb-6">
      <div className="h-2 flex">
        <div className="flex-1 bg-[#002654]" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-[#CE1126]" />
      </div>
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-4">
        <div className="flex items-center gap-3">
          {icon && <span className="text-[#D4AF37]">{icon}</span>}
          <div>
            <h2 className="text-xl font-bold text-white">{title}</h2>
            {subtitle && <p className="text-sm text-slate-400">{subtitle}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}

interface MetricGaugeProps {
  label: string
  value: number
  color?: 'red' | 'blue' | 'gold' | 'green'
  threshold?: number
}

export function MetricGauge({
  label,
  value,
  color = 'gold',
  threshold = 0.5,
}: MetricGaugeProps) {
  const colors = {
    red: 'bg-gradient-to-r from-red-700 to-red-500',
    blue: 'bg-gradient-to-r from-blue-700 to-blue-500',
    gold: 'bg-gradient-to-r from-amber-600 to-yellow-400',
    green: 'bg-gradient-to-r from-emerald-700 to-emerald-500',
  }

  const actualColor = value > threshold ? colors[color] : colors.red

  return (
    <div className="mb-3">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-slate-300">{label}</span>
        <span className="font-bold text-white">{(value * 100).toFixed(0)}%</span>
      </div>
      <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
        <div
          className={`h-full ${actualColor} transition-all duration-1000`}
          style={{ width: `${value * 100}%` }}
        />
      </div>
    </div>
  )
}

interface PersonalityRadarProps {
  personality: {
    openness: number
    conscientiousness: number
    extraversion: number
    agreeableness: number
    neuroticism: number
  }
  size?: number
}

export function PersonalityRadar({ personality, size = 120 }: PersonalityRadarProps) {
  const traits = [
    { name: '开放性', value: personality.openness, x: 0.5, y: 0 },
    { name: '尽责性', value: personality.conscientiousness, x: 0.95, y: 0.65 },
    { name: '外向性', value: personality.extraversion, x: 0.8, y: 1 },
    { name: '宜人性', value: personality.agreeableness, x: 0.2, y: 1 },
    { name: '神经质', value: personality.neuroticism, x: 0.05, y: 0.65 },
  ]

  const calcPoint = (t: typeof traits[0], radius: number) => ({
    x: 50 + (t.x - 0.5) * 2 * radius * t.value,
    y: 50 + (t.y - 0.5) * 2 * radius * t.value,
  })

  const radius = 40
  const points = traits.map(t => calcPoint(t, radius))
  const polygonPoints = points.map(p => `${p.x},${p.y}`).join(' ')

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} viewBox="0 0 100 100">
        <polygon
          points="50,10 88,42 74,90 26,90 12,42"
          fill="none"
          stroke="#4A5568"
          strokeWidth="0.5"
        />
        <polygon
          points={polygonPoints}
          fill="url(#personalityGradient)"
          stroke="#D4AF37"
          strokeWidth="1.5"
          opacity="0.7"
        />
        <defs>
          <linearGradient id="personalityGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#CE1126" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#002654" stopOpacity="0.8" />
          </linearGradient>
        </defs>
      </svg>
      <div className="grid grid-cols-5 gap-1 mt-2 w-full">
        {traits.map(t => (
          <div key={t.name} className="text-center">
            <div className="text-[8px] text-slate-400">{t.name}</div>
            <div className="text-xs font-bold text-amber-400">{(t.value * 100).toFixed(0)}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

interface RelationBadgeProps {
  type: 'trust' | 'affection' | 'respect' | 'fear'
  value: number
  showLabel?: boolean
}

export function RelationBadge({ type, value, showLabel = true }: RelationBadgeProps) {
  const configs = {
    trust: {
      icon: '🤝',
      label: '信任',
      color: value > 0.5 ? 'bg-emerald-600' : value > 0 ? 'bg-emerald-800' : 'bg-slate-600',
    },
    affection: {
      icon: '❤️',
      label: '好感',
      color: value > 0.5 ? 'bg-pink-600' : value > 0 ? 'bg-pink-800' : 'bg-slate-600',
    },
    respect: {
      icon: '👑',
      label: '尊敬',
      color: value > 0.5 ? 'bg-amber-600' : value > 0 ? 'bg-amber-800' : 'bg-slate-600',
    },
    fear: {
      icon: '💀',
      label: '恐惧',
      color: value > 0.5 ? 'bg-red-700' : value > 0 ? 'bg-red-900' : 'bg-slate-600',
    },
  }

  const config = configs[type]

  return (
    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded ${config.color} text-white text-xs`}>
      <span>{config.icon}</span>
      {showLabel && <span>{config.label}</span>}
      <span className="font-bold">{(value * 100).toFixed(0)}</span>
    </div>
  )
}

interface ChoiceButtonProps {
  children: ReactNode
  difficulty?: number
  successChance?: number
  selected?: boolean
  onClick?: () => void
  disabled?: boolean
  variant?: 'noble' | 'dangerous' | 'neutral' | 'heroic'
}

export function ChoiceButton({
  children,
  difficulty = 0.5,
  successChance = 0.7,
  selected = false,
  onClick,
  disabled = false,
  variant = 'neutral',
}: ChoiceButtonProps) {
  const variants = {
    noble: 'border-emerald-500 hover:bg-emerald-900/50',
    dangerous: 'border-red-600 hover:bg-red-900/50',
    neutral: 'border-slate-500 hover:bg-slate-700/50',
    heroic: 'border-amber-500 hover:bg-amber-900/50',
  }

  const chanceColor = successChance > 0.6 ? 'text-emerald-400' : successChance > 0.3 ? 'text-amber-400' : 'text-red-400'

  return (
    <button
      className={`
        w-full p-4 rounded-lg border-2 text-left transition-all duration-300
        ${variants[variant]}
        ${selected ? 'bg-slate-600/50 scale-[1.02]' : 'bg-slate-800/50'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
      onClick={onClick}
      disabled={disabled}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1 text-white">{children}</div>
        <div className="text-right ml-4">
          <div className={`text-sm font-bold ${chanceColor}`}>
            {(successChance * 100).toFixed(0)}%
          </div>
          <div className="text-xs text-slate-400">
            难度: {'⭐'.repeat(Math.ceil(difficulty * 5))}
          </div>
        </div>
      </div>
    </button>
  )
}

interface EventToastProps {
  type: 'revolution' | 'death' | 'law' | 'discovery' | 'betrayal'
  title: string
  message: string
  turn: number
}

export function EventToast({ type, title, message, turn }: EventToastProps) {
  const icons = {
    revolution: '⚔️',
    death: '💀',
    law: '📜',
    discovery: '🔍',
    betrayal: '🔪',
  }

  const colors = {
    revolution: 'border-l-4 border-red-600',
    death: 'border-l-4 border-slate-900',
    law: 'border-l-4 border-blue-600',
    discovery: 'border-l-4 border-amber-500',
    betrayal: 'border-l-4 border-purple-700',
  }

  return (
    <div className={`bg-slate-800 rounded-lg p-4 ${colors[type]} shadow-xl`}>
      <div className="flex items-start gap-3">
        <span className="text-2xl">{icons[type]}</span>
        <div className="flex-1">
          <div className="flex justify-between">
            <h4 className="font-bold text-white">{title}</h4>
            <span className="text-xs text-slate-400">第 {turn} 回合</span>
          </div>
          <p className="text-sm text-slate-300 mt-1">{message}</p>
        </div>
      </div>
    </div>
  )
}

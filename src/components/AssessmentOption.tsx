import { memo } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@utils/cn'

interface AssessmentOptionProps {
  option: {
    id?: string
    text: string
    value?: number
    trait?: string | Record<string, number>
    dimension?: string
  }
  index: number
  selected: boolean
  onClick: (optionId: string) => void
  variants: Record<string, any>
}

export const AssessmentOption = memo(function AssessmentOption({
  option,
  index,
  selected,
  onClick,
  variants,
}: AssessmentOptionProps) {
  const optionId = option.id || index.toString()

  return (
    <motion.button
      key={optionId}
      onClick={() => onClick(optionId)}
      className={cn(
        'w-full p-4 sm:p-5 rounded-xl text-left transition-all flex items-start gap-4',
        selected
          ? 'bg-gradient-to-r from-violet-500/30 to-pink-500/30 border-2 border-violet-500 text-white'
          : 'glass text-white/80 hover:bg-white/10 border-2 border-transparent'
      )}
      variants={variants}
      initial="hidden"
      animate="visible"
      custom={index}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      type="button"
    >
      <div className={cn(
        'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-semibold',
        selected ? 'bg-violet-500 text-white' : 'bg-white/10 text-white/60'
      )}>
        {String.fromCharCode(65 + index)}
      </div>
      <span className="flex-1 pt-1">{option.text}</span>
    </motion.button>
  )
}, (prevProps, nextProps) => {
  return (
    prevProps.selected === nextProps.selected &&
    prevProps.option.id === nextProps.option.id &&
    prevProps.option.text === nextProps.option.text
  )
})

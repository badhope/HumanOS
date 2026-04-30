import { memo } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@utils/cn'
import { Check } from 'lucide-react'

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
        'w-full p-4 sm:p-5 rounded-xl text-left transition-all duration-200 flex items-start gap-4 relative overflow-hidden',
        selected
          ? 'bg-gradient-to-r from-violet-500/20 to-pink-500/15 border border-violet-500/50 text-white shadow-lg shadow-violet-500/20'
          : 'bg-white/5 text-white/80 hover:bg-white/10 hover:text-white border border-transparent hover:border-violet-500/20'
      )}
      variants={variants}
      initial="hidden"
      animate="visible"
      custom={index}
      whileHover={{ 
        y: -2,
        transition: { duration: 0.15 }
      }}
      whileTap={{ 
        scale: 0.98,
        y: 1,
        transition: { duration: 0.1 }
      }}
      type="button"
    >
      {selected && (
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-violet-500 to-pink-500"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        />
      )}
      
      <div className={cn(
        'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-semibold relative z-10 transition-all duration-200',
        selected 
          ? 'bg-gradient-to-br from-violet-500 to-pink-500 text-white shadow-lg shadow-violet-500/30' 
          : 'bg-white/10 text-white/60 group-hover:bg-white/15'
      )}>
        {selected ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 15 }}
          >
            <Check className="w-4 h-4" />
          </motion.div>
        ) : (
          String.fromCharCode(65 + index)
        )}
      </div>
      
      <span className="flex-1 pt-0.5 relative z-10 leading-relaxed">
        {option.text}
      </span>
    </motion.button>
  )
}, (prevProps, nextProps) => {
  return (
    prevProps.selected === nextProps.selected &&
    prevProps.option.id === nextProps.option.id &&
    prevProps.option.text === nextProps.option.text
  )
})

import { memo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@utils/cn';
import { Check } from 'lucide-react';
import type { Variants } from 'framer-motion';

interface AssessmentOptionProps {
  option: {
    id?: string;
    text: string;
    value?: number;
    trait?: string | Record<string, number>;
    dimension?: string;
  };
  index: number;
  selected: boolean;
  onClick: (optionId: string) => void;
  variants: Variants;
  isMobile?: boolean;
  disabled?: boolean;
}

export const AssessmentOption = memo(function AssessmentOption({
  option,
  index,
  selected,
  onClick,
  variants,
  isMobile = false,
  disabled = false,
}: AssessmentOptionProps) {
  const optionId = option.id || index.toString();

  return (
    <motion.button
      key={optionId}
      onClick={() => !disabled && onClick(optionId)}
      className={cn(
        'w-full rounded-xl text-left transition-all duration-200 flex items-center gap-3 sm:gap-4 relative overflow-hidden',
        'min-h-[56px] sm:min-h-[64px] touch-manipulation',
        disabled
          ? 'bg-white/3 text-white/30 cursor-not-allowed border border-transparent'
          : selected
          ? 'bg-gradient-to-r from-violet-500/20 to-pink-500/15 border border-violet-500/50 text-white shadow-lg shadow-violet-500/20'
          : 'bg-white/5 text-white/80 hover:bg-white/10 hover:text-white border border-transparent hover:border-violet-500/20 active:bg-white/15'
      )}
      variants={variants}
      initial="hidden"
      animate="visible"
      custom={index}
      whileHover={!isMobile && !disabled ? {
        y: -2,
        transition: { duration: 0.15 }
      } : {}}
      whileTap={!disabled ? {
        scale: 0.98,
        y: 1,
        transition: { duration: 0.1 }
      } : {}}
      type="button"
      tabIndex={disabled ? -1 : 0}
      role="option"
      aria-selected={selected}
      aria-disabled={disabled}
      aria-label={`选项 ${String.fromCharCode(65 + index)}: ${option.text}`}
      disabled={disabled}
    >
      {selected && (
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-1.5 sm:w-1 bg-gradient-to-b from-violet-500 to-pink-500"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        />
      )}

      <div className={cn(
        'rounded-full flex items-center justify-center flex-shrink-0 font-semibold relative z-10 transition-all duration-200',
        'w-9 h-9 sm:w-10 sm:h-10 text-sm sm:text-base',
        selected
          ? 'bg-gradient-to-br from-violet-500 to-pink-500 text-white shadow-lg shadow-violet-500/30'
          : 'bg-white/10 text-white/60 hover:bg-white/15'
      )}>
        {selected ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 15 }}
          >
            <Check className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.div>
        ) : (
          <span className="select-none">{String.fromCharCode(65 + index)}</span>
        )}
      </div>

      <span className={cn(
        'flex-1 relative z-10 leading-relaxed',
        'text-sm sm:text-base',
        'px-1 sm:px-2'
      )}>
        {option.text}
      </span>

      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={false}
        animate={{
          opacity: selected ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        <div className="absolute top-1/4 -right-8 w-16 h-16 bg-violet-500/10 rounded-full blur-xl" />
        <div className="absolute bottom-1/4 -right-4 w-12 h-12 bg-pink-500/10 rounded-full blur-xl" />
      </motion.div>
    </motion.button>
  );
}, (prevProps, nextProps) => {
  return (
    prevProps.selected === nextProps.selected &&
    prevProps.option.id === nextProps.option.id &&
    prevProps.option.text === nextProps.option.text
  );
});

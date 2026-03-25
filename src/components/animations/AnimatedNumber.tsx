import { useEffect, useRef, useState } from 'react'
import { motion, useSpring, useTransform, useInView } from 'framer-motion'

interface AnimatedNumberProps {
  value: number
  duration?: number
  delay?: number
  formatOptions?: Intl.NumberFormatOptions
  className?: string
  prefix?: string
  suffix?: string
}

export default function AnimatedNumber({
  value,
  duration = 1.5,
  delay = 0,
  formatOptions,
  className = '',
  prefix = '',
  suffix = '',
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [hasAnimated, setHasAnimated] = useState(false)

  const spring = useSpring(0, {
    stiffness: 50,
    damping: 20,
    duration: duration * 1000,
  })

  const display = useTransform(spring, (current) => {
    const formatted = new Intl.NumberFormat('zh-CN', formatOptions).format(Math.round(current))
    return `${prefix}${formatted}${suffix}`
  })

  useEffect(() => {
    if (isInView && !hasAnimated) {
      const timeout = setTimeout(() => {
        spring.set(value)
        setHasAnimated(true)
      }, delay * 1000)
      return () => clearTimeout(timeout)
    }
  }, [isInView, hasAnimated, value, delay, spring])

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay }}
    >
      <motion.span>{display}</motion.span>
    </motion.span>
  )
}

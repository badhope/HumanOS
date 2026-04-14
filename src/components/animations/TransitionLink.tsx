import { forwardRef } from 'react'
import { usePageTransition } from './PageTransitionController'
import type { NavigationDirection, PhoneLoadingStyle, LoadingPreset } from './PageTransitionController'

interface TransitionLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string
  direction?: NavigationDirection
  loadingText?: string
  loadingType?: 'random' | 'spinner' | 'pulse' | 'dots' | 'ripple' | 'orbit' | 'stars' | 'bars'
  phoneStyle?: PhoneLoadingStyle
  preset?: LoadingPreset
  duration?: number
  children: React.ReactNode
}

const TransitionLink = forwardRef<HTMLAnchorElement, TransitionLinkProps>(
  (
    {
      to,
      direction,
      loadingText,
      loadingType,
      phoneStyle,
      preset,
      duration,
      children,
      onClick,
      className,
      ...props
    },
    ref
  ) => {
    const { navigateWithTransition } = usePageTransition()

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault()
      onClick?.(e)
      navigateWithTransition(to, {
        direction,
        loadingText,
        loadingType,
        phoneStyle,
        preset,
        duration,
      })
    }

    return (
      <a
        ref={ref}
        href={to}
        onClick={handleClick}
        className={className}
        {...props}
      >
        {children}
      </a>
    )
  }
)

TransitionLink.displayName = 'TransitionLink'

export { TransitionLink }

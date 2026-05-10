export {
  LoadingSpinner,
  LoadingPulse,
  LoadingDots,
  LoadingBars,
  LoadingRipple,
  LoadingOrbit,
  LoadingGradient,
  LoadingMorph,
  LoadingStars,
  Spinner,
  Pulse,
  Dots,
  Bars,
  Ripple,
  Orbit,
  Gradient,
  Morph,
  Stars,
} from './loaders/BasicLoaders'

export {
  PhoneLoadingSkeleton,
  PhoneLoadingProgress,
  PhoneLoadingScan,
  PhoneLoadingGlow,
  PhoneLoadingWaves,
  type PhoneLoadingStyle,
  type PhoneLoadingProps,
} from './loaders/ProgressLoaders'

export {
  LogoLoading,
  SmallLogo,
} from './loaders/ThemeLoaders'

export {
  PageLoadingOverlay,
  PhonePageOverlay,
  Overlay,
} from './loaders/PageLoadingOverlay'

export type { LoadingType } from './loaders/PageLoadingOverlay'

const LoadingAnimations = {
  Spinner: LoadingSpinner,
  Pulse: LoadingPulse,
  Dots: LoadingDots,
  Bars: LoadingBars,
  Ripple: LoadingRipple,
  Orbit: LoadingOrbit,
  Gradient: LoadingGradient,
  Morph: LoadingMorph,
  Stars: LoadingStars,
  Overlay: PageLoadingOverlay,
}

export default LoadingAnimations

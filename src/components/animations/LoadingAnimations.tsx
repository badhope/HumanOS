import * as BasicLoaders from './loaders/BasicLoaders'
import * as PageLoaders from './loaders/PageLoadingOverlay'

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
  Spinner: BasicLoaders.LoadingSpinner,
  Pulse: BasicLoaders.LoadingPulse,
  Dots: BasicLoaders.LoadingDots,
  Bars: BasicLoaders.LoadingBars,
  Ripple: BasicLoaders.LoadingRipple,
  Orbit: BasicLoaders.LoadingOrbit,
  Gradient: BasicLoaders.LoadingGradient,
  Morph: BasicLoaders.LoadingMorph,
  Stars: BasicLoaders.LoadingStars,
  Overlay: PageLoaders.PageLoadingOverlay,
}

export default LoadingAnimations

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSettingsStore } from '@/store/settingsStore';

gsap.registerPlugin(ScrollTrigger);

export type AnimationLevel = 'none' | 'low' | 'medium' | 'high';

const animationConfigs = {
  none: {
    duration: 0,
    ease: 'none',
    stagger: 0,
  },
  low: {
    duration: 0.3,
    ease: 'power2.out',
    stagger: 0.05,
  },
  medium: {
    duration: 0.5,
    ease: 'power3.out',
    stagger: 0.1,
  },
  high: {
    duration: 0.8,
    ease: 'elastic.out(1, 0.75)',
    stagger: 0.15,
  },
};

export function getAnimationConfig(level: AnimationLevel) {
  return animationConfigs[level];
}

export function useAnimations() {
  const { animationLevel, reducedMotion } = useSettingsStore();

  if (reducedMotion || animationLevel === 'none') {
    return {
      fadeIn: () => {},
      fadeOut: () => {},
      slideIn: () => {},
      staggerReveal: () => {},
      timeline: () => gsap.timeline({ paused: true }),
    };
  }

  return {
    fadeIn: (element: gsap.TweenTarget, options?: gsap.TweenVars) => {
      return gsap.fromTo(
        element,
        { opacity: 0 },
        {
          opacity: 1,
          duration: animationConfigs[animationLevel].duration,
          ease: animationConfigs[animationLevel].ease,
          ...options,
        }
      );
    },

    fadeOut: (element: gsap.TweenTarget, options?: gsap.TweenVars) => {
      return gsap.to(element, {
        opacity: 0,
        duration: animationConfigs[animationLevel].duration,
        ease: animationConfigs[animationLevel].ease,
        ...options,
      });
    },

    slideIn: (element: gsap.TweenTarget, direction: 'left' | 'right' | 'up' | 'down' = 'up') => {
      const fromVars: gsap.TweenVars = { opacity: 0 };
      const distance = 30;

      switch (direction) {
        case 'left':
          fromVars.x = -distance;
          break;
        case 'right':
          fromVars.x = distance;
          break;
        case 'up':
          fromVars.y = distance;
          break;
        case 'down':
          fromVars.y = -distance;
          break;
      }

      return gsap.fromTo(
        element,
        fromVars,
        {
          x: 0,
          y: 0,
          opacity: 1,
          duration: animationConfigs[animationLevel].duration,
          ease: animationConfigs[animationLevel].ease,
        }
      );
    },

    staggerReveal: (elements: gsap.TweenTarget) => {
      return gsap.fromTo(
        elements,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: animationConfigs[animationLevel].duration,
          ease: animationConfigs[animationLevel].ease,
          stagger: animationConfigs[animationLevel].stagger,
        }
      );
    },

    timeline: (options?: gsap.TimelineVars) => {
      return gsap.timeline({
        defaults: {
          ease: animationConfigs[animationLevel].ease,
          duration: animationConfigs[animationLevel].duration,
        },
        ...options,
      });
    },
  };
}

export { gsap, ScrollTrigger };

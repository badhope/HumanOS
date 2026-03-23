# HumanOS Architecture

**Version:** 2.0.0
**Last Updated:** 2024-03-23
**Status:** Current

---

## 📋 Table of Contents

1. [System Overview](#system-overview)
2. [Architecture Principles](#architecture-principles)
3. [Technology Stack](#technology-stack)
4. [Application Structure](#application-structure)
5. [Component Architecture](#component-architecture)
6. [State Management](#state-management)
7. [Data Flow](#data-flow)
8. [Routing](#routing)
9. [Styling Strategy](#styling-strategy)
10. [Animation System](#animation-system)
11. [Performance Optimization](#performance-optimization)
12. [Accessibility](#accessibility)
13. [Future Architecture](#future-architecture)

---

## System Overview

HumanOS is a pure frontend application designed for personality assessment and psychological evaluation. The architecture prioritizes:

- **Performance**: Fast initial load and smooth interactions
- **Maintainability**: Clean code structure and TypeScript type safety
- **Scalability**: Modular component design for easy feature addition
- **Privacy**: All data stored locally in browser

### High-Level Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                        Browser                               │
├──────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────┐    │
│  │                  React Application                    │    │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │    │
│  │  │   Pages     │  │ Components  │  │   Store     │  │    │
│  │  │  (Routes)   │  │  (UI/3D)   │  │ (Zustand)   │  │    │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  │    │
│  │         │                │                │          │    │
│  │         └────────────────┼────────────────┘          │    │
│  │                          ▼                            │    │
│  │  ┌─────────────────────────────────────────────────┐  │    │
│  │  │              Types / Utils / Data               │  │    │
│  │  └─────────────────────────────────────────────────┘  │    │
│  └─────────────────────────────────────────────────────┘    │
│                            │                                  │
│                            ▼                                  │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              LocalStorage (Browser)                   │    │
│  │  - User Profile                                      │    │
│  │  - Completed Assessments                             │    │
│  │  - Preferences                                       │    │
│  └─────────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────────┘
```

---

## Architecture Principles

### 1. Single Responsibility Principle

Each module, component, and function has a single, well-defined purpose.

```
✅ Good: AssessmentCard.tsx - renders a single assessment card
❌ Bad: AssessmentCardWithResults.tsx - handles too many concerns
```

### 2. Dependency Direction

```
UI Components → Hooks → Store → Types
                    ↓
               Utils/Functions
```

### 3. Composition Over Inheritance

Use React composition patterns for component reuse:

```tsx
// Composition Example
<Card>
  <Card.Header>Title</Card.Header>
  <Card.Body>Content</Card.Body>
  <Card.Footer>Actions</Card.Footer>
</Card>
```

### 4. Immutability

Never mutate state directly. Always create new objects/arrays:

```tsx
// ✅ Good - Creates new array
setItems([...items, newItem])

// ❌ Bad - Mutates existing array
items.push(newItem)
```

---

## Technology Stack

### Core Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.x | UI framework |
| TypeScript | 5.x | Type safety |
| Vite | 5.x | Build tool & dev server |

### State & Data

| Technology | Version | Purpose |
|------------|---------|---------|
| Zustand | 4.x | Lightweight state management |
| React Router | 6.x | Client-side routing |

### UI & Animations

| Technology | Version | Purpose |
|------------|---------|---------|
| Tailwind CSS | 3.x | Utility-first styling |
| Framer Motion | 10.x | Declarative animations |
| Three.js | 0.158.x | 3D background graphics |
| @react-three/fiber | 8.x | React renderer for Three.js |
| @react-three/drei | 9.x | Useful helpers for R3F |
| Recharts | 2.x | Charting library |
| Lucide React | 0.294.x | Icon library |

### Utilities

| Technology | Version | Purpose |
|------------|---------|---------|
| clsx | 2.x | ClassName utility |
| tailwind-merge | 2.x | Tailwind class merging |
| canvas-confetti | 1.9.x | Confetti effects |
| @use-gesture | 10.x | Touch/mouse gestures |
| lenis | 1.0.x | Smooth scrolling |
| gsap | 3.12.x | Animation library |

---

## Application Structure

### Directory Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Base UI components (future)
│   ├── AssessmentCard.tsx
│   ├── AssessmentCard3D.tsx
│   ├── Background3D.tsx
│   ├── Footer.tsx
│   ├── Layout.tsx
│   ├── ModeSelector.tsx
│   ├── Navbar.tsx
│   ├── ParticleBackground.tsx
│   └── TypingEffect.tsx
│
├── pages/               # Route page components
│   ├── Home.tsx         # Landing page with assessment list
│   ├── Assessment.tsx  # Assessment taking interface
│   ├── Results.tsx      # Results visualization
│   ├── Dashboard.tsx   # User history & profile
│   ├── About.tsx        # About page
│   └── Intro.tsx        # Splash/intro page
│
├── data/                # Static data
│   └── assessments.ts   # Assessment definitions & calculators
│
├── store/               # Zustand state management
│   └── index.ts         # Main store definition
│
├── types/               # TypeScript definitions
│   └── index.ts         # All type definitions
│
├── utils/               # Utility functions
│   └── cn.ts            # ClassName merger utility
│
├── hooks/               # Custom React hooks (future)
│
├── App.tsx              # Root component with routing
├── main.tsx             # Entry point
└── index.css            # Global styles & Tailwind
```

### File Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| Components | PascalCase | `AssessmentCard.tsx` |
| Pages | PascalCase | `Home.tsx` |
| Hooks | camelCase + use prefix | `useAuth.ts` |
| Utils | camelCase | `cn.ts` |
| Types | PascalCase or singular noun | `types/index.ts` |
| Constants | SCREAMING_SNAKE_CASE | `MAX_QUESTIONS` |

---

## Component Architecture

### Component Hierarchy

```
App
├── Layout
│   ├── Navbar
│   │   └── NavItem (multiple)
│   ├── Background3D
│   ├── ParticleBackground
│   ├── Footer
│   └── main (page content)
│       ├── Home
│       │   └── AssessmentCard3D (multiple)
│       ├── Assessment
│       │   └── ModeSelector
│       ├── Results
│       │   ├── RadarChart
│       │   └── BarChart
│       ├── Dashboard
│       │   └── AssessmentHistory
│       └── About
└── Intro (overlay)
```

### Component Patterns

#### Container/Presentational Pattern

```tsx
// Presentational Component
interface CardProps {
  title: string
  content: string
}

const Card: React.FC<CardProps> = ({ title, content }) => (
  <div className="p-4 rounded-lg">
    <h3>{title}</h3>
    <p>{content}</p>
  </div>
)

// Container Component
const CardContainer: React.FC = () => {
  const data = useFetchData()
  return (
    <Card
      title={data.title}
      content={data.content}
    />
  )
}
```

#### Compound Components Pattern

```tsx
// Compound Component
interface TabsProps {
  children: React.ReactNode
}

interface TabItemProps {
  label: string
  children: React.ReactNode
}

const Tabs: React.FC<TabsProps> & { Item: React.FC<TabItemProps> } = ({ children }) => {
  const [active, setActive] = useState(0)
  return <div>{children}</div>
}

Tabs.Item = ({ children }) => <div>{children}</div>
```

### Component Quality Checklist

- [ ] Has proper TypeScript props interface
- [ ] Handles all edge cases (empty, loading, error)
- [ ] Is accessible (ARIA labels, keyboard navigation)
- [ ] Is performant (memoized where needed)
- [ ] Has consistent error boundaries

---

## State Management

### Zustand Store Structure

```typescript
// src/store/index.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserProfile {
  id: string
  name: string
  avatar?: string
  assessments: string[]
  createdAt: Date
  updatedAt: Date
}

interface CompletedAssessment {
  assessmentId: string
  completedAt: Date
  result: AssessmentResult
  answers: Answer[]
}

interface StoreState {
  // User
  user: UserProfile | null
  setUser: (user: UserProfile) => void
  updateUserName: (name: string) => void

  // Assessments
  completedAssessments: CompletedAssessment[]
  addCompletedAssessment: (assessment: CompletedAssessment) => void
  deleteAssessment: (id: string) => void

  // UI
  theme: 'dark' | 'light'
  language: 'en' | 'zh'
  setTheme: (theme: 'dark' | 'light') => void
  setLanguage: (lang: 'en' | 'zh') => void
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      // Initial state
      user: null,
      completedAssessments: [],
      theme: 'dark',
      language: 'en',

      // Actions
      setUser: (user) => set({ user }),
      updateUserName: (name) => set((state) => ({
        user: state.user ? { ...state.user, name, updatedAt: new Date() } : null
      })),

      addCompletedAssessment: (assessment) => set((state) => ({
        completedAssessments: [...state.completedAssessments, assessment]
      })),

      deleteAssessment: (id) => set((state) => ({
        completedAssessments: state.completedAssessments.filter(a => a.assessmentId !== id)
      })),

      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
    }),
    {
      name: 'human-os-storage',
      partialize: (state) => ({
        user: state.user,
        completedAssessments: state.completedAssessments,
        theme: state.theme,
        language: state.language,
      }),
    }
  )
)
```

### When to Use Store vs. Local State

| Use Store When | Use Local State When |
|----------------|---------------------|
| Multiple components need access | Only one component uses it |
| Data persists across pages | Data is page-specific |
| Data shared between page navigations | Data resets on page change |
| Complex derived state | Simple UI state (modals, toggles) |

---

## Data Flow

### Assessment Flow

```
User Selects Assessment
         │
         ▼
┌─────────────────┐
│  ModeSelector   │ (Standard / Hard / Expert)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Question Loop   │ ◄─── User answers questions
│  - Display Q    │
│  - Record Answer │
│  - Next/Prev    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Submit        │ (Collect all answers)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ resultCalculator│ (Compute results)
│  (assessments.ts│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Save to Store   │ (LocalStorage)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Results Page   │ (Visualize results)
└─────────────────┘
```

### Data Types

```typescript
// Assessment Definition
interface Assessment {
  id: string
  title: string
  description: string
  category: string
  difficulty: 'lite' | 'standard' | 'expert'
  duration: number
  questions: Question[]
  resultCalculator: (answers: Answer[]) => AssessmentResult
}

// Question
interface Question {
  id: string
  text: string
  type: 'single' | 'multiple' | 'scale'
  options: Option[]
  category?: string
}

// Answer
interface Answer {
  questionId: string
  selectedOptions: string[]
  value?: number
  trait?: string
}

// Result
interface AssessmentResult {
  type: string
  title: string
  description: string
  traits: TraitScore[]
  details: {
    strengths: string[]
    weaknesses: string[]
    careers: string[]
    relationships: string
  }
  scores: Record<string, number>
}
```

---

## Routing

### Route Structure

```tsx
// App.tsx
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'assessment/:id', element: <Assessment /> },
      { path: 'results/:id', element: <Results /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'about', element: <About /> },
    ],
  },
])
```

### Route Transitions

All route transitions use Framer Motion's AnimatePresence:

```tsx
<AnimatePresence mode="wait">
  <Routes location={location} key={location.pathname}>
    <Route path="/" element={<Home />} />
    {/* ... */}
  </Routes>
</AnimatePresence>
```

---

## Styling Strategy

### Tailwind CSS Configuration

```javascript
// tailwind.config.js
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#8B5CF6',    // Violet-500
        secondary: '#EC4899',  // Pink-500
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
    },
  },
  plugins: [],
}
```

### Custom Utilities

```typescript
// src/utils/cn.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}
```

### Design Tokens

```css
/* src/index.css */
@layer base {
  :root {
    --color-primary: 139 92 246;    /* RGB for alpha */
    --color-secondary: 236 72 153;
    --color-background: 15 23 42;
  }
}

@layer utilities {
  .glass {
    @apply bg-white/5 backdrop-blur-xl border border-white/10;
  }

  .text-gradient {
    @apply bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-pink-500;
  }
}
```

---

## Animation System

### Animation Libraries Used

| Library | Use Case |
|---------|----------|
| Framer Motion | Page transitions, interactions |
| Three.js + R3F | 3D background |
| GSAP | Complex sequenced animations |
| CSS Transitions | Simple hover effects |
| canvas-confetti | Celebration effects |

### Animation Patterns

#### Page Transitions

```tsx
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

<motion.div
  variants={pageVariants}
  initial="initial"
  animate="animate"
  exit="exit"
  transition={{ duration: 0.3 }}
>
  {children}
</motion.div>
```

#### 3D Card Effect

```tsx
const rotateX = useSpring(0, { stiffness: 300, damping: 30 })
const rotateY = useSpring(0, { stiffness: 300, damping: 30 })

const handleMouseMove = (e) => {
  const { clientX, clientY, currentTarget } = e
  const { width, height, left, top } = currentTarget.getBoundingClientRect()

  const x = clientX - left
  const y = clientY - top

  rotateY.set(((x - width / 2) / width) * 12)
  rotateX.set(-((y - height / 2) / height) * 12)
}
```

### Animation Performance

- Use `transform` and `opacity` for animations (GPU accelerated)
- Avoid animating `width`, `height`, `top`, `left`
- Use `will-change` sparingly
- Consider `prefers-reduced-motion` for accessibility

---

## Performance Optimization

### Bundle Optimization

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          charts: ['recharts'],
          three: ['three', '@react-three/fiber', '@react-three/drei'],
        },
      },
    },
  },
})
```

### Code Splitting

```tsx
// Lazy load pages
const Results = lazy(() => import('./pages/Results'))
const Dashboard = lazy(() => import('./pages/Dashboard'))

<Suspense fallback={<Loading />}>
  <Routes>
    <Route path="/results/:id" element={<Results />} />
  </Routes>
</Suspense>
```

### Image Optimization

- Use WebP format where supported
- Lazy load images below the fold
- Use `srcSet` for responsive images
- Optimize SVG icons

### Performance Targets

| Metric | Target |
|--------|--------|
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Time to Interactive | < 3.0s |
| Cumulative Layout Shift | < 0.1 |
| Lighthouse Score | > 90 all categories |

---

## Accessibility

### WCAG 2.1 Compliance

- [ ] **Perceivable**: Alt text, sufficient contrast, resizable text
- [ ] **Operable**: Keyboard navigation, focus indicators, skip links
- [ ] **Understandable**: Clear labels, error messages, consistent navigation
- [ ] **Robust**: Valid HTML, ARIA where needed, works with screen readers

### Keyboard Navigation

```tsx
// Focus trap for modals
const Modal: React.FC = ({ isOpen, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab') {
        // Trap focus within modal
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  return <div ref={modalRef}>{children}</div>
}
```

### Color Contrast

Minimum contrast ratios:
- Normal text: 4.5:1
- Large text: 3:1
- UI components: 3:1

---

## Future Architecture

### Planned Enhancements

#### 1. Internationalization (i18n)

```typescript
// Future i18n structure
src/
├── i18n/
│   ├── en.json
│   ├── zh.json
│   └── index.ts
```

#### 2. Testing Infrastructure

```typescript
// Future test structure
src/
├── __tests__/
│   ├── components/
│   ├── pages/
│   └── utils/
├── setupTests.ts
```

#### 3. Modular Assessment Framework

```typescript
// Future assessment module
interface AssessmentModule {
  id: string
  name: string
  version: string
  questions: Question[]
  resultCalculator: Calculator
  translations: Record<string, Translation>
}
```

---

## Contributing

For contribution guidelines, see [CONTRIBUTING.md](./CONTRIBUTING.md).

---

## License

MIT License - see [LICENSE](./LICENSE)

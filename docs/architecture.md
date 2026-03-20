# HumanOS Architecture

## Overview

HumanOS is a static web application for personality and psychological assessments. It features a JSON-based extensible question bank system, local-first data storage, and a component-based architecture.

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | React 18 + TypeScript |
| Build Tool | Vite 5 |
| Routing | React Router v6 (HashRouter) |
| State Management | Zustand |
| Database | Dexie (IndexedDB wrapper) |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Charts | Recharts |
| Icons | Lucide React |
| Deployment | GitHub Pages (Static) |

## Project Structure

```
HumanOS/
├── public/
│   ├── assessments/           # JSON question banks
│   │   ├── family-registry.json
│   │   ├── personality/
│   │   │   └── mbti/
│   │   ├── psychology/
│   │   │   ├── stress/
│   │   │   └── resilience/
│   │   ├── cognition/
│   │   │   ├── logic/
│   │   │   └── focus/
│   │   ├── ideology/
│   │   │   └── values/
│   │   └── career/
│   │       ├── holland/
│   │       └── work-style/
│   └── fonts/
├── src/
│   ├── components/
│   │   ├── 3d/                # Three.js components
│   │   ├── atoms/             # Base UI components
│   │   ├── molecules/         # Composite components
│   │   └── organisms/         # Complex components
│   ├── pages/                 # Route pages
│   ├── features/              # Feature modules
│   ├── store/                 # Zustand stores
│   ├── services/              # Business logic
│   ├── shared/
│   │   ├── types/             # TypeScript definitions
│   │   └── utils/             # Utility functions
│   ├── hooks/                 # Custom React hooks
│   └── App.tsx                # Main app with routes
├── docs/                      # Developer documentation
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Routing Architecture

Routes use HashRouter for GitHub Pages compatibility:

| Path | Component | Description |
|------|-----------|-------------|
| `#/` | Home | Landing page |
| `#/categories` | Categories | Assessment categories |
| `#/assessments/:category` | AssessmentList | Assessments in category |
| `#/quiz/:assessmentId` | Quiz | Take assessment |
| `#/results/:assessmentId` | Results | View results |
| `#/profile` | Profile | User data center |
| `#/maintenance` | Maintenance | Maintenance status |
| `#/preparing` | Preparing | Preparing status |
| `#/empty` | Empty | No content status |
| `#/error` | ErrorPage | Error status |
| `#/unavailable` | Unavailable | Unavailable status |
| `#/*` | NotFound | 404 page |

## State Management

### Settings Store (Zustand)

```typescript
interface SettingsStore {
  theme: 'light' | 'dark' | 'system';
  fontSize: number;
  animationLevel: 'none' | 'minimal' | 'full';
  reducedMotion: boolean;
  setTheme: (theme: Theme) => void;
  setFontSize: (size: number) => void;
  setAnimationLevel: (level: AnimationLevel) => void;
}
```

### Quiz Store (Zustand)

```typescript
interface QuizStore {
  currentAssessment: Assessment | null;
  questions: Question[];
  answers: Record<string, string>;
  currentIndex: number;
  isComplete: boolean;
  startQuiz: (assessmentId: string) => Promise<void>;
  answerQuestion: (questionId: string, value: string) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  submitQuiz: () => Promise<void>;
}
```

## Data Layer

### IndexedDB Schema (Dexie)

```typescript
const db = new Dexie('HumanOS');
db.version(1).stores({
  profiles: '++id, assessmentId, completedAt',
  drafts: '++id, assessmentId, updatedAt',
  settings: 'key',
});
```

### Local Storage

- Theme preference
- Font size
- Animation level
- Draft auto-save

## Module System

### Assessment Loading

1. Registry loads `family-registry.json`
2. Family info displayed on AssessmentList
3. User selects version (Lite/Standard/Expert)
4. Quiz page loads specific version JSON
5. Questions rendered based on type

### Family Structure

```json
{
  "familyId": "mbti",
  "familyName": "MBTI 职业性格测试",
  "category": "personality",
  "versions": [
    {
      "level": "standard",
      "name": "MBTI 标准版",
      "questionCount": 32,
      "recommended": true,
      "status": "active"
    }
  ]
}
```

### Version Status

| Status | Meaning | User Experience |
|--------|---------|------------------|
| `active` | Fully available | Can take assessment |
| `preparing` | Being developed | Shows preparing page |
| `maintenance` | Under maintenance | Shows maintenance page |

## Component Hierarchy

```
App
├── ImmersiveBackground (3D)
└── Routes
    ├── Home
    ├── Categories
    ├── AssessmentList
    │   └── AssessmentCard
    ├── Quiz
    │   ├── Question
    │   └── ProgressBar
    ├── Results
    │   ├── RadarChart
    │   └── DimensionCard
    ├── Profile
    └── Status Pages
        ├── Maintenance
        ├── Preparing
        ├── Empty
        ├── Error
        └── Unavailable
```

## Extension Points

### Adding New Assessment Family

1. Create `public/assessments/:category/:family/lite.json`
2. Create `standard.json` and `expert.json`
3. Update `family-registry.json`
4. Add icon/color to registry entry

### Adding New Question Type

1. Add type to `shared/types/assessment.ts`
2. Update quiz scoring logic in `features/assessment/`
3. Add rendering component if needed

### Adding New Result Visualization

1. Add dimension to assessment JSON
2. Update Results page component
3. Add chart component in `components/`

## Deployment

The app builds to static files and deploys to GitHub Pages:

```bash
npm run build  # Creates dist/ folder
```

GitHub Actions workflow handles deployment automatically on push to main branch.

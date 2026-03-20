# HumanOS

English | [中文](./README.zh-CN.md)

---

## Project Name

**HumanOS** - A Self-Discovery Assessment Platform

## One-line Introduction

A static web platform for personality, psychological, cognitive, and career assessment with an extensible JSON-based question bank system featuring Lite/Standard/Expert versions.

## Current Version

**v1.1.0** - Multi-Module Versioning Release (2026-03-21)

---

## What is Currently Available

### Primary Module (Fully Functional)

| Assessment | Versions | Status |
|------------|----------|--------|
| MBTI Career Personality Test | Lite(12) / Standard(32) / Expert(64) | ✅ Complete |

### Available Modules (Versioned)

| Assessment | Category | Versions | Status |
|------------|----------|----------|--------|
| Stress Check | psychology | Lite(10) / Standard(20) / Expert(36) | ✅ Active |
| Resilience Assessment | psychology | Lite(10) / Standard(20) / Expert(32) | ✅ Active |
| Logic Assessment | cognition | Lite(8) / Standard(15) / Expert(24) | ✅ Active |
| Focus & Thinking Style | cognition | Lite(10) / Standard(20) / Expert(30) | ✅ Active |
| Values Spectrum | ideology | Lite(12) / Standard(24) / Expert(36) | ✅ Active |
| Holland Career Interest | career | Lite(18) / Standard(36) / Expert(54) | ✅ Active |
| Work Style Preference | career | Lite(12) / Standard(24) / Expert(36) | ✅ Active |

---

## Core Features

- **Dynamic Assessment Loading** - Extensible JSON-based question bank system
- **Family + Version Architecture** - Each assessment has Lite/Standard/Expert versions
- **Multiple Assessment Types** - Single-choice, multiple-choice, Likert scale, ranking
- **Local-First Data** - All data stored in browser IndexedDB/localStorage
- **Responsive Design** - Mobile-friendly with dark mode support
- **3D Visual Experience** - Three.js immersive background effects
- **Smooth Animations** - Framer Motion powered with configurable levels
- **Multi-Dimensional Analysis** - Radar charts, bar charts, distribution visualization
- **5 Assessment Categories** - Personality, Psychology, Cognition, Ideology, Career
- **Quiz Draft Auto-Save** - Progress automatically saved and restorable
- **Personal Data Center** - History records, drafts management, settings center
- **Unified Status Pages** - Maintenance, Preparing, Empty, Error, Unavailable

---

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | React 18 + TypeScript |
| Build Tool | Vite 5 |
| Routing | React Router v6 (HashRouter) |
| State Management | Zustand |
| Database | Dexie (IndexedDB wrapper) |
| Styling | Tailwind CSS |
| Animations | Framer Motion + Three.js |
| Charts | Recharts |
| Icons | Lucide React |
| Deployment | GitHub Pages (Static) |

---

## Project Structure

```
HumanOS/
├── public/
│   └── assessments/
│       ├── family-registry.json    # Assessment family registry
│       ├── personality/
│       │   └── mbti/              # MBTI family with versions
│       ├── psychology/
│       │   ├── stress/            # Stress assessment
│       │   └── resilience/        # Resilience assessment
│       ├── cognition/
│       │   ├── logic/             # Logic assessment
│       │   └── focus/             # Focus assessment
│       ├── ideology/
│       │   └── values/            # Values assessment
│       └── career/
│           ├── holland/            # Holland career assessment
│           └── work-style/         # Work style assessment
├── src/
│   ├── components/
│   │   ├── 3d/                    # Three.js components
│   │   ├── atoms/                 # Base UI components
│   │   ├── molecules/             # Composite components
│   │   │   └── StatusPageTemplate.tsx  # Unified status page
│   │   └── organisms/             # Complex components
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Categories.tsx
│   │   ├── AssessmentList.tsx
│   │   ├── Quiz.tsx
│   │   ├── Results.tsx
│   │   ├── Profile.tsx
│   │   ├── Maintenance.tsx
│   │   ├── Preparing.tsx
│   │   ├── Empty.tsx
│   │   ├── ErrorPage.tsx
│   │   ├── Unavailable.tsx
│   │   └── NotFound.tsx
│   ├── features/
│   │   └── assessment/
│   ├── store/
│   │   ├── quizStore.ts
│   │   └── settingsStore.ts
│   ├── shared/
│   │   └── types/
│   └── App.tsx
├── docs/
│   ├── architecture.md         # System architecture
│   ├── content-system.md       # Question bank system
│   └── developer-guide.md      # Developer documentation
├── package.json
└── vite.config.ts
```

---

## Documentation

| Document | Description |
|----------|-------------|
| [Architecture](./docs/architecture.md) | System architecture and design |
| [Content System](./docs/content-system.md) | Question bank format and versioning |
| [Developer Guide](./docs/developer-guide.md) | How to extend the platform |

---

## Local Development

### Prerequisites

- Node.js 18+
- npm 9+

### Setup

```bash
# Clone repository
git clone https://github.com/badhope/HumanOS.git
cd HumanOS

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript type check |

---

## Data & Storage

All data is stored locally in the browser:

- **IndexedDB (Dexie)**: Assessment results, profiles, drafts
- **localStorage**: User settings (theme, font size, animations)

No backend required - data persists in the browser.

---

## Routing

Routes use HashRouter for GitHub Pages compatibility:

| Route | Page |
|-------|------|
| `#/` | Home |
| `#/categories` | Categories |
| `#/assessments/:category` | Assessment List |
| `#/quiz/:assessmentId` | Quiz |
| `#/results/:assessmentId` | Results |
| `#/profile` | Profile |
| `#/maintenance` | Maintenance |
| `#/preparing` | Preparing |
| `#/empty` | Empty |
| `#/error` | Error |
| `#/unavailable` | Unavailable |
| `#/*` | NotFound |

---

## License

MIT

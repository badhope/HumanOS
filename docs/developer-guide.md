# Developer Guide

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Setup

```bash
# Clone repository
git clone https://github.com/your-username/HumanOS.git
cd HumanOS

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Project Structure Overview

```
HumanOS/
├── public/
│   └── assessments/           # JSON question banks
├── src/
│   ├── components/            # React components
│   │   ├── atoms/            # Button, Card, etc.
│   │   ├── molecules/        # PageTransition, StatusPageTemplate
│   │   └── organisms/         # Complex components
│   ├── pages/                # Route pages
│   ├── features/             # Feature modules
│   ├── store/                # Zustand stores
│   ├── services/             # Business logic
│   ├── shared/
│   │   ├── types/            # TypeScript definitions
│   │   └── utils/            # Utility functions
│   └── hooks/                # Custom React hooks
└── docs/                     # Documentation
```

## Architecture Overview

### Routing

The app uses React Router v6 with HashRouter for GitHub Pages compatibility.

Main routes are defined in `src/App.tsx`. See [architecture.md](./architecture.md) for full route list.

### State Management

Uses Zustand for state management:

- `settingsStore` - User preferences (theme, font size, animations)
- `quizStore` - Current quiz state (questions, answers, progress)

### Data Persistence

- **IndexedDB (via Dexie)**: Assessment results, profiles, drafts
- **localStorage**: User settings (theme, font size)

## Adding New Features

### Adding a New Assessment Family

#### 1. Create Question Bank Files

Create directory: `public/assessments/:category/:family/`

Create `standard.json` (required), plus `lite.json` and `expert.json` (optional but recommended).

Example: `public/assessments/psychology/stress/standard.json`

```json
{
  "id": "stress-standard",
  "slug": "stress-standard",
  "familyId": "stress-check",
  "familyName": "压力指数评估",
  "category": "psychology",
  "versionLevel": "standard",
  "dimensions": [...],
  "questions": [...],
  "resultProfiles": [...]
}
```

#### 2. Update Family Registry

Edit `public/assessments/family-registry.json`:

```json
{
  "familyId": "stress-check",
  "familyName": "压力指数评估",
  "category": "psychology",
  "versions": [
    {
      "level": "standard",
      "name": "压力评估 标准版",
      "questionCount": 20,
      "recommended": true,
      "status": "active"
    }
  ]
}
```

#### 3. Add to Category

The assessment will automatically appear in the correct category based on the `category` field.

### Adding a New Page

#### 1. Create Component

Create file in `src/pages/`:

```tsx
// src/pages/NewPage.tsx
import { FC } from 'react';
import { PageTransition } from '@/components/molecules';

const NewPage: FC = () => {
  return (
    <PageTransition>
      <div>
        {/* Page content */}
      </div>
    </PageTransition>
  );
};

export default NewPage;
```

#### 2. Add Route

Edit `src/App.tsx`:

```tsx
import { lazy } from 'react';
const NewPage = lazy(() => import('@/pages/NewPage'));

// In Routes:
<Route path="/new-page" element={<NewPage />} />
```

### Adding a New UI Component

#### 1. Determine Component Type

- **Atom**: Basic building block (Button, Input, Badge)
- **Molecule**: Composed of atoms (AssessmentCard, PageTransition)
- **Organism**: Complex component (ResultsChart, QuizPlayer)

#### 2. Create File

Atoms: `src/components/atoms/NewAtom.tsx`
Molecules: `src/components/molecules/NewMolecule.tsx`

#### 3. Use Existing Patterns

Check existing components for patterns:

```tsx
// Atoms follow this pattern
import { forwardRef } from 'react';
import { cn } from '@/shared/utils/cn';

interface NewAtomProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

export const NewAtom = forwardRef<HTMLButtonElement, NewAtomProps>(
  ({ className, variant = 'primary', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'base-classes',
          variant === 'primary' && 'variant-classes',
          className
        )}
        {...props}
      />
    );
  }
);
```

### Adding New Question Types

#### 1. Update Types

Edit `src/shared/types/assessment.ts`:

```typescript
export type QuestionType =
  | 'single-choice'
  | 'multiple-choice'
  | 'likert-5'
  | 'likert-7'
  | 'ranking'
  | 'your-new-type';  // Add new type
```

#### 2. Update Quiz Component

Edit the quiz rendering logic in `src/pages/Quiz.tsx` or `src/features/assessment/`.

## Common Tasks

### Modifying Styles

Styles use Tailwind CSS. Check `tailwind.config.js` for custom theme extensions.

```tsx
// Using Tailwind classes
<div className="bg-primary-500 text-white p-4 rounded-lg">
  Styled content
</div>

// Using custom colors
<div className="bg-brand-primary text-brand-secondary">
  Branded content
</div>
```

### Adding Animations

Uses Framer Motion for animations:

```tsx
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Animated content
</motion.div>
```

### Using the Status Page Template

For consistent status pages:

```tsx
import { StatusPageTemplate } from '@/components/molecules/StatusPageTemplate';

<StatusPageTemplate
  icon={<SomeIcon className="h-10 w-10" />}
  title="Page Title"
  description="Description text"
  statusType="preparing"
  primaryAction={{
    label: 'Action Label',
    onClick: () => { /* action */ },
  }}
/>
```

## Testing

```bash
# Run type checking
npm run typecheck

# Run linting
npm run lint

# Build for production
npm run build
```

## Deployment

The app deploys to GitHub Pages via GitHub Actions. On push to main branch:

1. `npm run build` creates production build
2. `dist/` folder is deployed to GitHub Pages

## Troubleshooting

### Build Errors

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Type Errors

Run `npm run typecheck` to see detailed error messages.

### Not Seeing Changes

- Hard refresh the browser (Ctrl+Shift+R)
- Clear localStorage/IndexedDB if data is cached

## Code Style

- Use TypeScript for all new code
- Follow existing component patterns
- Use Tailwind for styling (no custom CSS unless necessary)
- Keep components small and focused
- Document complex logic with comments

## Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)
- [Zustand](https://zustand.docs.pmnd.rs)
- [Dexie](https://dexie.org)

# Contributing to MindMirror

Thank you for your interest in contributing to MindMirror! This document provides guidelines and instructions for contributing.

## 🐛 Bug Reports

Before submitting a bug report:

- Search existing issues to avoid duplicates
- Use the [Bug Report template](.github/ISSUE_TEMPLATE/bug_report.yml)
- Include browser/OS information
- Provide steps to reproduce and expected vs actual behavior
- If possible, provide a minimal reproducible example

## 💡 Feature Requests

We welcome feature requests! Please:

- Search existing issues and PRs first
- Use the [Feature Request template](.github/ISSUE_TEMPLATE/feature_request.yml)
- Clearly describe the problem you're solving
- Explain why this feature would benefit the project

## 🔧 Development Setup

### Prerequisites

- Node.js ≥ 18.0.0
- npm ≥ 9.0.0

### Local Development

```bash
# Clone the repository
git clone https://github.com/badhope/MindMirror.git
cd MindMirror

# Install dependencies
npm install

# Start development server
npm run dev

# Run type checking
npm run typecheck

# Run linter
npm run lint

# Build for production
npm run build
```

### Project Structure

```
MindMirror/
├── src/
│   ├── components/    # Reusable UI components
│   │   └── animations/  # Framer Motion animation utilities
│   ├── data/         # Assessment question data (JSON/TS)
│   ├── hooks/        # Custom React hooks
│   ├── i18n/         # Translation files (en.ts, zh.ts)
│   ├── lib/          # Client utilities (Supabase, utils)
│   ├── pages/        # Route page components
│   ├── services/     # Business logic (scoring algorithms)
│   ├── store/        # Zustand state management
│   └── types/        # TypeScript type definitions
├── api/              # Express.js API routes
├── supabase/         # Database migrations
└── tests/            # Unit tests
```

## 🌐 Internationalization (i18n)

MindMirror supports English and Chinese. When adding new features:

1. Add translation keys to both `src/i18n/en.ts` AND `src/i18n/zh.ts`
2. Use the `t()` helper function from `../i18n`
3. All user-facing text must be translated

```typescript
import { t } from '../i18n';

// Usage
t(locale, 'section.key', { param: value })
```

## 📐 Code Style

- **Formatting**: ESLint + Prettier (automated via `npm run lint`)
- **TypeScript**: Strict mode enabled, no `any` types
- **Commits**: Conventional Commits format

```
<type>(<scope>): <description>

Types: feat, fix, docs, style, refactor, test, chore
Scope: auth, scoring, i18n, assessment, etc.
```

Examples:
- `feat(i18n): add Portuguese language support`
- `fix(scoring): correct T-score calculation for stress test`
- `docs(assessments): update Big Five description text`

## 🧪 Testing

### Scoring Logic Tests

Tests for assessment scoring algorithms are in `tests/`:

```bash
# Run tests
npx vitest run

# Run tests in watch mode
npx vitest
```

### Writing Tests

When adding new assessment scoring:

```typescript
describe('Big Five Scoring', () => {
  it('should calculate correct O score', () => {
    const result = calculateBigFiveScores(answers, questions);
    expect(result[0].score).toBe(expectedScore);
  });
});
```

## 📋 Pull Request Process

1. **Fork & Branch**: Create a feature branch from `main`
   ```bash
   git checkout -b feature/your-feature-name
   git checkout -b fix/bug-description
   ```

2. **Development**: Make your changes with passing tests

3. **Type Check & Lint**: Ensure clean code
   ```bash
   npm run typecheck
   npm run lint
   ```

4. **Commit**: Use conventional commits format

5. **Push & PR**: Open a Pull Request against `main`
   - Fill in the PR template completely
   - Link related issues with `Closes #123` or `Refs #456`
   - Request review from maintainers

6. **Review**: Address any feedback from maintainers

## 🧭 Assessment Development Guide

### Adding a New Assessment

1. **Create question data** in `src/data/`:
   ```typescript
   // src/data/myAssessmentData.ts
   export const myAssessmentData = {
     id: 'my-assessment',
     title: { en: 'My Assessment', zh: '我的测评' },
     questions: [
       {
         id: 'q1',
         text: { en: 'Question text', zh: '问题文本' },
         options: [...],
         reverse: false,
       }
     ],
   };
   ```

2. **Create scoring service** in `src/services/`:
   ```typescript
   // src/services/myAssessmentScoring.ts
   export function calculateMyAssessmentScores(answers, questions) {
     // Implement scoring logic
   }
   ```

3. **Add to store** in `src/store/index.ts`

4. **Add translations** in `src/i18n/en.ts` and `src/i18n/zh.ts`

5. **Add navigation** in `Sidebar.tsx` and `Home.tsx`

## 📖 Documentation

- Update README.md if adding new features
- Add inline comments for complex logic
- Document scoring algorithms with references to sources

## ⚠️ Important Notes

- **Never commit secrets**: Use `.env` for secrets, `.env.example` for templates
- **Assessment content**: Only use scientifically validated scales with proper references
- **Privacy**: All user data handling must comply with privacy best practices
- **Accessibility**: Follow WCAG 2.1 guidelines for UI components

## 🙏 Thank You

Every contribution is valuable. Thank you for making MindMirror better!

---

## 🇨🇳 中文贡献指南

欢迎为 MindMirror 做出贡献！请遵循以下指南：

- 使用英文提交信息（Conventional Commits）
- 文档使用中英双语
- 所有用户可见文本必须翻译
- 遵循上述 Pull Request 流程

如有问题，可以在 [GitHub Issues](https://github.com/badhope/MindMirror/issues) 中提出。

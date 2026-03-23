# HumanOS Reborn

<!-- Badges -->
<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Build Status](https://github.com/badhope/HumanOS/actions/workflows/ci.yml/badge.svg)](https://github.com/badhope/HumanOS/actions)
[![Code Coverage](https://codecov.io/gh/badhope/HumanOS/branch/main/graph/badge.svg)](https://codecov.io/gh/badhope/HumanOS)
[![GitHub stars](https://img.shields.io/github/stars/badhope/HumanOS?style=social)](https://github.com/badhope/HumanOS/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/badhope/HumanOS?style=social)](https://github.com/badhope/HumanOS/network)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

<!-- Animated Logo Placeholder -->
![HumanOS Banner](https://img.shields.io/badge/HumanOS-Explore_Your_True_Self-8B5CF6?style=for-the-badge&logo=brain&logoColor=white)

**Next-Generation Personality Assessment Platform**

*[🌐 中文](./README_zh.md) • [📖 English](./README.md)*

**[Live Demo](https://badhope.github.io/HumanOS)** ·
**[Documentation](https://github.com/badhope/HumanOS/wiki)** ·
**[Contributing](CONTRIBUTING.md)** ·
**[Changelog](CHANGELOG.md)**

</div>

---

## ✨ Features

### 🎯 Core Features

| Feature | Description |
|---------|-------------|
| 📊 **30+ Assessments** | Comprehensive personality, cognitive, and psychological evaluations |
| 🎨 **Modern UI/UX** | Glassmorphism design with 3D animations and particle effects |
| 📱 **Fully Responsive** | Seamless experience across desktop, tablet, and mobile |
| 🔒 **Privacy-First** | All data stored locally - no servers, no tracking |
| ⚡ **High Performance** | Optimized for Lighthouse scores >90 in all categories |
| 🌐 **i18n Ready** | English primary, Chinese available |

### 🧪 Assessment Categories

| Category | Count | Examples |
|----------|-------|---------|
| 🧠 Personality & Psychology | 8+ | MBTI, Big Five, Anxiety, EQ |
| 💼 Career & Work | 6+ | Leadership, Teamwork, Communication |
| ❤️ Relationships | 5+ | Attachment Style, Social Skills |
| 🧩 Cognitive & Thinking | 4+ | Problem Solving, Critical Thinking |
| 🏃 Health & Lifestyle | 4+ | Stress Management, Well-being |
| 💡 Values & Philosophy | 3+ | Ethical Framework, Life Purpose |

### 🎮 Difficulty Modes

Each assessment offers three difficulty levels:

| Mode | Questions | Depth | Use Case |
|------|----------|-------|----------|
| 🟢 **Standard** | 30 | Core competencies | Quick self-check |
| 🟡 **Hard** | 60 | +30% dimensions | Comprehensive analysis |
| 🔴 **Expert** | 100 | Full spectrum | Professional assessment |

### 🛠️ Technical Stack

| Technology | Purpose |
|------------|---------|
| React 18 | UI framework |
| TypeScript 5 | Type safety |
| Vite 5 | Build tool |
| Zustand | State management |
| Framer Motion | Animations |
| Three.js | 3D backgrounds |
| Tailwind CSS | Styling |
| Recharts | Data visualization |

---

## 🚀 Quick Start

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **Browser**: Modern browsers (Chrome 90+, Firefox 90+, Safari 14+, Edge 90+)

### Installation

```bash
# Clone the repository
git clone https://github.com/badhope/HumanOS.git
cd HumanOS

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (http://localhost:5173) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |

---

## 📖 Documentation

### Project Structure

```
HumanOS/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── AssessmentCard3D.tsx
│   │   ├── Layout.tsx
│   │   ├── Navbar.tsx
│   │   ├── ParticleBackground.tsx
│   │   └── ...
│   ├── pages/            # Page components
│   │   ├── Home.tsx
│   │   ├── Assessment.tsx
│   │   ├── Results.tsx
│   │   ├── Dashboard.tsx
│   │   └── About.tsx
│   ├── data/             # Static data & configurations
│   │   └── assessments.ts
│   ├── store/            # Zustand state management
│   ├── types/            # TypeScript type definitions
│   └── utils/            # Utility functions
├── public/               # Static assets
├── .github/              # GitHub configuration
│   ├── ISSUE_TEMPLATE/   # Issue templates
│   ├── workflows/        # CI/CD pipelines
│   └── PULL_REQUEST_TEMPLATE.yml
├── docs/                 # Additional documentation
├── ARCHITECTURE.md       # System architecture
├── CONTRIBUTING.md       # Contribution guidelines
├── CODE_OF_CONDUCT.md    # Community code of conduct
├── CHANGELOG.md          # Version history
├── LICENSE               # MIT License
└── README.md             # This file
```

### Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                      App Shell                           │
│  ┌─────────────────────────────────────────────────┐   │
│  │              Layout Component                     │   │
│  │  ┌─────────┐  ┌──────────────────────────────┐   │   │
│  │  │ Navbar  │  │        Main Content          │   │   │
│  │  └─────────┘  │  ┌────────────────────────┐  │   │   │
│  │                │  │      Page Routes       │  │   │   │
│  │                │  │  Home / Assessment /   │  │   │   │
│  │                │  │  Results / Dashboard   │  │   │   │
│  │                │  └────────────────────────┘  │   │   │
│  │                └──────────────────────────────┘   │   │
│  │  ┌─────────────────────────────────────────────┐   │   │
│  │  │              Footer                          │   │   │
│  │  └─────────────────────────────────────────────┘   │   │
│  └─────────────────────────────────────────────────┘   │
│                                                          │
│  ┌─────────────────────────────────────────────────┐   │
│  │           Background Layer (Z-index: 0)           │   │
│  │   - ParticleBackground (animated particles)       │   │
│  │   - Background3D (Three.js 3D scene)              │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### State Management

```typescript
// Global State (Zustand)
interface StoreState {
  // User
  user: UserProfile | null
  setUser: (user: UserProfile) => void

  // Completed Assessments
  completedAssessments: CompletedAssessment[]
  addCompletedAssessment: (assessment: CompletedAssessment) => void
  deleteAssessment: (id: string) => void

  // UI State
  theme: 'dark' | 'light'
  language: 'en' | 'zh'
}
```

---

## 🔮 Future Roadmap

### Phase 1: Foundation (Current)
- [x] Core assessment system
- [x] 3D card animations
- [x] Particle backgrounds
- [x] Responsive design
- [x] Professional documentation

### Phase 2: Expansion (Planned)
- [ ] **Internationalization (i18n)**
  - Full Chinese translation
  - Language switcher component
  - RTL support preparation

- [ ] **Assessment Expansion**
  - 50+ total assessments
  - Career aptitude battery
  - Emotional intelligence suite
  - Relationship compatibility scores

- [ ] **UI/UX Enhancements**
  - Interactive 3D avatars
  - Animated result summaries
  - Progress tracking dashboards
  - Comparison with population norms

### Phase 3: Community (Future)
- [ ] **Question Bank System**
  - Modular assessment framework
  - Community-contributed questions
  - Quality assurance system

- [ ] **Analytics Dashboard**
  - Longitudinal tracking
  - Multi-assessment correlation
  - Export reports (PDF, JSON)

### Phase 4: Platform (Long-term)
- [ ] **White-label Solution**
  - Custom branding
  - Self-hosted deployment
  - API access

- [ ] **AI Integration**
  - GPT-powered insights
  - Personalized recommendations
  - Smart question selection

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Quick Guide

```bash
# 1. Fork the repository
# 2. Clone your fork
git clone https://github.com/YOUR_USERNAME/HumanOS.git

# 3. Create a feature branch
git checkout -b feature/amazing-feature

# 4. Make your changes
# 5. Test thoroughly
npm run build && npm run lint

# 6. Commit and push
git commit -m "feat: add amazing feature"
git push origin feature/amazing-feature

# 7. Open a Pull Request
```

### Contribution Areas

| Area | Description |
|------|-------------|
| 🧪 Assessments | Add new assessment types or questions |
| 🎨 UI/UX | Improve visual design and interactions |
| 📝 Documentation | Enhance docs, translate, add examples |
| 🐛 Bug Fixes | Fix issues and improve stability |
| ⚡ Performance | Optimize rendering and bundle size |
| 🧪 Testing | Add unit, integration, or E2E tests |

---

## 📊 Project Stats

| Metric | Value |
|--------|-------|
| ⭐ Stars | [![GitHub stars](https://img.shields.io/github/stars/badhope/HumanOS)](https://github.com/badhope/HumanOS/stargazers) |
| 🍴 Forks | [![GitHub forks](https://img.shields.io/github/forks/badhope/HumanOS)](https://github.com/badhope/HumanOS/network) |
| 🐛 Issues | [![GitHub issues](https://img.shields.io/github/issues/badhope/HumanOS)](https://github.com/badhope/HumanOS/issues) |
| 🔒 License | MIT |
| 📦 Build | Passing |

---

## 🧪 Testing

```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Run in watch mode
npm test -- --watch
```

### Test Coverage Goals

| Type | Target |
|------|--------|
| Unit Tests | >80% |
| Integration Tests | >60% |
| E2E Tests | Core user flows |
| Overall | >85% |

---

## 🔒 Security

Please read our [Security Policy](SECURITY.md) for responsible disclosure.

### Key Security Features

- ✅ Input sanitization
- ✅ XSS prevention (React)
- ✅ Secure random ID generation
- ✅ Content Security Policy ready
- ✅ No external data transmission

### Known Limitations

- ⚠️ LocalStorage data accessible to browser extensions
- ⚠️ No data encryption (by design for transparency)

---

## 📄 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgments

- [React](https://react.dev/) - UI framework
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Three.js](https://threejs.org/) - 3D graphics
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Lucide](https://lucide.dev/) - Icons
- All [contributors](https://github.com/badhope/HumanOS/graphs/contributors) who improve this project

---

## 📬 Contact & Support

| Channel | Link |
|---------|------|
| 💬 Discussions | [GitHub Discussions](https://github.com/badhope/HumanOS/discussions) |
| 🐛 Issues | [GitHub Issues](https://github.com/badhope/HumanOS/issues) |
| 📧 Email | support@humandos.io |

---

<div align="center">

**Built with ❤️ by the HumanOS Team**

**Stars, forks, and PRs are always welcome!**

[![Powered by React](https://img.shields.io/badge/Powered%20by-React-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Powered by TypeScript](https://img.shields.io/badge/Powered%20by-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

</div>

<div align="center">

# HumanOS

**Next Generation Personality Assessment Platform**

[![License](https://img.shields.io/badge/License-CC%20BY--NC%204.0-blue.svg)](https://creativecommons.org/licenses/by-nc/4.0/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-61dafb.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5-646cff.svg)](https://vitejs.dev/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![GitHub Stars](https://img.shields.io/github/stars/badhope/HumanOS?style=social)](https://github.com/badhope/HumanOS)

**English | [简体中文](./README.md)**

<img src="https://via.placeholder.com/800x400?text=HumanOS+Screenshot" alt="HumanOS Screenshot" width="80%">

</div>

---

## 📖 Table of Contents

- [✨ Features](#-features)
- [🚀 Quick Start](#-quick-start)
- [🎯 Assessment Types](#-assessment-types)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🎨 Animation System](#-animation-system)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [🙏 Acknowledgments](#-acknowledgments)

---

## ✨ Features

### 🔒 Privacy First
- **Local Storage** - All data is stored locally in the browser, never uploaded to any server
- **Zero Tracking** - No analytics tools or tracking code used
- **Open Source** - Fully open source, auditable code

### 🧠 Professional Assessments
- **30+ Professional Tests** - Covering 7 major domains including personality psychology, career abilities, interpersonal relationships, etc.
- **Scientific Methods** - Standardized assessment tools based on psychological research
- **Instant Feedback** - Get detailed result analysis immediately after completing assessments

### 🎨 Beautiful Design
- **Modern UI** - Glassmorphism design style with outstanding visual effects
- **Smooth Animations** - Silky animation experience based on Framer Motion
- **Responsive Layout** - Perfect adaptation for desktop and mobile devices

### ⚡ High Performance
- **Vite Build** - Lightning-fast development experience and production builds
- **Code Splitting** - Intelligent bundling, on-demand loading
- **PWA Support** - Installable as a desktop application

---

## 🚀 Quick Start

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0 or pnpm >= 8.0.0

### Installation

```bash
# Clone the repository
git clone https://github.com/badhope/HumanOS.git

# Navigate to project directory
cd HumanOS

# Install dependencies
npm install
# or using pnpm
pnpm install
```

### Development

```bash
# Start development server
npm run dev

# Open http://localhost:5173 in your browser
```

### Build

```bash
# Production build
npm run build

# Preview build result
npm run preview
```

### Code Quality

```bash
# Run ESLint
npm run lint

# Run TypeScript type checking
npm run typecheck
```

---

## 🎯 Assessment Types

HumanOS provides various professional assessments covering the following domains:

| Category | Count | Content |
|----------|-------|---------|
| 🧠 Personality Psychology | 8+ | MBTI, Big Five, Enneagram, etc. |
| 💼 Career Abilities | 5+ | Career orientation, Leadership, Team roles, etc. |
| 💑 Interpersonal Relations | 4+ | Communication style, Attachment type, Social skills, etc. |
| 🎓 Cognitive Thinking | 5+ | Thinking style, Decision making, Creativity, etc. |
| 💪 Health & Lifestyle | 4+ | Stress level, Sleep quality, Emotional management, etc. |
| 💎 Values | 3+ | Value orientation, Life meaning, etc. |
| 📚 Subject Knowledge | 5+ | Multi-domain knowledge assessments |

---

## 🛠️ Tech Stack

### Core Frameworks
- **[React 18](https://reactjs.org/)** - UI Library
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type Safety
- **[Vite 5](https://vitejs.dev/)** - Next Generation Frontend Build Tool

### UI & Styling
- **[Tailwind CSS](https://tailwindcss.com/)** - Atomic CSS Framework
- **[Framer Motion](https://www.framer.com/motion/)** - Animation Library
- **[Lucide Icons](https://lucide.dev/)** - Icon Library

### State Management
- **[Zustand](https://github.com/pmndrs/zustand)** - Lightweight State Management

### 3D Effects
- **[Three.js](https://threejs.org/)** - 3D Rendering
- **[React Three Fiber](https://docs.pmnd.rs/react-three-fiber)** - React 3D Renderer

### Toolchain
- **[ESLint](https://eslint.org/)** - Code Linting
- **[Prettier](https://prettier.io/)** - Code Formatting
- **[PostCSS](https://postcss.org/)** - CSS Post-processing

---

## 📁 Project Structure

```
HumanOS/
├── .github/                # GitHub Configuration
│   ├── workflows/          # CI/CD Workflows
│   ├── ISSUE_TEMPLATE/     # Issue Templates
│   └── PULL_REQUEST_TEMPLATE.md
├── public/                 # Static Assets
├── src/
│   ├── components/         # React Components
│   │   ├── animations/     # Animation Components
│   │   ├── AssessmentCard3D.tsx
│   │   ├── PersonalityRadar.tsx
│   │   └── ...
│   ├── data/               # Assessment Data
│   ├── pages/              # Page Components
│   ├── store/              # State Management
│   ├── types/              # TypeScript Type Definitions
│   ├── utils/              # Utility Functions
│   ├── App.tsx             # Application Entry
│   └── main.tsx            # Render Entry
├── CHANGELOG.md            # Changelog
├── CODE_OF_CONDUCT.md      # Code of Conduct
├── CONTRIBUTING.md         # Contributing Guide
├── LICENSE                 # License
├── README.md               # README (Chinese)
├── README_EN.md            # README (English)
├── SECURITY.md             # Security Policy
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 🎨 Animation System

HumanOS features a complete animation system providing rich visual effects:

### Page Transition Animations
- Fade
- Slide
- 3D Flip
- Zoom

### Interactive Animations
- **GlowCard** - Hover glow card effect
- **RippleButton** - Click ripple button
- **AnimatedNumber** - Number scrolling animation
- **AnimatedProgress** - Progress bar animation

### Scene Animations
- **SplashScreen** - Loading animation
- **ResultReveal** - Result reveal animation
- **AchievementUnlock** - Achievement unlock animation

### Animation Configuration
```typescript
// Custom animation variants
import { pageVariants, cardVariants } from '@utils/animation-config'

// Use animation components
import { GlowCard, RippleButton, FadeInSection } from '@components/animations'
```

---

## 🤝 Contributing

We welcome community contributions! Please read the [Contributing Guide](CONTRIBUTING.md) for details.

### How to Contribute

1. 🍴 Fork this repository
2. 🌿 Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. 💾 Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. 📤 Push to the branch (`git push origin feature/AmazingFeature`)
5. 🎉 Create a Pull Request

### Development Guidelines

- Follow [Conventional Commits](https://www.conventionalcommits.org/) specification
- Ensure code passes ESLint and TypeScript checks
- Add appropriate tests for new features
- Update relevant documentation

---

## 📄 License

This project is licensed under the [Creative Commons Attribution-NonCommercial 4.0 International](LICENSE) license.

This means you can:
- ✅ Share — Copy and redistribute the material
- ✅ Adapt — Remix, transform, and build upon the material

Under the following terms:
- ⚠️ Attribution — You must give appropriate credit
- ⚠️ NonCommercial — You may not use the material for commercial purposes

---

## 🙏 Acknowledgments

### Inspiration
- Psychological assessment theory and practice
- Modern frontend technology community

### Open Source Projects
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Three.js](https://threejs.org/)

### Special Thanks
Thanks to all developers who have contributed to this project!

---

<div align="center">

**[⬆ Back to Top](#humanos)**

---

Made with ❤️ by [HumanOS Team](https://github.com/badhope)

**If this project helps you, please give us a ⭐️ Star!**

</div>

# Contributing to HumanOS

Thank you for your interest in contributing to HumanOS! This document provides guidelines and instructions for contributing.

## 🤝 Code of Conduct

By participating in this project, you agree to uphold our [Code of Conduct](./CODE_OF_CONDUCT.md).

## 📋 Ways to Contribute

- 🐛 **Bug Reports**: Report bugs via [GitHub Issues](https://github.com/badhope/HumanOS/issues)
- 💡 **Feature Requests**: Suggest new features or improvements
- 📖 **Documentation**: Improve or translate documentation
- 🧪 **Testing**: Help improve test coverage
- 🌐 **Translation**: Help translate the interface into other languages

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0

### Development Setup

```bash
# 1. Fork the repository
# 2. Clone your fork
git clone https://github.com/YOUR_USERNAME/HumanOS.git
cd HumanOS

# 3. Install dependencies
npm install

# 4. Create a feature branch
git checkout -b feature/your-feature-name

# 5. Make your changes and commit
git commit -m "feat: add new feature"

# 6. Push to your fork
git push origin feature/your-feature-name

# 7. Open a Pull Request
```

### Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint

# Format code
npm run format

# Type check
npm run build
```

## 📐 Coding Standards

### TypeScript

- Use strict TypeScript with no implicit any
- Define proper interfaces for all data structures
- Use type inference where possible
- Prefer `interface` over `type` for object shapes

### React Components

- Use functional components with hooks
- Keep components small and focused (single responsibility)
- Use proper prop types
- Extract reusable logic into custom hooks

### Styling

- Use Tailwind CSS classes
- Follow mobile-first responsive design
- Maintain consistent spacing using Tailwind's scale
- Use CSS variables for theme values

### File Naming

```
ComponentName.tsx       - React components
useComponentName.ts    - Custom hooks
componentName.styles.ts - Styled components/styles
utils-name.ts           - Utility functions
types-name.ts          - Type definitions
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Generate coverage report
npm test -- --coverage
```

### Test Coverage Requirements

- New features must include tests
- Bug fixes must include regression tests
- Target: >85% code coverage

## 📝 Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new assessment type
fix: resolve answer selection bug
docs: update README
style: improve responsive layout
refactor: optimize performance
test: add integration tests
chore: update dependencies
```

## 🔄 Pull Request Process

1. **Fork & Clone**: Fork the repository and clone locally
2. **Branch**: Create a feature branch from `main`
3. **Develop**: Make your changes with passing tests
4. **Document**: Update documentation if needed
5. **Commit**: Use conventional commit messages
6. **Test**: Ensure all tests pass locally
7. **PR**: Open a pull request against `main`

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactoring
- [ ] Testing

## Related Issues
Fixes #xxx

## Testing
Describe testing performed

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] My code follows the style guidelines
- [ ] I have performed a self-review
- [ ] I have commented complex code
- [ ] I have updated documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix/feature works
```

## 🐛 Reporting Bugs

Use the [Bug Report Template](./.github/ISSUE_TEMPLATE/bug_report.md) and include:

- Browser and version
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Environment details (OS, Node version)

## 💬 Questions?

- Open a [Discussion](https://github.com/badhope/HumanOS/discussions)
- Check [Wiki](https://github.com/badhope/HumanOS/wiki)

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

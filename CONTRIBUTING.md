# 贡献指南 Contributing Guide

欢迎参与 HumanOS 项目的开发！

## 如何贡献

### 报告问题
- 使用 GitHub Issues 报告 bug 或功能请求
- 描述问题时请提供详细信息
- 附上相关的截图或错误信息

### 代码贡献
1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

### 题库贡献
如果你想添加新的测评题目，请参考 `src/data/assessments.ts` 的格式：

```typescript
{
  id: 'your-assessment-id',
  title: '测评标题',
  description: '测评描述',
  category: '所属分类',
  difficulty: 'lite' | 'standard' | 'expert',
  duration: 预计完成时间(分钟),
  questions: [...],
  resultCalculator: (answers) => {...}
}
```

## 项目结构

```
src/
├── components/     # React 组件
├── pages/           # 页面组件
├── data/            # 测评数据
├── types/           # TypeScript 类型定义
├── stores/          # 状态管理
└── utils/           # 工具函数
```

## 规范

- 使用 TypeScript 编写代码
- 遵循 ESLint 规则
- 提交前运行 `npm run lint` 和 `npm run typecheck`
- 代码注释使用中文或英文均可

## 许可

参与本项目即表示你同意你的贡献将采用 CC BY-NC 4.0 协议进行许可。

---

# English Version

Welcome to contribute to the HumanOS project!

## How to Contribute

### Reporting Issues
- Use GitHub Issues to report bugs or feature requests
- Provide detailed information when describing issues
- Include screenshots or error messages if relevant

### Code Contribution
1. Fork this repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Create a Pull Request

### Assessment Contribution
To add new assessments, please follow the format in `src/data/assessments.ts`.

## License

By contributing, you agree that your contributions will be licensed under CC BY-NC 4.0.

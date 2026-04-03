/**
 * HumanOS 项目模板配置文件
 * 用于快速初始化和定制项目
 */

module.exports = {
  // 模板基础信息
  template: {
    name: 'HumanOS',
    version: '2.1.0',
    description: '心理测评平台项目模板 - 适用于毕业设计、企业应用、个人项目',
    author: 'Your Name',
    license: 'MIT',
  },

  // 项目类型配置
  projectTypes: {
    graduation: {
      name: '毕业设计版',
      description: '适合本科/研究生毕业设计项目',
      features: [
        '完整的心理测评系统',
        '详细的文档和注释',
        '学术论文支持',
        '答辩演示材料',
        '测试报告模板',
      ],
      includes: [
        'docs/thesis-template/',
        'docs/defense-presentation/',
        'docs/test-report/',
        'examples/graduation/',
      ],
    },
    enterprise: {
      name: '企业应用版',
      description: '适合企业内部测评和人才管理',
      features: [
        '多租户支持',
        '数据分析和报表',
        'API接口文档',
        '部署指南',
        '性能优化',
      ],
      includes: [
        'docs/api/',
        'docs/deployment/',
        'examples/enterprise/',
        'scripts/performance/',
      ],
    },
    personal: {
      name: '个人项目版',
      description: '适合个人学习和快速原型开发',
      features: [
        '快速启动',
        '简化配置',
        '学习文档',
        '示例代码',
      ],
      includes: [
        'docs/tutorial/',
        'examples/personal/',
      ],
    },
  },

  // 可配置模块
  modules: {
    assessments: {
      enabled: true,
      description: '心理测评模块',
      types: ['mbti', 'big-five', 'anxiety', 'eq', 'career', 'relationship', 'cognitive', 'health'],
      customizable: true,
    },
    userSystem: {
      enabled: true,
      description: '用户系统',
      features: ['profile', 'history', 'favorites'],
    },
    dataVisualization: {
      enabled: true,
      description: '数据可视化',
      charts: ['radar', 'bar', 'line', 'pie'],
    },
    animations: {
      enabled: true,
      description: '动画效果',
      types: ['page-transition', 'loading', 'result-reveal'],
    },
    threeD: {
      enabled: true,
      description: '3D效果',
      features: ['background', 'cards', 'particles'],
    },
  },

  // 主题配置
  themes: {
    default: {
      name: '默认主题',
      primaryColor: '#3b82f6',
      backgroundColor: '#0f172a',
    },
    light: {
      name: '明亮主题',
      primaryColor: '#3b82f6',
      backgroundColor: '#ffffff',
    },
    dark: {
      name: '暗黑主题',
      primaryColor: '#8b5cf6',
      backgroundColor: '#0a0a0a',
    },
  },

  // 数据库配置模板
  database: {
    type: 'local', // 'local' | 'firebase' | 'mongodb' | 'mysql'
    config: {
      local: {
        storage: 'localStorage',
        sync: false,
      },
      firebase: {
        apiKey: 'YOUR_API_KEY',
        authDomain: 'YOUR_AUTH_DOMAIN',
        projectId: 'YOUR_PROJECT_ID',
      },
      mongodb: {
        uri: 'mongodb://localhost:27017',
        dbName: 'humanos',
      },
      mysql: {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
        database: 'humanos',
      },
    },
  },

  // 部署配置
  deployment: {
    platforms: ['vercel', 'netlify', 'github-pages', 'docker'],
    default: 'vercel',
    config: {
      vercel: {
        buildCommand: 'npm run build',
        outputDirectory: 'dist',
        installCommand: 'npm install',
      },
      netlify: {
        buildCommand: 'npm run build',
        publishDirectory: 'dist',
      },
      'github-pages': {
        branch: 'gh-pages',
        buildCommand: 'npm run build',
      },
      docker: {
        dockerfile: 'Dockerfile',
        port: 3000,
      },
    },
  },

  // 开发工具配置
  devTools: {
    eslint: true,
    prettier: true,
    typescript: true,
    testing: {
      enabled: true,
      framework: 'vitest',
      coverage: true,
    },
    husky: true,
    commitlint: true,
  },

  // 文档配置
  documentation: {
    readme: true,
    api: true,
    architecture: true,
    contributing: true,
    changelog: true,
    license: true,
  },

  // 示例和模板
  examples: {
    assessments: true,
    components: true,
    pages: true,
    styles: true,
  },
}

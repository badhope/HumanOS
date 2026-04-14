import React, { useState } from 'react'
import { motion } from 'framer-motion'
import ThemeAnalysisReportGenerator from '../components/ThemeAnalysisReportGenerator'

const ThemeAnalysisDemo: React.FC = () => {
  const [selectedTheme, setSelectedTheme] = useState<string>('意识形态分析')
  const [customTheme, setCustomTheme] = useState<string>('')

  const predefinedThemes = [
    { id: 'ideology', name: '意识形态分析', icon: '⚖️', description: '多维度政治哲学立场分析' },
    { id: 'personality', name: '人格特质分析', icon: '🧠', description: '基于心理学理论的人格评估' },
    { id: 'career', name: '职业发展分析', icon: '💼', description: '职业适配度与发展路径分析' },
    { id: 'learning', name: '学习风格分析', icon: '📚', description: '学习偏好与效果评估' },
    { id: 'leadership', name: '领导力分析', icon: '👑', description: '领导风格与潜能评估' },
    { id: 'team', name: '团队协作分析', icon: '👥', description: '团队角色与协作模式分析' }
  ]

  const sampleAnalysisData = {
    sampleSize: 500,
    timeRange: '2023-2024',
    demographics: {
      ageGroups: ['18-25', '26-35', '36-45', '46-55', '56+'],
      genders: ['male', 'female', 'other'],
      regions: ['east', 'west', 'north', 'south', 'central']
    },
    metrics: {
      reliability: 0.92,
      validity: 0.88,
      responseRate: 0.85
    },
    dimensions: {
      primary: ['认知', '情感', '行为', '环境', '社会', '文化'],
      secondary: ['历史', '经济', '政治', '技术', '伦理', '美学']
    }
  }

  const currentTheme = customTheme || selectedTheme

  return (
    <div className="theme-analysis-demo min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            多维度主题分析框架
          </h1>
          <p className="text-gray-600">
            覆盖6个核心分析模块，支持扩展至更多维度
          </p>
        </motion.div>

        <div className="framework-overview mb-8 p-6 bg-white rounded-xl shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4">框架特点</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: '📊', title: '多维度分析', desc: '6个核心模块，可扩展至十几个维度' },
              { icon: '🔬', title: '科学严谨', desc: '每个模块包含完整的研究方法论' },
              { icon: '🔗', title: '逻辑关联', desc: '模块间依赖关系明确，分析连贯' },
              { icon: '📈', title: '量化评估', desc: '多维度评估指标，客观衡量分析质量' },
              { icon: '📋', title: '标准化流程', desc: '数据收集、分析、验证全流程标准化' },
              { icon: '🔄', title: '可复用性', desc: '框架可应用于不同主题的分析' }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
              >
                <span className="text-2xl">{feature.icon}</span>
                <div>
                  <h3 className="font-semibold text-gray-800">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="theme-selection mb-8 p-6 bg-white rounded-xl shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4">选择分析主题</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
            {predefinedThemes.map((theme) => (
              <motion.button
                key={theme.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedTheme(theme.name)
                  setCustomTheme('')
                }}
                className={`p-3 rounded-lg border-2 transition-all text-center
                  ${selectedTheme === theme.name && !customTheme
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:border-indigo-300'}`}
              >
                <span className="text-2xl block mb-1">{theme.icon}</span>
                <span className="text-sm font-medium text-gray-800">{theme.name}</span>
              </motion.button>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="或输入自定义主题..."
              value={customTheme}
              onChange={(e) => setCustomTheme(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="modules-detail mb-8 p-6 bg-white rounded-xl shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4">六大核心分析模块</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">模块</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">研究目标</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">数据收集</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">评估指标</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    module: '理论基础分析',
                    goal: '深入理解主题的理论基础和概念框架',
                    collection: '定性方法：文献分析、专家访谈',
                    metrics: '理论完整性、一致性、适用性'
                  },
                  {
                    module: '实证数据分析',
                    goal: '通过实证数据验证理论假设并发现规律',
                    collection: '定量方法：问卷调查、实验数据',
                    metrics: '样本质量、模型拟合度、预测准确率'
                  },
                  {
                    module: '比较分析',
                    goal: '通过比较揭示主题的共性和差异',
                    collection: '混合方法：跨群体数据、案例库',
                    metrics: '差异显著性、效应量'
                  },
                  {
                    module: '历史演变分析',
                    goal: '追溯主题的历史发展脉络和演变规律',
                    collection: '定性方法：历史文献、时间序列',
                    metrics: '时间线完整性、阶段清晰度'
                  },
                  {
                    module: '行为模式分析',
                    goal: '识别和分析与主题相关的行为模式和规律',
                    collection: '混合方法：行为观察、追踪数据',
                    metrics: '模式清晰度、行为预测准确率'
                  },
                  {
                    module: '情境因素分析',
                    goal: '分析影响主题的情境因素及其作用机制',
                    collection: '混合方法：情境调查、环境数据',
                    metrics: '因素覆盖度、解释力'
                  }
                ].map((row, index) => (
                  <motion.tr
                    key={row.module}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="px-4 py-3 font-medium text-gray-800">{row.module}</td>
                    <td className="px-4 py-3 text-gray-600">{row.goal}</td>
                    <td className="px-4 py-3 text-gray-600">{row.collection}</td>
                    <td className="px-4 py-3 text-gray-600">{row.metrics}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="analysis-workflow mb-8 p-6 bg-white rounded-xl shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4">分析流程</h2>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { step: 1, name: '理论基础分析', icon: '📚' },
              { step: 2, name: '实证数据分析', icon: '📊' },
              { step: 3, name: '比较分析', icon: '⚖️' },
              { step: 4, name: '历史演变分析', icon: '📜' },
              { step: 5, name: '行为模式分析', icon: '🎭' },
              { step: 6, name: '情境因素分析', icon: '🌍' }
            ].map((item, index) => (
              <React.Fragment key={item.step}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.15 }}
                  className="flex flex-col items-center p-3 bg-indigo-50 rounded-lg min-w-[100px]"
                >
                  <span className="text-2xl mb-1">{item.icon}</span>
                  <span className="text-xs font-medium text-gray-700 text-center">{item.name}</span>
                </motion.div>
                {index < 5 && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.15 + 0.1 }}
                    className="text-gray-400"
                  >
                    →
                  </motion.span>
                )}
              </React.Fragment>
            ))}
          </div>
          <p className="text-center text-sm text-gray-500 mt-4">
            模块按依赖关系排序，确保分析逻辑连贯
          </p>
        </div>

        <div className="report-generator-section">
          <h2 className="text-xl font-bold text-gray-800 mb-4">生成分析报告</h2>
          <ThemeAnalysisReportGenerator
            themeName={currentTheme}
            analysisData={sampleAnalysisData}
            onReportGenerated={(report) => {
              // Report generated callback
            }}
          />
        </div>

        <div className="extension-guide mt-8 p-6 bg-white rounded-xl shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4">扩展指南</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">如何添加新维度</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
                <li>定义新模块的研究目标和问题</li>
                <li>设计数据收集方法和工具</li>
                <li>构建分析框架和模型</li>
                <li>设定评估指标和基准</li>
                <li>确定与其他模块的依赖关系</li>
                <li>使用 addCustomModule() 方法注册</li>
              </ol>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">扩展能力</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  支持动态添加新分析模块
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  模块配置可导入导出
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  支持自定义评估指标
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  分析历史可追溯
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  报告格式可定制
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ThemeAnalysisDemo

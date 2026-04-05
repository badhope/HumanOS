import type { ProfessionalAssessmentResult, CompletedAssessment } from '../types'

export interface ExportOptions {
  includeCharts: boolean
  includeDetails: boolean
  includeTimestamps: boolean
  language: 'zh' | 'en'
  theme?: 'light' | 'dark'
}

interface ExportResult {
  success: boolean
  data?: Blob | string
  filename: string
  mimeType: string
  error?: string
}

const defaultOptions: ExportOptions = {
  includeCharts: true,
  includeDetails: true,
  includeTimestamps: true,
  language: 'zh',
  theme: 'light',
}

export async function exportToJSON(
  assessments: CompletedAssessment[],
  options: Partial<ExportOptions> = {}
): Promise<ExportResult> {
  const opts = { ...defaultOptions, ...options }
  
  const data = {
    version: '1.0.0',
    exportDate: new Date().toISOString(),
    application: 'HumanOS',
    totalRecords: assessments.length,
    records: assessments.map((a, index) => ({
      id: `${a.assessmentId}-${index}`,
      assessmentId: a.assessmentId,
      assessmentName: getAssessmentName(a.assessmentId, opts.language),
      score: a.result?.score,
      level: a.result?.type || a.result?.title,
      completedAt: a.completedAt.toISOString(),
      mode: a.mode || 'professional',
      answersCount: a.answers?.length || 0,
      ...(opts.includeDetails && {
        result: a.result,
        answers: a.answers,
      }),
    })),
  }

  const jsonString = JSON.stringify(data, null, 2)
  const blob = new Blob([jsonString], { type: 'application/json' })
  
  return {
    success: true,
    data: blob,
    filename: `humanos-export-${new Date().toISOString().split('T')[0]}.json`,
    mimeType: 'application/json',
  }
}

export async function exportToCSV(
  assessments: CompletedAssessment[],
  options: Partial<ExportOptions> = {}
): Promise<ExportResult> {
  const opts = { ...defaultOptions, ...options }
  
  const headers = [
    'ID',
    'Assessment Name',
    'Score',
    'Level',
    'Completed At',
    'Mode',
    ...(opts.includeDetails ? ['Details', 'Strengths', 'Weaknesses'] : []),
  ]
  
  const rows = assessments.map((a, index) => [
    `${a.assessmentId}-${index}`,
    getAssessmentName(a.assessmentId, opts.language),
    a.result?.score?.toString() || '',
    a.result?.type || a.result?.title || '',
    a.completedAt.toISOString(),
    a.mode || 'professional',
    ...(opts.includeDetails ? [
      a.result?.description?.substring(0, 100) || '',
      (a.result?.strengths || []).join('; '),
      (a.result?.weaknesses || []).join('; '),
    ] : []),
  ])
  
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
  ].join('\n')
  
  const BOM = '\uFEFF'
  const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8' })
  
  return {
    success: true,
    data: blob,
    filename: `humanos-export-${new Date().toISOString().split('T')[0]}.csv`,
    mimeType: 'text/csv',
  }
}

export async function exportToHTML(
  assessments: CompletedAssessment[],
  options: Partial<ExportOptions> = {}
): Promise<ExportResult> {
  const opts = { ...defaultOptions, ...options }
  const isDark = opts.theme === 'dark'
  
  const htmlTemplate = `
<!DOCTYPE html>
<html lang="${opts.language}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${opts.language === 'zh' ? 'HumanOS 测评报告' : 'HumanOS Assessment Report'}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: ${isDark ? '#1a1a2e' : '#f8f9fa'};
      color: ${isDark ? '#e4e4e7' : '#212529'};
      padding: 40px 20px;
      line-height: 1.6;
    }
    .container { max-width: 900px; margin: 0 auto; }
    h1 {
      text-align: center;
      color: ${isDark ? '#60a5fa' : '#2563eb'};
      margin-bottom: 10px;
      font-size: 2.5em;
    }
    .subtitle {
      text-align: center;
      color: ${isDark ? '#9ca3af' : '#6c757d'};
      margin-bottom: 40px;
    }
    .summary-card {
      background: ${isDark ? '#16213e' : '#ffffff'};
      border-radius: 16px;
      padding: 30px;
      margin-bottom: 30px;
      box-shadow: 0 4px 20px rgba(0,0,0,${isDark ? '0.3' : '0.1'});
    }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }
    .stat-item {
      background: ${isDark ? '#0f3460' : '#f8f9fa'};
      padding: 20px;
      border-radius: 12px;
      text-align: center;
    }
    .stat-value {
      font-size: 2em;
      font-weight: bold;
      color: ${isDark ? '#60a5fa' : '#2563eb'};
    }
    .stat-label {
      color: ${isDark ? '#9ca3af' : '#6c757d'};
      margin-top: 5px;
    }
    .assessment-card {
      background: ${isDark ? '#16213e' : '#ffffff'};
      border-radius: 16px;
      padding: 25px;
      margin-bottom: 20px;
      box-shadow: 0 2px 15px rgba(0,0,0,${isDark ? '0.2' : '0.08'});
      border-left: 4px solid #2563eb;
    }
    .assessment-title {
      font-size: 1.3em;
      font-weight: 600;
      color: ${isDark ? '#60a5fa' : '#2563eb'};
      margin-bottom: 10px;
    }
    .score-badge {
      display: inline-block;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 8px 20px;
      border-radius: 20px;
      font-weight: bold;
      font-size: 1.1em;
    }
    .dimension-bar {
      background: ${isDark ? '#0f3460' : '#e9ecef'};
      height: 8px;
      border-radius: 4px;
      overflow: hidden;
      margin: 8px 0;
    }
    .dimension-fill {
      height: 100%;
      background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
      border-radius: 4px;
      transition: width 0.3s ease;
    }
    .strengths-list, .weaknesses-list {
      list-style: none;
      padding: 0;
    }
    .strengths-list li::before {
      content: "✓ ";
      color: #22c55e;
      font-weight: bold;
    }
    .weaknesses-list li::before {
      content: "⚠ ";
      color: #f59e0b;
      font-weight: bold;
    }
    .footer {
      text-align: center;
      margin-top: 40px;
      color: ${isDark ? '#9ca3af' : '#6c757d'};
      font-size: 0.9em;
    }
    @media print {
      body { padding: 20px; }
      .container { max-width: 100%; }
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🧠 HumanOS</h1>
    <p class="subtitle">${opts.language === 'zh' ? '全面的人类潜能评估报告' : 'Comprehensive Human Potential Assessment Report'}</p>
    
    <div class="summary-card">
      <h2>${opts.language === 'zh' ? '📊 数据概览' : '📊 Data Overview'}</h2>
      <div class="stats-grid">
        <div class="stat-item">
          <div class="stat-value">${assessments.length}</div>
          <div class="stat-label">${opts.language === 'zh' ? '总测评数' : 'Total Assessments'}</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">${getAverageScore(assessments)}</div>
          <div class="stat-label">${opts.language === 'zh' ? '平均分' : 'Average Score'}</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">${getHighestScore(assessments)}</div>
          <div class="stat-label">${opts.language === 'zh' ? '最高分' : 'Highest Score'}</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">${new Date().toLocaleDateString(opts.language === 'zh' ? 'zh-CN' : 'en-US')}</div>
          <div class="stat-label">${opts.language === 'zh' ? '导出日期' : 'Export Date'}</div>
        </div>
      </div>
    </div>

    ${assessments.map((a, index) => generateAssessmentCard(a, index, opts, isDark)).join('\n')}

    <div class="footer">
      <p>${opts.language === 'zh' ? '由 HumanOS 生成 | 探索你的无限可能' : 'Generated by HumanOS | Explore Your Infinite Possibilities'}</p>
      <p>${new Date().toLocaleString(opts.language === 'zh' ? 'zh-CN' : 'en-US')}</p>
    </div>
  </div>
</body>
</html>`

  return {
    success: true,
    data: htmlTemplate,
    filename: `humanos-report-${new Date().toISOString().split('T')[0]}.html`,
    mimeType: 'text/html',
  }
}

export async function exportToMarkdown(
  assessments: CompletedAssessment[],
  options: Partial<ExportOptions> = {}
): Promise<ExportResult> {
  const opts = { ...defaultOptions, ...options }
  
  let mdContent = `# 🧠 HumanOS ${opts.language === 'zh' ? '测评报告' : 'Assessment Report'}\n\n`
  mdContent += `> ${opts.language === 'zh' ? '全面的人类潜能评估报告' : 'Comprehensive Human Potential Assessment Report'}\n\n`
  mdContent += `**${opts.language === 'zh' ? '导出日期' : 'Export Date'}:** ${new Date().toLocaleDateString(opts.language === 'zh' ? 'zh-CN' : 'en-US')}\n\n`
  
  mdContent += `## 📊 ${opts.language === 'zh' ? '数据概览' : 'Data Overview'}\n\n`
  mdContent += `| ${opts.language === 'zh' ? '指标' : 'Metric'} | ${opts.language === 'zh' ? '数值' : 'Value'} |\n`
  mdContent += `|---|---|\n`
  mdContent += `| ${opts.language === 'zh' ? '总测评数' : 'Total Assessments'} | ${assessments.length} |\n`
  mdContent += `| ${opts.language === 'zh' ? '平均分' : 'Average Score'} | ${getAverageScore(assessments)} |\n`
  mdContent += `| ${opts.language === 'zh' ? '最高分' : 'Highest Score'} | ${getHighestScore(assessments)} |\n\n`

  assessments.forEach((a, index) => {
    mdContent += `## ${index + 1}. ${getAssessmentName(a.assessmentId, opts.language)}\n\n`
    
    if (a.result) {
      mdContent += `**${opts.language === 'zh' ? '得分' : 'Score'}:** \`${a.result.score}/100\`\n\n`
      mdContent += `**${opts.language === 'zh' ? '等级' : 'Level'}:** ${a.result.type || a.result.title}\n\n`
      
      if (opts.includeDetails && a.result.description) {
        mdContent += `### ${opts.language === 'zh' ? '描述' : 'Description'}\n\n`
        mdContent += `${a.result.description}\n\n`
      }

      if (opts.includeDetails && a.result.dimensions?.length > 0) {
        mdContent += `### ${opts.language === 'zh' ? '维度分析' : 'Dimension Analysis'}\n\n`
        a.result.dimensions.forEach(dim => {
          const percentage = Math.round((dim.score / Number(dim.maxScore)) * 100)
          mdContent += `- **${dim.name}**: ${dim.score}/${dim.maxScore} (${percentage}%)\n`
        })
        mdContent += '\n'
      }

      if (opts.includeDetails && a.result.strengths?.length > 0) {
        mdContent += `### ✅ ${opts.language === 'zh' ? '优势' : 'Strengths'}\n\n`
        a.result.strengths.forEach(s => mdContent += `- ${s}\n`)
        mdContent += '\n'
      }

      if (opts.includeDetails && a.result.weaknesses?.length > 0) {
        mdContent += `### ⚠️ ${opts.language === 'zh' ? '待提升' : 'Areas for Improvement'}\n\n`
        a.result.weaknesses.forEach(w => mdContent += `- ${w}\n`)
        mdContent += '\n'
      }
    }

    mdContent += `---\n\n`
  })

  mdContent += `\n---\n\n*${opts.language === 'zh' ? '由 HumanOS 生成' : 'Generated by HumanOS'}* | ${new Date().toLocaleString(opts.language === 'zh' ? 'zh-CN' : 'en-US')}\n`

  const blob = new Blob([mdContent], { type: 'text/markdown;charset=utf-8' })
  
  return {
    success: true,
    data: blob,
    filename: `humanos-report-${new Date().toISOString().split('T')[0]}.md`,
    mimeType: 'text/markdown',
  }
}

export async function exportToPNG(
  assessments: CompletedAssessment[],
  options: Partial<ExportOptions> = {}
): Promise<ExportResult> {
  const htmlResult = await exportToHTML(assessments, options)
  
  if (!htmlResult.success || !htmlResult.data) {
    return { success: false, filename: '', mimeType: '', error: 'Failed to generate HTML for PNG conversion' }
  }

  try {
    const htmlContent = htmlResult.data as string
    
    const canvas = await createImageFromHTML(htmlContent)
    
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve({
            success: true,
            data: blob,
            filename: `humanos-report-${new Date().toISOString().split('T')[0]}.png`,
            mimeType: 'image/png',
          })
        } else {
          resolve({
            success: false,
            filename: '',
            mimeType: '',
            error: 'Failed to convert to PNG',
          })
        }
      }, 'image/png', 1.0)
    })
  } catch (error) {
    return {
      success: false,
      filename: '',
      mimeType: '',
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    }
  }
}

async function createImageFromHTML(htmlContent: string): Promise<HTMLCanvasElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const blob = new Blob([htmlContent], { type: 'text/html' })
    const url = URL.createObjectURL(blob)

    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      
      canvas.width = 1200
      canvas.height = 1600

      if (ctx) {
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      }

      URL.revokeObjectURL(url)
      resolve(canvas)
    }

    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('Failed to load HTML into image'))
    }

    img.src = url
  })
}

function generateAssessmentCard(
  assessment: CompletedAssessment,
  index: number,
  options: ExportOptions,
  isDark: boolean
): string {
  const name = getAssessmentName(assessment.assessmentId, options.language)
  const score = assessment.result?.score || 0
  
  let card = `<div class="assessment-card">\n`
  card += `  <div class="assessment-title">${index + 1}. ${name}</div>\n`
  card += `  <span class="score-badge">${score}/100</span>\n`
  
  if (options.includeDetails && assessment.result) {
    if (assessment.result.description) {
      card += `  <p style="margin-top: 15px; color: ${isDark ? '#d1d5db' : '#495057'};">${assessment.result.description.substring(0, 200)}...</p>\n`
    }

    if (assessment.result.dimensions?.length > 0) {
      card += `  <h4 style="margin-top: 20px; color: ${isDark ? '#9ca3af' : '#495057'};">${options.language === 'zh' ? '维度分析' : 'Dimensions'}:</h4>\n`
      assessment.result.dimensions.slice(0, 5).forEach(dim => {
        const percentage = Math.round((dim.score / Number(dim.maxScore)) * 100)
        card += `  <div style="margin: 10px 0;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
            <span>${dim.name}</span>
            <span>${percentage}%</span>
          </div>
          <div class="dimension-bar">
            <div class="dimension-fill" style="width: ${percentage}%"></div>
          </div>
        </div>\n`
      })
    }

    if (assessment.result.strengths?.length > 0) {
      card += `  <h4 style="margin-top: 20px; color: #22c55e;">✅ ${options.language === 'zh' ? '优势' : 'Strengths'}:</h4>\n`
      card += `  <ul class="strengths-list">\n`
      assessment.result.strengths.slice(0, 5).forEach(s => {
        card += `    <li>${s}</li>\n`
      })
      card += `  </ul>\n`
    }
  }

  card += `  <p style="margin-top: 15px; color: ${isDark ? '#9ca3af' : '#6c757d'}; font-size: 0.9em;">
    ${options.language === 'zh' ? '完成时间' : 'Completed'}: ${assessment.completedAt.toLocaleDateString(options.language === 'zh' ? 'zh-CN' : 'en-US')}
  </p>\n`
  card += `</div>\n`

  return card
}

function getAssessmentName(id: string, language: 'zh' | 'en'): string {
  const names: Record<string, { zh: string; en: string }> = {
    'mbti': { zh: 'MBTI性格测试', en: 'MBTI Personality Test' },
    'bigfive': { zh: '大五人格测试', en: 'Big Five Personality Test' },
    'iq': { zh: '智商测试', en: 'IQ Test' },
    'eq': { zh: '情商测试', en: 'EQ Test' },
    'holland': { zh: '霍兰德职业兴趣测试', en: 'Holland Career Interest Test' },
    'depression': { zh: '抑郁自评量表', en: 'Depression Self-Rating Scale' },
    'anxiety': { zh: '焦虑自评量表', en: 'Anxiety Self-Rating Scale' },
    'political': { zh: '政治意识形态测试', en: 'Political Ideology Test' },
  }
  
  return names[id]?.[language] || id
}

function getAverageScore(assessments: CompletedAssessment[]): number {
  if (assessments.length === 0) return 0
  const total = assessments.reduce((sum, a) => sum + (a.result?.score || 0), 0)
  return Math.round(total / assessments.length)
}

function getHighestScore(assessments: CompletedAssessment[]): number {
  if (assessments.length === 0) return 0
  return Math.max(...assessments.map(a => a.result?.score || 0))
}

export const exportFormats = {
  json: {
    id: 'json',
    label: { zh: 'JSON 数据文件', en: 'JSON Data File' },
    description: { 
      zh: '完整的数据备份，适合技术用户和二次开发', 
      en: 'Complete data backup for technical users and further development' 
    },
    icon: '{ }',
    mimeType: 'application/json',
    extension: '.json',
    exporter: exportToJSON,
  },
  csv: {
    id: 'csv',
    label: { zh: 'CSV 表格文件', en: 'CSV Spreadsheet' },
    description: { 
      zh: '可在 Excel、Google Sheets 中打开的表格格式', 
      en: 'Spreadsheet format compatible with Excel and Google Sheets' 
    },
    icon: '📊',
    mimeType: 'text/csv',
    extension: '.csv',
    exporter: exportToCSV,
  },
  html: {
    id: 'html',
    label: { zh: 'HTML 网页报告', en: 'HTML Web Report' },
    description: { 
      zh: '精美的交互式网页报告，可在浏览器中直接查看', 
      en: 'Beautiful interactive web report viewable in any browser' 
    },
    icon: '🌐',
    mimeType: 'text/html',
    extension: '.html',
    exporter: exportToHTML,
  },
  markdown: {
    id: 'markdown',
    label: { zh: 'Markdown 文档', en: 'Markdown Document' },
    description: { 
      zh: '纯文本格式，便于版本控制和文档管理', 
      en: 'Plain text format ideal for version control and documentation' 
    },
    icon: '📝',
    mimeType: 'text/markdown',
    extension: '.md',
    exporter: exportToMarkdown,
  },
  png: {
    id: 'png',
    label: { zh: 'PNG 图片报告', en: 'PNG Image Report' },
    description: { 
      zh: '适合社交媒体分享的高质量图片报告', 
      en: 'High-quality image report perfect for social media sharing' 
    },
    icon: '🖼️',
    mimeType: 'image/png',
    extension: '.png',
    exporter: exportToPNG,
  },
} as const

export type ExportFormatId = keyof typeof exportFormats

export async function exportData(
  format: ExportFormatId,
  assessments: CompletedAssessment[],
  options: Partial<ExportOptions> = {}
): Promise<ExportResult> {
  const formatConfig = exportFormats[format]
  if (!formatConfig) {
    return {
      success: false,
      filename: '',
      mimeType: '',
      error: `Unsupported export format: ${format}`,
    }
  }

  try {
    const result = await formatConfig.exporter(assessments, options)
    
    if (result.success && result.data) {
      downloadBlob(result.data, result.filename, result.mimeType)
    }

    return result
  } catch (error) {
    return {
      success: false,
      filename: '',
      mimeType: '',
      error: error instanceof Error ? error.message : 'Export failed',
    }
  }
}

function downloadBlob(data: Blob | string, filename: string, mimeType: string) {
  const blob = data instanceof Blob ? data : new Blob([data], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

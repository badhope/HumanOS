import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  TrendingUp,
  Users,
  Shield,
  GraduationCap,
  BookOpen,
  Building2,
  FileText,
  Lock,
  BarChart,
  Globe,
  Clock,
} from 'lucide-react'

import {
  KeyMetricsSection,
  ChartsSection,
  CertificationSection,
  TeamSection,
  TechPrincipleSection,
  SuccessCasesSection,
  AcademicSection,
  SecuritySection,
} from './index'

type SectionId = 'metrics' | 'charts' | 'certifications' | 'team' | 'tech' | 'cases' | 'academic' | 'security'

interface Section {
  id: SectionId
  label: string
  icon: typeof TrendingUp
}

const sections: Section[] = [
  { id: 'metrics', label: '关键指标', icon: TrendingUp },
  { id: 'charts', label: '数据图表', icon: BarChart },
  { id: 'certifications', label: '资质认证', icon: Shield },
  { id: 'team', label: '专家团队', icon: GraduationCap },
  { id: 'tech', label: '技术原理', icon: BookOpen },
  { id: 'cases', label: '成功案例', icon: Building2 },
  { id: 'academic', label: '学术研究', icon: FileText },
  { id: 'security', label: '数据安全', icon: Lock },
]

export default function ProfessionalCredibility() {
  const [activeSection, setActiveSection] = useState(0)

  const renderSection = (sectionIndex: number) => {
    switch (sectionIndex) {
      case 0:
        return <KeyMetricsSection />
      case 1:
        return <ChartsSection />
      case 2:
        return <CertificationSection />
      case 3:
        return <TeamSection />
      case 4:
        return <TechPrincipleSection />
      case 5:
        return <SuccessCasesSection />
      case 6:
        return <AcademicSection />
      case 7:
        return <SecuritySection />
      default:
        return null
    }
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl font-bold text-white mb-2">专业可信度展示</h2>
        <p className="text-white/60">数据驱动，专业认证，值得信赖</p>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {sections.map((section, index) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(index)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all ${
              activeSection === index
                ? 'bg-gradient-to-r from-violet-500 to-pink-500 text-white'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
            type="button"
          >
            <section.icon className="w-4 h-4" />
            {section.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderSection(activeSection)}
        </motion.div>
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex flex-wrap justify-center gap-6 pt-6 border-t border-white/10"
      >
        <div className="flex items-center gap-2 text-white/50 text-sm">
          <Globe className="w-4 h-4" />
          <span>服务全球 156 个国家</span>
        </div>
        <div className="flex items-center gap-2 text-white/50 text-sm">
          <Users className="w-4 h-4" />
          <span>超过 280 万用户信赖</span>
        </div>
        <div className="flex items-center gap-2 text-white/50 text-sm">
          <Clock className="w-4 h-4" />
          <span>7×24 小时技术支持</span>
        </div>
        <div className="flex items-center gap-2 text-white/50 text-sm">
          <Shield className="w-4 h-4" />
          <span>99.9% 系统可用性</span>
        </div>
      </motion.div>
    </div>
  )
}

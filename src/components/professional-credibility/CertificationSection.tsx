import { motion } from 'framer-motion'
import { Shield, Lock, BadgeCheck, Globe, Award, Trophy } from 'lucide-react'

const certifications = [
  { name: 'ISO 27001', desc: '信息安全管理体系认证', icon: Shield },
  { name: 'ISO 27701', desc: '隐私信息管理体系认证', icon: Lock },
  { name: 'SOC 2 Type II', desc: '安全性、可用性、保密性认证', icon: BadgeCheck },
  { name: 'GDPR合规', desc: '欧盟数据保护条例合规', icon: Globe },
  { name: '等保三级', desc: '信息安全等级保护认证', icon: Award },
  { name: 'CMMI 5级', desc: '软件能力成熟度最高等级', icon: Trophy },
]

export function CertificationSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-6"
    >
      <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
        <Shield className="w-6 h-6 text-green-400" />
        权威认证资质
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {certifications.map((cert, index) => (
          <motion.div
            key={cert.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-green-500/20 to-emerald-500/20 flex items-center justify-center">
              <cert.icon className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <div className="text-white font-medium">{cert.name}</div>
              <div className="text-white/50 text-xs">{cert.desc}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

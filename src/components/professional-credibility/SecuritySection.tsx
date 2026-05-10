import { motion } from 'framer-motion'
import { Lock, CheckCircle } from 'lucide-react'

export function SecuritySection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-6"
    >
      <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
        <Lock className="w-6 h-6 text-green-400" />
        数据安全保障
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <div>
              <div className="text-white text-sm font-medium">端到端加密</div>
              <div className="text-white/50 text-xs">采用AES-256加密算法，数据传输全程加密</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <div>
              <div className="text-white text-sm font-medium">数据脱敏</div>
              <div className="text-white/50 text-xs">敏感信息自动脱敏处理，保护用户隐私</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <div>
              <div className="text-white text-sm font-medium">访问控制</div>
              <div className="text-white/50 text-xs">严格的权限管理，数据访问全程审计</div>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <div>
              <div className="text-white text-sm font-medium">多地容灾备份</div>
              <div className="text-white/50 text-xs">数据多地实时备份，确保数据永不丢失</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <div>
              <div className="text-white text-sm font-medium">安全审计</div>
              <div className="text-white/50 text-xs">第三方年度安全审计，漏洞及时修复</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <div>
              <div className="text-white text-sm font-medium">合规认证</div>
              <div className="text-white/50 text-xs">符合GDPR、网络安全法等法规要求</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

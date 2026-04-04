import { motion } from 'framer-motion'
import {
  ArrowRight,
  Check,
  Star,
  Play,
  Zap,
  Shield,
  Users,
  ChevronRight,
  Mail,
  Phone,
  MapPin
} from 'lucide-react'
import { SharedLayout } from '../../shared/layout/SharedLayout'

function LandingHome() {
  const features = [
    {
      icon: Zap,
      title: '闪电般快速',
      description: '采用最新技术，性能卓越，加载速度极快'
    },
    {
      icon: Shield,
      title: '安全可靠',
      description: '企业级安全防护，保护您的数据安全'
    },
    {
      icon: Users,
      title: '团队协作',
      description: '强大的协作功能，提升团队工作效率'
    },
    {
      icon: Star,
      title: '优质体验',
      description: '精心设计的用户体验，操作流畅自然'
    }
  ]

  const pricing = [
    {
      name: '入门版',
      price: '¥0',
      period: '/月',
      description: '适合个人用户',
      features: ['基础功能', '1GB存储', '邮件支持'],
      highlight: false,
      button: '免费开始'
    },
    {
      name: '专业版',
      price: '¥99',
      period: '/月',
      description: '适合小微企业',
      features: ['全部功能', '100GB存储', '优先支持', '自定义域名'],
      highlight: true,
      button: '立即购买'
    },
    {
      name: '企业版',
      price: '¥299',
      period: '/月',
      description: '适合大型企业',
      features: ['全部功能', '无限存储', '7x24支持', '专属客服', '定制开发'],
      highlight: false,
      button: '联系我们'
    }
  ]

  const testimonials = [
    {
      name: '王总',
      company: '某科技公司',
      content: '使用后效率提升了50%，非常推荐！',
      rating: 5
    },
    {
      name: '李经理',
      company: '某互联网公司',
      content: '产品体验很好，团队响应迅速。',
      rating: 5
    },
    {
      name: '张总监',
      company: '某集团公司',
      content: '为企业带来了显著的效益提升。',
      rating: 5
    }
  ]

  return (
    <SharedLayout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-green-700 to-teal-800" />

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute top-20 right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-20 left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-6"
            >
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-white/90 text-sm font-medium">领先的产品解决方案</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6"
            >
              打造卓越产品
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-emerald-300">
                成就非凡体验
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-white/80 mb-10 max-w-2xl mx-auto"
            >
              专业的解决方案，帮助您快速构建高质量产品，实现业务增长
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-8 py-4 rounded-full bg-white text-emerald-700 font-semibold shadow-lg hover:shadow-xl transition-all"
                type="button"
              >
                免费试用
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-8 py-4 rounded-full bg-white/10 text-white font-semibold border border-white/30 hover:bg-white/20 transition-all"
                type="button"
              >
                <Play className="w-5 h-5" />
                观看演示
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              为什么选择我们
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              专业的技术团队，优质的产品服务，帮助您取得成功
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-8 rounded-2xl bg-gray-50 hover:bg-emerald-50 transition-colors"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-100 flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              价格方案
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              选择适合您的方案，开启成功之旅
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricing.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative p-8 rounded-2xl ${
                  plan.highlight
                    ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-xl'
                    : 'bg-white text-gray-900 shadow-lg'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-yellow-400 text-yellow-900 text-sm font-medium rounded-full">
                    最受欢迎
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-white/70">{plan.period}</span>
                  </div>
                  <p className={`mt-2 ${plan.highlight ? 'text-white/80' : 'text-gray-600'}`}>
                    {plan.description}
                  </p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <Check className={`w-5 h-5 ${plan.highlight ? 'text-white' : 'text-emerald-500'}`} />
                      <span className={plan.highlight ? 'text-white/90' : 'text-gray-700'}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 rounded-xl font-semibold transition-all ${
                    plan.highlight
                      ? 'bg-white text-emerald-600 hover:bg-gray-100'
                      : 'bg-emerald-500 text-white hover:bg-emerald-600'
                  }`}
                  type="button"
                >
                  {plan.button}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              客户评价
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              来自客户的真实反馈
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 rounded-2xl bg-gray-50"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6">{testimonial.content}</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-xl">
                    👤
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.company}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-emerald-500 to-teal-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              准备好开始了吗？
            </h2>
            <p className="text-xl text-white/80 mb-10">
              立即加入我们，开启您的成功之旅
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-10 py-5 rounded-full bg-white text-emerald-600 font-semibold shadow-lg hover:shadow-xl transition-all"
              type="button"
            >
              立即开始
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-white font-bold mb-4">关于我们</h4>
              <p className="text-gray-400 text-sm">
                致力于为客户提供最优质的产品和服务
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">联系方式</h4>
              <div className="space-y-2 text-gray-400 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  contact@example.com
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  400-123-4567
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  北京市朝阳区
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">快速链接</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="hover:text-white cursor-pointer">产品介绍</li>
                <li className="hover:text-white cursor-pointer">价格方案</li>
                <li className="hover:text-white cursor-pointer">客户案例</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">关注我们</h4>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-emerald-500 cursor-pointer">
                  📱
                </div>
                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-emerald-500 cursor-pointer">
                  💬
                </div>
                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-emerald-500 cursor-pointer">
                  📧
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
            © 2024 Your Company. All rights reserved.
          </div>
        </div>
      </footer>
    </SharedLayout>
  )
}

export default LandingHome
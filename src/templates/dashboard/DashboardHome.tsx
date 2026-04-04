import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  Settings,
  Bell,
  Search,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingBag,
  Eye,
  Menu,
  LogOut,
  User,
  MoreVertical,
  Plus,
  Filter,
  Download
} from 'lucide-react'
import { SharedLayout } from '../../shared/layout/SharedLayout'

function DashboardHome() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const stats = [
    { label: '总收入', value: '¥128,450', change: '+12.5%', trend: 'up', icon: DollarSign, color: 'bg-green-500' },
    { label: '订单数', value: '1,234', change: '+8.2%', trend: 'up', icon: ShoppingBag, color: 'bg-blue-500' },
    { label: '访客', value: '45,678', change: '+23.1%', trend: 'up', icon: Eye, color: 'bg-purple-500' },
    { label: '转化率', value: '3.24%', change: '-2.1%', trend: 'down', icon: TrendingUp, color: 'bg-orange-500' }
  ]

  const recentOrders = [
    { id: 'ORD-001', customer: '张三', product: '高级套餐', amount: '¥599', status: 'completed', date: '2024-01-15' },
    { id: 'ORD-002', customer: '李四', product: '基础套餐', amount: '¥199', status: 'processing', date: '2024-01-15' },
    { id: 'ORD-003', customer: '王五', product: '企业套餐', amount: '¥1299', status: 'pending', date: '2024-01-14' },
    { id: 'ORD-004', customer: '赵六', product: '高级套餐', amount: '¥599', status: 'completed', date: '2024-01-14' },
    { id: 'ORD-005', customer: '钱七', product: '基础套餐', amount: '¥199', status: 'completed', date: '2024-01-13' }
  ]

  const topProducts = [
    { name: '高级套餐', sales: 234, revenue: '¥140,066' },
    { name: '企业套餐', sales: 156, revenue: '¥202,644' },
    { name: '基础套餐', sales: 89, revenue: '¥17,711' },
    { name: '定制服务', sales: 45, revenue: '¥67,500' }
  ]

  const menuItems = [
    { icon: LayoutDashboard, label: '仪表盘', active: true },
    { icon: ShoppingCart, label: '订单管理', active: false },
    { icon: Package, label: '商品管理', active: false },
    { icon: Users, label: '用户管理', active: false },
    { icon: TrendingUp, label: '数据分析', active: false },
    { icon: Settings, label: '系统设置', active: false }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700'
      case 'processing': return 'bg-blue-100 text-blue-700'
      case 'pending': return 'bg-yellow-100 text-yellow-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <SharedLayout>
      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar */}
        <aside
          className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-50 ${
            sidebarCollapsed ? 'w-20' : 'w-64'
          }`}
        >
          <div className="p-6 flex items-center justify-between border-b border-gray-200">
            {!sidebarCollapsed && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white text-lg font-bold">H</span>
                </div>
                <span className="text-xl font-bold text-gray-900">HumanOS</span>
              </div>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 rounded-lg hover:bg-gray-100"
              type="button"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <nav className="p-4 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.label}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  item.active
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                type="button"
              >
                <item.icon className="w-5 h-5" />
                {!sidebarCollapsed && <span>{item.label}</span>}
              </button>
            ))}
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
            <button
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all"
              type="button"
            >
              <LogOut className="w-5 h-5" />
              {!sidebarCollapsed && <span>退出登录</span>}
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
          {/* Header */}
          <header className="bg-white border-b border-gray-200 px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="搜索订单、商品、用户..."
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button
                  className="p-2.5 rounded-xl hover:bg-gray-100 relative"
                  type="button"
                >
                  <Bell className="w-5 h-5 text-gray-600" />
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
                </button>
                <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div className="hidden sm:block">
                    <div className="text-sm font-medium text-gray-900">管理员</div>
                    <div className="text-xs text-gray-500">admin@humanos.dev</div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <div className="p-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className={`flex items-center gap-1 text-sm font-medium ${
                      stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {stat.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      {stat.change}
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Charts Row */}
            <div className="grid lg:grid-cols-2 gap-6 mb-8">
              {/* Revenue Chart Placeholder */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-900">销售趋势</h3>
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 text-sm bg-indigo-50 text-indigo-600 rounded-lg" type="button">本周</button>
                    <button className="px-3 py-1.5 text-sm text-gray-500 hover:bg-gray-100 rounded-lg" type="button">本月</button>
                    <button className="px-3 py-1.5 text-sm text-gray-500 hover:bg-gray-100 rounded-lg" type="button">本年</button>
                  </div>
                </div>
                <div className="h-64 flex items-end justify-between gap-2">
                  {[65, 45, 78, 52, 90, 68, 85].map((height, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="flex-1 bg-gradient-to-t from-indigo-500 to-purple-500 rounded-t-lg"
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-4 text-sm text-gray-500">
                  <span>周一</span>
                  <span>周二</span>
                  <span>周三</span>
                  <span>周四</span>
                  <span>周五</span>
                  <span>周六</span>
                  <span>周日</span>
                </div>
              </div>

              {/* Top Products */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-900">热销商品</h3>
                  <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium" type="button">
                    查看全部
                  </button>
                </div>
                <div className="space-y-4">
                  {topProducts.map((product, index) => (
                    <div key={product.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-500">{product.sales} 销量</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gray-900">{product.revenue}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">最近订单</h3>
                <div className="flex gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg" type="button">
                    <Filter className="w-4 h-4" />
                    筛选
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg" type="button">
                    <Download className="w-4 h-4" />
                    导出
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-4 px-4 text-sm font-medium text-gray-500">订单号</th>
                      <th className="text-left py-4 px-4 text-sm font-medium text-gray-500">客户</th>
                      <th className="text-left py-4 px-4 text-sm font-medium text-gray-500">商品</th>
                      <th className="text-left py-4 px-4 text-sm font-medium text-gray-500">金额</th>
                      <th className="text-left py-4 px-4 text-sm font-medium text-gray-500">状态</th>
                      <th className="text-left py-4 px-4 text-sm font-medium text-gray-500">日期</th>
                      <th className="text-left py-4 px-4 text-sm font-medium text-gray-500">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4 text-sm font-medium text-gray-900">{order.id}</td>
                        <td className="py-4 px-4 text-sm text-gray-600">{order.customer}</td>
                        <td className="py-4 px-4 text-sm text-gray-600">{order.product}</td>
                        <td className="py-4 px-4 text-sm font-medium text-gray-900">{order.amount}</td>
                        <td className="py-4 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            {order.status === 'completed' ? '已完成' : order.status === 'processing' ? '处理中' : '待处理'}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-500">{order.date}</td>
                        <td className="py-4 px-4">
                          <button className="p-1.5 hover:bg-gray-100 rounded-lg" type="button">
                            <MoreVertical className="w-4 h-4 text-gray-400" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SharedLayout>
  )
}

export default DashboardHome
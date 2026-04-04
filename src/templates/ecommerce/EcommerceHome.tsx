import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
  Star,
  Plus,
  Minus,
  Tag,
  Truck,
  Shield,
  RefreshCw,
  ChevronRight,
  Filter,
  Grid,
  List
} from 'lucide-react'
import { SharedLayout } from '../../shared/layout/SharedLayout'

function EcommerceHome() {
  const [cartOpen, setCartOpen] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const categories = [
    { name: '电子产品', icon: '📱', count: 120 },
    { name: '服装鞋包', icon: '👕', count: 85 },
    { name: '家居用品', icon: '🏠', count: 64 },
    { name: '美妆护肤', icon: '💄', count: 92 },
    { name: '运动户外', icon: '⚽', count: 78 },
    { name: '食品饮料', icon: '🍫', count: 156 }
  ]

  const products = [
    { id: 1, name: 'iPhone 15 Pro', category: '电子产品', price: 7999, originalPrice: 8999, rating: 4.9, reviews: 2340, image: '📱', tag: '热销' },
    { id: 2, name: 'MacBook Air M3', category: '电子产品', price: 9499, originalPrice: 10999, rating: 4.8, reviews: 1856, image: '💻', tag: '新品' },
    { id: 3, name: 'AirPods Pro 2', category: '电子产品', price: 1899, originalPrice: 1999, rating: 4.7, reviews: 3420, image: '🎧', tag: null },
    { id: 4, name: 'Nike Air Max', category: '运动户外', price: 899, originalPrice: 1299, rating: 4.6, reviews: 980, image: '👟', tag: '折扣' },
    { id: 5, name: 'SK-II 护肤套装', category: '美妆护肤', price: 1590, originalPrice: 1890, rating: 4.9, reviews: 5670, image: '✨', tag: '爆款' },
    { id: 6, name: '宜家北欧沙发', category: '家居用品', price: 2999, originalPrice: 3999, rating: 4.5, reviews: 432, image: '🛋️', tag: '清仓' },
    { id: 7, name: 'Apple Watch S9', category: '电子产品', price: 3299, originalPrice: 3799, rating: 4.8, reviews: 2100, image: '⌚', tag: null },
    { id: 8, name: '索尼降噪耳机', category: '电子产品', price: 2599, originalPrice: 2899, rating: 4.7, reviews: 1560, image: '🎵', tag: '推荐' }
  ]

  const banners = [
    { title: '春季大促', subtitle: '满减优惠至高减500', color: 'from-red-500 to-orange-500' },
    { title: '新品上市', subtitle: 'iPhone 15 系列', color: 'from-blue-500 to-cyan-500' },
    { title: '会员专享', subtitle: '积分抵现最高50%', color: 'from-purple-500 to-pink-500' }
  ]

  const cartItems = [
    { name: 'iPhone 15 Pro', price: 7999, quantity: 1, image: '📱' },
    { name: 'AirPods Pro 2', price: 1899, quantity: 2, image: '🎧' }
  ]

  return (
    <SharedLayout>
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">HumanOS Shop</span>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-xl mx-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="搜索商品、品牌..."
                  className="w-full pl-12 pr-4 py-2.5 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button className="p-2.5 rounded-full hover:bg-gray-100 relative" type="button">
                <Heart className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={() => setCartOpen(!cartOpen)}
                className="p-2.5 rounded-full hover:bg-gray-100 relative"
                type="button"
              >
                <ShoppingCart className="w-5 h-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">2</span>
              </button>
              <button className="flex items-center gap-2 p-2.5 rounded-full hover:bg-gray-100" type="button">
                <User className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="relative h-96 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NCAwLTE4IDguMDYtMTggMThzOC4wNiAxOCAxOCAxOCAxOC04LjA2IDE4LTE4LTguMDYtMTgtMTgtOHptMCAzMmMtNy43Mi0wLTE0LTYuMjgtMTQtMTRzNi4yOC0xNCAxNC0xNCAxNCA2LjI4IDE0IDE0LTYuMjggMTQtMTQtMTR6IiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjEiLz48L2c+PC9zdmc+')] opacity-30" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="grid md:grid-cols-2 gap-12 items-center w-full">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-white"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full mb-6">
                <Tag className="w-4 h-4" />
                限时优惠
              </div>
              <h1 className="text-5xl font-bold mb-4">
                春季大促
                <span className="block text-yellow-300">低至5折</span>
              </h1>
              <p className="text-xl text-white/80 mb-8">
                精选商品满减优惠，下单即送精美礼品
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-red-500 font-semibold rounded-full shadow-lg"
                type="button"
              >
                立即抢购
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </motion.div>

            <div className="hidden md:flex justify-center">
              <div className="text-[200px]">🛍️</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="p-6 rounded-2xl bg-gray-50 hover:bg-red-50 cursor-pointer text-center"
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <div className="font-medium text-gray-900">{category.name}</div>
                <div className="text-sm text-gray-500">{category.count} 件商品</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">热门商品</h2>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-red-500 text-white' : 'bg-white text-gray-600'}`}
                type="button"
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-red-500 text-white' : 'bg-white text-gray-600'}`}
                type="button"
              >
                <List className="w-5 h-5" />
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg" type="button">
                <Filter className="w-4 h-4" />
                筛选
              </button>
            </div>
          </div>

          <div className={viewMode === 'grid' ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6' : 'space-y-4'}>
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
              >
                <div className="relative">
                  <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-6xl">
                    {product.image}
                  </div>
                  {product.tag && (
                    <div className="absolute top-3 left-3 px-3 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
                      {product.tag}
                    </div>
                  )}
                  <button
                    className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-red-500 hover:text-white transition-colors"
                    type="button"
                  >
                    <Heart className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-4">
                  <div className="text-sm text-gray-500 mb-1">{product.category}</div>
                  <div className="font-medium text-gray-900 mb-2 line-clamp-2">{product.name}</div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                    </div>
                    <span className="text-sm text-gray-400">({product.reviews})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xl font-bold text-red-500">¥{product.price}</span>
                      <span className="text-sm text-gray-400 line-through ml-2">¥{product.originalPrice}</span>
                    </div>
                    <button
                      className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                      type="button"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Truck, title: '免费配送', desc: '满99元免运费' },
              { icon: Shield, title: '正品保障', desc: '100%正品保证' },
              { icon: RefreshCw, title: '7天无理由', desc: '退换货无忧' },
              { icon: User, title: '专属客服', desc: '7x24小时服务' }
            ].map((feature, index) => (
              <div key={feature.title} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">{feature.title}</div>
                  <div className="text-sm text-gray-500">{feature.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cart Sidebar */}
      {cartOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setCartOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">购物车 (2)</h3>
                <button onClick={() => setCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg" type="button">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.name} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center text-2xl">
                      {item.image}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{item.name}</div>
                      <div className="text-red-500 font-bold">¥{item.price}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center" type="button">
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center" type="button">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t">
                <div className="flex justify-between mb-4">
                  <span className="text-gray-600">合计</span>
                  <span className="text-xl font-bold text-gray-900">¥11,797</span>
                </div>
                <button className="w-full py-4 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600" type="button">
                  立即结算
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </SharedLayout>
  )
}

export default EcommerceHome
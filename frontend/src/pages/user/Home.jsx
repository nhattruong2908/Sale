import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Truck, RotateCcw, Headphones } from 'lucide-react';

const FEATURED_PRODUCTS = [
  { id: 1, name: 'Yến sào tinh chế cao cấp 100g', price: 2850000, image: 'https://placehold.co/300x300/fef9c3/ca8a04?text=Y%E1%BA%BFn+t%E1%BB%95', category: 'Yến tinh chế' },
  { id: 2, name: 'Yến chưng đường phèn hũ 70ml (lốc 6 hũ)', price: 480000, image: 'https://placehold.co/300x300/fef3c7/b45309?text=Y%E1%BA%BFn+ch%C6%B0ng', category: 'Yến chưng sẵn' },
  { id: 3, name: 'Yến thô nguyên tổ đảo thiên nhiên 50g', price: 1650000, image: 'https://placehold.co/300x300/f0fdf4/15803d?text=Y%E1%BA%BFn+th%C3%B4', category: 'Yến thô' },
  { id: 4, name: 'Set quà tặng yến sào cao cấp', price: 3200000, image: 'https://placehold.co/300x300/fdf2f8/be185d?text=Qu%C3%A0+t%E1%BA%B7ng', category: 'Quà tặng yến' },
];

const CATEGORIES = [
  { name: 'Yến thô', icon: '🐦', color: 'bg-blue-50 text-blue-600' },
  { name: 'Yến tinh chế', icon: '🧺', color: 'bg-purple-50 text-purple-600' },
  { name: 'Yến chưng sẵn', icon: '🥣', color: 'bg-yellow-50 text-yellow-600' },
  { name: 'Yến sợi', icon: '🧵', color: 'bg-green-50 text-green-600' },
  { name: 'Quà tặng yến', icon: '🎁', color: 'bg-red-50 text-red-600' },
  { name: 'Yến cho bé & mẹ bầu', icon: '👶', color: 'bg-orange-50 text-orange-600' },
];

function formatPrice(price) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
}

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Tổ yến nguyên chất<br />Tinh hoa từ thiên nhiên
            </h1>
            <p className="text-blue-100 text-lg mb-8">
              Yến sào cao cấp, nguồn gốc Khánh Hòa - Nha Trang, kiểm định chất lượng, giao hàng toàn quốc.
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <Link to="/products" className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-2">
                Mua ngay <ArrowRight size={18} />
              </Link>
              <Link to="/products" className="border border-white/40 text-white px-6 py-3 rounded-lg hover:bg-white/10 transition-colors">
                Xem danh mục
              </Link>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <img
              src="https://placehold.co/460x320/1d4ed8/ffffff?text=Y%E1%BA%BFn+Vi%E1%BB%87t"
              alt="Yến Việt"
              className="rounded-2xl shadow-2xl w-full max-w-sm md:max-w-none"
            />
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { value: '10+', label: 'Năm kinh nghiệm' },
            { value: '50K+', label: 'Khách hàng' },
            { value: '100%', label: 'Tự nhiên' },
            { value: '24/7', label: 'Hỗ trợ' },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-2xl font-bold text-blue-600">{s.value}</div>
              <div className="text-sm text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Danh mục sản phẩm</h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.name}
              to={`/products?category=${cat.name}`}
              className={`${cat.color} rounded-xl p-4 text-center hover:scale-105 transition-transform cursor-pointer`}
            >
              <div className="text-3xl mb-1">{cat.icon}</div>
              <div className="text-xs font-medium">{cat.name}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Sản phẩm nổi bật</h2>
          <Link to="/products" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
            Xem tất cả <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {FEATURED_PRODUCTS.map((p) => (
            <Link key={p.id} to={`/products/${p.id}`} className="card hover:shadow-md transition-shadow group">
              <div className="overflow-hidden rounded-t-xl">
                <img src={p.image} alt={p.name} className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-3">
                <span className="text-xs text-blue-600 font-medium">{p.category}</span>
                <h3 className="text-sm font-medium text-gray-800 mt-0.5 line-clamp-2">{p.name}</h3>
                <p className="text-base font-bold text-blue-600 mt-1">{formatPrice(p.price)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Truck, title: 'Giao hàng toàn quốc', desc: 'Miễn phí cho đơn từ 1.000.000đ' },
            { icon: ShieldCheck, title: '100% tự nhiên', desc: 'Không chất bảo quản, không tẩy trắng' },
            { icon: RotateCcw, title: 'Đổi trả trong 7 ngày', desc: 'Nếu sản phẩm lỗi' },
            { icon: Headphones, title: 'Tư vấn tận tâm', desc: 'Hỗ trợ 24/7' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex flex-col items-center text-center gap-2">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <Icon className="text-blue-600" size={22} />
              </div>
              <h3 className="font-semibold text-gray-800 text-sm">{title}</h3>
              <p className="text-xs text-gray-500">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

import { TrendingUp, ShoppingBag, Users, Package, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const STATS = [
  { label: 'Doanh thu tháng này', value: '48,520,000 ₫', change: '+12.5%', up: true, icon: TrendingUp, color: 'bg-blue-50 text-blue-600' },
  { label: 'Đơn hàng mới', value: '284', change: '+8.2%', up: true, icon: ShoppingBag, color: 'bg-purple-50 text-purple-600' },
  { label: 'Khách hàng', value: '1,824', change: '+4.1%', up: true, icon: Users, color: 'bg-green-50 text-green-600' },
  { label: 'Sản phẩm', value: '342', change: '-2.3%', up: false, icon: Package, color: 'bg-orange-50 text-orange-600' },
];

const RECENT_ORDERS = [
  { id: 'ORD001', customer: 'Nguyễn Văn A', total: 548000, status: 'delivered', date: '2024-11-10' },
  { id: 'ORD002', customer: 'Trần Thị B', total: 199000, status: 'shipping', date: '2024-11-09' },
  { id: 'ORD003', customer: 'Lê Văn C', total: 1020000, status: 'pending', date: '2024-11-08' },
  { id: 'ORD004', customer: 'Phạm Thị D', total: 320000, status: 'confirmed', date: '2024-11-07' },
  { id: 'ORD005', customer: 'Hoàng Văn E', total: 450000, status: 'cancelled', date: '2024-11-06' },
];

const TOP_PRODUCTS = [
  { name: 'Áo thun nam basic', sold: 240, revenue: 47760000 },
  { name: 'Giày sneaker trắng', sold: 185, revenue: 157250000 },
  { name: 'Tai nghe bluetooth', sold: 142, revenue: 69580000 },
  { name: 'Balo laptop 15"', sold: 98, revenue: 31360000 },
];

const STATUS_BADGE = {
  pending: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-blue-100 text-blue-700',
  shipping: 'bg-purple-100 text-purple-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
};
const STATUS_LABEL = {
  pending: 'Chờ xác nhận', confirmed: 'Đã xác nhận',
  shipping: 'Đang giao', delivered: 'Đã giao', cancelled: 'Đã hủy',
};

function formatPrice(price) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
}

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-0.5">Tổng quan hoạt động kinh doanh</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {STATS.map(({ label, value, change, up, icon: Icon, color }) => (
          <div key={label} className="card p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">{label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
                <div className={`flex items-center gap-1 mt-1 text-sm font-medium ${up ? 'text-green-600' : 'text-red-500'}`}>
                  {up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {change} so với tháng trước
                </div>
              </div>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
                <Icon size={20} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent orders */}
        <div className="lg:col-span-2 card">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Đơn hàng gần đây</h2>
            <a href="/admin/orders" className="text-sm text-blue-600 hover:underline">Xem tất cả</a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-left">
                  <th className="px-5 py-3 font-medium text-gray-500">Mã đơn</th>
                  <th className="px-5 py-3 font-medium text-gray-500">Khách hàng</th>
                  <th className="px-5 py-3 font-medium text-gray-500">Trạng thái</th>
                  <th className="px-5 py-3 font-medium text-gray-500 text-right">Tổng tiền</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {RECENT_ORDERS.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3 font-medium text-gray-800">#{order.id}</td>
                    <td className="px-5 py-3 text-gray-700">{order.customer}</td>
                    <td className="px-5 py-3">
                      <span className={`badge ${STATUS_BADGE[order.status]}`}>{STATUS_LABEL[order.status]}</span>
                    </td>
                    <td className="px-5 py-3 text-right font-medium text-gray-800">{formatPrice(order.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top products */}
        <div className="card">
          <div className="p-5 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Sản phẩm bán chạy</h2>
          </div>
          <div className="p-5 space-y-4">
            {TOP_PRODUCTS.map((p, i) => (
              <div key={p.name} className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 text-xs font-bold flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{p.name}</p>
                  <p className="text-xs text-gray-500">Đã bán: {p.sold}</p>
                </div>
                <span className="text-xs font-medium text-gray-700 shrink-0">{formatPrice(p.revenue)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

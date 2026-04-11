import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, ChevronRight, Clock, CheckCircle, XCircle, Truck } from 'lucide-react';

const MOCK_ORDERS = [
  { id: 'ORD001', date: '2024-11-10', total: 548000, status: 'delivered', items: 3 },
  { id: 'ORD002', date: '2024-11-08', total: 199000, status: 'shipping', items: 1 },
  { id: 'ORD003', date: '2024-11-05', total: 1020000, status: 'pending', items: 2 },
  { id: 'ORD004', date: '2024-10-30', total: 320000, status: 'cancelled', items: 1 },
];

const STATUS_CONFIG = {
  pending: { label: 'Chờ xác nhận', icon: Clock, color: 'bg-yellow-100 text-yellow-700' },
  confirmed: { label: 'Đã xác nhận', icon: CheckCircle, color: 'bg-blue-100 text-blue-700' },
  shipping: { label: 'Đang giao', icon: Truck, color: 'bg-purple-100 text-purple-700' },
  delivered: { label: 'Đã giao', icon: CheckCircle, color: 'bg-green-100 text-green-700' },
  cancelled: { label: 'Đã hủy', icon: XCircle, color: 'bg-red-100 text-red-700' },
};

function formatPrice(price) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
}

export default function Orders() {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? MOCK_ORDERS : MOCK_ORDERS.filter((o) => o.status === filter);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Đơn hàng của tôi</h1>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
        {[['all', 'Tất cả'], ['pending', 'Chờ xác nhận'], ['shipping', 'Đang giao'], ['delivered', 'Đã giao'], ['cancelled', 'Đã hủy']].map(([v, l]) => (
          <button
            key={v}
            onClick={() => setFilter(v)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              filter === v ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
            }`}
          >
            {l}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <Package size={48} className="mx-auto mb-3 opacity-40" />
          <p>Không có đơn hàng nào</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((order) => {
            const cfg = STATUS_CONFIG[order.status];
            const Icon = cfg.icon;
            return (
              <div key={order.id} className="card p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-800">#{order.id}</span>
                      <span className={`badge ${cfg.color} flex items-center gap-1`}>
                        <Icon size={11} /> {cfg.label}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">{order.date} · {order.items} sản phẩm</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-blue-600">{formatPrice(order.total)}</p>
                    <Link to={`/orders/${order.id}`} className="text-sm text-gray-500 hover:text-blue-600 flex items-center gap-0.5 mt-0.5 transition-colors">
                      Chi tiết <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

import { useState } from 'react';
import { Search, Eye, X } from 'lucide-react';

const INIT_ORDERS = [
  { id: 'ORD001', customer: 'Nguyễn Văn A', phone: '0912345678', total: 2850000, status: 'delivered', date: '2024-11-10', items: [{ name: 'Yến tinh chế cao cấp 100g', qty: 1, price: 2850000 }] },
  { id: 'ORD002', customer: 'Trần Thị B', phone: '0987654321', total: 480000, status: 'shipping', date: '2024-11-09', items: [{ name: 'Yến chưng đường phèn (lốc 6 hũ)', qty: 1, price: 480000 }] },
  { id: 'ORD003', customer: 'Lê Văn C', phone: '0901234567', total: 1730000, status: 'pending', date: '2024-11-08', items: [{ name: 'Yến thô nguyên tổ 50g', qty: 1, price: 1650000 }, { name: 'Yến chưng táo đỏ hạt sen', qty: 1, price: 80000 }] },
  { id: 'ORD004', customer: 'Phạm Thị D', phone: '0967890123', total: 3200000, status: 'confirmed', date: '2024-11-07', items: [{ name: 'Set quà tặng yến sào hộp gỗ', qty: 1, price: 3200000 }] },
  { id: 'ORD005', customer: 'Hoàng Văn E', phone: '0934567890', total: 1450000, status: 'cancelled', date: '2024-11-06', items: [{ name: 'Yến sợi tinh chế 50g', qty: 1, price: 1450000 }] },
];

const STATUS_CONFIG = {
  pending: { label: 'Chờ xác nhận', color: 'bg-yellow-100 text-yellow-700' },
  confirmed: { label: 'Đã xác nhận', color: 'bg-blue-100 text-blue-700' },
  shipping: { label: 'Đang giao', color: 'bg-purple-100 text-purple-700' },
  delivered: { label: 'Đã giao', color: 'bg-green-100 text-green-700' },
  cancelled: { label: 'Đã hủy', color: 'bg-red-100 text-red-700' },
};

const STATUS_FLOW = ['pending', 'confirmed', 'shipping', 'delivered'];

function formatPrice(price) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
}

export default function AdminOrders() {
  const [orders, setOrders] = useState(INIT_ORDERS);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filtered = orders.filter((o) => {
    const matchSearch = o.customer.toLowerCase().includes(search.toLowerCase()) || o.id.includes(search);
    const matchStatus = filterStatus === 'all' || o.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const updateStatus = (id, status) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    if (selectedOrder?.id === id) setSelectedOrder((o) => ({ ...o, status }));
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Quản lý đơn hàng</h1>
        <p className="text-sm text-gray-500">{orders.length} đơn hàng</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input type="text" placeholder="Tìm theo mã đơn, tên khách..." value={search} onChange={(e) => setSearch(e.target.value)} className="input pl-9" />
        </div>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="input w-auto">
          <option value="all">Tất cả trạng thái</option>
          {Object.entries(STATUS_CONFIG).map(([v, { label }]) => (
            <option key={v} value={v}>{label}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 text-left">
                <th className="px-5 py-3 font-medium text-gray-600">Mã đơn</th>
                <th className="px-5 py-3 font-medium text-gray-600">Khách hàng</th>
                <th className="px-5 py-3 font-medium text-gray-600">Ngày đặt</th>
                <th className="px-5 py-3 font-medium text-gray-600">Tổng tiền</th>
                <th className="px-5 py-3 font-medium text-gray-600">Trạng thái</th>
                <th className="px-5 py-3 font-medium text-gray-600 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((order) => {
                const cfg = STATUS_CONFIG[order.status];
                return (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3 font-medium text-gray-800">#{order.id}</td>
                    <td className="px-5 py-3 text-gray-700">{order.customer}</td>
                    <td className="px-5 py-3 text-gray-500">{order.date}</td>
                    <td className="px-5 py-3 font-medium text-gray-800">{formatPrice(order.total)}</td>
                    <td className="px-5 py-3">
                      <span className={`badge ${cfg.color}`}>{cfg.label}</span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <button onClick={() => setSelectedOrder(order)} className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye size={15} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && <p className="text-center py-10 text-gray-400 text-sm">Không có đơn hàng</p>}
        </div>
      </div>

      {/* Order detail modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="card w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-900">Chi tiết đơn #{selectedOrder.id}</h2>
              <button onClick={() => setSelectedOrder(null)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
              <div><span className="text-gray-500">Khách hàng:</span> <span className="font-medium">{selectedOrder.customer}</span></div>
              <div><span className="text-gray-500">SĐT:</span> <span className="font-medium">{selectedOrder.phone}</span></div>
              <div><span className="text-gray-500">Ngày đặt:</span> <span className="font-medium">{selectedOrder.date}</span></div>
              <div>
                <span className="text-gray-500">Trạng thái: </span>
                <span className={`badge ${STATUS_CONFIG[selectedOrder.status].color}`}>{STATUS_CONFIG[selectedOrder.status].label}</span>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4 mb-4">
              <h3 className="font-medium text-gray-700 mb-2 text-sm">Sản phẩm</h3>
              <div className="space-y-2">
                {selectedOrder.items.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-gray-700">{item.name} x{item.qty}</span>
                    <span className="font-medium">{formatPrice(item.price * item.qty)}</span>
                  </div>
                ))}
                <div className="flex justify-between font-semibold pt-2 border-t border-gray-100">
                  <span>Tổng cộng</span>
                  <span className="text-blue-600">{formatPrice(selectedOrder.total)}</span>
                </div>
              </div>
            </div>

            {/* Update status */}
            {selectedOrder.status !== 'cancelled' && selectedOrder.status !== 'delivered' && (
              <div className="border-t border-gray-100 pt-4">
                <h3 className="font-medium text-gray-700 mb-2 text-sm">Cập nhật trạng thái</h3>
                <div className="flex flex-wrap gap-2">
                  {STATUS_FLOW.filter((s) => STATUS_FLOW.indexOf(s) > STATUS_FLOW.indexOf(selectedOrder.status)).map((s) => (
                    <button key={s} onClick={() => updateStatus(selectedOrder.id, s)} className="btn-primary text-xs py-1.5 px-3">
                      → {STATUS_CONFIG[s].label}
                    </button>
                  ))}
                  <button onClick={() => updateStatus(selectedOrder.id, 'cancelled')} className="btn-danger text-xs py-1.5 px-3">
                    Hủy đơn
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

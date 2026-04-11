import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, CreditCard, Wallet, Truck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { orderAPI } from '../../services/api';

function formatPrice(price) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
}

const PAYMENT_METHODS = [
  { id: 'cod', label: 'Thanh toán khi nhận hàng', icon: Truck },
  { id: 'bank', label: 'Chuyển khoản ngân hàng', icon: Wallet },
  { id: 'card', label: 'Thẻ tín dụng / ghi nợ', icon: CreditCard },
];

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [payment, setPayment] = useState('cod');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    name: '', phone: '', address: '', city: '', note: '',
  });

  const shipping = total >= 300000 ? 0 : 30000;
  const grandTotal = total + shipping;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // await orderAPI.create({ ...form, payment, items, total: grandTotal });
      await new Promise((r) => setTimeout(r, 1000)); // mock delay
      clearCart();
      setSuccess(true);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="text-green-600" size={40} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Đặt hàng thành công!</h2>
        <p className="text-gray-500 mb-6">Cảm ơn bạn đã mua hàng. Chúng tôi sẽ giao hàng trong 2-3 ngày làm việc.</p>
        <div className="flex gap-3 justify-center">
          <button onClick={() => navigate('/orders')} className="btn-primary">Xem đơn hàng</button>
          <button onClick={() => navigate('/')} className="btn-secondary">Về trang chủ</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Thanh toán</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: form */}
          <div className="lg:col-span-2 space-y-4">
            {/* Shipping info */}
            <div className="card p-5">
              <h2 className="font-semibold text-gray-900 mb-4">Thông tin giao hàng</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên *</label>
                  <input name="name" value={form.name} onChange={handleChange} required className="input" placeholder="Nguyễn Văn A" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại *</label>
                  <input name="phone" value={form.phone} onChange={handleChange} required className="input" placeholder="0912 345 678" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ *</label>
                  <input name="address" value={form.address} onChange={handleChange} required className="input" placeholder="Số nhà, tên đường, phường/xã" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tỉnh / Thành phố *</label>
                  <input name="city" value={form.city} onChange={handleChange} required className="input" placeholder="Hà Nội" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ghi chú</label>
                  <input name="note" value={form.note} onChange={handleChange} className="input" placeholder="Ghi chú cho shipper..." />
                </div>
              </div>
            </div>

            {/* Payment method */}
            <div className="card p-5">
              <h2 className="font-semibold text-gray-900 mb-4">Phương thức thanh toán</h2>
              <div className="space-y-2">
                {PAYMENT_METHODS.map(({ id, label, icon: Icon }) => (
                  <label
                    key={id}
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                      payment === id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      value={id}
                      checked={payment === id}
                      onChange={() => setPayment(id)}
                      className="accent-blue-600"
                    />
                    <Icon size={18} className={payment === id ? 'text-blue-600' : 'text-gray-500'} />
                    <span className="text-sm font-medium text-gray-700">{label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right: order summary */}
          <div>
            <div className="card p-5 sticky top-20">
              <h2 className="font-semibold text-gray-900 mb-4">Đơn hàng ({items.length} sản phẩm)</h2>
              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-2 text-sm">
                    <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-800 truncate">{item.name}</p>
                      <p className="text-gray-500">x{item.quantity}</p>
                    </div>
                    <span className="font-medium text-gray-700">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 pt-3 space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Tạm tính</span><span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Vận chuyển</span>
                  <span className={shipping === 0 ? 'text-green-600' : ''}>{shipping === 0 ? 'Miễn phí' : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between font-bold text-gray-900 text-base pt-2 border-t border-gray-100">
                  <span>Tổng</span><span className="text-blue-600">{formatPrice(grandTotal)}</span>
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full mt-4 py-3 text-base disabled:opacity-70"
              >
                {loading ? 'Đang xử lý...' : 'Đặt hàng'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

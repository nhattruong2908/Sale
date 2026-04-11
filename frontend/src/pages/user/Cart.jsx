import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '../../context/CartContext';

function formatPrice(price) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
}

export default function Cart() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <ShoppingBag size={64} className="mx-auto mb-4 text-gray-300" />
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Giỏ hàng trống</h2>
        <p className="text-gray-500 mb-6">Hãy thêm sản phẩm vào giỏ hàng của bạn.</p>
        <Link to="/products" className="btn-primary inline-flex">Tiếp tục mua sắm</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Giỏ hàng ({items.length})</h1>
        <button onClick={clearCart} className="text-sm text-red-500 hover:text-red-700 transition-colors">
          Xóa tất cả
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Items */}
        <div className="lg:col-span-2 space-y-3">
          {items.map((item) => (
            <div key={item.id} className="card p-4 flex gap-4">
              <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-800 truncate">{item.name}</h3>
                <p className="text-blue-600 font-bold mt-0.5">{formatPrice(item.price)}</p>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center border border-gray-200 rounded-lg">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1.5 hover:bg-gray-100 rounded-l-lg transition-colors"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1.5 hover:bg-gray-100 rounded-r-lg transition-colors"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                  <span className="text-sm text-gray-500">= {formatPrice(item.price * item.quantity)}</span>
                </div>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="text-gray-400 hover:text-red-500 transition-colors shrink-0 p-1"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div>
          <div className="card p-5 sticky top-20">
            <h2 className="font-semibold text-gray-900 mb-4">Tóm tắt đơn hàng</h2>
            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Tạm tính ({items.reduce((s, i) => s + i.quantity, 0)} sản phẩm)</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Phí vận chuyển</span>
                <span className="text-green-600">{total >= 300000 ? 'Miễn phí' : formatPrice(30000)}</span>
              </div>
              <div className="border-t border-gray-100 pt-2.5 flex justify-between font-semibold text-gray-900 text-base">
                <span>Tổng cộng</span>
                <span className="text-blue-600">{formatPrice(total >= 300000 ? total : total + 30000)}</span>
              </div>
            </div>
            <button
              onClick={() => navigate('/checkout')}
              className="btn-primary w-full mt-4 py-3 text-base"
            >
              Tiến hành thanh toán
            </button>
            <Link to="/products" className="flex items-center justify-center gap-1.5 mt-3 text-sm text-gray-500 hover:text-gray-700">
              <ArrowLeft size={14} /> Tiếp tục mua sắm
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

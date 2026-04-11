import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-white font-bold text-lg">ShopVN</span>
            </div>
            <p className="text-sm leading-relaxed">Nền tảng mua sắm trực tuyến uy tín, nhanh chóng và tiện lợi.</p>
          </div>

          <div>
            <h4 className="text-white font-medium mb-3">Liên kết</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">Trang chủ</Link></li>
              <li><Link to="/products" className="hover:text-white transition-colors">Sản phẩm</Link></li>
              <li><Link to="/orders" className="hover:text-white transition-colors">Đơn hàng</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-3">Hỗ trợ</h4>
            <ul className="space-y-2 text-sm">
              <li>Email: support@shopvn.vn</li>
              <li>Hotline: 1800 1234</li>
              <li>Thứ 2 - Thứ 7: 8:00 - 22:00</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm">
          © {new Date().getFullYear()} ShopVN. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

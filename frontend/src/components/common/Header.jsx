import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut, LayoutDashboard, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

export default function Header() {
  const { user, logout, isAdmin } = useAuth();
  const { count } = useCart();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-xl font-bold text-gray-900">ShopVN</span>
          </Link>

          {/* Nav links - desktop */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Trang chủ</Link>
            <Link to="/products" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Sản phẩm</Link>
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {/* Cart */}
            <Link to="/cart" className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors">
              <ShoppingCart size={20} />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {count > 99 ? '99+' : count}
                </span>
              )}
            </Link>

            {user ? (
              <div className="hidden md:flex items-center gap-2">
                {isAdmin && (
                  <Link to="/admin" className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-blue-600 transition-colors">
                    <LayoutDashboard size={16} />
                    Admin
                  </Link>
                )}
                <Link to="/profile" className="flex items-center gap-1.5 text-sm text-gray-700 hover:text-blue-600 transition-colors">
                  <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 text-xs font-medium">{user.name?.[0]?.toUpperCase()}</span>
                  </div>
                  <span>{user.name}</span>
                </Link>
                <button onClick={handleLogout} className="p-2 text-gray-500 hover:text-red-500 transition-colors">
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link to="/login" className="btn-secondary text-sm py-1.5 px-3">Đăng nhập</Link>
                <Link to="/register" className="btn-primary text-sm py-1.5 px-3">Đăng ký</Link>
              </div>
            )}

            {/* Mobile menu toggle */}
            <button className="md:hidden p-2 text-gray-600" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 py-3 space-y-2">
            <Link to="/" className="block px-2 py-1.5 text-sm text-gray-700" onClick={() => setMenuOpen(false)}>Trang chủ</Link>
            <Link to="/products" className="block px-2 py-1.5 text-sm text-gray-700" onClick={() => setMenuOpen(false)}>Sản phẩm</Link>
            {user ? (
              <>
                {isAdmin && <Link to="/admin" className="block px-2 py-1.5 text-sm text-gray-700" onClick={() => setMenuOpen(false)}>Admin Dashboard</Link>}
                <Link to="/profile" className="block px-2 py-1.5 text-sm text-gray-700" onClick={() => setMenuOpen(false)}>Tài khoản</Link>
                <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="block px-2 py-1.5 text-sm text-red-600">Đăng xuất</button>
              </>
            ) : (
              <>
                <Link to="/login" className="block px-2 py-1.5 text-sm text-gray-700" onClick={() => setMenuOpen(false)}>Đăng nhập</Link>
                <Link to="/register" className="block px-2 py-1.5 text-sm text-blue-600 font-medium" onClick={() => setMenuOpen(false)}>Đăng ký</Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

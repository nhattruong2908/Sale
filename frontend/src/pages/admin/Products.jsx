import { useState } from 'react';
import { Plus, Search, Edit2, Trash2, X } from 'lucide-react';

const INIT_PRODUCTS = [
  { id: 1, name: 'Yến sào tinh chế cao cấp 100g', category: 'Yến tinh chế', price: 2850000, stock: 40, status: 'active' },
  { id: 2, name: 'Yến chưng đường phèn hũ 70ml (lốc 6 hũ)', category: 'Yến chưng sẵn', price: 480000, stock: 120, status: 'active' },
  { id: 3, name: 'Yến thô nguyên tổ đảo thiên nhiên 50g', category: 'Yến thô', price: 1650000, stock: 0, status: 'out_of_stock' },
  { id: 4, name: 'Set quà tặng yến sào hộp gỗ', category: 'Quà tặng yến', price: 3200000, stock: 25, status: 'active' },
  { id: 5, name: 'Yến sợi tinh chế 50g', category: 'Yến sợi', price: 1450000, stock: 60, status: 'active' },
];

function formatPrice(price) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
}

const EMPTY_FORM = { name: '', category: '', price: '', stock: '', description: '', status: 'active' };

export default function AdminProducts() {
  const [products, setProducts] = useState(INIT_PRODUCTS);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [deleteId, setDeleteId] = useState(null);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const openCreate = () => { setForm(EMPTY_FORM); setEditItem(null); setShowModal(true); };
  const openEdit = (p) => { setForm({ ...p, price: String(p.price), stock: String(p.stock) }); setEditItem(p.id); setShowModal(true); };

  const handleSave = (e) => {
    e.preventDefault();
    const item = { ...form, price: Number(form.price), stock: Number(form.stock) };
    if (editItem) {
      setProducts((prev) => prev.map((p) => (p.id === editItem ? { ...item, id: editItem } : p)));
    } else {
      setProducts((prev) => [...prev, { ...item, id: Date.now() }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setDeleteId(null);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý sản phẩm</h1>
          <p className="text-sm text-gray-500">{products.length} sản phẩm</p>
        </div>
        <button onClick={openCreate} className="btn-primary flex items-center gap-2">
          <Plus size={16} /> Thêm sản phẩm
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input pl-9"
        />
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 text-left">
                <th className="px-5 py-3 font-medium text-gray-600">Sản phẩm</th>
                <th className="px-5 py-3 font-medium text-gray-600">Danh mục</th>
                <th className="px-5 py-3 font-medium text-gray-600">Giá</th>
                <th className="px-5 py-3 font-medium text-gray-600">Tồn kho</th>
                <th className="px-5 py-3 font-medium text-gray-600">Trạng thái</th>
                <th className="px-5 py-3 font-medium text-gray-600 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3 font-medium text-gray-800">{p.name}</td>
                  <td className="px-5 py-3 text-gray-600">{p.category}</td>
                  <td className="px-5 py-3 text-gray-800">{formatPrice(p.price)}</td>
                  <td className="px-5 py-3">
                    <span className={p.stock === 0 ? 'text-red-500 font-medium' : 'text-gray-700'}>{p.stock}</span>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`badge ${p.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {p.status === 'active' ? 'Đang bán' : 'Hết hàng'}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2 justify-end">
                      <button onClick={() => openEdit(p)} className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit2 size={15} />
                      </button>
                      <button onClick={() => setDeleteId(p.id)} className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <p className="text-center py-10 text-gray-400 text-sm">Không tìm thấy sản phẩm</p>
          )}
        </div>
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="card w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-900">{editItem ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tên sản phẩm *</label>
                <input className="input" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Danh mục *</label>
                  <input className="input" required value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
                  <select className="input" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                    <option value="active">Đang bán</option>
                    <option value="out_of_stock">Hết hàng</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Giá (VND) *</label>
                  <input className="input" type="number" min="0" required value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tồn kho *</label>
                  <input className="input" type="number" min="0" required value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                <textarea className="input resize-none" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </div>
              <div className="flex gap-2 pt-2">
                <button type="submit" className="btn-primary flex-1">Lưu</button>
                <button type="button" onClick={() => setShowModal(false)} className="btn-secondary flex-1">Hủy</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="card w-full max-w-sm p-6 text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Trash2 className="text-red-600" size={22} />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Xóa sản phẩm?</h3>
            <p className="text-sm text-gray-500 mb-4">Hành động này không thể hoàn tác.</p>
            <div className="flex gap-2">
              <button onClick={() => handleDelete(deleteId)} className="btn-danger flex-1">Xóa</button>
              <button onClick={() => setDeleteId(null)} className="btn-secondary flex-1">Hủy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import { useState } from 'react';
import { Plus, Edit2, Trash2, X, Tag } from 'lucide-react';

const INIT_CATS = [
  { id: 1, name: 'Thời trang', icon: '👕', productCount: 145 },
  { id: 2, name: 'Điện tử', icon: '💻', productCount: 87 },
  { id: 3, name: 'Giày dép', icon: '👟', productCount: 64 },
  { id: 4, name: 'Phụ kiện', icon: '🎒', productCount: 32 },
  { id: 5, name: 'Sách', icon: '📚', productCount: 12 },
  { id: 6, name: 'Đồ gia dụng', icon: '🏠', productCount: 58 },
];

const EMPTY_FORM = { name: '', icon: '' };

export default function AdminCategories() {
  const [cats, setCats] = useState(INIT_CATS);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [deleteId, setDeleteId] = useState(null);

  const openCreate = () => { setForm(EMPTY_FORM); setEditItem(null); setShowModal(true); };
  const openEdit = (c) => { setForm({ name: c.name, icon: c.icon }); setEditItem(c.id); setShowModal(true); };

  const handleSave = (e) => {
    e.preventDefault();
    if (editItem) {
      setCats((prev) => prev.map((c) => (c.id === editItem ? { ...c, ...form } : c)));
    } else {
      setCats((prev) => [...prev, { ...form, id: Date.now(), productCount: 0 }]);
    }
    setShowModal(false);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý danh mục</h1>
          <p className="text-sm text-gray-500">{cats.length} danh mục</p>
        </div>
        <button onClick={openCreate} className="btn-primary flex items-center gap-2">
          <Plus size={16} /> Thêm danh mục
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cats.map((c) => (
          <div key={c.id} className="card p-5 flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-2xl shrink-0">
              {c.icon || '📦'}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-800">{c.name}</h3>
              <p className="text-sm text-gray-500">{c.productCount} sản phẩm</p>
            </div>
            <div className="flex gap-1">
              <button onClick={() => openEdit(c)} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <Edit2 size={15} />
              </button>
              <button onClick={() => setDeleteId(c.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="card w-full max-w-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-900">{editItem ? 'Sửa danh mục' : 'Thêm danh mục'}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tên danh mục *</label>
                <input className="input" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="VD: Thời trang" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Icon (emoji)</label>
                <input className="input" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} placeholder="VD: 👕" />
              </div>
              <div className="flex gap-2 pt-1">
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
              <Tag className="text-red-600" size={22} />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Xóa danh mục?</h3>
            <p className="text-sm text-gray-500 mb-4">Các sản phẩm thuộc danh mục này sẽ không bị xóa.</p>
            <div className="flex gap-2">
              <button onClick={() => { setCats((prev) => prev.filter((c) => c.id !== deleteId)); setDeleteId(null); }} className="btn-danger flex-1">Xóa</button>
              <button onClick={() => setDeleteId(null)} className="btn-secondary flex-1">Hủy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

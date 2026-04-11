import { useState } from 'react';
import { Search, Edit2, Trash2, X } from 'lucide-react';

const INIT_USERS = [
  { id: 1, name: 'Nguyễn Văn A', email: 'a@example.com', phone: '0912345678', role: 'user', orders: 5, joined: '2024-08-10' },
  { id: 2, name: 'Trần Thị B', email: 'b@example.com', phone: '0987654321', role: 'user', orders: 12, joined: '2024-07-22' },
  { id: 3, name: 'Admin User', email: 'admin@shopvn.vn', phone: '0901234567', role: 'admin', orders: 0, joined: '2024-01-01' },
  { id: 4, name: 'Lê Văn C', email: 'c@example.com', phone: '0967890123', role: 'user', orders: 3, joined: '2024-09-15' },
];

export default function AdminUsers() {
  const [users, setUsers] = useState(INIT_USERS);
  const [search, setSearch] = useState('');
  const [editUser, setEditUser] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = (e) => {
    e.preventDefault();
    setUsers((prev) => prev.map((u) => (u.id === editUser.id ? editUser : u)));
    setEditUser(null);
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Quản lý người dùng</h1>
        <p className="text-sm text-gray-500">{users.length} tài khoản</p>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
        <input type="text" placeholder="Tìm theo tên, email..." value={search} onChange={(e) => setSearch(e.target.value)} className="input pl-9" />
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 text-left">
                <th className="px-5 py-3 font-medium text-gray-600">Tên</th>
                <th className="px-5 py-3 font-medium text-gray-600">Email</th>
                <th className="px-5 py-3 font-medium text-gray-600">SĐT</th>
                <th className="px-5 py-3 font-medium text-gray-600">Vai trò</th>
                <th className="px-5 py-3 font-medium text-gray-600">Đơn hàng</th>
                <th className="px-5 py-3 font-medium text-gray-600">Ngày tham gia</th>
                <th className="px-5 py-3 font-medium text-gray-600 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                        <span className="text-blue-600 text-xs font-medium">{u.name[0]}</span>
                      </div>
                      <span className="font-medium text-gray-800">{u.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-gray-600">{u.email}</td>
                  <td className="px-5 py-3 text-gray-600">{u.phone}</td>
                  <td className="px-5 py-3">
                    <span className={`badge ${u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'}`}>
                      {u.role === 'admin' ? 'Admin' : 'Khách hàng'}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-gray-700">{u.orders}</td>
                  <td className="px-5 py-3 text-gray-500">{u.joined}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2 justify-end">
                      <button onClick={() => setEditUser({ ...u })} className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit2 size={15} />
                      </button>
                      <button onClick={() => setDeleteId(u.id)} disabled={u.role === 'admin'} className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit modal */}
      {editUser && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="card w-full max-w-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-900">Chỉnh sửa người dùng</h2>
              <button onClick={() => setEditUser(null)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Họ tên</label>
                <input className="input" value={editUser.name} onChange={(e) => setEditUser({ ...editUser, name: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input className="input" type="email" value={editUser.email} onChange={(e) => setEditUser({ ...editUser, email: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">SĐT</label>
                <input className="input" value={editUser.phone} onChange={(e) => setEditUser({ ...editUser, phone: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vai trò</label>
                <select className="input" value={editUser.role} onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}>
                  <option value="user">Khách hàng</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="flex gap-2 pt-1">
                <button type="submit" className="btn-primary flex-1">Lưu</button>
                <button type="button" onClick={() => setEditUser(null)} className="btn-secondary flex-1">Hủy</button>
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
            <h3 className="font-semibold text-gray-900 mb-1">Xóa người dùng?</h3>
            <p className="text-sm text-gray-500 mb-4">Hành động này không thể hoàn tác.</p>
            <div className="flex gap-2">
              <button onClick={() => { setUsers((prev) => prev.filter((u) => u.id !== deleteId)); setDeleteId(null); }} className="btn-danger flex-1">Xóa</button>
              <button onClick={() => setDeleteId(null)} className="btn-secondary flex-1">Hủy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

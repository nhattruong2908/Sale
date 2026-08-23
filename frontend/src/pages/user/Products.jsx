import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { productAPI } from '../../services/api';

const MOCK_PRODUCTS = [
  { name: 'Yến sào tinh chế cao cấp 100g', price: 2850000, category: 'Yến tinh chế' },
  { name: 'Yến chưng đường phèn hũ 70ml (lốc 6 hũ)', price: 480000, category: 'Yến chưng sẵn' },
  { name: 'Yến thô nguyên tổ đảo thiên nhiên 50g', price: 1650000, category: 'Yến thô' },
  { name: 'Yến sợi tinh chế 50g', price: 1450000, category: 'Yến sợi' },
  { name: 'Set quà tặng yến sào hộp gỗ', price: 3200000, category: 'Quà tặng yến' },
  { name: 'Yến chưng hạt chia hũ 70ml (lốc 6 hũ)', price: 520000, category: 'Yến chưng sẵn' },
  { name: 'Yến vụn tinh chế 100g', price: 980000, category: 'Yến tinh chế' },
  { name: 'Yến chưng táo đỏ hạt sen (lốc 6 hũ)', price: 550000, category: 'Yến chưng sẵn' },
  { name: 'Yến rút lông loại đảo 50g', price: 1750000, category: 'Yến thô' },
  { name: 'Yến tinh chế 50g cho bé', price: 890000, category: 'Yến cho bé & mẹ bầu' },
  { name: 'Combo yến chưng dinh dưỡng cho mẹ bầu', price: 1250000, category: 'Yến cho bé & mẹ bầu' },
  { name: 'Hộp quà biếu yến sào cao cấp 200g', price: 4500000, category: 'Quà tặng yến' },
].map((p, i) => ({
  id: i + 1,
  ...p,
  image: `https://placehold.co/300x300/fef9c3/ca8a04?text=Y%E1%BA%BFn+s%C3%A0o`,
  rating: (Math.random() * 1.5 + 3.5).toFixed(1),
}));

const CATEGORIES = ['Tất cả', 'Yến thô', 'Yến tinh chế', 'Yến chưng sẵn', 'Yến sợi', 'Quà tặng yến', 'Yến cho bé & mẹ bầu'];
const SORT_OPTIONS = [
  { value: 'newest', label: 'Mới nhất' },
  { value: 'price_asc', label: 'Giá thấp đến cao' },
  { value: 'price_desc', label: 'Giá cao đến thấp' },
  { value: 'popular', label: 'Phổ biến nhất' },
];

function formatPrice(price) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
}

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || 'Tất cả');
  const [sort, setSort] = useState('newest');
  const [showFilter, setShowFilter] = useState(false);

  // In real app: fetch from API
  // useEffect(() => { productAPI.getAll({ search, category, sort }).then(res => setProducts(res.data)); }, [search, category, sort]);

  const filtered = products
    .filter((p) => {
      const matchCat = category === 'Tất cả' || p.category === category;
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    })
    .sort((a, b) => {
      if (sort === 'price_asc') return a.price - b.price;
      if (sort === 'price_desc') return b.price - a.price;
      return 0;
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Tất cả sản phẩm</h1>

      {/* Search & filter bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input pl-10"
          />
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="input w-auto"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="btn-secondary flex items-center gap-2"
        >
          <SlidersHorizontal size={16} /> Lọc
        </button>
      </div>

      <div className="flex gap-6">
        {/* Sidebar filter */}
        <aside className={`${showFilter ? 'block' : 'hidden'} sm:block w-48 shrink-0`}>
          <div className="card p-4">
            <h3 className="font-semibold text-gray-800 mb-3 text-sm">Danh mục</h3>
            <ul className="space-y-1">
              {CATEGORIES.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => setCategory(cat)}
                    className={`w-full text-left px-2 py-1.5 rounded-lg text-sm transition-colors ${
                      category === cat
                        ? 'bg-blue-50 text-blue-600 font-medium'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Product grid */}
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-500 mb-4">{filtered.length} sản phẩm</p>
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <Search size={40} className="mx-auto mb-3 opacity-50" />
              <p>Không tìm thấy sản phẩm nào</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map((p) => (
                <Link key={p.id} to={`/products/${p.id}`} className="card hover:shadow-md transition-shadow group">
                  <div className="overflow-hidden rounded-t-xl">
                    <img src={p.image} alt={p.name} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-3">
                    <span className="text-xs text-blue-600 font-medium">{p.category}</span>
                    <h3 className="text-sm font-medium text-gray-800 mt-0.5 line-clamp-2">{p.name}</h3>
                    <div className="flex items-center justify-between mt-1.5">
                      <p className="font-bold text-blue-600">{formatPrice(p.price)}</p>
                      <span className="text-xs text-yellow-500">★ {p.rating}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

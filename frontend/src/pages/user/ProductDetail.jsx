import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Minus, Plus, Star, ArrowLeft, Package } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const MOCK_PRODUCT = {
  id: 1,
  name: 'Áo thun nam basic oversize',
  price: 199000,
  originalPrice: 280000,
  images: [
    'https://placehold.co/500x500/e0f2fe/0284c7?text=Ảnh+1',
    'https://placehold.co/500x500/dbeafe/1d4ed8?text=Ảnh+2',
    'https://placehold.co/500x500/bfdbfe/1e40af?text=Ảnh+3',
  ],
  category: 'Thời trang',
  rating: 4.5,
  reviewCount: 128,
  stock: 50,
  description: 'Áo thun nam basic với chất liệu cotton 100%, thoáng mát, phù hợp mặc hàng ngày. Thiết kế oversize hiện đại, dễ phối đồ.',
  sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  colors: ['Trắng', 'Đen', 'Xám', 'Navy'],
};

function formatPrice(price) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
}

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const product = MOCK_PRODUCT; // In real app: fetch by id

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const discount = Math.round((1 - product.price / product.originalPrice) * 100);

  const handleAddToCart = () => {
    addItem({ id: product.id, name: product.name, price: product.price, image: product.images[0] }, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 mb-6 transition-colors">
        <ArrowLeft size={16} /> Quay lại
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Images */}
        <div>
          <div className="card overflow-hidden mb-3">
            <img src={product.images[selectedImage]} alt={product.name} className="w-full h-96 object-cover" />
          </div>
          <div className="flex gap-2">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`rounded-lg overflow-hidden border-2 transition-colors ${selectedImage === i ? 'border-blue-500' : 'border-gray-200'}`}
              >
                <img src={img} alt="" className="w-16 h-16 object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <span className="badge bg-blue-50 text-blue-600 mb-2">{product.category}</span>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex text-yellow-400">
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} size={14} fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'} />
              ))}
            </div>
            <span className="text-sm text-gray-500">{product.rating} ({product.reviewCount} đánh giá)</span>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl font-bold text-blue-600">{formatPrice(product.price)}</span>
            <span className="text-lg text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
            <span className="badge bg-red-100 text-red-600">-{discount}%</span>
          </div>

          {/* Size */}
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Kích thước</p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`px-3 py-1.5 rounded-lg border text-sm font-medium transition-colors ${
                    selectedSize === s
                      ? 'border-blue-600 bg-blue-50 text-blue-600'
                      : 'border-gray-300 text-gray-600 hover:border-gray-400'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Color */}
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-700 mb-2">Màu sắc</p>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedColor(c)}
                  className={`px-3 py-1.5 rounded-lg border text-sm font-medium transition-colors ${
                    selectedColor === c
                      ? 'border-blue-600 bg-blue-50 text-blue-600'
                      : 'border-gray-300 text-gray-600 hover:border-gray-400'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-3 mb-6">
            <p className="text-sm font-medium text-gray-700">Số lượng</p>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 hover:bg-gray-100 rounded-l-lg transition-colors">
                <Minus size={14} />
              </button>
              <span className="w-10 text-center text-sm font-medium">{quantity}</span>
              <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="p-2 hover:bg-gray-100 rounded-r-lg transition-colors">
                <Plus size={14} />
              </button>
            </div>
            <span className="text-sm text-gray-400">({product.stock} sản phẩm)</span>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={handleAddToCart}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all ${
                added ? 'bg-green-600 text-white' : 'btn-primary'
              }`}
            >
              <ShoppingCart size={18} />
              {added ? 'Đã thêm vào giỏ!' : 'Thêm vào giỏ hàng'}
            </button>
          </div>

          {/* Description */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <Package size={16} /> Mô tả sản phẩm
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

function getToken() {
  return localStorage.getItem('token');
}

async function request(path, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const token = getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (res.status === 401) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
    return;
  }

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Có lỗi xảy ra');
  return data;
}

const get = (path, params) => {
  const url = params ? `${path}?${new URLSearchParams(params)}` : path;
  return request(url);
};

const post = (path, body) =>
  request(path, { method: 'POST', body: JSON.stringify(body) });

const put = (path, body) =>
  request(path, { method: 'PUT', body: JSON.stringify(body) });

const patch = (path, body) =>
  request(path, { method: 'PATCH', body: JSON.stringify(body) });

const del = (path) =>
  request(path, { method: 'DELETE' });

// Auth
export const authAPI = {
  login: (data) => post('/auth/login', data),
  register: (data) => post('/auth/register', data),
  logout: () => post('/auth/logout'),
  me: () => get('/auth/me'),
};

// Products
export const productAPI = {
  getAll: (params) => get('/products', params),
  getById: (id) => get(`/products/${id}`),
  create: (data) => post('/products', data),
  update: (id, data) => put(`/products/${id}`, data),
  delete: (id) => del(`/products/${id}`),
};

// Categories
export const categoryAPI = {
  getAll: () => get('/categories'),
  create: (data) => post('/categories', data),
  update: (id, data) => put(`/categories/${id}`, data),
  delete: (id) => del(`/categories/${id}`),
};

// Orders
export const orderAPI = {
  getAll: (params) => get('/orders', params),
  getById: (id) => get(`/orders/${id}`),
  create: (data) => post('/orders', data),
  updateStatus: (id, status) => patch(`/orders/${id}/status`, { status }),
  myOrders: () => get('/orders/my'),
};

// Users (admin)
export const userAPI = {
  getAll: (params) => get('/users', params),
  getById: (id) => get(`/users/${id}`),
  update: (id, data) => put(`/users/${id}`, data),
  delete: (id) => del(`/users/${id}`),
};

// Dashboard stats (admin)
export const dashboardAPI = {
  getStats: () => get('/admin/dashboard'),
};

import axios from 'axios';

const API = axios.create({
    baseURL: process.env.BACKEND_API_URL || 'http://localhost:5000/api',
    headers: { 'Content-Type': 'application/json' }
});

export default {
    getProducts: () => API.get('/products').then(r => r.data),
    getCart: (userId) => API.get(`/cart`, { params: { userId } }).then(r => r.data),
    addToCart: (payload) => API.post('/cart', payload).then(r => r.data),
    removeFromCart: (id) => API.delete(`/cart/${id}`).then(r => r.data),
    updateCartItem: (id, payload) => API.patch(`/cart/${id}`, payload).then(r => r.data),
    checkout: (payload) => API.post('/checkout', payload).then(r => r.data)
};

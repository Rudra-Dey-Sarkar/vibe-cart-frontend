import React, { useEffect, useState } from 'react';
import api from './api';
import ProductList from './components/ProductList';
import CartView from './components/CartView';
import CheckoutModal from './components/CheckoutModal';
import './App.css';

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const userId = 'guest';

  useEffect(() => {
    loadProducts();
    loadCart();
  }, []);

  async function loadProducts() {
    setLoading(true);
    try {
      const data = await api.getProducts();
      setProducts(data);
    } catch (err) {
      console.error(err);
      alert('Failed to load products');
    } finally { setLoading(false); }
  }

  async function loadCart() {
    try {
      const d = await api.getCart(userId);
      setCart(d);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleAdd(productId, qty = 1) {
    try {
      await api.addToCart({ productId, qty, userId });
      await loadCart();
    } catch (err) {
      console.error(err);
      alert('Failed to add to cart');
    }
  }

  async function handleRemove(cartItemId) {
    try {
      await api.removeFromCart(cartItemId);
      await loadCart();
    } catch (err) {
      console.error(err);
      alert('Remove failed');
    }
  }

  async function handleUpdate(cartItemId, qty) {
    try {
      await api.updateCartItem(cartItemId, { qty });
      await loadCart();
    } catch (err) {
      console.error(err);
      alert('Update failed');
    }
  }

  async function handleCheckout(details) {
    try {
      const payload = { cartItems: cart.items, name: details.name, email: details.email, userId };
      const res = await api.checkout(payload);
      setReceipt(res.receipt);
      await loadCart();
    } catch (err) {
      console.error(err);
      alert('Checkout failed');
    }
  }

  return (
    <div className="container">
      <header className="header">
        <h1>Vibe Commerce - Mock Cart</h1>
      </header>

      <main className="main-grid">
        <section className="products">
          <h2>Products</h2>
          <ProductList products={products} loading={loading} onAdd={handleAdd} />
        </section>

        <aside className="cart">
          <h2>Your Cart</h2>
          <CartView cart={cart} onRemove={handleRemove} onUpdate={handleUpdate} onCheckoutClick={() => { document.getElementById('checkout-btn').click(); }} />
          <button id="checkout-btn" style={{ display: 'none' }} onClick={() => { }} />
        </aside>
      </main>

      <CheckoutModal onCheckout={handleCheckout} receipt={receipt} />
    </div>
  );
}

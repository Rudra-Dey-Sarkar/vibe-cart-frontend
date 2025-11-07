import React from 'react';

export default function ProductList({ products = [], loading, onAdd }) {
    if (loading) return <div>Loading products...</div>;
    return (
        <div className="product-grid">
            {products.map(p => (
                <div key={p._id} className="card">
                    <div className="card-body">
                        <h3>{p.name}</h3>
                        <p>₹ {p.price.toFixed(2)}</p>
                        <button onClick={() => onAdd(p._id, 1)}>Add to cart</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

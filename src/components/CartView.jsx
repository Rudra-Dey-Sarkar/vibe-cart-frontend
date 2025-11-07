import React, { useState } from 'react';

export default function CartView({ cart = { items: [], total: 0 }, onRemove, onUpdate }) {

    function changeQty(id, newQty) {
        if (newQty < 1) return;
        onUpdate(id, newQty);
    }

    return (
        <div style={{border:"2px solid black", padding:"25px", borderRadius:"10px"}}>
            {cart.items.length === 0 ? <div>Your cart is empty</div> :
                <>
                    <ul className="cart-list">
                        {cart.items.map(it => (
                            <li key={it.id} className="cart-item">
                                <div>
                                    <strong>{it.product.name}</strong>
                                    <div>₹ {it.product.price.toFixed(2)} × {it.qty} = ₹ {(it.product.price * it.qty).toFixed(2)}</div>
                                </div>
                                <div className="cart-controls">
                                    <button onClick={() => changeQty(it.id, it.qty - 1)}>-</button>
                                    <span>{it.qty}</span>
                                    <button onClick={() => changeQty(it.id, it.qty + 1)}>+</button>
                                    <button className="remove" onClick={() => onRemove(it.id)}>Remove</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="cart-total">
                        <strong>Total: ₹ {cart.total.toFixed(2)}</strong>
                    </div>
                    <div style={{ marginTop: 8 }}>
                        <label style={{ display: 'block', marginBottom: 6 }}>
                            <button id="open-checkout" onClick={() => {
                                const evt = new CustomEvent('openCheckout');
                                window.dispatchEvent(evt);
                            }}>Checkout</button>
                        </label>
                    </div>
                </>
            }
        </div>
    );
}

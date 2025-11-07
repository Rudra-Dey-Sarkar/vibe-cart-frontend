import React, { useEffect, useState } from 'react';

export default function CheckoutModal({ onCheckout, receipt }) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        function handler() { setOpen(true); }
        window.addEventListener('openCheckout', handler);
        return () => window.removeEventListener('openCheckout', handler);
    }, []);

    function submit(e) {
        e.preventDefault();
        onCheckout({ name, email });
        setOpen(false);
        setName(''); setEmail('');
    }

    return (
        <>
            {open && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Checkout</h3>
                        <form onSubmit={submit}>
                            <div>
                                <label>Name</label>
                                <input 
                                required 
                                value={name} 
                                style={{width:"100%", height:"20px"}}
                                onChange={e => setName(e.target.value)} />
                            </div>
                            <div>
                                <label>Email</label>
                                <input 
                                required 
                                type="email" 
                                value={email} 
                                style={{width:"100%", height:"20px"}}
                                onChange={e => setEmail(e.target.value)} />
                            </div>
                            <div style={{ marginTop: 10, display:'flex', gap:"25px" }}>
                                <button type="submit">Place Order</button>
                                <button type="button" onClick={() => setOpen(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {receipt && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Receipt</h3>
                        <div>Receipt ID: {receipt.id}</div>
                        <div>Name: {receipt.name}</div>
                        <div>Total: ₹ {receipt.total.toFixed(2)}</div>
                        <div>Time: {new Date(receipt.timestamp).toLocaleString()}</div>
                        <div style={{ marginTop: 8 }}>
                            <button onClick={() => { 
                                window.location.reload();
                                }}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

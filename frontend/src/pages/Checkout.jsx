import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './Checkout.css'

const API_URL = 'http://localhost:5000'

export default function Checkout() {
    const { cart, cartTotal, clearCart } = useCart()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [orderNumber, setOrderNumber] = useState('')
    const [form, setForm] = useState({
        name: '', email: '', phone: '', address: '', city: '', state: '', pincode: ''
    })

    const shipping = cartTotal > 2000 ? 0 : 199

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (cart.length === 0) return alert('Cart is empty')

        setLoading(true)
        try {
            const orderData = {
                items: cart.map(item => ({
                    product: item._id,
                    name: item.name,
                    price: item.salePrice || item.price,
                    quantity: item.quantity,
                    image: item.images?.[0]
                })),
                customer: form,
                subtotal: cartTotal,
                shipping,
                total: cartTotal + shipping,
                paymentMethod: 'COD'
            }

            const res = await fetch(`${API_URL}/api/orders`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            })
            const data = await res.json()

            if (res.ok) {
                setOrderNumber(data.order?.orderNumber || 'MH' + Date.now().toString().slice(-8))
                setSuccess(true)
                clearCart()
            } else {
                alert('Order failed: ' + (data.message || 'Please try again'))
            }
        } catch (err) {
            alert('Connection error. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    if (success) {
        return (
            <div className="checkout-page">
                <div className="success-modal">
                    <div className="success-icon">✅</div>
                    <h1>Order Placed Successfully!</h1>
                    <p className="order-number">Order #{orderNumber}</p>
                    <p>Thank you for your order! We'll call you to confirm delivery details.</p>
                    <button className="btn-home" onClick={() => navigate('/')}>Back to Home</button>
                </div>
            </div>
        )
    }

    return (
        <div className="checkout-page">
            <div className="checkout-container">
                <form className="checkout-form" onSubmit={handleSubmit}>
                    <h1>Checkout</h1>
                    <h2>Shipping Details</h2>
                    <div className="form-row">
                        <input name="name" placeholder="Full Name *" value={form.name} onChange={handleChange} required />
                        <input name="email" type="email" placeholder="Email *" value={form.email} onChange={handleChange} required />
                    </div>
                    <div className="form-row">
                        <input name="phone" placeholder="Phone *" value={form.phone} onChange={handleChange} required />
                        <input name="pincode" placeholder="Pincode *" value={form.pincode} onChange={handleChange} required />
                    </div>
                    <input name="address" placeholder="Full Address *" value={form.address} onChange={handleChange} required />
                    <div className="form-row">
                        <input name="city" placeholder="City *" value={form.city} onChange={handleChange} required />
                        <input name="state" placeholder="State *" value={form.state} onChange={handleChange} required />
                    </div>
                    <h2>Payment</h2>
                    <div className="payment-method">
                        <input type="radio" checked readOnly /> Cash on Delivery (COD)
                    </div>
                    <button type="submit" className="btn-place-order" disabled={loading}>
                        {loading ? 'Placing Order...' : `Place Order • ₹${(cartTotal + shipping).toLocaleString()}`}
                    </button>
                </form>
                <div className="order-summary">
                    <h2>Order Summary</h2>
                    {cart.map(item => (
                        <div key={item._id} className="summary-item">
                            <span>{item.name} × {item.quantity}</span>
                            <span>₹{((item.salePrice || item.price) * item.quantity).toLocaleString()}</span>
                        </div>
                    ))}
                    <div className="summary-row"><span>Subtotal</span><span>₹{cartTotal.toLocaleString()}</span></div>
                    <div className="summary-row"><span>Shipping</span><span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span></div>
                    <div className="summary-row total"><span>Total</span><span>₹{(cartTotal + shipping).toLocaleString()}</span></div>
                </div>
            </div>
        </div>
    )
}

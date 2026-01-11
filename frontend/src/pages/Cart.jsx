import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './Cart.css'

//const API_URL = 'http://localhost:5000'
const API_URL = 'https://mudgarhub-api.onrender.com'

const getImageUrl = (image) => {
    if (!image) return 'https://via.placeholder.com/100x100?text=🏋️'
    return image.startsWith('/uploads') ? API_URL + image : image
}

export default function Cart() {
    const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart()

    if (cart.length === 0) {
        return (
            <div className="cart-page empty-cart">
                <div className="empty-content">
                    <span className="empty-icon">🛒</span>
                    <h1>Your Cart is Empty</h1>
                    <p>Looks like you haven't added any equipment yet!</p>
                    <Link to="/shop" className="btn-primary">Start Shopping</Link>
                </div>
            </div>
        )
    }

    const shipping = cartTotal > 2000 ? 0 : 199

    return (
        <div className="cart-page">
            <div className="cart-container">
                <div className="cart-items">
                    <h1>Your Cart</h1>
                    {cart.map(item => (
                        <div key={item._id} className="cart-item">
                            <img src={getImageUrl(item.images?.[0])} alt={item.name} />
                            <div className="item-info">
                                <h3>{item.name}</h3>
                                <p className="item-weight">{item.weight}</p>
                                <p className="item-price">₹{(item.salePrice || item.price).toLocaleString()}</p>
                            </div>
                            <div className="item-quantity">
                                <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
                            </div>
                            <div className="item-total">
                                ₹{((item.salePrice || item.price) * item.quantity).toLocaleString()}
                            </div>
                            <button className="remove-btn" onClick={() => removeFromCart(item._id)}>×</button>
                        </div>
                    ))}
                </div>
                <div className="cart-summary">
                    <h2>Order Summary</h2>
                    <div className="summary-row"><span>Subtotal</span><span>₹{cartTotal.toLocaleString()}</span></div>
                    <div className="summary-row"><span>Shipping</span><span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span></div>
                    <div className="summary-row total"><span>Total</span><span>₹{(cartTotal + shipping).toLocaleString()}</span></div>
                    <Link to="/checkout" className="btn-checkout">Proceed to Checkout</Link>
                    <button className="btn-clear" onClick={clearCart}>Clear Cart</button>
                </div>
            </div>
        </div>
    )
}

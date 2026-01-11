import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './Navbar.css'

export default function Navbar() {
    const { cartCount } = useCart()

    return (
        <nav className="navbar">
            <div className="nav-container">
                <Link to="/" className="nav-logo">
                    <span className="logo-icon">🏋️</span>
                    <span className="logo-text">MudgarHub</span>
                </Link>
                <div className="nav-links">
                    <Link to="/">Home</Link>
                    <Link to="/shop">Shop</Link>
                    <Link to="/about">About</Link>
                </div>
                <Link to="/cart" className="cart-btn">
                    <span className="cart-icon">🛒</span>
                    {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                </Link>
            </div>
        </nav>
    )
}

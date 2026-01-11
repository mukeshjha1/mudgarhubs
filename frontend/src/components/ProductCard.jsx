import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './ProductCard.css'

//const API_URL = 'http://localhost:5000'
const API_URL = 'https://mudgarhub-api.onrender.com'

export default function ProductCard({ product }) {
    const { addToCart } = useCart()

    const imageUrl = product.images?.[0]
        ? (product.images[0].startsWith('/uploads') ? + product.images[0] : product.images[0])
        : 'https://via.placeholder.com/300x300?text=🏋️'

    return (
        <div className="product-card">
            <Link to={`/product/${product._id}`} className="product-image">
                <img src={imageUrl} alt={product.name} />
                {product.inStock && <span className="stock-badge">✅ In Stock</span>}
                {product.freeWorkout && <span className="workout-badge">🎥 Free Workout</span>}
            </Link>
            <div className="product-info">
                <h3>{product.name}</h3>
                <p className="product-weight">{product.weight}</p>
                <div className="product-price">
                    {product.salePrice ? (
                        <>
                            <span className="sale-price">₹{product.salePrice.toLocaleString()}</span>
                            <span className="original-price">₹{product.price.toLocaleString()}</span>
                        </>
                    ) : (
                        <span className="price">₹{product.price.toLocaleString()}</span>
                    )}
                </div>
                <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
                    Add to Cart
                </button>
            </div>
        </div>
    )
}

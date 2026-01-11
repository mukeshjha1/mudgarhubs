import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './ProductDetail.css'

const API_URL = 'http://localhost:5000'

export default function ProductDetail() {
    const { id } = useParams()
    const { addToCart } = useCart()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [quantity, setQuantity] = useState(1)
    const [selectedImage, setSelectedImage] = useState(0)
    const [addedToCart, setAddedToCart] = useState(false)
    const [zoomed, setZoomed] = useState(false)
    const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 })

    useEffect(() => {
        fetch(`${API_URL}/api/products/${id}`)
            .then(res => res.json())
            .then(data => { setProduct(data); setLoading(false) })
            .catch(() => setLoading(false))
    }, [id])

    if (loading) return <div className="loading-page">Loading...</div>
    if (!product) return <div className="loading-page">Product not found</div>

    const images = product.images?.length ? product.images.map(img =>
        img.startsWith('/uploads') ? API_URL + img : img
    ) : ['https://via.placeholder.com/600x600?text=🏋️']

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart(product)
        }
        setAddedToCart(true)
        setTimeout(() => setAddedToCart(false), 2000)
    }

    const nextImage = () => setSelectedImage((prev) => (prev + 1) % images.length)
    const prevImage = () => setSelectedImage((prev) => (prev - 1 + images.length) % images.length)

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100
        setZoomPos({ x, y })
    }

    return (
        <div className="product-detail">
            <div className="detail-container">
                {/* Gallery with Thumbnails */}
                <div className="product-gallery">
                    {/* Thumbnails on Left */}
                    <div className="thumbnails">
                        {images.map((img, i) => (
                            <div
                                key={i}
                                className={`thumb ${selectedImage === i ? 'active' : ''}`}
                                onClick={() => setSelectedImage(i)}
                            >
                                <img src={img} alt={`${product.name} ${i + 1}`} />
                            </div>
                        ))}
                    </div>

                    {/* Main Image with Arrows + Zoom */}
                    <div className="main-image-wrapper">
                        {images.length > 1 && (
                            <button className="slider-arrow prev" onClick={prevImage}>‹</button>
                        )}
                        <div
                            className={`main-image-container ${zoomed ? 'zoomed' : ''}`}
                            onMouseEnter={() => setZoomed(true)}
                            onMouseLeave={() => setZoomed(false)}
                            onMouseMove={handleMouseMove}
                        >
                            <img src={images[selectedImage]} alt={product.name} className="main-image" />
                            {zoomed && (
                                <div
                                    className="zoom-lens"
                                    style={{
                                        backgroundImage: `url(${images[selectedImage]})`,
                                        backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`
                                    }}
                                />
                            )}
                        </div>
                        {images.length > 1 && (
                            <button className="slider-arrow next" onClick={nextImage}>›</button>
                        )}
                        {product.inStock && <span className="stock-badge">✅ In Stock</span>}
                        <p className="zoom-hint">🔍 Hover to zoom</p>
                    </div>
                </div>

                {/* Product Info */}
                <div className="product-content">
                    <nav className="breadcrumb">
                        <Link to="/">Home</Link> / <Link to="/shop">Shop</Link> / {product.name}
                    </nav>
                    <h1>{product.name}</h1>

                    <div className="product-rating">
                        {'⭐'.repeat(Math.floor(product.rating || 5))}
                        <span>({product.reviews || 0} reviews)</span>
                    </div>

                    <div className="product-pricing">
                        {product.salePrice ? (
                            <>
                                <span className="sale-price">₹{product.salePrice.toLocaleString()}</span>
                                <span className="original-price">₹{product.price.toLocaleString()}</span>
                                <span className="discount">
                                    {Math.round((1 - product.salePrice / product.price) * 100)}% OFF
                                </span>
                            </>
                        ) : (
                            <span className="price">₹{product.price.toLocaleString()}</span>
                        )}
                    </div>

                    <p className="short-description">{product.shortDescription}</p>

                    {/* Product Specs */}
                    <div className="product-specs">
                        {product.weight && (
                            <div className="spec-item">
                                <span className="spec-icon">⚖️</span>
                                <div><strong>Weight</strong><p>{product.weight}</p></div>
                            </div>
                        )}
                        {product.material && (
                            <div className="spec-item">
                                <span className="spec-icon">🪵</span>
                                <div><strong>Material</strong><p>{product.material}</p></div>
                            </div>
                        )}
                    </div>

                    {product.freeWorkout && (
                        <div className="workout-badge-lg">🎥 Free Online Workout Series Included</div>
                    )}

                    {/* Add to Cart */}
                    <div className="add-to-cart-section">
                        <div className="quantity-picker">
                            <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                            <span>{quantity}</span>
                            <button onClick={() => setQuantity(quantity + 1)}>+</button>
                        </div>
                        <button
                            className={`add-btn ${addedToCart ? 'added' : ''}`}
                            onClick={handleAddToCart}
                        >
                            {addedToCart ? '✓ Added to Cart!' : 'Add to Cart'}
                        </button>
                    </div>

                    {/* Features */}
                    <div className="product-features">
                        <div className="feature"><span>🚚</span> Free Shipping above ₹2000</div>
                        <div className="feature"><span>🔄</span> 7 Day Easy Returns</div>
                        <div className="feature"><span>🛡️</span> Premium Quality Guarantee</div>
                        <div className="feature"><span>🇮🇳</span> Made in India</div>
                    </div>
                </div>
            </div>

            {/* Description Section */}
            {product.description && (
                <div className="product-description">
                    <h2>Description</h2>
                    <p>{product.description}</p>
                </div>
            )}
        </div>
    )
}

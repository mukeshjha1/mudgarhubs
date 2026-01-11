import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import './Home.css'

const API_URL = 'http://localhost:5000'

export default function Home() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`${API_URL}/api/products?featured=true&limit=6`)
            .then(res => res.json())
            .then(data => { setProducts(data); setLoading(false) })
            .catch(() => setLoading(false))
    }, [])

    return (
        <div className="home">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-container">
                    <div className="hero-content">
                        <span className="hero-badge">🇮🇳 Made in India</span>
                        <h1>Traditional Indian<br />Strength Training</h1>
                        <p>Rediscover the ancient art of Indian fitness with Mudgar, Samtola & Gada. Built for warriors, perfected for you.</p>
                        <div className="hero-cta">
                            <Link to="/shop" className="btn-primary">Shop Now</Link>
                            <Link to="/about" className="btn-secondary">Learn More</Link>
                        </div>
                        <div className="hero-features">
                            <div className="hero-feature">
                                <span>🎥</span>
                                <span>Free Workout Series</span>
                            </div>
                            <div className="hero-feature">
                                <span>🚚</span>
                                <span>Free Shipping</span>
                            </div>
                            <div className="hero-feature">
                                <span>🏆</span>
                                <span>Premium Quality</span>
                            </div>
                        </div>
                    </div>
                    <div className="hero-image">
                        <img src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600" alt="Traditional Fitness" />
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="categories">
                <div className="container">
                    <h2 className="section-title">Our Equipment</h2>
                    <div className="category-grid">
                        <Link to="/shop?category=mudgar" className="category-card">
                            <div className="category-icon">🔨</div>
                            <h3>Mudgar</h3>
                            <p>Traditional Indian clubs for shoulder strength</p>
                        </Link>
                        <Link to="/shop?category=samtola" className="category-card">
                            <div className="category-icon">⚖️</div>
                            <h3>Samtola</h3>
                            <p>Balance training equipment</p>
                        </Link>
                        <Link to="/shop?category=gada" className="category-card">
                            <div className="category-icon">🏋️</div>
                            <h3>Hanuman Gada</h3>
                            <p>Heavy mace for full body workout</p>
                        </Link>
                        <Link to="/shop?category=shena" className="category-card">
                            <div className="category-icon">🪵</div>
                            <h3>Shena Board</h3>
                            <p>Traditional push-up board</p>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="featured-products">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Best Sellers</h2>
                        <Link to="/shop" className="view-all">View All →</Link>
                    </div>
                    {loading ? (
                        <p className="loading">Loading products...</p>
                    ) : (
                        <div className="products-grid">
                            {products.map(product => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Why Section */}
            <section className="why-section">
                <div className="container">
                    <h2 className="section-title">Why MudgarHub?</h2>
                    <div className="why-grid">
                        <div className="why-card">
                            <div className="why-icon">🪨</div>
                            <h3>Premium Materials</h3>
                            <p>Handcrafted from seasoned Sheesham wood and iron</p>
                        </div>
                        <div className="why-card">
                            <div className="why-icon">🧘</div>
                            <h3>Authentic Training</h3>
                            <p>Traditional techniques passed down through generations</p>
                        </div>
                        <div className="why-card">
                            <div className="why-icon">🎓</div>
                            <h3>Expert Guidance</h3>
                            <p>Free online workout programs with every purchase</p>
                        </div>
                        <div className="why-card">
                            <div className="why-icon">🤝</div>
                            <h3>Trusted by Warriors</h3>
                            <p>Used by Army Special Forces & Professional Athletes</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-brand">
                            <h3>🏋️ MudgarHub</h3>
                            <p>Reviving Traditional Indian Strength Training</p>
                        </div>
                        <div className="footer-links">
                            <h4>Quick Links</h4>
                            <Link to="/shop">Shop</Link>
                            <Link to="/about">About Us</Link>
                            <Link to="/contact">Contact</Link>
                        </div>
                        <div className="footer-links">
                            <h4>Support</h4>
                            <Link to="/shipping">Shipping</Link>
                            <Link to="/returns">Returns</Link>
                            <Link to="/faq">FAQ</Link>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p>© 2026 MudgarHub. Made with ❤️ in India</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

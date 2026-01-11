import { useState, useEffect } from 'react'
import ProductCard from '../components/ProductCard'
import './Shop.css'

const API_URL = 'http://localhost:5000'

export default function Shop() {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        Promise.all([
            fetch(`${API_URL}/api/products`).then(r => r.json()),
            fetch(`${API_URL}/api/categories`).then(r => r.json())
        ]).then(([prods, cats]) => {
            setProducts(prods)
            setCategories(cats)
            setLoading(false)
        }).catch(() => setLoading(false))
    }, [])

    const filteredProducts = selectedCategory
        ? products.filter(p => p.category?._id === selectedCategory)
        : products

    return (
        <div className="shop-page">
            <div className="shop-container">
                <aside className="shop-sidebar">
                    <h3>Categories</h3>
                    <ul className="category-list">
                        <li className={!selectedCategory ? 'active' : ''} onClick={() => setSelectedCategory('')}>
                            All Products
                        </li>
                        {categories.map(cat => (
                            <li
                                key={cat._id}
                                className={selectedCategory === cat._id ? 'active' : ''}
                                onClick={() => setSelectedCategory(cat._id)}
                            >
                                {cat.name}
                            </li>
                        ))}
                    </ul>
                </aside>
                <main className="shop-main">
                    <div className="shop-header">
                        <h1>Our Products</h1>
                        <p>{filteredProducts.length} products available</p>
                    </div>
                    {loading ? (
                        <p className="loading">Loading products...</p>
                    ) : (
                        <div className="products-grid">
                            {filteredProducts.map(product => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    )
}

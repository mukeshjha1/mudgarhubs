import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
    const [cart, setCart] = useState(() => {
        const saved = localStorage.getItem('mudgarhub_cart')
        return saved ? JSON.parse(saved) : []
    })

    useEffect(() => {
        localStorage.setItem('mudgarhub_cart', JSON.stringify(cart))
    }, [cart])

    const addToCart = (product) => {
        setCart(prev => {
            const existing = prev.find(item => item._id === product._id)
            if (existing) {
                return prev.map(item => item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item)
            }
            return [...prev, { ...product, quantity: 1 }]
        })
    }

    const removeFromCart = (productId) => {
        setCart(prev => prev.filter(item => item._id !== productId))
    }

    const updateQuantity = (productId, quantity) => {
        if (quantity < 1) return removeFromCart(productId)
        setCart(prev => prev.map(item => item._id === productId ? { ...item, quantity } : item))
    }

    const clearCart = () => setCart([])

    const cartTotal = cart.reduce((sum, item) => sum + (item.salePrice || item.price) * item.quantity, 0)
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext)

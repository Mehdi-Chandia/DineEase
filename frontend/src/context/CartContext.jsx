import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [cartItemsCount, setCartItemsCount] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false); // ADD THIS

    // Load from localStorage ONCE on mount
    useEffect(() => {
        const savedCart = localStorage.getItem("restaurantCart");
        console.log("Loading from localStorage:", savedCart);
        if (savedCart) {
            try {
                const parsedCart = JSON.parse(savedCart);
                setCart(parsedCart);
                console.log("Cart loaded from localStorage:", parsedCart);
            } catch (error) {
                console.log("Error loading cart:", error);
                localStorage.removeItem("restaurantCart");
            }
        }
        setIsLoaded(true); // MARK AS LOADED
    }, []);

    // Save to localStorage ONLY after initial load
    useEffect(() => {
        if (!isLoaded) return; // DON'T SAVE UNTIL INITIAL LOAD IS DONE

        console.log("Saving cart to localStorage:", cart);
        localStorage.setItem("restaurantCart", JSON.stringify(cart));

        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        setCartItemsCount(totalItems);
        console.log("Cart items count updated:", totalItems);
    }, [cart, isLoaded]); // ADD isLoaded dependency

    // Add to Cart Function
    const addToCart = (item) => {
        console.log("Adding to cart:", item.name);

        setCart(prev => {
            const existingItem = prev.find(cartItem => cartItem._id === item._id);

            if (existingItem) {
                const newCart = prev.map(cartItem =>
                    cartItem._id === item._id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
                return newCart;
            } else {
                const newCart = [...prev, { ...item, quantity: 1 }];
                return newCart;
            }
        });
    };

    // Remove from Cart Function
    const removeFromCart = (itemId) => {
        setCart(prev => prev.filter(item => item._id !== itemId));
    };

    // Update Quantity Function
    const updateQuantity = (itemId, newQuantity) => {
        if (newQuantity < 1) {
            removeFromCart(itemId);
            return;
        }

        setCart(prev =>
            prev.map(item =>
                item._id === itemId
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );
    };

    // Clear Cart Function
    const clearCart = () => {
        setCart([]);
    };

    // Calculate total price
    const getCartTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const value = {
        cart,
        cartItemsCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export default CartContext;
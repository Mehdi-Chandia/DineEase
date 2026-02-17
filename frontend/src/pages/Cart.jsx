import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cart, cartItemsCount, removeFromCart, updateQuantity } = useCart();

    // Calculate total price
    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    // Empty cart state
    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Your Cart is Empty</h1>
                    <p className="text-gray-600 mt-4 text-sm sm:text-base">Add some delicious items from our menu!</p>
                    <Link
                        to="/menu"
                        className="inline-block mt-6 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors text-sm sm:text-base"
                    >
                        Browse Menu
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-3 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Your Cart</h1>
                <p className="text-gray-600 mt-2 text-sm sm:text-base">{cartItemsCount} items in cart</p>
            </div>

            {/* Cart Content */}
            <div className="max-w-2xl mx-auto">
                {/* Cart Items */}
                <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
                    {cart.map(item => (
                        <div key={item._id} className="flex flex-col sm:flex-row sm:items-center gap-4 border-b border-gray-200 py-4 last:border-b-0">
                            {/* Item Image & Basic Info */}
                            <div className="flex items-center space-x-4 sm:space-x-3 flex-1">
                                {/* Item Image */}
                                <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover rounded-md"
                                    />
                                </div>

                                {/* Item Details */}
                                <div className="flex-grow min-w-0">
                                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">{item.name}</h3>
                                    <p className="text-sm text-gray-600">${item.price.toFixed(2)} each</p>
                                    <p className="text-xs text-gray-500 capitalize">{item.category}</p>
                                </div>
                            </div>

                            {/* Quantity Controls & Actions - Mobile Stacked */}
                            <div className="flex items-center justify-between sm:justify-end sm:space-x-4">
                                {/* Quantity Controls */}
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                        className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition-colors text-sm"
                                    >
                                        -
                                    </button>
                                    <span className="w-6 text-center font-semibold text-sm sm:text-base">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                        className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition-colors text-sm"
                                    >
                                        +
                                    </button>
                                </div>

                                {/* Subtotal & Remove - Stack on mobile, inline on desktop */}
                                <div className="flex items-center space-x-3">
                                    {/* Subtotal */}
                                    <div className="text-right min-w-16 sm:min-w-20">
                                        <p className="font-semibold text-gray-900 text-sm sm:text-base">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </p>
                                    </div>

                                    {/* Remove Button */}
                                    <button
                                        onClick={() => removeFromCart(item._id)}
                                        className="text-red-600 hover:text-red-800 transition-colors p-1 sm:p-2"
                                    >
                                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Order Summary</h2>

                    <div className="space-y-2 mb-6">
                        <div className="flex justify-between text-gray-600 text-sm sm:text-base">
                            <span>Subtotal ({cartItemsCount} items)</span>
                            <span>${getTotalPrice().toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-600 text-sm sm:text-base">
                            <span>Tax</span>
                            <span>${(getTotalPrice() * 0.1).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold text-gray-900 border-t pt-2 text-sm sm:text-base sm:text-lg">
                            <span>Total</span>
                            <span>${(getTotalPrice() * 1.1).toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Action Buttons - Stack on mobile */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <Link
                            to="/menu"
                            className="text-center bg-gray-200 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors font-semibold text-sm sm:text-base"
                        >
                            Continue Shopping
                        </Link>
                        <Link to={"/checkout"} className="bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition-colors font-semibold text-sm sm:text-base">
                            Proceed to Checkout
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Checkout = () => {
    const { cart, cartItemsCount, getCartTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [orderDetails, setOrderDetails] = useState(null);

    const [customerInfo, setCustomerInfo] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });

    const handleInputChange = (e) => {
        setCustomerInfo({
            ...customerInfo,
            [e.target.name]: e.target.value
        });
    };

    const getTotalWithTax = () => {
        const subtotal = getCartTotal();
        const tax = subtotal * 0.1;
        return (subtotal + tax).toFixed(2);
    };

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // CALCULATE TOTAL BEFORE CLEARING CART
            const finalTotal = getTotalWithTax();

            // Prepare order data
            const cartItems = cart.map(item => ({
                menuitemId: item._id,
                quantity: item.quantity
            }));

            const orderData = {
                cartItems,
                customerInfo
            };

            console.log('Sending order data:', orderData);

            // Call order API
            const response = await axios.post('http://localhost:4001/api/place-cart-order', orderData);

            console.log('Order response:', response.data);

            // Show success - PASS THE SAVED TOTAL
            setOrderDetails({
                ...response.data,
                finalTotal: finalTotal // Add the calculated total
            });
            setShowSuccess(true);
            clearCart();

        } catch (error) {
            console.error('Order failed:', error);
            alert('Order failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Success View
    if (showSuccess && orderDetails) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto">
                    {/* Success Card */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                        {/* Celebration Icon */}
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <span className="text-3xl">🎉</span>
                        </div>

                        <h1 className="text-3xl font-bold text-gray-900 mb-4">
                            Order Confirmed!
                        </h1>

                        <p className="text-lg text-gray-600 mb-2">
                            Thank you for your order, <span className="font-semibold text-green-600">{customerInfo.name}</span>!
                        </p>

                        <p className="text-gray-500 mb-6">
                            We've started preparing your delicious food. You'll receive updates soon.
                        </p>

                        {/* Order Summary */}
                        <div className="bg-gray-50 rounded-lg p-6 mb-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Details</h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Order ID:</span>
                                    <span className="font-medium">#{orderDetails.orders[0]?._id.slice(-6).toUpperCase()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Total Items:</span>
                                    <span className="font-medium">{orderDetails.totalItems}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Total Amount:</span>
                                    <span className="font-medium text-green-600">${orderDetails.finalTotal}</span>
                                </div>
                            </div>
                        </div>

                        {/* Delivery Message */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                            <div className="flex items-center">
                                <span className="text-blue-500 text-xl mr-3">⏱️</span>
                                <div>
                                    <p className="text-sm font-medium text-blue-800">Estimated Delivery</p>
                                    <p className="text-sm text-blue-600">30-45 minutes</p>
                                </div>
                            </div>
                        </div>

                        <Link
                            to="/menu"
                            className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold shadow-lg"
                        >
                            Order More Delicious Food
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Almost There! 🍕
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Just one step away from enjoying your delicious meal
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Customer Information Form */}
                    <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                            <span className="mr-3">👤</span>
                            Your Information
                        </h2>

                        <form onSubmit={handlePlaceOrder} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={customerInfo.name}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="Enter your full name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={customerInfo.email}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="your@email.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Phone Number *
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    value={customerInfo.phone}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="+1 (555) 123-4567"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Delivery Address *
                                </label>
                                <textarea
                                    name="address"
                                    rows={3}
                                    required
                                    value={customerInfo.address}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="Enter your complete delivery address"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-semibold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center">
                                        <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></span>
                                        Placing Your Order...
                                    </span>
                                ) : (
                                    'Place Order & Enjoy! 🎉'
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                            <span className="mr-3">📦</span>
                            Order Summary
                        </h2>

                        {/* Cart Items */}
                        <div className="space-y-4 mb-6 max-h-80 overflow-y-auto">
                            {cart.map(item => (
                                <div key={item._id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-16 h-16 object-cover rounded-md"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-semibold text-gray-900 truncate">{item.name}</h4>
                                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold text-gray-900">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Totals */}
                        <div className="border-t border-gray-200 pt-4 space-y-3">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal ({cartItemsCount} items)</span>
                                <span>${getCartTotal().toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Delivery Fee</span>
                                <span className="text-green-600">FREE</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Tax</span>
                                <span>${(getCartTotal() * 0.1).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-lg font-bold text-gray-900 border-t pt-3">
                                <span>Total</span>
                                <span className="text-blue-600">${getTotalWithTax()}</span>
                            </div>
                        </div>

                        {/* Special Message */}
                        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <div className="flex items-start">
                                <span className="text-yellow-500 text-xl mr-3">🌟</span>
                                <div>
                                    <p className="text-sm font-medium text-yellow-800">Chef's Special Today!</p>
                                    <p className="text-sm text-yellow-600">Your food will be prepared with extra love and care</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Back to Cart Link */}
                <div className="text-center mt-8">
                    <Link
                        to="/cart"
                        className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center"
                    >
                        ← Back to Cart
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Checkout;

import React, { useState } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { cartItemsCount } = useCart();

    return (
        <nav className="fixed top-0 left-0 right-0 w-full flex justify-between items-center px-4 sm:px-8 py-4 z-30 bg-white shadow-md">
            {/* Brand Name */}
            <h1 className="text-3xl font-extrabold tracking-wide uppercase select-none">
                <span className="text-blue-500">Dine</span>
                <span className="text-yellow-400">Ease</span>
            </h1>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex space-x-8 font-semibold text-lg text-black">
                <li>
                    <Link to="/" className="hover:text-blue-400 transition duration-300">Home</Link>
                </li>
                <li>
                    <Link to="/about" className="hover:text-blue-400 transition duration-300">About</Link>
                </li>
                <li>
                    <Link to="/menu" className="hover:text-blue-400 transition duration-300">Menu</Link>
                </li>
                <li>
                    <Link to="/contact" className="hover:text-blue-400 transition duration-300">Contact</Link>
                </li>
            </ul>

            {/* Desktop CTA Button & Cart Icon */}
            <div className="hidden md:flex items-center space-x-4">
                <Link to={"/reservation"} className="bg-yellow-400 hover:bg-yellow-500 transition duration-300 px-6 py-2 rounded-full font-semibold text-gray-900">
                    Book a Table
                </Link>

                {/* UPDATED: Cart Icon with Link */}
                <div className="relative">
                    <Link
                        to="/cart"
                        className="text-gray-700 hover:text-blue-400 transition duration-300 p-2 block"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5.5M7 13l2.5 5.5m5.5-5.5h5.5m-5.5 0V19a2 2 0 104 0v-1.5" />
                        </svg>

                        {/* Cart Badge */}
                        {cartItemsCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                {cartItemsCount}
                            </span>
                        )}
                    </Link>
                </div>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden z-40">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? (
                        <HiX className="text-3xl text-black" />
                    ) : (
                        <HiMenuAlt3 className="text-3xl text-black" />
                    )}
                </button>
            </div>

            {/* Mobile Menu - UPDATED */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-20 left-0 w-full bg-white shadow-lg flex flex-col items-center gap-6 py-6 font-semibold text-lg text-black transition-all duration-300 z-40">
                    <Link to="/" className="hover:text-blue-400" onClick={() => setIsMenuOpen(false)}>Home</Link>
                    <Link to="/about" className="hover:text-blue-400" onClick={() => setIsMenuOpen(false)}>About</Link>
                    <Link to="/menu" className="hover:text-blue-400" onClick={() => setIsMenuOpen(false)}>Menu</Link>
                    <Link to="/contact" className="hover:text-blue-400" onClick={() => setIsMenuOpen(false)}>Contact</Link>

                    {/* UPDATED: Mobile Cart with Link */}
                    <Link
                        to="/cart"
                        className="flex items-center space-x-2 text-blue-500 hover:text-blue-400"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5.5M7 13l2.5 5.5m5.5-5.5h5.5m-5.5 0V19a2 2 0 104 0v-1.5" />
                        </svg>
                        <span>Cart ({cartItemsCount})</span>
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

                {/* Brand */}
                <div data-aos="fade-up">
                    <h2 className="text-2xl font-bold text-amber-400">DineEase</h2>
                    <p className="mt-4 text-sm">
                        Serving taste with ease. <br />Your comfort, our priority.
                    </p>
                </div>

                {/* Quick Links */}
                <div data-aos="fade-up" data-aos-delay="100">
                    <h3 className="text-lg font-semibold text-amber-400 mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#menu" className="hover:text-amber-400">Menu</a></li>
                        <li><a href="#reservation" className="hover:text-amber-400">Reservation</a></li>
                        <li><a href="#about" className="hover:text-amber-400">About Us</a></li>
                        <li><a href="#contact" className="hover:text-amber-400">Contact</a></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div data-aos="fade-up" data-aos-delay="200">
                    <h3 className="text-lg font-semibold text-amber-400 mb-4">Contact Us</h3>
                    <p className="text-sm">Email: contact@dineease.com</p>
                    <p className="text-sm">Phone: +1 234 567 8901</p>
                    <p className="text-sm">123 Main Street, Food City</p>
                </div>

                {/* Social Icons */}
                <div data-aos="fade-up" data-aos-delay="300">
                    <h3 className="text-lg font-semibold text-amber-400 mb-4">Follow Us</h3>
                    <div className="flex space-x-4 mt-2">
                        <a
                            href="#"
                            className="text-xl hover:text-amber-400 hover:scale-110 transform transition duration-300"
                            data-aos="zoom-in"
                            data-aos-delay="300"
                        >
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a
                            href="#"
                            className="text-xl hover:text-amber-400 hover:scale-110 transform transition duration-300"
                            data-aos="zoom-in"
                            data-aos-delay="400"
                        >
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a
                            href="#"
                            className="text-xl hover:text-amber-400 hover:scale-110 transform transition duration-300"
                            data-aos="zoom-in"
                            data-aos-delay="500"
                        >
                            <i className="fab fa-x-twitter"></i>
                        </a>
                        <a
                            href="#"
                            className="text-xl hover:text-amber-400 hover:scale-110 transform transition duration-300"
                            data-aos="zoom-in"
                            data-aos-delay="600"
                        >
                            <i className="fab fa-tripadvisor"></i>
                        </a>
                    </div>
                </div>

            </div>

            {/* Bottom Bar */}
            <div
                className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-500"
                data-aos="fade-up"
                data-aos-delay="400"
            >
                &copy; 2025 DineEase. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;

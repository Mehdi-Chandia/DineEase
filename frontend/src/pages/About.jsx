import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
            {/* Hero Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                        Our Story 🍽️
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 mb-8">
                        Where passion for food meets unforgettable experiences
                    </p>
                    <div className="w-24 h-1 bg-orange-500 mx-auto"></div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl font-bold text-gray-900 mb-6 flex items-center">
                                <span className="mr-3">🌟</span>
                                Our Mission
                            </h2>
                            <p className="text-lg text-gray-600 mb-6">
                                At <span className="font-semibold text-orange-600">DineEase</span>, we believe that great food has the power to bring people together. Our mission is to create memorable dining experiences that delight your senses and warm your heart.
                            </p>
                            <p className="text-lg text-gray-600">
                                Every dish we serve is crafted with love, using the finest ingredients sourced from local farmers and trusted suppliers. We're not just serving food; we're creating moments that turn into cherished memories. 🎉
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-orange-100 p-6 rounded-2xl text-center">
                                <span className="text-3xl mb-3 block">👨‍🍳</span>
                                <h3 className="font-bold text-gray-900 mb-2">Expert Chefs</h3>
                                <p className="text-sm text-gray-600">15+ years experience</p>
                            </div>
                            <div className="bg-amber-100 p-6 rounded-2xl text-center">
                                <span className="text-3xl mb-3 block">🌱</span>
                                <h3 className="font-bold text-gray-900 mb-2">Fresh Ingredients</h3>
                                <p className="text-sm text-gray-600">Locally sourced</p>
                            </div>
                            <div className="bg-yellow-100 p-6 rounded-2xl text-center">
                                <span className="text-3xl mb-3 block">🏆</span>
                                <h3 className="font-bold text-gray-900 mb-2">Award Winning</h3>
                                <p className="text-sm text-gray-600">Best Restaurant 2023</p>
                            </div>
                            <div className="bg-red-100 p-6 rounded-2xl text-center">
                                <span className="text-3xl mb-3 block">❤️</span>
                                <h3 className="font-bold text-gray-900 mb-2">Made with Love</h3>
                                <p className="text-sm text-gray-600">Passionate cooking</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
                            <span className="mr-3">📖</span>
                            Our Journey
                        </h2>
                        <p className="text-xl text-gray-600">From humble beginnings to culinary excellence</p>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-orange-500">
                            <div className="flex items-start">
                                <span className="text-2xl mr-4">🍳</span>
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">The Beginning</h3>
                                    <p className="text-gray-600">
                                        It all started in 2015 with a small family kitchen and a big dream. Our founder, Chef Marco, wanted to share his grandmother's secret recipes with the world. What began as a 10-seat eatery has grown into the beloved restaurant we are today.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-amber-500">
                            <div className="flex items-start">
                                <span className="text-2xl mr-4">🚀</span>
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Rising Popularity</h3>
                                    <p className="text-gray-600">
                                        Word spread quickly about our authentic flavors and warm hospitality. By 2018, we were featured in "Top 10 Must-Visit Restaurants" and received our first culinary award. Our secret? Staying true to our roots while innovating constantly. ✨
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-yellow-500">
                            <div className="flex items-start">
                                <span className="text-2xl mr-4">🎯</span>
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Today & Beyond</h3>
                                    <p className="text-gray-600">
                                        Today, we serve over 500 happy customers weekly and have expanded to offer online ordering and table reservations. But our commitment remains the same: serve exceptional food that tells a story in every bite. The journey continues! 🌟
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
                            <span className="mr-3">👥</span>
                            Meet Our Team
                        </h2>
                        <p className="text-xl text-gray-600">The passionate people behind your favorite dishes</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center bg-orange-50 p-8 rounded-2xl">
                            <div className="w-20 h-20 bg-orange-200 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">👨‍🍳</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Chef Marco</h3>
                            <p className="text-orange-600 font-semibold mb-3">Head Chef & Founder</p>
                            <p className="text-gray-600">
                                "Cooking isn't just my profession, it's my passion. Every dish carries a piece of my heart." ❤️
                            </p>
                        </div>

                        <div className="text-center bg-amber-50 p-8 rounded-2xl">
                            <div className="w-20 h-20 bg-amber-200 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">👩‍🍳</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Chef Elena</h3>
                            <p className="text-amber-600 font-semibold mb-3">Pastry Chef</p>
                            <p className="text-gray-600">
                                "Desserts should be as beautiful to look at as they are delicious to eat." 🍰
                            </p>
                        </div>

                        <div className="text-center bg-yellow-50 p-8 rounded-2xl">
                            <div className="w-20 h-20 bg-yellow-200 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">🥬</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Farmer Joe</h3>
                            <p className="text-yellow-600 font-semibold mb-3">Local Supplier</p>
                            <p className="text-gray-600">
                                "Proud to provide the freshest ingredients for DineEase's amazing dishes." 🌱
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-gray-900 mb-12 flex items-center justify-center">
                        <span className="mr-3">💫</span>
                        Our Values
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-2xl shadow-md">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">🌍</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Sustainability</h3>
                            <p className="text-gray-600">
                                We're committed to eco-friendly practices and supporting local communities. ♻️
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-md">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">👍</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Quality</h3>
                            <p className="text-gray-600">
                                Never compromising on ingredients or preparation methods. 🏆
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-md">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">😊</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Hospitality</h3>
                            <p className="text-gray-600">
                                Every guest is treated like family in our restaurant. 👨‍👩‍👧‍👦
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-orange-600">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-white mb-6">
                        Ready to Experience DineEase? 🎉
                    </h2>
                    <p className="text-xl text-orange-100 mb-8">
                        Join us for an unforgettable culinary journey
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/menu"
                            className="bg-white text-orange-600 px-8 py-4 rounded-lg hover:bg-orange-50 transition-colors font-semibold text-lg shadow-lg"
                        >
                            Explore Our Menu 🍕
                        </Link>
                        <Link
                            to="/reservation"
                            className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-orange-600 transition-colors font-semibold text-lg"
                        >
                            Book a Table 🍽️
                        </Link>
                    </div>
                </div>
            </section>

            {/* Back to Home */}
            <div className="py-8 text-center">
                <Link
                    to="/"
                    className="text-orange-600 hover:text-orange-700 font-medium inline-flex items-center"
                >
                    ← Back to Home
                </Link>
            </div>
        </div>
    );
};

export default About;
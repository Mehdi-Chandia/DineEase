import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext.jsx"; // Import the custom hook

const Menu = () => {
    // Use cart context - REPLACE local cart states
    const { addToCart } = useCart()

    // KEEP these states (they're menu-specific)
    const [menu, setMenu] = useState([]);
    const [filteredMenu, setFilteredMenu] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [currentSlides, setCurrentSlides] = useState({});
    const [loading, setLoading] = useState(true);
    const [itemsPerSlide, setItemsPerSlide] = useState(3);

    const categories = [
        { id: "all", name: "All Items" },
        { id: "appetizer", name: "Appetizers" },
        { id: "main course", name: "Main Course" },
        { id: "desserts", name: "Desserts" }
    ];

    useEffect(() => {
        const getItems = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get('http://localhost:4001/api/menu/getAllItems', { withCredentials: true });
                setMenu(data);
                setFilteredMenu(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        getItems();
    }, []);

    useEffect(() => {
        const updateItemsPerSlide = () => {
            if (window.innerWidth >= 1024) {
                setItemsPerSlide(3);
            } else if (window.innerWidth >= 768) {
                setItemsPerSlide(2);
            } else {
                setItemsPerSlide(1);
            }
        };

        updateItemsPerSlide();
        window.addEventListener('resize', updateItemsPerSlide);
        return () => window.removeEventListener('resize', updateItemsPerSlide);
    }, []);

    // Filter menu by category
    useEffect(() => {
        if (selectedCategory === "all") {
            setFilteredMenu(menu);
        } else {
            const filtered = menu.filter(item => item.category === selectedCategory);
            setFilteredMenu(filtered);
        }
        setCurrentSlides({});
    }, [selectedCategory, menu]);

    // Group items by category for "All" view
    const groupItemsByCategory = (items) => {
        const grouped = {};
        categories.forEach(cat => {
            if (cat.id !== 'all') {
                grouped[cat.id] = items.filter(item => item.category === cat.id);
            }
        });
        return grouped;
    };

    // Group items for carousel
    const groupItemsForCarousel = (items, itemsPerSlide) => {
        const groups = [];
        for (let i = 0; i < items.length; i += itemsPerSlide) {
            groups.push(items.slice(i, i + itemsPerSlide));
        }
        return groups;
    };

    const groupedByCategory = groupItemsByCategory(filteredMenu);
    const isAllView = selectedCategory === "all";

    const nextSlide = (category) => {
        setCurrentSlides(prev => {
            const currentSlide = prev[category] || 0;
            const items = isAllView ? groupedByCategory[category] : filteredMenu;
            const groupedItems = groupItemsForCarousel(items, itemsPerSlide);
            const totalSlides = groupedItems.length;
            return {
                ...prev,
                [category]: (currentSlide + 1) % totalSlides
            };
        });
    };

    const prevSlide = (category) => {
        setCurrentSlides(prev => {
            const currentSlide = prev[category] || 0;
            const items = isAllView ? groupedByCategory[category] : filteredMenu;
            const groupedItems = groupItemsForCarousel(items, itemsPerSlide);
            const totalSlides = groupedItems.length;
            return {
                ...prev,
                [category]: (currentSlide - 1 + totalSlides) % totalSlides
            };
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
            </div>
        );
    }

    const renderCarousel = (items, category = selectedCategory) => {
        if (items.length === 0) return null;

        const groupedItems = groupItemsForCarousel(items, itemsPerSlide);
        const currentSlide = currentSlides[category] || 0;
        const totalSlides = groupedItems.length;

        return (
            <div className="relative mb-12">
                {/* Category Heading for All view */}
                {isAllView && (
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 capitalize">
                        {category}
                    </h2>
                )}

                {/* Navigation Arrows */}
                {totalSlides > 1 && (
                    <>
                        <button
                            onClick={() => prevSlide(category)}
                            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors -left-4"
                        >
                            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            onClick={() => nextSlide(category)}
                            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors -right-4"
                        >
                            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </>
                )}

                {/* Carousel Container */}
                <div className="overflow-hidden">
                    <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
                        {groupedItems.map((slideItems, index) => (
                            <div key={index} className="w-full flex-shrink-0">
                                <div className={`grid gap-8 ${
                                    itemsPerSlide === 3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' :
                                        itemsPerSlide === 2 ? 'grid-cols-1 md:grid-cols-2' :
                                            'grid-cols-1'
                                }`}>
                                    {slideItems.map(item => (
                                        <div key={item._id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                                            <div className="relative h-48 overflow-hidden">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>
                                            <div className="p-6">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                                                    <span className="bg-red-100 text-red-600 text-sm font-medium px-2 py-1 rounded-full">
                                                        {item.category}
                                                    </span>
                                                </div>
                                                <p className="text-gray-600 mb-4 line-clamp-2">{item.description}</p>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-2xl font-bold text-red-600">${item.price.toFixed(2)}</span>
                                                    {/* UPDATE THIS BUTTON: AddToCart → addToCart */}
                                                    <button
                                                        onClick={() => addToCart(item)}
                                                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                                                    >
                                                        Add to Cart
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Slide Indicators */}
                {totalSlides > 1 && (
                    <div className="flex justify-center mt-8 space-x-2">
                        {groupedItems.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlides(prev => ({ ...prev, [category]: index }))}
                                className={`w-3 h-3 rounded-full transition-all ${
                                    index === currentSlide ? 'bg-red-600 w-8' : 'bg-gray-300'
                                }`}
                            />
                        ))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            {/* Header Section */}
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                    Our <span className="text-yellow-500"> Delicious</span> Menu
                </h1>
                <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                    Experience the finest flavors crafted with passion and fresh ingredients
                </p>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
                {categories.map(category => (
                    <button
                        key={category.id}
                        className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                            selectedCategory === category.id
                                ? 'bg-red-600 text-white shadow-lg'
                                : 'bg-white text-red-600 border-2 border-red-600 hover:bg-red-50'
                        }`}
                        onClick={() => setSelectedCategory(category.id)}
                    >
                        {category.name}
                    </button>
                ))}
            </div>

            {/* Menu Items */}
            <div className="max-w-7xl mx-auto">
                {isAllView ? (
                    <>
                        {categories.filter(cat => cat.id !== 'all').map(category => (
                            <div key={category.id}>
                                {renderCarousel(groupedByCategory[category.id] || [], category.id)}
                            </div>
                        ))}
                    </>
                ) : (
                    renderCarousel(filteredMenu)
                )}
            </div>
        </div>
    );
};

export default Menu;








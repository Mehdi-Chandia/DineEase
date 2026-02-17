import React, { useEffect, useState } from "react";
import axios from "axios";

const Menu = () => {
    const [menu, setMenu] = useState([])
    const [loading, setLoading] = useState(true)

    // Remove all other states for now - we'll add them step by step

    useEffect(() => {
        const getItems = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get('http://localhost:4001/api/menu/getAllItems', { withCredentials: true });
                setMenu(data);
                console.log("Data received:", data); // Let's see what we get
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        getItems();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            {/* Step 1: Basic Header */}
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                    Our Delicious Menu
                </h1>
                <p className="text-gray-600">
                    Check out our amazing dishes
                </p>
            </div>

            {/* Step 2: Just display all menu items in a simple grid */}
            <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {menu.map(item => (
                        <div key={item._id} className="bg-white rounded-lg shadow-md p-4">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-40 object-cover rounded-md mb-3"
                            />
                            <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                            <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                            <div className="flex justify-between items-center">
                                <span className="text-red-600 font-bold">${item.price}</span>
                                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                                    {item.category}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Menu;
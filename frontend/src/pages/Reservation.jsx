import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Reservation = () => {
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [reservationDetails, setReservationDetails] = useState(null);

    const [reservationInfo, setReservationInfo] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        numberOfGuests: 2,
        specialRequests: ''
    });

    const handleInputChange = (e) => {
        setReservationInfo({
            ...reservationInfo,
            [e.target.name]: e.target.value
        });
    };

    const handleReservation = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:4001/api/reservation', reservationInfo);

            setReservationDetails(response.data);
            setShowSuccess(true);

        } catch (error) {
            console.error('Reservation failed:', error);
            alert(error.response?.data?.message || 'Reservation failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Get today's date for min attribute
    const getTodayDate = () => {
        return new Date().toISOString().split('T')[0];
    };

    // Success View
    if (showSuccess && reservationDetails) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                        <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <span className="text-3xl">🎊</span>
                        </div>

                        <h1 className="text-3xl font-bold text-gray-900 mb-4">
                            Table Reserved!
                        </h1>

                        <p className="text-lg text-gray-600 mb-2">
                            We're excited to host you, <span className="font-semibold text-purple-600">{reservationInfo.name}</span>!
                        </p>

                        <p className="text-gray-500 mb-6">
                            Your table for {reservationInfo.numberOfGuests} is reserved for {new Date(reservationInfo.date).toLocaleDateString()} at {reservationInfo.time}
                        </p>

                        <div className="bg-gray-50 rounded-lg p-6 mb-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Reservation Details</h3>
                            <div className="space-y-2 text-sm text-left">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Reservation ID:</span>
                                    <span className="font-medium">#{reservationDetails.reservation._id.slice(-6).toUpperCase()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Date & Time:</span>
                                    <span className="font-medium">{new Date(reservationInfo.date).toLocaleDateString()} at {reservationInfo.time}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Guests:</span>
                                    <span className="font-medium">{reservationInfo.numberOfGuests} people</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Status:</span>
                                    <span className="font-medium text-green-600">Confirmed</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                            <div className="flex items-center">
                                <span className="text-yellow-500 text-xl mr-3">💫</span>
                                <div>
                                    <p className="text-sm font-medium text-yellow-800">We're preparing something special!</p>
                                    <p className="text-sm text-yellow-600">Our chef is crafting a wonderful dining experience for you</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/menu"
                                className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
                            >
                                View Menu
                            </Link>
                            <button
                                onClick={() => setShowSuccess(false)}
                                className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
                            >
                                Book Another Table
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Reserve Your Table 🍽️
                    </h1>
                    <p className="text-xl text-gray-600">
                        Secure your spot for an unforgettable dining experience
                    </p>
                </div>

                {/* Reservation Form */}
                <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8">
                    <form onSubmit={handleReservation} className="space-y-6">
                        {/* Personal Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={reservationInfo.name}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                    placeholder="Your full name"
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
                                    value={reservationInfo.email}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                    placeholder="your@email.com"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Phone Number *
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    value={reservationInfo.phone}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                    placeholder="+1 (555) 123-4567"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Number of Guests *
                                </label>
                                <select
                                    name="numberOfGuests"
                                    required
                                    value={reservationInfo.numberOfGuests}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                >
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                                        <option key={num} value={num}>
                                            {num} {num === 1 ? 'person' : 'people'}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Date *
                                </label>
                                <input
                                    type="date"
                                    name="date"
                                    required
                                    value={reservationInfo.date}
                                    onChange={handleInputChange}
                                    min={getTodayDate()}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Time *
                                </label>
                                <select
                                    name="time"
                                    required
                                    value={reservationInfo.time}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                >
                                    <option value="">Select time</option>
                                    <option value="11:00">11:00 AM</option>
                                    <option value="12:00">12:00 PM</option>
                                    <option value="13:00">1:00 PM</option>
                                    <option value="14:00">2:00 PM</option>
                                    <option value="18:00">6:00 PM</option>
                                    <option value="19:00">7:00 PM</option>
                                    <option value="20:00">8:00 PM</option>
                                    <option value="21:00">9:00 PM</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Special Requests
                            </label>
                            <textarea
                                name="specialRequests"
                                rows={3}
                                value={reservationInfo.specialRequests}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                placeholder="Any special occasions or dietary requirements?"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-semibold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></span>
                                    Reserving Your Table...
                                </span>
                            ) : (
                                'Confirm Reservation ✨'
                            )}
                        </button>
                    </form>
                </div>

                {/* Back Link */}
                <div className="text-center mt-8">
                    <Link
                        to="/"
                        className="text-purple-600 hover:text-purple-700 font-medium inline-flex items-center"
                    >
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

// ADD THIS EXPORT STATEMENT
export default Reservation;
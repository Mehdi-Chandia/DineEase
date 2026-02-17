import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Contact = () => {
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const [contactInfo, setContactInfo] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    // REPLACE THIS WITH YOUR ACTUAL WEB3FORMS ACCESS KEY
    const WEB3FORMS_ACCESS_KEY = '646238e4-ad37-4c91-9aa1-18f792626fb5';

    const handleInputChange = (e) => {
        setContactInfo({
            ...contactInfo,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('access_key', WEB3FORMS_ACCESS_KEY);
            formData.append('subject', `New Message from ${contactInfo.name} - ${contactInfo.subject}`);
            formData.append('from_name', contactInfo.name);
            formData.append('email', contactInfo.email);
            formData.append('message', contactInfo.message);

            // Optional: Add custom fields
            formData.append('company', 'DineEase Restaurant');
            formData.append('botcheck', ''); // Anti-bot field

            const response = await axios.post('https://api.web3forms.com/submit', formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            if (response.data.success) {
                setShowSuccess(true);
                setContactInfo({ name: '', email: '', subject: '', message: '' });
            } else {
                throw new Error(response.data.message);
            }

        } catch (error) {
            console.error('Message failed:', error);
            alert('Message failed to send. Please try again or email us directly at hello@dineease.com');
        } finally {
            setLoading(false);
        }
    };

    // Success View
    if (showSuccess) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <span className="text-3xl">🚀</span>
                        </div>

                        <h1 className="text-3xl font-bold text-gray-900 mb-4">
                            Message Sent Successfully! 🎉
                        </h1>

                        <p className="text-lg text-gray-600 mb-2">
                            Thank you for reaching out, <span className="font-semibold text-green-600">{contactInfo.name}</span>!
                        </p>

                        <p className="text-gray-500 mb-6">
                            Your message has been delivered directly to our team. We're excited to connect with you and will respond within 24 hours.
                        </p>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                            <div className="flex items-center justify-center">
                                <span className="text-blue-500 text-xl mr-3">💫</span>
                                <div>
                                    <p className="text-sm font-medium text-blue-800">What happens next?</p>
                                    <p className="text-sm text-blue-600">Our team will review your message and get back to you personally</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/"
                                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
                            >
                                Back to Home 🏠
                            </Link>
                            <button
                                onClick={() => setShowSuccess(false)}
                                className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
                            >
                                Send Another Message ✨
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                        Let's Connect! 🤝
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
                        We're all ears! Whether you have questions, feedback, or just want to say hello - we'd love to hear from you. Your message makes our day! 🌟
                    </p>
                    <div className="w-24 h-1 bg-blue-500 mx-auto mt-8"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <div className="space-y-8">
                        <div className="bg-white rounded-2xl shadow-xl p-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                                <span className="mr-3">💌</span>
                                Get In Touch
                            </h2>
                            <p className="text-gray-600 mb-8">
                                We believe great conversations start with a simple hello. Don't be shy - reach out and let's create something amazing together!
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-start p-4 bg-blue-50 rounded-lg">
                                    <span className="text-blue-500 text-2xl mr-4">📧</span>
                                    <div>
                                        <h3 className="font-bold text-gray-900 text-lg">Email Us</h3>
                                        <p className="text-gray-600">hello@dineease.com</p>
                                        <p className="text-sm text-blue-600 mt-1">Perfect for detailed inquiries</p>
                                    </div>
                                </div>

                                <div className="flex items-start p-4 bg-green-50 rounded-lg">
                                    <span className="text-green-500 text-2xl mr-4">📞</span>
                                    <div>
                                        <h3 className="font-bold text-gray-900 text-lg">Call Us</h3>
                                        <p className="text-gray-600">+1 (555) 123-DINE</p>
                                        <p className="text-sm text-green-600 mt-1">Mon-Sun, 9AM-10PM EST</p>
                                    </div>
                                </div>

                                <div className="flex items-start p-4 bg-purple-50 rounded-lg">
                                    <span className="text-purple-500 text-2xl mr-4">🏢</span>
                                    <div>
                                        <h3 className="font-bold text-gray-900 text-lg">Visit Our Restaurant</h3>
                                        <p className="text-gray-600">123 Gourmet Avenue</p>
                                        <p className="text-gray-600">Flavor City, FC 12345</p>
                                        <p className="text-sm text-purple-600 mt-1">Come taste the magic! 🍽️</p>
                                    </div>
                                </div>

                                <div className="flex items-start p-4 bg-orange-50 rounded-lg">
                                    <span className="text-orange-500 text-2xl mr-4">⏰</span>
                                    <div>
                                        <h3 className="font-bold text-gray-900 text-lg">Operating Hours</h3>
                                        <p className="text-gray-600"><strong>Kitchen:</strong> 11:00 AM - 10:00 PM</p>
                                        <p className="text-gray-600"><strong>Bar:</strong> 11:00 AM - 11:00 PM</p>
                                        <p className="text-sm text-orange-600 mt-1">7 days a week! 🎉</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Fun Facts */}
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
                            <h3 className="text-2xl font-bold mb-4 flex items-center">
                                <span className="mr-3">🎯</span>
                                Did You Know?
                            </h3>
                            <div className="space-y-3">
                                <p className="flex items-center">
                                    <span className="mr-2">⚡</span>
                                    We respond to 95% of messages within 6 hours
                                </p>
                                <p className="flex items-center">
                                    <span className="mr-2">❤️</span>
                                    Every message gets personal attention from our team
                                </p>
                                <p className="flex items-center">
                                    <span className="mr-2">🌟</span>
                                    Your feedback helps us create better experiences
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                            <span className="mr-3">✍️</span>
                            Send Us a Message
                        </h2>
                        <p className="text-gray-600 mb-8">
                            Fill out the form below and we'll get back to you faster than you can say "delicious!" 🍕
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Your Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={contactInfo.name}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        placeholder="What should we call you?"
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
                                        value={contactInfo.email}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        placeholder="your@email.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Subject *
                                </label>
                                <input
                                    type="text"
                                    name="subject"
                                    required
                                    value={contactInfo.subject}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="What's this about?"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Your Message *
                                </label>
                                <textarea
                                    name="message"
                                    rows={6}
                                    required
                                    value={contactInfo.message}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="Tell us everything! We're listening... 👂"
                                />
                            </div>

                            {/* Anti-bot field (hidden) */}
                            <input type="checkbox" name="botcheck" className="hidden" />

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-semibold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center">
                                        <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></span>
                                        Sending Your Message...
                                    </span>
                                ) : (
                                    'Send Message & Make Our Day! 🌈'
                                )}
                            </button>

                            <p className="text-center text-sm text-gray-500">
                                We promise to keep your information safe and sound! 🔒
                            </p>
                        </form>
                    </div>
                </div>

                {/* Back to Home */}
                <div className="text-center mt-12">
                    <Link
                        to="/"
                        className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center text-lg"
                    >
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Contact;

import React from "react";
import dishImage from "../assets/dishImage.jpg";
import {Link} from "react-router-dom"; // your image


const HeroSection = () => {
    return (
        <section className="min-h-screen bg-white px-6 md:px-20 py-20 flex flex-col items-center justify-center">
            {/* Heading */}
            <div className="text-center max-w-3xl mb-16">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">
                    Discover <span className="text-yellow-500">Delicious </span> Moments
                </h1>
                <p className="text-lg md:text-xl text-gray-600">
                    From savory classics to modern delights — our food tells a story.
                </p>
            </div>

            {/* Animated Image */}
            <div data-aos="fade-up" className="w-full">
                <img
                    src={dishImage}
                    alt="Delicious Food"
                    className="w-full h-[50vh] sm:h-[60vh] md:h-[70vh] object-cover rounded-none"
                />
            </div>

            {/* Buttons below the image */}
            <div className="mt-8 flex justify-center gap-6" data-aos="fade-up" data-aos-delay="200">
                <Link to={"/menu"} className="px-6 py-3 border border-yellow-400 text-yellow-400 bg-white/20 backdrop-blur-sm rounded-md font-medium hover:bg-yellow-400 hover:text-white transition-all duration-300">
                    View Menu
                </Link>
                <Link to={"/reservation"} className="px-6 py-3 border border-yellow-400 text-yellow-400 bg-white/20 backdrop-blur-sm rounded-md font-medium hover:bg-yellow-400 hover:text-white transition-all duration-300">
                    Book a Table
                </Link>
            </div>

        </section>
    );
};

export default HeroSection;










import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
    {
        name: "Aarav Sharma",
        role: "Climate Activist",
        feedback: "This platform has completely changed how I engage with climate action. The resources are top-notch!",
        img: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
        name: "Sophia Patel",
        role: "Education Advocate",
        feedback: "The interactive map helped me find like-minded people in my city. This is a game-changer!",
        img: "https://randomuser.me/api/portraits/women/45.jpg"
    },
    {
        name: "Ravi Kapoor",
        role: "Social Entrepreneur",
        feedback: "The daily content updates keep me informed and inspired to take action!",
        img: "https://randomuser.me/api/portraits/men/50.jpg"
    }
];

const Testimonials = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000
    };

    return (
        <div className="py-12 bg-gradient-to-r from-gray-900 via-purple-900 to-black text-white mt-12">
            <h2 className="text-4xl font-bold text-center neon-text">What Our Users Say</h2>
            <div className="max-w-3xl mx-auto mt-8">
                <Slider {...settings}>
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="flex flex-col items-center text-center p-6 bg-gradient-to-r from-gray-900 via-purple-900 to-black text-white rounded-lg shadow-lg">
                            <FaQuoteLeft className="text-cyan-400 text-3xl mb-3" />
                            <p className="text-gray-300 italic">"{testimonial.feedback}"</p>
                            <img src={testimonial.img} alt={testimonial.name} className="w-16 h-16 mt-4 rounded-full border-2 border-cyan-400" />
                            <h3 className="mt-2 text-xl font-semibold">{testimonial.name}</h3>
                            <p className="text-gray-400 text-sm">{testimonial.role}</p>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default Testimonials;

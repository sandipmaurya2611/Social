import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-gray-900 via-purple-900 to-black text-white mt-12 py-10">
            <div className="container mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
                    
                    {/* Logo & About */}
                    <div className="md:w-1/3 text-center md:text-left">
                        <h2 className="text-3xl font-bold text-white mb-2">Give India</h2>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            Building a better world through knowledge, connection, and action.  
                            Join us in making an impact!
                        </p>
                    </div>

                    {/* Navigation Links */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-center md:text-left">
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-3">Explore</h3>
                            <ul className="space-y-2">
                                <li><a href="/library" className="hover:text-cyan-400 transition duration-300">📚 Content Library</a></li>
                                <li><a href="/map" className="hover:text-cyan-400 transition duration-300">🗺️ Interactive Map</a></li>
                                <li><a href="/passion" className="hover:text-cyan-400 transition duration-300">🔍 Passion Finder</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-white mb-3">Resources</h3>
                            <ul className="space-y-2">
                                <li><a href="/action" className="hover:text-cyan-400 transition duration-300">⚡ Action Hub</a></li>
                                <li><a href="/community" className="hover:text-cyan-400 transition duration-300">💬 Community</a></li>
                                <li><a href="/help" className="hover:text-cyan-400 transition duration-300">📖 Help Center</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-white mb-3">Get Involved</h3>
                            <ul className="space-y-2">
                                <li><a href="/volunteer" className="hover:text-cyan-400 transition duration-300">🙌 Volunteer</a></li>
                                <li><a href="/donate" className="hover:text-cyan-400 transition duration-300">💖 Donate</a></li>
                                <li><a href="/contact" className="hover:text-cyan-400 transition duration-300">📞 Contact Us</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Social Media Links */}
                    <div className="text-center md:text-left">
                        <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
                        <div className="flex justify-center md:justify-start space-x-4">
                            <a href="#" className="hover:text-cyan-400 transition duration-300">
                                <FaFacebookF size={22} />
                            </a>
                            <a href="#" className="hover:text-cyan-400 transition duration-300">
                                <FaTwitter size={22} />
                            </a>
                            <a href="#" className="hover:text-cyan-400 transition duration-300">
                                <FaInstagram size={22} />
                            </a>
                            <a href="#" className="hover:text-cyan-400 transition duration-300">
                                <FaLinkedinIn size={22} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Divider & Copyright */}
                <div className="mt-10 border-t border-gray-700 pt-5 text-center text-sm text-gray-400">
                    © {new Date().getFullYear()} Give India. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;

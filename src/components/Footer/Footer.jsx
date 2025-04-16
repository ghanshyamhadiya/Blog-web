import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';
import { Mail, Phone, MapPin, Instagram, Twitter, Facebook, Linkedin } from 'lucide-react';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative overflow-hidden pt-16 pb-12 bg-gradient-to-br from-gray-800 to-gray-900 text-white">
      {/* Background Accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"></div>
      
      {/* Animated Background Circles */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-blue-500 opacity-5 animate-pulse"></div>
      <div className="absolute bottom-10 right-20 w-80 h-80 rounded-full bg-purple-500 opacity-5 animate-pulse-slow"></div>
      
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & Info */}
          <div className="flex flex-col space-y-6">
            <div className="inline-flex items-center transition-transform duration-300 hover:scale-105">
              <Logo width="120px" />
            </div>
            <p className="text-gray-300 text-sm max-w-xs">
              We're dedicated to providing insightful content and a platform for
              community engagement.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          {/* Company Links */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-medium text-white mb-2 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-10 after:bg-blue-500">
              Company
            </h3>
            <ul className="space-y-3">
              {['About', 'Features', 'Pricing', 'Careers', 'Press Kit'].map((item) => (
                <li key={item} className="transform transition-transform duration-300 hover:translate-x-2">
                  <Link to="/" className="text-gray-300 hover:text-white text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Support Links */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-medium text-white mb-2 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-10 after:bg-blue-500">
              Support
            </h3>
            <ul className="space-y-3">
              {['Help Center', 'Community', 'Contact Us', 'Cookie Settings', 'FAQ'].map((item) => (
                <li key={item} className="transform transition-transform duration-300 hover:translate-x-2">
                  <Link to="/" className="text-gray-300 hover:text-white text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-medium text-white mb-2 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-10 after:bg-blue-500">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-300 hover:text-white transition-colors duration-300">
                <Mail size={16} className="mr-2" />
                <span className="text-sm">contact@example.com</span>
              </li>
              <li className="flex items-center text-gray-300 hover:text-white transition-colors duration-300">
                <Phone size={16} className="mr-2" />
                <span className="text-sm">+1 234 567 8900</span>
              </li>
              <li className="flex items-center text-gray-300 hover:text-white transition-colors duration-300">
                <MapPin size={16} className="mr-2" />
                <span className="text-sm">123 Street, City, Country</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-700 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-gray-400 mb-4 md:mb-0">
            &copy; {currentYear} Your Company. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/" className="text-sm text-gray-400 hover:text-white transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link to="/" className="text-sm text-gray-400 hover:text-white transition-colors duration-300">
              Terms of Service
            </Link>
            <Link to="/" className="text-sm text-gray-400 hover:text-white transition-colors duration-300">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
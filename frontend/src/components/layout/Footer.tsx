import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-textDark text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-2xl font-bold font-montserrat mb-4">URBAN EDGE</h2>
            <p className="text-gray-400 mb-6">
              Leading the way in premium land developments and verified property listings across Sri Lanka.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-cta transition-colors"><Facebook /></a>
              <a href="#" className="hover:text-cta transition-colors"><Instagram /></a>
              <a href="#" className="hover:text-cta transition-colors"><Twitter /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li><Link to="/properties" className="text-gray-400 hover:text-white transition-colors">Browse Lands</Link></li>
              <li><Link to="/projects" className="text-gray-400 hover:text-white transition-colors">Our Projects</Link></li>
              <li><Link to="/sell-land" className="text-gray-400 hover:text-white transition-colors">Sell Your Land</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin className="text-cta flex-shrink-0" size={20} />
                <span>123 Business Avenue, Colombo 03, Sri Lanka</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Phone className="text-cta flex-shrink-0" size={20} />
                <span>+94 11 234 5678</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Mail className="text-cta flex-shrink-0" size={20} />
                <span>info@urbanedge.lk</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Newsletter</h3>
            <p className="text-gray-400 mb-4 text-sm">Subscribe to get the latest property updates.</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="bg-gray-800 text-white px-4 py-2 rounded-l-lg focus:outline-none w-full"
              />
              <button className="bg-cta px-4 py-2 rounded-r-lg hover:bg-orange-600 transition-colors font-semibold">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-16 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Urban Edge (Pvt) Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

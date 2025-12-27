import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Phone, User as UserIcon, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, logout, openModal } = useAuth();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Properties', path: '/properties' },
    { name: 'Projects', path: '/projects' },
    { name: 'Sell Land', path: '/sell-land' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-primary font-montserrat">URBAN EDGE</span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-textDark hover:text-cta font-medium transition-colors"
              >
                {link.name}
              </Link>
            ))}
            
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                {user?.role === 'admin' && (
                  <Link 
                    to="/admin" 
                    className="flex items-center gap-1 text-primary hover:text-cta font-bold text-sm transition-colors border border-primary/20 px-3 py-1.5 rounded-lg"
                  >
                    <LayoutDashboard size={16} />
                    Admin
                  </Link>
                )}
                <div className="flex items-center gap-2">
                   {user.avatar ? (
                     <img src={user.avatar} alt="Avatar" className="w-8 h-8 rounded-full" />
                   ) : (
                     <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                       <UserIcon size={16} />
                     </div>
                   )}
                   <span className="font-bold text-sm text-primary truncate max-w-[100px]">{user.name || user.email}</span>
                </div>
                <button 
                  onClick={logout}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  title="Sign Out"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <button 
                onClick={openModal}
                className="text-primary font-bold hover:text-cta transition-colors flex items-center gap-2"
              >
                <UserIcon size={18} />
                Login
              </button>
            )}

            {(!user || user.role !== 'admin') && (
              <Link
                to="/contact"
                className="bg-cta text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center gap-2"
              >
                <Phone size={18} />
                Enquire Now
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            {!isAuthenticated && (
               <button onClick={openModal} className="text-primary font-bold">Login</button>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-textDark hover:text-primary focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="block px-3 py-2 text-textDark hover:text-cta font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {isAuthenticated && (
              <>
                {user?.role === 'admin' && (
                  <Link 
                    to="/admin" 
                    className="block px-3 py-2 text-primary font-bold flex items-center gap-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <LayoutDashboard size={18} />
                    Admin Dashboard
                  </Link>
                )}
                <button onClick={logout} className="block w-full text-left px-3 py-2 text-red-500 font-medium">
                  Sign Out ({user.name || user.email})
                </button>
              </>
            )}
            {(!user || user.role !== 'admin') && (
              <Link
                to="/contact"
                className="block px-3 py-2 bg-cta text-white rounded-md font-semibold text-center mt-4"
                onClick={() => setIsOpen(false)}
              >
                Enquire Now
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

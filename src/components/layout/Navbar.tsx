
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isAdmin, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false); // Close mobile menu on route change
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-tech-purple to-tech-light-purple text-transparent bg-clip-text">
              Let's Connect
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-tech-purple ${
                location.pathname === '/' ? 'text-tech-purple' : 'text-gray-600'
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`text-sm font-medium transition-colors hover:text-tech-purple ${
                location.pathname === '/about' ? 'text-tech-purple' : 'text-gray-600'
              }`}
            >
              About
            </Link>
            <Link
              to="/instructions"
              className={`text-sm font-medium transition-colors hover:text-tech-purple ${
                location.pathname === '/instructions' ? 'text-tech-purple' : 'text-gray-600'
              }`}
            >
              How to Use
            </Link>
            <Link
              to="/contact"
              className={`text-sm font-medium transition-colors hover:text-tech-purple ${
                location.pathname === '/contact' ? 'text-tech-purple' : 'text-gray-600'
              }`}
            >
              Contact
            </Link>
            {isAdmin && (
              <Link
                to="/admin"
                className={`text-sm font-medium transition-colors hover:text-tech-purple ${
                  location.pathname === '/admin' ? 'text-tech-purple' : 'text-gray-600'
                }`}
              >
                Admin
              </Link>
            )}
            {!user ? (
              <Link to="/auth">
                <Button size="sm" className="bg-tech-purple hover:bg-tech-dark-purple text-white">
                  Sign In
                </Button>
              </Link>
            ) : (
              <Button size="sm" variant="outline" onClick={signOut}>
                Sign Out
              </Button>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="space-y-2">
              <span className={`block w-8 h-0.5 bg-gray-600 transition-all duration-300 ${
                isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
              }`}></span>
              <span className={`block w-8 h-0.5 bg-gray-600 transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}></span>
              <span className={`block w-8 h-0.5 bg-gray-600 transition-all duration-300 ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
              }`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden absolute top-full left-0 right-0 bg-white shadow-md transition-all duration-300 ${
            isMobileMenuOpen ? 'max-h-96' : 'max-h-0'
          } overflow-hidden`}
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-tech-purple ${
                location.pathname === '/' ? 'text-tech-purple' : 'text-gray-600'
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`text-sm font-medium transition-colors hover:text-tech-purple ${
                location.pathname === '/about' ? 'text-tech-purple' : 'text-gray-600'
              }`}
            >
              About
            </Link>
            <Link
              to="/instructions"
              className={`text-sm font-medium transition-colors hover:text-tech-purple ${
                location.pathname === '/instructions' ? 'text-tech-purple' : 'text-gray-600'
              }`}
            >
              How to Use
            </Link>
            <Link
              to="/contact"
              className={`text-sm font-medium transition-colors hover:text-tech-purple ${
                location.pathname === '/contact' ? 'text-tech-purple' : 'text-gray-600'
              }`}
            >
              Contact
            </Link>
            {isAdmin && (
              <Link
                to="/admin"
                className={`text-sm font-medium transition-colors hover:text-tech-purple ${
                  location.pathname === '/admin' ? 'text-tech-purple' : 'text-gray-600'
                }`}
              >
                Admin
              </Link>
            )}
            {!user ? (
              <Link to="/auth" className="w-full">
                <Button size="sm" className="bg-tech-purple hover:bg-tech-dark-purple text-white w-full">
                  Sign In
                </Button>
              </Link>
            ) : (
              <Button size="sm" variant="outline" onClick={signOut} className="w-full">
                Sign Out
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

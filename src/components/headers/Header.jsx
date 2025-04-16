import React, { useState, useEffect } from 'react';
import { Container, Logo, LogoutBtn } from "../index";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Menu, X, Home, LogIn, UserPlus, FileText, PlusCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when navigating
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true,
      icon: <Home size={16} />
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
      icon: <LogIn size={16} />
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
      icon: <UserPlus size={16} />
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
      icon: <FileText size={16} />
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
      icon: <PlusCircle size={16} />
    },
  ];

  // Dynamic header styling based on scroll position
  const headerClasses = `
    fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out
    ${isScrolled 
      ? 'py-2 bg-gradient-to-r from-indigo-800 to-blue-700 shadow-lg' 
      : 'py-4 bg-gradient-to-r from-indigo-900/90 to-blue-800/90 backdrop-blur-md'}
  `;

  return (
    <motion.header 
      className={headerClasses}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <Container>
        <nav className='flex items-center justify-between'>
          <motion.div 
            className='flex items-center'
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Link to="/" className="flex items-center">
              <Logo width='70px' />
            </Link>
          </motion.div>
          
          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => 
              item.active ? (
                <motion.li key={item.name} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link 
                    to={item.slug}
                    className={`
                      px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center
                      ${location.pathname === item.slug 
                        ? 'bg-white text-blue-700 shadow-md' 
                        : 'text-white hover:bg-white/20'}
                    `}
                  >
                    <span className="mr-1.5">{item.icon}</span>
                    {item.name}
                  </Link>
                </motion.li>
              ) : null
            )}
            
            {authStatus && (
              <motion.li className="ml-2" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <LogoutBtn />
              </motion.li>
            )}
          </ul>
          
          {/* Mobile menu button */}
          <motion.button 
            className="md:hidden p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </nav>
        
        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              className="md:hidden mt-4 py-2 bg-white rounded-xl shadow-xl overflow-hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <ul className="flex flex-col">
                {navItems.map((item) => 
                  item.active ? (
                    <motion.li 
                      key={item.name} 
                      className="w-full"
                      whileTap={{ backgroundColor: "#EEF2FF" }}
                    >
                      <Link 
                        to={item.slug}
                        className={`
                          block w-full px-4 py-3 text-sm font-medium transition-colors flex items-center
                          ${location.pathname === item.slug 
                            ? 'bg-indigo-100 text-indigo-700 border-l-4 border-indigo-600' 
                            : 'text-gray-700 hover:bg-gray-50'}
                        `}
                      >
                        <span className={`mr-3 ${location.pathname === item.slug ? 'text-indigo-600' : 'text-gray-500'}`}>
                          {item.icon}
                        </span>
                        {item.name}
                      </Link>
                    </motion.li>
                  ) : null
                )}
                
                {authStatus && (
                  <li className="w-full px-4 py-2 border-t border-gray-100 mt-1">
                    <LogoutBtn />
                  </li>
                )}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </motion.header>
  );
}

export default Header;
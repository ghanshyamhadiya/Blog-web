import React, { useState, useEffect } from 'react';
import { Container, Logo } from "../index";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutBtn from './LogoutBtn';
import { 
  Menu, 
  X, 
  Home, 
  LogIn, 
  UserPlus, 
  FileText, 
  PlusCircle, 
  BookOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LoginModal from './LoginModel';
import SignupModal from './SignupModel';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signupModalOpen, setSignupModalOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
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
      icon: <Home size={16} />,
      action: () => navigate('/')
    },
    {
      name: "Login",
      slug: "#login",
      active: !authStatus,
      icon: <LogIn size={16} />,
      action: () => setLoginModalOpen(true)
    },
    {
      name: "Signup",
      slug: "#signup",
      active: !authStatus,
      icon: <UserPlus size={16} />,
      action: () => setSignupModalOpen(true)
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
      icon: <FileText size={16} />,
      action: () => navigate('/all-posts')
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
      icon: <PlusCircle size={16} />,
      action: () => navigate('/add-post')
    },
  ];

  // Enhanced animations for nav items
  const navItemAnimation = {
    hidden: { opacity: 0, y: -10 },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.6, 0.05, 0.01, 0.9] 
      }
    })
  };

  // Dynamic header styling based on scroll position
  const headerClasses = `
    fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-in-out 
    ${isScrolled 
      ? 'py-2 bg-white backdrop-blur-md shadow-lg border-b border-slate-100' 
      : 'py-4 bg-white/90 backdrop-blur-sm'}
  `;

  return (
    <>
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
              <Link to="/" className="flex items-center gap-2">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                </div>
                <span className="font-bold text-xl text-slate-800 hidden sm:block">Writly</span>
              </Link>
            </motion.div>
            
            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center space-x-2">
              {navItems.map((item, index) => 
                item.active ? (
                  <motion.li 
                    key={item.name} 
                    custom={index} 
                    initial="hidden" 
                    animate="visible"
                    variants={navItemAnimation}
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }}
                  >
                    <button 
                      onClick={item.action}
                      className={`
                        px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center
                        ${location.pathname === item.slug 
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-200' 
                          : 'text-slate-700 hover:bg-blue-50 hover:text-blue-600'}
                      `}
                    >
                      <span className="mr-1.5">{item.icon}</span>
                      {item.name}
                    </button>
                  </motion.li>
                ) : null
              )}
              
              {authStatus && (
                <motion.li 
                  className="ml-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <LogoutBtn />
                </motion.li>
              )}
            </ul>
            
            {/* Mobile menu button */}
            <motion.button 
              className="md:hidden p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors" 
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
                className="md:hidden mt-4 py-2 bg-white rounded-xl shadow-xl overflow-hidden border border-slate-100"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <ul className="flex flex-col">
                  {navItems.map((item, index) => 
                    item.active ? (
                      <motion.li 
                        key={item.name} 
                        className="w-full"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileTap={{ backgroundColor: "#EEF2FF" }}
                      >
                        <button 
                          onClick={item.action}
                          className={`
                            block w-full px-4 py-3 text-sm font-medium transition-colors flex items-center text-left
                            ${location.pathname === item.slug 
                              ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600' 
                              : 'text-slate-700 hover:bg-slate-50'}
                          `}
                        >
                          <span className={`mr-3 ${location.pathname === item.slug ? 'text-blue-600' : 'text-slate-500'}`}>
                            {item.icon}
                          </span>
                          {item.name}
                        </button>
                      </motion.li>
                    ) : null
                  )}
                  
                  {authStatus && (
                    <motion.li 
                      className="w-full px-4 py-2 border-t border-slate-100 mt-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <LogoutBtn />
                    </motion.li>
                  )}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </Container>
      </motion.header>

      {/* Auth Modals */}
      <AnimatePresence>
        {loginModalOpen && (
          <LoginModal 
            isOpen={loginModalOpen} 
            onClose={() => setLoginModalOpen(false)} 
            onSwitchToSignup={() => {
              setLoginModalOpen(false);
              setTimeout(() => setSignupModalOpen(true), 300);
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {signupModalOpen && (
          <SignupModal 
            isOpen={signupModalOpen} 
            onClose={() => setSignupModalOpen(false)} 
            onSwitchToLogin={() => {
              setSignupModalOpen(false);
              setTimeout(() => setLoginModalOpen(true), 300);
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;

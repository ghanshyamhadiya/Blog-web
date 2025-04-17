import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';
import { LogOut, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

function LogoutBtn() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const logoutHandler = () => {
    setIsLoading(true);
    authService.logout()
      .then(() => {
        dispatch(logout());
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      })
      .finally(() => {
        // In a real app we might not need the timeout, but adding it 
        // to make the loading state visible for better UX
        setTimeout(() => {
          setIsLoading(false);
        }, 600);
      });
  }

  return (
    <motion.button 
      onClick={logoutHandler}
      disabled={isLoading}
      className={`
        px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1.5 
        ${isLoading ? 
          'bg-red-100 text-red-400 cursor-not-allowed' : 
          'bg-red-500 text-white hover:bg-red-600 active:bg-red-700'}
        transition-all duration-300 shadow-sm hover:shadow
      `}
      whileHover={{ scale: isLoading ? 1 : 1.05 }}
      whileTap={{ scale: isLoading ? 1 : 0.95 }}
    >
      {isLoading ? (
        <>
          <Loader2 size={16} className="animate-spin" />
          <span>Logging out...</span>
        </>
      ) : (
        <>
          <LogOut size={16} />
          <span>Logout</span>
        </>
      )}
    </motion.button>
  )
}

export default LogoutBtn;

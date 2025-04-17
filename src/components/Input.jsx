import React, { useId, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Input = React.forwardRef(
  function Input({
    label,
    type = 'text',
    className = '',
    icon = null,
    rightIcon = null,
    error = null,
    ...props
  }, ref) {
    const id = useId();
    const [isFocused, setIsFocused] = useState(false);

    return (
      <div className="w-full mb-4">
        {label && (
          <motion.label 
            className={`inline-block mb-2 text-sm font-medium ${
              isFocused ? 'text-blue-600' : 'text-gray-700'
            }`} 
            htmlFor={id}
            initial={{ x: -5, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {label}
          </motion.label>
        )}
        <motion.div 
          className={`relative flex items-center rounded-lg overflow-hidden border-2 ${
            error ? 'border-red-400' : isFocused ? 'border-blue-500 shadow-md' : 'border-gray-200'
          }`}
          initial={{ y: 5, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          whileHover={{ boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" }}
        >
          {icon && (
            <motion.div 
              className="absolute left-3 text-gray-400 flex items-center justify-center"
              animate={{ 
                color: error ? "rgb(248, 113, 113)" : isFocused ? "rgb(59, 130, 246)" : "rgb(156, 163, 175)" 
              }}
              transition={{ duration: 0.3 }}
            >
              {icon}
            </motion.div>
          )}
          <input 
            type={type}
            className={`w-full py-3 bg-white text-gray-800 outline-none ${
              icon ? 'pl-10' : 'pl-4'
            } ${rightIcon ? 'pr-10' : 'pr-4'} ${className}`}
            ref={ref}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
            id={id}
          />
          {rightIcon && (
            <motion.div 
              className="absolute right-3 text-gray-400 h-full flex items-center justify-center"
              animate={{ 
                color: isFocused ? "rgb(107, 114, 128)" : "rgb(156, 163, 175)" 
              }}
              transition={{ duration: 0.3 }}
            >
              {rightIcon}
            </motion.div>
          )}
        </motion.div>
        <AnimatePresence>
          {error && (
            <motion.p 
              className="text-red-500 text-xs mt-1 ml-1"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

export default Input;

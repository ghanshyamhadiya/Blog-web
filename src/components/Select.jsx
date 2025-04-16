import React, { forwardRef, useId, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

function Select({
    options,
    label,
    className,
    ...props
}, ref) {
    const id = useId();
    const [isFocused, setIsFocused] = useState(false);
    
    return (
        <div className='w-full'>
            {label && (
                <motion.label 
                    htmlFor={id}
                    className={`inline-block mb-2 text-sm font-medium ${
                        isFocused ? 'text-blue-600' : 'text-gray-700'
                    }`}
                    initial={{ x: -5, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    {label}
                </motion.label>
            )}
            <motion.div 
                className="relative"
                initial={{ y: 5, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                whileHover={{ scale: 1.01 }}
            >
                <select 
                    id={id}
                    {...props}
                    className={`
                        appearance-none px-4 py-3 rounded-lg bg-white text-gray-800 outline-none
                        duration-200 border-2 w-full pr-10
                        ${isFocused ? 'border-blue-500 shadow-md' : 'border-gray-200'}
                        ${className ? className : ''}
                    `}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    ref={ref}
                >
                    {options?.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <ChevronDown size={20} className={`transition-colors duration-300 ${isFocused ? 'text-blue-500' : 'text-gray-400'}`} />
                </div>
            </motion.div>
        </div>
    );
}

export default forwardRef(Select);
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store/authSlice';
import { Input, Button, Logo } from "../index";
import { useForm } from 'react-hook-form';
import { Mail, User, Lock, AlertCircle, Eye, EyeOff, X } from 'lucide-react';
import { motion } from 'framer-motion';
import authService from '../../appwrite/auth';

function SignupModal({ isOpen, onClose, onSwitchToLogin }) {
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const create = async (data) => {
        setError("");
        setIsLoading(true);
        try {
            const userData = await authService.createAccount(data);
            if (userData) {
                const userData = await authService.getCurrentUser();
                if (userData) dispatch(login(userData));
                onClose();
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Backdrop click handler
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={handleBackdropClick}
        >
            <motion.div 
                className="w-full max-w-md"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="backdrop-blur-md bg-white/90 rounded-2xl shadow-xl p-8 border border-gray-100 relative">
                    <button 
                        onClick={onClose}
                        className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
                        aria-label="Close modal"
                    >
                        <X size={20} />
                    </button>
                    
                    <motion.div 
                        className="mb-6 flex justify-center"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="inline-block w-full max-w-[100px] transition-transform duration-500 hover:scale-110">
                            <Logo width="100%" />
                        </div>
                    </motion.div>
                    
                    <motion.h2 
                        className="text-center text-3xl font-bold tracking-tight text-gray-900"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        Create your account
                    </motion.h2>
                    
                    <motion.p 
                        className="mt-3 text-center text-sm text-gray-600 bg-gray-50 py-2 rounded-lg border border-gray-100"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        Already have an account?{' '}
                        <button
                            onClick={onSwitchToLogin}
                            className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-300 underline"
                        >
                            Sign in
                        </button>
                    </motion.p>
                    
                    {error && (
                        <motion.div 
                            className="mt-4 flex items-center p-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <AlertCircle size={18} className="mr-2 flex-shrink-0" />
                            <span>{error}</span>
                        </motion.div>
                    )}
                    
                    <motion.form 
                        className="mt-8 space-y-6" 
                        onSubmit={handleSubmit(create)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        <div className="space-y-4">
                            <Input
                                label="Full Name"
                                placeholder="Enter your full name"
                                icon={<User size={18} />}
                                error={errors.name?.message}
                                className="bg-white rounded-lg px-4 py-3 transition-all duration-300"
                                {...register("name", {
                                    required: "Full name is required",
                                })}
                            />
                            
                            <Input
                                label="Email Address"
                                placeholder="you@example.com"
                                type="email"
                                icon={<Mail size={18} />}
                                error={errors.email?.message}
                                className="bg-white rounded-lg px-4 py-3 transition-all duration-300"
                                {...register("email", {
                                    required: "Email is required",
                                    validate: {
                                        matchPattern: (value) => 
                                            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                            "Email address must be valid"
                                    }
                                })}
                            />
                            
                            <Input
                                label="Password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Create a secure password"
                                icon={<Lock size={18} />}
                                rightIcon={
                                    <button 
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="focus:outline-none"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                }
                                error={errors.password?.message}
                                className="bg-white rounded-lg px-4 py-3 transition-all duration-300"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters"
                                    }
                                })}
                            />
                        </div>
                        
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.7 }}
                        >
                            <Button 
                                type="submit" 
                                className="w-full group relative bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300"
                                isLoading={isLoading}
                            >
                                Create Account
                            </Button>
                        </motion.div>
                    </motion.form>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default SignupModal;

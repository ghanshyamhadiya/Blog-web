import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';
import { Input, Button, Logo } from "./index";
import { useDispatch } from 'react-redux';
import authService from '../appwrite/auth';
import { useForm } from 'react-hook-form';
import { Mail, User, Lock, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function Signup() {
    const navigate = useNavigate();
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
                navigate("/");
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

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-12 sm:px-6 lg:px-8">
            <motion.div 
                className="w-full max-w-md space-y-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <motion.div 
                    className="backdrop-blur-md bg-white/90 rounded-2xl shadow-xl p-8 border border-gray-100"
                    whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                    transition={{ duration: 0.3 }}
                >
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
                        <Link
                            to="/login"
                            className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-300 underline"
                        >
                            Sign in
                        </Link>
                    </motion.p>
                    
                    <AnimatePresence>
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
                    </AnimatePresence>
                    
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
                </motion.div>
            </motion.div>
        </div>
    );
}

export default Signup;

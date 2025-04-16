import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';
import { Input, Button, Logo } from "./index";
import { useDispatch } from 'react-redux';
import authService from '../appwrite/auth';
import { useForm } from 'react-hook-form';
import { Mail, User, Lock, AlertCircle } from 'lucide-react';

function Signup() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
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

    return (
        <div className="flex min-h-[80vh] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8 animate-fadeIn">
                <div className="backdrop-blur-md bg-white/90 rounded-2xl shadow-xl p-8 border border-gray-100">
                    <div className="mb-6 flex justify-center">
                        <div className="inline-block w-full max-w-[100px] transition-transform duration-500 hover:scale-110">
                            <Logo width="100%" />
                        </div>
                    </div>
                    
                    <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
                        Create your account
                    </h2>
                    
                    <p className="mt-3 text-center text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link
                            to="/login"
                            className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-300"
                        >
                            Sign in
                        </Link>
                    </p>
                    
                    {error && (
                        <div className="mt-4 flex items-center p-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 animate-shake">
                            <AlertCircle size={18} className="mr-2 flex-shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}
                    
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit(create)}>
                        <div className="space-y-1">
                            <Input
                                label="Full Name"
                                placeholder="Enter your full name"
                                icon={<User size={18} />}
                                {...register("name", {
                                    required: "Full name is required",
                                })}
                            />
                            {errors.name && (
                                <p className="text-red-500 text-xs ml-1">{errors.name.message}</p>
                            )}
                            
                            <Input
                                label="Email Address"
                                placeholder="you@example.com"
                                type="email"
                                icon={<Mail size={18} />}
                                {...register("email", {
                                    required: "Email is required",
                                    validate: {
                                        matchPattern: (value) => 
                                            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                            "Email address must be valid"
                                    }
                                })}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-xs ml-1">{errors.email.message}</p>
                            )}
                            
                            <Input
                                label="Password"
                                type="password"
                                placeholder="Create a secure password"
                                icon={<Lock size={18} />}
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters"
                                    }
                                })}
                            />
                            {errors.password && (
                                <p className="text-red-500 text-xs ml-1">{errors.password.message}</p>
                            )}
                        </div>
                        
                        <div>
                            <Button 
                                type="submit" 
                                className="w-full group relative"
                                isLoading={isLoading}
                            >
                                Create Account
                            </Button>
                        </div>
                         
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;
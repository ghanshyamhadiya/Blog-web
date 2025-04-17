import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as authLogin } from '../store/authSlice';
import { Input, Button, Logo } from "./index";
import { useDispatch } from 'react-redux';
import authService from '../appwrite/auth';
import { useForm } from 'react-hook-form';
import { Mail, Lock, AlertCircle, Eye, EyeOff } from 'lucide-react';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const login = async (data) => {
        setError("");
        setIsLoading(true);
        try {
            const session = await authService.login(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) dispatch(authLogin(userData));
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
            <div className="w-full max-w-md space-y-8 animate-fadeIn">
                <div className="backdrop-blur-md bg-white/90 rounded-2xl shadow-xl p-8 border border-gray-100">
                    <div className="mb-6 flex justify-center">
                        <div className="inline-block w-full max-w-[100px] transition-transform duration-500 hover:scale-110">
                            <Logo width="100%" />
                        </div>
                    </div>
                    
                    <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
                        Welcome back
                    </h2>
                    
                    <p className="mt-3 text-center text-sm text-gray-600 bg-gray-50 py-2 rounded-lg border border-gray-100">
                        Don't have an account?{' '}
                        <Link
                            to="/signup"
                            className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-300 underline"
                        >
                            Sign up
                        </Link>
                    </p>
                    
                    {error && (
                        <div className="mt-4 flex items-center p-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 animate-shake">
                            <AlertCircle size={18} className="mr-2 flex-shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}
                    
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit(login)}>
                        <div className="space-y-4">
                            <div>
                                <Input
                                    label="Email Address"
                                    placeholder="you@example.com"
                                    type="email"
                                    icon={<Mail size={18} className="text-gray-500" />}
                                    className="bg-white border-2 border-gray-200 focus:border-blue-500 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
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
                                    <p className="text-red-500 text-xs ml-1 mt-1">{errors.email.message}</p>
                                )}
                            </div>
                            
                            <div className="relative">
                                <Input
                                    label="Password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    icon={<Lock size={18} className="text-gray-500" />}
                                    className="bg-white border-2 border-gray-200 focus:border-blue-500 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                                    {...register("password", {
                                        required: "Password is required"
                                    })}
                                />
                                <button 
                                    type="button"
                                    className="absolute right-3 top-9 text-gray-500 hover:text-gray-700 focus:outline-none"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? 
                                        <EyeOff size={18} className="text-gray-500" /> : 
                                        <Eye size={18} className="text-gray-500" />
                                    }
                                </button>
                                {errors.password && (
                                    <p className="text-red-500 text-xs ml-1 mt-1">{errors.password.message}</p>
                                )}
                            </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                    Remember me
                                </label>
                            </div>
                            
                            <div className="text-sm">
                                <Link to="#" className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-300">
                                    Forgot password?
                                </Link>
                            </div>
                        </div>
                        
                        <div>
                            <Button 
                                type="submit" 
                                className="w-full group relative bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300"
                                isLoading={isLoading}
                            >
                                Sign in
                            </Button>
                        </div>
                         
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as authLogin } from '../store/authSlice';
import { Input, Button, Logo } from "./index";
import { useDispatch } from 'react-redux';
import authService from '../appwrite/auth';
import { useForm } from 'react-hook-form';
import { Mail, Lock, AlertCircle } from 'lucide-react';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

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
                        Welcome back
                    </h2>
                    
                    <p className="mt-3 text-center text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link
                            to="/signup"
                            className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-300"
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
                        <div className="space-y-1">
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
                                placeholder="Enter your password"
                                icon={<Lock size={18} />}
                                {...register("password", {
                                    required: "Password is required"
                                })}
                            />
                            {errors.password && (
                                <p className="text-red-500 text-xs ml-1">{errors.password.message}</p>
                            )}
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
                                className="w-full group relative"
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
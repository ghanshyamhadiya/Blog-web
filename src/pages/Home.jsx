import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  ArrowRight, 
  Clock, 
  Star, 
  TrendingUp, 
  ChevronDown, 
  MousePointer
} from 'lucide-react';
import { useSelector } from 'react-redux';
function Home() {
    const [loading, setLoading] = useState(true);
    
      const authStatus = useSelector((state) => state.auth.status);
    const [activeSection, setActiveSection] = useState('hero');
    const [featuredTopics, setFeaturedTopics] = useState([
        { id: 1, name: 'Technology', count: 24, icon: '💻' },
        { id: 2, name: 'Lifestyle', count: 18, icon: '🌿' },
        { id: 3, name: 'Travel', count: 15, icon: '✈️' },
        { id: 4, name: 'Food', count: 12, icon: '🍽️' }
    ]);

    useEffect(() => {
        // Simulate loading
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1200);
        
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const sections = ['hero', 'topics', 'cta', 'stats'];
            const scrollPosition = window.scrollY + 100;

            sections.forEach(section => {
                const element = document.getElementById(section);
                if (element) {
                    const offsetTop = element.offsetTop;
                    const height = element.offsetHeight;
                    
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
                        setActiveSection(section);
                    }
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Animation variants
    const staggerContainer = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const fadeInUp = {
        hidden: { y: 30, opacity: 0 },
        show: { 
            y: 0, 
            opacity: 1,
            transition: {
                type: "spring",
                damping: 25,
                stiffness: 100
            }
        }
    };

    // Loading state
    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gradient-to-b from-slate-50 to-white">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                >
                    <motion.div 
                        className="relative w-16 h-16 mx-auto mb-4"
                        animate={{ 
                            rotate: [0, 0, 180, 180, 0],
                            scale: [1, 1.2, 1.2, 1, 1],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 0.5
                        }}
                    >
                        <BookOpen size={64} className="text-blue-500" />
                    </motion.div>
                    <p className="text-slate-600 font-medium">Loading your reading experience...</p>
                </motion.div>
            </div>
        );
    }

    return (
        <motion.div 
            className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            {/* Scroll Indicator */}
            <div className="fixed bottom-6 right-6 z-30 hidden lg:block">
                <motion.div 
                    className="flex flex-col items-center space-y-3 bg-white/80 backdrop-blur-sm px-3 py-4 rounded-full shadow-lg"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1, duration: 0.3 }}
                >
                    <div className="h-20 w-px bg-gradient-to-b from-slate-300 to-blue-500"></div>
                    <motion.div 
                        className="w-2 h-2 rounded-full bg-blue-500"
                        animate={{ 
                            y: [0, 40, 0],
                        }}
                        transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            repeatType: "loop"
                        }}
                    />
                </motion.div>
            </div>
            
            {/* Hero Section */}
            <section id="hero" className="pt-20 pb-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto relative">
                    {/* Floating Elements Animation */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <motion.div 
                            className="absolute top-10 left-0 w-20 h-20 bg-blue-500/5 rounded-full"
                            animate={{
                                y: [0, 15, 0],
                                x: [0, 10, 0],
                                scale: [1, 1.1, 1],
                            }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                repeatType: "reverse"
                            }}
                        />
                        <motion.div 
                            className="absolute bottom-10 right-10 w-32 h-32 bg-indigo-500/5 rounded-full"
                            animate={{
                                y: [0, -20, 0],
                                x: [0, -15, 0],
                                scale: [1, 1.2, 1],
                            }}
                            transition={{
                                duration: 7,
                                repeat: Infinity,
                                repeatType: "reverse"
                            }}
                        />
                    </div>

                    <motion.div 
                        className="text-center relative z-10"
                        variants={staggerContainer}
                        initial="hidden"
                        animate="show"
                    >
                        <motion.div 
                            className="inline-block mb-6"
                            variants={fadeInUp}
                            whileHover={{ rotate: [0, -10, 10, -5, 0], transition: { duration: 0.5 } }}
                        >
                            <div className="p-3 bg-blue-100 rounded-2xl">
                                <BookOpen size={40} className="text-blue-600" />
                            </div>
                        </motion.div>
                        
                        <motion.h1 
                            className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-800 mb-6"
                            variants={fadeInUp}
                        >
                            Stories that <span className="text-blue-600">inspire</span> and <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">inform</span>
                        </motion.h1>
                        
                        <motion.p 
                            className="text-lg sm:text-xl text-slate-600 mb-10 max-w-2xl mx-auto"
                            variants={fadeInUp}
                        >
                            Discover thought-provoking articles crafted by passionate writers from around the world.
                        </motion.p>
                        
                        <motion.div 
                            className="flex flex-col sm:flex-row gap-4 justify-center"
                            variants={fadeInUp}
                        >
                            <Link to={authStatus ? "/all-posts" : "/login"}>
                                <motion.button
                                    className="px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 text-white rounded-xl font-medium inline-flex items-center justify-center w-full sm:w-auto shadow-lg shadow-blue-200/50"
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                >
                                    Browse All Posts
                                    <ArrowRight size={18} className="ml-2" />
                                </motion.button>
                            </Link>
                            
                            <Link to="#">
                                <motion.button
                                    className="px-6 sm:px-8 py-3 sm:py-4 bg-white border border-slate-200 text-slate-700 rounded-xl font-medium inline-flex items-center justify-center w-full sm:w-auto shadow-md"
                                    whileHover={{ scale: 1.03, backgroundColor: "#f8fafc" }}
                                    whileTap={{ scale: 0.97 }}
                                >
                                    Explore Categories
                                </motion.button>
                            </Link>
                        </motion.div>

                        <motion.div
                            className="mt-12 hidden sm:flex justify-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1, duration: 0.6 }}
                        >
                            <motion.a
                                href="#topics"
                                className="flex flex-col items-center text-slate-400 hover:text-blue-500 transition-colors"
                                animate={{ y: [0, 6, 0] }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    repeatType: "loop"
                                }}
                            >
                                <span className="text-sm mb-1">Scroll to explore</span>
                                <ChevronDown size={20} />
                            </motion.a>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
            
            {/* Featured Categories Section */}
            <section id="topics" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mb-4">
                                <MousePointer className="h-6 w-6 text-blue-600" />
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-4">Featured Topics</h2>
                            <p className="text-slate-600 max-w-2xl mx-auto">Explore our most popular categories and find content that matches your interests</p>
                        </div>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                            {featuredTopics.map((topic, index) => (
                                <motion.div
                                    key={topic.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="flex justify-center items-stretch h-full"
                                >
                                    <Link to={`/category/${topic.name.toLowerCase()}`} className="w-full">
                                        <motion.div 
                                            className="bg-slate-50 p-4 sm:p-6 rounded-2xl border border-slate-100 h-full cursor-pointer flex flex-col"
                                            whileHover={{ 
                                                y: -5,
                                                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                                            }}
                                        >
                                            <div className="text-3xl sm:text-4xl mb-2 sm:mb-4">{topic.icon}</div>
                                            <h3 className="text-base sm:text-xl font-semibold text-slate-800 mb-2">{topic.name}</h3>
                                            <div className="mt-auto flex items-center text-blue-600 font-medium text-sm sm:text-base">
                                                <span>Explore</span>
                                                <ArrowRight size={16} className="ml-1" />
                                            </div>
                                        </motion.div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>
            
            {/* Newsletter & CTA Section */}
            <section id="cta" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <motion.div 
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-6 sm:p-8 md:p-12 text-white text-center overflow-hidden relative"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        {/* Background animations */}
                        <motion.div
                            className="absolute -top-24 -right-24 w-64 h-64 bg-white opacity-10 rounded-full"
                            animate={{
                                scale: [1, 1.1, 1],
                                opacity: [0.1, 0.15, 0.1],
                            }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                repeatType: "reverse"
                            }}
                        />

                        <motion.div
                            className="absolute -bottom-16 -left-16 w-48 h-48 bg-white opacity-10 rounded-full"
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.05, 0.1, 0.05],
                            }}
                            transition={{
                                duration: 6,
                                repeat: Infinity,
                                repeatType: "reverse",
                                delay: 1
                            }}
                        />
                        
                        <div className="relative z-10">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Ready to dive deeper?</h2>
                            <p className="text-base sm:text-lg text-blue-100 mb-6 sm:mb-8 max-w-xl mx-auto">
                                Explore our full collection of articles and join the conversation with fellow readers and writers.
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link to="/all-posts">
                                    <motion.button
                                        className="px-6 py-3 bg-white text-blue-600 rounded-xl font-medium inline-flex items-center justify-center w-full sm:w-auto"
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                    >
                                        View All Posts
                                        <ArrowRight size={18} className="ml-2" />
                                    </motion.button>
                                </Link>
                                
                                <Link to="/create-post">
                                    <motion.button
                                        className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-xl font-medium inline-flex items-center justify-center w-full sm:w-auto"
                                        whileHover={{ scale: 1.03, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                                        whileTap={{ scale: 0.97 }}
                                    >
                                        Write Your Story
                                    </motion.button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
            
            {/* Stats Section */}
            <section id="stats" className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6, staggerChildren: 0.1 }}
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        <motion.div 
                            className="bg-white p-6 rounded-2xl shadow-sm text-center"
                            initial={{ y: 30, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -4, transition: { duration: 0.2 } }}
                        >
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mb-4">
                                <Clock className="h-6 w-6 text-blue-600" />
                            </div>
                            <h3 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-2">5+</h3>
                            <p className="text-slate-600">Minutes average read time</p>
                        </motion.div>
                        
                        <motion.div 
                            className="bg-white p-6 rounded-2xl shadow-sm text-center"
                            initial={{ y: 30, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -4, transition: { duration: 0.2 } }}
                        >
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mb-4">
                                <Star className="h-6 w-6 text-blue-600" />
                            </div>
                            <h3 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-2">100+</h3>
                            <p className="text-slate-600">Quality articles and growing</p>
                        </motion.div>
                        
                        <motion.div 
                            className="bg-white p-6 rounded-2xl shadow-sm text-center"
                            initial={{ y: 30, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -4, transition: { duration: 0.2 } }}
                        >
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mb-4">
                                <TrendingUp className="h-6 w-6 text-blue-600" />
                            </div>
                            <h3 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-2">12</h3>
                            <p className="text-slate-600">Different categories to explore</p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

        </motion.div>
    );
}

export default Home;

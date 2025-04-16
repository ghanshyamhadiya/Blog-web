import React, { useEffect, useState } from 'react';
import { Container, PostCard } from '../components';
import appWriteService from '../appwrite/config';
import { motion } from 'framer-motion';
import { BookOpen, RefreshCw } from 'lucide-react';

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        appWriteService.getPost([])
            .then((posts) => {
                if (posts) {
                    setPosts(posts.documents);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const headerVariants = {
        hidden: { y: -20, opacity: 0 },
        visible: { 
            y: 0, 
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 20
            }
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-50">
                <motion.div
                    animate={{ 
                        rotate: 360,
                        transition: { 
                            duration: 1.5, 
                            repeat: Infinity, 
                            ease: "linear" 
                        }
                    }}
                    className="text-blue-500"
                >
                    <RefreshCw size={40} />
                </motion.div>
            </div>
        );
    }

    if (posts.length > 0) {
        return (
            <motion.div 
                className='w-full py-8 bg-gray-50 min-h-screen'
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <Container>
                    <motion.div 
                        className="mb-10 text-center md:text-left"
                        variants={headerVariants}
                    >
                        <div className="flex items-center justify-center md:justify-start">
                            <BookOpen className="h-8 w-8 text-blue-600 mr-2" />
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Latest Posts</h1>
                        </div>
                        <div className="h-1 w-20 bg-blue-500 mt-2 mx-auto md:mx-0 rounded-full"></div>
                        <p className="text-gray-600 mt-3 max-w-2xl mx-auto md:mx-0">
                            Discover our collection of thought-provoking articles and stories.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.map((post, index) => (
                            <motion.div
                                key={post.$id}
                                variants={{
                                    hidden: { y: 50, opacity: 0 },
                                    visible: { 
                                        y: 0, 
                                        opacity: 1,
                                        transition: { 
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 24,
                                            delay: index * 0.1
                                        }
                                    }
                                }}
                                className="h-full"
                            >
                                <PostCard {...post} />
                            </motion.div>
                        ))}
                    </div>
                </Container>
            </motion.div>
        );
    } else {
        return (
            <motion.div 
                className='w-full py-20 bg-gray-50 min-h-screen flex items-center justify-center'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <Container>
                    <motion.div 
                        className="text-center bg-white p-10 rounded-xl shadow-lg"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ 
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                            delay: 0.2
                        }}
                    >
                        <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-blue-100 rounded-full">
                            <BookOpen className="h-8 w-8 text-blue-600" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">No posts available</h2>
                        <p className="text-gray-600 max-w-md mx-auto">
                            There are currently no posts to display. Check back later for new content or be the first to create a post!
                        </p>
                        <motion.button
                            className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium inline-flex items-center"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        >
                            <RefreshCw size={16} className="mr-2" />
                            Refresh Page
                        </motion.button>
                    </motion.div>
                </Container>
            </motion.div>
        );
    }
}

export default Home;
import React, { useEffect, useState } from 'react';
import { Container, PostForm } from '../components';
import appWriteService from '../appwrite/config';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Edit } from 'lucide-react';

function EditPost() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        appWriteService.getPost([slug])
            .then((post) => {
                if (post) {
                    setPost(post);
                } else {
                    navigate('/');
                }
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                navigate('/');
            });
    }, [slug, navigate]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <motion.div
                    animate={{
                        rotate: [0, 360],
                    }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
                />
            </div>
        );
    }

    return post ? (
        <motion.div 
            className="py-8 bg-gray-50 min-h-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Container>
                <motion.div
                    className="mb-8"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                >
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold text-gray-800 flex items-center">
                            <Edit className="mr-2 text-blue-500" /> Edit Post
                        </h1>
                    </div>
                    <div className="h-1 w-20 bg-blue-500 mt-2 rounded-full"></div>
                </motion.div>
                <PostForm post={post} />
            </Container>
        </motion.div>
    ) : null;
}

export default EditPost;
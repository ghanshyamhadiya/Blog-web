import React from 'react';
import { Container, PostForm } from '../components';
import { motion } from 'framer-motion';
import { PlusCircle } from 'lucide-react';

function AddPost() {
  return (
    <motion.div 
      className='py-8 bg-gray-50 min-h-screen'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Container>
        <motion.div
          className="mb-8 pt-24 pb-8 text-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center">
              <PlusCircle className="mr-2 text-blue-500" /> Create New Post
            </h1>
          </div>
          <div className="h-1 w-20 bg-blue-500 mt-2 rounded-full"></div>
        </motion.div>
        <PostForm />
      </Container>
    </motion.div>
  );
}

export default AddPost;

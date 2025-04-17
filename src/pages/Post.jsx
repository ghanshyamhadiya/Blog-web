import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { ArrowLeft, Edit, Trash2, Heart, MessageSquare, Share2, Bookmark, Calendar, Clock, X, AlertTriangle } from "lucide-react";

// DeleteModal Component
const DeleteModal = ({ isOpen, onClose, onConfirm, postTitle }) => {
  const [animateIn, setAnimateIn] = useState(false);
  
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setAnimateIn(true), 10);
    } else {
      setAnimateIn(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop/Overlay */}
      <div 
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${animateIn ? 'opacity-50' : 'opacity-0'}`} 
        onClick={onClose}
      />
      
      {/* Modal */}
      <div 
        className={`bg-white rounded-lg shadow-xl max-w-md w-full mx-4 transition-all duration-300 transform 
        ${animateIn ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center text-red-600">
            <AlertTriangle size={20} className="mr-2" />
            <h3 className="text-lg font-medium">Delete Post</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <p className="text-gray-700">
            Are you sure you want to delete <span className="font-semibold">"{postTitle}"</span>? 
            This action cannot be undone.
          </p>
        </div>
        
        {/* Footer */}
        <div className="flex justify-end gap-3 p-4 bg-gray-50 rounded-b-lg">
          <Button 
            bgColor="bg-gray-200" 
            textColor="text-gray-700"
            className="hover:bg-gray-300 transition-colors"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button 
            bgColor="bg-red-600" 
            textColor="text-white"
            className="hover:bg-red-700 transition-colors flex items-center gap-1"
            onClick={onConfirm}
          >
            <Trash2 size={16} />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default function Post() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [liked, setLiked] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const { slug } = useParams();
    const navigate = useNavigate();
    const contentRef = useRef(null);

    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    // Calculate reading time
    const calculateReadingTime = (content) => {
        if (!content) return "1 min read";
        const text = content.replace(/<[^>]*>/g, '');
        const words = text.split(/\s+/).length;
        const time = Math.ceil(words / 200); // Average reading speed: 200 words per minute
        return `${time} min read`;
    };

    // Format date
    const formatDate = (dateString) => {
        if (!dateString) return "";
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    useEffect(() => {
        if (slug) {
            setLoading(true);
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPost(post);
                    // Scroll to top when post loads
                    window.scrollTo(0, 0);
                } else navigate("/");
                setLoading(false);
            });
        } else navigate("/");
    }, [slug, navigate]);

    // Animation on scroll for content sections
    useEffect(() => {
        if (!loading && post) {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('animate-fadeIn');
                            observer.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.1 }
            );

            if (contentRef.current) {
                const elements = contentRef.current.querySelectorAll('p, h1, h2, h3, h4, h5, h6, img, blockquote');
                elements.forEach(el => {
                    el.classList.add('opacity-0');
                    observer.observe(el);
                });
            }

            return () => observer.disconnect();
        }
    }, [loading, post]);

    const openDeleteModal = () => {
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };

    const confirmDelete = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/all-posts");
            }
        });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return post ? (
        <div className="py-10 bg-gray-50 min-h-screen">
            <Container>
                <div className="max-w-4xl mx-auto">
                    {/* Back button */}
                    <Link 
                        to="/all-posts" 
                        className="inline-flex items-center mb-6 text-gray-600 hover:text-blue-600 transition-colors duration-300 group"
                    >
                        <ArrowLeft size={20} className="mr-2 group-hover:transform group-hover:-translate-x-1 transition-transform duration-300" />
                        Back to all posts
                    </Link>
                    
                    {/* Post header */}
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-800 animate-fadeDown">
                        {post.title}
                    </h1>
                    
                    {/* Post meta */}
                    <div className="flex flex-wrap gap-4 items-center mb-8 text-gray-500 animate-fadeIn">
                        {post.$createdAt && (
                            <div className="flex items-center">
                                <Calendar size={16} className="mr-1" />
                                <span>{formatDate(post.$createdAt)}</span>
                            </div>
                        )}
                        <div className="flex items-center">
                            <Clock size={16} className="mr-1" />
                            <span>{calculateReadingTime(post.content)}</span>
                        </div>
                        {post.authorName && (
                            <div className="flex items-center">
                                <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white mr-1">
                                    {post.authorName.charAt(0).toUpperCase()}
                                </div>
                                <span>{post.authorName}</span>
                            </div>
                        )}
                    </div>
                    
                    {/* Featured image */}
                    <div className="relative rounded-2xl overflow-hidden mb-10 shadow-xl animate-fadeIn">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="w-full object-cover"
                            style={{ maxHeight: '500px', width: '100%' }}
                        />
                        
                        {/* Author controls */}
                        {isAuthor && (
                            <div className="absolute right-4 bottom-4 flex gap-2 animate-fadeUp">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button 
                                        bgColor="bg-white" 
                                        textColor="text-gray-800"
                                        className="flex items-center gap-1 shadow-lg hover:bg-gray-100 transition-colors duration-300"
                                    >
                                        <Edit size={16} />
                                        Edit
                                    </Button>
                                </Link>
                                <Button 
                                    bgColor="bg-white" 
                                    textColor="text-red-600"
                                    className="flex items-center gap-1 shadow-lg hover:bg-gray-100 transition-colors duration-300"
                                    onClick={openDeleteModal}
                                >
                                    <Trash2 size={16} />
                                    Delete
                                </Button>
                            </div>
                        )}
                    </div>
                    
                    {/* Post content */}
                    <div 
                        ref={contentRef}
                        className="prose prose-lg max-w-none mb-10 transition-opacity duration-500"
                    >
                        {parse(post.content || '')}
                    </div>
                     
                    
                    {/* Related posts placeholder */}
                    <div className="mt-12 py-10 border-t border-gray-200 animate-fadeIn">
                        <h3 className="text-2xl font-bold mb-6 text-gray-800">Related Posts</h3>
                        <p className="text-gray-500">More posts coming soon...</p>
                    </div>
                </div>
            </Container>

            <DeleteModal 
                isOpen={isDeleteModalOpen}
                onClose={closeDeleteModal}
                onConfirm={confirmDelete}
                postTitle={post?.title || "this post"}
            />
        </div>
    ) : null;
}

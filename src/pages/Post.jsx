import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { ArrowLeft, Edit, Trash2, Heart, MessageSquare, Share2, Bookmark, Calendar, Clock } from "lucide-react";

export default function Post() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [liked, setLiked] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);
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

    const deletePost = () => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            appwriteService.deletePost(post.$id).then((status) => {
                if (status) {
                    appwriteService.deleteFile(post.featuredImage);
                    navigate("/");
                }
            });
        }
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
                                    onClick={deletePost}
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
        </div>
    ) : null;
}
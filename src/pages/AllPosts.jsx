import React, { useEffect, useState } from 'react';
import { Container, PostCard } from '../components';
import appWriteService from '../appwrite/config';
import { Search, Filter, RefreshCw } from 'lucide-react';

function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredPosts, setFilteredPosts] = useState([]);
    
    useEffect(() => {
        fetchPosts();
    }, []);
    
    useEffect(() => {
        if (posts.length > 0) {
            const filtered = posts.filter(post => 
                post.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredPosts(filtered);
        }
    }, [searchQuery, posts]);
    
    const fetchPosts = () => {
        setLoading(true);
        appWriteService.getPost([])
            .then((posts) => {
                if (posts) {
                    setPosts(posts.documents);
                    setFilteredPosts(posts.documents);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    };

    return (
        <div className="py-12 bg-gray-50 min-h-screen">
            <Container>
                <div className="mb-10 text-center">
                    <h1 className="text-4xl font-bold mb-4 text-gray-800 animate-fadeDown">
                        All Posts
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto animate-fadeIn">
                        Discover the latest articles, tutorials, and insights from our community of writers.
                    </p>
                </div>
                
                <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between animate-fadeIn">
                    <div className="relative w-full sm:w-64 md:w-80">
                        <input
                            type="text"
                            placeholder="Search posts..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                        />
                        <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                    
                    <div className="flex gap-2">
                        <button 
                            onClick={fetchPosts}
                            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-300"
                        >
                            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
                            <span className="hidden sm:inline">Refresh</span>
                        </button>
                    </div>
                </div>
                
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : filteredPosts.length === 0 ? (
                    <div className="text-center py-20 animate-fadeIn">
                        <h3 className="text-xl text-gray-600">No posts found</h3>
                        <p className="text-gray-500 mt-2">Try adjusting your search or check back later for new content.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredPosts.map((post, index) => (
                            <div 
                                className="animate-fadeUp" 
                                style={{ animationDelay: `${index * 0.1}s` }}
                                key={post.$id}
                            >
                                <PostCard 
                                    $id={post.$id} 
                                    title={post.title} 
                                    featuredImage={post.featuredImage}
                                    content={post.content}
                                    author={post.authorName || 'Anonymous'}
                                    date={post.$createdAt}
                                />
                            </div>
                        ))}
                    </div>
                )}
                
                {filteredPosts.length > 9 && (
                    <div className="mt-12 flex justify-center animate-fadeIn">
                        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105">
                            Load More Posts
                        </button>
                    </div>
                )}
            </Container>
        </div>
    );
}

export default AllPosts;
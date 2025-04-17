import React, { useState } from 'react';
import appwriteService from "../appwrite/config";
import { Link } from 'react-router-dom';
import { Calendar, User, Heart } from 'lucide-react';

function PostCard({ $id, title, featuredImage, content, author, date }) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Create a truncated version of content for preview
  const truncateContent = (content) => {
    // If content exists and contains HTML, create a plain text version
    if (content) {
      // Remove HTML tags for excerpt
      const stripHtml = content.replace(/<[^>]*>?/gm, '');
      return stripHtml.length > 100 ? `${stripHtml.substring(0, 100)}...` : stripHtml;
    }
    return '';
  };

  return (
    <Link to={`/post/${$id}`} className="block h-full">
      <div 
        className={`
          h-full flex flex-col bg-white rounded-xl overflow-hidden
          transition-all duration-500 ease-in-out transform
          ${isHovered ? 'shadow-xl translate-y-[-8px]' : 'shadow-md'}
          hover:shadow-xl
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
          <img 
            loading='lazy'
            src={appwriteService.getFilePreview(featuredImage)} 
            alt={title}
            className={`
              w-full h-full object-cover transition-transform duration-700 ease-out
              ${isHovered ? 'scale-110' : 'scale-100'}
            `}
          />
          <div className={`
            absolute inset-0 bg-gradient-to-t from-black/60 to-transparent
            transition-opacity duration-300
            ${isHovered ? 'opacity-70' : 'opacity-50'}
          `}></div>
        </div>
        
        <div className="p-5 flex-1 flex flex-col">
          <h2 className={`
            text-xl font-bold text-gray-800 mb-2
            transition-colors duration-300
            ${isHovered ? 'text-blue-600' : ''}
          `}>
            {title}
          </h2>
          
          {content && (
            <p className="text-gray-600 text-sm mb-4 flex-1">
              {truncateContent(content)}
            </p>
          )}
          
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
            {author && (
              <div className="flex items-center text-gray-500 text-xs">
                <User size={14} className="mr-1" />
                <span>{author}</span>
              </div>
            )}
            
            {date && (
              <div className="flex items-center text-gray-500 text-xs">
                <Calendar size={14} className="mr-1" />
                <span>{new Date(date).toLocaleDateString()}</span>
              </div>
            )} 
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;

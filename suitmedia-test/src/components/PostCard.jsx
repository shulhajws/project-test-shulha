import React, { useState } from 'react';

const PostCard = ({ post }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long', 
      year: 'numeric',
    }).toUpperCase();
  };
  
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md h-full flex flex-col">
      <div className="relative pt-[56.25%]"> 
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
            <span className="text-gray-400">Loading...</span>
          </div>
        )}
        <img 
          src={post.medium_image.url} 
          alt={post.title}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
        />
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <span className="text-gray-500 text-sm">{formatDate(post.published_at)}</span>
        <h3 className="font-medium text-gray-800 mt-2 line-clamp-3 h-[4.5rem]">{post.title}</h3>
      </div>
    </div>
  );
};

export default PostCard;
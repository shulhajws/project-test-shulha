import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PostCard from './PostCard';
import Pagination from './Pagination';
import api from '../services/api';

const PostsList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [meta, setMeta] = useState({
    current_page: 1,
    from: 1,
    last_page: 1,
    per_page: 10,
    to: 10,
    total: 0,
  });
  
  const page = parseInt(queryParams.get('page') || '1', 10);
  const pageSize = parseInt(queryParams.get('size') || '10', 10);
  const sortOrder = queryParams.get('sort') || '-published_at'; 
  
  const updateUrlParams = useCallback((newParams) => {
    const params = new URLSearchParams(location.search);
    
    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    
    navigate({
      pathname: location.pathname,
      search: params.toString()
    }, { replace: true });
  }, [location.search, navigate]);
  
  const handlePageChange = (newPage) => {
    updateUrlParams({ page: newPage });
  };
  
  const handlePageSizeChange = (e) => {
    const newSize = e.target.value;
    updateUrlParams({ size: newSize, page: 1 }); 
  };
  
  const handleSortChange = (e) => {
    const value = e.target.value;
    updateUrlParams({ sort: value, page: 1 }); 
  };
  
  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      try {
        const response = await api.fetchPosts({
          page,
          pageSize,
          sort: sortOrder,
        });
        
        setPosts(response.data);
        setMeta(response.meta);
      } catch (err) {
        setError('Failed to load posts. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    loadPosts();
  }, [page, pageSize, sortOrder]);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div className="mb-4 md:mb-0">
          Showing {meta.from} - {meta.to} of {meta.total}
        </div>
        
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex items-center">
            <span className="mr-2 text-gray-700">Show per page:</span>
            <select 
              value={pageSize} 
              onChange={handlePageSizeChange}
              className="border rounded py-1 px-3"
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
          
          <div className="flex items-center">
            <span className="mr-2 text-gray-700">Sort by:</span>
            <select 
              value={sortOrder} 
              onChange={handleSortChange}
              className="border rounded py-1 px-3"
            >
              <option value="-published_at">Newest</option>
              <option value="published_at">Oldest</option>
            </select>
          </div>
        </div>
      </div>
      
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: pageSize }).map((_, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md h-64 animate-pulse">
              <div className="bg-gray-200 h-40"></div>
              <div className="p-4">
                <div className="bg-gray-200 h-4 w-1/3 mb-2"></div>
                <div className="bg-gray-200 h-4 w-full mb-2"></div>
                <div className="bg-gray-200 h-4 w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-10 text-red-500">{error}</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          
          <Pagination 
            currentPage={meta.current_page} 
            totalPages={meta.last_page} 
            onPageChange={handlePageChange} 
          />
        </>
      )}
    </div>
  );
};

export default PostsList;
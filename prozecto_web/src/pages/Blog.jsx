import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import api from '../services/api';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const data = await api.blogs.getAll();
      setBlogs(data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const openBlog = (blog) => {
    setSelectedBlog(blog);
  };

  const closeBlog = () => {
    setSelectedBlog(null);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-10 md:px-20 lg:px-40 py-28">
      <h1 className="text-4xl md:text-6xl font-bold mb-8 text-black dark:text-white">Blog</h1>
      
      {loading ? (
        <p className="text-xl">Loading blogs...</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div 
              key={blog._id} 
              className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
              onClick={() => openBlog(blog)}
            >
              {blog.featuredImage && (
                <img 
                  src={blog.featuredImage} 
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2 text-black dark:text-white">
                  {blog.title}
                </h2>
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                  {new Date(blog.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <p className="text-gray-700 dark:text-gray-300 line-clamp-3">
                  {blog.content.substring(0, 150)}...
                </p>
              </div>
            </div>
          ))}
          {blogs.length === 0 && (
            <div className="col-span-full">
              <p className="text-gray-400 text-center py-8">
                No blogs available yet. Check back soon for our latest articles and insights!
              </p>
            </div>
          )}
        </div>
      )}

      {/* Blog Modal */}
      {selectedBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-black dark:text-white">
                {selectedBlog.title}
              </h2>
              <button 
                onClick={closeBlog}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
              >
                ×
              </button>
            </div>
            <div className="p-6">
              {selectedBlog.featuredImage && (
                <img 
                  src={selectedBlog.featuredImage} 
                  alt={selectedBlog.title}
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
              )}
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {new Date(selectedBlog.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              <div className="text-lg leading-relaxed whitespace-pre-wrap text-gray-900 dark:text-white">
                {selectedBlog.content}
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </>
  );
};

export default Blog;
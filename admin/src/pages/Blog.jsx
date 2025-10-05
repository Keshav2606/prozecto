import { useState, useEffect } from 'react';
import { Plus, Calendar, Edit, Trash2 } from 'lucide-react';
import api from '../services/api';

const Blog = () => {
  const [openForm, setOpenForm] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBlog, setEditingBlog] = useState(null);
  const [viewingBlog, setViewingBlog] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    authorName: '',
    category: '',
    featuredImage: '',
    content: '',
    excerpt: '',
    status: 'Draft'
  });

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      authorName: blog.authorName,
      category: blog.category,
      featuredImage: blog.featuredImage,
      content: blog.content,
      excerpt: blog.excerpt,
      status: blog.status
    });
    setOpenForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingBlog) {
        const updatedBlog = await api.blogs.update(editingBlog._id, formData);
        setBlogs(blogs.map(blog => blog._id === editingBlog._id ? updatedBlog : blog));
      } else {
        const newBlog = await api.blogs.create(formData);
        setBlogs([newBlog, ...blogs]);
      }
      setFormData({ title: '', authorName: '', category: '', featuredImage: '', content: '', excerpt: '', status: 'Draft' });
      setEditingBlog(null);
      setOpenForm(false);
    } catch (error) {
      console.error('Error saving blog:', error);
    }
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setEditingBlog(null);
    setFormData({ title: '', authorName: '', category: '', featuredImage: '', content: '', excerpt: '', status: 'Draft' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await api.blogs.delete(id);
        setBlogs(blogs.filter(b => b._id !== id));
      } catch (error) {
        console.error('Error deleting blog:', error);
      }
    }
  };

  const handleViewBlog = (blog) => {
    setViewingBlog(blog);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-lg">Loading blogs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Our Blogs</h1>
          <button
            onClick={() => setOpenForm(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-2xl shadow-md transition"
          >
            <Plus size={18} /> Add Blog
          </button>
        </div>

        {/* If no blogs exist */}
        {blogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-20 border-2 border-dashed border-gray-700 rounded-2xl">
            <p className="text-lg mb-4">No blogs available yet.</p>
            <button
              onClick={() => setOpenForm(true)}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-xl shadow-md transition"
            >
              Write Your First Blog
            </button>
          </div>
        ) : (
          /* Blog grid */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition"
              >
                {blog.featuredImage && (
                  <img
                    src={blog.featuredImage}
                    alt={blog.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-semibold line-clamp-2 flex-1">
                      {blog.title}
                    </h2>
                    <div className="flex gap-1 ml-2">
                      <button
                        onClick={() => handleEdit(blog)}
                        className="p-1 text-gray-400 hover:text-blue-400 transition"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="p-1 text-gray-400 hover:text-red-400 transition"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm line-clamp-3 mb-4">
                    {blog.excerpt}
                  </p>
                  <button
                    onClick={() => handleViewBlog(blog)}
                    className="text-blue-400 hover:text-blue-300 text-sm mb-3 transition"
                  >
                    Read More →
                  </button>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />{" "}
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </span>
                    <span className="italic">By {blog.authorName}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Blog Form Modal */}
        {openForm && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-semibold mb-4">{editingBlog ? 'Edit Blog' : 'Write a New Blog'}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="title"
                  placeholder="Blog Title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:border-blue-500"
                  required
                />
                <input
                  type="text"
                  name="authorName"
                  placeholder="Author Name"
                  value={formData.authorName}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:border-blue-500"
                  required
                />
                <input
                  type="text"
                  name="category"
                  placeholder="Category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:border-blue-500"
                  required
                />
                <input
                  type="url"
                  name="featuredImage"
                  placeholder="Featured Image URL"
                  value={formData.featuredImage}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:border-blue-500"
                  required
                />
                <textarea
                  name="excerpt"
                  rows="2"
                  placeholder="Short excerpt..."
                  value={formData.excerpt}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:border-blue-500"
                  required
                />
                <textarea
                  name="content"
                  rows="6"
                  placeholder="Write your blog content..."
                  value={formData.content}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:border-blue-500"
                  required
                />
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:border-blue-500"
                >
                  <option value="Draft">Draft</option>
                  <option value="Published">Published</option>
                </select>
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={handleCloseForm}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition"
                  >
                    {editingBlog ? 'Update' : 'Publish'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Full Blog View Modal */}
        {viewingBlog && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-3xl font-bold">{viewingBlog.title}</h1>
                <button
                  onClick={() => setViewingBlog(null)}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>
              
              {viewingBlog.featuredImage && (
                <img
                  src={viewingBlog.featuredImage}
                  alt={viewingBlog.title}
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
              )}
              
              <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
                <span className="flex items-center gap-1">
                  <Calendar size={14} />
                  {new Date(viewingBlog.createdAt).toLocaleDateString()}
                </span>
                <span>By {viewingBlog.authorName}</span>
                <span className="bg-blue-600 px-2 py-1 rounded text-white">{viewingBlog.category}</span>
              </div>
              
              <div className="prose prose-invert max-w-none">
                <div className="whitespace-pre-wrap text-gray-100 leading-relaxed">
                  {viewingBlog.content}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
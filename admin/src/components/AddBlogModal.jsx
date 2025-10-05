import { useState } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  TextField, 
  Button, 
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import api from '../services/api';

const AddBlogModal = ({ open, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    title: '',
    authorName: '',
    category: '',
    featuredImage: '',
    content: '',
    excerpt: '',
    status: 'Draft'
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const newBlog = await api.blogs.create(formData);
      onAdd(newBlog);
      setFormData({ title: '', authorName: '', category: '', featuredImage: '', content: '', excerpt: '', status: 'Draft' });
      onClose();
    } catch (error) {
      console.error('Error creating blog:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle className="bg-gray-800 text-white">Add Blog Post</DialogTitle>
      <DialogContent className="bg-gray-800 text-white">
        <Box className="space-y-4 mt-4">
          <TextField
            name="title"
            label="Title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          />
          <TextField
            name="authorName"
            label="Author Name"
            value={formData.authorName}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          />
          <TextField
            name="category"
            label="Category"
            value={formData.category}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          />
          <TextField
            name="featuredImage"
            label="Featured Image URL"
            value={formData.featuredImage}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          />
          <TextField
            name="excerpt"
            label="Excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            fullWidth
            multiline
            rows={2}
            variant="outlined"
          />
          <TextField
            name="content"
            label="Content"
            value={formData.content}
            onChange={handleChange}
            fullWidth
            multiline
            rows={6}
            variant="outlined"
          />
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={formData.status}
              onChange={handleChange}
              label="Status"
            >
              <MenuItem value="Draft">Draft</MenuItem>
              <MenuItem value="Published">Published</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions className="bg-gray-800">
        <Button onClick={onClose} className="text-gray-300" disabled={loading}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" className="bg-blue-600" disabled={loading}>
          {loading ? 'Adding...' : 'Add Blog'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddBlogModal;
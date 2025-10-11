import { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  TextField, 
  Button, 
  Box 
} from '@mui/material';

const AddLegalModal = ({ open, onClose, onAdd, editingItem, activeTab, apiService }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingItem) {
      setFormData({
        title: editingItem.title,
        content: editingItem.content
      });
    } else {
      setFormData({ title: '', content: '' });
    }
  }, [editingItem]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (editingItem) {
        const updatedItem = await apiService.update(editingItem._id, formData);
        onAdd(updatedItem, true);
      } else {
        const newItem = await apiService.create(formData);
        onAdd(newItem, false);
      }
      setFormData({ title: '', content: '' });
      onClose();
    } catch (error) {
      console.error(`Error saving ${activeTab}:`, error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle className="bg-gray-800 text-white">
        {editingItem ? `Edit ${activeTab}` : `Add ${activeTab}`}
      </DialogTitle>
      <DialogContent className="bg-gray-800 text-white">
        <Box className="space-y-4 mt-4">
          <TextField
            name="title"
            label="Title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            required
          />
          <TextField
            name="content"
            label="Content"
            value={formData.content}
            onChange={handleChange}
            fullWidth
            multiline
            rows={10}
            variant="outlined"
            required
          />
        </Box>
      </DialogContent>
      <DialogActions className="bg-gray-800">
        <Button onClick={onClose} className="text-gray-300" disabled={loading}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" className="bg-blue-600" disabled={loading}>
          {loading ? (editingItem ? 'Updating...' : 'Adding...') : (editingItem ? `Update ${activeTab}` : `Add ${activeTab}`)}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddLegalModal;
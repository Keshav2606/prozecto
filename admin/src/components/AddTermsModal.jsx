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
import api from '../services/api';

const AddTermsModal = ({ open, onClose, onAdd, editingTerms }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingTerms) {
      setFormData({
        title: editingTerms.title,
        content: editingTerms.content
      });
    } else {
      setFormData({ title: '', content: '' });
    }
  }, [editingTerms]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (editingTerms) {
        const updatedTerms = await api.terms.update(editingTerms._id, formData);
        onAdd(updatedTerms, true);
      } else {
        const newTerms = await api.terms.create(formData);
        onAdd(newTerms, false);
      }
      setFormData({ title: '', content: '' });
      onClose();
    } catch (error) {
      console.error('Error saving terms:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle className="bg-gray-800 text-white">
        {editingTerms ? 'Edit Terms and Conditions' : 'Add Terms and Conditions'}
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
          {loading ? (editingTerms ? 'Updating...' : 'Adding...') : (editingTerms ? 'Update Terms' : 'Add Terms')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTermsModal;
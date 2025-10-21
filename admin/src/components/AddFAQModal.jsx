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

const AddFAQModal = ({ open, onClose, onAdd, editingFAQ }) => {
  const [formData, setFormData] = useState({
    question: '',
    answer: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingFAQ) {
      setFormData({
        question: editingFAQ.question,
        answer: editingFAQ.answer
      });
    } else {
      setFormData({ question: '', answer: '' });
    }
  }, [editingFAQ, open]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (editingFAQ) {
        const updatedFAQ = await api.faqs.update(editingFAQ._id, formData);
        onAdd(updatedFAQ, true);
      } else {
        const newFAQ = await api.faqs.create(formData);
        onAdd(newFAQ, false);
      }
      setFormData({ question: '', answer: '' });
      onClose();
    } catch (error) {
      console.error('Error saving FAQ:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle className="bg-gray-800 text-white">{editingFAQ ? 'Edit FAQ' : 'Add FAQ'}</DialogTitle>
      <DialogContent className="bg-gray-800 text-white">
        <Box className="space-y-4 mt-4">
          <TextField
            name="question"
            label="Question"
            value={formData.question}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          />
          <TextField
            name="answer"
            label="Answer"
            value={formData.answer}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
            variant="outlined"
          />
        </Box>
      </DialogContent>
      <DialogActions className="bg-gray-800">
        <Button onClick={onClose} className="text-gray-300" disabled={loading}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" className="bg-blue-600" disabled={loading}>
          {loading ? (editingFAQ ? 'Updating...' : 'Adding...') : (editingFAQ ? 'Update FAQ' : 'Add FAQ')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddFAQModal;
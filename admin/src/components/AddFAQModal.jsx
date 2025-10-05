import { useState } from 'react';
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

const AddFAQModal = ({ open, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    question: '',
    answer: ''
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
      const newFAQ = await api.faqs.create(formData);
      onAdd(newFAQ);
      setFormData({ question: '', answer: '' });
      onClose();
    } catch (error) {
      console.error('Error creating FAQ:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle className="bg-gray-800 text-white">Add FAQ</DialogTitle>
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
          {loading ? 'Adding...' : 'Add FAQ'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddFAQModal;
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

const AddTestimonialModal = ({ open, onClose, onAdd, editingTestimonial }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    statement: '',
    dp: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingTestimonial) {
      setFormData({
        fullName: editingTestimonial.fullName,
        statement: editingTestimonial.statement,
        dp: editingTestimonial.dp
      });
    } else {
      setFormData({ fullName: '', statement: '', dp: '' });
    }
  }, [editingTestimonial]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (editingTestimonial) {
        const updatedTestimonial = await api.testimonials.update(editingTestimonial._id, formData);
        onAdd(updatedTestimonial, true);
      } else {
        const newTestimonial = await api.testimonials.create(formData);
        onAdd(newTestimonial, false);
      }
      setFormData({ fullName: '', statement: '', dp: '' });
      onClose();
    } catch (error) {
      console.error('Error saving testimonial:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle className="bg-gray-800 text-white">{editingTestimonial ? 'Edit Testimonial' : 'Add Testimonial'}</DialogTitle>
      <DialogContent className="bg-gray-800 text-white">
        <Box className="space-y-4 mt-4">
          <TextField
            name="fullName"
            label="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          />
          <TextField
            name="statement"
            label="Statement"
            value={formData.statement}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
            variant="outlined"
          />
          <TextField
            name="dp"
            label="DP (Image URL)"
            value={formData.dp}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          />
        </Box>
      </DialogContent>
      <DialogActions className="bg-gray-800">
        <Button onClick={onClose} className="text-gray-300" disabled={loading}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" className="bg-blue-600" disabled={loading}>
          {loading ? (editingTestimonial ? 'Updating...' : 'Adding...') : (editingTestimonial ? 'Update Testimonial' : 'Add Testimonial')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTestimonialModal;
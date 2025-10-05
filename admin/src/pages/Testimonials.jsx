import { useState, useEffect } from 'react';
import { Paper, Typography, Box, Button, Card, CardContent, Avatar, Grid, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddTestimonialModal from '../components/AddTestimonialModal';
import api from '../services/api';

const Testimonials = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTestimonial, setEditingTestimonial] = useState(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const data = await api.testimonials.getAll();
      setTestimonials(data);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (testimonial) => {
    setEditingTestimonial(testimonial);
    setModalOpen(true);
  };

  const handleAddTestimonial = (testimonial, isEdit) => {
    if (isEdit) {
      setTestimonials(testimonials.map(t => t._id === testimonial._id ? testimonial : t));
    } else {
      setTestimonials([testimonial, ...testimonials]);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingTestimonial(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      try {
        await api.testimonials.delete(id);
        setTestimonials(testimonials.filter(t => t._id !== id));
      } catch (error) {
        console.error('Error deleting testimonial:', error);
      }
    }
  };

  return (
    <Box className="p-6">
      <Box className="flex justify-between items-center mb-6">
        <Typography variant="h4" className="text-white">
          Testimonials Management
        </Typography>
        <Button 
          variant="contained" 
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => setModalOpen(true)}
        >
          Add Testimonial
        </Button>
      </Box>
      
      {loading ? (
        <Typography className="text-white">Loading testimonials...</Typography>
      ) : (
        <Grid container spacing={3}>
          {testimonials.map((testimonial) => (
            <Grid item xs={12} md={6} lg={4} key={testimonial._id}>
              <Card className="bg-gray-800 text-white">
                <CardContent>
                  <Box className="flex items-center justify-between mb-3">
                    <Box className="flex items-center">
                      <Avatar src={testimonial.dp} className="mr-3" />
                      <Typography variant="h6">{testimonial.fullName}</Typography>
                    </Box>
                    <Box className="flex gap-1">
                      <IconButton 
                        onClick={() => handleEdit(testimonial)}
                        className="text-gray-400 hover:text-blue-400"
                        size="small"
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton 
                        onClick={() => handleDelete(testimonial._id)}
                        className="text-gray-400 hover:text-red-400"
                        size="small"
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                  <Typography variant="body2" className="text-gray-300">
                    {testimonial.statement}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <AddTestimonialModal 
        open={modalOpen}
        onClose={handleCloseModal}
        onAdd={handleAddTestimonial}
        editingTestimonial={editingTestimonial}
      />
    </Box>
  );
};

export default Testimonials;
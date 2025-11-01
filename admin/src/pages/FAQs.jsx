import { useState, useEffect } from 'react';
import { Typography, Box, Button, Card, CardContent, Grid, Accordion, AccordionSummary, AccordionDetails, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddFAQModal from '../components/AddFAQModal';
import api from '../services/api';

const FAQs = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingFAQ, setEditingFAQ] = useState(null);

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      const data = await api.faqs.getAll();
      setFaqs(data);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (faq) => {
    setEditingFAQ(faq);
    setModalOpen(true);
  };

  const handleAddFAQ = (faq, isEdit) => {
    if (isEdit) {
      setFaqs(faqs.map(f => f._id === faq._id ? faq : f));
    } else {
      setFaqs([faq, ...faqs]);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingFAQ(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this FAQ?')) {
      try {
        await api.faqs.delete(id);
        setFaqs(faqs.filter(f => f._id !== id));
      } catch (error) {
        console.error('Error deleting FAQ:', error);
      }
    }
  };

  return (
    <Box className="p-6">
      <Box className="flex justify-between items-center mb-6">
        <Typography variant="h4" className="text-white">
          FAQs Management
        </Typography>
        <Button 
          variant="contained" 
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => setModalOpen(true)}
        >
          Add FAQ
        </Button>
      </Box>
      
      {loading ? (
        <Typography className="text-white">Loading FAQs...</Typography>
      ) : (
        <Box className="space-y-4">
          {faqs.map((faq) => (
            <Accordion key={faq._id} className="bg-gray-800 text-white">
              <AccordionSummary expandIcon={<ExpandMoreIcon className="text-white" />}>
                <Box className="flex justify-between items-center w-full mr-4">
                  <Typography variant="h6">{faq.question}</Typography>
                  <Box className="flex gap-1">
                    <IconButton 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(faq);
                      }}
                      className="text-gray-400 hover:text-blue-400"
                      size="small"
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(faq._id);
                      }}
                      className="text-gray-400 hover:text-red-400"
                      size="small"
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className="text-gray-300">
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
          {faqs.length === 0 && (
            <Typography className="text-gray-400 text-center">
              No FAQs found. Add your first FAQ!
            </Typography>
          )}
        </Box>
      )}

      <AddFAQModal 
        open={modalOpen}
        onClose={handleCloseModal}
        onAdd={handleAddFAQ}
        editingFAQ={editingFAQ}
      />
    </Box>
  );
};

export default FAQs;
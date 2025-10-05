import { useState, useEffect } from 'react';
import { Typography, Box, Button, Card, CardContent, Grid, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddTermsModal from '../components/AddTermsModal';
import api from '../services/api';

const TermsAndConditions = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [terms, setTerms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTerms, setEditingTerms] = useState(null);

  useEffect(() => {
    fetchTerms();
  }, []);

  const fetchTerms = async () => {
    try {
      const data = await api.terms.getAll();
      setTerms(data);
    } catch (error) {
      console.error('Error fetching terms:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (term) => {
    setEditingTerms(term);
    setModalOpen(true);
  };

  const handleAddTerms = (term, isEdit) => {
    if (isEdit) {
      setTerms(terms.map(t => t._id === term._id ? term : t));
    } else {
      setTerms([term, ...terms]);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingTerms(null);
  };

  return (
    <Box className="p-6">
      <Box className="flex justify-between items-center mb-6">
        <Typography variant="h4" className="text-white">
          Terms and Conditions
        </Typography>
        <Button 
          variant="contained" 
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => setModalOpen(true)}
        >
          Add Terms
        </Button>
      </Box>
      
      {loading ? (
        <Typography className="text-white">Loading terms...</Typography>
      ) : (
        <Grid container spacing={3}>
          {terms.map((term) => (
            <Grid item xs={12} key={term._id}>
              <Card className="bg-gray-800 text-white">
                <CardContent>
                  <Box className="flex justify-between items-start mb-3">
                    <Typography variant="h5" className="flex-1">
                      {term.title}
                    </Typography>
                    <IconButton 
                      onClick={() => handleEdit(term)}
                      className="text-gray-400 hover:text-blue-400"
                      size="small"
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Box>
                  <Typography variant="body2" className="text-gray-300 whitespace-pre-wrap">
                    {term.content}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
          {terms.length === 0 && (
            <Grid item xs={12}>
              <Typography className="text-gray-400 text-center">
                No terms and conditions found. Add your first terms!
              </Typography>
            </Grid>
          )}
        </Grid>
      )}

      <AddTermsModal 
        open={modalOpen}
        onClose={handleCloseModal}
        onAdd={handleAddTerms}
        editingTerms={editingTerms}
      />
    </Box>
  );
};

export default TermsAndConditions;
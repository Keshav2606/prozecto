import { useState, useEffect } from 'react';
import { Typography, Box, Button, Card, CardContent, Grid, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddLegalModal from './AddLegalModal';
import api from '../services/api';

const LegalTab = ({ activeTab }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);

  const getApiService = () => {
    switch (activeTab) {
      case 'Terms & Conditions':
        return api.terms;
      case 'Privacy Policy':
        return api.privacyPolicies;
      case 'User Agreement':
        return api.userAgreements;
      case 'Refund Policy':
        return api.refundPolicies;
      default:
        return api.terms;
    }
  };

  useEffect(() => {
    fetchItems();
  }, [activeTab]);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const data = await getApiService().getAll();
      setItems(data);
    } catch (error) {
      console.error(`Error fetching ${activeTab}:`, error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setModalOpen(true);
  };

  const handleAddItem = (item, isEdit) => {
    if (isEdit) {
      setItems(items.map(i => i._id === item._id ? item : i));
    } else {
      setItems([item, ...items]);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingItem(null);
  };

  return (
    <Box>
      <Box className="flex justify-between items-center mb-6">
        <Typography variant="h5" className="text-white">
          {activeTab}
        </Typography>
        <Button 
          variant="contained" 
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => setModalOpen(true)}
        >
          Add {activeTab}
        </Button>
      </Box>
      
      {loading ? (
        <Typography className="text-white">Loading {activeTab.toLowerCase()}...</Typography>
      ) : (
        <Grid container spacing={3}>
          {items.map((item) => (
            <Grid item xs={12} key={item._id}>
              <Card className="bg-gray-800 text-white">
                <CardContent>
                  <Box className="flex justify-between items-start mb-3">
                    <Typography variant="h6" className="flex-1">
                      {item.title}
                    </Typography>
                    <IconButton 
                      onClick={() => handleEdit(item)}
                      className="text-gray-400 hover:text-blue-400"
                      size="small"
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Box>
                  <Typography variant="body2" className="text-gray-300 whitespace-pre-wrap">
                    {item.content}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
          {items.length === 0 && (
            <Grid item xs={12}>
              <Typography className="text-gray-400 text-center">
                No {activeTab.toLowerCase()} found. Add your first {activeTab.toLowerCase()}!
              </Typography>
            </Grid>
          )}
        </Grid>
      )}

      <AddLegalModal 
        open={modalOpen}
        onClose={handleCloseModal}
        onAdd={handleAddItem}
        editingItem={editingItem}
        activeTab={activeTab}
        apiService={getApiService()}
      />
    </Box>
  );
};

export default LegalTab;
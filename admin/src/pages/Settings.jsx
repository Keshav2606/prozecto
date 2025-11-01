import { Paper, Typography, Box, TextField, Button, IconButton, Grid, Switch, FormControlLabel } from '@mui/material';
import { useState, useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
import api from '../services/api';
import ChangeCredentialsModal from '../components/ChangeCredentialsModal';

const Settings = () => {
  const [contactInfo, setContactInfo] = useState({
    email: '',
    phone: '',
    phoneVisible: false
  });
  const [socialMedia, setSocialMedia] = useState([]);
  const [editingContact, setEditingContact] = useState({ email: false, phone: false });
  const [editingSocial, setEditingSocial] = useState({});
  const [loading, setLoading] = useState(false);
  const [credentialsModalOpen, setCredentialsModalOpen] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const data = await api.settings.getAll();
      if (data.length > 0) {
        const settings = data[0];
        setContactInfo({
          email: settings.email || '',
          phone: settings.phone || '',
          phoneVisible: settings.phoneVisible || false
        });
        setSocialMedia(settings.socialMedia || []);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const handleContactChange = (field, value) => {
    setContactInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleSocialChange = (index, field, value) => {
    setSocialMedia(prev => prev.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    ));
  };

  const saveContactField = async (field) => {
    setLoading(true);
    try {
      if (field === 'phone') {
        await api.settings.update({ phone: contactInfo.phone, phoneVisible: contactInfo.phoneVisible });
      } else {
        await api.settings.update({ [field]: contactInfo[field] });
      }
      setEditingContact(prev => ({ ...prev, [field]: false }));
    } catch (error) {
      console.error('Error saving contact info:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveSocialMedia = async (index) => {
    setLoading(true);
    try {
      await api.settings.update({ socialMedia });
      setEditingSocial(prev => ({ ...prev, [index]: false }));
    } catch (error) {
      console.error('Error saving social media:', error);
    } finally {
      setLoading(false);
    }
  };

  const addSocialMedia = () => {
    setSocialMedia(prev => [...prev, { platform: '', url: '' }]);
    setEditingSocial(prev => ({ ...prev, [socialMedia.length]: true }));
  };

  const deleteSocialMedia = async (index) => {
    const newSocialMedia = socialMedia.filter((_, i) => i !== index);
    setSocialMedia(newSocialMedia);
    try {
      await api.settings.update({ socialMedia: newSocialMedia });
    } catch (error) {
      console.error('Error deleting social media:', error);
    }
  };

  return (
    <Box className="p-6">
      <Typography variant="h4" className="text-white mb-6">
        Settings
      </Typography>

      {/* Admin Security */}
      <Paper className="p-6 bg-gray-800 text-white mb-6">
        <Typography variant="h5" className="mb-4">
          Admin Security
        </Typography>
        <Box className="flex items-center gap-2">
          <Button
            onClick={() => setCredentialsModalOpen(true)}
            variant="contained"
            className="bg-red-600 hover:bg-red-700"
            startIcon={<SecurityIcon />}
          >
            Change Email & Password
          </Button>
          <Typography variant="body2" className="text-gray-400">
            Update your admin login credentials
          </Typography>
        </Box>
      </Paper>

      {/* Contact Information */}
      <Paper className="p-6 bg-gray-800 text-white mb-6">
        <Typography variant="h5" className="mb-4">
          Contact Information
        </Typography>
        
        <Grid container spacing={3}>
          {/* Email */}
          <Grid item xs={12} md={6}>
            <Box className="flex items-center gap-2">
              <TextField
                label="Email"
                value={contactInfo.email}
                onChange={(e) => handleContactChange('email', e.target.value)}
                disabled={!editingContact.email}
                fullWidth
                variant="outlined"
                className="mb-2"
              />
              {editingContact.email ? (
                <Button
                  onClick={() => saveContactField('email')}
                  disabled={loading || !contactInfo.email}
                  variant="contained"
                  className="bg-green-600 hover:bg-green-700"
                  startIcon={<SaveIcon />}
                >
                  Save
                </Button>
              ) : (
                <Button
                  onClick={() => setEditingContact(prev => ({ ...prev, email: true }))}
                  variant="contained"
                  className="bg-blue-600 hover:bg-blue-700"
                  startIcon={<EditIcon />}
                >
                  Edit
                </Button>
              )}
            </Box>
          </Grid>

          {/* Phone */}
          <Grid item xs={12} md={6}>
            <Box className="flex items-center gap-2">
              <Box className="flex-1">
                <TextField
                  label="Phone Number"
                  value={contactInfo.phone}
                  onChange={(e) => handleContactChange('phone', e.target.value)}
                  disabled={!editingContact.phone}
                  fullWidth
                  variant="outlined"
                  className="mb-2"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={contactInfo.phoneVisible}
                      onChange={(e) => handleContactChange('phoneVisible', e.target.checked)}
                      disabled={!editingContact.phone}
                      sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': {
                          color: '#16a34a',
                        },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                          backgroundColor: '#16a34a',
                        },
                        '& .MuiSwitch-track': {
                          backgroundColor: contactInfo.phoneVisible ? '#16a34a' : '#6b7280',
                          opacity: contactInfo.phoneVisible ? 1 : 0.5,
                        }
                      }}
                    />
                  }
                  label={contactInfo.phoneVisible ? "Public" : "Hidden"}
                  className="text-white"
                />
              </Box>
              {editingContact.phone ? (
                <Button
                  onClick={() => saveContactField('phone')}
                  disabled={loading || !contactInfo.phone}
                  variant="contained"
                  className="bg-green-600 hover:bg-green-700"
                  startIcon={<SaveIcon />}
                >
                  Save
                </Button>
              ) : (
                <Button
                  onClick={() => setEditingContact(prev => ({ ...prev, phone: true }))}
                  variant="contained"
                  className="bg-blue-600 hover:bg-blue-700"
                  startIcon={<EditIcon />}
                >
                  Edit
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Social Media */}
      <Paper className="p-6 bg-gray-800 text-white">
        <Box className="flex justify-between items-center mb-4">
          <Typography variant="h5">
            Social Media Handles
          </Typography>
          <Button
            onClick={addSocialMedia}
            variant="contained"
            className="bg-purple-600 hover:bg-purple-700"
            startIcon={<AddIcon />}
          >
            Add Social Media
          </Button>
        </Box>

        {socialMedia.map((social, index) => (
          <Box key={index} className="mb-4 p-4 border border-gray-700 rounded">
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={4}>
                <TextField
                  label="Platform Name"
                  value={social.platform}
                  onChange={(e) => handleSocialChange(index, 'platform', e.target.value)}
                  disabled={!editingSocial[index]}
                  fullWidth
                  variant="outlined"
                  placeholder="e.g., Instagram, Twitter"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="URL/Link"
                  value={social.url}
                  onChange={(e) => handleSocialChange(index, 'url', e.target.value)}
                  disabled={!editingSocial[index]}
                  fullWidth
                  variant="outlined"
                  placeholder="https://..."
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Box className="flex gap-2">
                  {editingSocial[index] ? (
                    <Button
                      onClick={() => saveSocialMedia(index)}
                      disabled={loading || !social.platform || !social.url}
                      variant="contained"
                      className="bg-green-600 hover:bg-green-700"
                      startIcon={<SaveIcon />}
                    >
                      Save
                    </Button>
                  ) : (
                    <Button
                      onClick={() => setEditingSocial(prev => ({ ...prev, [index]: true }))}
                      variant="contained"
                      className="bg-blue-600 hover:bg-blue-700"
                      startIcon={<EditIcon />}
                    >
                      Edit
                    </Button>
                  )}
                  <IconButton
                    onClick={() => deleteSocialMedia(index)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Grid>
            </Grid>
          </Box>
        ))}

        {socialMedia.length === 0 && (
          <Typography className="text-gray-400 text-center py-8">
            No social media handles added yet. Click "Add Social Media" to get started.
          </Typography>
        )}
      </Paper>
      
      <ChangeCredentialsModal 
        open={credentialsModalOpen} 
        onClose={() => setCredentialsModalOpen(false)} 
      />
    </Box>
  );
};

export default Settings;
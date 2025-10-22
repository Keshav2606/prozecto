import { useState } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  TextField, 
  Button, 
  Alert,
  Box 
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

const ChangeCredentialsModal = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    currentEmail: '',
    currentPassword: '',
    newEmail: '',
    newPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { updateCredentials, isValidPassword, logout } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    if (!isValidPassword(formData.newPassword)) {
      setError('Password must be at least 8 characters with 1 uppercase letter and 1 special character');
      setLoading(false);
      return;
    }

    const result = await updateCredentials(
      formData.currentEmail,
      formData.currentPassword,
      formData.newEmail,
      formData.newPassword
    );

    if (result.success) {
      setSuccess(true);
      setFormData({ currentEmail: '', currentPassword: '', newEmail: '', newPassword: '' });
      setTimeout(async () => {
        onClose();
        setSuccess(false);
        await logout();
      }, 2000);
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  const handleClose = () => {
    setFormData({ currentEmail: '', currentPassword: '', newEmail: '', newPassword: '' });
    setError('');
    setSuccess(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Change Email & Password</DialogTitle>
      <DialogContent>
        {error && (
          <Alert severity="error" className="mb-4">
            {error}
          </Alert>
        )}
        
        {success && (
          <Alert severity="success" className="mb-4">
            Credentials updated successfully!
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} className="space-y-4 mt-4">
          <TextField
            name="currentEmail"
            type="email"
            label="Current Email"
            value={formData.currentEmail}
            onChange={handleChange}
            fullWidth
            required
            variant="outlined"
          />
          
          <TextField
            name="currentPassword"
            type="password"
            label="Current Password"
            value={formData.currentPassword}
            onChange={handleChange}
            fullWidth
            required
            variant="outlined"
          />
          
          <TextField
            name="newEmail"
            type="email"
            label="New Email"
            value={formData.newEmail}
            onChange={handleChange}
            fullWidth
            required
            variant="outlined"
          />
          
          <TextField
            name="newPassword"
            type="password"
            label="New Password"
            value={formData.newPassword}
            onChange={handleChange}
            fullWidth
            required
            variant="outlined"
            helperText="Must be 8+ characters with 1 uppercase letter and 1 special character"
          />
        </Box>
      </DialogContent>
      
      <DialogActions>
        <Button onClick={handleClose} disabled={loading}>
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          disabled={loading || success}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {loading ? 'Updating...' : 'Update Credentials'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChangeCredentialsModal;
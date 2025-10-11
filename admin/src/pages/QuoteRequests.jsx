import { useState, useEffect } from 'react';
import { Typography, Box, Card, CardContent, Grid, Chip } from '@mui/material';
import api from '../services/api';

const QuoteRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const data = await api.quoteRequests.getAll();
      setRequests(data);
    } catch (error) {
      console.error('Error fetching quote requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const getServiceLabel = (service) => {
    const services = {
      web: 'Website Development',
      app: 'App Development',
      software: 'Software Solution',
      design: 'Graphic Design',
      video: 'Video Editing',
      excel: 'Excel Automation'
    };
    return services[service] || service;
  };

  return (
    <Box className="p-6">
      <Typography variant="h4" className="text-white mb-6">
        Quote Requests
      </Typography>
      
      {loading ? (
        <Typography className="text-white">Loading requests...</Typography>
      ) : (
        <Grid container spacing={3}>
          {requests.map((request) => (
            <Grid item xs={12} md={6} lg={4} key={request._id}>
              <Card className="bg-gray-800 text-white">
                <CardContent>
                  <Typography variant="h6" className="mb-2">{request.fullName}</Typography>
                  <Typography variant="body2" className="text-gray-300 mb-2">
                    {request.email}
                  </Typography>
                  {request.phone && (
                    <Typography variant="body2" className="text-gray-300 mb-2">
                      {request.phone}
                    </Typography>
                  )}
                  <Chip 
                    label={getServiceLabel(request.service)} 
                    size="small" 
                    className="bg-blue-600 text-white mb-3"
                  />
                  {request.projectDetails && (
                    <Typography variant="body2" className="text-gray-300 mb-2">
                      {request.projectDetails}
                    </Typography>
                  )}
                  <Typography variant="caption" className="text-gray-400 block">
                    {new Date(request.createdAt).toLocaleDateString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
          {requests.length === 0 && (
            <Grid item xs={12}>
              <Typography className="text-gray-400 text-center">
                No quote requests found.
              </Typography>
            </Grid>
          )}
        </Grid>
      )}
    </Box>
  );
};

export default QuoteRequests;
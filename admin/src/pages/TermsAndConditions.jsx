import { useState } from 'react';
import { Typography, Box, Button } from '@mui/material';
import LegalTab from '../components/LegalTab';

const TermsAndConditions = () => {
  const [activeTab, setActiveTab] = useState('Terms & Conditions');

  const tabs = [
    'Terms & Conditions',
    'Privacy Policy', 
    'User Agreement',
    'Refund Policy'
  ];

  return (
    <Box className="p-6">
      <Typography variant="h4" className="text-white mb-6">
        Legal Conditions
      </Typography>
      
      {/* Sub Navigation */}
      <Box className="flex space-x-4 mb-6 border-b border-gray-700">
        {tabs.map((tab) => (
          <Button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 px-4 text-sm font-medium transition-colors ${
              activeTab === tab
                ? 'text-blue-400 border-b-2 border-blue-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab}
          </Button>
        ))}
      </Box>

      {/* Tab Content */}
      <LegalTab activeTab={activeTab} />
    </Box>
  );
};

export default TermsAndConditions;
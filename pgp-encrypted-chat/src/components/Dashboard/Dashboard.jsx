import React, { useState } from 'react';
import { 
  Paper, 
  Box, 
  Typography, 
  Alert, 
  Tabs,
  Tab,
  useTheme
} from '@mui/material';
import Inbox from './Inbox';
import KeyManager from './KeyManager';
import Compose from './Compose';
import { Email, VpnKey, Edit } from '@mui/icons-material';
import '../../styles/Dashboard.css'; // Fix path to CSS

const Dashboard = ({ 
  currentUser, 
  updateUserKeyPair, 
  messages, 
  addMessage, 
  users, 
  selectedRecipient 
}) => {
  const [tab, setTab] = useState(0);
  const theme = useTheme();

  const handleTabChange = (event, newTab) => {
    setTab(newTab);
  };
  
  // Display message if no user is selected
  if (!currentUser) {
    return (
      <Alert 
        severity="info" 
        sx={{ 
          mt: 4,
          p: 3,
          borderRadius: 2,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', py: 4 }}>
          <VpnKey sx={{ fontSize: 60, mb: 2, opacity: 0.7 }} />
          <Typography variant="h5" sx={{ mb: 1 }}>Welcome to PGP Secure Messenger</Typography>
          <Typography>Please select a user from the sidebar to start using the application.</Typography>
        </Box>
      </Alert>
    );
  }
  
  return (
    <Paper 
      elevation={3} 
      sx={{ 
        overflow: 'hidden',
        borderRadius: 3,
        mb: 3
      }}
    >
      <Tabs 
        value={tab} 
        onChange={handleTabChange} 
        variant="fullWidth" 
        indicatorColor="secondary"
        textColor="inherit"
        aria-label="dashboard tabs"
        sx={{ 
          bgcolor: theme.palette.primary.main,
          '& .MuiTab-root': { 
            color: 'rgba(255,255,255,0.7)',
            '&.Mui-selected': { color: '#fff' } 
          }
        }}
      >
        <Tab icon={<Email />} label="INBOX" iconPosition="start" />
        <Tab icon={<VpnKey />} label="KEY MANAGER" iconPosition="start" />
        <Tab icon={<Edit />} label="COMPOSE" iconPosition="start" />
      </Tabs>
      
      <Box sx={{ p: { xs: 2, md: 3 } }}>
        {tab === 0 && (
          <Box role="tabpanel">
            <Inbox 
              messages={messages}
              currentUser={currentUser}
              keyPair={{
                privateKey: currentUser.privateKey,
                publicKey: currentUser.publicKey
              }}
            />
          </Box>
        )}
        
        {tab === 1 && (
          <Box role="tabpanel">
            <KeyManager 
              currentUser={currentUser}
              updateUserKeyPair={updateUserKeyPair}
            />
          </Box>
        )}
        
        {tab === 2 && (
          <Box role="tabpanel">
            <Compose 
              currentUser={currentUser}
              selectedRecipient={selectedRecipient}
              addMessage={addMessage}
              keyPair={{
                privateKey: currentUser.privateKey,
                publicKey: currentUser.publicKey
              }}
            />
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default Dashboard;
import React from 'react';
import { Box, Container } from '@mui/material';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard/Dashboard';
import Header from './Header';

const Layout = ({ 
  users, 
  currentUser, 
  setCurrentUser, 
  updateUserKeyPair, 
  messages, 
  addMessage,
  selectedRecipient,
  setSelectedRecipient,
  toggleTheme,
  themeMode 
}) => {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh',
      overflow: 'hidden',
      bgcolor: 'background.default',
      transition: 'background-color 0.3s ease-in-out'
    }}>
      <Header 
        currentUser={currentUser} 
        toggleTheme={toggleTheme}
        themeMode={themeMode}
      />
      
      <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
        <Sidebar 
          users={users}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          selectedRecipient={selectedRecipient}
          setSelectedRecipient={setSelectedRecipient}
        />
        
        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1, 
            p: { xs: 2, md: 3 }, 
            overflow: 'auto',
            transition: 'background-color 0.3s ease'
          }}
        >
          <Container maxWidth="xl">
            <Dashboard 
              currentUser={currentUser}
              updateUserKeyPair={updateUserKeyPair}
              messages={messages}
              addMessage={addMessage}
              users={users}
              selectedRecipient={selectedRecipient}
            />
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
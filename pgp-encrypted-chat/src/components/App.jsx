import React, { useState } from 'react';
import Layout from './Layout';
import users from '../data/users';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import getTheme from '../theme';

const App = () => {
  // State for dark/light mode
  const [themeMode, setThemeMode] = useState('light');
  
  // State for storing user's keys and current selection
  const [usersState, setUsersState] = useState(users);
  const [currentUser, setCurrentUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  
  // Function to toggle dark/light theme
  const toggleTheme = () => {
    setThemeMode(prevMode => prevMode === 'light' ? 'dark' : 'light');
  };
  
  // Modified function to handle user selection and get their current keys
  const handleSelectUser = (user) => {
    setCurrentUser(user);
    // Reset recipient if we select the same user
    if (selectedRecipient && selectedRecipient.id === user.id) {
      setSelectedRecipient(null);
    }
  };
  
  // Update user's key pair
  const updateUserKeyPair = (userId, publicKey, privateKey, passphrase) => {
    setUsersState(prevUsers => 
      prevUsers.map(user => 
        user.id === userId 
          ? { ...user, publicKey, privateKey, passphrase }
          : user
      )
    );
    
    // Also update current user if it's the same one
    if (currentUser && currentUser.id === userId) {
      setCurrentUser(prev => ({ ...prev, publicKey, privateKey, passphrase }));
    }
  };
  
  // Function to add a new message to the inbox
  const addMessage = (message) => {
    setMessages([...messages, message]);
  };

  return (
    <ThemeProvider theme={getTheme(themeMode)}>
      <CssBaseline />
      <Layout 
        users={usersState}
        currentUser={currentUser}
        setCurrentUser={handleSelectUser}
        updateUserKeyPair={updateUserKeyPair}
        messages={messages}
        addMessage={addMessage}
        selectedRecipient={selectedRecipient}
        setSelectedRecipient={setSelectedRecipient}
        toggleTheme={toggleTheme}
        themeMode={themeMode}
      />
    </ThemeProvider>
  );
};

export default App;
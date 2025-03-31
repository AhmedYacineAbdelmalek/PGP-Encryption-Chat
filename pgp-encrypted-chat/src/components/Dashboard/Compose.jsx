import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  FormControlLabel,
  Switch,
  Typography, 
  Alert,
  Paper,
  CircularProgress,
  Divider
} from '@mui/material';
import { encryptMessage } from '../../services/cryptoService';

const Compose = ({ currentUser, keyPair, selectedRecipient, addMessage }) => {
  const [message, setMessage] = useState('');
  const [passphrase, setPassphrase] = useState('');
  const [signMessage, setSignMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [encryptedResult, setEncryptedResult] = useState('');
  
  const handleEncrypt = async () => {
    if (!selectedRecipient) {
      setError('Please select a recipient first');
      return;
    }
    
    if (!selectedRecipient.publicKey) {
      setError('The recipient needs to generate their key pair first');
      return;
    }
    
    if (!message) {
      setError('Please enter a message');
      return;
    }
    
    if (signMessage && (!keyPair.privateKey || !passphrase)) {
      setError('To sign the message, you need to generate your key pair and enter your passphrase');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      const result = await encryptMessage(
        message,
        selectedRecipient.publicKey,
        signMessage,
        signMessage ? keyPair.privateKey : null,
        signMessage ? passphrase : ''
      );
      
      if (result.success) {
        setEncryptedResult(result.encryptedMessage);
      } else {
        setError(result.error || 'Failed to encrypt message');
      }
    } catch (err) {
      setError('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSend = () => {
    if (encryptedResult && selectedRecipient && currentUser) {
      // Make sure to include the full user objects with their keys
      addMessage({
        from: currentUser,  // This already has publicKey and privateKey
        to: selectedRecipient,  // This already has publicKey and privateKey
        encryptedContent: encryptedResult,
        date: new Date(),
        signed: signMessage
      });
      
      // Reset form
      setMessage('');
      setPassphrase('');
      setSignMessage(false);
      setEncryptedResult('');
      
      // Show success alert
      alert(`Message sent to ${selectedRecipient.name}!`);
    }
  };
  
  // Pre-fill passphrase if stored with the user
  const handleSignToggle = (e) => {
    setSignMessage(e.target.checked);
    if (e.target.checked && currentUser && currentUser.passphrase) {
      setPassphrase(currentUser.passphrase);
    }
  };
  
  return (
    <Box>
      {!currentUser ? (
        <Alert severity="info">
          Please select a user from the sidebar first
        </Alert>
      ) : (
        <>
          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Compose Encrypted Message
            </Typography>
            
            {!selectedRecipient ? (
              <Alert severity="info" sx={{ mb: 2 }}>
                Please select a recipient from the sidebar
              </Alert>
            ) : (
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Sending to: <strong>{selectedRecipient.name} ({selectedRecipient.email})</strong>
              </Typography>
            )}
            
            <TextField
              label="Your Message"
              multiline
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            
            <FormControlLabel
              control={
                <Switch
                  checked={signMessage}
                  onChange={handleSignToggle}
                  disabled={!keyPair.privateKey}
                />
              }
              label={
                <Typography variant="body2">
                  Sign message (verifies your identity to the recipient)
                </Typography>
              }
            />
            
            {signMessage && (
              <TextField
                label="Your Private Key Passphrase"
                type="password"
                value={passphrase}
                onChange={(e) => setPassphrase(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
                size="small"
              />
            )}
            
            <Button 
              variant="contained" 
              color="primary"
              onClick={handleEncrypt}
              disabled={loading || !message || !selectedRecipient || (selectedRecipient && !selectedRecipient.publicKey)}
              sx={{ mt: 2 }}
            >
              {loading ? <CircularProgress size={24} /> : 'Encrypt Message'}
            </Button>
            
            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}
          </Paper>
          
          {encryptedResult && (
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Encrypted Message
              </Typography>
              
              <TextField
                multiline
                rows={8}
                fullWidth
                value={encryptedResult}
                InputProps={{
                  readOnly: true,
                  sx: { fontFamily: 'monospace', fontSize: '0.8rem', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }
                }}
                sx={{ mb: 2 }}
              />
              
              <Button 
                variant="contained" 
                color="success"
                onClick={handleSend}
              >
                Send Message
              </Button>
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="subtitle2" gutterBottom>
                About PGP Encryption:
              </Typography>
              
              <Typography variant="body2" color="text.secondary">
                This message has been encrypted with the recipient's public key. 
                Only they can decrypt it with their matching private key.
                {signMessage && ' You have also digitally signed this message, which proves to the recipient that it came from you.'}
              </Typography>
            </Paper>
          )}
        </>
      )}
    </Box>
  );
};

export default Compose;
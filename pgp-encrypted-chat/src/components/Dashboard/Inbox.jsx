import React, { useState } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  List, 
  ListItem, 
  ListItemText,
  TextField,
  Button,
  Alert,
  Divider,
  CircularProgress
} from '@mui/material';
import { decryptMessage } from '../../services/cryptoService';

const Inbox = ({ messages, currentUser, keyPair }) => {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [passphrase, setPassphrase] = useState('');
  const [decryptedContent, setDecryptedContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [verification, setVerification] = useState({ verified: false, checked: false });
  
  // Filter messages for current user
  const userMessages = currentUser 
    ? messages.filter(msg => msg.to && msg.to.id === currentUser.id)
    : [];
    
    const handleDecrypt = async () => {
        if (!keyPair.privateKey) {
          setError('You need to generate a key pair first');
          return;
        }
        
        if (!selectedMessage.from.publicKey) {
          setError("The sender hasn't generated a public key, so signature verification isn't possible");
        }
        
        try {
          setLoading(true);
          setError('');
          
          // Pass the sender's public key for signature verification
          const result = await decryptMessage(
            selectedMessage.encryptedContent,
            keyPair.privateKey,
            passphrase,
            selectedMessage.from.publicKey // Add sender's public key here
          );
          
          if (result.success) {
            setDecryptedContent(result.decryptedMessage);
            setVerification({ verified: result.verified, checked: true });
          } else {
            setError(result.error || 'Failed to decrypt message');
          }
        } catch (err) {
          setError('Error: ' + err.message);
        } finally {
          setLoading(false);
        }
 };
  
  return (
    <Box>
      {!currentUser ? (
        <Alert severity="info">
          Please select a user from the sidebar first
        </Alert>
      ) : !keyPair.privateKey ? (
        <Alert severity="warning">
          Generate keys first to decrypt messages
        </Alert>
      ) : userMessages.length === 0 ? (
        <Alert severity="info">No messages in your inbox</Alert>
      ) : (
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Your Messages
          </Typography>
          
          <List dense sx={{ bgcolor: 'background.paper', mb: 2 }}>
            {userMessages.map((message, index) => (
              <ListItem 
                key={index} 
                button 
                onClick={() => {
                  setSelectedMessage(message);
                  setDecryptedContent('');
                  setError('');
                }}
                selected={selectedMessage === message}
                divider
              >
                <ListItemText
                  primary={`From: ${message.from.name}`}
                  secondary={message.date ? message.date.toLocaleString() : 'Unknown date'}
                />
              </ListItem>
            ))}
          </List>
          
          {selectedMessage && (
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Decrypt Message with Your Private Key
              </Typography>
              
              <Alert severity="info" sx={{ mb: 2 }}>
                Your private key will decrypt this message. Enter your passphrase to unlock your private key.
              </Alert>
              
              <TextField
                type="password"
                label="Passphrase to unlock your private key"
                value={passphrase}
                onChange={(e) => setPassphrase(e.target.value)}
                fullWidth
                margin="normal"
                size="small"
              />
              
              <Button
                variant="contained"
                onClick={handleDecrypt}
                disabled={loading || !passphrase}
              >
                {loading ? <CircularProgress size={24} /> : 'Decrypt with Private Key'}
              </Button>
              
              {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {error}
                </Alert>
              )}
              
              {decryptedContent && (
                <Box sx={{ mt: 2 }}>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle2">Decrypted Message:</Typography>
                  <Paper variant="outlined" sx={{ p: 2, mt: 1 }}>
                    <Typography sx={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                       {decryptedContent}
                     </Typography>
                 </Paper>
                  
                  {verification.checked && (
                    <Alert 
                      severity={verification.verified ? "success" : "info"} 
                      sx={{ mt: 1 }}
                    >
                      {verification.verified 
                        ? "Message signature verified! The sender's identity is confirmed." 
                        : "Message was not signed or signature could not be verified."}
                    </Alert>
                  )}
                </Box>
              )}
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Inbox;
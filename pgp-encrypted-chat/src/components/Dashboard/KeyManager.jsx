import React, { useState, useEffect } from 'react';
import { 
  TextField, 
  Button, 
  Alert, 
  Typography,
  Box,
  CircularProgress,
  Paper,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
  Card,
  CardContent,
  Divider
} from '@mui/material';
import { Visibility, VisibilityOff, Key } from '@mui/icons-material';
import { generateKeyPair } from '../../services/cryptoService';

const KeyManager = ({ currentUser, updateUserKeyPair }) => {
  const [passphrase, setPassphrase] = useState('');
  const [confirmPassphrase, setConfirmPassphrase] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showPassphrase, setShowPassphrase] = useState(false);
  const [showStoredPassphrase, setShowStoredPassphrase] = useState(false);
  
  // Reset state when user changes
  useEffect(() => {
    setPassphrase('');
    setConfirmPassphrase('');
    setError('');
    setSuccess(false);
    setShowStoredPassphrase(false);
  }, [currentUser?.id]);
  
  const handlePassphraseChange = (e) => {
    setPassphrase(e.target.value);
    setError('');
  };
  
  const handleConfirmPassphraseChange = (e) => {
    setConfirmPassphrase(e.target.value);
    setError('');
  };
  
  const handleClickShowPassphrase = () => {
    setShowPassphrase(!showPassphrase);
  };

  const handleToggleStoredPassphrase = () => {
    setShowStoredPassphrase(!showStoredPassphrase);
  };
  
  const handleGenerateKeys = async () => {
    if (!currentUser) {
      setError('Please select a user first');
      return;
    }
    
    if (passphrase.length < 8) {
      setError('Passphrase must be at least 8 characters long');
      return;
    }
    
    if (passphrase !== confirmPassphrase) {
      setError('Passphrases do not match');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      setSuccess(false);
      
      const { name, email } = currentUser;
      const result = await generateKeyPair(name, email, passphrase);
      
      if (result.success) {
        updateUserKeyPair(
          currentUser.id, 
          result.publicKey, 
          result.privateKey,
          passphrase // Store passphrase with user
        );
        setSuccess(true);
      } else {
        setError(result.error || 'Failed to generate keys');
      }
    } catch (err) {
      setError('An error occurred: ' + err.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Box>
      <Typography variant="body2" sx={{ mb: 2 }}>
        Generate a public/private key pair for secure communication.
        The passphrase will be used to protect your private key.
      </Typography>
      
      {currentUser.publicKey ? (
        <>
          <Alert severity="success" sx={{ mb: 2 }}>
            You already have a key pair generated
          </Alert>
          
          {/* Display saved passphrase */}
          <Card variant="outlined" sx={{ mb: 2, bgcolor: 'rgba(76, 175, 80, 0.08)' }}>
            <CardContent>
              <Typography variant="subtitle2" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                <Key sx={{ mr: 1, fontSize: 20 }} />
                Your Saved Passphrase
              </Typography>
              
              <FormControl fullWidth variant="outlined" size="small">
                <OutlinedInput
                  type={showStoredPassphrase ? 'text' : 'password'}
                  value={currentUser.passphrase || ''}
                  readOnly
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleToggleStoredPassphrase}
                        edge="end"
                      >
                        {showStoredPassphrase ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText>
                  You'll need this passphrase to use your private key
                </FormHelperText>
              </FormControl>
            </CardContent>
          </Card>
        </>
      ) : (
        <>
          <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
            <InputLabel htmlFor="passphrase">Passphrase</InputLabel>
            <OutlinedInput
              id="passphrase"
              type={showPassphrase ? 'text' : 'password'}
              value={passphrase}
              onChange={handlePassphraseChange}
              disabled={loading}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassphrase}
                    edge="end"
                  >
                    {showPassphrase ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Passphrase"
            />
            <FormHelperText>
              Use a strong passphrase (at least 8 characters)
            </FormHelperText>
          </FormControl>
          
          <TextField
            fullWidth
            type="password"
            label="Confirm Passphrase"
            variant="outlined"
            value={confirmPassphrase}
            onChange={handleConfirmPassphraseChange}
            disabled={loading}
            sx={{ mb: 2 }}
          />
          
          <Button
            variant="contained"
            color="primary"
            onClick={handleGenerateKeys}
            disabled={loading || !passphrase}
            fullWidth
            sx={{ mb: 2 }}
          >
            {loading ? <CircularProgress size={24} /> : 'Generate Key Pair'}
          </Button>
        </>
      )}
      
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>Key pair generated successfully!</Alert>}
      
      {currentUser.publicKey && (
        <Paper variant="outlined" sx={{ p: 2, mt: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
            Your Public Key
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={6}
            value={currentUser.publicKey} // Show full key, not truncated
            variant="outlined"
            InputProps={{
              readOnly: true,
              sx: { fontFamily: 'monospace', fontSize: '0.75rem' }
            }}
          />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Your public key can be shared with others to receive encrypted messages.
          </Typography>
        </Paper>
      )}
      
      {currentUser.privateKey && (
        <Paper variant="outlined" sx={{ p: 2, mt: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
            Your Private Key (keep secret!)
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={6}
            value={currentUser.privateKey} // Show full key, not truncated
            variant="outlined"
            InputProps={{
              readOnly: true,
              sx: { fontFamily: 'monospace', fontSize: '0.75rem' }
            }}
          />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Never share your private key! It's used to decrypt messages sent to you
            and to sign messages you send.
          </Typography>
        </Paper>
      )}
      
      <Box sx={{ mt: 2 }}>
        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle2" gutterBottom>
          About PGP Keys:
        </Typography>
        <Typography variant="body2" color="text.secondary">
          In PGP encryption, your private key is used both for decrypting messages sent to you 
          and for signing messages you send to others. The passphrase doesn't decrypt messages directly - 
          it unlocks your private key, which then decrypts the messages.
        </Typography>
      </Box>
    </Box>
  );
};

export default KeyManager;
import React, { useState, useEffect } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Box, 
  Chip, 
  Avatar, 
  IconButton, 
  Tooltip,
  useTheme
} from '@mui/material';
import { 
  LockOutlined, 
  Brightness4, 
  Brightness7,
  Shield 
} from '@mui/icons-material';

const Header = ({ currentUser, toggleTheme, themeMode }) => {
  const theme = useTheme();
  const [animate, setAnimate] = useState(false);
  
  // Animation effect when user changes
  useEffect(() => {
    if (currentUser) {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 500);
      return () => clearTimeout(timer);
    }
  }, [currentUser?.id]);

  return (
    <AppBar 
      position="static" 
      elevation={0}
      sx={{
        background: theme.palette.mode === 'light'
          ? 'linear-gradient(90deg, #6200EA 0%, #7C4DFF 100%)'
          : 'linear-gradient(90deg, #311B92 0%, #512DA8 100%)',
        borderRadius: 0,
      }}
    >
      <Toolbar sx={{ px: { xs: 2, md: 4 } }}>
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: 2,
            p: 1,
            pl: 1.5,
            mr: 2,
            boxShadow: 'inset 0px 0px 0px 1px rgba(255,255,255,0.2)'
          }}
        >
          <Shield sx={{ 
            mr: 1.5, 
            fontSize: 28,
            animation: animate ? 'pulse 0.5s ease-in-out' : 'none',
            '@keyframes pulse': {
              '0%': { transform: 'scale(1)' },
              '50%': { transform: 'scale(1.2)' },
              '100%': { transform: 'scale(1)' }
            }
          }} />
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              fontWeight: 700,
              background: 'linear-gradient(90deg, #FFFFFF 0%, rgba(255,255,255,0.8) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '0.5px'
            }}
          >
            CYPHERMAIL
          </Typography>
        </Box>
        
        <Box sx={{ flexGrow: 1 }} />
        
        <Tooltip title={`Switch to ${themeMode === 'light' ? 'dark' : 'light'} mode`}>
          <IconButton 
            onClick={toggleTheme} 
            sx={{ 
              color: '#ffffff', 
              mr: 2,
              bgcolor: 'rgba(255,255,255,0.1)',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.2)',
              }
            }}
          >
            {themeMode === 'light' ? <Brightness4 /> : <Brightness7 />}
          </IconButton>
        </Tooltip>
        
        {currentUser && (
          <Chip
            avatar={
              <Avatar 
                sx={{ 
                  bgcolor: theme.palette.secondary.main,
                  boxShadow: '0 0 0 2px rgba(255,255,255,0.5)',
                  transition: 'all 0.3s ease',
                  animation: animate ? 'appear 0.5s ease-in-out' : 'none',
                  '@keyframes appear': {
                    '0%': { transform: 'scale(0)' },
                    '80%': { transform: 'scale(1.1)' },
                    '100%': { transform: 'scale(1)' }
                  }
                }}
              >
                {currentUser.name.charAt(0)}
              </Avatar>
            }
            label={`${currentUser.name}`}
            sx={{ 
              bgcolor: 'rgba(255,255,255,0.15)', 
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.3)',
              color: 'white',
              fontWeight: 600,
              pr: 2,
              height: 40,
              '& .MuiChip-label': {
                px: 1.5
              },
              transition: 'all 0.3s ease',
              animation: animate ? 'slideIn 0.3s ease-in-out' : 'none',
              '@keyframes slideIn': {
                '0%': { transform: 'translateX(20px)', opacity: 0 },
                '100%': { transform: 'translateX(0)', opacity: 1 }
              }
            }}
          />
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
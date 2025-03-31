import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  List, 
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Paper,
  Badge,
  Tooltip,
  IconButton,
  useTheme,
  alpha,
  Chip
} from '@mui/material';
import { 
  Person, 
  PersonOutline, 
  CheckCircle, 
  LockOpen, 
  Lock, 
  Security,
  KeyOff,
  Key
} from '@mui/icons-material';

const Sidebar = ({ users, currentUser, setCurrentUser, selectedRecipient, setSelectedRecipient }) => {
  const theme = useTheme();
  const [hoveredUser, setHoveredUser] = useState(null);

  // Generate gradient based on theme
  const gradientBg = theme.palette.mode === 'light'
    ? 'linear-gradient(135deg, rgba(240, 242, 255, 0.8), rgba(255, 255, 255, 0.9))'
    : 'linear-gradient(135deg, rgba(25, 32, 72, 0.4), rgba(25, 32, 72, 0.2))';

  return (
    <Paper 
      elevation={theme.palette.mode === 'light' ? 1 : 0}
      sx={{ 
        width: 280,
        height: '100%',
        borderRadius: 0,
        borderRight: `1px solid ${theme.palette.divider}`,
        display: 'flex',
        flexDirection: 'column',
        bgcolor: theme.palette.mode === 'light' 
          ? alpha(theme.palette.background.paper, 0.9)
          : alpha(theme.palette.background.paper, 0.4),
        backgroundImage: gradientBg,
        backdropFilter: 'blur(8px)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '120px',
          background: theme.palette.mode === 'light'
            ? 'linear-gradient(180deg, rgba(41, 121, 255, 0.08) 0%, rgba(41, 121, 255, 0) 100%)'
            : 'linear-gradient(180deg, rgba(41, 121, 255, 0.15) 0%, rgba(41, 121, 255, 0) 100%)',
          zIndex: 0,
        }
      }}
    >
      <Box sx={{ 
        p: 3, 
        pb: 2, 
        position: 'sticky', 
        top: 0, 
        zIndex: 2, 
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid',
        borderColor: theme.palette.mode === 'light' 
          ? alpha(theme.palette.divider, 0.5)
          : alpha(theme.palette.divider, 0.2),
        background: theme.palette.mode === 'light'
          ? 'rgba(255, 255, 255, 0.8)'
          : 'rgba(18, 18, 18, 0.8)',
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Security sx={{ 
            fontSize: 20, 
            color: theme.palette.primary.main, 
            mr: 1.5 
          }} />
          <Typography 
            variant="subtitle1" 
            sx={{ 
              fontWeight: 700,
              color: theme.palette.mode === 'light' 
                ? theme.palette.primary.main 
                : theme.palette.primary.light,
              letterSpacing: '0.02em',
            }}
          >
            SELECT YOUR IDENTITY
          </Typography>
        </Box>
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            opacity: 0.8,
            fontStyle: 'italic'
          }}
        >
          Choose which user you want to be
        </Typography>
      </Box>
      
      <Box sx={{ 
        overflowY: 'auto', 
        flexGrow: 1,
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: theme.palette.mode === 'light' 
            ? alpha(theme.palette.primary.main, 0.2)
            : alpha(theme.palette.primary.main, 0.3),
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: 'transparent',
        }
      }}>
        <List sx={{ px: 2, py: 1 }}>
          {users.map((user) => (
            <ListItem key={user.id} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                selected={currentUser?.id === user.id}
                onClick={() => setCurrentUser(user)}
                onMouseEnter={() => setHoveredUser(user.id)}
                onMouseLeave={() => setHoveredUser(null)}
                sx={{
                  borderRadius: 2,
                  bgcolor: currentUser?.id === user.id
                    ? theme.palette.mode === 'light'
                      ? alpha(theme.palette.primary.main, 0.1)
                      : alpha(theme.palette.primary.main, 0.2)
                    : 'transparent',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: currentUser?.id === user.id ? 'scale(1.01)' : 'scale(1)',
                  '&:hover': {
                    bgcolor: currentUser?.id === user.id
                      ? theme.palette.mode === 'light'
                        ? alpha(theme.palette.primary.main, 0.15)
                        : alpha(theme.palette.primary.main, 0.25)
                      : theme.palette.mode === 'light'
                        ? alpha(theme.palette.action.hover, 0.8)
                        : alpha(theme.palette.action.hover, 0.3),
                    transform: 'translateX(3px) scale(1.01)'
                  },
                  '&.Mui-selected': {
                    bgcolor: theme.palette.mode === 'light'
                      ? alpha(theme.palette.primary.main, 0.1)
                      : alpha(theme.palette.primary.main, 0.2),
                  }
                }}
              >
                <ListItemAvatar>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent={
                      user.publicKey ? (
                        <Tooltip title="Has Encryption Keys">
                          <Key sx={{ 
                            fontSize: 14,
                            color: 'white',
                            backgroundColor: theme.palette.success.main,
                            borderRadius: '50%',
                            padding: '2px',
                            boxShadow: '0 0 0 2px ' + theme.palette.background.paper,
                          }} />
                        </Tooltip>
                      ) : (
                        <Tooltip title="No Encryption Keys">
                          <KeyOff sx={{ 
                            fontSize: 14, 
                            color: 'white',
                            backgroundColor: theme.palette.text.secondary,
                            borderRadius: '50%',
                            padding: '2px',
                            boxShadow: '0 0 0 2px ' + theme.palette.background.paper,
                          }} />
                        </Tooltip>
                      )
                    }
                  >
                    <Avatar
                      sx={{
                        bgcolor: currentUser?.id === user.id
                          ? theme.palette.primary.main
                          : theme.palette.mode === 'light'
                            ? alpha(theme.palette.primary.light, 0.4)
                            : alpha(theme.palette.primary.dark, 0.3),
                        color: currentUser?.id === user.id
                          ? 'white'
                          : theme.palette.text.primary,
                        transition: 'all 0.3s',
                        transform: hoveredUser === user.id ? 'scale(1.1)' : 'scale(1)',
                        boxShadow: currentUser?.id === user.id
                          ? `0 0 0 2px ${theme.palette.background.paper}, 0 0 0 4px ${alpha(theme.palette.primary.main, 0.3)}`
                          : hoveredUser === user.id 
                            ? `0 0 0 2px ${theme.palette.background.paper}` 
                            : 'none'
                      }}
                    >
                      {user.name.charAt(0).toUpperCase()}
                    </Avatar>
                  </Badge>
                </ListItemAvatar>
                <ListItemText
                  primary={user.name}
                  secondary={
                    <Typography variant="body2" noWrap component="span" sx={{ display: 'block' }}>
                      {user.email}
                    </Typography>
                  }
                  primaryTypographyProps={{
                    fontWeight: currentUser?.id === user.id ? 600 : 400,
                    color: currentUser?.id === user.id 
                      ? theme.palette.primary.main
                      : theme.palette.text.primary
                  }}
                />
                
                {currentUser?.id === user.id && (
                  <Chip 
                    label="You" 
                    size="small"
                    color="primary"
                    variant="outlined"
                    sx={{ 
                      fontSize: '0.65rem', 
                      height: 20,
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.5)}`
                    }} 
                  />
                )}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        
        <Divider 
          sx={{ 
            my: 2,
            '&::before, &::after': {
              borderColor: alpha(theme.palette.divider, 0.5),
            }
          }}
        />
        
        {currentUser && (
          <>
            <Box sx={{ 
              p: 3, 
              pb: 2, 
              position: 'sticky',
              zIndex: 1,
              backdropFilter: 'blur(8px)',
              background: theme.palette.mode === 'light'
                ? 'rgba(255, 255, 255, 0.7)'
                : 'rgba(18, 18, 18, 0.7)',
              borderTop: '1px solid',
              borderBottom: '1px solid',
              borderColor: theme.palette.mode === 'light' 
                ? alpha(theme.palette.divider, 0.5)
                : alpha(theme.palette.divider, 0.2),
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Lock sx={{ 
                  fontSize: 20, 
                  color: theme.palette.secondary.main, 
                  mr: 1.5 
                }} />
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    mb: 0.5, 
                    fontWeight: 700,
                    color: theme.palette.mode === 'light' 
                      ? theme.palette.secondary.main 
                      : theme.palette.secondary.light,
                    letterSpacing: '0.02em',
                  }}
                >
                  SELECT RECIPIENT
                </Typography>
              </Box>
              <Typography 
                variant="body2" 
                color="text.secondary" 
                sx={{ 
                  opacity: 0.8,
                  fontStyle: 'italic'
                }}
              >
                Choose who to send your message to
              </Typography>
            </Box>
            
            <List sx={{ px: 2, py: 1 }}>
              {users.filter(user => user.id !== currentUser.id).length > 0 ? (
                users.filter(user => user.id !== currentUser.id).map((user) => (
                  <ListItem key={user.id} disablePadding sx={{ mb: 0.5 }}>
                    <ListItemButton
                      selected={selectedRecipient?.id === user.id}
                      onClick={() => setSelectedRecipient(user)}
                      onMouseEnter={() => setHoveredUser(user.id)}
                      onMouseLeave={() => setHoveredUser(null)}
                      disabled={!user.publicKey}
                      sx={{
                        borderRadius: 2,
                        bgcolor: selectedRecipient?.id === user.id
                          ? theme.palette.mode === 'light'
                            ? alpha(theme.palette.secondary.main, 0.1)
                            : alpha(theme.palette.secondary.main, 0.2)
                          : 'transparent',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        transform: selectedRecipient?.id === user.id ? 'scale(1.01)' : 'scale(1)',
                        opacity: !user.publicKey ? 0.6 : 1,
                        '&:hover': {
                          bgcolor: !user.publicKey 
                            ? undefined
                            : selectedRecipient?.id === user.id
                              ? theme.palette.mode === 'light'
                                ? alpha(theme.palette.secondary.main, 0.15)
                                : alpha(theme.palette.secondary.main, 0.25)
                              : theme.palette.mode === 'light'
                                ? alpha(theme.palette.action.hover, 0.8)
                                : alpha(theme.palette.action.hover, 0.3),
                          transform: !user.publicKey 
                            ? undefined 
                            : 'translateX(3px) scale(1.01)'
                        },
                        '&.Mui-selected': {
                          bgcolor: theme.palette.mode === 'light'
                            ? alpha(theme.palette.secondary.main, 0.1)
                            : alpha(theme.palette.secondary.main, 0.2),
                        },
                        '&.Mui-disabled': {
                          opacity: 0.5,
                        }
                      }}
                    >
                      <ListItemAvatar>
                        <Badge
                          overlap="circular"
                          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                          badgeContent={
                            user.publicKey ? (
                              <Tooltip title="Has Encryption Keys">
                                <Key sx={{ 
                                  fontSize: 14,
                                  color: 'white',
                                  backgroundColor: theme.palette.success.main,
                                  borderRadius: '50%',
                                  padding: '2px',
                                  boxShadow: '0 0 0 2px ' + theme.palette.background.paper,
                                }} />
                              </Tooltip>
                            ) : (
                              <Tooltip title="No Encryption Keys - Can't send messages">
                                <KeyOff sx={{ 
                                  fontSize: 14, 
                                  color: 'white',
                                  backgroundColor: theme.palette.text.secondary,
                                  borderRadius: '50%',
                                  padding: '2px',
                                  boxShadow: '0 0 0 2px ' + theme.palette.background.paper,
                                }} />
                              </Tooltip>
                            )
                          }
                        >
                          <Avatar
                            sx={{
                              bgcolor: selectedRecipient?.id === user.id
                                ? theme.palette.secondary.main
                                : theme.palette.mode === 'light'
                                  ? alpha(theme.palette.secondary.light, 0.4)
                                  : alpha(theme.palette.secondary.dark, 0.3),
                              color: selectedRecipient?.id === user.id
                                ? 'white'
                                : theme.palette.text.primary,
                              transition: 'all 0.3s',
                              transform: hoveredUser === user.id && user.publicKey ? 'scale(1.1)' : 'scale(1)',
                              boxShadow: selectedRecipient?.id === user.id
                                ? `0 0 0 2px ${theme.palette.background.paper}, 0 0 0 4px ${alpha(theme.palette.secondary.main, 0.3)}`
                                : hoveredUser === user.id && user.publicKey
                                  ? `0 0 0 2px ${theme.palette.background.paper}` 
                                  : 'none',
                              filter: !user.publicKey ? 'grayscale(1)' : 'none'
                            }}
                          >
                            {user.name.charAt(0).toUpperCase()}
                          </Avatar>
                        </Badge>
                      </ListItemAvatar>
                      <ListItemText
                        primary={user.name}
                        secondary={
                          <Box component="span">
                            {user.email}
                            {!user.publicKey && (
                              <Typography 
                                variant="caption" 
                                sx={{ 
                                  display: 'block', 
                                  color: theme.palette.error.main,
                                  mt: 0.5
                                }}
                              >
                                Needs to generate keys first
                              </Typography>
                            )}
                          </Box>
                        }
                        primaryTypographyProps={{
                          fontWeight: selectedRecipient?.id === user.id ? 600 : 400,
                          color: !user.publicKey
                            ? theme.palette.text.disabled
                            : selectedRecipient?.id === user.id 
                              ? theme.palette.secondary.main
                              : theme.palette.text.primary
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))
              ) : (
                <Box 
                  sx={{ 
                    p: 3, 
                    textAlign: 'center',
                    color: theme.palette.text.secondary
                  }}
                >
                  <Typography variant="body2">
                    No other users available
                  </Typography>
                </Box>
              )}
            </List>
          </>
        )}
      </Box>
      
      <Box sx={{ 
        p: 2, 
        borderTop: '1px solid',
        borderColor: theme.palette.divider,
        textAlign: 'center',
        backgroundColor: theme.palette.mode === 'light'
          ? alpha(theme.palette.background.paper, 0.8)
          : alpha(theme.palette.background.paper, 0.4),
      }}>
        <Typography variant="caption" color="text.secondary">
          PGP Secure Messenger &copy; {new Date().getFullYear()}
        </Typography>
      </Box>
    </Paper>
  );
};

export default Sidebar;
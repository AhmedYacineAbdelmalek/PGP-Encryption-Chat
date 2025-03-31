import { createTheme, alpha } from '@mui/material/styles';

const getTheme = (mode = 'light') => {
  // Custom color palette
  const primaryMain = mode === 'light' ? '#6200EA' : '#9D6AFF';
  const secondaryMain = mode === 'light' ? '#00B8D4' : '#64FFDA';
  
  // Background colors
  const backgroundDefault = mode === 'light' ? '#F8F9FC' : '#0A1929';
  const backgroundPaper = mode === 'light' ? '#FFFFFF' : '#132F4C';
  
  // Accent colors
  const accentColor1 = mode === 'light' ? '#FF5757' : '#FF7676'; 
  const accentColor2 = mode === 'light' ? '#00C853' : '#69F0AE';

  return createTheme({
    palette: {
      mode,
      primary: {
        main: primaryMain,
        light: mode === 'light' ? '#9E67FF' : '#B794FF',
        dark: mode === 'light' ? '#4800B0' : '#7F42DB',
      },
      secondary: {
        main: secondaryMain,
        light: mode === 'light' ? '#64FFDA' : '#84FFFF',
        dark: mode === 'light' ? '#008BA3' : '#00A0BA',
      },
      background: {
        default: backgroundDefault,
        paper: backgroundPaper,
      },
      error: {
        main: '#FF5252',
      },
      success: {
        main: '#00C853',
      },
      custom: {
        accent1: accentColor1,
        accent2: accentColor2,
        boxInbox: mode === 'light' 
          ? 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)' 
          : 'linear-gradient(135deg, #0D3354 0%, #0F4C81 100%)',
        boxKeys: mode === 'light'
          ? 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)'
          : 'linear-gradient(135deg, #0A2E0F 0%, #1B5E20 100%)',
        boxCompose: mode === 'light'
          ? 'linear-gradient(135deg, #E0F7FA 0%, #B2EBF2 100%)'
          : 'linear-gradient(135deg, #00363A 0%, #006064 100%)',
        glassMorphism: mode === 'light'
          ? 'rgba(255, 255, 255, 0.9)'
          : 'rgba(23, 58, 94, 0.8)',
      },
    },
    typography: {
      fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
      h1: {
        fontWeight: 700,
      },
      h2: {
        fontWeight: 700,
      },
      h3: {
        fontWeight: 600,
      },
      h4: {
        fontWeight: 600,
      },
      h5: {
        fontWeight: 600,
        letterSpacing: '0.5px',
      },
      h6: {
        fontWeight: 600,
        letterSpacing: '0.25px',
      },
      subtitle1: {
        fontWeight: 500,
        letterSpacing: '0.15px',
      },
      subtitle2: {
        fontWeight: 500,
        letterSpacing: '0.1px',
      },
      button: {
        fontWeight: 600,
        letterSpacing: '0.5px',
        textTransform: 'none',
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            scrollbarColor: mode === 'light' ? "#BFBFBF transparent" : "#454545 transparent",
            "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
              width: 8,
              height: 8,
              backgroundColor: mode === 'light' ? "transparent" : "transparent",
            },
            "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
              borderRadius: 8,
              backgroundColor: mode === 'light' ? "#BFBFBF" : "#454545",
              border: "none",
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            borderRadius: 16,
            boxShadow: mode === 'light' 
              ? '0px 10px 30px rgba(0, 0, 0, 0.05)'
              : '0px 10px 30px rgba(0, 0, 0, 0.2)',
          },
          elevation1: {
            boxShadow: mode === 'light'
              ? '0px 4px 20px rgba(0, 0, 0, 0.05)'
              : '0px 4px 20px rgba(0, 0, 0, 0.3)',
          },
          elevation2: {
            boxShadow: mode === 'light'
              ? '0px 8px 25px rgba(0, 0, 0, 0.08)'
              : '0px 8px 25px rgba(0, 0, 0, 0.35)',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            background: mode === 'light'
              ? 'linear-gradient(90deg, #6200EA 0%, #7C4DFF 100%)'
              : 'linear-gradient(90deg, #311B92 0%, #512DA8 100%)',
            boxShadow: mode === 'light'
              ? '0px 4px 20px rgba(98, 0, 234, 0.15)'
              : '0px 4px 20px rgba(0, 0, 0, 0.5)',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            padding: '8px 18px',
            boxShadow: 'none',
            textTransform: 'none',
            transition: 'transform 0.15s ease-in-out, background 0.3s ease-in-out',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: mode === 'light'
                ? '0px 6px 15px rgba(0, 0, 0, 0.1)'
                : '0px 6px 15px rgba(0, 0, 0, 0.5)',
            },
            '&:active': {
              transform: 'translateY(0)',
            },
          },
          containedPrimary: {
            background: `linear-gradient(90deg, ${primaryMain} 0%, ${alpha(primaryMain, 0.85)} 100%)`,
          },
          containedSecondary: {
            background: `linear-gradient(90deg, ${secondaryMain} 0%, ${alpha(secondaryMain, 0.85)} 100%)`,
          },
          outlined: {
            borderWidth: 2,
            '&:hover': {
              borderWidth: 2,
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 10,
            },
          },
        },
      },
      MuiTabs: {
        styleOverrides: {
          root: {
            borderRadius: '16px 16px 0 0',
            overflow: 'hidden',
          },
          indicator: {
            height: 4,
            borderRadius: '2px 2px 0 0',
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 600,
            transition: 'all 0.2s',
            padding: '12px 20px',
            '&.Mui-selected': {
              fontWeight: 700,
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 8,
          },
        },
      },
      MuiAlert: {
        styleOverrides: {
          root: {
            borderRadius: 10,
          },
        },
      },
    },
    shadows: [
      'none',
      '0px 2px 1px -1px rgba(0,0,0,0.1),0px 1px 1px 0px rgba(0,0,0,0.07),0px 1px 3px 0px rgba(0,0,0,0.06)',
      '0px 3px 3px -2px rgba(0,0,0,0.1),0px 2px 2px 0px rgba(0,0,0,0.07),0px 1px 5px 0px rgba(0,0,0,0.06)',
      // ... (keep the rest of the shadows)
    ],
  });
};

export default getTheme;
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1de9b6', 
      light: '#64ffda', 
      dark: '#00bfa5',  
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& label.Mui-focused': {
            color: '#1de9b6',
          },
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
              borderColor: '#1de9b6',
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
          padding: '8px 16px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
            backgroundColor: '#00bfa5', 
          },
        },
        contained: {
          backgroundColor: '#1de9b6',
        },
      },
    },
  },
  typography: {
    button: {
      textTransform: 'none', 
    },
  },
});

export default theme;

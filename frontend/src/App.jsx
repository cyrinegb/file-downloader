import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Paper, Box, Typography } from '@mui/material';
import AppBarComponent from './layouts/AppBar';
import FileList from './components/FileList';
import getTheme from './styles/theme';

function App() {
  const [darkMode, setDarkMode] = useState(false);
const theme = getTheme(darkMode ? 'dark' : 'light');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      {/* App Bar */}
      <AppBarComponent 
        darkMode={darkMode} 
        onToggleDarkMode={() => setDarkMode(!darkMode)} 
      />

      {/* Main Content */}
      <Container 
        maxWidth="xl" 
        sx={{ mt: 4, mb: 6, minHeight: '80vh' }}
      >
        <Paper 
          elevation={0}
          sx={{ 
            p: { xs: 2, md: 4 },
            borderRadius: 4,
            border: theme => `1px solid ${theme.palette.divider}`,
            boxShadow: darkMode 
              ? '0 8px 32px rgba(0,0,0,0.4)'
              : '0 8px 32px rgba(0,0,0,0.08)',
          }}
        >
          <FileList />
        </Paper>

        {/* Footer */}
        <Box 
          sx={{ 
            mt: 6, 
            textAlign: 'center',
            color: 'text.secondary',
            fontSize: '0.875rem'
          }}
        >
          <Typography variant="body2">
            💡 Application de téléchargement de fichiers - React & Material UI
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
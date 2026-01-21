import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Brightness4,
  Brightness7,
  CloudDownload
} from '@mui/icons-material';

const AppBarComponent = ({ darkMode, onToggleDarkMode }) => {
  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{
        background: darkMode 
          ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
          : 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
      }}
    >
      <Toolbar>
        <CloudDownload sx={{ mr: 2, fontSize: 32 }} />
        <Typography 
          variant="h5" 
          component="div" 
          sx={{ 
            flexGrow: 1, 
            fontWeight: 700,
            letterSpacing: '0.5px'
          }}
        >
          File Downloader
        </Typography>
        
        <Tooltip title={darkMode ? "Mode Clair" : "Mode Sombre"}>
          <IconButton 
            color="inherit" 
            onClick={onToggleDarkMode}
            sx={{
              bgcolor: 'rgba(255,255,255,0.1)',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.2)',
              }
            }}
          >
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;
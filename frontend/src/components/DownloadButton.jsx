import React from 'react';
import { Button, CircularProgress } from '@mui/material';
import { Download } from '@mui/icons-material';

const DownloadButton = ({ fileName, onDownload, isDownloading, fullWidth = false }) => {
  return (
    <Button
      variant={isDownloading ? "outlined" : "contained"}
      color="primary"
      size="small"
      fullWidth={fullWidth}
      startIcon={
        isDownloading ? (
          <CircularProgress size={18} thickness={5} color="inherit" />
        ) : (
          <Download />
        )
      }
      sx={{
        minWidth: fullWidth ? 'auto' : 140,
        fontWeight: 600,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: !isDownloading && 'scale(1.05)',
        },
      }}
      onClick={() => onDownload(fileName)}
      disabled={isDownloading}
    >
      {isDownloading ? 'En cours...' : 'Télécharger'}
    </Button>
  );
};

export default DownloadButton;
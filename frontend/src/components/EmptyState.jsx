import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { InsertDriveFile, Search, ErrorOutline } from '@mui/icons-material';

const EmptyState = ({ type = 'empty', searchTerm = '', onClear, onRetry }) => {
  const states = {
    empty: {
      icon: <InsertDriveFile sx={{ fontSize: 100, color: 'action.disabled', mb: 2 }} />,
      title: 'Aucun fichier disponible',
      description: 'Ajoutez des fichiers dans le dossier backend/files/',
      action: onRetry && (
        <Button variant="outlined" onClick={onRetry} sx={{ mt: 3 }}>
          Actualiser
        </Button>
      )
    },
    search: {
      icon: <Search sx={{ fontSize: 100, color: 'action.disabled', mb: 2 }} />,
      title: `Aucun résultat pour "${searchTerm}"`,
      description: 'Essayez avec d\'autres mots-clés',
      action: onClear && (
        <Button variant="text" onClick={onClear} sx={{ mt: 2 }}>
          Effacer la recherche
        </Button>
      )
    },
    error: {
      icon: <ErrorOutline sx={{ fontSize: 100, color: 'error.main', mb: 2 }} />,
      title: 'Une erreur est survenue',
      description: 'Impossible de charger les fichiers',
      action: onRetry && (
        <Button variant="contained" color="error" onClick={onRetry} sx={{ mt: 3 }}>
          Réessayer
        </Button>
      )
    }
  };

  const state = states[type] || states.empty;

  return (
    <Box sx={{ textAlign: 'center', py: 8 }}>
      {state.icon}
      <Typography variant="h5" color="text.secondary" gutterBottom>
        {state.title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {state.description}
      </Typography>
      {state.action}
    </Box>
  );
};

export default EmptyState;
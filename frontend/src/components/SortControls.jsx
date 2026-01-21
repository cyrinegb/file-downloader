import React from 'react';
import { ToggleButtonGroup, ToggleButton, Tooltip, Box, Typography } from '@mui/material';
import { SortByAlpha, CalendarToday, Storage } from '@mui/icons-material';

const SortControls = ({ sortBy, sortOrder, onSortChange }) => {
  const handleSort = (newSortBy) => {
    onSortChange(newSortBy);
  };

  return (
    <Box>
      <ToggleButtonGroup
        value={sortBy}
        exclusive
        onChange={(e, newSort) => newSort && handleSort(newSort)}
        size="small"
        sx={{
          '& .MuiToggleButton-root': {
            px: 2,
          }
        }}
      >
        <ToggleButton value="name">
          <Tooltip title={`Trier par nom ${sortOrder === 'asc' ? '↑' : '↓'}`} arrow>
            <SortByAlpha />
          </Tooltip>
        </ToggleButton>
        <ToggleButton value="size">
          <Tooltip title={`Trier par taille ${sortOrder === 'asc' ? '↑' : '↓'}`} arrow>
            <Storage />
          </Tooltip>
        </ToggleButton>
        <ToggleButton value="date">
          <Tooltip title={`Trier par date ${sortOrder === 'asc' ? '↑' : '↓'}`} arrow>
            <CalendarToday />
          </Tooltip>
        </ToggleButton>
      </ToggleButtonGroup>
      
      <Typography 
        variant="caption" 
        sx={{ ml: 2, color: 'text.secondary', display: { xs: 'none', sm: 'inline' } }}
      >
        {sortOrder === 'asc' ? 'Croissant ↑' : 'Décroissant ↓'}
      </Typography>
    </Box>
  );
};

export default SortControls;
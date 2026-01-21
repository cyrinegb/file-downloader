import React from 'react';
import { ToggleButtonGroup, ToggleButton, Tooltip } from '@mui/material';
import { ViewModule, ViewList } from '@mui/icons-material';

const ViewToggle = ({ view, onChange }) => {
  return (
    <ToggleButtonGroup
      value={view}
      exclusive
      onChange={(e, newView) => newView && onChange(newView)}
      size="small"
      sx={{
        '& .MuiToggleButton-root': {
          px: 2,
        }
      }}
    >
      <ToggleButton value="grid">
        <Tooltip title="Vue Grille" arrow>
          <ViewModule />
        </Tooltip>
      </ToggleButton>
      <ToggleButton value="table">
        <Tooltip title="Vue Tableau" arrow>
          <ViewList />
        </Tooltip>
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default ViewToggle;
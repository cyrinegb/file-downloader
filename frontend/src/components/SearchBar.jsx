import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';

const SearchBar = ({ value, onChange, placeholder = "Rechercher un fichier..." }) => {
  return (
    <TextField
      fullWidth
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        ),
      }}
      sx={{ 
        maxWidth: { md: 500 },
        '& .MuiOutlinedInput-root': {
          borderRadius: 3,
        }
      }}
    />
  );
};

export default SearchBar;
import React from 'react';
import {Card,CardContent,CardActions,Typography,Chip,Box,Stack, Tooltip} from '@mui/material';
import { Storage, CalendarToday } from '@mui/icons-material';
import DownloadButton from './DownloadButton';
import { formatSize, formatDate } from '../utils/formatters';
import { getFileIcon } from '../utils/constants';
const FileCard = ({ file, onDownload, isDownloading }) => {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: 8,
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
        <Box sx={{ mb: 2 }}>
          {getFileIcon(file.type)}
        </Box>
        <Tooltip title={file.name} arrow placement="top">
          <Typography 
            variant="h6" 
            noWrap 
            sx={{ 
              fontWeight: 600, 
              mb: 1, 
              fontSize: '1rem',
              cursor: 'default'
            }}
          >
            {file.name}
          </Typography>
        </Tooltip>
        <Chip 
          label={file.type?.toUpperCase() || 'N/A'} 
          size="small" 
          color="primary" 
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <Stack spacing={1} sx={{ textAlign: 'left' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Storage fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              {formatSize(file.size)}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CalendarToday fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary" noWrap>
              {formatDate(file.last_modified)}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
      <CardActions sx={{ p: 2, pt: 0 }}>
        <DownloadButton
          fileName={file.name}
          onDownload={onDownload}
          isDownloading={isDownloading}
          fullWidth
        />
      </CardActions>
    </Card>
  );
};

export default FileCard;
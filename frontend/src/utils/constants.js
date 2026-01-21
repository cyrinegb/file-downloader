import React from 'react';
import {
  PictureAsPdf,
  Image,
  Description,
  InsertDriveFile,
 
} from '@mui/icons-material';
export const FILE_ICONS = {
  // Documents
  pdf: <PictureAsPdf sx={{ fontSize: 48, color: '#d32f2f' }} />,
  doc: <Description sx={{ fontSize: 48, color: '#1565c0' }} />,
  docx: <Description sx={{ fontSize: 48, color: '#1565c0' }} />,
  txt: <Description sx={{ fontSize: 48, color: '#757575' }} />,
  
  png: <Image sx={{ fontSize: 48, color: '#1976d2' }} />,
  jpg: <Image sx={{ fontSize: 48, color: '#1976d2' }} />,
  jpeg: <Image sx={{ fontSize: 48, color: '#1976d2' }} />,
  gif: <Image sx={{ fontSize: 48, color: '#1976d2' }} />,
  svg: <Image sx={{ fontSize: 48, color: '#1976d2' }} />,

  default: <InsertDriveFile sx={{ fontSize: 48, color: '#9e9e9e' }} />
};

/**
 * @param {string} type - Extension du fichier
 * @returns {JSX.Element} Icône React
 */
export const getFileIcon = (type) => {
  return FILE_ICONS[type?.toLowerCase()] || FILE_ICONS.default;
};
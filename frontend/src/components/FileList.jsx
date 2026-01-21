import React, { useState, useMemo } from 'react';
import {
  Box,Alert,Snackbar,Typography,Stack,Chip,Grid,LinearProgress,Button,} from '@mui/material';
import { DataGrid, GridToolbar, getGridStringOperators } from '@mui/x-data-grid';
import {InsertDriveFile, CheckCircle, Storage, Error as ErrorIcon} from '@mui/icons-material';
import FileCard from './FileCard';
import DownloadButton from './DownloadButton';
import SearchBar from './SearchBar';
import ViewToggle from './ViewToggle';
import SortControls from './SortControls';
import EmptyState from './EmptyState';
import SkeletonLoader from './SkeletonLoader';
import { useFiles } from '../hooks/useFiles';
import { downloadFile } from '../services/api';
import { formatSize, formatDate } from '../utils/formatters';
import { getFileIcon } from '../utils/constants';
// Fonction de conversion en octets
const convertToBytes = (value, unit) => {
  if (!value) return null;
  const num = parseFloat(value);
  if (isNaN(num)) return null;
  switch (unit) {
    case 'KB': return num * 1024;
    case 'MB': return num * 1024 * 1024;
    case 'GB': return num * 1024 * 1024 * 1024;
    default: return num; // octets
  }
};
const SizeFilterInput = (props) => {
  const { item, applyValue, focusElementRef } = props;
  const [inputValue, setInputValue] = useState(item.value ? (item.value / (1024 * 1024)).toString() : '');
  const [unit, setUnit] = useState('MB');
  const handleFilterChange = (value, selectedUnit) => {
    setInputValue(value);
    if (value === '') {
      applyValue({ ...item, value: null });
    } else {
      const bytes = convertToBytes(value, selectedUnit);
      applyValue({ ...item, value: bytes });
    }
  };
    const handleInputChange = (event) => {
    const value = event.target.value;
    handleFilterChange(value, unit);
  };
  const handleUnitChange = (event) => {
    const newUnit = event.target.value;
    setUnit(newUnit);
    handleFilterChange(inputValue, newUnit);
  };
  return (
    <Box sx={{ display: 'flex', gap: 1, p: 1, alignItems: 'center' }}>
      <input
        ref={focusElementRef}
        type="number"
        placeholder="Taille..."
        value={inputValue}
        onChange={handleInputChange}
        style={{
          padding: '8px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          width: '100px',
          fontSize: '14px'
        }}
      />
      <select
        value={unit}
        onChange={handleUnitChange}
        style={{
          padding: '8px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          fontSize: '14px',
          backgroundColor: 'white'
        }}
      >
        <option value="KB">KB</option>
        <option value="MB">MB</option>
        <option value="GB">GB</option>
      </select>
    </Box>
  );
};

const getSizeFilterOperators = () => [
  {
    label: 'Égal à',
    value: '=',
    getApplyFilterFn: (filterItem) => {
      if (!filterItem.value) return null;
      
      return (params) => {
        const fileSize = params.value || 0;
        const filterSize = filterItem.value;
        return Math.abs(fileSize - filterSize) < 1024;
      };
    },
    InputComponent: SizeFilterInput,
  },
  {
    label: 'Supérieur à',
    value: '>',
    getApplyFilterFn: (filterItem) => {
      if (!filterItem.value) return null;
      
      return (params) => {
        const fileSize = params.value || 0;
        return fileSize > filterItem.value;
      };
    },
    InputComponent: SizeFilterInput,
  },
  {
    label: 'Inférieur à',
    value: '<',
    getApplyFilterFn: (filterItem) => {
      if (!filterItem.value) return null;
      
      return (params) => {
        const fileSize = params.value || 0;
        return fileSize < filterItem.value;
      };
    },
    InputComponent: SizeFilterInput,
  },
  {
    label: 'Différent de',
    value: '!=',
    getApplyFilterFn: (filterItem) => {
      if (!filterItem.value) return null;
      
      return (params) => {
        const fileSize = params.value || 0;
        const filterSize = filterItem.value;
        return Math.abs(fileSize - filterSize) > 1024;
      };
    },
    InputComponent: SizeFilterInput,
  },
];
const FileList = () => {
  // États globaux
  const { files, loading, error, refetch } = useFiles();
  const [downloading, setDownloading] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  // États de filtrage et tri
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' ou 'table'
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  // Gestion du téléchargement
  const handleDownload = async (fileName) => {
    setDownloading(prev => ({ ...prev, [fileName]: true }));
    try {
      await downloadFile(fileName);
      showSnackbar(`✅ ${fileName} téléchargé avec succès !`, 'success');
    } catch (err) {
      showSnackbar(`❌ ${err.message}`, 'error');
    } finally {
      setDownloading(prev => ({ ...prev, [fileName]: false }));
    }
  };
  const showSnackbar = (message, severity = 'info') => {
    setSnackbar({ open: true, message, severity });
  };
  // Gestion du tri
  const handleSortChange = (newSortBy) => {
    if (sortBy === newSortBy) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('asc');
    }
  };
  // Filtrage et tri des fichiers
  const filteredAndSortedFiles = useMemo(() => {
    let result = [...files];
    // Filtrage par recherche
    if (searchTerm) {
      result = result.filter(file =>
        file.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    // Tri
    result.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'size':
          comparison = (a.size || 0) - (b.size || 0);
          break;
        case 'date':
          comparison = new Date(a.last_modified || 0) - new Date(b.last_modified || 0);
          break;
        default:
          comparison = 0;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });
    return result;
  }, [files, searchTerm, sortBy, sortOrder]);
  // Colonnes pour le DataGrid
  const columns = [
    {
      field: 'name',
      headerName: 'Nom du fichier',
      flex: 1,
      minWidth: 250,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{ '& svg': { fontSize: 32 } }}>
            {getFileIcon(params.row.type)}
          </Box>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {params.value}
          </Typography>
        </Box>
      ),
      filterOperators: getGridStringOperators().filter(op => ['contains', 'equals', 'startsWith', 'endsWith'].includes(op.value)),
    },
    {
      field: 'type',
      headerName: 'Type',
      width: 100,
      renderCell: (params) => (
        <Chip
          label={params.value?.toUpperCase() || 'N/A'}
          size="small"
          color="primary"
          variant="outlined"
        />
      ),
     filterOperators: getGridStringOperators().filter(op => ['equals'].includes(op.value)),
    },
    {
      field: 'size',
      headerName: 'Taille',
      width: 130,
      align: 'right',
      headerAlign: 'right',
      valueFormatter: (params) => params.value != null ? formatSize(params.value) : '—',
      type: 'number',
 filterOperators: getSizeFilterOperators(),
    },
    {
      field: 'last_modified',
      headerName: 'Modifié le',
      flex: 0.8,
      minWidth: 180,
      valueGetter: (params) => params.value ? new Date(params.value) : null, // <-- important
      valueFormatter: (params) => params.value ? formatDate(params.value) : '—',
      type: 'date',
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 160,
      sortable: false,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (
        <DownloadButton
          fileName={params.row.name}
          onDownload={handleDownload}
          isDownloading={downloading[params.row.name]}
        />
      ),
      filterable: false, 
    },
  ];
  if (loading) {
    return (
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
          Chargement des fichiers...
        </Typography>
        <LinearProgress sx={{ mb: 3 }} />
        <SkeletonLoader count={6} />
      </Box>
    );
  }
  if (error) {
    return (
      <Alert
        severity="error"
        icon={<ErrorIcon fontSize="large" />}
        action={
          <Button variant="contained" size="small" onClick={refetch}>
            Réessayer
          </Button>
        }
        sx={{ borderRadius: 3 }}
      >
        <Typography variant="h6" gutterBottom>
          {error}
        </Typography>
        <Typography variant="body2">
          Vérifiez que le serveur backend est démarré sur http://localhost:5000
        </Typography>
      </Alert>
    );
  }
  if (files.length === 0) {
    return <EmptyState type="empty" onRetry={refetch} />;
  }
  return (
    <Box>
      
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Mes Fichiers
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
          <Chip
            icon={<InsertDriveFile />}
            label={`${filteredAndSortedFiles.length} fichier${filteredAndSortedFiles.length > 1 ? 's' : ''}`}
            color="primary"
          />

          <Chip
            icon={<Storage />}
            label={`${formatSize(
              files.reduce((acc, f) => acc + (f.size || 0), 0)
            )} total`}
            variant="outlined"
          />
        </Stack>

    
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={2}
          alignItems={{ xs: 'stretch', md: 'center' }}
        >
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
          />

          <Stack direction="row" spacing={1} sx={{ flexShrink: 0 }}>
            <ViewToggle view={viewMode} onChange={setViewMode} />
            {viewMode === 'grid' && (
              <SortControls
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSortChange={handleSortChange}
              />
            )}
          </Stack>
        </Stack>
      </Box>
      {/* === VUE TABLEAU === */}
      {viewMode === 'table' && (
        <Box sx={{
          height: 650,
          width: '100%',
          '& .MuiDataGrid-root': { border: 'none', borderRadius: 3 },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: 'primary.main',
            color: 'white',
            fontSize: '1rem',
            fontWeight: 700,
            borderRadius: '12px 12px 0 0',
          },
          '& .MuiDataGrid-columnHeaderTitle': { fontWeight: 700 },
          '& .MuiDataGrid-row': {
            '&:hover': { backgroundColor: 'action.hover', cursor: 'pointer' },
          },
          '& .MuiDataGrid-cell': { borderBottom: '1px solid', borderColor: 'divider', fontSize: '0.95rem' },
          '& .MuiDataGrid-cell:focus': { outline: 'none' },
          '& .MuiDataGrid-footerContainer': { borderTop: '2px solid', borderColor: 'divider' },
        }}>
          <DataGrid
            rows={filteredAndSortedFiles}
            columns={columns}
            getRowId={(row) => row.id}
            slots={{ toolbar: GridToolbar }}
            initialState={{
              pagination: { paginationModel: { pageSize: 10 } },
            }}
            pageSizeOptions={[5, 10, 25, 50]}
            disableRowSelectionOnClick
            autoHeight={false}
            density="comfortable"
            sx={{ boxShadow: 2, borderRadius: 3 }}
          />
        </Box>
      )}
      {/* === VUE GRILLE === */}
      {viewMode === 'grid' && (
        <>
          {filteredAndSortedFiles.length > 0 ? (
            <Grid container spacing={3}>
              {filteredAndSortedFiles.map((file) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={file.id}>
                  <FileCard
                    file={file}
                    onDownload={handleDownload}
                    isDownloading={downloading[file.name]}
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            <EmptyState
              type="search"
              searchTerm={searchTerm}
              onClear={() => setSearchTerm('')}
            />
          )}
        </>
      )}
      {/* === SNACKBAR (Notifications) === */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
          icon={snackbar.severity === 'success' ? <CheckCircle /> : <ErrorIcon />}
          sx={{ borderRadius: 2 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default FileList;

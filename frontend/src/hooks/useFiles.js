import { useState, useEffect } from 'react';
import { fetchFiles } from '../services/api';

/**
 * Hook personnalisé pour gérer la récupération des fichiers
 * @returns {Object} État des fichiers, loading, erreur et fonction de rechargement
 */
export const useFiles = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadFiles = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchFiles();
      const filesWithMetadata = data.map((file, index) => ({
        ...file,
        id: file.name || `file-${index}`,
        type: file.type || file.name?.split('.').pop()?.toLowerCase() || 'unknown'
      }));
      
      setFiles(filesWithMetadata);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadFiles();
  }, []);

  return { 
    files, 
    loading, 
    error, 
    refetch: loadFiles 
  };
};
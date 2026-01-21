import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

/**
 * @returns {Promise<Array>} Liste des fichiers
 * @throws {Error} En cas d'erreur réseau ou serveur
 */
export const fetchFiles = async () => {
  try {
    const response = await axios.get(`${API_BASE}/api/files`, {
      timeout: 10000 // 10 secondes
    });
    return response.data;
  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      throw new Error('⏱️ Timeout : Le serveur met trop de temps à répondre');
    }
    if (error.response) {
      throw new Error(`🔴 Erreur serveur (${error.response.status})`);
    }
    if (error.request) {
      throw new Error('🌐 Erreur réseau : Impossible de contacter le serveur');
    }
    throw new Error('❌ Erreur inconnue lors du chargement des fichiers');
  }
};

/**
 * @param {string} name - Nom du fichier à télécharger
 * @throws {Error} En cas d'erreur de téléchargement
 */
export const downloadFile = async (name) => {
  try {
    const response = await axios.get(
      `${API_BASE}/download/${encodeURIComponent(name)}`, 
      { 
        responseType: 'blob',
        timeout: 60000 // 60 secondes pour les gros fichiers
      }
    ); 
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', name);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error('📁 Fichier introuvable sur le serveur');
    }
    if (error.code === 'ECONNABORTED') {
      throw new Error('⏱️ Téléchargement trop long (timeout)');
    }
    if (error.request) {
      throw new Error('🌐 Erreur réseau pendant le téléchargement');
    }
    throw new Error('❌ Erreur lors du téléchargement');
  }
};
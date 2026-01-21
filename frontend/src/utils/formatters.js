/**
 * @param {number} bytes - Taille en bytes
 * @returns {string} Taille formatée (ex: "1.5 MB")
 */
export const formatSize = (bytes) => {
  if (bytes == null || bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * @param {string} isoString - Date au format ISO
 * @returns {string} Date formatée (ex: "15 janv. 2025, 10:32")
 */
export const formatDate = (isoString) => {
  if (!isoString) return 'N/A';
  const date = new Date(isoString);
  
  if (isNaN(date.getTime())) return 'Date invalide';
  
  return new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};
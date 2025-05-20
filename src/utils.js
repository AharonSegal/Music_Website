// utils.js - NEW FILE
// Utility function to get correct paths for GitHub Pages

/**
 * Returns the correct path for assets when deployed to GitHub Pages
 * 
 * @param {string} path - The path to the asset
 * @returns {string} - The correct path for the current environment
 */
export const getAssetPath = (path) => {
  // If the path already starts with http or https, return it as is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  
  // In development, the path might need to be different
  if (process.env.NODE_ENV === 'development') {
    return path;
  }
  
  // For GitHub Pages deployment, we might need to adjust the path
  // The repository name is extracted from the homepage
  const homepage = process.env.PUBLIC_URL || '';
  
  // If the path already includes the repository name, return it as is
  if (path.includes('/Music_Website/')) {
    return path;
  }
  
  // Make sure the path starts with a slash
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // Return the path with the homepage prefix
  return `${homepage}${normalizedPath}`;
};

export default {
  getAssetPath
};
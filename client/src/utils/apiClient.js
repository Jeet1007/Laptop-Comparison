import axios from 'axios';

/**
 * Makes API requests to Noteb API with proper formatting for both local and production environments
 */
export async function makeNotebRequest(requestData) {
  const API_URL = import.meta.env.PROD 
    ? import.meta.env.VITE_API_URL_PROD 
    : import.meta.env.VITE_API_URL;
    
  // For local development, convert JSON to FormData
  if (!import.meta.env.PROD) {
    const formData = new FormData();
    Object.keys(requestData).forEach(key => {
      formData.append(key, requestData[key]);
    });
    
    return axios.post(API_URL, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
  }
  
  // For production, send as JSON (handled by serverless function)
  return axios.post(API_URL, requestData);
}
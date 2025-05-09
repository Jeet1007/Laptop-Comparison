import axios from 'axios';

const API_URL = import.meta.env.PROD 
  ? import.meta.env.VITE_API_URL_PROD 
  : import.meta.env.VITE_API_URL;

export async function fetchLaptopInfo(modelId) {
  try {
    const requestData = {
      apikey: import.meta.env.VITE_API_KEY,
      method: "get_model_info_all",
      "param[model_id]": modelId
    };
    
    const response = await axios.post(API_URL, requestData);
    return response.data.result[0];
  } catch (error) {
    console.error("Error fetching laptop info:", error);
    throw error;
  }
}

export async function searchLaptops(searchQuery) {
  try {
    const requestData = {
      apikey: import.meta.env.VITE_API_KEY,
      method: "list_models",
      "param[model_name]": searchQuery
    };
    
    const response = await axios.post(API_URL, requestData);
    return response.data.result || [];
  } catch (error) {
    console.error("Error searching laptops:", error);
    throw error;
  }
}
import axios from 'axios';
import formidable from 'formidable';
import { createReadStream } from 'fs';
import FormData from 'form-data';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Extract form data from the request body
    const formData = new URLSearchParams();
    
    // Add all fields from the request body to the form data
    if (req.body) {
      Object.keys(req.body).forEach(key => {
        formData.append(key, req.body[key]);
      });
    }
    
    // Forward the request to noteb.com
    const response = await fetch('https://noteb.com/api/webservice.php', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    
    // Get response data
    const data = await response.json();
    
    // Return response
    return res.status(200).json(data);
  } catch (error) {
    console.error('API proxy error:', error);
    return res.status(500).json({ 
      error: 'Failed to proxy request',
      details: error.message 
    });
  }
}
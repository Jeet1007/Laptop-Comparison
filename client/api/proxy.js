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
    console.log('Request received:', req.method);
    
    // Forward to noteb.com API using URLSearchParams
    const formData = new URLSearchParams();
    
    // Add all fields from the request body
    if (req.body && typeof req.body === 'object') {
      Object.keys(req.body).forEach(key => {
        formData.append(key, req.body[key]);
      });
    }
    
    console.log('Sending to noteb.com:', Object.fromEntries(formData));
    
    const response = await fetch('https://noteb.com/api/webservice.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData
    });
    
    if (!response.ok) {
      throw new Error(`Noteb API responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('API proxy error:', error);
    return res.status(500).json({ 
      error: error.message,
      stack: process.env.NODE_ENV !== 'production' ? error.stack : undefined
    });
  }
}
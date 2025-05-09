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
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    console.log('Request received:', req.method);
    console.log('Request body:', req.body);
    
    // Forward to noteb.com API
    const response = await fetch('https://noteb.com/api/webservice.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(req.body)
    });
    
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('API proxy error:', error);
    return res.status(500).json({ error: error.message });
  }
}
import axios from 'axios';

export default async function handler(req, res) {
  // Set CORS headers to allow requests from your domain
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Forward the request data to noteb.com
    const response = await axios.post(
      'https://noteb.com/api/webservice.php',
      req.body,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    
    // Return the response data
    return res.status(200).json(response.data);
  } catch (error) {
    console.error('API proxy error:', error);
    return res.status(500).json({ 
      error: 'Failed to proxy request',
      details: error.message 
    });
  }
}
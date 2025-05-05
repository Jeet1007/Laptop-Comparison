const axios = require('axios');
require('dotenv').config();

async function updateIP() {
  try {
    const ipRes = await axios.get('https://checkip.amazonaws.com');
    const currentIP = ipRes.data.trim();

    const response = await axios.post(
      `https://cloud.mongodb.com/api/atlas/v1.0/groups/${process.env.ATLAS_PROJECT_ID}/accessList`,
      [
        {
          ipAddress: currentIP,
          comment: "Auto-added IP for project"
        }
      ],
      {
        auth: {
          username: process.env.ATLAS_PUBLIC_KEY,
          password: process.env.ATLAS_PRIVATE_KEY
        }
      }
    );

    console.log(`✅ IP ${currentIP} added to MongoDB Atlas successfully.`);
  } catch (error) {
    console.error("❌ Failed to update IP in MongoDB Atlas:", error.response?.data || error.message);
  }
}

updateIP();

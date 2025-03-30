const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch'); // for forwarding to Google Sheets

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Google Sheets Web App URL (replace if needed)
const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbxOTLbmRENYKwfIXGwkPEzQ24PKqjA6uXZlcccUkw92wn6PID0S8NrKczfc2mQi72I6/exec';

// Log root request
app.get('/', (req, res) => {
  res.send('✅ Expo Quiz backend is running. Use POST /submit to send quiz data.');
});

// Handle quiz submissions
app.post('/submit', async (req, res) => {
  const data = req.body;
  console.log("📥 Received submission:", data);

  try {
    const response = await fetch(GOOGLE_SHEET_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    console.log("✅ Forwarded to Google Sheets");
    res.status(200).send('✅ Forwarded to Google Sheet');
  } catch (err) {
    console.error('❌ Error forwarding:', err);
    res.status(500).send('Server error');
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

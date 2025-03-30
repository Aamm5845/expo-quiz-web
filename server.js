const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch'); // required for sending to Google Sheets

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Your live Google Sheet webhook
const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbxOTLbmRENYKwfIXGwkPEzQ24PKqjA6uXZlcccUkw92wn6PID0S8NrKczfc2mQi72I6/exec';

app.post('/submit', async (req, res) => {
  const data = req.body;

  try {
    const response = await fetch(GOOGLE_SHEET_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    res.status(200).send('✅ Forwarded to Google Sheet');
  } catch (err) {
    console.error('❌ Error forwarding:', err);
    res.status(500).send('Server error');
  }
});

app.get('/', (req, res) => {
  res.send('Quiz backend is live. Use POST /submit to send data.');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

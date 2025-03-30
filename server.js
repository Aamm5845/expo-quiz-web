const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const DATA_FILE = 'submissions.json';

let submissions = [];
if (fs.existsSync(DATA_FILE)) {
  const fileData = fs.readFileSync(DATA_FILE);
  submissions = JSON.parse(fileData);
}

app.post('/submit', (req, res) => {
  const submission = req.body;
  submission.timestamp = new Date().toISOString();

  submissions.push(submission);

  fs.writeFile(DATA_FILE, JSON.stringify(submissions, null, 2), (err) => {
    if (err) {
      console.error('Error writing to file', err);
      return res.status(500).send('Server error');
    }
    res.status(200).send('Submission saved');
  });
});

app.get('/submissions', (req, res) => {
  res.json(submissions);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API route to get listing data
app.get('/api/listing', (req, res) => {
  const dataPath = path.join(__dirname, 'data', 'listingData.json');
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading listing data:', err);
      return res.status(500).json({ error: 'Failed to read listing data' });
    }
    res.json(JSON.parse(data));
  });
});

app.listen(PORT, () => {
  console.log(`Airbnb backend API running at http://localhost:${PORT}`);
});

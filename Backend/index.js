const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 5000;

// Enable CORS for frontend communication
app.use(cors());

// Endpoint to get images with filters
app.get('/api/image', async (req, res) => {
  const { grayscale, blur } = req.query;

  let url = 'https://picsum.photos/200/300';

  // Append filters if provided
  if (grayscale === 'true') {
    url += '?grayscale';
  }

  if (blur) {
    url += grayscale === 'true' ? `&blur=${blur}` : `?blur=${blur}`;
  }

  try {
    const response = await axios.get(url, {
      responseType: 'arraybuffer',
    });

    // Set response headers and send the image
    res.set('Content-Type', 'image/jpeg');
    res.send(response.data);
  } catch (error) {
    console.error('Error fetching image:', error);
    res.status(500).send('Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [grayscale, setGrayscale] = useState(false);
  const [blur, setBlur] = useState(0);
  const [image, setImage] = useState('');

  const fetchImage = async () => {
    const params = new URLSearchParams();
    if (grayscale) params.append('grayscale', 'true');
    if (blur) params.append('blur', blur);

    const response = await axios.get(`http://localhost:5000/api/image?${params.toString()}`, {
      responseType: 'blob',
    });

    const imageUrl = URL.createObjectURL(response.data);
    setImage(imageUrl);
  };

  return (
    <div>
      <h1>Random Image Generator</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchImage();
        }}
      >
        <label>
          Grayscale:
          <input
            type="checkbox"
            checked={grayscale}
            onChange={(e) => setGrayscale(e.target.checked)}
          />
        </label>
        <br />
        <label>
          Blur (1-10):
          <input
            type="number"
            min="0"
            max="10"
            value={blur}
            onChange={(e) => setBlur(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Generate Image</button>
      </form>
      {image && (
        <div>
          <h2>Generated Image:</h2>
          <img src={image} alt="Random" />
        </div>
      )}
    </div>
  );
}

export default App;

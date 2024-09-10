import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [grayscale, setGrayscale] = useState(false);
  const [blur, setBlur] = useState(0);
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false); // For "Processing..." state
  const [randomImages, setRandomImages] = useState([]);

  // Fetch random images for the sliding effect on page load
  useEffect(() => {
    const fetchRandomImages = async () => {
      const imagesArray = [];
      for (let i = 0; i < 5; i++) {
        const response = await axios.get('https://picsum.photos/800/600', { responseType: 'blob' });
        const imageUrl = URL.createObjectURL(response.data);
        imagesArray.push(imageUrl);
      }
      setRandomImages(imagesArray);
      setLoading(false);
    };
    fetchRandomImages();
  }, []);

  // Fetch the random image with the selected filters
  const fetchImage = async () => {
    const params = new URLSearchParams();
    if (grayscale) params.append('grayscale', 'true');
    if (blur) params.append('blur', blur);

    try {
      setProcessing(true); // Start processing
      const response = await axios.get(`http://localhost:5000/api/image?${params.toString()}`, {
        responseType: 'blob',
      });

      const imageUrl = URL.createObjectURL(response.data);
      setImage(imageUrl);
    } catch (error) {
      console.error('Error fetching image:', error);
    } finally {
      setProcessing(false); // End processing
    }
  };

  return (
    <div className="relative min-h-screen bg-primary text-white">
      {/* Loading Screen */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-secondary">
          <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-blue-500"></div>
        </div>
      )}

      {/* Navbar */}
      <nav className="bg-secondary text-white py-4 fixed w-full z-10 shadow-lg">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="left text-2xl font-bold">RandomImage</div>
          <div className="right space-x-6">
            <a href="#about" className="hover:text-blue-400">About</a>
            <a href="#portfolio" className="hover:text-blue-400">Portfolio</a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 container mx-auto px-4">
        {/* Display Generated Image */}
        {image && (
          <div className="mb-8 text-center">
            <h2 className="text-2xl mb-4">Generated Image:</h2>
            <img src={image} alt="Random" className="rounded-lg shadow-lg mx-auto w-full max-w-md" />
          </div>
        )}

        {/* Form */}
        <div className="bg-secondary p-6 rounded-lg shadow-lg max-w-md mx-auto mb-8">
          <h2 className="text-2xl mb-4">Generate Random Image</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              fetchImage();
            }}
            className="space-y-4"
          >
            <div className="flex items-center">
              <label className="mr-2">Grayscale:</label>
              <input
                type="checkbox"
                checked={grayscale}
                onChange={(e) => setGrayscale(e.target.checked)}
                className="form-checkbox text-blue-500"
              />
            </div>
            <div>
              <label className="block mb-2">Blur (1-10):</label>
              <input
                type="number"
                min="0"
                max="10"
                value={blur}
                onChange={(e) => setBlur(e.target.value)}
                className="w-full p-2 rounded-lg border border-gray-500 bg-gray-800 text-white"
              />
            </div>

            {/* Button with processing spinner */}
            <div>
              {processing ? (
                <button type="button" class="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150 cursor-not-allowed" disabled="">
                Processing...
              </button>
              ) : (
                <button
                  type="submit"
                  className=" bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors h-12 w-24"
                >
                  Generate Image
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;

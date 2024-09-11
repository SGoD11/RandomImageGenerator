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
  }, [processing]);

  console.log("these are random image looks like", randomImages)
  // Fetch the random image with the selected filters
  const fetchImage = async () => {
    const params = new URLSearchParams();
    if (grayscale) params.append('grayscale', 'true');
    if (blur) params.append('blur', blur);

    try {
      setProcessing(true); // Start processing
      const response = await axios.get(`https://randomimagegenerator.onrender.com/api/image?${params.toString()}`, {
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
    <div className="relative min-h-screen bg-primary text-red-700 bg-slate-950">
      {/* Loading Screen */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-secondary h-full w-full bg-black">
          <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-red-500"></div>
        </div>
      )}

      {/* Navbar */}
      <nav className="bg-secondary text-white py-4 fixed w-full z-10 shadow-lg">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="left text-2xl font-bold">RandomImage</div>
          <div className="right space-x-6">
            <a href="#about" className="hover:text-green-400">About</a>
            <a href="#portfolio" className="hover:text-green-400">Portfolio</a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 container mx-auto px-4 grid grid-rows-2 grid-cols-1">

        {/* Form */}
        <div className="bg-secondary p-6 rounded-lg shadow-white max-w-md mx-auto mb-8 shadow-2xl">
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
                <button type="button" class=" bg-green-500 text-white py-2 rounded-lg hover:bg-green-600  h-12 w-36 transition ease-in-out duration-150 cursor-not-allowed" disabled="">
                  Processing...
                </button>
              ) : (
                <button
                  type="submit"
                  className=" bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors h-12 w-36"
                >
                  Generate Image
                </button>
              )}
            </div>
          </form>
        </div>

      </div>
      {/* Display Generated Image */}
      {image && (
        <div>
          <div className="mb-8 text-center">
            <h2 className="text-2xl mb-4">Generated Image:</h2>
            <img src={image} alt="Random" className="rounded-lg shadow-lg mx-auto w-full max-w-md" />
          </div>
          {/* Link Box with Copy Button */}
        <div className="mt-4 flex justify-center items-center">
          <input
            type="text"
            readOnly
            value={image} // The image source URL
            className="bg-gray-800 text-white p-2 rounded-l-lg w-64"
          />
          <button
            onClick={() => {
              navigator.clipboard.writeText(image);
              alert("Image URL copied to clipboard!");
            }}
            className="bg-indigo-500 text-white border-dashed hover:bg-indigo-600 transition-colors"
          >
            📋
          </button>
        </div>
        </div>
      )}

      {/* 5 generated already images */}
      <div className="pt-24 container mx-auto px-4">
        {/* Sliding Random Images */}
        <div className="overflow-hidden mb-8">
          <div className="flex space-x-4 animate-slide-left">
            {/* Duplicate the images array */}
            {[...randomImages, ...randomImages].map((image, index) => (
              <div key={index} className="flex-shrink-0">
                <img
                  src={image}
                  alt={`Random ${index}`}
                  className="rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm md:max-w-md"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;

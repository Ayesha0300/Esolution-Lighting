import { useEffect, useState } from 'react';

export default function ImageGallery() {
  const [images, setImages] = useState([]);
  
  useEffect(() => {
    const fetchImages = async () => {
      const PIXABAY_API_KEY = process.env.NEXT_PUBLIC_PIXABAY_API_KEY;
      const response = await fetch(
        `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=interior+lighting&image_type=photo`
      );
      const data = await response.json();
      
      const formattedImages = data.hits.map(img => ({
        id: img.id,
        src: img.webformatURL, // This will give you a valid, non-expiring URL
        alt: img.tags,
      }));
      
      setImages(formattedImages);
    };

    fetchImages();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {images.map((image) => (
        <div key={image.id} className="relative">
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-auto rounded-lg"
          />
        </div>
      ))}
    </div>
  );
} 
// Carousel.tsx

import React, { useState, useRef, useEffect } from 'react';
import './Carousel.css';

interface CarouselProps {
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const slideInterval = useRef<NodeJS.Timeout>();

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  useEffect(() => {
    slideInterval.current = setInterval(nextSlide, 3000); // Change slide every 3 seconds

    return () => {
      if (slideInterval.current) clearInterval(slideInterval.current);
    };
  }, [images]);

  return (
    <div className="carousel-container">
      {images.map((image, index) => (
        <div
          className={`carousel-slide ${index === currentIndex ? 'active' : ''}`}
          key={index}
        >
          <img src={image} alt={`Slide ${index}`} />
        </div>
      ))}
    </div>
  );
};

export default Carousel;
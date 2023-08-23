// Carousel.tsx
import React, { useState, useRef, useEffect } from 'react';
import './Carousel.css';
const Carousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const slideInterval = useRef();
    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };
    useEffect(() => {
        slideInterval.current = setInterval(nextSlide, 3000); // Change slide every 3 seconds
        return () => {
            if (slideInterval.current)
                clearInterval(slideInterval.current);
        };
    }, [images]);
    return (React.createElement("div", { className: "carousel-container" }, images.map((image, index) => (React.createElement("div", { className: `carousel-slide ${index === currentIndex ? 'active' : ''}`, key: index },
        React.createElement("img", { src: image, alt: `Slide ${index}` }))))));
};
export default Carousel;

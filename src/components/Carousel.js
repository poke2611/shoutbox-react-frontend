import React, { useState, useEffect } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import SimpleImageSlider from "react-simple-image-slider";
import '../css/Carousel.css';

const Carousel = ({ images }) => {

  const handleSlideChange = (e) => {
    // You can add any slide change handling logic here
  };

  useEffect(() => {
    console.log("Carousel images", images);
  }, []);

  return (
    <div className="carousel-wrapper">
      <AliceCarousel
       
       buttonsDisabled={false}
        mouseTracking
        onSlideChanged={handleSlideChange}
      >
        {images.map((image, index) => (
          <div key={index} className="carousel-slide">
            <img src={image} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </AliceCarousel>
      
    </div>
  );
};

export default Carousel;

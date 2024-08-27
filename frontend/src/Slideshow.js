import React from 'react';
import Slider from 'react-slick';
import './Slideshow.css'; // Add specific styles if needed

const Slideshow = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="slideshow">
      <Slider {...settings}>
        <div>
          <img src="path/to/your/image1.jpg" alt="Product 1" />
        </div>
        <div>
          <img src="path/to/your/image2.jpg" alt="Product 2" />
        </div>
        <div>
          <img src="path/to/your/image3.jpg" alt="Product 3" />
        </div>
        {/* Add more slides as needed */}
      </Slider>
    </div>
  );
};

export default Slideshow;

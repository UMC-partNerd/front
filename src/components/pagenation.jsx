import React from 'react';
import Slider from "react-slick";

function Pagenation () {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  
  return (
    <section>
      <Slider {...setting}>
        a
    	b
        c
      </Slider>
    </section>
    )
}

export default Pagenation;
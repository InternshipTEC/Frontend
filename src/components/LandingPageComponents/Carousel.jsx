import React from 'react'
import "./assets/Carousel.css"
import { useState } from "react";
import Slider from "react-slick";
import NightPre from "./assets/NightPre";
import BusChal from "./assets/BusChal";
import BusClass from "./assets/BusClass";

const elements = [<NightPre />, <BusChal />, <BusClass />, <NightPre />, <BusChal />];

const Carousel = () => {

  const [Index, setIndex] = useState(0);

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    lazyLoad: true,
    speed: 300,
    slidesToShow: 3,
    centerMode: true,
    focusOnSelect: true,
    centerPadding: 0,
    slidesToScroll: 1,
    beforeChange: (current, next) => setIndex(next),
    responsive: [
      {
        breakpoint: 930,
        settings: {
          arrows: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          centerPadding: "60px",
          dots: true,
        },
      },
    ],
  };
  return (
    <div className="Car">
      <Slider {...settings}>
        {elements.map((element, idx) => (
          <div className={idx === Index ? "slide activeSlide" : "slide"}>
            {element}
          </div>
        ))}
      </Slider>
    </div>
  );
}

 

export default Carousel

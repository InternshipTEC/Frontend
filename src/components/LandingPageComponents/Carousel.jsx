import React, { useEffect } from "react";
import "./assets/Carousel.css";
import { useState } from "react";
import Slider from "react-slick";
import NightPreneur from "../../blob/images/NightPre.png";
import BusinessClass from "../../blob/images/BusClass.png";
import BusinessChallenge from "../../blob/images/BusChal.png";
import Text from "../shared/Text";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const data = [
  {
    className: "elem",
    text: "Nightinternship",
    src: NightPreneur,
  },
  {
    className: "elem",
    text: "Business Class",
    src: BusinessClass,
  },
  {
    className: "buschal",
    text: "Business Challenge",
    src: BusinessChallenge,
  },
  {
    className: "elem",
    text: "Business Class",
    src: BusinessClass,
  },
  {
    className: "buschal",
    text: "Business Challenge",
    src: BusinessChallenge,
  },
];

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
          dots: false,
        },
      },
    ],
  };
  const controls = useAnimation();
  const [ref, inView] = useInView();
  const carousel = {
    hidden: { opacity: 0, x: 140 },
    visible: { opacity: 1, x: 0 },
  };
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);
  return (
    <motion.div ref={ref} animate={controls} initial="hidden" variants={carousel} transition={{ duration: 1.2 }}>
      <div className="Car">
        <Text type="primary" size={3} align="center">
          What we do
        </Text>
        <Slider {...settings}>
          {data.map((data, idx) => (
            <div className={idx === Index ? "slide activeSlide" : "slide"}>
              <div className={data.className}>
                <Text type="secondary" className="text">
                  {data.text}
                </Text>
                <img src={data.src} alt={data.text} />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </motion.div>
  );
};

export default Carousel;

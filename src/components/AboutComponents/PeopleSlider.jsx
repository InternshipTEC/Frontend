import React from "react";
import Slider from "react-slick";
import "./assets/Carousel.css";
import PeopleCard from "./PeopleCard";
import Text from "../shared/Text";

const data = [
  {
    name: "Business Knowledge",
    imageUrl: "https://campbelltaylorwashburn.com/wp-content/uploads/2019/07/Consulting-Illustration.png",
  },
  {
    name: "Hands On Business",
    imageUrl: "https://campbelltaylorwashburn.com/wp-content/uploads/2019/07/Consulting-Illustration.png",
  },
  {
    name: "Networking",
    imageUrl: "https://campbelltaylorwashburn.com/wp-content/uploads/2019/07/Consulting-Illustration.png",
  },
  {
    name: "Business Knowledge",
    imageUrl: "https://campbelltaylorwashburn.com/wp-content/uploads/2019/07/Consulting-Illustration.png",
  },
  {
    name: "Hands On Business",
    imageUrl: "https://campbelltaylorwashburn.com/wp-content/uploads/2019/07/Consulting-Illustration.png",
  },
  {
    name: "Networking",
    imageUrl: "https://campbelltaylorwashburn.com/wp-content/uploads/2019/07/Consulting-Illustration.png",
  },
  {
    name: "Business Knowledge",
    imageUrl: "https://campbelltaylorwashburn.com/wp-content/uploads/2019/07/Consulting-Illustration.png",
  },
  {
    name: "Hands On Business",
    imageUrl: "https://campbelltaylorwashburn.com/wp-content/uploads/2019/07/Consulting-Illustration.png",
  },
  {
    name: "Networking",
    imageUrl: "https://campbelltaylorwashburn.com/wp-content/uploads/2019/07/Consulting-Illustration.png",
  },
];

const PeopleSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    adaptiveHeight: true,
    variableHeight: true,
    variableWidth: false,
    responsive: [
      {
        breakpoint: 920,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
    ],
  };

  return (
    <div className="Car" style={{ marginBottom: "8rem" }}>
      <Text type="primary" size={3} style={{ marginBottom: "5rem", marginTop: "5rem", textAlign: "center", color: "#013481" }}>
        OUR LOVELY HUNNY SWEETY
      </Text>
      <Slider {...settings}>
        {data.map((data, idx) => (
          <PeopleCard imageUrl={data.imageUrl} name={data.name} />
        ))}
      </Slider>
    </div>
  );
};

export default PeopleSlider;

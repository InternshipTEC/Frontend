import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import GalleryCard from "./GalleryCard";
import Text from "../shared/Text";
import "./assets/CarouselGallery.css";

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

const TextSlider = styled.div`
  display: flex;
  text-align: center;
  align-item: center;
  justify-content: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

const SliderDay = styled.div`
  margin: auto;
  width: 50%;
`;

const GallerySlider = () => {
  const textSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
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
      <SliderDay>
        <Slider {...textSettings}>
          <TextSlider>
            <Text type="paragraph" size={2} color="#DAC269" style={{ color: "#DAC269", textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", fontWeight: "900" }}>
              Day 1
            </Text>
          </TextSlider>
          <TextSlider>
            <Text type="paragraph" size={2} color="#DAC269" style={{ color: "#DAC269", textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", fontWeight: "900" }}>
              Day 2
            </Text>
          </TextSlider>
          <TextSlider>
            <Text type="paragraph" size={2} color="#DAC269" style={{ color: "#DAC269", textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", fontWeight: "900" }}>
              Day 3
            </Text>
          </TextSlider>
          <TextSlider>
            <Text type="paragraph" size={2} color="#DAC269" style={{ color: "#DAC269", textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", fontWeight: "900" }}>
              Day 4
            </Text>
          </TextSlider>
        </Slider>
      </SliderDay>
      <Slider {...settings}>
        {data.map((data, idx) => (
          <GalleryCard imageUrl={data.imageUrl} />
        ))}
      </Slider>
    </div>
  );
};

export default GallerySlider;

import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { useMediaQuery } from "react-responsive";
import Text from "../shared/Text";
import AchmadZaky from "../../blob/images/AchmadZaky.jpg";
import HafizhCrisbar from "../../blob/images/HafizhCrisbar.png";
import Andriansyah from "../../blob/images/Andriansyah.png";
import Umar from "../../blob/images/Umar.png";
import Hermawansyah from "../../blob/images/Hermawansyah.png";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const AlumnusWrapper = styled.div`
  width: calc(100vw - 20vw);
  margin: 0 auto;
`;

const AlumnusContainer = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.mobile ? "row" : "column")};
  gap: 4rem;
`;

const TitleContainer = styled.div`
  margin: 1.5rem 0;
  ${(props) => {
    if (props.mobile) {
      return css`
        display: flex;
        justify-content: center;
      `;
    }
  }}
`;

const DescriptionContainer = styled.div`
  margin: 0 3rem;
`;

const AlumnusListContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 4rem;
  margin-top: ${(props) => (props.mobile ? "0px" : "20px")};
`;

const AlumnusDisplay = styled.div`
  background-image: url(${(props) => props.image});
  border-radius: 50%;
  margin: ${(props) => (props.mobile ? "0 auto" : "")};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  ${(props) => {
    if (props.picked) {
      return css`
        border: solid 3px #016081;
      `;
    }
    if (props.clickable) {
      return css`
        &:hover {
          cursor: pointer;
          border: solid 3px #016081;
        }
      `;
    }
  }}
`;

const dataAlumnus = [
  {
    nama: "Achmad Zaky",
    status: "Founder of Bukalapak",
    description:
      "Ahmad Zaky merupakan Founder dari Unit TEC ITB. Dia merupakan mantan CEO dan Founder dari Bukalapak. Bukalapak sendiri merupakan situs belanja online terpercaya di Indonesia yang menjual berbagai produk kebutuhan masyarakat Indonesia.",
    image: AchmadZaky,
  },
  {
    nama: "Hafizh Ihsaanuddin",
    status: "Founder of Ayam Geprek Crisbar",
    description:
      "Hafizh Ihsannudin merupakan mahasiswa Manajemen’16 ITB dan merupakan alumni TEC ITB. Dia merupakan Founder dari Ayam Crispy Bakar atau sering disebut Crisbar yang terkenal di Bandung.",
    image: HafizhCrisbar,
  },
  {
    nama: "Andriansyah Putra",
    status: "Founder of Dr. Ganesha Education",
    description:
      "Andriansyah Putra merupakan founder dari salah satu platform try out terbaik yakni, Dr. Ganesha Education. Dr. Ganesha Education merupakan platform daring yang menyediakan kebutuhan siswa dalam mempersiapkan diri menempuh tes masuk PTN. Selain itu, Andriansyah juga pernah menjadi presiden TEC ITB pada kepengurusan 2019/2020.",
    image: Andriansyah,
  },
  {
    nama: "Umar Hilmi Fadhilah ",
    status: "Founder and CEO of BACOAT",
    description:
      "Tidak hanya sebagai pemenang Carbon Footprint Challenge 2019, Umar Hilmi merupakan Founder juga CEO dari BACOAT. BACOAT merupakan produk kemasan yang terbuat dari material organik dan bertujuan memperpanjang jangka kesegaran produk, terutama untuk sayur dan buah.",
    image: Umar,
  },
  
  {
    nama: "Hermawansyah Hidayat ",
    status: "Founder of @hidupmedia",
    description:
      "Hermawansyah merupakan Alumnus TEC. Dia merupakan founder dari Hidup atau sebuah  platform untuk menghubungkan masyarakat dengan psikolog/psikiater. ",
    image: Hermawansyah,
  },
];

const Alumnus = () => {
  const [alumnusIndex, setAlumnusIndex] = useState(0);
  const isMobile = useMediaQuery({
    query: "(min-width: 750px)",
  });
  const controls = useAnimation();
  const [ref, inView] = useInView();
  const title = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  const desc = {
    hidden: { opacity: 0, x: -140 },
    visible: { opacity: 1, x: 0 },
  };
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);
  return (
    <div>
      <AlumnusWrapper>
        <TitleContainer mobile={!isMobile}>
          <motion.h1 ref={ref} animate={controls} initial="hidden" variants={title} transition={{ type: "spring", stiffness: 20 }}>
            <Text type="primary" size={3}>
              TEC ALUMNUS
            </Text>
          </motion.h1>
        </TitleContainer>
        <AlumnusContainer mobile={isMobile}>
          <div>
            <AlumnusDisplay mobile={!isMobile} width="18rem" height="18rem" image={dataAlumnus[alumnusIndex].image} />
          </div>
          <motion.div ref={ref} animate={controls} initial="hidden" variants={desc} transition={{ type: "spring", stiffness: 100, duration: 1.2 }}>
            <DescriptionContainer>
              <Text type="primary" size={2}>
                {" "}
                {dataAlumnus[alumnusIndex].nama}{" "}
              </Text>
              <Text type="secondary" size={2}>
                {" "}
                {dataAlumnus[alumnusIndex].status}
              </Text>
              <div style={{ maxWidth: "650px" }}>
                <Text align="justify" type="paragraph" size={1}>
                  {" "}
                  {dataAlumnus[alumnusIndex].description}{" "}
                </Text>
              </div>
            </DescriptionContainer>
          </motion.div>
        </AlumnusContainer>
        <AlumnusListContainer mobile={isMobile}>
          {dataAlumnus.map((data, index) => (
            <>
              <AlumnusDisplay clickable={true} picked={index === alumnusIndex} width="4.5rem" height="4.5rem" image={data.image} onClick={() => setAlumnusIndex(index)} />
            </>
          ))}
        </AlumnusListContainer>
      </AlumnusWrapper>
    </div>
  );
};

export default Alumnus;

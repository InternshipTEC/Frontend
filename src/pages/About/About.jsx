import React, { useState } from "react";
import Footer from "../../components/LandingPageComponents/Footer";
// import Organogram from "../../components/AboutComponents/PeopleSlider";
// import Gallery from "../../components/AboutComponents/GallerySlider";
import UnderConstruction from "../../components/UnderConstruction/UnderConstruction";
import styled from "styled-components";
import {motion} from 'framer-motion'
// import Text from "../../components/shared/Text";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const TextNav = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  margin-top: 3rem;
  gap: 4rem;
`;

const About = () => {
  // const [aboutTypes, setAboutTypes] = useState(true);
  return (
    <motion.div
      initial={{opacity:0}}
      animate={{opacity:1}}
      exit={{ opacity: 0 }}
      transition={{duration:1}}    
    >
    <Wrapper>
      <UnderConstruction />
      {/* <TextNav>
        <Text type="primary" size={2} style={aboutTypes ? { color: "#016081", borderBottom: "5px solid #016081", cursor: "pointer" } : { color: "#016081", cursor: "pointer" }} onClick={() => setAboutTypes(true)}>
          ORGANOGRAM
        </Text>
        <Text type="primary" size={2} style={aboutTypes ? { color: "#016081", cursor: "pointer" } : { color: "#016081", cursor: "pointer", borderBottom: "5px solid #016081" }} onClick={() => setAboutTypes(false)}>
          GALLERY
        </Text>
      </TextNav>
      {aboutTypes ? <Organogram /> : <Gallery />} */}
      <Footer />
    </Wrapper>
</motion.div>
  );
};

export default About;

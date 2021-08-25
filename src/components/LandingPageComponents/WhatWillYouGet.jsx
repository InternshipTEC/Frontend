import React, { useEffect } from "react";
import styled from "styled-components";
import Text from "../shared/Text";
import { useMediaQuery } from "react-responsive";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import BusinessKnowledge from "../../blob/images/BusinessKnowledge.png";
import HandsOn from "../../blob/images/Hands-On.png";
import Networking from "../../blob/images/Networking.png";

const BenefitPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Card = styled.div`
  display: flex;
  align-items: center;
  gap: 4rem;
`;

const BenefitCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  width: 261px;
  height: 336px;
`;

const Image = styled.img`
  width: 200px;
  height: 200px;
`;

const dataCards = [
  {
    name: "Business Knowledge",
    imageUrl: BusinessKnowledge,
  },
  {
    name: "Hands On Business",
    imageUrl: HandsOn,
  },
  {
    name: "Networking",
    imageUrl: Networking,
  },
];

const WhatWillYouGet = () => {
  const isCol = useMediaQuery({
    query: "(min-width: 918px)",
  });
  const controls = useAnimation();
  const [ref, inView] = useInView();
  const title = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  const card = {
    hidden: { opacity: 0, y: -90 },
    visible: { opacity: 1, y: 0 },
  };
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);
  return (
    <BenefitPage>
      <motion.h1 ref={ref} animate={controls} initial="hidden" variants={title} transition={{ type: "spring", stiffness: 20 }}>
        <Text type="primary" size={3} style={{ marginBottom: "5rem", textAlign: "center" }}>
          What Will You Get
        </Text>
      </motion.h1>
      <motion.div ref={ref} animate={controls} initial="hidden" variants={card} transition={{ type: "spring", stiffness: 100 }}>
        <Card style={isCol ? {} : { flexDirection: "column" }}>
          {dataCards.map((data) => (
            <motion.div whileHover={{ y: -50 }} transition={{ type: "spring", stiffness: 70 }}>
              <BenefitCard style={{ cursor: "pointer" }}>
                <Image src={data.imageUrl} />
                <Text type="secondary" style={{ fontSize: "28px" }}>
                  {data.name}
                </Text>
              </BenefitCard>
            </motion.div>
          ))}
        </Card>
      </motion.div>
    </BenefitPage>
  );
};

export default WhatWillYouGet;

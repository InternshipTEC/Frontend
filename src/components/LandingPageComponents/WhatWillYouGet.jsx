import React from "react";
import styled, { css } from "styled-components";
import Text from "../shared/Text";
import { useMediaQuery } from "react-responsive";

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
  justify-content: center;
  align-items: center;
  text-align: center;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  width: 261px;
  height: 336px;
`;
const WhatWillYouGet = () => {
  const isCol = useMediaQuery({
    query: "(min-width: 918px)",
  });
  return (
    <BenefitPage>
      <Text type="primary" style={{ fontSize: "48px", marginBottom: "5rem", textAlign: "center" }}>
        What Will You Get
      </Text>
      <Card style={isCol ? {} : { flexDirection: "column" }}>
        <BenefitCard>
          <Text type="secondary" style={{ fontSize: "28px" }}>
            Business Knowledge
          </Text>
        </BenefitCard>
        <BenefitCard>
          <Text type="secondary" style={{ fontSize: "28px" }}>
            Hands On Business
          </Text>
        </BenefitCard>
        <BenefitCard>
          <Text type="secondary" style={{ fontSize: "28px" }}>
            Networking
          </Text>
        </BenefitCard>
      </Card>
    </BenefitPage>
  );
};

export default WhatWillYouGet;

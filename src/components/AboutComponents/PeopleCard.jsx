import React from "react";
import styled from "styled-components";
import Text from "../shared/Text";

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
  width: 300px;
  height: 400px;
`;

const Image = styled.img`
  width: 200px;
  height: 200px;
`;

const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const PeopleCard = ({ imageUrl, name }) => {
  return (
    <BenefitPage>
      <Card>
        <BenefitCard style={{ cursor: "pointer" }}>
          <Image src={imageUrl} />
          <TextWrap>
            <Text type="secondary" size={1.3} style={{ color: "black" }}>
              {name}
            </Text>
            <Text type="secondary" size={1} style={{ color: "black" }}>
              {name}
            </Text>
            <Text type="secondary" size={1} style={{ color: "black" }}>
              {name}
            </Text>
          </TextWrap>
        </BenefitCard>
      </Card>
    </BenefitPage>
  );
};

export default PeopleCard;

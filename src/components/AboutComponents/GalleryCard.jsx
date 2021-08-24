import React from "react";
import styled from "styled-components";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

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
  height: 300px;
`;

const Image = styled.img`
  width: 200px;
  height: 200px;
`;

const GalleryCard = ({ imageUrl }) => {
  return (
    <BenefitPage>
      <Card>
        <BenefitCard style={{ cursor: "pointer" }}>
          <Zoom>
            <Image src={imageUrl} />
          </Zoom>
        </BenefitCard>
      </Card>
    </BenefitPage>
  );
};

export default GalleryCard;

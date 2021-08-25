import React from "react";
import styled from "styled-components";
import Text from "../shared/Text";
import LogoInternship from "../../blob/images/LogoInternship.png";
import LogoTEC from "../../blob/images/LogoTECbiru.png";
import { ReactComponent as Instagram } from "../../blob/svg/instagram_biru.svg";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const Garis = styled.div`
  width: 3px;
  height: 73px;
  background: #016081;
  border-radius: 20px;
`;

const Card = styled.div`
  padding: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.5);
  box-shadow: 0px 4px 8px #ffffff;
  border-radius: 20px;
  gap: 1rem;
`;

const InstagramTEC = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Logo = styled.div`
  display: flex;
  gap: 3rem;
`;

const Insta = styled(Instagram)`
  width: 2rem;
  height: 2rem;
`;

const UnderConstruction = () => {
  return (
    <Page>
      <Card>
        <Logo>
          <img src={LogoInternship} />
          <Garis />
          <img src={LogoTEC} />
        </Logo>
        <Text type="secondary" size={2} color="#016081">
          looks like it’s under construction
        </Text>
        <Text type="paragraph" size={1.5} color="#000000">
          Stay tuned and follow our social media for more information
        </Text>
        <a href="https://www.instagram.com/tec.internship/" target="_blank">
          <InstagramTEC>
            <Insta />
            <Text type="paragraph" color="#016081">
              tec.internship
            </Text>
          </InstagramTEC>
        </a>
      </Card>
    </Page>
  );
};

export default UnderConstruction;

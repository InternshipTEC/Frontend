import styled, { css } from "styled-components";
import IdrisElba from "../../blob/images/FactionIdrisElba.png";
import Beatrice from "../../blob/images/FactionBeatrice.png";
import Candor from "../../blob/images/FactionCandor.png";
import Dauntless from "../../blob/images/FactionDauntless.png";
import Text from "../shared/Text";
import Bar from "../../blob/images/FactionBar.png";
import { useMediaQuery } from "react-responsive";

const Wrapper = styled.div``;

const WelcomeTo = styled.div`
  padding: 3rem 0 0 7rem;
  ${(props) => {
    if (!props.mobile) {
      return css`
        padding-left: 4rem;
        text-align: center;
      `;
    }
  }}
`;

//BATAS EROR
const TextDiv = styled.div`
  justify-content: center;
  max-width: 356px;
  width: 100%;
  height: auto;
  text-align: center;
  margin: auto;
`;

const MainContent = styled.div`
  margin: 0 auto;
  text-align: center;
`;
const Layout = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ElbaDiv = styled.div``;

const BeatriceDiv = styled.div``;

const WelcomeFaction = () => {
  const isMobile = useMediaQuery({
    query: "(min-width: 425px)",
  });
  return (
    <Wrapper>
      <Layout>
        <MainContent>
          <img
            src={Dauntless}
            alt="dauntless"
            style={{ width: "20%", height: "auto" }}
          ></img>
          <TextDiv>
            <Text type="secondary" size={2} color="rgba(226, 214, 220, 1)">
              {" "}
              Dauntless{" "}
            </Text>
            <Text type="paragraph" color="rgba(226, 214, 220, 1)">
              {" "}
              Then there's Dauntless. They're our protectors, our soldiers, our
              police. I always thought they were amazing. Brave, fearless, and
              free. Some people think Dauntless are crazy, which they kind of
              are.
            </Text>
          </TextDiv>
        </MainContent>
      </Layout>
    </Wrapper>
  );
};

export default WelcomeFaction;

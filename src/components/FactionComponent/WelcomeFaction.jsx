import styled, {css} from "styled-components";
import IdrisElba from "../../blob/images/FactionIdrisElba.png";
import Beatrice from "../../blob/images/FactionBeatrice.png";
import Candor from "../../blob/images/FactionCandor.png"
import Text from "../shared/Text";
import Bar from "../../blob/images/FactionBar.png"
import { useMediaQuery } from "react-responsive";

const Wrapper = styled.div`

`

const WelcomeTo = styled.div`
    padding: 3rem 0 0 7rem;
    ${props=>{
        if(!props.mobile){
            return css`
                padding-left: 4rem;
                text-align:center;
            `
        }
    }}
    
`

//BATAS EROR
const TextDiv = styled.div`
    justify-content:center;
    max-width:356px;
    width:100%;
    height:auto;
    text-align: center;
    margin:auto;
    
`

const MainContent = styled.div`
    text-align: center;
    

`
const Layout = styled.div`
    display:flex;
    justify-content:space-between;
`

const ElbaDiv= styled.div`

    
`

const BeatriceDiv= styled.div`
    
`


const WelcomeFaction = () => {
    const isMobile = useMediaQuery({
        query: "(min-width: 425px)",
      });
    return (
        <Wrapper>
            <WelcomeTo mobile={isMobile}>
                <Text type='secondary' size={1.5}style={{color:"#fff"}}> Welcome To </Text>
                <img src={Bar} style={{width:"12rem"}} alt="Bar"></img>
            </WelcomeTo>
            <Layout>
                <ElbaDiv>
                    <img src={IdrisElba} alt="idris-elba" style={{width:"100%", height:"auto", maxWidth:"500px"}}></img>
                </ElbaDiv>
                <MainContent>
                    <img src={Candor} alt="candor" style={{width:"100%", height:"auto",}}></img>
                    <TextDiv> 
                        <Text type="secondary" size={2} style={{color:"#fff", paddingBottom:"1rem"}}> Candor </Text>
                        <Text type="paragraph"> The one dedicated to the virtue of honesty. The one that believes that truth is the most important virtue and that it is one-dimensional and black and white - no little white lies allowed.</Text>
                    </TextDiv>
                </MainContent>
                <BeatriceDiv>
                    <img src={Beatrice} alt="beatrice" style={{width:"100%", height:"auto",}}></img>
                </BeatriceDiv>
            </Layout>

        </Wrapper>
       
    )

}

export default WelcomeFaction;

/*
width:"32.9rem", height:"44.375rem"
width:"23.5rem",height:"51.4375rem"
*/
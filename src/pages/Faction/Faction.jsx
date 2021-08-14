import React from 'react';
import styled, {css} from "styled-components";
import WelcomeFaction from '../../components/FactionComponent/WelcomeFaction';
import { useMediaQuery } from "react-responsive";
const FactionWrapper = styled.div`
    background-color: #010103;
    height:100%;
    display:flex;
    flex-direction:column;
    ${props=>{
        if(!props.mobile){
            return css`
                height:100vh;
            `
        }
    }}
`

//Media Query untuk debugging putih-putih
const Faction = () => {
    const isMobile = useMediaQuery({
        query: "(min-width: 1200px)",
      });
    return (
        <FactionWrapper mobile={isMobile}>
            <WelcomeFaction></WelcomeFaction>
        </FactionWrapper>
    )
}

export default Faction

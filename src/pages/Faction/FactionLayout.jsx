import React from 'react';
import { useMediaQuery } from "react-responsive";
import {
    Route, Switch, useRouteMatch
} from "react-router-dom";
import styled, { css } from "styled-components";
import Layout from '../../components/FactionComponent/Layout';
import WelcomeFaction from '../../components/FactionComponent/WelcomeFaction';
import {motion} from 'framer-motion'
import Acara from './Acara';
import Main from './Main';
import Absen from './Absen';

const FactionWrapper = styled.div`
    background-color: white;
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
const FactionLayout = () => {
    const isMobile = useMediaQuery({
        query: "(min-width: 1200px)",
      });
    return (
        <motion.div
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{ opacity: 0 }}
            transition={{duration:1}}    
        >
        <FactionWrapper mobile={isMobile}>
            <Layout>
            <Switch>
                <Route exact path='/faction'>
                    <WelcomeFaction/>
                </Route>
                <Route path={`/faction/acara`}>
                    Acara
                </Route>
                <Route path={`/faction/absen`}>
                    <Absen/>
                </Route>
            </Switch>
            </Layout>
        </FactionWrapper>
        </motion.div>
    )
}

export default FactionLayout

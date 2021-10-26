import React from "react";
import { useMediaQuery } from "react-responsive";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import styled, { css } from "styled-components";
import Layout from "../../components/FactionComponent/Layout";
import WelcomeFaction from "../../components/FactionComponent/WelcomeFaction";
import { motion } from "framer-motion";
import Absen from "./Absen";
import Tugas from "./Tugas";
import SpesificTugas from "./SpesificTugas";
import FindYourPartner from "./FindYourPartner";
import Materi from "./Materi";

const FactionWrapper = styled.div`
  background-color: #fff;
  height: 100%;
  display: flex;
  flex-direction: column;
  ${(props) => {
    if (!props.mobile) {
      return css`
        height: 100vh;
      `;
    }
  }}
`;

//Media Query untuk debugging putih-putih
const FactionLayout = ({ match }) => {
  const isMobile = useMediaQuery({
    query: "(min-width: 1200px)",
  });
  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <FactionWrapper mobile={isMobile}>
        <Layout>
          <Switch>
            <Route path={`${match.url}/absen`} component={Absen} />
            <Route path={`${match.url}/materi/:id?`} component={Materi} />
            <Route path={`${match.url}/tugas/:id?`} component={Tugas} />
            <Route exact path={`${match.url}/fyp`} component={FindYourPartner} />
            <Route exact path="/" component={WelcomeFaction} />
          </Switch>
        </Layout>
      </FactionWrapper>
    </motion.div>
  );
};



export default FactionLayout;

import React, { useState } from "react";
import styled, {css} from "styled-components";
import { useMediaQuery } from "react-responsive";
import Text from "../../components/shared/Text";
import RegisterForm from "../../components/LoginRegisterComponents/RegisterForm";
import LoginForm from "../../components/LoginRegisterComponents/LoginForm";
import Carrousel from "../../blob/images/Carrousel.png"
import { Redirect } from "react-router";
import { motion } from "framer-motion";

const LoginPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(5.06deg, #CCE4FA 19.38%, #DEE7F4 83.76%);
  height:100%;
  position:relative;
`;

const Faksi = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right:-4rem;
  margin-top:-8rem;
`;

const NavLog = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8rem;
`;

const TextNav = styled.div`
  display: flex;
  margin-top: 8rem;
  margin-bottom:-4rem;
  margin-left:55vw;
  z-index:999;
  ${props=>{
    if(!props.stacked){
        return css`
            margin-left:0;
            margin-bottom:0;
        `
    }
}}
`;

const Login = () => {
  const [formTypes, setFormTypes] = useState(true);
  const isImage = useMediaQuery({
    query: "(min-width: 1170px)",
  });
  const isMobile = useMediaQuery({
    query: "(max-width: 470px)",
  });
  const [user, setUser] = React.useState(localStorage.getItem("user"))
  React.useEffect(()=>{
    setUser(localStorage.getItem("user"))
  },[])

  if(user){
    return <Redirect to="/"/>
  }

  return (
    <motion.div
      initial={{opacity:0}}
      animate={{opacity:1}}
      exit={{ opacity: 0 }}
      transition={{duration:1}}    
    >
    <LoginPage>
      <TextNav stacked={isImage} style={isMobile ? { flexDirection: "column", gap: "1rem" } : { flexDirection: "row", gap: "3.5rem" }}>
        <Text type="primary" style={formTypes ? { fontSize: "24px", borderBottom: "13px solid #016081", cursor: "pointer", color:"#016081"} : { fontSize: "24px", cursor: "pointer", color:"#016081" }} onClick={() => setFormTypes(true)}>
          Login
        </Text>
        
      </TextNav>
      <NavLog>
        {isImage && (
          <Faksi>
            {/*<img src={LogoFaksi1} alt="Faksi 1" style={{ width: "570px", height: "334px" }} />
            <img src={LogoFaksi2} alt="Faksi 2" style={{ width: "468px", height: "229px" }} /> */}
            <img src={Carrousel} alt="Faksi" style={{width:"50vw", height:"auto", marginTop:"1rem"}}/>
          </Faksi>
        )}
        <LoginForm changePage={() => setFormTypes(false)} />
      </NavLog>
    </LoginPage>
  </motion.div>
  );
};

export default Login;

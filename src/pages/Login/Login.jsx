import React, { useState } from "react";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import Text from "../../components/shared/Text";
import RegisterForm from "../../components/LoginRegisterComponents/RegisterForm";
import LoginForm from "../../components/LoginRegisterComponents/LoginForm";
import Carrousel from "../../blob/images/Carrousel.png"

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
`;

const NavLog = styled.div`
  display: flex;
  align-items: center;
  justify-content:center;
  gap: 8rem;
`;

const TextNav = styled.div`
  display: flex;
  margin-top: 4rem;
  margin-bottom: 4rem;
`;

const Login = () => {
  const [formTypes, setFormTypes] = useState(true);
  const isImage = useMediaQuery({
    query: "(min-width: 1170px)",
  });
  const isMobile = useMediaQuery({
    query: "(max-width: 470px)",
  });
  return (
    <LoginPage>
      <TextNav style={isMobile ? { flexDirection: "column", gap: "1rem" } : { flexDirection: "row", gap: "3.5rem" }}>
        <Text type="primary" style={formTypes ? { fontSize: "36px", borderBottom: "13px solid #90844F", cursor: "pointer" } : { fontSize: "36px", cursor: "pointer" }} onClick={() => setFormTypes(true)}>
          Login
        </Text>
        <Text type="primary" style={formTypes ? { fontSize: "36px", cursor: "pointer" } : { fontSize: "36px", cursor: "pointer", borderBottom: "13px solid #90844F" }} onClick={() => setFormTypes(false)}>
          Register
        </Text>
      </TextNav>
      <NavLog>
        {isImage && (
          <Faksi>
            {/*<img src={LogoFaksi1} alt="Faksi 1" style={{ width: "570px", height: "334px" }} />
            <img src={LogoFaksi2} alt="Faksi 2" style={{ width: "468px", height: "229px" }} /> */}
            <img src={Carrousel} alt="Faksi" style={{width:"40vw", height:"auto"}}/>
          </Faksi>
        )}
        {formTypes ? <LoginForm changePage={()=>setFormTypes(false)}/> : <RegisterForm changePage={()=>setFormTypes(true)}/>}
      </NavLog>
    </LoginPage>
  );
};

export default Login;

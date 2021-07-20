import React, { useState } from "react";
import styled from "styled-components";
import LogoFaksi1 from "../../blob/images/logofaksilogin.png";
import LogoFaksi2 from "../../blob/images/logofaksilogin2.png";
import { useMediaQuery } from "react-responsive";
import Text from "../../components/shared/Text";
import RegisterForm from "../../components/LoginRegisterComponents/RegisterForm";
import LoginForm from "../../components/LoginRegisterComponents/LoginForm";

const LoginPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(0deg, #19161b, #19161b);
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
  gap: 8rem;
`;

const TextNav = styled.div`
  display: flex;
  text-align: center;
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
            <img src={LogoFaksi1} alt="Faksi 1" style={{ width: "570px", height: "334px" }} />
            <img src={LogoFaksi2} alt="Faksi 2" style={{ width: "468px", height: "229px" }} />
          </Faksi>
        )}
        {formTypes ? <LoginForm /> : <RegisterForm />}
      </NavLog>
    </LoginPage>
  );
};

export default Login;

import React from "react";
import styled, { css } from "styled-components";
import { Button } from "react-bootstrap";
import Text from "../shared/Text";
import { useMediaQuery } from "react-responsive";

const Login = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GridForm = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 4rem;
`;

const Input = styled.input`
  background: rgba(255, 255, 255, 0.15);
  /* neon blue */
  font-size: 20px;
  border: 4px solid #016081;
  border-radius: 10px;
  color: white;
  height: 40px;
  padding: 0px 0px 0px 6px;
`;

const GridItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 463px;
`;

const Submit = styled(Button)`
  background: #016081;
  border-radius: 50px;
  margin-top: 2.5rem;
  margin-bottom: 0.5rem;
`;

const LoginForm = () => {
  const isImage = useMediaQuery({
    query: "(max-width: 1170px)",
  });
  const isMobile = useMediaQuery({
    query: "(max-width: 470px)",
  });
  return (
    <Login style={isImage ? { marginTop: "6rem", marginBottom: "8rem" } : {}}>
      <GridForm>
        <GridItem style={isMobile ? { width: "300px" } : {}}>
          <Text type="secondary" style={{ color: "white" }}>
            Email
          </Text>
          <Input type="email" id="email" name="email" required />
        </GridItem>
        <GridItem style={isMobile ? { width: "300px" } : {}}>
          <Text type="secondary" style={{ color: "white" }}>
            Password
          </Text>
          <Input type="password" id="password" name="password" required />
        </GridItem>
      </GridForm>
      <Submit>Login</Submit>
      <Text type="Paragraph" style={{ color: "#696969" }}>
        Belum punya akun? {""}
        <a href="/" style={{ color: "#939496" }}>
          Klik disini
        </a>
      </Text>
    </Login>
  );
};

export default LoginForm;

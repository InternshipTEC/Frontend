import React from "react";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import Text from "../shared/Text";
import { useMediaQuery } from "react-responsive";
import {useForm} from "react-hook-form";
import * as controller from "../../controller"

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
  const { register, handleSubmit } = useForm();
  const onSubmit = async data => {
    try {
      const user = await controller.handleLogin(data.email,data.password);
      if(user.message){
        alert(user.message)
      }
    } catch (err) {
      alert(err.message)
    }
  }
  return (
    <Login style={isImage ? { marginTop: "6rem", marginBottom: "8rem" } : {}}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <GridForm>
          <GridItem style={isMobile ? { width: "300px" } : {}}>
            <Text type="secondary" style={{ color: "white" }}>
              Email
            </Text>
            <Input type="email" id="email" {...register("email",{required:"This is required"})}/>
          </GridItem>
          <GridItem style={isMobile ? { width: "300px" } : {}}>
            <Text type="secondary" style={{ color: "white" }}>
              Password
            </Text>
            <Input type="password" id="password" {...register("password",{required:"This is required"})}/>
          </GridItem>
        </GridForm>
        <Submit type="submit">Login</Submit>
    </form>
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

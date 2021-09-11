import React, { useContext } from "react";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import Text from "../shared/Text";
import { Link, useHistory } from "react-router-dom"
import { useMediaQuery } from "react-responsive";
import {useForm} from "react-hook-form";
import * as controller from "../../controller"
import { GlobalContext } from "../../Auth";
import { UPDATE_AUTH, ADD_USER, ADD_TOKEN } from "../../authReducers";

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
  font-size: 20px;
  border: 0px solid;
  border-radius: 10px;
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
  font-size:1.4rem;
  margin-left: 14vw;
  font-size:1rem;
  width:8rem;
`;

const LoginForm = ({changePage}) => {
  const {dispatch} = useContext(GlobalContext);
  const history = useHistory();
  const isImage = useMediaQuery({
    query: "(max-width: 1170px)",
  });
  const isMobile = useMediaQuery({
    query: "(max-width: 470px)",
  });
  const { register, handleSubmit } = useForm();
  const onSubmit = async data => {
    try {
      const response = await controller.handleLogin(data.email,data.password);
      const user = response.user
      const token = response.accessToken
      if(user && token) {
        dispatch({type:ADD_TOKEN, token})
        dispatch({type:ADD_USER, user})
        dispatch({type:UPDATE_AUTH})
        history.push("/")
      }
    } catch (err) {
      alert(err.message)
    }
  }
  return (
    <Login style={isImage ? { marginTop: "0rem", marginBottom: "8rem" } : {}}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <GridForm>
          <GridItem style={isMobile ? { width: "300px" } : {}}>
            <Text type="secondary" style={{ color: "#6D6E70" }}>
              Email
            </Text>
            <Input type="email" id="email" {...register("email",{required:"This is required"})}/>
          </GridItem>
          <GridItem style={isMobile ? { width: "300px" } : {}}>
            <Text type="secondary" style={{ color: "#6D6E70" }}>
              Password
            </Text>
            <Input type="password" id="password" {...register("password",{required:"This is required"})}/>
          </GridItem>
        </GridForm>
        <Submit type="submit" style={isImage ? {marginLeft: "30vw", marginBottom:'30vh'} : {}}>Login</Submit>
    </form>
    </Login>
  );
};

export default LoginForm;

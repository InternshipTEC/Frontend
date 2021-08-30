import React from "react";
import { Button } from "react-bootstrap";
import { useForm } from 'react-hook-form';
import { useMediaQuery } from "react-responsive";
import { useHistory } from 'react-router-dom';
import styled from "styled-components";
import { GlobalContext } from "../../Auth";
import { ADD_TOKEN, ADD_USER, UPDATE_AUTH } from "../../authReducers";
import * as controller from "../../controller";
import Text from "../shared/Text";

const RegisForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GridForm = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 2rem;
`;

const Input = styled.input`
  font-size: 20px;
  border: 0px;
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



const RegisterForm = ({changePage}) => {
  const {dispatch} = React.useContext(GlobalContext);
  const history = useHistory();
  const isImage = useMediaQuery({
    query: "(max-width: 1170px)",
  });
  const isMobile = useMediaQuery({
    query: "(max-width: 470px)",
  });
  const { register, handleSubmit } = useForm();
  const onSubmit = async data => {
    if(data.password === data.confirm){
      try {
        const response = await controller.handleSignup(data.email,data.password);
        const user = response.user
        const token = response.accessToken
        if (user && token) {
          dispatch({type:ADD_TOKEN, token})
          dispatch({type:ADD_USER, user})
          dispatch({type:UPDATE_AUTH})
          history.push("/signup")
        } else {
          alert("Email have been taken or else, please contact admin for more information.")
        }
      } catch (err) {
        alert(err.message)
      }
    } else {
      alert("Password and password confirmation does not match!")
    }
 }
  return (
    <RegisForm>
      <form onSubmit={handleSubmit(onSubmit)}>
        <GridForm>
          <GridItem style={isMobile ? { width: "300px" } : {}}>
            <Text type="secondary" style={{ color: "#6D6E70" }}>
              Email
            </Text>
            <Input type="email" id="email" {...register("email")} required />
          </GridItem>
          <GridItem style={isMobile ? { width: "300px" } : {}}>
            <Text type="secondary" style={{ color: "#6D6E70" }}>
              Password
            </Text>
            <Input type="password" id="password" {...register("password")} required />
          </GridItem>
          <GridItem style={isMobile ? { width: "300px" } : {}}>
            <Text type="secondary" style={{ color: "#6D6E70" }}>
              Konfirmasi Password
            </Text>
            <Input type="password" id="confirm" {...register("confirm")} required />
          </GridItem>
        </GridForm>
        <Submit type="submit" style={isImage ? {marginLeft: "30vw", marginBottom:"18rem"} : {}}>Lanjut</Submit>
      </form>
    </RegisForm>
  );
};

export default RegisterForm;
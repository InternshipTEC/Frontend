import React from "react";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import Text from "../shared/Text";
import { useMediaQuery } from "react-responsive";
import { useForm } from 'react-hook-form';
import * as controller from "../../controller"
import { Link, useHistory } from 'react-router-dom'
import { GlobalContext } from "../../Auth";

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

const RegisterForm = ({changePage}) => {
  const {checkUser} = React.useContext(GlobalContext);
  const history = useHistory();
  const isMobile = useMediaQuery({
    query: "(max-width: 470px)",
  });
  const { register, handleSubmit } = useForm();
  const onSubmit = async data => {
    if(data.password === data.confirm){
      try {
        const user = await controller.handleSignup(data.email,data.password);
        checkUser()
        if(user && user.message){
          alert(user.message)
        } else {
          history.push("/signup")
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
            <Text type="secondary" style={{ color: "white" }}>
              Email
            </Text>
            <Input type="email" id="email" {...register("email")} required />
          </GridItem>
          <GridItem style={isMobile ? { width: "300px" } : {}}>
            <Text type="secondary" style={{ color: "white" }}>
              Password
            </Text>
            <Input type="password" id="password" {...register("password")} required />
          </GridItem>
          <GridItem style={isMobile ? { width: "300px" } : {}}>
            <Text type="secondary" style={{ color: "white" }}>
              Konfirmasi Password
            </Text>
            <Input type="password" id="confirm" {...register("confirm")} required />
          </GridItem>
        </GridForm>
        <Submit type="submit">Register</Submit>
      </form>
      <Text type="Paragraph" style={{ color: "#696969", marginBottom: "2rem" }}>
        Sudah punya akun? {""}
        <Link onClick={()=>changePage()} style={{ color: "#939496" }}>
          Klik disini
        </Link>
      </Text>
    </RegisForm>
  );
};

export default RegisterForm;

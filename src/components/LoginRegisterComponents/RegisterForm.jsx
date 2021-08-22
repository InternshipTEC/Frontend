import React from "react";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import Text from "../shared/Text";
import { useMediaQuery } from "react-responsive";
import { useForm } from 'react-hook-form';
import * as controller from "../../controller"
import { useHistory } from 'react-router-dom'

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
  margin-top 2.5rem;
  font-size:1.4rem;
  margin-left: 14vw;
  font-size:1rem;
  width:8rem;
`;



const RegisterForm = ({changePage}) => {
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
        const user = await controller.handleSignup(data.email,data.password);
        if(user.message){
          alert(user.message)
        } else {
          history.push("/")
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
        <Submit type="submit" style={isImage ? {marginLeft: "18rem", marginBottom:"18rem"} : {}}>Lanjut</Submit>
      </form>
    </RegisForm>
  );
};

export default RegisterForm;



{/*Yang Yandy Bikin:
          <GridItem style={isMobile ? { width: "300px" } : {}}>
            <Text type="secondary" style={{ color: "#6D6E70" }}>
              Nama
            </Text>
            <Input type="text" id="nama" {...register("nama")} required />
          </GridItem>
          <GridItem style={isMobile ? { width: "300px" } : {}}>
            <Text type="secondary" style={{ color: "#6D6E70" }}>
              Fakultas
            </Text>
            <Select id="fakultas" {...register("fakultas")} placeholder="Pilih Fakultas" required>
              <option disabled selected value>
                -- Pilih Fakultas --
              </option>
              {Fakultas.map((q) => (
                <option value={q} style={{ color: "black" }}>
                  {q}
                </option>
              ))}
            </Select>
          </GridItem>

          <GridItem style={isMobile ? { width: "300px" } : {}}>
            <Text type="secondary" style={{ color: "white" }}>
              Upload Bukti Pembayaran
            </Text>
            <CustomUpload>
              Choose a file
              <Upload type="file" id="upload" {...register("upload")} data-multiple-caption="Files selected" />
            </CustomUpload>
          </GridItem>


      <Text type="Paragraph" style={{ color: "#696969", marginBottom: "2rem" }}>
        Sudah punya akun? {""}
        <Link onClick={()=>changePage()} style={{ color: "#939496" }}>
          Klik disini
        </Link>
      </Text>
*/}
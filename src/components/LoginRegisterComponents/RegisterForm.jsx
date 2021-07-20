import React from "react";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import Text from "../shared/Text";
import { useMediaQuery } from "react-responsive";
import { useForm } from 'react-hook-form';
import * as controller from "../../controller"

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

const Select = styled.select`
  background: rgba(255, 255, 255, 0.15);
  /* neon blue */
  border: 4px solid #016081;
  box-sizing: border-box;
  border-radius: 10px;
  color: white;
  font-size: 20px;
  height: 40px;
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

const CustomUpload = styled.label`
  background: #016081;
  /* neon blue */
  font-size: 20px;
  border: 4px solid #016081;
  padding: 0px 0px 0px 6px;
  border-radius: 10px;
  color: white;
  height: 40px;
  cursor: pointer;
  width: 140px;
`;

const Upload = styled.input`
  visibility: hidden;
`;

// Ini gatau udah lengkap ato enggak
const Fakultas = ["FITB", "FMIPA", "FSRD", "FSRD-J", "FSRD-C", "FTI", "FTI-J", "FTMD", "FTTM", "FTTM-J", "FTSL", "FTSL-J", "SAPPK", "SBM", "SF", "STIH", "STEI"];

const RegisterForm = () => {
  const isMobile = useMediaQuery({
    query: "(max-width: 470px)",
  });
  const { register, handleSubmit } = useForm();
  const onSubmit = async data => {
    if(data.password === data.confirm){
      try {
        const user = await controller.handleSignup(data.email,data.password);
        if(user.message){
          console.log(user)
          alert(user.message)
        }
      } catch (err) {
        alert(err.message)
      }
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
              Nama
            </Text>
            <Input type="text" id="nama" {...register("nama")} required />
          </GridItem>
          <GridItem style={isMobile ? { width: "300px" } : {}}>
            <Text type="secondary" style={{ color: "white" }}>
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
          <GridItem style={isMobile ? { width: "300px" } : {}}>
            <Text type="secondary" style={{ color: "white" }}>
              Upload Bukti Pembayaran
            </Text>
            <CustomUpload>
              Choose a file
              <Upload type="file" id="upload" {...register("upload")} data-multiple-caption="Files selected" />
            </CustomUpload>
          </GridItem>
        </GridForm>
        <Submit type="submit">Register</Submit>
      </form>
      <Text type="Paragraph" style={{ color: "#696969", marginBottom: "2rem" }}>
        Sudah punya akun? {""}
        <a href="/" style={{ color: "#939496" }}>
          Klik disini
        </a>
      </Text>
    </RegisForm>
  );
};

export default RegisterForm;

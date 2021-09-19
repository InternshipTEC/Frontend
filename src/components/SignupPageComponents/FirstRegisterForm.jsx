import React from "react";
import { Form } from "react-bootstrap";
import Text from "../shared/Text";
import Button from "@material-ui/core/Button";
import { SignupContext } from "./SignupProvider";
import {
  SET_FAKULTAS,
  SET_IDLINE,
  SET_NAME,
  SET_NIM,
  SET_SS,
} from "./reducers";
import { MenuItem, Select } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

const listFakultas = [
  "FITB",
  "FMIPA",
  "FSRD",
  "FTI",
  "FTMD",
  "FTTM",
  "FTSL",
  "SAPPK",
  "SBM",
  "SF",
  "SITH",
  "STEI",
];

const FirstRegisterForm = () => {
  const {
    whichForm,
    nim,
    SSfollow,
    setWhichForm,
    nama,
    fakultas,
    idLine,
    handleChange,
  } = React.useContext(SignupContext);

  return (
    <>
      <Text size={1.75} style={{ marginBottom: "1rem" }}>
        Lengkapi data dirimu
      </Text>
      <Text size={1}>
        Lengkapi data diri untuk melakukan finalisasi akunmu.
      </Text>
      <Text>
        <br />
        Contact person line : djrs.sdtel
      </Text>
      <hr />
      <Form>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Nama Lengkap</Form.Label>
          <Form.Control
            type="text"
            value={nama}
            onChange={handleChange(SET_NAME)}
            placeholder="Nama Lengkap"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>NIM</Form.Label>
          <Form.Control
            type="text"
            value={nim}
            onChange={handleChange(SET_NIM)}
            placeholder="NIM"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Fakultas</Form.Label>
          <br />
          <Select
            style={{ marginLeft: "0.25rem" }}
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={fakultas}
            onChange={handleChange(SET_FAKULTAS)}
            label="Fakultas"
          >
            {listFakultas.map((tipe) => (
              <MenuItem value={tipe}>{tipe}</MenuItem>
            ))}
          </Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Id Line</Form.Label>
          <Form.Control
            type="text"
            value={idLine}
            onChange={handleChange(SET_IDLINE)}
            placeholder="Id Line"
          />
        </Form.Group>
        <br />
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>
            Upload bukti follow instagram{" "}
            <a
              style={{ color: "blue" }}
              href="https://www.instagram.com/tec.internship/"
            >
              @tec.internship
            </a>
          </Form.Label>
          <br />
          <input
            accept="image/*"
            id="contained-button-file"
            style={{ display: "none" }}
            multiple
            type="file"
            onChange={handleChange(SET_SS)}
          />
          <label htmlFor="contained-button-file">
            <Button
              variant="contained"
              color="default"
              component="span"
              startIcon={<CloudUploadIcon />}
            >
              Upload
            </Button>
            {SSfollow && (
              <>
                <br />
                <br />
                <Text color="green">
                  Bukti SS telah terunggah: {SSfollow.name}
                </Text>
              </>
            )}
          </label>
        </Form.Group>
      </Form>
      <br />
      <Button
        variant="contained"
        color="primary"
        onClick={() => setWhichForm(whichForm + 1)}
      >
        Continue
      </Button>
    </>
  );
};

export default FirstRegisterForm;

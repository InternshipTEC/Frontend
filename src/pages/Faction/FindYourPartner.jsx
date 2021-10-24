import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import MDEditor from '@uiw/react-md-editor';
import React from 'react';
import styled from 'styled-components';
import { ReactComponent as HackerLogo } from '../../blob/svg/Hacker.svg';
import { ReactComponent as HipsterLogo } from '../../blob/svg/Hipster.svg';
import { ReactComponent as HustlerLogo } from '../../blob/svg/Hustler.svg';
import Text from "../../components/shared/Text";
import { BACKEND_URL } from '../../controller';
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Button from "@material-ui/core/Button";

const RolesWrapper = styled.div`
  display:flex;
  justify-content: center;
  gap: 5rem;
`

const RoleChoice = styled.div`
  display: inline-block;
  background: #FFFFFF;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
  padding: 1rem;
  margin: 1rem;
  min-width: 15rem;
  height: 15rem;
  cursor:pointer;
  border-radius:15px;
  & * {
    margin: 0 auto;
  }
`

const UserCard = styled.div`
  background: #FFFFFF;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
  padding: 2rem;
  margin: 1rem;
`

const FormWrapper = styled.div`
  background: #FFFFFF;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
  padding: 1rem;
  margin: 1rem;
`
const FindYourPartner = () => {
  const [users, setUsers] = React.useState()
  const [desc, setDesc] = React.useState("")
  const [searchedName, setSearchedName] = React.useState("")
  const [picker, setPicker] = React.useState('hacker')
  const [roles, setRoles] = React.useState()
  const [user, setUser] = React.useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [file, setFile] = React.useState()

  React.useEffect(() => {
    const getData = async () => {
      const res = await axios.get(`${BACKEND_URL}/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth")}`,
        },
      });
      setUsers(res.data);
    };
    console.log(user.id);
    const toLogo = (title, Component) => ({ title, component: <Component /> })
    setRoles([
      toLogo("Hipster", HipsterLogo),
      toLogo("Hacker", HackerLogo),
      toLogo("Hustler", HustlerLogo),
    ])
    getData();
  }, []);

  const variants = {
    scale: { scale: 1.25 },
    shrink: { scale: 1 }
  };
  return <>
    <FormWrapper>
      <Text type="secondary" color="black" align='center' size={1.5} >
        Pick your role!
      </Text>
      <br />
      <br />
      <RolesWrapper >
        {
          roles?.map((role, index) =>
            <motion.div
              variants={variants}
              animate={(role.title.toLowerCase() === picker ? true : false) ? "scale" : "shrink"}
            >
              <RoleChoice onClick={() => setPicker(role.title.toLowerCase())}>
                <Text type="secondary" color="black" align='center' style={{ padding: "0.5rem" }}>
                  {role.title}
                </Text>
                <div style={{ width: "fit-content", margin: "0 auto" }}>
                  {role.component}
                </div>
              </RoleChoice>
            </motion.div>
          )
        }
      </RolesWrapper>
      <br />
      <br />
      <Text type="secondary" color="black" align='center' size={1.5} >
        Fill your profile information!
      </Text>
      <br />
      <br />
      <UploadButton file={file} setFile={setFile} label="Upload Profile Picture" />
      <br />
      <br />
      <Text type="paragraph" style={{ fontWeight: "bold" }}>Profile Description:</Text>
      <br />
      <MDEditor
        value={desc}
        onChange={setDesc}
      />
      <br/>
      <Button variant="contained" fullWidth color="primary" style={{textTransform:"none"}}>Submit Data</Button>
    </FormWrapper>
  </>
}


const UploadButton = ({ file, setFile, label }) => {
  const [loading, setLoading] = React.useState(false)
  const handleInput = (e) => {
    setLoading(true)
    setFile(e.target.files[0])
    setLoading(false)
  }
  return <>
    <Text type="paragraph" style={{ fontWeight: "bold" }}>{label}:</Text>
    <br />
    <input
      accept="image/*"
      id="contained-button-file"
      style={{ display: "none" }}
      multiple
      type="file"
      onChange={handleInput}
    />
    <label htmlFor="contained-button-file">
      <Button
        variant="contained"
        color="default"
        component="span"
        startIcon={<CloudUploadIcon />}
      >
        {loading ? "Loading" : "Upload"}
      </Button>
      {
        file
        &&
        <>
          <br />
          <br />
          <Text color="green">
            File sudah terupload.
          </Text>
        </>
      }
    </label>
  </>
}



export default FindYourPartner

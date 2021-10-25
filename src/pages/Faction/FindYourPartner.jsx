import axios from 'axios';
import { motion } from 'framer-motion';
import MDEditor from '@uiw/react-md-editor';
import React from 'react';
import styled from 'styled-components';
import { ReactComponent as HackerLogo } from '../../blob/svg/Hacker.svg';
import { ReactComponent as HipsterLogo } from '../../blob/svg/Hipster.svg';
import { ReactComponent as HustlerLogo } from '../../blob/svg/Hustler.svg';
import Text from "../../components/shared/Text";
import UploadButtonCroppable from "../../components/shared/UploadButtonCroppable";
import { BACKEND_URL } from '../../controller';
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Button from "@material-ui/core/Button";
import 'react-image-crop/dist/ReactCrop.css';
import { Modal } from "react-bootstrap";
import { useMediaQuery } from "react-responsive"
import app from '../../base'

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
  width: 15rem;
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

function MyVerticallyCenteredModal(props) {
  const isDesktop = useMediaQuery({
    query: "(min-width: 1170px)",
  })
  return (
    <Modal
      {...props}
      style={isDesktop ? { left: "120px", zIndex: 111111 } : { zIndex: 111111 }}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Upload Photo
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <UploadButtonCroppable setFile={props.setFile} onHide={props.onHide} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

const FindYourPartner = () => {
  const [user, setUser] = React.useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [MDSource, setMDSource] = React.useState("")
  const [registered, setRegistered] = React.useState(false)
  const [submit, setSubmit] = React.useState(false)

  React.useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`${BACKEND_URL}/users/fyp/${user.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth")}`,
        },
      });
      const userData = data.data
      setUser(userData);
      const fypProfile = userData.fypProfile
      if (fypProfile) {
        setRegistered(true)
        const { data } = await axios.get(`${BACKEND_URL}/fyp-blog/role/${fypProfile.role}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth")}`,
          },
        });
        const fypBlog = data.data
        setMDSource(fypBlog.content)
      } else {
        setRegistered(false)
      }
    };
    ;
    getData();
  }, [submit]);
  return <>
    {
      registered ?
        <FormWrapper>
          <MDEditor.Markdown source={MDSource} />
        </FormWrapper>
        :
        <RegisterComponent setSubmit={setSubmit}/>
    }
  </>
}

const RegisterComponent = ({setSubmit}) => {
  const [loading, setLoading] = React.useState(false)
  const [desc, setDesc] = React.useState("")
  const [picker, setPicker] = React.useState('hacker')
  const [roles, setRoles] = React.useState()
  const [user, _setUser] = React.useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [file, setFile] = React.useState()
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery({
    query: "(min-width: 1170px)",
  })

  React.useEffect(() => {
    const toLogo = (title, Component) => ({ title, component: <Component /> })
    setRoles([
      toLogo("Hipster", HipsterLogo),
      toLogo("Hacker", HackerLogo),
      toLogo("Hustler", HustlerLogo),
    ])
  }, []);

  const variants = {
    scale: { scale: 1.25 },
    shrink: { scale: 1 }
  };

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const storage = app.storage()
      const storageRef = storage.ref()
      const imageRef = storageRef.child(`fyp/${user.id}/${file.name}`)
      await imageRef.put(file)
      const photoUrl = await imageRef.getDownloadURL()
      await axios.put(
        `${BACKEND_URL}/users/fyp/${user.id}`,
        {
          photoUrl,
          role: picker,
          desc,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth")}`,
          },
        }
      );
      setSubmit(true)
    } catch (err) {
      alert(err.toString())
    }
    setLoading(false)
  }
  return <>
    <MyVerticallyCenteredModal
      show={open}
      setFile={setFile}
      onHide={() => setOpen(false)}
    />
    <FormWrapper>
      <Text type="secondary" color="black" align='center' size={1.5} >
        Pick your role!
      </Text>
      <br />
      <br />
      <RolesWrapper style={isDesktop ? {} : { gap: "1rem" }}>
        {
          roles?.map(role =>
            <motion.div
              variants={variants}
              animate={(role.title.toLowerCase() === picker ? true : false) ? "scale" : "shrink"}
            >
              <RoleChoice style={isDesktop ? {} : { height: "7rem", width: "7rem" }} onClick={() => setPicker(role.title.toLowerCase())}>
                <Text type="secondary" color="black" align='center' style={{ padding: "0.5rem" }}>
                  {role.title}
                </Text>
                {
                  isDesktop &&
                  <div style={{ width: "fit-content", margin: "0 auto" }}>
                    {role.component}
                  </div>
                }
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
      <UploadButton label="Upload Photo Profile" file={file} setOpen={setOpen} />
      <br />
      <br />
      <Text type="paragraph" style={{ fontWeight: "bold" }}>Profile Description:</Text>
      <br />
      <MDEditor
        value={desc}
        onChange={setDesc}
      />
      <br />
      <Button variant="contained" fullWidth color="primary" style={{ textTransform: "none" }} onClick={handleSubmit}>
        {!loading ? "Submit Data" : "Loading"}
      </Button>
    </FormWrapper>
  </>
}


const UploadButton = ({ file, setOpen, label }) => {
  const handleClick = (e) => {
    setOpen(true)
  }
  return <>
    <Text type="paragraph" style={{ fontWeight: "bold" }}>{label}:</Text>
    <br />
    <label htmlFor="contained-button-file">
      <Button
        variant="contained"
        color="default"
        component="span"
        onClick={handleClick}
        startIcon={<CloudUploadIcon />}
      >
        Upload
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

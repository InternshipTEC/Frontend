import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import Avatar from "@material-ui/core/Avatar";
import React from 'react';
import styled from 'styled-components';
import Button from "@material-ui/core/Button";
import CircularProgress from '@material-ui/core/CircularProgress';
import { ReactComponent as HackerLogo } from '../../../blob/svg/Hacker.svg';
import { ReactComponent as HipsterLogo } from '../../../blob/svg/Hipster.svg';
import { ReactComponent as HustlerLogo } from '../../../blob/svg/Hustler.svg';
import Text from "../../../components/shared/Text";
import BackButton from "../../../components/shared/BackButton";
import { BACKEND_URL } from '../../../controller';
import { useMediaQuery } from "react-responsive"
import { Modal } from "react-bootstrap";
import MDEditor from '@uiw/react-md-editor';
import Chip from '@mui/material/Chip';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import './partner.css'
import app from '../../../base'

const db = app.firestore()

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
  display:flex;
  justify-content:space-between;
  background: #FFFFFF;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
  padding: 1rem;
  margin: 1rem;
`


const SearchWrapper = styled.div`
  font-family:'Manifold';
  & .search-box{
    width: fit-content;
    height: fit-content;
    position: relative;
  }
  & .search-box .input-search{
    height: 50px;
    width: 50px;
    border-style: none;
    padding: 10px;
    font-size: 18px;
    letter-spacing: 2px;
    outline: none;
    border-radius: 25px;
    transition: all .5s ease-in-out;
    background-color: white;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
    padding-right: 40px;
    color: black;
  }
  & .search-box .input-search::placeholder{
    color:rgba(0,0,0,.5);
    font-size: 18px;
    letter-spacing: 2px;
    font-weight: 100;
  }
  & .search-box .btn-search{
    width: 50px;
    height: 50px;
    border-style: none;
    font-size: 20px;
    font-weight: bold;
    outline: none;
    cursor: pointer;
    border-radius: 50%;
    position: absolute;
    right: 0px;
    color: black;
    background-color:transparent;
    pointer-events: painted;  
  }
  & .search-box .btn-search:focus ~ .input-search{
    width: 300px;
    border-radius: 0px;
    background-color: transparent;
    border-bottom:1px solid rgba(0,0,0,.5);
    transition: all 500ms cubic-bezier(0, 0.110, 0.35, 2);
    box-shadow: none;
  }
  & .search-box .input-search:focus{
    width: 300px;
    border-radius: 0px;
    background-color: transparent;
    border-bottom:1px solid rgba(0,0,0,.5);
    transition: all 500ms cubic-bezier(0, 0.110, 0.35, 2);
    box-shadow: none;
  }
`

function MyVerticallyCenteredModal(props) {
  const [loading, setLoading] = React.useState(true)
  const [invitable, setInvitable] = React.useState(props.invitable)
  const isDesktop = useMediaQuery({
    query: "(min-width: 1170px)",
  })
  function capitalizeFirstLetter(string) {
    return string?.charAt(0).toUpperCase() + string?.slice(1);
  }
  const inviteToTeam = () => {
    const membersRef = db.collectionGroup('members');
    membersRef.where("userId", "==", props.user.id).get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.parent.parent.get()
            .then(async (snapshot) => {
              const teamName = snapshot.data().name
              await db.collection('notification').add({
                userId: props.userPicked?.id,
                teamName,
                teamCode: snapshot.id
              })
              alert("Successfully invite user to team!")
              props.onHide()
            })
        })
      })
  }
  React.useEffect(() => {
    setLoading(true)
    setInvitable(props.invitable)
    const membersRef = db.collectionGroup('members');
    membersRef.where("userId", "==", props.user.id).get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const teamCode = doc.ref.parent.parent.id
          db.collection('notification').where("teamCode", "==", teamCode).where("userId", "==", props.userPicked?.id)
            .get().then((snapshot) => {
              snapshot.docs.forEach((docs) => {
                if (docs.exists) {
                  setInvitable(false)
                }
              })
            })
        })
      })
    setLoading(false)
  }, [props.open])
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
        {
          loading ?
            <CircularProgress />
            :
            <>
              <div>
                <div className="text-center mt-3">
                  <h4 className="m-2">Profile</h4>
                </div>
                <div className="text-center"> <img alt={props.userPicked?.name} src={props.userPicked?.fypProfile.photoUrl} width={100} className="rounded-circle" /> </div>
                <div className="text-center mt-3">
                  <h5 className="mt-2 mb-0">{props.userPicked?.name}</h5> <span>{`${capitalizeFirstLetter(props.userPicked?.fypProfile.role)} - ${props.userPicked?.fakultas}`}</span>
                </div>
              </div>
              {
                invitable
                &&
                <div className="text-center">
                  <Button
                    color="primary"
                    variant="contained"
                    align='center'
                    startIcon={<GroupAddIcon />}
                    style={{ margin: "0 auto" }}
                    onClick={inviteToTeam}
                  >
                    Invite to group
                  </Button>
                </div>
              }
              <MDEditor.Markdown source={props.userPicked?.fypProfile.desc} />
            </>
        }
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

const Partner = () => {
  const [users, setUsers] = React.useState()
  const [userPicked, setUserPicked] = React.useState({
    ...JSON.parse(localStorage.getItem("user")),
    fypProfile: {
      photoUrl: "",
      role: "",
      des: "",
    }
  })
  const [searchedName, setSearchedName] = React.useState("")
  const [picker, setPicker] = React.useState(true)
  const [roles, setRoles] = React.useState()
  const [teamedUpUser, setTeamedUpUser] = React.useState([])
  const [tempUserId, setTempUserId] = React.useState()
  const [user, setUser] = React.useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const getData = async () => {
      // getting user role
      const { data } = await axios.get(`${BACKEND_URL}/users/fyp/${user.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth")}`,
        },
      });
      const userData = data.data
      const userRole = userData.fypProfile.role

      const tempRoles = [
        toLogo("Hipster", HipsterLogo),
        toLogo("Hacker", HackerLogo),
        toLogo("Hustler", HustlerLogo),
      ]

      setRoles(tempRoles)

      setPicker(tempRoles[0].title.toLowerCase())

      // getting users
      const res = await axios.get(`${BACKEND_URL}/users/fyp`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth")}`,
        },
      });
      setUsers(res.data);

      const membersRef = db.collectionGroup('members');
      membersRef.get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            setTempUserId(doc.data().userId)
          })
        })
    };
    const toLogo = (title, Component) => ({ title, component: <Component /> })
    getData();
  }, []);

  React.useEffect(() => {
    setTeamedUpUser([...teamedUpUser, tempUserId])
  }, [tempUserId])

  const variants = {
    scale: { scale: 1.25 },
    shrink: { scale: 1 }
  };
  return <>
    <MyVerticallyCenteredModal
      user={user}
      show={open}
      open={open}
      onHide={() => setOpen(false)}
      userPicked={userPicked}
      invitable={!teamedUpUser.includes(userPicked?.id)}
    />
    <BackButton to={'/faction/fyp'} />
    <RolesWrapper >
      {
        roles?.map(role =>
          <motion.div
            variants={variants}
            animate={(picker === role.title.toLowerCase()) ? "scale" : "shrink"}
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
    <div style={{ margin: "0 1rem", padding: "1rem", display: "flex", justifyContent: "space-between" }}>
      <Text type="secondary" color="black" style={{ margin: "auto 0" }}>People</Text>
      <SearchWrapper>
        <div class="search-box">
          <button class="btn-search"><SearchIcon /></button>
          <input type="text" class="input-search" placeholder="Search partner" onChange={e => setSearchedName(e.target.value)} />
        </div>
      </SearchWrapper>
    </div>
    {
      users?.filter(user => (user.fypProfile?.role === picker)).filter(user => user?.name?.toLowerCase().includes(searchedName.toLowerCase())).map(user => <>
        <AnimatePresence>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <UserCard>
              <div style={{ display: 'flex', gap: "0.5rem" }}>
                <Avatar style={{ width: "2rem", height: "2rem" }} src={user.fypProfile.photoUrl} />
                <Text type="secondary" color="black" style={{ margin: "auto 0" }}>
                  {user.name}
                </Text>
              </div>
              <div style={{ display: 'flex', gap: "0.5rem", justifyContent: "center", alignItems: "center" }}>
                {
                  teamedUpUser.includes(user.id)
                    ?
                    <Chip label="Teamed Up" color="primary" variant="outlined" />
                    :
                    <Chip label="Not Teamed Up" color="secondary" variant="outlined" />
                }
                <Button variant="contained" color="primary" onClick={() => { setUserPicked(user); setOpen(true) }}>
                  Show profile
                </Button>
              </div>
            </UserCard>
          </motion.div>
        </AnimatePresence>
      </>)
    }
  </>
}

export default Partner

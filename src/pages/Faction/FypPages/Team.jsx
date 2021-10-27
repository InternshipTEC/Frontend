import React from "react";
import {
  Paper,
  TextField,
  Button,
  IconButton,
} from "@material-ui/core";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
  } from "@material-ui/core";
import Text from "../../../components/shared/Text";
import BackButton from "../../../components/shared/BackButton";
import CancelIcon from '@material-ui/icons/Cancel';
import Avatar from "@material-ui/core/Avatar";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { makeStyles } from "@material-ui/core";
import {
  ChatController,
  MuiChat,
} from 'chat-ui-react';
import CircularProgress from '@material-ui/core/CircularProgress';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Col, Row } from 'react-bootstrap';
import axios from 'axios'
import { BACKEND_URL } from '../../../controller'
import app from '../../../base'
import firebase from 'firebase'

const db = app.firestore()

const flex = {
  display: "flex",
  alignItems: "baseline",
  justifyContent: "space-evenly"
};

const styles = makeStyles(({ spacing: { unit } }) => ({
  root: {
    margin: `${unit * 3}px auto`,
    padding: unit * 2,
    maxWidth: 400
  },
  header: {
    ...flex,
    marginTop: unit * 2
  },
  form: {
    ...flex,
    marginBottom: unit
  }
}));

var generateTeamId = () => '_' + Math.random().toString(36).substr(2, 9);

const Team = () => {
  const membersRef = db.collectionGroup('members');
  const [team, setTeam] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  const [user, _] = React.useState(
    JSON.parse(localStorage.getItem("user"))
  );
  React.useEffect(() => {
    membersRef.where("userId", "==", user.id).get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.parent.parent.get()
            .then((snapshot) => {
              setTeam({
                name: snapshot.data().name,
                id: snapshot.id,
                ref: snapshot.ref
              })
            })
        })
        setLoading(false)
      })
  }, [])
  return (loading ? <CircularProgress /> : (team ? <AfterTeamedUp team={team} /> : <TeamUp />))
}

const TeamUp = () => {
  const classes = styles();
  const exercises = [
    { id: 1, title: "FYP ngab team invited you to join their team" },
    { id: 2, title: "FYP ngab team invited you to join their team" },
    { id: 3, title: "FYP ngab team invited you to join their team" },
  ]
  const [teamName, setTeamName] = React.useState("Team Name")
  const [teamCode, setTeamCode] = React.useState("Team Code")
  const teamsRef = db.collection('team');
  const [user, _] = React.useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const createTeam = async () => {
    const teamCode = generateTeamId()
    const docRef = teamsRef.doc(teamCode)
    await docRef.set({
      name: teamName,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
    const membersRef = docRef.collection('members')
    try {
      await membersRef.add({
        userId: user.id,
        userName: user.name
      })
    } catch (err) {
      alert(err.toString())
    }
  }

  const joinTeam = async () => {
    const docRef = teamsRef.doc(teamCode)
    docRef.get()
      .then(async (doc) => {
        if (doc.exists) {
          const membersRef = docRef.collection('members')
          try {
            await membersRef.add({
              userId: user.id,
              userName: user.name
            })
          } catch (err) {
            alert(err.toString())
          }
        } else {
          alert("There is no team with such id!")
        }
      })


  }

  return <div style={{ height: '100vh' }}>
    <BackButton to={'/faction/fyp'} />
    <Paper className={classes.root}>
      <Text type="primary" align="center">
        Team Up
      </Text>
      <form className={classes.form}>
        <TextField
          name="title"
          label="Create a team"
          value={teamName}
          onChange={(e) => { setTeamName(e.target.value) }}
          margin="normal"
        />
        <Button onClick={createTeam} color="primary" variant="outlined" >
          Create
        </Button>
      </form>
      <form className={classes.form}>
        <TextField
          name="title"
          label="Join a team"
          value={teamCode}
          onChange={(e) => setTeamCode(e.target.value)}
          margin="normal"
        />
        <Button onClick={joinTeam} color="primary" variant="outlined">
          &nbsp; Join &nbsp;
        </Button>
      </form>
      <hr />
      <Text>
        Invitations :
      </Text>
      <List>
        {exercises.map(({ id, title }, idx) => (
          <>
            <ListItem key={id}>
              <ListItemText primary={title} style={{ maxWidth: "70%" }} />
              <ListItemSecondaryAction>
                <IconButton
                  color="primary"
                  onClick={() => { }}
                >
                  <CheckCircleIcon />
                </IconButton>
                <IconButton
                  color="red"
                  onClick={() => { }}
                >
                  <CancelIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            {
              idx !== exercises.length
              &&
              <hr />
            }
          </>
        ))}
      </List>
    </Paper>
  </div>
}


function capitalizeFirstLetter(string) {
  return string?.charAt(0).toUpperCase() + string?.slice(1);
}

const AfterTeamedUp = ({ team }) => {
  const [chatCtl] = React.useState(new ChatController());
  const [tempMembers, setTempMembers] = React.useState()
  const [members, setMembers] = React.useState([])
  const [user, setUser] = React.useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [loading, setLoading] = React.useState(true)
  const [userPhotoUrl, setPhotoUrl] = React.useState('-')
  const messageRef = db.collection('chat');
  React.useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`${BACKEND_URL}/users/fyp/${user.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth")}`,
        },
      });
      const userData = data.data
      const tempPhotoUrl = userData.fypProfile.photoUrl
      setPhotoUrl(tempPhotoUrl)
      const snapshot = await team.ref?.collection('members').get()
      for (let i = 0; i < snapshot.docs.length; i++) {
        const { data } = await axios.get(`${BACKEND_URL}/users/fyp/${snapshot.docs[i].data().userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth")}`,
          },
        });
        const memberData = data.data
        const role = memberData.fypProfile.role
        const photoUrl = memberData.fypProfile.photoUrl
        const name = memberData.name
        setTempMembers({ photoUrl, name, role })
      }

      messageRef.where("teamId", "==", team.id).orderBy("createdAt", 'desc').limit(50)
        .get().then(async (snapshot) => {
          for (var i = 0; i < snapshot.docs.length - 1; i++) {
            const data = snapshot.docs[i].data()
            if (user.id === data.userId) {
              await chatCtl.addMessage({
                type: 'text',
                content: data.message,
                self: (user.id === data.userId),
              });
            } else {
              await chatCtl.addMessage({
                type: 'text',
                content: data.message,
                self: (user.id === data.userId),
                avatar: data.photoUrl
              });
            }
          }
          setLoading(false);
        })
      messageRef.where("teamId", "==", team.id).orderBy("createdAt", 'desc').limit(1)
        .onSnapshot(async (querySnapshot) => {
          querySnapshot.forEach(async (doc) => {
            if (user.id !== doc.data().userId) {
              await chatCtl.addMessage({
                type: 'text',
                content: doc.data().message,
                self: (user.id === doc.data().userId),
                avatar: (doc.data().photoUrl ? doc.data().photoUrl : null)
              });
            }
          });
        });
    }
    getData()
  }, [])

  React.useEffect(() => {
    if (tempMembers) {
      setMembers([...members, tempMembers])
    }
  }, [tempMembers])

  React.useMemo(async () => {
    chatCtl.setActionRequest(
      { type: 'text', always: true },
      async (response) => {
        await messageRef.add({
          message: response.value,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          userId: user.id,
          teamId: team.id,
          photoUrl: userPhotoUrl
        })
      }
    );
  }, [chatCtl, userPhotoUrl]);

  const exit = () => {
    team.ref.collection("members").where("userId","==",user.id).get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          doc.ref.delete()
        })
      })
  }

  React.useMemo(async () => {
    // change users_team to real user team
    await chatCtl.addMessage({
      type: 'text',
      content: `Hello, What's your name.`,
      self: false,
      avatar: '-'
    });
  }, [chatCtl])

  // Only one component used for display
  return <>
    <BackButton to={'/faction/fyp'} />
    <br />
    <br />
    <Row>
      <Col xs={8}>
        <Paper style={{ height: "70vh", marginBottom: "5rem" }}>
          <Button
            color="secondary"
            startIcon={<ExitToAppIcon />}
            style={{
              position: "absolute",
              top: "0.5rem",
              right: "2rem"
            }}
            onClick={exit}
          >
            Exit Team
          </Button>
          <Text type="primary" size={1.5} style={{ padding: "0.5rem" }}>
            Team {team.name}
          </Text>
          <Text type="secondary" style={{ padding: "0.5rem" }}>
            id : {team.id}
          </Text>
          <hr />
          {
            loading
            ? 
            <CircularProgress />
            :
            <MuiChat chatController={chatCtl} />
          }
        </Paper>
      </Col>
      <Col>
        <Paper>
          <List>
            <h4 style={{ padding: "1rem" }}>
              Members :
            </h4>
            {members.map(({ name, photoUrl, role }, idx) => (
              <>
                <ListItem key={idx}>
                  <Avatar src={photoUrl} style={{ width: "2rem", height: "2rem" }} />
                  <Text type="secondary" color="black" style={{ padding: '0 1rem' }}>
                    {capitalizeFirstLetter(role)} - {name}
                  </Text>
                </ListItem>
                {
                  idx !== members.length
                  &&
                  <hr />
                }
              </>
            ))}
          </List>
        </Paper>
      </Col>
    </Row>
  </>;
}

export default Team

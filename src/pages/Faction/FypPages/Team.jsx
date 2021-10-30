import React from "react";
import {
  Paper,
  TextField,
  Button,
} from "@material-ui/core";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from "@material-ui/core";
import Text from "../../../components/shared/Text";
import BackButton from "../../../components/shared/BackButton";
import { makeStyles } from "@material-ui/core";
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory } from "react-router-dom";
import axios from 'axios'
import { BACKEND_URL } from '../../../controller'
import app from '../../../base'
import firebase from 'firebase'
import AfterTeamedUp from './Team/AfterTeamedUp.jsx'

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
  const [invitations, setInvitations] = React.useState([])
  const [teamName, setTeamName] = React.useState("Team Name")
  const history = useHistory()
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
      history.push('/faction/fyp/team')
    } catch (err) {
      alert(err.toString())
    }
  }

  const joinTeam = () => {
    const docRef = db.collection('team').doc(teamCode)
    docRef.get()
      .then(async (doc) => {
        if (doc.exists) {
          const membersRef = docRef.collection('members')
          try {
            await membersRef.add({
              userId: user.id,
              userName: user.name
            })
            history.push('/faction/fyp/team')
          } catch (err) {
            alert(err.toString())
          }
        } else {
          alert("There is no team with such id!")
        }
      })
  }

  const joinInvitation = (props) => {
    const docRef = teamsRef.doc(props.teamCode)
    docRef.get()
      .then(async (doc) => {
        if (doc.exists) {
          const membersRef = docRef.collection('members')
          try {
            const snapshot = await membersRef.get()
            var hacker=0, hipster=0, hustler=0;
            for (const index in snapshot.docs) {
              const { data } = await axios.get(`${BACKEND_URL}/users/fyp/${snapshot.docs[index].data().userId}`, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("auth")}`,
                },
              });
              const userData = data.data
              const userRole = userData.fypProfile.role
              if (userRole === "hacker") {
                hacker += 1
              } else if (userRole === "hipster") {
                hipster += 1
              } else {
                hustler += 1
              }
            }
            const { data } = await axios.get(`${BACKEND_URL}/users/fyp/${user.id}`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("auth")}`,
              },
            });
            const userData = data.data
            const userRole = userData.fypProfile.role

            if (
              (userRole === "hacker" && hacker<1)
              ||
              (userRole === "hipster" && hipster<5)
              ||
              (userRole === "hustler" && hustler<4)
            ) {
              await membersRef.add({
                userId: user.id,
                userName: user.name
              })
              history.push('/faction/fyp/team')
            } else {
              alert("Team full!")
            }
          } catch (err) {
            alert(err.toString())
          }
        } else {
          alert("Id of team not found! possibly team deleted by admin, please contact fyp contact person")
        }
      })
  }
  
  const [tempInvitation, setTempInvitation] = React.useState()

  React.useEffect(() => {
    db.collection('notification').where("userId", "==", user.id)
      .get().then((snapshot) => {
        snapshot.docs.forEach((docs) => {
          setTempInvitation(docs.data())
        })
      })
  }, [])

  React.useEffect(()=>{
    if(tempInvitation){
      setInvitations([...invitations, tempInvitation])
    }
  },[tempInvitation])



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
        {invitations.map((invitation, idx) => (
          <>
            <ListItem key={idx}>
              <ListItemText primary={invitation.teamName + " team invited you to join their team!"} style={{ maxWidth: "70%" }} />
              <ListItemSecondaryAction>
                <Button onClick={() => joinInvitation({ teamCode: invitation.teamCode })} color="primary" variant="outlined">
                  &nbsp; Join &nbsp;
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
            {
              idx !== invitations.length
              &&
              <hr />
            }
          </>
        ))}
      </List>
    </Paper>
  </div>
}

export default Team

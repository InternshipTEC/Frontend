import React from "react";
import Avatar from "@material-ui/core/Avatar";
import {
  ChatController,
  MuiChat,
} from 'chat-ui-react';
import Text from "../../../../components/shared/Text";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Col, Row } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import app from '../../../../base'
import { BACKEND_URL } from '../../../../controller'
import firebase from 'firebase'
import BackButton from "../../../../components/shared/BackButton";
import axios from 'axios'
import {
  Paper,
  Button,
} from "@material-ui/core";
import {
  List,
  ListItem,
} from "@material-ui/core";

const db = app.firestore()

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
  const history = useHistory()
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

      messageRef.where("teamId", "==", team.id).orderBy("createdAt")
        .get().then(async (snapshot) => {
          for (var i = 0; i < snapshot.docs.length; i++) {
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
    team.ref.collection("members").where("userId", "==", user.id).get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          doc.ref.delete()
        })
      })
    history.push('/faction/fyp/team')
  }


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

export default AfterTeamedUp;

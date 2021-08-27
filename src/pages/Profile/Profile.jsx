import { Avatar } from "@material-ui/core";
import React, { useContext } from "react";
import styled from "styled-components";
import { GlobalProvider } from "../../Auth";
import Text from "../../components/shared/Text";
import {Redirect} from 'react-router-dom'
import { Button } from "react-bootstrap";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;


const Card = styled.div`
  padding: 5rem;
  min-width:80vw;
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.5);
  box-shadow: 0px 4px 8px #ffffff;
  border-radius: 20px;
  gap: 1rem;
`;


const parseIdTEC = (number) => {
  const text = number.toString()
  let finalText = ""
  while(finalText.length!==3){
    if(finalText.length+text.length===3){
      finalText+=text
    } else {
      finalText+="0"
    }
  }
  return "TEC" + finalText
}

const Profile = () => {
    const [user, setUser] = React.useState(JSON.parse(localStorage.getItem("user")))
    React.useEffect(()=>{
      setUser(JSON.parse(localStorage.getItem("user")))
    },[])

    if(user.name){
      return (
        <Page>
          <Card>
                <div style={{display:"flex", alignItems:"center", gap:"1rem"}}>
                    <Avatar alt="avatar" />
                    <Text type="paragpraph" size={1.53}>Profile</Text>
                </div>
                <hr/>
                <div>
                  <Text>
                    Name
                  </Text>
                  <Text size={1.53}><strong>{user.name}</strong></Text>
                </div>
                <div>
                  <Text>
                    Fakultas
                  </Text>
                  <Text size={1.53}><strong>{user.fakultas}</strong></Text>
                </div>
                <div>
                  <Text>
                    No. TEC
                  </Text>
                  <Text size={1.53}><strong>{parseIdTEC(user.id)}</strong></Text>
                </div>
                <div>
                  <Text>
                    Akun terverifikasi
                  </Text>
                  <Text size={1.53} style={{color:(user.verified ? "green" : "red")}}><strong>{user.verified ? "Sudah" : "Belum"}</strong></Text>
                </div>
                {
                  user.verified
                  &&
                <div>
                  <Text>
                    Group line
                  </Text>
                  <Button href="https://line.me/R/ti/g/41K9vPf8H_">Link group line</Button>
                </div>
                }
          </Card>
        </Page>
      );
    }

    return <Redirect to="/signup"/>
};

export default Profile;


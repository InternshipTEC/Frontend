import { Avatar } from "@material-ui/core";
import React, { useContext } from "react";
import styled from "styled-components";
import { GlobalProvider } from "../../Auth";
import { GlobalContext } from "../../Auth";
import { BACKEND_URL } from "../../controller";
import axios from "axios";
import { ADD_USER } from "../../authReducers";
import Text from "../../components/shared/Text";
import {Redirect} from 'react-router-dom'
import { Button } from "react-bootstrap";
import {motion} from 'framer-motion'

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
const [lineLink, setLineLink] = React.useState("https://line.me/R/ti/g/41K9vPf8H_")
    const {dispatch} = React.useContext(GlobalContext)
    React.useEffect(()=>{
      axios.get(`${BACKEND_URL}/users/${user.id}`,{
	      headers:{
		Authorization: `Bearer ${localStorage.getItem("auth")}`
	      }
      }) 
	    .then(res=>res.data)
	    .then(data=>{
	      dispatch({type:ADD_USER,user:data.data})
	      setUser(JSON.parse(localStorage.getItem("user")))
		if(data.data.id > 925){
			setLineLink("https://line.me/R/ti/g/E7uy2TqMU_")
		}
	    })
    },[])

    if(user.name){
      return (
        <motion.div
          initial={{opacity:0}}
          animate={{opacity:1}}
          exit={{ opacity: 0 }}
          transition={{duration:1}}    
        >
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
                  <Button href={lineLink}>Link group line</Button>
                </div>
                }
          </Card>
        </Page>
    </motion.div>
      );
    }

    return <Redirect to="/signup"/>
};

export default Profile;


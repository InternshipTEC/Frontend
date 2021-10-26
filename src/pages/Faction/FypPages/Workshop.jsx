import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { BACKEND_URL } from '../../../controller.js'
import MDEditor from '@uiw/react-md-editor';

const Container = styled.div`
  background: #FFFFFF;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
  padding: 1rem;
  margin: 1rem;
`

const Workshop = () => {
  const [MDSource, setMDSource] = React.useState("")
  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    const getData = async () => {
      const { data } = await axios.get(`${BACKEND_URL}/users/fyp/${user.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth")}`,
        },
      });
      const userData = data.data
      const fypProfile = userData.fypProfile
      const { fypData } = await axios.get(`${BACKEND_URL}/fyp-blog/role/${fypProfile.role}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth")}`,
        },
      });
      const fypBlog = fypData.data
      setMDSource(fypBlog.content)
    }
    getData()
  }, [])
  return <Container>
    <MDEditor.Markdown source={MDSource} />
  </Container>
}

export default Workshop

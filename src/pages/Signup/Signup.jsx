import AccountBox from '@material-ui/icons/AccountBox';
import Backup from '@material-ui/icons/Backup';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import Timeline from '@material-ui/lab/Timeline';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
import { Redirect } from 'react-router';
import styled from 'styled-components';
import Text from '../../components/shared/Text';
import FirstRegisterForm from '../../components/SignupPageComponents/FirstRegisterForm';
import SecondRegisterForm from '../../components/SignupPageComponents/SecondRegisterForm';
import { SignupProvider } from '../../components/SignupPageComponents/SignupProvider';
import ThirdRegisterForm from '../../components/SignupPageComponents/ThirdRegisterForm';


const Wrapper = styled.div`
    width:80%;
    margin:0 auto;
`
const Positioner = styled.div`
    margin-top:2rem;
    min-height:80vh;
    width:100%;
    display:flex;
    justify-content:center;
    align-items: center;
`

const TimelineCard = styled(Card)`
    padding:1rem;
    background: rgba(255,255,255,0.5);
    box-shadow: 0px 4px 8px #ffffff;
    border: 2px solid white;
    min-height: 100%;
`

const forms = [
    <FirstRegisterForm/>,
    <SecondRegisterForm/>,
    <ThirdRegisterForm/>,
]

const Signup = () => {
    const [whichForm, setWhichForm] = React.useState(0)
    const [user, setUser] = React.useState(localStorage.getItem('user'))
    React.useEffect(()=>{
        setUser(JSON.parse(localStorage.getItem('user')))
    },[])

    const isNotMobile = useMediaQuery({
        query: "(min-width: 1040px)",
    });

    if(user.transaction){
        return <Redirect to={"/"} />
    }

    return (
        <Positioner>
            <Wrapper>
                <Row>
                    {
                    isNotMobile
                    &&
                    <Col xs={3}>
                        <TimelineCard style={{padding:"1rem`"}}>
                            <Text size={1.75}>
                                Registration
                            </Text>
                        <Timeline >
                            <TimelineItem>
                                <TimelineOppositeContent style={{flex:0}}/>
                                <TimelineSeparator>
                                    <TimelineDot style={{cursor:"pointer"}} onClick={()=>setWhichForm(0)} color={whichForm === 0 ? "primary" : undefined}>
                                        <AccountBox/>
                                    </TimelineDot>
                                <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent>
                                    Pengisian data diri
                               </TimelineContent>
                            </TimelineItem>
                            <TimelineItem>
                                <TimelineOppositeContent style={{flex:0}}/>
                                <TimelineSeparator>
                                    <TimelineDot style={{cursor:"pointer"}} onClick={()=>setWhichForm(1)} color={whichForm === 1 ? "primary" : undefined}>
                                        <LaptopMacIcon/>
                                    </TimelineDot>
                                <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent>
                                    Pengisian data registrasi
                               </TimelineContent>
                            </TimelineItem>
                            <TimelineItem>
                                <TimelineOppositeContent style={{flex:0}}/>
                                <TimelineSeparator>
                                <TimelineDot style={{cursor:"pointer"}} onClick={()=>setWhichForm(2)} color={whichForm === 2 ? "primary" : undefined}>
                                    <Backup/>
                                </TimelineDot>
                                </TimelineSeparator>
                                <TimelineContent>
                                    Pembayaran dan pengunggahan file
                               </TimelineContent>
                            </TimelineItem>
                        </Timeline>
                        </TimelineCard>
                    </Col>
                    }
                    <Col>
                        <TimelineCard>
                            <SignupProvider setWhichForm={setWhichForm} whichForm={whichForm}>
                                {
                                    forms[whichForm]
                                }
                            </SignupProvider>
                        </TimelineCard>
                   </Col>
                </Row>
            </Wrapper>
        </Positioner>
  )
}

export default Signup
import Button from '@material-ui/core/Button';
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
import styled from 'styled-components';
import app from '../../base';
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
    min-height:90vh;
    width:100%;
    display:flex;
    justify-content:center;
    align-items: center;
`

const TimelineCard = styled(Card)`
    padding:1rem;
    background: #e5e8ec;
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
    return (
        <Positioner>
            <Wrapper>
                <Row>
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
                                    Penunggahan File
                               </TimelineContent>
                            </TimelineItem>
                        </Timeline>
                        </TimelineCard>
                    </Col>
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
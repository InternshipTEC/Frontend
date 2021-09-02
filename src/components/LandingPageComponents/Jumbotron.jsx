import React, { useState, useEffect} from 'react'
import styled from 'styled-components'
import Text from '../shared/Text'
import { Link } from 'react-router-dom'
import Image from 'react-bootstrap/Image'
import { useMediaQuery } from 'react-responsive'
import { motion,useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Logo from "../../blob/svg/LogoUtama.svg"


const Jumtron = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    gap:10px;
`

const NavLink = styled(Link)`
    color:white;
    width: 36rem;
    margin: 0 auto;
    padding: 18px;
    border-radius: 25px;
    background: #6F80A8;
    box-shadow: 0px 10px 9px #413f3f, inset 0px -10px 11px rgba(255, 255, 255, 0.25);
    border-radius: 21px;
`

const LinkWrapper = styled.div`
    margin: 5rem 0.5rem;
 
`

const Parg = styled.div`
    margin: ${props => props.mobile ?` 3rem 9rem 0 9rem` : "0 1rem"};
`

const RegistrationDeadline = styled.div`
    width: 36rem;
    margin: 0 auto;
    padding: 10px;
    background: linear-gradient(355.42deg, #B9C4D6 -138.68%, #6277A1 120.58%);
    box-shadow: 0px 10px 9px rgba(255, 255, 255, 0.25), inset 0px -10px 11px rgba(255, 255, 255, 0.25);
    border-radius: 40px;
`

const Jumbotron = () => {
    const isMobile = useMediaQuery({
        query: '(min-width: 500px)'
    });
    const calculateTimeLeft = () => {
	var now = new Date()
	now.setHours(now.getHours()-17)
        var difference = new Date("2021-09-02") - now

        let timeLeft = {};
    
        if (difference > 0) {
          timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
          };
        }
    
        return timeLeft;
      };
    
      const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    
      useEffect(() => {
        setTimeout(() => {
          setTimeLeft(calculateTimeLeft());
        }, 1000);
      });
    
      const timerComponents = [];
    
      Object.keys(timeLeft).forEach((interval) => {
        if (!timeLeft[interval]) {
          return;
        }
    
        timerComponents.push(
          <>
            {timeLeft[interval]} {interval}{" "}
          </>
        );
      });
    
    const parg = {
        hidden: {opacity: 0,y: 30},
        visible: {opacity: 1, y: 0}
    }

    const controls = useAnimation();
    const [ref, inView] = useInView();

    useEffect(()=>{
        if(inView){
            controls.start('visible')
        }
    }, [controls,inView]);
    
    return (
        <>
            <Jumtron>
                <motion.div
                initial={{ opacity: 0}}
                animate={{ opacity: 1, y: -80 }}
                transition={{ duration : 2 }}
                >
                <Text size={2.75} type="primary">
                    WELCOME TO TEC INTERNSHIP
                </Text>
                 <Text size={2} fontStyle="italic" type="secondary">
                    Global &nbsp; &nbsp; &nbsp; • &nbsp; &nbsp; &nbsp;  Enrich &nbsp; &nbsp; &nbsp;   •  &nbsp; &nbsp; &nbsp;  High Impact
                </Text>
                <Image src={Logo} height="300rem"/>
                {/* <Text type="secondary">
                    <LinkWrapper>
                        <NavLink to="/login">
                            Join Us
                        </NavLink>
                    </LinkWrapper>
                </Text> */}
                <RegistrationDeadline>
                    <Text size={1.25} type="secondary" color="white">Registration is closed!</Text>
                    {/* <Text size={1.25} type="secondary" color="white">Registration will be closed in &nbsp;</Text>
                    <Text size={1.25} type="secondary"> {timerComponents} </Text> */}
                </RegistrationDeadline>
                </motion.div>
            </Jumtron>
            <motion.p
            ref={ref}
            animate={controls}
            initial="hidden"
            transition={{duration:0.5}}
            variants={parg}>
            <Parg mobile={isMobile}>
                <Text type="primary" size={3}>
                    TEC INTERNSHIP
                </Text>
                <Text type="paragraph" align="justify" size={1.1}>
                TEC Internship adalah proses penerimaan anggota baru yang dijalani oleh mahasiswa ITB sebelum menjadi anggota resmi TEC ITB. TEC Internship menjadi langkah awal calon anggota memperoleh keilmuan bisnis di TEC ITB. Pada TEC Internship akan banyak kegiatan untuk belajar ilmu bisnis seperti business class berupa webinar dan mentoring ataupun praktik langsung merancang suatu bisnis dengan diadakannya kompetisi bisnis antar peserta.
                </Text>
            </Parg>
            </motion.p>
        </>
    )
}

export default Jumbotron

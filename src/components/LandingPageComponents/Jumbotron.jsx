import React from 'react'
import styled from 'styled-components'
import Text from '../shared/Text'
import { Link } from 'react-router-dom'
import Image from 'react-bootstrap/Image'

const Jumtron = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
`

const NavLink = styled(Link)`
    color: white;
    padding: 0.7rem 2rem;
    clip-path: polygon(25% 0%, 100% 0, 100% 60%, 80% 100%, 0 100%, 0 40%);
    background: #016081;
`

const LinkWrapper = styled.div`
    margin: 2rem 0.5rem;
    filter: drop-shadow(5px 4px 4px #ffffff);
`

const Parg = styled.div`
    margin: 3rem 3rem;
`

const Jumbotron = () => {
    return (
        <>
            <Jumtron>
                <Text size={2.75} type="primary">
                    WELCOME TO TEC INTERNSHIP
                </Text>
                <Text size={2} fontStyle="italic" type="secondary">
                    Global • Enrich •  High Impact
                </Text>
                <Image src="logoTEC.svg" height="300rem"/>
                <Text type="secondary">
                    <LinkWrapper>
                        <NavLink to="/signup">
                            Join Us
                        </NavLink>
                    </LinkWrapper>
                </Text>
            </Jumtron>
            <Parg>
                <Text type="primary" size={3}>
                    TEC INTERNSHIP
                </Text>
                <Text type="paragraph" size={1.1}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </Text>
            </Parg>
        </>
    )
}

export default Jumbotron

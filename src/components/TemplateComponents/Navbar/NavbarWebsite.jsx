import React from 'react'
import { Navbar, Nav} from 'react-bootstrap'
// import {ReactComponent as LogoTEC} from '../../../blob/svg/logoTEC.svg'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import LogoTEC from '../../../blob/images/LogoTEC.png'
import { useMediaQuery } from 'react-responsive'


const TemplateNav = styled(Navbar)`
    background: transparent; 
    font-size: 20px;
`

const NavLink = styled(Link)`
    color: white;
    padding: ${props => props.active ? "0.7rem 2rem" : "0.5rem 0"};
    clip-path: ${props => props.active ? "polygon(25% 0%, 100% 0, 100% 60%, 80% 100%, 0 100%, 0 40%)" : "none"};
    background:  ${props => props.active ? "#016081" : "none"};
`

const LinkWrapper = styled.div`
    margin: ${props => props.drowpdown ? "0 0.5rem" : "0.5rem 0.5rem"};
    filter: ${props => props.active ? "drop-shadow(5px 4px 4px #ffffff)" : "none"} ;
`

const NavbarWebsite = () => {
    const isDropdown = useMediaQuery({
        query: '(min-width: 992px)'
    });
    return ( <>
        <TemplateNav variant="dark" expand="lg">
        <img src={LogoTEC} alt="logo tec"/>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto"></Nav>
                <Nav> 
                    <LinkWrapper>
                        <NavLink dropdown={isDropdown} to="/">Home</NavLink>
                    </LinkWrapper>
                    <LinkWrapper>
                        <NavLink dropdown={isDropdown} to="#about">About TEC</NavLink>
                    </LinkWrapper>
                    <LinkWrapper active={isDropdown}>
                        <NavLink to="/login" active={isDropdown}>Log in</NavLink>
                    </LinkWrapper>
                </Nav>
           </Navbar.Collapse>
        </TemplateNav>
        </>
    )
}

export default NavbarWebsite 

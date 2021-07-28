import React, {useContext} from 'react'
import { Navbar, Nav} from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import LogoTEC from '../../../blob/images/LogoTEC.png'
import { useMediaQuery } from 'react-responsive'
import { AuthContext } from "../../../Auth";
import * as controller from "../../../controller"

const TemplateNav = styled(Navbar)`
    background: transparent; 
    font-size: 20px;
    background: linear-gradient(296.83deg, #016081 -76.79%, #17161B 148.1%);
    border-bottom: 5px solid #B9C4D6;
`

const NavLink = styled(Link)`
    color: white;
    padding: ${props => props.active ? "0.7rem 2rem" : "0.5rem 0"};
    clip-path: ${props => props.active ? "polygon(25% 0%, 100% 0, 100% 60%, 80% 100%, 0 100%, 0 40%)" : "none"};
    background:  ${props => props.active ? (props.color ? props.color : "#016081") : "none"};
`

const LinkWrapper = styled.div`
    margin: ${props => props.dropdown ? "0 0.5rem" : "0.5rem 0.5rem"};
    filter: ${props => props.active ? "drop-shadow(5px 4px 4px #ffffff)" : "none"} ;
`

const NavbarWebsite = () => {
    const history = useHistory();
    const isDropdown = useMediaQuery({
        query: '(min-width: 992px)'
    });
    const {currentUser} = useContext(AuthContext);
    return ( <>
        <TemplateNav variant="dark" expand="lg">
        <img style={{width:"5rem"}} onClick={()=>history.push("/")} src={LogoTEC} alt="logo tec"/>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto"></Nav>
                <Nav> 
                    <LinkWrapper>
                        <NavLink dropdown={isDropdown} to="/">Home</NavLink>
                    </LinkWrapper>
                    <LinkWrapper>
                        <NavLink dropdown={isDropdown} to="/about">About TEC</NavLink>
                    </LinkWrapper>
                    {
                        currentUser 
                        ?
                        <LinkWrapper active={isDropdown}>
                            <NavLink onClick={controller.handleLogout} color="red" active={isDropdown}>Log out</NavLink>
                        </LinkWrapper>
                        : 
                        <LinkWrapper active={isDropdown}>
                            <NavLink to="/login" active={isDropdown}>Log in</NavLink>
                        </LinkWrapper>
                    }
                </Nav>
           </Navbar.Collapse>
        </TemplateNav>
        </>
    )
}

export default NavbarWebsite 

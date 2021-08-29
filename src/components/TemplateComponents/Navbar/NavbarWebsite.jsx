import React, {useContext} from 'react'
import { Navbar, Nav} from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import LogoTEC from '../../../blob/images/LogoPojok.png'
import { useMediaQuery } from 'react-responsive'
import { GlobalContext } from "../../../Auth";
import * as controller from "../../../controller"
import { UPDATE_AUTH, ADD_USER } from '../../../authReducers'
import Text from '../../shared/Text'

const TemplateNav = styled(Navbar)`
    background: transparent; 
    font-size: 20px;
    background: linear-gradient(180deg, #B9C4D6 0%, rgba(185, 196, 214, 0) 150.54%);
`

const NavLink = styled(Link)`
    color:#ffffff;
    padding: ${props => props.active ? "0.7rem 2rem" : "0.5rem 0"};
    box-shadow: ${props => props.active ? "0px 4px 25px rgba(0, 0, 0, 0.25);" : "none"};
    border-radius: ${props => props.active ? "25px" : "none"};
    background:  ${props => props.active ? (props.color ? props.color : "#6F80A8") : "none"};
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
    const {token, dispatch} = useContext(GlobalContext);
    return ( <>
        <TemplateNav variant="dark" expand="lg">
        <img style={{width:"5rem"}} onClick={()=>history.push("/")} src={LogoTEC} alt="logo tec"/>
        {/* <Navbar.Toggle aria-controls="basic-navbar-nav" />
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
                        token
                        ?
                        <>
                        <LinkWrapper>
                            <NavLink to="/profile">Profile</NavLink>
                        </LinkWrapper>
                        <LinkWrapper active={isDropdown}>
                            <NavLink onClick={()=>{controller.handleLogout();dispatch({type:UPDATE_AUTH});localStorage.clear("user")}} color="red" active={isDropdown}>Log out</NavLink>
                        </LinkWrapper>
                        </>
                        : 
                        <LinkWrapper active={isDropdown}>
                            <NavLink to="/login" active={isDropdown}>Log in</NavLink>
                        </LinkWrapper>
                    }
                </Nav>
           </Navbar.Collapse> */}
        </TemplateNav>
        </>
    )
}

export default NavbarWebsite 

import React from 'react'
import styled, {css} from 'styled-components'
import {ReactComponent as InstagramBlank}  from '../../blob/svg/instagram _blank.svg'
import {ReactComponent as InstagramColored}  from '../../blob/svg/instagram_colored.svg'
import {ReactComponent as LinkedinBlank}  from '../../blob/svg/linkedin_blank.svg'
import {ReactComponent as LinkedinColored}  from '../../blob/svg/linkedin_colored.svg'
import {ReactComponent as LineBlank}  from '../../blob/svg/line_blank.svg'
import {ReactComponent as LineColored}  from '../../blob/svg/line_colored.svg'
import Logo from '../shared/Logo'
import { useMediaQuery } from 'react-responsive'
import Text from '../shared/Text'

const CustomFooter = styled.div`
    position:relative;
    padding: 1rem 1rem;
    display:flex;
    background-color:#0D677C;
    ${props=>{
        if(!props.stacked){
            return css`
                flex-direction: column;
            `
        }
    }}
`

const CopyrightCol = styled.div`
    display:flex;
    width: 100%;
    justify-content: flex-end;
    & > ${Text} {
        margin: 0 auto;
    }
`

const LogoCol = styled.div`
    display:flex;
    gap:0.5rem;
    right:1rem;
    bottom:0.7rem;
    ${props => {
        if(props.stacked){
            return css`
                position:absolute;
            ` 
        }
        else {
            return css`
                width: 100%;
                justify-content: center;
                padding: 1rem 0;
            `
        }
    } }
`

const Logos = [
    {
        before:InstagramBlank,
        after:InstagramColored,
        link:"https://www.instagram.com/tec.itb/"
    },
    {
        before:LineBlank,
        after:LineColored,
        link:"https://www.instagram.com/tec.itb/"
    },
    {
        before:LinkedinBlank,
        after:LinkedinColored,
        link:"https://www.linkedin.com/company/techno-entrepreneur-club-itb/"
    }
]

const Footer = () => {
    const isStacked = useMediaQuery({
        query: '(min-width: 992px)'
    });
    return (
        <CustomFooter stacked={isStacked}>
            <CopyrightCol>
                <Text type="paragraph">
                    © 2021 Copyright TEC Internship.
                </Text>
            </CopyrightCol>
            <LogoCol stacked={isStacked}>
                {
                    Logos.map(logoDatas=><Logo LogoBefore={logoDatas.before} LogoAfter={logoDatas.after} link={logoDatas.link} />)
                }
            </LogoCol>
        </CustomFooter>
   )
}

export default Footer

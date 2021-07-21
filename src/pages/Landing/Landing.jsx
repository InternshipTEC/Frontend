import React from 'react'
import Footer from '../../components/LandingPageComponents/Footer'
import Alumnus from '../../components/LandingPageComponents/Alumnus'
import Jumbotron from '../../components/LandingPageComponents/Jumbotron'
import WhatWillYouGet from '../../components/LandingPageComponents/WhatWillYouGet'
import styled from "styled-components"

const Wrapper = styled.div`
    display:flex;
    flex-direction:column;
    gap:5rem;
`

const Landing = () => {
    return (
        <Wrapper>
            <div/>
            <Jumbotron/>
            <WhatWillYouGet/>
            <Alumnus/>
            <Footer/>
        </Wrapper>
    )
}

export default Landing

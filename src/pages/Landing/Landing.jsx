import React from 'react'
import Footer from '../../components/LandingPageComponents/Footer'
import Alumnus from '../../components/LandingPageComponents/Alumnus'
import Jumbotron from '../../components/LandingPageComponents/Jumbotron'
import WhatWillYouGet from '../../components/LandingPageComponents/WhatWillYouGet'
import Carousel from '../../components/LandingPageComponents/Carousel'
import styled from "styled-components"

const Wrapper = styled.div`
    display:flex;
    flex-direction:column;
    gap:9rem;
`

const Landing = () => {
    return (
        <Wrapper>
            <div/>
            <Jumbotron/>
            <Carousel/>
            <WhatWillYouGet/>
            <Alumnus/>
            <Footer/>
        </Wrapper>
    )
}

export default Landing

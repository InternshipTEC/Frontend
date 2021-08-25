import React from 'react'
import Footer from '../../components/LandingPageComponents/Footer'
import Alumnus from '../../components/LandingPageComponents/Alumnus'
import Jumbotron from '../../components/LandingPageComponents/Jumbotron'
import WhatWillYouGet from '../../components/LandingPageComponents/WhatWillYouGet'
import Carousel from '../../components/LandingPageComponents/Carousel'
import styled from "styled-components"
import { useMediaQuery } from "react-responsive"
import UnionKanan from '../../blob/svg/UnionKanan.svg'
import UnionKiri from "../../blob/svg/UnionKiri.svg"
import bintangHitam from "../../blob/svg/bintangHitam.svg"
import bintangPutih from "../../blob/svg/bintangPutih.svg"


const Wrapper = styled.div`
    display:flex;
    flex-direction:column;
    gap:9rem;
`

const Landing = () => {
    const isDesktop = useMediaQuery({
        query: "(min-width: 1170px)",
    })
    return (
        <Wrapper>
            <div/>
            <Jumbotron/>
            <div>
                {isDesktop && (
                    <div>
                        <img src={UnionKanan} alt="awan kanan" style={{ width: "499px", height: "163px", position: "absolute", top: "376px", left: "881px",}} />
                        <img src={UnionKanan} alt="awan kanan" style={{ width: "499px", height: "163px", position: "absolute", top: "1286px", left: "931px",}} />
                        <img src={UnionKiri} alt="awan kanan" style={{ width: "499px", height: "163px", position: "absolute", top: "641px", right: "885px",}} />
                        <img src={UnionKiri} alt="awan kanan" style={{ width: "499px", height: "163px", position: "absolute", top: "2000px", right: "885px",}} />
                        <img src={bintangPutih} alt="awan kanan" style={{ width: "66px", height: "74px", position: "absolute", top: "152px", right: "72px",}} />
                        <img src={bintangPutih} alt="awan kanan" style={{ width: "66px", height: "74px", position: "absolute", top: "302px", left: "63px",}} />
                        <img src={bintangPutih} alt="awan kanan" style={{ width: "128px", height: "145px", position: "absolute", top: "2700px", left: "72px",}} />
                        <img src={bintangHitam} alt="awan kanan" style={{ width: "40px", height: "40px", position: "absolute", top: "218px", right: "126px",}} />
                        <img src={bintangHitam} alt="awan kanan" style={{ width: "59px", height: "59px", position: "absolute", top: "682px", left: "250px",}} />
                        <img src={bintangHitam} alt="awan kanan" style={{ width: "52px", height: "52px", position: "absolute", top: "965px", right: "51px",}} />
                        <img src={bintangHitam} alt="awan kanan" style={{ width: "51px", height: "51px", position: "absolute", top: "2000px", left: "227px",}} />
                        <img src={bintangHitam} alt="awan kanan" style={{ width: "51px", height: "51px", position: "absolute", top: "2900px", right: "180px",}} />
                    </div>
                    
                )}
            </div>
            <Carousel/>
            <WhatWillYouGet/>
            <Alumnus/>
            <Footer/>
        </Wrapper>
    )
}

export default Landing

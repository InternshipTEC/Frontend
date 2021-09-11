import React from 'react'
import Footer from '../../components/LandingPageComponents/Footer'
import Alumnus from '../../components/LandingPageComponents/Alumnus'
import Jumbotron from '../../components/LandingPageComponents/Jumbotron'
import WhatWillYouGet from '../../components/LandingPageComponents/WhatWillYouGet'
import Carousel from '../../components/LandingPageComponents/Carousel'
import styled from "styled-components"
import { motion,useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
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

const anim = {
    hidden: {opacity: 0,y: 30},
    visible: {opacity: 1, y: 0}
}

const Landing = () => {
    const isDesktop = useMediaQuery({
        query: "(min-width: 1170px)",
    })

    const controls = useAnimation();
    const [ref, inView] = useInView();

    React.useEffect(()=>{
        if(inView){
            controls.start('visible')
        }
    }, [controls,inView]);
    return (
        <motion.div
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{ opacity: 0 }}
            transition={{duration:1}}    
        >
        <Wrapper>
            <div/>
            <Jumbotron/>
            <div>
                {isDesktop && (
                    <div>
                        <motion.img animate={controls} initial="hidden" transition={{duration:0.5}} variants={anim} ref={ref} src={UnionKanan} alt="awan kanan" style={{ width: "499px", height: "163px", position: "absolute", top: "376px", left: "881px",}} />
                        <motion.img animate={controls} initial="hidden" transition={{duration:1.5}} variants={anim} src={UnionKanan} alt="awan kanan" style={{ width: "499px", height: "163px", position: "absolute", top: "1286px", left: "931px",}} />
                        <motion.img animate={controls} initial="hidden" transition={{duration:2.5}} variants={anim} src={UnionKiri} alt="awan kanan" style={{ width: "499px", height: "163px", position: "absolute", top: "641px", right: "885px",}} />
                        <motion.img animate={controls} initial="hidden" transition={{duration:3.5}} variants={anim} src={UnionKiri} alt="awan kanan" style={{ width: "499px", height: "163px", position: "absolute", top: "2000px", right: "885px",}} />
                        <motion.img animate={controls} initial="hidden" transition={{duration:4.5}} variants={anim} src={bintangPutih} alt="awan kanan" style={{ width: "66px", height: "74px", position: "absolute", top: "152px", right: "72px",}} />
                        <motion.img animate={controls} initial="hidden" transition={{duration:5.5}} variants={anim} src={bintangPutih} alt="awan kanan" style={{ width: "66px", height: "74px", position: "absolute", top: "302px", left: "63px",}} />
                        <motion.img animate={controls} initial="hidden" transition={{duration:6.5}} variants={anim} src={bintangPutih} alt="awan kanan" style={{ width: "128px", height: "145px", position: "absolute", top: "2700px", left: "72px",}} />
                        <motion.img animate={controls} initial="hidden" transition={{duration:7.5}} variants={anim} src={bintangHitam} alt="awan kanan" style={{ width: "40px", height: "40px", position: "absolute", top: "218px", right: "126px",}} />
                        <motion.img animate={controls} initial="hidden" transition={{duration:8.5}} variants={anim} src={bintangHitam} alt="awan kanan" style={{ width: "59px", height: "59px", position: "absolute", top: "682px", left: "250px",}} />
                        <motion.img animate={controls} initial="hidden" transition={{duration:9.5}} variants={anim} src={bintangHitam} alt="awan kanan" style={{ width: "52px", height: "52px", position: "absolute", top: "965px", right: "51px",}} />
                        <motion.img animate={controls} initial="hidden" transition={{duration:10.5}} variants={anim} src={bintangHitam} alt="awan kanan" style={{ width: "51px", height: "51px", position: "absolute", top: "2000px", left: "227px",}} />
                        <motion.img animate={controls} initial="hidden" transition={{duration:11.5}} variants={anim} src={bintangHitam} alt="awan kanan" style={{ width: "51px", height: "51px", position: "absolute", top: "2900px", right: "180px",}} />
                    </div>
                    
                )}
            </div>
            <Carousel/>
            <WhatWillYouGet/>
            <Alumnus/>
            <Footer/>
        </Wrapper>
</motion.div>
    )
}

export default Landing

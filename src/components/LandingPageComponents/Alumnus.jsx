import React from 'react'
import styled, {css} from 'styled-components'
import { useMediaQuery } from 'react-responsive'
import Text from '../shared/Text'
import AchmadZaky from '../../blob/images/AchmadZaky.jpg'

/*
Notice: Image Alumnus menggunakan clip-path:circle() 
sehingga hitboxnya bisa berada di luar lingkaran, 
dapat digunakan border-radius agar hitbox sesuai, tetapi gambar harus 1:1 atau mendekati agar tidak oval

Problem: 
1.Kalau Paragraphnya kebanyakan, dia akan overflow ke bawah gambar utama
Solusi yg kepikiran make position absolute

2. Font "Founder of Bukalapak" belum seusai sama figma

3. Cara ngehover 1 per 1 tanpa harus buat banyak banget const?

4.Transition ada sedikit jelek kalo make clip-path
*/

const AlumnusContainer = styled.div`
    margin-bottom:100px;
`
const TitleContianer = styled.div`
    margin-left:50px;
    @media screen and (max-width:960px) {
        ${Text} {
            font-size:1.2rem;
        }
    }
    @media screen and (max-width:600px) {
        ${Text} {
            font-size:0.8rem;
        }
    }

    @media screen and (max-width:425px) {
        ${Text} {
            font-size:0.5rem;
        }
    }

    @media screen and (max-width:425px) {
         {
            margin-left:25px;
        }
    }
        
`
const DescriptionContainer = styled.div`
    position: relative;
    margin-bottom:100px;
    margin-right:30px;
    margin-left:320px;
    

    @media screen and (max-width:960px) {
        ${Text} {
            font-size:1rem;
        }
    }

    @media screen and (max-width:760px) {
         {

            margin-left:220px;
            margin-bottom:10px;
        }
    }

    @media screen and (max-width:760px) {
        ${Text} {
            font-size:0.6rem;
        }
    }


    @media screen and (max-width:425px) {
        ${Text} {
            font-size:0.4rem;
        }
    }
    @media screen and (max-width:425px) {
        {

           margin-left:150px;
           margin-bottom:60px;
       }
   }
   
`



const Portrait = styled.div`
    width: 100px;
    margin:0;
    padding:0;
    
    @media screen and  (max-width:922){
        width:200px;

    }
`

const Gambar = styled.img`
    clip-path:circle();
    border-radius:100%;
    width:400px;
    margin:10px;
    padding:0px;
    float: left;
    clear:left;


    ${props=>{
        if(!props.medium){
            return css`
                width:300px;
            `
        }
    }}

    ${props=>{
        if(!props.small){
            return css`
                width:200px;
            `
        }
    }}

    ${props=>{
        if(!props.small){
            return css`
                width:160px;
            `
        }
    }}

    ${props=>{
        if(!props.small){
            return css`
                width:160px;
            `
        }
    }}

    ${props=>{
        if(!props.mobilebeneran){
            return css`
                width:120px;
            `
        }
    }}
    
    

    
`
const Alumnus1 = styled.img`
border-radius:50%;
clip-path:circle();
width:120px;
margin:0px;
padding:0px;
transition:  0.5s ease;
${props=>{
    if(!props.small){
        return css`
            width:60px;
        `
    }
}}
`
const Alumnus2 = styled.img`
border-radius:50%;
clip-path:circle();
width:120px;
margin:0px;
padding:0px;
transition:  0.5s ease;
${props=>{
    if(!props.small){
        return css`
            width:60px;
        `
    }
}}
`
const Alumnus3 = styled.img`
border-radius:50%;
clip-path:circle();
width:120px;
margin:0px;
padding:0px;
transition:  0.5s ease;
${props=>{
    if(!props.small){
        return css`
            width:60px;
        `
    }
}}
`
const Alumnus4 = styled.img`
border-radius:50%;
clip-path:circle();
width:120px;
margin:0px;
padding:0px;
transition:  0.5s ease;
${props=>{
    if(!props.small){
        return css`
            width:60px;
        `
    }
}}
`
const Alumnus5 = styled.img`
border-radius:50%;
clip-path:circle();
width:120px;
margin:0px;
padding:0px;
transition:  0.5s ease;

${props=>{
    if(!props.small){
        return css`
            width:60px;
        `
    }
}}
`

const AlumnusListContainer = styled.div`
    margin-left:300px;
    position: relative;
    flex-direction:row;
    
    
    ${props=>{
        if(!props.medium){
            return css`
                margin-left:50px;
            `
        }
    }}

    ${props=>{
        if(!props.medium){
            return css`
                margin-left:20px;
            `
        }
    }}


`
/*
const AlumnusListContainer1 = styled.div`
    position:relative;
    display:flex;
    flex-direction:row;
    &:hover {
        ${Alumnus1}{
            cursor: pointer;
            transform: scale(1.1,1.1);
        }
    }
`
const AlumnusListContainer2 = styled.div`
    position:relative;
    display:flex;
    flex-direction:row;
    &:hover {
        ${Alumnus2}{
            cursor: pointer;
            transform: scale(1.1,1.1);
        }
    }
`
const AlumnusListContainer3 = styled.div`
    position:relative;
    flex-direction:row;
    &:hover {
        ${Alumnus3}{
            cursor: pointer;
            transform: scale(1.1,1.1);
        }
    }
`
const AlumnusListContainer4 = styled.div`
    position:relative;
    flex-direction:row;
    &:hover {
        ${Alumnus4}{
            cursor: pointer;
            transform: scale(1.1,1.1);
        }
    }
`

const AlumnusListContainer5 = styled.div`
    position:relative;
    flex-direction:row;
    &:hover {
        ${Alumnus5}{
            cursor: pointer;
            transform: scale(1.1,1.1);
        }
    }
`

Alumnus1.addEventListener("onmouseover", scaleFunction )

function scaleFunction() {

}
*/


const Alumnus = () => {
    const isTablet = useMediaQuery({
        query: '(min-width: 960px)'
    });
    const isMobile = useMediaQuery({
        query: '(min-width: 760px)'
    });
    const isMobileBeneran = useMediaQuery({
        query: '(min-width: 425px)'
    });
    return (
        <AlumnusContainer>
            <TitleContianer>
            <Text type="primary" size={2} >
                TEC ALUMNUS
            </Text>
            </TitleContianer>
            
            <Gambar src={AchmadZaky} medium={isTablet} small={isMobile} mobilebeneran={isMobileBeneran}/>

            <DescriptionContainer>
                <Text type="primary" size={2}> ACHMAD ZAKY </Text>
                <Text type="secondary" size={2}> Founder of Bukalapak</Text>
                <Text type="paragraph" size={1}> 
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut porta tempus augue ac molestie. Vivamus eget commodo purus. Proin eu ornare nisi. Integer eu vehicula ligula, at tempus augue. Suspendisse vel dictum erat. Nam mi mauris, vulputate a malesuada nec, tempus eu eros. Suspendisse magna neque, pretium vitae lectus ut, iaculis congue libero. Nulla in semper elit.
                </Text>
            </DescriptionContainer>

            <AlumnusListContainer medium={isTablet} >
                <Alumnus1 src={AchmadZaky} small={isMobile}/>
                <Alumnus2 src={AchmadZaky} small={isMobile}/>
                <Alumnus3 src={AchmadZaky} small={isMobile}/>
                <Alumnus4 src={AchmadZaky} small={isMobile}/>
                <Alumnus5 src={AchmadZaky} small={isMobile}/>
                
            </AlumnusListContainer>
        </AlumnusContainer>
    )
}

export default Alumnus
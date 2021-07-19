import React, { useState } from 'react'
import styled, {css} from 'styled-components'
import { useMediaQuery } from 'react-responsive'
import Text from '../shared/Text'
import AchmadZaky from '../../blob/images/AchmadZaky.jpg'
import Portrait2 from '../../blob/images/img2.jpg'
import Portrait3 from '../../blob/images/img3.jpg'

/*
HAL YANG HARUS DI UPDATE KE GITHUB
1. Alumnus.jsx
2. Gambarnya yang gw simpen di blob/images

Notice: Image Alumnus menggunakan clip-path:circle() 
dapat digunakan border-radius agar hitbox sesuai, tetapi gambar harus 1:1 atau mendekati agar tidak oval

Problem: 
1. Setiap foto harus sama ukuranya

2.Kalau Paragraphnya kebanyakan, dia akan overflow ke bawah gambar utama
Solusi yg kepikiran make position absolute

3. Font "Founder of Bukalapak" belum seusai sama figma

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

&:hover {
    cursor:pointer;
}
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

&:hover {
    cursor:pointer;
}
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

&:hover {
    cursor:pointer;
}

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

&:hover {
    cursor:pointer;
}

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

&:hover {
    cursor:pointer;
}

${props=>{
    if(!props.small){
        return css`
            width:60px;
        `
    }
}}
`

const AlumnusListContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;


`



const Alumnus = () => {
    //MEDIA QUERY
    const isTablet = useMediaQuery({
        query: '(min-width: 960px)'
    });
    const isMobile = useMediaQuery({
        query: '(min-width: 760px)'
    });
    const isMobileBeneran = useMediaQuery({
        query: '(min-width: 425px)'
    });

    //useState Declaration
    const [name, setName] = useState("Achmad Zaky");
    const [title, setTitle] = useState("Founder of Bukalapak");
    const [desc, setDesc] = useState("LOREM IPSUM MAKAN BUBUR SUMSUM cakep");
    const [wajah, setWajah] = useState(AchmadZaky)

    //CLICKABLE FUNCTION
    function alumnusSatu() {
        setName("Achmad Zaky");
        setTitle("Founder ");
        setDesc("AZAKY");
        setWajah(AchmadZaky);
    }
    function alumnusDua() {
        setName("Dono");
        setTitle("WARKOP DKI");
        setDesc("Desperado ");
        setWajah(Portrait3);
    }
    function alumnusTiga() {
        setName("Bambang");
        setTitle("Pamungkas");
        setDesc("Jago");
        setWajah(Portrait2);
    }
    function alumnusEmpat() {
        setName("Rifqi");
        setTitle("Manusia");
        setDesc("Yok bisa Yok");
        setWajah(Portrait3);
    }
    function alumnusLima() {
        setName("Alucard");
        setTitle("Dracuila");
        setDesc("DAFTAR STEI CUP GES");
        setWajah(Portrait2);
    }

    return (
        <AlumnusContainer>
            <TitleContianer>
            <Text type="primary" size={2} >
                TEC ALUMNUS
            </Text>
            </TitleContianer>
            
            <Gambar src={wajah} medium={isTablet} small={isMobile} mobilebeneran={isMobileBeneran}/>

            <DescriptionContainer>
                <Text type="primary" size={2}> {name} </Text>
                <Text type="secondary" size={2}> {title}</Text>
                <Text type="paragraph" size={1}>  {desc} </Text>
            </DescriptionContainer>

            <AlumnusListContainer medium={isTablet} >
                
                <Alumnus1 src={AchmadZaky} small={isMobile} onClick={alumnusSatu}></Alumnus1>
                <Alumnus2 src={AchmadZaky} small={isMobile} onClick={alumnusDua}></Alumnus2>
                <Alumnus3 src={AchmadZaky} small={isMobile} onClick={alumnusTiga}></Alumnus3>
                <Alumnus4 src={AchmadZaky} small={isMobile} onClick={alumnusEmpat}></Alumnus4>
                <Alumnus5 src={AchmadZaky} small={isMobile} onClick={alumnusLima}></Alumnus5>
                
            </AlumnusListContainer>
        </AlumnusContainer>
    )
}

export default Alumnus
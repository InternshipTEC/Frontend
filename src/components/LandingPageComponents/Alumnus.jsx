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
    &:hover {
        
`
const DescriptionContainer = styled.div`
    position: relative;
    margin-bottom:100px;
    margin-right:30px;
    

    
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
        if(!props.mobile){
            return css`
                width:200px;
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
`
const Alumnus2 = styled.img`
border-radius:50%;
clip-path:circle();
width:120px;
margin:0px;
padding:0px;
transition:  0.5s ease;
`
const Alumnus3 = styled.img`
border-radius:50%;
clip-path:circle();
width:120px;
margin:0px;
padding:0px;
transition:  0.5s ease;
`
const Alumnus4 = styled.img`
border-radius:50%;
clip-path:circle();
width:120px;
margin:0px;
padding:0px;
transition:  0.5s ease;
`
const Alumnus5 = styled.img`
border-radius:50%;
clip-path:circle();
width:120px;
margin:0px;
padding:0px;
transition:  0.5s ease;
}
`

const AlumnusListContainer = styled.div`
    margin-left:300px;
    position: relative;
    margin-top:300px;
    flex-direction:row;
    }
`
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
/*
Alumnus1.addEventListener("onmouseover", scaleFunction )

function scaleFunction() {

}
*/


const Alumnus = () => {
    const isMobile = useMediaQuery({
        query: '(min-width: 992px)'
    });
    return (
        <AlumnusContainer>
            <TitleContianer>
            <Text type="primary" size={2} >
                TEC ALUMNUS
            </Text>
            </TitleContianer>
            
            <Gambar src={AchmadZaky} mobile={isMobile}/>

            <DescriptionContainer>
                <Text type="primary" size={2}> ACHMAD ZAKY </Text>
                <Text type="secondary" size={2}> Founder of Bukalapak</Text>
                <Text type="paragraph" size={1}> 
                Lorem ipsum dolor sit amet, sconsectu r adipsicing eit. Nullam femranutm ex nibh, sed varius turpis pelllentesque viverra. praesent sollicitudin finibus odio, nec qilue nunc saggigtsed
                assaaaa aaaaaaaaaaaaaaa aaaaaaaaaaaaa aaaaaaaaaa
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                </Text>
            </DescriptionContainer>

            <AlumnusListContainer>
                <Alumnus1 src={AchmadZaky}/>
                <Alumnus2 src={AchmadZaky}/>
                <Alumnus3 src={AchmadZaky}/>
                <Alumnus4 src={AchmadZaky}/>
                <Alumnus5 src={AchmadZaky}/>
                
            </AlumnusListContainer>
        </AlumnusContainer>
    )
}

export default Alumnus
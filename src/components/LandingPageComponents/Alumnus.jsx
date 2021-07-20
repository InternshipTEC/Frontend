import React, { useState } from 'react'
import styled, {css} from 'styled-components'
import { useMediaQuery } from 'react-responsive'
import Text from '../shared/Text'
import AchmadZaky from '../../blob/images/AchmadZaky.jpg'
import Portrait2 from '../../blob/images/img2.jpg'
import Portrait3 from '../../blob/images/img3.jpg'

const AlumnusContainer = styled.div`
    display:flex;
    flex-direction: ${props=>props.mobile ? "row" : "column"};
    justify-content:center;
    gap:4rem;
`

const TitleContainer = styled.div`
    display:flex;
    flex-direction:column;
    gap:10px;
`

const DescriptionContainer = styled.div`
    display:flex;
    flex-direction:column;
    justify-content: space-between;

`

const AlumnusListContainer = styled.div`
    display: flex;
    justify-content: ${props=> props.mobile ? "start" : "space-around"};
    margin-top:${props=>props.mobile ? "0px" : "20px"};
`

const AlumnusDisplay = styled.div`
    margin: 0 auto;
    background-image:url(${(props)=>props.image});
    border-radius:50%;
    width:${(props)=>props.width};
    height:${(props)=>props.height};
    background-size:     cover;                      
    background-repeat:   no-repeat;
    background-position: center center;  
`

const dataAlumnus = [
    {
        nama: "Achmad Zaky",
        status: "Founder of Bukalapak",
        description: "LOREM IPSUM MAKAN BUBUR SUMSUM cakep",
        image: AchmadZaky,
    },
    {
        nama: "Achmad Zaky",
        status: "Founder of Bukalapak",
        description: "LOREM IPSUM MAKAN BUBUR SUMSUM cakep",
        image: Portrait3,
    },
    {
        nama: "Achmad Zaky",
        status: "Founder of Bukalapak",
        description: "LOREM IPSUM MAKAN BUBUR SUMSUM cakep",
        image: Portrait2,
    },
    {
        nama: "Achmad Zaky",
        status: "Founder of Bukalapak",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        image: Portrait3,
    },
]

const Alumnus = () => {
    const [alumnusIndex, setAlumnusIndex] = useState(0);
    const isMobile = useMediaQuery({
        query: '(min-width: 400px)'
    });

    return (
        <AlumnusContainer mobile={isMobile}>
            <TitleContainer>
                <Text align="center" type="primary" size={2} >
                    TEC ALUMNUS
                </Text>
                <AlumnusDisplay width="15rem" height="15rem" image={dataAlumnus[alumnusIndex].image}/>
            </TitleContainer>
            <DescriptionContainer>
                <div style={{margin:"0 auto"}}>
                    <Text type="primary" size={2}> {dataAlumnus[alumnusIndex].nama} </Text>
                    <Text type="secondary" size={2}> {dataAlumnus[alumnusIndex].status}</Text>
                    <div style={{maxWidth:"500px"}}>
                        <Text type="paragraph" size={1}>  {dataAlumnus[alumnusIndex].description} </Text>
                    </div>
                </div>
                <AlumnusListContainer mobile={isMobile}>
                    {dataAlumnus.map((data,index)=><>
                        <AlumnusDisplay width="4.5rem" height="4.5rem" image={data.image} onClick={()=>setAlumnusIndex(index)}/>             
                    </>)}
                </AlumnusListContainer>
            </DescriptionContainer>
       </AlumnusContainer>
    )
}

export default Alumnus
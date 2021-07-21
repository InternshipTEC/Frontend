import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { useMediaQuery } from 'react-responsive'
import Text from '../shared/Text'
import AchmadZaky from '../../blob/images/AchmadZaky.jpg'
import Portrait2 from '../../blob/images/img2.jpg'
import Portrait3 from '../../blob/images/img3.jpg'


const AlumnusWrapper = styled.div`
    width:calc(100vw - 20vw);
    margin: 0 auto;
`

const AlumnusContainer = styled.div`
    display:flex;
    flex-direction: ${props=>props.mobile ? "row" : "column"};
    gap:4rem;
`

const TitleContainer = styled.div`
    margin:1.5rem 0;
    ${props => {
        if(props.mobile){
            return css`
                display:flex; 
                justify-content: center;
            `
        }
    }}
`

const DescriptionContainer = styled.div`
    margin: 0 3rem;
`

const AlumnusListContainer = styled.div`
    display: flex;
    justify-content: center;
    gap:4rem;
    margin-top:${props=>props.mobile ? "0px" : "20px"};
`

const AlumnusDisplay = styled.div`
    background-image:url(${(props)=>props.image});
    border-radius:50%;
    margin: ${props=>props.mobile ? "0 auto" : ""};
    width:${(props)=>props.width};
    height:${(props)=>props.height};
    background-size:     cover;                      
    background-repeat:   no-repeat;
    background-position: center center;  
    ${props => {
        if(props.picked){
            return css`
                border: solid 3px yellow;
            `
        }
        if(props.clickable){
            return css`
                &:hover {
                    cursor:pointer;
                    border: solid 3px yellow;
                } 
            `
        }
    }}
`

const dataAlumnus = [
    {
        nama: "Achmad Zaky",
        status: "Founder of Bukalapak",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        image: AchmadZaky,
    },
    {
        nama: "Siapa anjir",
        status: "Founder of mwehehe",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        image: Portrait3,
    },
    {
        nama: "Gw gak kenal siapa",
        status: "Founder of Tse",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        image: Portrait2,
    },
    {
        nama: "Siapa anjir",
        status: "Founder of mwehehe",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        image: Portrait3,
    },
]

const Alumnus = () => {
    const [alumnusIndex, setAlumnusIndex] = useState(0);
    const isMobile = useMediaQuery({
        query: '(min-width: 750px)'
    });

    return (
        <div>
        <AlumnusWrapper>
                <TitleContainer mobile={!isMobile}>
                    <Text type="primary" size={3} >
                        TEC ALUMNUS
                    </Text>
                </TitleContainer>
                <AlumnusContainer mobile={isMobile}>
                    <div>
                        <AlumnusDisplay mobile={!isMobile} width="18rem" height="18rem" image={dataAlumnus[alumnusIndex].image}/>
                    </div>
                    <DescriptionContainer>
                        <Text type="primary" size={2}> {dataAlumnus[alumnusIndex].nama} </Text>
                        <Text type="secondary" size={2}> {dataAlumnus[alumnusIndex].status}</Text>
                        <div style={{maxWidth:"650px"}}>
                            <Text align="justify" type="paragraph" size={1}>  {dataAlumnus[alumnusIndex].description} </Text>
                        </div>
                    </DescriptionContainer>
                </AlumnusContainer>
                <AlumnusListContainer mobile={isMobile}>
                    {dataAlumnus.map((data,index)=><>
                        <AlumnusDisplay clickable={true} picked={index===alumnusIndex} width="4.5rem" height="4.5rem" image={data.image} onClick={()=>setAlumnusIndex(index)}/>             
                    </>)}
                </AlumnusListContainer>
            </AlumnusWrapper>
            </div>
    )
}

export default Alumnus
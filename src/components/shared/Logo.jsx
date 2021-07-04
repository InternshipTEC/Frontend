import React, { useState } from 'react'
import styled from 'styled-components'

const Logo = ({LogoBefore, LogoAfter, link}) => {
    const [hovered, setHovered] = useState(false);

    const BeforeStyled = styled(LogoBefore)`
        fill: white;
        width:2rem;
        height:2rem;
    `

    const AfterStyled = styled(LogoAfter)`
        width:2rem;
        height:2rem;
    `

    return <a
        onMouseEnter={()=>setHovered(true)}
        onMouseLeave={()=>setHovered(false)}
        href={link}
    >
        {hovered ? <AfterStyled/> : <BeforeStyled/>}    
    </a>

}

export default Logo

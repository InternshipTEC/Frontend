import React, { useState } from 'react'
import styled from 'styled-components'

const Logo = ({img,  link}) => {
    const Img = styled(img)`
        fill: white;
        width:2rem;
        height:2rem;
    `

    return <a
        href={link}
    >
        <Img/>    
    </a>

}

export default Logo

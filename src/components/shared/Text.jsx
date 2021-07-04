import styled, { css } from 'styled-components'

export default styled.div`
    font-size: ${props=>props.size ? props.size+"rem" : "1rem" };
    font-style: ${props=>props.fontStyle ? props.fontStyle : "normal"  };
    ${props => {
        if(props.type === "primary"){
            return css`
                font-family: 'Divergent';
                color: ${props.color ? props.color : '#DAC269'};
            `
        } else if(props.type === 'secondary' || props.type === "button"){
            return css`
                font-family: 'Manifold';
                color: ${props.color ? props.color : '#DAC269'};
            `
        } else if(props.type === 'paragraph'){
            return css`
                font-family: 'Poppins';
                color: ${props.color ? props.color : '#ffffff'};
            `
        } 
    }}
`


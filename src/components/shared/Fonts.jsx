import { createGlobalStyle } from 'styled-components';

import DivergentWoff from '../../blob/fonts/DIVERGENT.woff';
import DivergentWoff2 from '../../blob/fonts/DIVERGENT.woff2';
import PoppinsWoff from '../../blob/fonts/Poppins.woff';
import PoppinsWoff2 from '../../blob/fonts/Poppins.woff2';
import ManifoldWoff from '../../blob/fonts/ManifoldExtendedCF-Bold.woff';
import ManifoldWoff2 from '../../blob/fonts/ManifoldExtendedCF-Bold.woff2';



export default createGlobalStyle`
    @font-face {
        font-family: 'Divergent';
        src: local('Divergent'), local('FontName'),
        url(${DivergentWoff2}) format('woff2'),
        url(${DivergentWoff}) format('woff');
        font-weight: 300;
        font-style: normal;
    }
    @font-face {
        font-family: 'Poppins';
        src: local('Poppins'), local('Poppins'),
        url(${PoppinsWoff2}) format('woff2'),
        url(${PoppinsWoff}) format('woff');
        font-weight: 300;
        font-style: normal;
    }
    @font-face {
        font-family: 'Manifold';
        src: local('Manifold'), local('Manifold'),
        url(${ManifoldWoff2}) format('woff2'),
        url(${ManifoldWoff}) format('woff');
        font-weight: 300;
        font-style: normal;
    }
    :root{
            font-size: 0.6rem;
    }

    @media (min-width: 575.98px) {
        :root{
            font-size: 0.7rem;
        }
    }

    @media (min-width: 767.98px) { 
        :root{
            font-size: 0.8rem;
        }
    }

    @media (min-width: 991.98px) { 
        :root {
            font-size: 0.9rem;
        }
    }

    @media (min-width: 1199.98px) { 
        :root {
            font-size: 1rem;
        }
    }
`;
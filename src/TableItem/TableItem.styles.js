import styled from "styled-components";
import arrow from '../assets/arrow.svg'
import diamond from '../assets/diamond.svg'

export const Button = styled.button`
    aspect-ratio: 1;
    border: 0;
    outline: 0;
    cursor: pointer;
    background-color: #8fbcff;
    transition: all 0.3s ease;
    transform: none;

    &.flip {
        transform: rotateY(180deg);
        perspective: 1000px;
        transform-style: preserve-3d;
        backface-visibility: hidden;
    }
`;

export const Arrow = styled.div`
    aspect-ratio: 1;
    background: url(${arrow}) no-repeat center;
    background-size: 80%;
`;

export const Diamond = styled.div`
    aspect-ratio: 1;
    background: url(${diamond}) no-repeat center;
    background-size: contain;
`;
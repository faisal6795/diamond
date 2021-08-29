import styled from 'styled-components';

export const Container = styled.div`
    margin: 1.5rem auto 0;
    text-align: center;
    width: min(90%, 35rem);

    h1 {
        font-size: 2.5rem;
    }

    & > p {
        margin-top: 1rem;
    }

    .final-msg {
        margin: 8rem 0;
        font-size: 1.5rem;
    }
`;

export const GameBoard = styled.div`
    display: ${props => props.gameOver ? 'none' : 'grid'};
    grid-template-columns: repeat(8, 1fr);
    width: 100%;
    margin: 0 auto;
    grid-gap: 0.25rem;
`;

export const ScoreBoard = styled.div`
    margin-block: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    strong {
        font-size: 2rem;
    }

    .diamond-count {
        font-size: 1.5rem;
        font-weight: bold;
    }

    .restart-btn {
        font-size: 1.25rem;
        padding: 0.75rem 2rem;
        background: #03a9f4;
        border: 0;
        border-radius: 0.5rem;
        cursor: pointer;
        outline: 0;

        &:focus,
        &:hover{
            background: #0295d9;
        } 
    }

    @media screen and (min-width: 768px) {
        margin: 1rem auto;
        display: block;
    }
`;

export const Score = styled.div`
    font-size: 1.25rem;

    @media screen and (min-width: 768px) {
        position: fixed;
        top: 2.5rem;

        &.score {
            left: 10%;
        }

        &.highscore {
            right: 10%;
        }
    }
`;
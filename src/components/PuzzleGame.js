import styled, {css} from 'styled-components';

const PuzzleGame = styled.div`
    ${props => css`
        height: ${props.size * (props.dimension + 1)}px;
        width: ${props.size * props.dimension}px;
    `}
    display: flex;
    flex-flow: row wrap;
    align-content: stretch;
    justify-content: space-between;
    margin: 50px;
`;

export default PuzzleGame;
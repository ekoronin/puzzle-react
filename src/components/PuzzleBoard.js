import styled, {css} from 'styled-components';

const PuzzleBoard = styled.div`
    margin: auto;
    position: relative;
    ${props => css`
        height: ${props.size * props.dimension}px;
        width: ${props.size * props.dimension}px;
    `}
`;

export default PuzzleBoard;
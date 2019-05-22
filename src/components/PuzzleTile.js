import styled, {css} from 'styled-components';

const PuzzleTile = styled.div`
    margin: 0px;
    padding: 0px;
    transition: transform 0.5s linear;
    position: absolute;
    overflow: hidden;
    ${props => props.last ? css`
        opacity: 0;
        cursor: not-allowed;
    ` : css`
            cursor: pointer;
        `
    }
    ${props => css`
        height: ${props.size}px;
        width: ${props.size}px;
    `}
    :hover {
        -webkit-filter: brightness(120%);
        filter: brightness(120%);
    }
`;

export default PuzzleTile;

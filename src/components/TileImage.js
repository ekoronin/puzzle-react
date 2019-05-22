import styled, {css} from 'styled-components';

const TileImage = styled.img`
    margin: 0px;
    padding: 0px;
    display: block;
    ${props => css`
        height: ${props.size * props.dimension}px;
        width: ${props.size * props.dimension}px;
    `}
`;

export default TileImage;
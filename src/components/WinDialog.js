import styled from "styled-components";

const WinDialog = styled.div`
    height: 20%;
    width: 80%;
    margin: 10%;
    top: ${props => props.size * 1.2}px
    font-size: 3rem;
    font-weight: 700;
    color: white;
    background-color: green;
    border-radius: 10px;
    text-align: center;
    position: absolute;
    z-index: 10;
`;

export default WinDialog;

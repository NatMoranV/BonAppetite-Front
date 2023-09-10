import { faImage } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";


faImage

export const EditImageButton = () => {

    return(
        <StyledEditImgButton>
            <FontAwesomeIcon icon={faImage}/>
            <span>Editar imagen</span>
        </StyledEditImgButton>

    )
}

const StyledEditImgButton = styled.div`
display: flex;
position: absolute;
top: 0;
bottom: 0;
flex-direction: column;
align-items: center;
justify-content: center;
width: 100%;
height: 100%;
border-radius: .5rem;
background: ${(props) => props.theme.secundary};
cursor: pointer;

& span{
    color: ${(props) => props.theme.primary};
    font-size: .6rem;
}

`
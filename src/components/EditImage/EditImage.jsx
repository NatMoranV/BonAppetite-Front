import { faImage, faEdit } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { upload } from "../../utils/uploadImg";
import { Modal } from "../../components/Modal/Modal";
import { useRef, useState } from "react";

export const EditImageButton = ({ img, onImgChange }) => {
  const fileInputRef = useRef(null);

  const isImg = Boolean(img);

  const [loading, setLoading] = useState(false);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    setLoading(true);

    const selectedFile = event.target.files[0];

    if (selectedFile) {
      try {
        const uploadedImage = await upload(selectedFile);
        setLoading(false);
        onImgChange(uploadedImage);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
  };

  return (
    <StyledEditImgButton $isImg={isImg}>
      {loading && <Modal isLoader title={"Cargando..."} />}

      <ButtonContainer
        $isImg={!isImg}
        onClick={!isImg ? handleButtonClick : null}
      >
        {!img ? (
          <>
            <HiddenInput
              type={"file"}
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            <ImageIcon icon={faImage} />
            <StyledMsg>Agregar imagen</StyledMsg>
          </>
        ) : (
          <>
            <BgIcon />
            <HiddenInput
              type={"file"}
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            <EditIcon icon={faEdit} onClick={handleButtonClick} />

            <StyledImg src={img} />
          </>
        )}
      </ButtonContainer>
    </StyledEditImgButton>
  );
};

const StyledEditImgButton = styled.div`
  position: relative;
  width: 100%;
  height: 15rem;
  box-sizing: content-box;
  border-radius: 0.5rem;
  background: ${(props) => props.theme.secundary};
  cursor: ${(props) => (props.$isImg ? 'default' : 'pointer')};
`;

const HiddenInput = styled.input`
  display: none;
`;

const StyledImg = styled.img`
  height: 15rem;
  width: 100%;
  border-radius: 0.5rem;
  object-fit: cover;
  box-sizing: border-box;
  transition: all 0.3s ease-in-out;
`;
const ButtonContainer = styled.div`
  position: absolute;
  height: 15rem;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;

  &:active {
    box-shadow: ${(props) => props.theme.pressedShadow};
  }

  &.active {
    cursor: auto;
    box-shadow: ${(props) => props.theme.pressedShadow};
  }

  background: ${(props) => (props.$isImg ? props.theme.primary : "none")};
  box-shadow: ${(props) => (props.$isImg ? props.theme.shortShadow : "none")};
`;

const BgIcon = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 0 0.5rem 0 2rem;
  background: ${(props) => props.theme.secondary};
  opacity: 0.7;
  box-sizing: border-box;
  position: absolute;
  top: 0rem;
  right: 0rem;
`;

const EditIcon = styled(FontAwesomeIcon)`
  position: absolute;
  cursor: pointer;
  font-size: 2rem;
  top: 0.5rem;
  right: 0.5rem;

  path {
    fill: ${(props) => props.theme.primary};
  }
`;

const ImageIcon = styled(FontAwesomeIcon)`
  font-size: 5rem;
`;

const StyledMsg = styled.h6``;

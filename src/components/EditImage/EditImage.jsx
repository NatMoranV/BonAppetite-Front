import { faImage, faEdit } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { upload } from "../../utils/uploadImg";
import { Modal } from "../../components/Modal/Modal";
import { useRef, useState } from "react";
import { useLocation } from "react-router-dom";

export const EditImageButton = ({ image, onImgChange, index }) => {
  const isDashboard = useLocation().pathname === "/dashboard/articles/";

  const fileInputRef = useRef(null);

  const isImg = Boolean(image);

  const [loading, setLoading] = useState(false);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    setLoading(true);
    // console.log(index);

    const selectedFile = event.target.files[0];

    if (selectedFile) {
      try {
        const uploadedImage = await upload(selectedFile);
        onImgChange(uploadedImage, index);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
  };

  return (
    <StyledEditImgButton $isImg={isImg} $isDashboard={isDashboard}>
      {loading && <Modal isLoader title={"Cargando..."} />}

      <ButtonContainer
        $isDashboard={isDashboard}
        $isNotImg={!isImg}
        onClick={!isImg ? handleButtonClick : null}
      >
        {!image ? (
          <>
            <HiddenInput
              type={"file"}
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            <ImageIcon icon={faImage} $isDashboard={isDashboard} />
            <StyledMsg $isDashboard={isDashboard}>Agregar imagen</StyledMsg>
          </>
        ) : (
          <>
            <BgIcon $isDashboard={isDashboard} />
            <HiddenInput
              type={"file"}
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            <EditIcon
              icon={faEdit}
              onClick={handleButtonClick}
              $isDashboard={isDashboard}
            />

            <StyledImg src={image} />
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
  cursor: ${(props) => (props.$isImg ? "default" : "pointer")};

  ${(props) =>
    props.$isDashboard &&
    `
  height: 4rem;

  `}
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

  ${(props) =>
    props.$isDashboard &&
    `
  height: 4rem;

  `}

  background: ${(props) => (props.$isNotImg ? props.theme.primary : "none")};
  box-shadow: ${(props) =>
    props.$isNotImg ? props.theme.shortShadow : "none"};
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

  ${(props) =>
    props.$isDashboard &&
    `
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 0 0.5rem 0 1rem;

  `}
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

  ${(props) =>
    props.$isDashboard &&
    `
  font-size: 1.2rem;

  `}
`;

const ImageIcon = styled(FontAwesomeIcon)`
  font-size: 5rem;
  ${(props) =>
    props.$isDashboard &&
    `
  
  font-size: 2rem;

  `}
`;

const StyledMsg = styled.h6`
  text-align: center;
  ${(props) =>
    props.$isDashboard &&
    `
  display: none;
  font-size: .8rem;
  font-weight: 500;

  `}
`;

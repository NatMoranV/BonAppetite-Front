import styled from "styled-components";
import useMenu from "../../utils/useMenu";
import { EditImageButton } from "../../components/EditImage/EditImage";
import { StyledInput } from "../../components/Input/StyledInput";
import { useState } from "react";
import { Modal } from "../../components/Modal/Modal";
import { TextButton } from "../../components/TextButton/TextButton";
import { CircleButton } from "../../components/CircleButton/CircleButton";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { CTAsContainer } from "../../components/CTAs/CTAsContainer";

function FamilyComponent({ family, onDelete, index }) {
  const [familyDetails, setFamilyDetails] = useState({
    familyImage: family.familyImage,
    familyName: family.familyName,
  });

  const handleImgChange = (newImg) => {
    setFamilyDetails((prevFamilyDetails) => ({
      ...prevFamilyDetails,
      familyImage: newImg,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFamilyDetails((prevFamilyDetails) => ({
      ...prevFamilyDetails,
      [name]: value,
    }));
  };

  return (
    <StyledFamily>
      <EditImageButton
        image={familyDetails.familyImage}
        onImgChange={handleImgChange}
      />
      <InputContainer>
      <StyledInput
        type={"text"}
        name={"familyName"}
        value={familyDetails.familyName}
        onChange={handleChange}
        helper={"Hasta 10 caracteres"}
      />
      <CircleButton className={"big"} icon={faTrashCan} onClick={() => onDelete(index)} />
      </InputContainer>
    </StyledFamily>
  );
}


export const EditFamilies = () => {
  const [menu, setMenu] = useState(useMenu());
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [itemToDeleteIndex, setItemToDeleteIndex] = useState(null);


  const handleAddFamily = () => {
    if (menu) {
      setMenu([...menu, { familyName: "", familyImage: "" }]);
    }
  };

  const handleDelete = (index) => {
    setIsDeleteModalVisible(true);

    setItemToDeleteIndex(index);
  };


  const handleConfirmDelete = () => {
    if (itemToDeleteIndex !== null) {
      const updatedMenu = menu.filter((_, i) => i !== itemToDeleteIndex);
      setMenu(updatedMenu);

      setIsDeleteModalVisible(false);

      setItemToDeleteIndex(null);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalVisible(false);

    setItemToDeleteIndex(null);
  };

  if (!menu) {
    return <Modal isLoader title={"Cargando..."} />;
  }

  const post = () =>{

    console.log(menu);

  }

  return (
    <StyledView>
    <Header>
    <Title>Familias</Title>
    <Subtitle>Ingresa las familias en el orden que deseas mostrarlos</Subtitle>
    </Header>
      {menu.map((family, index) => (
        <FamilyComponent
          key={family.id}
          family={family}
          onDelete={() => handleDelete(index)}
        />
      ))}
      <TextButton text={"Agregar nueva familia"} onClick={handleAddFamily} />
      <CTAsContainer onClick1={() => {post()}} text1={"Guardar cambios"}/>


      {isDeleteModalVisible && (
        <Modal
          onClose={handleCancelDelete}
          title={"Borrar familia"}
          msg={"Ten en cuenta que no podrás recuperarla."}
          text1={"Borrar"}
          onClick1={handleConfirmDelete}
          text2={"Cancelar"}
          onClick2={handleCancelDelete}
        />)}
    </StyledView>
  );
};

const StyledView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 3rem;
  margin: auto;
  overflow-y: auto;
  padding: 10vh 4vw 10vh 4vw;
  box-sizing: border-box;
  transition: width 0.3s ease-in-out;

  @media (min-width: 650px) {
    width: 30rem;
    padding: 15vh 1rem;
  }
`;

const StyledFamily = styled.div`
  width: 100%;
`;

const InputContainer = styled.div`
margin-top: 2rem;
display: flex;
align-items: start;
gap: 1rem;


`

const Header = styled.div`

display: flex;
flex-direction: column;
align-items: center;
gap: 1rem;

`

const Title = styled.h6`

margin: 0;

`


const Subtitle = styled.span`
font-size: 1rem;
font-weight: 500;
margin: 0;

`

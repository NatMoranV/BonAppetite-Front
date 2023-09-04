import { styled } from "styled-components";
import { CTAsContainer } from "../../components/CTAs/CTAsContainer";
import { menu } from "../../assets/mockedMenu";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { StyledInput } from "../../components/Input/StyledInput";
import { Dropdown } from "../../components/Dropdown/StyledDropdown";

const families = menu.map((i) => i.familyName);
const dishes = menu.flatMap((family) => family.recipes);

export const ManagerDetailPage = () => {
  const { id } = useParams();

  const [articleDetails, setArticleDetails] = useState({
    image: "",
    familyName: "",
    name: "",
    desc: "",
    price: 0,
  });

  useEffect(() => {
    const selectedMenu = dishes.find((item) => item.id === Number(id));
    if (selectedMenu) {
      const selectedFamily = menu.find((family) =>
        family.recipes.some((recipe) => recipe.id === Number(id))
      );

      setArticleDetails({
        img: selectedMenu.image,
        familyName: selectedFamily.familyName,
        name: selectedMenu.name,
        desc: selectedMenu.desc,
        price: selectedMenu.price,
        time: selectedMenu.time,
      });
    } else {
      console.error("Como e posible ete susesooo...");
    }
  }, [id]);

  const { img, name, desc, price, time, familyName } = articleDetails;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticleDetails((prevArticleDetails) => ({
      ...prevArticleDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !articleDetails.familyName ||
      !articleDetails.name ||
      !articleDetails.desc ||
      !articleDetails.price ||
      !articleDetails.time
    ) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    // try {
    //   const response = await axios.post(
    //     "/articles",
    //     articleDetails,
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   );
    //   alert("Cambios guardados");

    //   setActivityData({
    //     name: "",
    //     difficulty: 1,
    //     duration: "",
    //     season: "Cualquier temporada",
    //     countries: [],
    //   });

    // } catch (error) {
    //   console.error("Error al enviar la solicitud:", error);
    // }
  };

  return (
    <StyledView>
      <StyledForm onSubmit={handleSubmit}>
        <StyledImg src={img} />

        <Dropdown
          name="familyName"
          label={"Familia"}
          array={families}
          id={"family"}
          value={familyName}
          selectedValue={familyName}
          onChange={handleChange}
          helper={"Selecciona la familia a la que pertenece."}
        />

        <StyledInput
          type={"text"}
          name={"name"}
          label={"Nombre"}
          value={name}
          onChange={handleChange}
          helper={"Hasta 20 caracteres"}
        />
        <StyledInput
          type={"text"}
          name={"desc"}
          label={"Descripción"}
          value={desc}
          onChange={handleChange}
          helper={"Hasta 100 caracteres"}
        />
        <StyledInput
          type={"number"}
          name={"price"}
          label={"Precio"}
          value={price}
          onChange={handleChange}
        />
        <StyledInput
          type={"number"}
          name={"time"}
          label={"Tiempo de preparación"}
          value={time}
          onChange={handleChange}
          helper={"Tiempo en minutos"}
        />
        <CTAsContainer type="submit" text1={`Guardar cambios`} />
      </StyledForm>
    </StyledView>
  );
};

const StyledView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: auto;
  overflow-y: auto;
  padding: 3vh 4vw 15vh;
  box-sizing: border-box;
  transition: width 0.3s ease-in-out;
  overflow: visible;

  @media (min-width: 650px) {
    width: 30rem;
    padding: 15vh 0;
  }
`;


const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
  box-sizing: border-box;
  gap: 2.5rem;
`;

const StyledImg = styled.img`
  height: 15rem;
  width: 100%;
  border-radius: 0.5rem;
  object-fit: cover;
  box-sizing: border-box;
`;

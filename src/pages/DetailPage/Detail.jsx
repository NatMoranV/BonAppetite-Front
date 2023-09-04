import { styled } from "styled-components";
import { CTAsContainer } from "../../components/CTAs/CTAsContainer";
import { menu } from "../../assets/mockedMenu";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// const dishes = [];
// for (const family of menu) {
//   for (const recipe of family.recipes) {
//     dishes.push(recipe);
//   }
// }

const dishes = menu.flatMap((family) => family.recipes);

export const DetailPage = () => {
  const { id } = useParams();
  const [articleDetails, setArticleDetails] = useState({
    image: "",
    name: "",
    desc: "",
    price: 0,
  });

  useEffect(() => {
    const selectedMenu = dishes.find((item) => item.id === Number(id));
    if (selectedMenu) {
      setArticleDetails({
        img: selectedMenu.image,
        name: selectedMenu.name,
        desc: selectedMenu.desc,
        price: selectedMenu.price,
      });
    } else {
      console.error("Como e posible ete susesooo...");
    }
  }, [id]);

  const { img, name, desc, price } = articleDetails;

  return (
    <StyledView>
      <StyledImg src={img} />
      <h6>{name}</h6>
      <p>{desc}</p>
      <h6>${price}</h6>
      <CTAsContainer text1={`Agregar · $${price}`} />
    </StyledView>
  );
};

const StyledView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
  margin: auto;
  padding: 5rem 1rem;
  box-sizing: border-box;
  gap: 2.5rem;
  transition: width 0.3s ease-in-out;

  @media (min-width: 650px) {
    width: 30rem;
  }
`;

const StyledImg = styled.img`
  height: 15rem;
  width: 100%;
  border-radius: 0.5rem;
  object-fit: cover;
  box-sizing: border-box;
`;

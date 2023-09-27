/* eslint-disable react/prop-types */
import styled from "styled-components";
import { Card } from "../Cards/Card";
import { useSelector } from "react-redux";
import translateMenuFromApi from "../../utils/translateMenuFromApi";
import { useLocation } from "react-router-dom";

export const RecipesList = ({ searchTerm }) => {
  const menuAPI = useSelector((state) => state.filteredMaster);
  const menu = translateMenuFromApi(menuAPI);

  const location = useLocation().pathname;

  const isCustomer = location === "/customer/";

  const filteredMenu = menu
    .map((family) => ({
      ...family,
      recipes: family.recipes.filter(
        (card) =>
          card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          card.desc.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((family) => family.recipes.length > 0);

  const isSearch = searchTerm.length > 0;
  if (filteredMenu.length === 0 || menu.length === 0) {
    return (
      <>
        <br />
        <br />
        <br />
        <h4 style={{ textAlign: "center" }}>
          Ninguna delicia coincide con tu búsqueda...
        </h4>
      </>
    );
  }
  return (
<RecipesContainer>
  {isSearch
    ? filteredMenu.map((family) => {
        // Check if the family has enabled recipes
        const hasEnabledRecipes = family.recipes.some((card) => card.enable);

        if ((!isCustomer || (isCustomer && family.enable)) && hasEnabledRecipes) {
          return (
            <FamiliesContainer key={family.id}>
              <FamilyTitle key={family.id}>{family.familyName}</FamilyTitle>
              <CardsGrid>
                {family.recipes.map((card) => {
                  if (!isCustomer || (isCustomer && card.enable)) {
                    return (
                      <Card
                        key={card.id}
                        id={card.id}
                        name={card.name}
                        image={card.image}
                        shortDesc={card.desc}
                        time={card.time}
                        price={card.price}
                        qualification={card.qualification}
                        stock={card.stock}
                        enable={card.enable}
                      />
                    );
                  }
                  return null;
                })}
              </CardsGrid>
            </FamiliesContainer>
          );
        }
        return null;
      })
    : menu.map((family) => {
        // Check if the family has enabled recipes
        const hasEnabledRecipes = family.recipes.some((card) => card.enable);

        if (!isCustomer || (isCustomer && family.enable && hasEnabledRecipes))  {
          return (
            <FamiliesContainer key={family.id}>
              <FamilyTitle key={family.id}>{family.familyName}</FamilyTitle>
              <CardsGrid>
                {family.recipes.map((card) => {
                  if (!isCustomer || (isCustomer && card.enable)) {
                    return (
                      <Card
                        key={card.id}
                        id={card.id}
                        name={card.name}
                        image={card.image}
                        shortDesc={card.desc}
                        time={card.time}
                        price={card.price}
                        qualification={card.qualification}
                        stock={card.stock}
                        enable={card.enable}
                      />
                    );
                  }
                  return null;
                })}
              </CardsGrid>
            </FamiliesContainer>
          );
        }
        return null;
      })}
</RecipesContainer>

  );
};
/* 
 menu.length > 0 ? (
(
				<>
					<br />
					<br />
					<br />
					<h4>ninguna delicia coincide con tu busqueda...</h4>
				</>
			)
*/

const RecipesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  padding: 0 1rem;
`;

const FamilyTitle = styled.h5`
  text-align: center;
`;

const FamiliesContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  width: 100%;
  box-sizing: border-box;
  margin: 1rem 0;
`;

const CardsGrid = styled.div`
  width: 100%;
  margin: 1rem 0;
  display: grid;
  gap: 1rem;
  grid-auto-rows: auto;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
`;


import styled from "styled-components";
import { Card } from "../../components/Cards/Card";
import { FamiliesCarousel } from "../../components/Carrousel/Carrousel";
import { StyledInput } from "../../components/Input/StyledInput";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { MenuCarousel } from "../../components/Carrousel/CarouselMenu";

const Container = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  margin-top: 4rem;
  align-items: center;
`;

export const Home = () => {
  return (
    <Container>
      <FamiliesCarousel />
       
      <MenuCarousel>
      </MenuCarousel>
    </Container>
  );
};


import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styled from "styled-components";
import { Input } from "../../components/Input/Input";
import { CTAsContainer } from "../../components/CTAs/CTAsContainer";

export const ReviewPage = ({}) => {
  let params = useParams();

  const handleStarClick = (starIndex, id) => {
    const updatedQualification = qualification.map((item) => {
      if (item.id === id) {
        return { ...item, stars: starIndex + 1 };
      }
      return item;
    });
    setQualification(updatedQualification);
  };
  const navigate = useNavigate();
  const navigateHome = () => {
    navigate("/");
  };

  const [qualification, setQualification] = useState([]);

  //traigo los datos del pedido

  const order = async () => {
    let { orderId } = params;
    const { data } = await axios
      .get(`https://resto-p4fa.onrender.com/order/${orderId}`)
      .catch((error) => alert(error));

    const qualis = data.OrderDetails.map((elem) => {
      return {
        name: elem.Product.description,
        id: elem.ProductId,
        image: elem.Product.image,
        stars: 0,
        comment: "",
      };
    });
    setQualification(qualis);
  };

  const handleChange = (e) => {
    const nameinput = e.target.name;
    const valueinput = e.target.value;

    const nuevoEstado = qualification.map((objeto) => {
      if (objeto.name == nameinput) {
        objeto.comment = valueinput;
      }
      return objeto;
    });

    setQualification(nuevoEstado);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const arrQualification = qualification.map((elem) => {
      return {
        idProduct: elem.id,
        points: elem.stars,
        comment: elem.comment,
      };
    });
    const respuesta = { arrQualification: arrQualification };
    await axios
      .post(`https://resto-p4fa.onrender.com/qualification/`, respuesta)
      .then((response) => alert("formulario enviado con exito"))
      .catch((error) => alert(error));
  };

  useEffect(() => {
    order();
  }, [params, setQualification]);

  return (
    <StyledView>
      <Header>
        <Title>Ayúdanos a mejorar</Title>
        <Subtitle>
          Tu opinión es muy importante para nosotros, por favor evalúa cómo te
          parecieron nuestros platillos.
        </Subtitle>
      </Header>
      <form onSubmit={(e) => handleSubmit(e)}>
        <CardsContainer>
          {qualification?.map((elem) => {
            return (
              <StyledDetailCard key={elem.id}>
                <StyledImg src={elem.image} />
                <NameContainer>
                  <StyledName>{elem.name}</StyledName>
                </NameContainer>
                <RatingSelectorContainer>
                  {Array.from({ length: 5 }, (_, index) => (
                    <StarIcon
                      key={index}
                      icon={index < elem.stars ? solidStar : regularStar}
                      onClick={() => handleStarClick(index, elem.id)}
                    />
                  ))}
                </RatingSelectorContainer>
                <Input
                  name={elem.name}
                  placeholder={"¿Algún comentario?"}
                  onChange={handleChange}
                />
              </StyledDetailCard>
            );
          })}
        </CardsContainer>

        <CTAsContainer
          className={"float"}
          text1={"Enviar"}
          type1={"submit"}
          text2={"Ahora no"}
          onClick2={() => navigateHome()}
        />
      </form>
    </StyledView>
  );
};

const StyledView = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  overflow-y: auto;
  padding: 10vh 4vw 20vh;
  box-sizing: border-box;
  transition: width 0.3s ease-in-out;
  gap: 2rem;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h6``;

const Subtitle = styled.span``;

const CardsContainer = styled.div`
  width: 100%;
  margin: 1rem 0;
  display: grid;
  gap: 1rem;
  grid-auto-rows: auto;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
`;

const StyledDetailCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  padding: 1rem;
  border-radius: 1rem;
  background: ${(props) => props.theme.primary};
  box-shadow: ${(props) => props.theme.shortShadow};
  position: relative;
  transition: all 0.2s ease-in-out;
  justify-content: space-between;
  gap: 2rem;

  ${(props) =>
    props.$isReview &&
    `
&:hover {
  transform: scale(1.02);
}
`}
`;

const StyledImg = styled.img`
  height: 15rem;
  width: 100%;
  border-radius: 0.5rem;
  object-fit: cover;
  box-sizing: border-box;
`;

const NameContainer = styled.div`
  display: flex;
  justify-content: space-between;

  ${(props) =>
    props.$isReview &&
    `
  justify-content: center;
  `}
`;

const StyledName = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
`;

const RatingSelectorContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
  justify-content: center;
  padding: 1rem 0;
  font-size: 2.5rem;

  @media (max-width: 650px) {
    justify-content: space-evenly;
  }
`;

const StarIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.2);
  }
`;

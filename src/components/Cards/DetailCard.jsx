import React from "react";
import { NavLink } from "react-router-dom";
import { TextButton } from "../TextButton/TextButton";

import { styled } from "styled-components";

export const StyledCard = styled.div`
display: flex;
width: 30rem;
height: auto;
padding: 1rem 1rem;
flex-direction: column;
justify-content: space-between;
align-items: center;
border-radius: 1rem;
background: ${(props) => props.theme.primary};
  box-shadow: ${(props) => props.theme.shortShadow};
  gap: 1rem;

a {
    text-decoration: none;
}

div{
    width: 100%;
    display: flex;
    justify-content: space-between;
}

img{
  height: 20rem;
flex-shrink: 0;
align-self: stretch;
object-fit: cover;
border-radius: .5rem;
}
`



export const DetailCard = (props) => {
  const { id, img, country, continent, capital, subregion = "Desconocida", area  = "Desconocida", population } = props
  return (
    <StyledCard>
      <img src={img} alt='flag' />
      <div><h5>ID:</h5> <h5>{id}</h5></div>
      <div><h5>Nombre:</h5><h5> {country}</h5></div>
      <div><h5>Continente: </h5><h5>{continent}</h5></div>
      <div><h5>Capital: </h5><h5>{capital}</h5></div>
      <div><h5>Subregión: </h5><h5>{subregion}</h5></div>
      <div><h5>Área: </h5><h5>{area} km²</h5></div>
      <div><h5>Población: </h5><h5>{population} hab</h5></div>
      <NavLink to={`/home`}><TextButton text="Volver"/></NavLink>
    </StyledCard>
  );
};
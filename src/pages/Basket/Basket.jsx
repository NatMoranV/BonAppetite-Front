import { styled } from "styled-components";
import { ToggleButton } from "../../components/ToggleButton/ToggleButton";
import { useState } from "react";
// import { DetailCard } from "../../components/Cards/DetailCard";
import { StyledInput } from "../../components/Input/StyledInput";
import { CTAsContainer } from "../../components/CTAs/CTAsContainer";
import { useNavigate } from "react-router-dom";
import { Divider } from "../../components/Divider/Divider";
import { Card } from "../../components/Cards/Card";

const selectedItems = [
	
  {
    id: 1,
    name: "Carne",
    stock: 30,
    price: 10,
    time: 15,
    desc: "Empanadas de carne saladas.",
    image:
      "https://media.istockphoto.com/id/1176364232/es/foto/chilean-empanadas-con-carne.jpg?s=612x612&w=0&k=20&c=Feq0DeDEgHh4rncN0QCeK_a5jBPM_ssYh9wEDVGv5UI=",
  },
  {
    id: 2,
    name: "Pollo",
    stock: 23,
    price: 11,
    time: 15,
    desc: "Empanadas de poio.",
    image:
      "https://media.istockphoto.com/id/521954007/es/foto/pollo-relleno-de-empanadas-casera.jpg?s=612x612&w=0&k=20&c=QPCkMlIwKatscw6tpnsMQVD9-lx7wOpxmZqpzWK3vkQ=",
  },
  {
    id: 3,
    name: "Pescado",
    stock: 55,
    price: 23,
    time: 10,
    desc: "Empanadas de pescado",
    image:
      "https://media.istockphoto.com/id/1354091306/es/foto/deliciosas-y-tradicionales-empanadas-colombianas-con-salsa-picante.jpg?s=612x612&w=0&k=20&c=JAau1dr2ebVo49PtarsMcDhIgzeVrOmwTyxo9E9p0jM=",
  },
  {
    id: 4,
    name: "Veggie",
    stock: 12,
    price: 15,
    time: 8,
    desc: "Empanadas de ninguna carne",
    image:
      "https://media.istockphoto.com/id/1227024409/es/foto/empanadas-caseras-de-harina-de-ma%C3%ADz.jpg?s=612x612&w=0&k=20&c=Dava7SPFAPZIrJs1kKO4miZ4Z3r6g4gZ87TQRCNNEe8=",
  },
];

const total = selectedItems.reduce((accumulator, currentItem) => {
  return accumulator + currentItem.price;
}, 0);

export const Basket = () => {
  const navigate = useNavigate();
  const navigateHome = () => {
    navigate("/home");
  };

  const navigatePay = () => {
    navigate("/pay");
  };

  const [toggled, setToggled] = useState(false);
  return (
    <StyledView>
      <h6>Resumen de tu pedido</h6>
      <ResumeContainer>
        {selectedItems.map((item) => (
          <Card
            key={item.id}
            id={item.id}
            name={item.name}
            shortDesc={item.desc}
            time={item.time}
            price={item.price}
            img={item.image}
          />
        ))}

        <Divider />
        <h6> TOTAL ${total}</h6>
        <ToggleButton
          label={"Para llevar a casa"}
          onChange={(event) => setToggled(event.target.checked)}
        />
      </ResumeContainer>

      <StyledInput
        type={"text"}
        name={"Notes"}
        placeholder={"Ej. Tacos sin cebolla"}
        helper={"Acá puede agregar alguna petición"}
      />

      <CTAsContainer
        text1={`Ir a pagar · $${total}`}
        onClick1={navigatePay}
        text2={"Agregar algo más"}
        onClick2={navigateHome}
      />
    </StyledView>
  );
};

const StyledView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: auto;
  margin: auto;
  overflow-y: auto;
  padding: 8vh 4vw 5vh;
  box-sizing: border-box;
  transition: width 0.3s ease-in-out;
  gap: 3rem;

  @media (min-width: 650px) {
    width: 30rem;
    padding: 9vh 0 3vh 0;
  }
`;

const ResumeContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: end;
`;

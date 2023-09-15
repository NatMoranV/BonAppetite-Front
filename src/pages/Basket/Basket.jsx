import { styled } from "styled-components";
import { ToggleButton } from "../../components/ToggleButton/ToggleButton";
import { useEffect, useState } from "react";
import { StyledInput } from "../../components/Input/StyledInput";
import { CTAsContainer } from "../../components/CTAs/CTAsContainer";
import { useNavigate } from "react-router-dom";
import { Divider } from "../../components/Divider/Divider";
import { Card } from "../../components/Cards/Card";
import { useDispatch, useSelector } from "react-redux";
import { addOrder } from "../../redux/actions/actions";
import { Modal } from "../../components/Modal/Modal";

export const Basket = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userIsLoggedIn = useSelector((state) => state.logged);
  // const items = useSelector((state) => state.basket);
  const [toggled, setToggled] = useState(false);
  const [total, setTotal] = useState(0);
  const [items, setItems] = useState([]);
  const [errorVisible, setErrorVisible] = useState(false);

  useEffect(() => {
    const savedBasket = JSON.parse(localStorage.getItem("basket")) || [];
    setItems(savedBasket);

    setTotal(() => {
      let cont = 0;

      savedBasket.map((item) => {
        cont += item.price * item.amount;
      });
      return cont;
    });
  }, []);

  const payCash = async () => {
    if (!userIsLoggedIn) {
      setErrorVisible(true);
    } else {
      try {
        const orderData = {
          arrDetails: items.map((item) => ({
            idProduct: item.id,
            price: item.price,
            amount: item.amount,
            extras: item.extras,
          })),
          idUser: userIsLoggedIn.uid,
          status: "Pagar",
        };
        await dispatch(addOrder(orderData));
        localStorage.removeItem("basket");
        navigate(
          `/customer/orders/${encodeURIComponent(window.location.href)}`
        );
      } catch (error) {
        console.log("Error al enviar la orden:", error);
      }
    }
  }
  
    const navigatePay = async () => {
      if (!userIsLoggedIn) {
        setErrorVisible(true);
      } else {
        try {
          const orderData = {
            arrDetails: items.map((item) => ({
              idProduct: item.id,
              price: item.price,
              amount: item.amount,
              extras: item.extras,
            })),
            idUser: userIsLoggedIn.uid,
            status: "Mercado_Pago",
          };
          const response = await dispatch(addOrder(orderData));
          const paymentLink = response.payload.link;
          localStorage.removeItem("basket");
          window.location.href = paymentLink;
        } catch (error) {
          console.log("Error al enviar la orden:", error);
        }
      }
    };

    return (
      <StyledView>
        <h6>Resumen de tu pedido</h6>
        <ResumeContainer>
          {items.map((card) => (
            <Card
              key={card.id}
              name={card.name}
              shortDesc={card.shortDesc}
              time={card.time}
              price={card.price * card.amount}
              img={card.img}
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
          text1={`Pagar en línea · $${total}`}
          onClick1={navigatePay}
          text2={"Pagar en efectivo"}
          onClick2={payCash}
        />
        {errorVisible && (
          <Modal
            msg="Necesitas iniciar sesión para finalizar el pedido."
            loading={false}
            text1={"Iniciar sesión"}
            onClick1={() => {
              setErrorVisible(false);
              navigate("/customer/login");
            }}
            text2={"Cancelar"}
            onClick2={() => setErrorVisible(false)}
          />
        )}
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


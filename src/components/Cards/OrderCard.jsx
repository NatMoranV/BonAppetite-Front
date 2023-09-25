/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import styled from "styled-components";
import { Card } from "./Card";
import { Divider } from "../Divider/Divider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoneyBills,
  faCircleCheck,
  faCircleExclamation,
  faCircleUser,
  faCircleXmark,
  faClock,
  faCoins,
} from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "../Dropdown/StyledDropdown";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { TextButton } from "../TextButton/TextButton";
import { useDispatch } from "react-redux";
import { getAllOrders, updateOrderStatus, updatePaymentStatus } from "../../redux/actions/actions";
import { CircleButton } from "../CircleButton/CircleButton";

const status = [
  "pending",
  "ongoing",
  "ready",
  "delivered",
  "cancelled",
  "delayed",
];

const statusIcons = {
  pending: faMoneyBills,
  ongoing: faClock,
  ready: faCircleCheck,
  delivered: faCircleUser,
  cancelled: faCircleXmark,
  delayed: faCircleExclamation,
};
const statusMessage = {
  pending: "Abona tu pedido en caja",
  ongoing: "Estamos preparando tu pedido",
  ready: "Tu pedido está listo para retirar",
  delivered: "Tu pedido ya fue entregado",
  cancelled: "Tu pedido fue cancelado",
  delayed: "Tu pedido está demorado",
};

export const OrderCard = ({ order, onTimeOff, time, isReady }) => {
  const [timeInSeconds, setTimeInSeconds] = useState(time);
  {
    /* agregar *60 para convertirlos a minutos, mientras lo dejo asi para hacer pruebas*/
  }
  const [isDelayed, setIsDelayed] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false);

  const location = useLocation().pathname;
  const dispatch = useDispatch()

  const isManagerOrders = location === "/manager/orders/";
  const isCustomerOrders = location.startsWith("/customer/orders/");

  const [displayCount, setDisplayCount] = useState(1);

  const handleShowMore = () => {
    setDisplayCount(order.OrderDetails.length);
  };

  const handleShowLess = () => {
    setDisplayCount(1);
  };

  const handleTimeOff = () => {
    setIsDelayed(true);
  };

  useEffect(() => {
    let intervalId;

    if (timerRunning && !isReady) {
      intervalId = setInterval(() => {
        if (!isDelayed) {
          if (timeInSeconds > 0) {
            setTimeInSeconds(timeInSeconds - 1);
          } else {
            setIsDelayed(true);
            handleTimeOff();
          }
        } else {
          setTimeInSeconds(timeInSeconds + 1);
        }
      }, 1000);
    }
    
    
    return () => clearInterval(intervalId);
  }, [timeInSeconds, isDelayed, timerRunning, onTimeOff, isReady]);

  useEffect(() => {
    if (isReady) {
      setTimerRunning(false);
    }
  }, [isReady]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const [currentStatus, setCurrentStatus] = useState(order.status);

  const handleChange = (event) => {
    const newStatus = event.target.value;
    const id = parseInt(event.target.id)
    setCurrentStatus(newStatus);
    dispatch(updateOrderStatus(id, newStatus))
    dispatch(getAllOrders())
  };

 const handlePay = () => {
   dispatch(updatePaymentStatus(order.id))
   dispatch(getAllOrders())
  setTimeout(() => {
    window.location.reload()
    
  }, 350);
 }

  useEffect(() => {
    if (isDelayed) {
      setCurrentStatus("delayed");
      dispatch(updateOrderStatus(order.id,"delayed"))
    }
  }, [isDelayed, dispatch, order.id]);

  useEffect(() => {
    currentStatus === "ongoing" || currentStatus === "delayed" ? setTimerRunning(true) : setTimerRunning(false)
  })

  const isOngoing = currentStatus === "ongoing";
  const isPending = currentStatus === "pending"

  return (
    <>
      {isManagerOrders ? (
        <StyledCard>
          <Header>
            <TheIcon
              icon={statusIcons[currentStatus]}
              className={isDelayed ? "delayed" : currentStatus}
              $isDelayed={isDelayed}
            />
            {isOngoing || isDelayed && (
              <>
                <StyledTimer $isDelayed={isDelayed}>
                  {isDelayed ? `+` : "-"}
                  {formatTime(timeInSeconds)}
                </StyledTimer>
              </>
            ) }
            {isPending && (
          <CircleButton
            icon={faCoins}
            id={order.id}
            onClick={handlePay}
          />
        )}
          </Header>
          <Order>Orden {order.id}</Order>
          <Divider />
          {order.OrderDetails?.map((card) => (
            <>
              <Card
                key={card.id}
                id={card.Product.id}
                name={card.Product.name}
                shortDesc={card.Product.description}
                amount={card.Product.amount}
              />
              <Divider />
            </>
          ))}

          {order.take_away && (
            <>
              <TakeHome>Para llevar a casa</TakeHome>
            </>
          )}
          {order.notes && (
            <>
              <span>{order.notes}</span>
            </>
          )}
          <Dropdown
            name={"status"}
            id={order.id}
            array={status}
            selectedValue={currentStatus}
            onChange={handleChange}
            // onClick={updateStatus}
          />
        
        </StyledCard>
      ) : (
        <StyledCard>
          <Header>
            <TheIcon
              icon={statusIcons[currentStatus]}
              className={isDelayed ? "delayed" : currentStatus}
              $isDelayed={isDelayed}
            />
            {currentStatus === "pending" ||
            currentStatus === "ongoing" ||
            currentStatus === "delayed" ? (
              <span>{statusMessage[currentStatus]}</span>
            ) : null}
            {isOngoing || isDelayed ? (
              <>
                <StyledTimer $isDelayed={isDelayed}>
                  {isDelayed ? `+` : "-"}
                  {formatTime(timeInSeconds)}
                </StyledTimer>
              </>
            ) : null}
          </Header>
          <Order>Orden {order.id}</Order>
          <Divider />
          {order.OrderDetails.slice(0, displayCount).map((card) => (
            <>
              <Card
                key={card.id}
                id={card.Product.id}
                name={card.Product.name}
                shortDesc={card.Product.description}
                amount={card.Product.amount}
                image={card.Product.image}
                price={card.Product.price}
              />
              <Divider />
            </>
          ))}

          {order.take_away && (
            <>
              <TakeHome>Para llevar a casa</TakeHome>
              <Divider />
            </>
          )}
          {/* {order.notes && (
            <>
              <span>{order.notes}</span>
              <Divider />
            </>
          )} */}

          <StyledTotal $isCustomerOrders={isCustomerOrders}>
            Total: ${order.total}
          </StyledTotal>

          {order.OrderDetails.length > 1 && (
            <VerMasContainer>
              {displayCount < order.OrderDetails.length ? (
                <TextButton
                  onClick={handleShowMore}
                  text={"Ver más"}
                ></TextButton>
              ) : (
                <TextButton
                  onClick={handleShowLess}
                  text={"Ver menos"}
                ></TextButton>
              )}
            </VerMasContainer>
          )}
        </StyledCard>
      )}
    </>
  );
};

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: fit-content;
  min-width: 18rem;
  padding: 2rem 1rem;
  border-radius: 1rem;
  background: ${(props) => props.theme.primary};
  box-shadow: ${(props) => props.theme.shortShadow};
  transition: all 0.2s ease-in-out;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TheIcon = styled(FontAwesomeIcon)`
  font-size: 1.5rem;

  &&.delayed {
    path {
      fill: ${(props) => props.theme.warning};
    }
  }
  &&.ready {
    path {
      fill: ${(props) => props.theme.success};
    }
  }
  &&.delivered {
    path {
      fill: ${(props) => props.theme.info};
    }
  }
  &&.cancelled {
    path {
      fill: ${(props) => props.theme.error};
    }
  }
`;

const StyledTimer = styled.span`
  display: flex;
  width: fit-content;
  padding: 0 0 0 1rem;
  font-size: 2rem;
  font-weight: 600;

  ${(props) =>
    props.$isDelayed &&
    `

color:  ${props.theme.warning};

`}
`;

const Order = styled.span`
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
`;

const TakeHome = styled.span`
  font-size: 1.3rem;
  font-weight: 600;
`;

const StyledTotal = styled.h6`
  ${(props) =>
    props.$isCustomerOrders &&
    `
    text-align: end;
    
    `}
  margin: 0;
`;

const VerMasContainer = styled.div`
  display: flex;
  justify-content: center;
`;

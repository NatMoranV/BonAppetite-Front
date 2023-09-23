import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import {
  filterOrdersByStatus,
  getAllOrders,
  orderByPrice,
} from "../../redux/actions/actions";
import { TextButton } from "../TextButton/TextButton";
import { Dropdown } from "../Dropdown/StyledDropdown";

export const Filters = ({ isVisible }) => {
  const dispatch = useDispatch();

  const [aux, setAux] = useState(true);
  const [managerFilters, setManagerFilters] = useState([
    {
      id: 1,
      active: false,
      display: "Todos",
      action: () => dispatch(getAllOrders()),
    },
    {
      id: 2,
      active: false,
      display: "Pagar",
      action: () => dispatch(filterOrdersByStatus("pending")),
    },
    {
      id: 3,
      active: false,
      display: "En preparacion",
      action: () => dispatch(filterOrdersByStatus("ongoing")),
    },
    {
      id: 4,
      active: false,
      display: "Para entregar",
      action: () => dispatch(filterOrdersByStatus("ready")),
    },
    {
      id: 5,
      active: false,
      display: "Entregado",
      action: () => dispatch(filterOrdersByStatus("delivered")),
    },
    {
      id: 6,
      active: false,
      display: "Cancelado",
      action: () => dispatch(filterOrdersByStatus("cancelled")),
    },
    {
      id: 7,
      active: false,
      display: "Demorado",
      action: () => dispatch(filterOrdersByStatus("delayed")),
    },
  ]);

  const [customerFilters, setCustomerFilters] = useState([
    {
      id: 1,
      active: false,
      display: `Más caro primero`,
      action: () => dispatch(orderByPrice("higher")),
    },
    {
      id: 2,
      active: false,
      display: `Más barato primero`,
      action: () => dispatch(orderByPrice()),
    },
    {
      id: 3,
      active: false,
      display: `Mejor calificación`,
      action: () => dispatch(orderByRating()),
    },
    // { id: 4, active: false, display: '5⭐', action: () => dispatch(orderByRating(5)) },
  ]);

  const customerOptionsFilter = customerFilters.map((filter) => filter.display);
  const managerOptionsFilter = managerFilters.map((filter) => filter.display);

  const handleCustomerFilters = (display) => {
    const updatedFilters = customerFilters.map((filter) => {
      if (filter.display === display) {
        filter.action();
        return { ...filter, active: true };
      } else {
        return { ...filter, active: false };
      }
    });
    setCustomerFilters(updatedFilters);
    setAux(!aux);
  };
  const handleManagerFilters = (display) => {
    const updatedFilters = managerFilters.map((filter) => {
      if (filter.display === display) {
        filter.action();
        return { ...filter, active: true };
      } else {
        return { ...filter, active: false };
      }
    });
    setOrdersFilters(updatedFilters);
    setAux(!aux);
  };

  const location = useLocation();
  // const isCustomerView =
  // 	location.pathname === "/customer" || location.pathname === "/customer/";
  const isManagerOrdersView =
    location.pathname === "/manager/orders" ||
    location.pathname === "/manager/orders/";

  return (

        <SliderContainer $isVisible={isVisible}>
          <Dropdown label={"Ordenar por"} onChange={!isManagerOrdersView ? (e) => handleCustomerFilters(e.target.value) : (e) => handleManagerFilters(e.target.value) } option1={"Selecciona una opción"} array={!isManagerOrdersView ? customerOptionsFilter: managerOptionsFilter} />
        </SliderContainer>
  );
};

const SliderContainer = styled.div`
  display: flex;
  padding: 1rem 1rem;
  gap: 1rem;
  width: 100%;
  justify-content: center;
  height: auto;
  box-sizing: border-box;
  overflow-x: auto;
  transition: all .4s ease-in-out;
  opacity: 0;
  position: absolute;
  top: 16rem;

  ${(props) =>
    props.$isVisible &&
    `
	opacity: 1;
	position: inherit;

	`}

  @media (max-width: 650px) {
    justify-content: left;
  }

  &&::-webkit-scrollbar-thumb {
    background: transparent;
  }
  &&::-webkit-scrollbar {
    width: 0.01px;
  }
`;

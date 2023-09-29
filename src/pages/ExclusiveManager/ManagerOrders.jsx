/* eslint-disable react/prop-types */

import {
  faFilter,
  faMagnifyingGlass,
  faSort,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { OrderCard } from "../../components/Cards/OrderCard";
import { Filters } from "../../components/Filters/Filters";
import { Input } from "../../components/Input/Input";
import { getAllOrders, getOrderById } from "../../redux/actions/actions";
import { CircleButton } from "../../components/CircleButton/CircleButton";
import { NoResultsCard } from "../../components/Cards/NoResultsCard";

export const ManagerOrders = () => {
  const [visibleSorters, setVisibleSorters] = useState(false);
  const dispatch = useDispatch();
  const [isDelayed, setIsDelayed] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const filteredOrders = useSelector((state) => state.filteredOrders);
  const allOrders = useSelector((state) => state.allOrders.reverse());
  const handleTimeOff = () => {
    setIsDelayed(true);
  };

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  const handleChange = (event) => {
    const inputValue = event.target.value;
    if (/^[0-9]*$/.test(inputValue) || inputValue === "") {
      setInputValue(inputValue);
    }
  };

  const handleSearch = () => {
    if (inputValue.length) {
      dispatch(getOrderById(parseInt(inputValue)));
      setInputValue("");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      inputValue.length && dispatch(getOrderById(parseInt(inputValue)));
      setInputValue("");
    }
  };

  let ordersToRender = filteredOrders ? filteredOrders : allOrders;
  const orderExist = ordersToRender.some(
    (order) => Object.keys(order).length === 0
  );


  return (
    <StyledView>
      <SearchbarContainer>
        <SearchBar
          type="text"
          placeholder={"Buscar por número de órden"}
          // icon1={faSort}
          // onClick1={() => setVisibleSorters(!visibleSorters)}
          icon1={faMagnifyingGlass}
          onClick1={handleSearch}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={inputValue}
        />
        <CircleButton
          icon={faFilter}
          onClick={() => setVisibleSorters(!visibleSorters)}
        />
      </SearchbarContainer>
      <Filters isVisible={visibleSorters} />
      {/* <OrdersContainer> */}
        {/* {!orderExist && <span>Pendientes</span>} */}
        <CardsGrid>
          {!orderExist ? (
            ordersToRender.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                time={order.time}
                onTimeOff={handleTimeOff}
                isDelayed={isDelayed}
                isReady={isReady}
              />
            ))
          ) : (
            <NoResultsCard
              title={"Sin resultados."}
              message={"Ninguna orden coincide con los datos de búsqueda."}
            />
          )}
        </CardsGrid>
      {/* </OrdersContainer> */}
    </StyledView>
  );
};

const StyledView = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
  box-sizing: border-box;
  padding: 6vh 0 10vh 0.5rem;
  transition: width 0.3s ease-in-out;
`;

const SearchbarContainer = styled.div`
  display: flex;
  width: 100%;
  position: sticky;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 4rem 0 2rem;
  top: 2rem;
  background-color: ${(props) => props.theme.primary};
  z-index: 3;
`;

const SearchBar = styled(Input)`
  width: 46rem;
  box-sizing: border-box;
  @media (max-width: 650px) {
    width: 100%;
  }
`;
const OrdersContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
  box-sizing: border-box;
  overflow-y: auto;
  transition: width 0.3s ease-in-out;
  &&::-webkit-scrollbar-thumb {
    background: transparent;
  }
  &&::-webkit-scrollbar {
    width: 0.01px;
  }
`;

const CardsGrid = styled.div`
  width: 99%;
  margin: 1rem 0;
  box-sizing: border-box;
  display: grid;
  gap: 1rem;
  grid-auto-rows: auto;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
`;

const HorizontalContainer = styled.div`
  display: flex;
  gap: 1rem;
  width: 100vw;
  height: 100%;
  overflow-x: scroll;
  padding: 1rem;

  &&::-webkit-scrollbar-thumb {
    background: transparent;
  }
  &&::-webkit-scrollbar {
    width: 0.01px;
  }
`;

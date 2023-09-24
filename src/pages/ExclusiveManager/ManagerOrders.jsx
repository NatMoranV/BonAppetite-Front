/* eslint-disable react/prop-types */

import { faMagnifyingGlass, faSort } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { OrderCard } from "../../components/Cards/OrderCard";
import { Filters } from "../../components/Filters/Filters";
import { Input } from "../../components/Input/Input";
import { CircleButton } from "../../components/CircleButton/CircleButton";
import { getAllOrders, getOrderById } from "../../redux/actions/actions";
import { Modal } from "../../components/Modal/Modal";

export const ManagerOrders = () => {
  const [visibleSorters, setVisibleSorters] = useState(false)
  const dispatch = useDispatch();
  const [isDelayed, setIsDelayed] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const filteredOrders = useSelector((state) => state.filteredOrders);
  const allOrders = useSelector((state) => state.allOrders);
  const searchError = useSelector((state)=> state.orderSearchError);
  const handleTimeOff = () => {
    setIsDelayed(true);
  };


	useEffect(() => {
		dispatch(getAllOrders())
	}, [dispatch])
	console.log('filtered', filteredOrders)
	console.log('all', allOrders)


  const handleChange = (event) => {
    const inputValue = event.target.value 
    if (/^[0-9]*$/.test(inputValue) || inputValue === "") {
      setInputValue(inputValue);
    }
    };
  const showModal = () => {
    const timer = setTimeout(()=> {
      setLoading(false)
    },2000)
    console.log("Estoy corriendo")
    if(searchError.length) {
    setLoading(true);
    ()=>clearTimeout(timer)
    }
  }

  const handleSearch = () => {
    if(inputValue.length) {
      dispatch(getOrderById(parseInt(inputValue)));
      setInputValue("")
      console.log(searchError);
      showModal()
    }    
  };
  
  const handleKeyDown = (event) => {
    if(event.key === "Enter") {
      inputValue.length && dispatch(getOrderById(parseInt(inputValue)));
      setInputValue("")  
      showModal()    
    }
  };

  let ordersToRender = filteredOrders ? filteredOrders : allOrders;
  console.log(ordersToRender);
  return (
    <StyledView>
      {loading && (

						<Modal
							isLoader={loading}
							title={'Orden no encontrada'}
							msg={'Ingresa una orden existente'}
						/>

					)}
      <FiltersContainer>
        <FiltersSlider />
      </FiltersContainer>


        {/* <CircleButton
          className={"big"}
          icon={faSort}
          onClick={() => setVisibleSorters(!visibleSorters)}
          isActive={visibleSorters}/>

      <Filters isVisible={visibleSorters} /> */}


			<OrdersContainer>
				<span>Pendientes</span>
				<HorizontalContainer>
					{ordersToRender.length > 1 ? (
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
						<OrderCard
							key={filteredOrders.id}
							order={filteredOrders}
							time={filteredOrders.time}
							onTimeOff={handleTimeOff}
							isDelayed={isDelayed}
							isReady={isReady}
						/>
					)}
				</HorizontalContainer>
			</OrdersContainer>
		</StyledView>
	)
}

const StyledView = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	gap: 1rem;
	box-sizing: border-box;
	padding: 6vh 0 10vh 0.5rem;
	transition: width 0.3s ease-in-out;
`
const OrdersContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	gap: 1rem;
	box-sizing: border-box;
	overflow-y: auto;
	transition: width 0.3s ease-in-out;
`

const SearchbarContainer = styled.div`
  display: flex;
  position: sticky;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
  top: 4rem;
  background-color: ${(props) => props.theme.primary};
  z-index: 4;
`;

const SearchBar = styled(Input)`
  width: 46rem;
  box-sizing: border-box;

  @media (max-width: 650px) {
    width: 100%;
  }
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
`

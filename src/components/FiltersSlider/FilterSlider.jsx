import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { filterOrdersByStatus, getAllOrders, orderByPrice } from '../../redux/actions/actions'
import { TextButton } from '../TextButton/TextButton'

export const FiltersSlider = () => {
	const dispatch = useDispatch()
	
	const [aux, setAux] = useState(true)
	const [ordersFilters, setOrdersFilters] = useState([
		{id:1,active:false,display:'Todos',action:()=>dispatch(getAllOrders())},
		{id:2,active:false,display:'Pagar',action:()=>dispatch(filterOrdersByStatus('pending'))},
		{id:3,active:false,display:'En preparacion',action:()=>dispatch(filterOrdersByStatus('ongoing'))},
		{id:4,active:false,display:'Para entregar',action:()=>dispatch(filterOrdersByStatus('ready'))},
		{id:5,active:false,display:'Entregado',action:()=>dispatch(filterOrdersByStatus('delivered'))},
		{id:6,active:false,display:'Cancelado',action:()=>dispatch(filterOrdersByStatus('cancelled'))},
		{id:7,active:false,display:'Demorado' ,action:()=>dispatch(filterOrdersByStatus('delayed'))}
	])
	const [filters, setFilters] = useState([
		{ id: 1, active: false, display: `$ Asc`, action: () => dispatch(orderByPrice('higher')) },
		{ id: 2, active: false, display: `$ Desc`, action: () => dispatch(orderByPrice()) },
		// { id: 3, active: false, display: `calificacion`, action: () => dispatch(orderByRating()) },
		// { id: 4, active: false, display: '5⭐', action: () => dispatch(orderByRating(5)) },
	])
	const handleFilterClick = (id) => {
		const updatedFilters = filters.map((filter) => {
			if (filter.id === id) {
				filter.action()
				return { ...filter, active: true }
			} else {
				return { ...filter, active: false }
			}
		})
		setFilters(updatedFilters)
		setAux(!aux)
	}
	const handleFilterOrderClick = (id) => {
		const updatedFilters = ordersFilters.map((filter) => {
			if (filter.id === id) {
				filter.action()
				return { ...filter, active: true }
			} else {
				return { ...filter, active: false }
			}
		})
		setOrdersFilters(updatedFilters)
		setAux(!aux)
		
	}

	const location = useLocation();
	// const isCustomerView =
	// 	location.pathname === "/customer" || location.pathname === "/customer/";
	const isManagerOrdersView =
		location.pathname === "/manager/orders" || location.pathname === "/manager/orders/";

	return (
		<>
		{! isManagerOrdersView ? 
		<SliderContainer>
		{/* <span>Ordenar por</span> */}
			{filters.map((filter) => {
				return (
					<TextButton
						key={filter.id}
						onClick={() => handleFilterClick(filter.id)}
						text={filter.display}
						isActive={filter.active}
					/>
				)
			})}
		</SliderContainer>
 : 
		<SliderContainer>
		{/* <span>Ordenar por</span> */}
			{ordersFilters.map((filter) => {
				return (
					<TextButton
						key={filter.id}
						onClick={() => handleFilterOrderClick(filter.id)}
						text={filter.display}
						isActive={filter.active}
					/>
				)
			})}
		</SliderContainer>
}
		</>
	)
}

const SliderContainer = styled.div`
	display: flex;
	padding: 1rem 1rem;
	gap: 1rem;
	width: 100%;
	justify-content: center;
	height: auto;
	box-sizing: border-box;
	overflow-x: auto;
	transition: all 1s ease-in-out;

	@media (max-width: 650px) {
		justify-content: left;
	}

	&&::-webkit-scrollbar-thumb {
    background: transparent;
  }
  &&::-webkit-scrollbar {
    width: 0.01px;
  }
`

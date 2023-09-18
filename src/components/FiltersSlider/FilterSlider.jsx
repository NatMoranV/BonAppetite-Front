import styled from 'styled-components'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { TextButton } from '../TextButton/TextButton'
import { filterOrdersByStatus, orderByPrice } from '../../redux/actions/actions'
import { useLocation } from 'react-router-dom'

export const FiltersSlider = () => {
	const dispatch = useDispatch()
	
	const [aux, setAux] = useState(true)
	const [ordersFilters, setOrdersFilters] = useState([
		{id:1,active:false,display:'Todos',},
		{id:2,active:false,display:'Pagar',action:()=>dispatch(filterOrdersByStatus('Pagar'))},
		{id:3,active:false,display:'En preparacion',action:()=>dispatch(filterOrdersByStatus('En preparacion'))},
		{id:4,active:false,display:'Para entregar',action:()=>dispatch(filterOrdersByStatus('Para entregar'))},
		{id:5,active:false,display:'Entregado',action:()=>dispatch(filterOrdersByStatus('Entregado'))},
		{id:6,active:false,display:'Cancelado',action:()=>dispatch(filterOrdersByStatus('Cancelado'))}
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
		console.log(ordersFilters);
	}

	const location = useLocation();
	const isCustomerView =
		location.pathname === "/customer" || location.pathname === "/customer/";
	// const isManagerOrdersView =
	// 	location.pathname === "/manager/orders" || location.pathname === "/manager/orders/";

	return (
		<>
		{isCustomerView ? 
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
	gap: 1.5rem;
	width: 100%;
	justify-content: center;
	height: auto;
	box-sizing: border-box;
	overflow-x: auto;
	padding-right: 1rem;
	margin-bottom: 1rem;

	transition: all 1s ease-in-out;

	@media (max-width: 650px) {
		justify-content: left;
	}
`

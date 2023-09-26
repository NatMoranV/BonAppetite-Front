/* eslint-disable react/prop-types */
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { filterOrdersByStatus, getAllOrders, orderByPrice, orderByRating } from '../../redux/actions/actions'
import { Dropdown } from '../Dropdown/StyledDropdown'
import { RatingSelector } from '../Rating/Rating'
import { CircleButton } from '../CircleButton/CircleButton'
import { faClose } from '@fortawesome/free-solid-svg-icons'

export const Filters = ({ isVisible }) => {
	const dispatch = useDispatch()

	const [aux, setAux] = useState(true)
	const [managerFilters, setManagerFilters] = useState([
		{
			id: 1,
			active: false,
			display: 'Todos',
			action: () => dispatch(getAllOrders()),
		},
		{
			id: 2,
			active: false,
			display: 'Pagar',
			action: () => dispatch(filterOrdersByStatus('pending')),
		},
		{
			id: 3,
			active: false,
			display: 'En preparacion',
			action: () => dispatch(filterOrdersByStatus('ongoing')),
		},
		{
			id: 4,
			active: false,
			display: 'Para entregar',
			action: () => dispatch(filterOrdersByStatus('ready')),
		},
		{
			id: 5,
			active: false,
			display: 'Entregado',
			action: () => dispatch(filterOrdersByStatus('delivered')),
		},
		{
			id: 6,
			active: false,
			display: 'Cancelado',
			action: () => dispatch(filterOrdersByStatus('cancelled')),
		},
		{
			id: 7,
			active: false,
			display: 'Demorado',
			action: () => dispatch(filterOrdersByStatus('delayed')),
		},
	])

	const [customerFilters, setCustomerFilters] = useState([
		{
			id: 1,
			active: false,
			display: ` `,
			action: () => dispatch(),
		},
		{
			id: 2,
			active: false,
			display: `Precio más bajo`,
			action: () => dispatch(orderByPrice('higher')),
		},
		{
			id: 3,
			active: false,
			display: `Precio más alto`,
			action: () => dispatch(orderByPrice()),
		},
		// {
		// 	id: 4,
		// 	active: false,
		// 	display: `Calificación más alta`,
		// 	action: () => dispatch(orderByRating()),
		// },
		// {
		// 	id: 5,
		// 	active: false,
		// 	display: `Calificación más baja`,
		// 	action: () => dispatch(orderByRating('higher')),
		// },
	])

	const customerOptionsFilter = customerFilters.map((filter) => filter.display)
	const managerOptionsFilter = managerFilters.map((filter) => filter.display)

	const handleCustomerFilters = (display) => {
		const updatedFilters = customerFilters.map((filter) => {
			if (filter.display === display) {
				filter.action()
				return { ...filter, active: true }
			} else {
				return { ...filter, active: false }
			}
		})
		setCustomerFilters(updatedFilters)
		setAux(!aux)
	}
	const handleManagerFilters = (display) => {
		const updatedFilters = managerFilters.map((filter) => {
			if (filter.display === display) {
				filter.action()
				return { ...filter, active: true }
			} else {
				return { ...filter, active: false }
			}
		})
		setManagerFilters(updatedFilters)
		setAux(!aux)
	}

	const location = useLocation()
	const isManagerOrders = location.pathname === '/manager/orders/'

	return (
		<FiltersContainer $isVisible={isVisible} $isManager={isManagerOrders}>
			<Dropdown
				label={'Ordenar por'}
				onChange={
					!isManagerOrders
						? (e) => handleCustomerFilters(e.target.value)
						: (e) => handleManagerFilters(e.target.value)
				}
				array={!isManagerOrders ? customerOptionsFilter : managerOptionsFilter}
			/>
			{!isManagerOrders && <RatingSelector />}
		</FiltersContainer>
	)
}

const FiltersContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	gap: 1rem;
	height: 1rem;
	box-sizing: border-box;
	overflow-x: auto;
	transition: all 0.4s ease-in-out;
	opacity: 1;
	position: absolute;
	top: 16rem;
	padding: 0.8rem 0 1rem 0;

	${(props) =>
		props.$isManager &&
		`
    top: 6rem;
    `}

	${(props) =>
		props.$isVisible &&
		`
	opacity: 1;
	position: inherit;
  height: auto;
	`}

  @media (min-width: 650px) {
		gap: 3rem;
		flex-direction: row;
		align-items: center;
	}

	&&::-webkit-scrollbar-thumb {
		background: transparent;
	}
	&&::-webkit-scrollbar {
		width: 0.01px;
	}
`

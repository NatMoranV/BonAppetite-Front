import styled from 'styled-components'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { TextButton } from '../TextButton/TextButton'
import { orderByPrice } from '../../redux/actions/actions'

export const FiltersSlider = () => {
	const dispatch = useDispatch()
	const [aux, setAux] = useState(true)
	const [filters, setFilters] = useState([
		{ id: 1, active: false, display: `ascendente`, action: () => dispatch(orderByPrice('higher')) },
		{ id: 2, active: false, display: `descendente`, action: () => dispatch(orderByPrice()) },
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

	return (
		<SliderContainer>
			<h4>$</h4>
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
	)
}

const SliderContainer = styled.div`
	display: flex;
	padding: 0.5rem 1rem;
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

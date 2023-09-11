import styled from 'styled-components'

import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { TextButton } from '../TextButton/TextButton'

export const FiltersSlider = ({ onClick }) => {
	const dispatch = useDispatch()
	const [filters, setFilters] = useState([
		{ id: 1, active: false, display: `ascendente` },
		{ id: 2, active: false, display: `descendente` },
		{ id: 3, active: false, display: `calificacion` },
		{ id: 4, active: false, display: '5⭐' },
	])
	const handleFilterClick = (id) => {
		const updatedFilters = filters.map((filter) => {
			if (filter.id === id) {
				return { ...filter, active: !filter.active }
			} else {
				return { ...filter, active: false }
			}
		})
		setFilters(updatedFilters)
	}
	// , action: dispatch(orderByPrice(''))
	// , action: dispatch(orderByRating('higher'))

	return (
		<SliderContainer>
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

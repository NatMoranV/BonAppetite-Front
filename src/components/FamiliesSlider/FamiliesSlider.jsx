import styled from 'styled-components'

import { FamilyCard } from '../Cards/FamilyCard'
import { useDispatch, useSelector } from 'react-redux'
import { filterByFamily } from '../../redux/actions/actions'

export const FamiliesSlider = ({ onClick }) => {
	const dispatch = useDispatch()
	const allFamilies = useSelector((state) => state.families)

	const filterFamily = (family) => {
		const name = family.toLowerCase()
		dispatch(filterByFamily(name))
	}

	return (
		<SliderContainer>
			{allFamilies.map((card, index) => (
				<FamilyCard onClick={() => filterFamily(card.class)} key={index} name={card.class} img={card.image} />
			))}
		</SliderContainer>
	)
}

const SliderContainer = styled.div`
	display: flex;
	padding: 1rem 0;
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

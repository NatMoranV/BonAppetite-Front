/* eslint-disable react/prop-types */
import styled from 'styled-components'

import { FamilyCard } from '../Cards/FamilyCard'
import { useDispatch, useSelector } from 'react-redux'
import { filterByFamily } from '../../redux/actions/actions'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'

export const FamiliesSlider = () => {
	const location = useLocation().pathname

	const isCustomer = location === '/customer/'

	const dispatch = useDispatch()
	const allFamilies = useSelector((state) => state.families)

	const [activeFamily, setActiveFamily] = useState(null)

	const toggleFilterFamily = (family) => {
		if (activeFamily === family) {
			dispatch(filterByFamily(`${family}`))
			setActiveFamily(null)
		} else {
			dispatch(filterByFamily(family))
			setActiveFamily(family)
		}
	}

	return (
		<SliderContainer>
			{allFamilies.map((card, index) => {
				const hasProducts = card.Products.length > 0 && card.Products.some((product) => product.enable)

				if (!isCustomer || (isCustomer && card.enable && hasProducts)) {
					return (
						<FamilyCard
							onClick={() => toggleFilterFamily(card.class)}
							key={index}
							name={card.class}
							image={card.image}
							id={card.id}
							enable={hasProducts && card.enable}
							hasProducts={hasProducts}
							isActive={activeFamily === card.class}
						/>
					)
				}
			})}
		</SliderContainer>
	)
}

const SliderContainer = styled.div`
	display: flex;
	gap: 1.5rem;
	width: 100%;
	justify-content: center;
	height: auto;
	box-sizing: border-box;
	overflow-x: auto;
	padding: 1rem;
	transition: all 0.2s ease-in-out;
	background-color: ${(props) => props.theme.primary};
	z-index: 3;

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

import styled from 'styled-components'

import { FamilyCard } from '../Cards/FamilyCard'
import { useDispatch, useSelector } from 'react-redux'
import { filterByFamily, getMenu } from '../../redux/actions/actions'
import { useLocation } from 'react-router-dom'

export const FamiliesSlider = ({}) => {
	const location = useLocation().pathname

	const isCustomer = location === '/customer/'

	const dispatch = useDispatch()
	const allFamilies = useSelector((state) => state.families)
	console.log(allFamilies)

	const allFoodsImg = 'https://concepto.de/wp-content/uploads/2015/03/alimentos-e1549655531380.jpg'
	const filterFamily = (family) => {
		const name = family
		dispatch(filterByFamily(name))
	}

	return (
		<SliderContainer>
			{allFamilies.map((card, index) => {
				const hasProducts = card.Products.length > 0

				if (!isCustomer || (isCustomer && card.enable && hasProducts)) {
					return (
						<FamilyCard
							onClick={() => filterFamily(card.class)}
							key={index}
							name={card.class}
							image={card.image}
							id={card.id}
							enable={hasProducts && card.enable}
							hasProducts={hasProducts}
						/>
					)
				}
			})}
			{/* <FamilyCard
        onClick={() => dispatch(getMenu())}
        key={99}
        name={"Todos"}
        image={allFoodsImg}
      /> */}
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

import styled from "styled-components";


import { menu } from '../../assets/mockedMenu'
import { FamilyCard } from '../Cards/FamilyCard'


export const FamiliesSlider = ({ onClick }) => {
	return (
		<SliderContainer>
			{menu.map((card, index) => (
				<FamilyCard onClick={onClick} key={index} name={card.familyName} img={card.familyImage} />
			))}

		</SliderContainer>
	);
};



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


`;

import styled from "styled-components";

import { menu } from "../../assets/mockedMenu";
import { FamilyCardToggle } from "../Cards/FamilyCardToggle";

export const FamiliesCarouselToggle = ({ onClick }) => {
	return (
		<CardContainer>
			{menu.map((card, index) => (
				<FamilyCardToggle
					onClick={onClick}
					key={index}
					name={card.familyName}
					img={card.familyImage}
				/>
			))}
		</CardContainer>
	);
};

const CardContainer = styled.div`
	position: fixed;
	top: 4rem;
	display: flex;
	gap: 1.5rem;
	width: 100%;
	align-items: center;
	height: 10rem;
	box-sizing: border-box;
	overflow-x: auto;
	padding-right: 1rem;
	margin-bottom: 1rem;
`;

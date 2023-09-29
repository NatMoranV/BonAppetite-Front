/* eslint-disable react/prop-types */
import styled from "styled-components";

import { FamilyCard } from "../Cards/FamilyCard";
import { useDispatch, useSelector } from "react-redux";
import { filterByFamily } from "../../redux/actions/actions";
import { useLocation } from "react-router-dom";
import { useState } from "react";

export const FamiliesSlider = ({ onClick }) => {
	const location = useLocation().pathname;

	const isCustomer = location === "/customer/";

	const dispatch = useDispatch();
	const allFamilies = useSelector((state) => state.families).sort((a, b) => {

		return a.class.localeCompare(b.class);
	  
	});

	const familiesSelected = useSelector((state) => state.familiesToFilter);

	console.log(familiesSelected);
	const [activeFamily, setActiveFamily] = useState(null);

	const toggleFilterFamily = (family) => {
		if (activeFamily === family) {
			dispatch(filterByFamily(`${family}`));
			setActiveFamily(null);
		} else {
			dispatch(filterByFamily(family));
			setActiveFamily(family);
		}
	};

	return (
		<SliderContainer onClick={onClick}>
			<FamiliesContainer>
				{allFamilies.map((card, index) => {
					const hasProducts =
						card.Products.length > 0 &&
						card.Products.some((product) => product.enable);
					const isActive = familiesSelected.includes(card.class);

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
								isActive={isActive}
							/>
						);
					}
				})}
			</FamiliesContainer>
		</SliderContainer>
	);
};

const SliderContainer = styled.div`
	display: flex;
	gap: 1.5rem;
	width: 100%;
	height: auto;
	margin: auto;
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
`;

const FamiliesContainer = styled.div`
	display: flex;
	gap: 1.5rem;
	width: auto;
	margin: auto;
`;

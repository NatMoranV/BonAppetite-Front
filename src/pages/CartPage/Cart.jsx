// import React from "react";
// import { DetailCard } from "../../components/Cards/DetailCard";
import { styled } from "styled-components";
import { ToggleButton } from "../../components/ToggleButton/ToggleButton";
import { useState } from "react";

export const Cart = () => {
	const [toggled, setToggled] = useState(false);
	return (
		<CartContainer>
			<Resume>Resumen de tu pedido</Resume>

			<Total>TOTAL</Total>
			<TakeAwayContainer>
				<TakeAway>Para llevar a casa</TakeAway>
				<ToggleButton onChange={(event) => setToggled(event.target.checked)} />
			</TakeAwayContainer>
		</CartContainer>
	);
};

const CartContainer = styled.div`
	display: flex;
	width: 23.4375rem;
	min-height: 50.75rem;
	padding: 7.9375rem 1rem 7.75rem 1rem;
	flex-direction: column;
	align-items: flex-start;
	gap: 1rem;
	background: ${(props) => props.theme.primary};
	box-shadow: ${(props) => props.theme.shortShadow};
`;

const Resume = styled.div`
	display: flex;
	padding: 16px 0px;
	align-items: flex-start;
	gap: 10px;
	font-family: Montserrat;
	font-size: 20px;
	font-style: normal;
	font-weight: 600;
	line-height: normal;
`;

const Total = styled.div`
	display: flex;
	padding-right: 0px;
	align-items: flex-end;
	gap: 16px;
	align-self: stretch;
	text-align: right;
	font-family: Montserrat;
	font-size: 24px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
`;

const TakeAwayContainer = styled.div`
	display: flex;
	align-items: flex-start;
	gap: 1rem;
	align-self: stretch;
`;

const TakeAway = styled.p`
	color: var(--Buttons-text, #4a5962);
	font-family: Montserrat;
	font-size: 1rem;
	font-style: normal;
	font-weight: 600;
	line-height: normal;
`;

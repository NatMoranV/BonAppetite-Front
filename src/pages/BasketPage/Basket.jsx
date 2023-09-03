// import React from "react";
// import { DetailCard } from "../../components/Cards/DetailCard";
import { styled } from "styled-components";
import { ToggleButton } from "../../components/ToggleButton/ToggleButton";
import { useState } from "react";
import { DetailCard } from "../../components/Cards/DetailCard";
import { StyledInput } from "../../components/Input/StyledInput";

export const Basket = () => {
	const [toggled, setToggled] = useState(false);
	return (
		<BasketContainer>
			<Resume>Resumen de tu pedido</Resume>
			<DetailCard
				name={"Chimichangas"}
				shortDesc={"shortDesc"}
				time={20}
				price={60}
				image={
					"https://patijinich.com/es/wp-content/uploads/sites/3/2020/10/906-chimichanga-de-guisado-de-res-1024x699.jpg"
				}
			/>
			<DetailCard
				name={"Burritos"}
				shortDesc={"shortDesc"}
				time={60}
				price={20}
				image={
					"https://images.ecestaticos.com/o7KWaogFxLA0CxHb1uGTxjEt6Zw=/78x1:2637x1806/557x418/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2Fe4e%2F05a%2F8a0%2Fe4e05a8a0390f1a505c10df3fc7d31a3.jpg"
				}
			/>
			<Separator />
			<Total>TOTAL + $suma total</Total>

			<TakeAwayContainer>
				<TakeAway>Para llevar a casa</TakeAway>
				<ToggleButton onChange={(event) => setToggled(event.target.checked)} />
			</TakeAwayContainer>
			<StyledInput
				type={"text"}
				name={"Notes"}
				placeholder={"Ej. Tacos sin cebolla"}
			/>
			<span>Acá puedes agregar alguna petición.</span>
		</BasketContainer>
	);
};

const BasketContainer = styled.div`
	display: flex;
	width: 23.4375rem;
	min-height: 50.75rem;
	padding: 5rem 1rem 7.75rem 1rem;
	flex-direction: column;

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

const Separator = styled.div`
	width: 21.3125rem;
	height: 0.25rem;
	border-radius: 0.625rem;
	background: rgba(74, 89, 98, 0.15);
`;

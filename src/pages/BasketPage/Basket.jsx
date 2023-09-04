import { styled } from "styled-components";
import { ToggleButton } from "../../components/ToggleButton/ToggleButton";
import { useState } from "react";
import { DetailCard } from "../../components/Cards/DetailCard";
import { StyledInput } from "../../components/Input/StyledInput";
import { CTAsContainer } from "../../components/CTAs/CTAsContainer";
import { useNavigate } from "react-router-dom";
import { Divider } from "../../components/Divider/Divider";

export const Basket = () => {
	const navigate = useNavigate();
	const navigateHome = () => {
		navigate("/home");
	};

	const navigatePay = () => {
		navigate("/pay");
	};

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
			<Divider />
			<Total> TOTAL $80 </Total>

			<TakeAwayContainer>
				<TakeAway>Para llevar a casa</TakeAway>
				<ToggleButton onChange={(event) => setToggled(event.target.checked)} />
			</TakeAwayContainer>
			<StyledInput
				type={"text"}
				name={"Notes"}
				placeholder={"Ej. Tacos sin cebolla"}
				helper={"Acá puede agregar alguna petición"}
			/>

			<CTAsContainer
				text1={"Ir a pagar · $80"}
				onClick1={navigatePay}
				text2={"Agregar algo más"}
				onClick2={navigateHome}
			/>
		</BasketContainer>
	);
};

const BasketContainer = styled.div`
	display: flex;
	min-width: 23.4375rem;
	min-height: 40.5rem;
	padding: 5rem 1rem 7.75rem 1rem;
	flex-direction: column;

	gap: 1rem;
	background: ${(props) => props.theme.primary};
	box-shadow: ${(props) => props.theme.shortShadow};
`;

const Resume = styled.div`
	aling-items: center;
	padding: 1.5rem 0rem;
	font-family: Montserrat;
	font-size: 1.3rem;
	font-style: normal;
	font-weight: 600;
	line-height: normal;
`;

const Total = styled.div`
	text-align: right;
	font-family: Montserrat;
	font-size: 1.5rem;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
	margin-right: 2rem;
`;

const TakeAwayContainer = styled.div`
	display: flex;
	gap: 6rem;
`;

const TakeAway = styled.p`
	color: #4a5962;
	font-family: Montserrat;
	font-size: 1.4rem;
	font-style: normal;
	font-weight: 600;
	line-height: normal;
`;

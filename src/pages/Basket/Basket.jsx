import { styled } from "styled-components";
import { ToggleButton } from "../../components/ToggleButton/ToggleButton";
import { useEffect, useState } from "react";
import { StyledInput } from "../../components/Input/StyledInput";
import { CTAsContainer } from "../../components/CTAs/CTAsContainer";
import { useNavigate } from "react-router-dom";
import { Divider } from "../../components/Divider/Divider";
import { Card } from "../../components/Cards/Card";

export const Basket = () => {
	const navigate = useNavigate();
	// const items = useSelector((state) => state.basket);
	const [items, setItems] = useState([]);

	useEffect(() => {
		const savedBasket = JSON.parse(localStorage.getItem("basket")) || [];
		setItems(savedBasket);
		console.log(savedBasket);
		setTotal(() => {
			let cont = 0;

			savedBasket.map((item) => {
				console.log("aca estamos en el items", item);
				cont += item.price * item.quantity;
			});
			return cont;
		});
	}, []);

	const [total, setTotal] = useState(0);

	const navigateHome = () => {
		navigate("/customer");
	};

	const navigatePay = () => {
		navigate("/pay");
	};

	const [toggled, setToggled] = useState(false);
	return (
		<StyledView>
			<h6>Resumen de tu pedido</h6>
			<ResumeContainer>
				{items.map((card) => (
					<Card
						key={card.id}
						name={card.name}
						shortDesc={card.shortDesc}
						price={card.price * card.quantity}
						img={card.img}
					/>
				))}
				<Divider />

				<h6> TOTAL ${total}</h6>

				<ToggleButton
					label={"Para llevar a casa"}
					onChange={(event) => setToggled(event.target.checked)}
				/>
			</ResumeContainer>

			<StyledInput
				type={"text"}
				name={"Notes"}
				placeholder={"Ej. Tacos sin cebolla"}
				helper={"Acá puede agregar alguna petición"}
			/>

			<CTAsContainer
				text1={`Ir a pagar · $${total}`}
				onClick1={navigatePay}
				text2={"Pagar en efectivo"}
				onClick2={navigateHome}
			/>
		</StyledView>
	);
};

const StyledView = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	height: auto;
	margin: auto;
	overflow-y: auto;
	padding: 8vh 4vw 5vh;
	box-sizing: border-box;
	transition: width 0.3s ease-in-out;
	gap: 3rem;

	@media (min-width: 650px) {
		width: 30rem;
		padding: 9vh 0 3vh 0;
	}
`;

const ResumeContainer = styled.div`
	width: 100%;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	align-items: end;
`;

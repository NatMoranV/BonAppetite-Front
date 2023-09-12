import { styled } from "styled-components";
import { ToggleButton } from "../../components/ToggleButton/ToggleButton";
import { useEffect, useState } from "react";
import { StyledInput } from "../../components/Input/StyledInput";
import { CTAsContainer } from "../../components/CTAs/CTAsContainer";
import { useNavigate } from "react-router-dom";
import { Divider } from "../../components/Divider/Divider";
import { Card } from "../../components/Cards/Card";
import { useDispatch } from "react-redux";
import { addOrder } from "../../redux/actions/actions";

export const Basket = () => {
	const dispatch = useDispatch();
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
				cont += item.price * item.amount;
			});
			return cont;
		});
	}, []);

	const [total, setTotal] = useState(0);

	const payCash = async () => {
		try {
			const orderData = {
				arrDetails: items.map((item) => ({
					idProduct: item.id,
					price: item.price,
					amount: item.amount,
					extras: item.extras,
				})),
			};
			await dispatch(addOrder(orderData));
			localStorage.removeItem("basket");
			navigate("/customer/orders");
		} catch (error) {
			console.log("Error al enviar la orden:", error);
		}
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
						time={card.time}
						price={card.price * card.amount}
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
				onClick2={payCash}
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

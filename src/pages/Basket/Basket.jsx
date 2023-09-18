import { styled } from "styled-components";
import { ToggleButton } from "../../components/ToggleButton/ToggleButton";
import { useEffect, useState } from "react";
import { StyledInput } from "../../components/Input/StyledInput";
import { CTAsContainer } from "../../components/CTAs/CTAsContainer";
import { useNavigate } from "react-router-dom";
import { Divider } from "../../components/Divider/Divider";
import { Card } from "../../components/Cards/Card";
import { useDispatch, useSelector } from "react-redux";
import { addOrder } from "../../redux/actions/actions";
import { Modal } from "../../components/Modal/Modal";
import Adder from "../../components/Adder/Adder";

export const Basket = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const userIsLoggedIn = useSelector((state) => state.logged);
	const user = useSelector((state) => state.userLogged);

	const [isChecked, setIsChecked] = useState(false);
	const [total, setTotal] = useState(0);
	const [items, setItems] = useState([]);
	const [errorVisible, setErrorVisible] = useState(false);
	const [confirmation, setConfirmation] = useState(false);
	console.log(confirmation);

	const clickHandle = () => {
		setIsChecked(!isChecked);
	};

	const handleAddItem = (card) => {
		setItems((prevItems) =>
			prevItems.map((item) =>
				item.id === card.id ? { ...item, amount: item.amount + 1 } : item
			)
		);
		setTotal((prevTotal) => prevTotal + card.price); // Actualiza el precio total
	};

	const handleRemoveItem = (card) => {
		const updatedItems = [...items];
		const itemIndex = updatedItems.findIndex((item) => item.id === card.id);

		if (itemIndex !== -1) {
			if (updatedItems[itemIndex].amount > 1) {
				updatedItems[itemIndex].amount--;
			} else {
				updatedItems.splice(itemIndex, 1);
			}

			setItems(updatedItems);

			let updatedTotal = 0;
			updatedItems.forEach((item) => {
				updatedTotal += item.price * item.amount;
			});
			setTotal(updatedTotal);
		}
	};

	useEffect(() => {
		const savedBasket = JSON.parse(localStorage.getItem("basket")) || [];
		setItems(savedBasket);

		let totalAmount = 0;

		for (const item of savedBasket) {
			totalAmount += item.price * item.amount;
		}

		setTotal(totalAmount);
	}, []);

	const payCash = async () => {
		if (!userIsLoggedIn) {
			setErrorVisible(true);
		} else {
			try {
				const orderData = {
					arrDetails: items.map((item) => ({
						idProduct: item.id,
						price: item.price,
						amount: item.amount,
						extras: item.extras,
					})),
					// userEmail: user.email,
					idUser: user.id,
					status: "Pagar",
				};
				console.log(orderData);
				await dispatch(addOrder(orderData));
				localStorage.removeItem("basket");
				navigate(
					`/customer/orders/${encodeURIComponent(window.location.href)}`
				);
			} catch (error) {
				console.log("Error al enviar la orden:", error);
			}
		}
	};

	const navigatePay = async () => {
		if (!userIsLoggedIn) {
			setErrorVisible(true);
		} else {
			try {
				const orderData = {
					arrDetails: items.map((item) => ({
						idProduct: item.id,
						price: item.price,
						amount: item.amount,
						extras: item.extras,
					})),
					// userEmail: user.email,
					idUser: user.id,
					status: "Mercado_Pago",
				};
				const response = await dispatch(addOrder(orderData));

				const paymentLink = response.payload.link;
				localStorage.removeItem("basket");
				window.location.href = paymentLink;
			} catch (error) {
				console.log("Error al enviar la orden:", error);
			}
		}
	};

	const handleClearBasket = () => {
		if (!confirmation) {
			setConfirmation(false);
		} else {
			setItems([]);
			setTotal(0);
			localStorage.removeItem("basket");
		}
	};

	// const removeCard = (id) => {
	// 	const updatedItems = items.filter((item) => item.id !== id);
	// 	setItems(updatedItems);

	// 	let updatedTotal = 0;
	// 	updatedItems.forEach((item) => {
	// 		updatedTotal += item.price * item.amount;
	// 	});
	// 	setTotal(updatedTotal);
	// };

	return (
		<StyledView>
			<h6>Resumen de tu pedido</h6>
			<ResumeContainer>
				{items.map((card) => (
					<>
						<Card
							name={card.name}
							shortDesc={card.shortDesc}
							time={card.time}
							price={card.price * card.amount}
							img={card.img}
							amount={card.amount}
						/>
						<Adder
							id={card.id}
							img={card.img}
							name={card.name}
							shortDesc={card.shortDesc}
							price={card.price}
							time={card.time}
							amount={card.amount}
							onRemove={() => handleRemoveItem(card)}
							onAdd={() => handleAddItem(card)}
						/>
					</>
				))}
				<CTAsContainer text1={"Vaciar Canasta"} onClick={handleClearBasket} />

				{confirmation && (
					<Modal
						onClose={() => {
							setConfirmation(false);
						}}
						title={"Pare un momento"}
						msg="¡Está seguro que desea vaciar la canasta?"
						text1={"Vaciar"}
						onClick1={handleClearBasket}
					/>
				)}
				<Divider />

				<h6> TOTAL ${total}</h6>
			</ResumeContainer>

			<StyledInput
				type={"text"}
				name={"Notes"}
				placeholder={"Ej. Tacos sin cebolla"}
				helper={"Acá puede agregar alguna petición"}
			/>
			<ToggleButton
				text={"Para llevar a casa"}
				isChecked={isChecked}
				onChange={clickHandle}
			/>

			<CTAsContainer
				text1={`Pagar en línea · $${total}`}
				onClick1={navigatePay}
				text2={`Pagar en efectivo · $${total}`}
				onClick2={payCash}
			/>
			{errorVisible && (
				<Modal
					onClose={() => {
						setErrorVisible(false);
					}}
					title={"Iniciar sesión"}
					msg="Es necesario para finalizar el pedido."
					text1={"Ingresar"}
					onClick1={() => {
						setErrorVisible(false);
						navigate("/customer/login");
					}}
				/>
			)}
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
	padding: 8vh 4vw 25vh;
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

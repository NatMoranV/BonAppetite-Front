import { styled } from "styled-components";
import { ToggleButton } from "../../components/ToggleButton/ToggleButton";
import { useEffect, useState } from "react";
import { Input } from "../../components/Input/Input";
import { CTAsContainer } from "../../components/CTAs/CTAsContainer";
import { useNavigate } from "react-router-dom";
import { Divider } from "../../components/Divider/Divider";
import { Card } from "../../components/Cards/Card";
import { useDispatch, useSelector } from "react-redux";
import { addOrder } from "../../redux/actions/actions";
import { Modal } from "../../components/Modal/Modal";
import { useLocation } from "react-router-dom";
import { addUrl } from "../../redux/actions/actions";
import { CircleButton } from "../../components/CircleButton/CircleButton";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

export const Basket = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const userIsLoggedIn = useSelector((state) => state.logged);
	const location = useLocation().pathname;
	const user = useSelector((state) => state.userLogged);

	const [total, setTotal] = useState(0);
	const [items, setItems] = useState([]);
	const [errorVisible, setErrorVisible] = useState(false);
	const [confirmation, setConfirmation] = useState(false);
	const [redirectToLogin, setRedirectToLogin] = useState(false);
	const [emptyCartModal, setEmptyCartModal] = useState(false);
	const [takeAway, setTakeAway] = useState(() => {
		const savedTakeAway = localStorage.getItem("takeAway");
		return savedTakeAway ? JSON.parse(savedTakeAway) : false;
	});
	const [notes, setNotes] = useState(() => {
		const savedNotes = localStorage.getItem("notes");
		return savedNotes ? savedNotes : "";
	});

	const handleNotesChange = (event) => {
		const updatedNotes = event.target.value;
		setNotes(updatedNotes);
		localStorage.setItem("notes", updatedNotes);
	};

	const clickHandle = () => {
		const updatedTakeAway = !takeAway;
		setTakeAway(updatedTakeAway);
		localStorage.setItem("takeAway", JSON.stringify(updatedTakeAway));
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
		if (items.length === 0) {
			setEmptyCartModal(true);
		} else if (!userIsLoggedIn) {
			setRedirectToLogin(true);
			setErrorVisible(true);
		} else {
			try {
				const orderData = {
					arrDetails: items.map((item) => ({
						idProduct: item.id,
						amount: item.amount,
					})),
					notes: notes,
					idUser: user.id,
					status: "pending",
					take_away: takeAway,
				};
				await dispatch(addOrder(orderData));
				localStorage.removeItem("basket");
				localStorage.removeItem("takeAway");
				localStorage.removeItem("notes");
				navigate(
					`/customer/orders/${encodeURIComponent(window.location.href)}`
				);
			} catch (error) {
				console.log("Error al enviar la orden:", error);
			}
		}
	};

	const navigatePay = async () => {
		if (items.length === 0) {
			setEmptyCartModal(true);
		} else if (!userIsLoggedIn) {
			setRedirectToLogin(true);
			setErrorVisible(true);
		} else {
			try {
				const orderData = {
					arrDetails: items.map((item) => ({
						idProduct: item.id,
						amount: item.amount,
					})),
					notes: notes,
					idUser: user.id,
					status: "Mercado_Pago",
					take_away: takeAway,
				};
				const response = await dispatch(addOrder(orderData));
				console.log(response);
				const paymentLink = response.payload.link;
				localStorage.removeItem("basket");
				localStorage.removeItem("takeAway");
				localStorage.removeItem("notes");
				window.location.href = paymentLink;
			} catch (error) {
				console.log("Error al enviar la orden:", error);
			}
		}
	};
	useEffect(() => {
		if (redirectToLogin && userIsLoggedIn) {
			navigate(`/basket`);
		}
	}, [redirectToLogin, userIsLoggedIn, navigate]);

	const handleClearBasket = () => {
		setItems([]);
		setTotal(0);
		localStorage.removeItem("basket");
		localStorage.removeItem("notes");
		localStorage.removeItem("takeAway");
		setConfirmation(false);
	};

	return (
		<StyledView>
			<ResumeContainer>
				<Header>
					<Title>Revisa tu pedido</Title>
					{items.length > 0 && (
						<CircleButton
							icon={faTrashCan}
							onClick={() => setConfirmation(true)}
						/>
					)}
				</Header>
				{items.map((card) => (
					<>
						<Card
							id={card.id}
							image={card.image}
							name={card.name}
							shortDesc={card.shortDesc}
							price={card.price}
							time={card.time}
							total={card.price * card.amount}
							amount={card.amount}
							onRemove={() => handleRemoveItem(card)}
							onAdd={() => handleAddItem(card)}
						/>
						<Divider />
					</>
				))}

				<Total>Total: ${total}</Total>
			</ResumeContainer>
			<ActionsContainer>
				<Title>Confirma tu compra</Title>
				<Input
					type={"text"}
					name={"Notes"}
					placeholder={"¿Alguna petición?"}
					value={notes}
					onChange={handleNotesChange}
				/>
				<ToggleButton
					text={"Para llevar a casa"}
					isChecked={takeAway}
					onChange={clickHandle}
				/>
				<CTAsContainer
					text1={`Pagar en línea · $${total}`}
					onClick1={navigatePay}
					text2={`Pagar en efectivo · $${total}`}
					onClick2={payCash}
				/>
			</ActionsContainer>

			{confirmation && (
				<Modal
					onClose={() => {
						setConfirmation(false);
					}}
					title={"Pare un momento"}
					msg="¿Está seguro que desea vaciar la canasta?"
					text1={"Vaciar"}
					onClick1={handleClearBasket}
				/>
			)}

			{emptyCartModal && (
				<Modal
					onClose={() => {
						setEmptyCartModal(false);
					}}
					title={"La canasta está vacía"}
					msg="Debes agregar al  menos un item."
					text1={"Aceptar"}
					onClick1={() => {
						setEmptyCartModal(false);
					}}
				/>
			)}

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
						dispatch(addUrl(location));
						navigate("/customer/login/");
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
	box-sizing: border-box;
	padding: 12vh 1rem 25vh 1rem;
	transition: width 0.3s ease-in-out;
	gap: 3rem;

	@media (min-width: 870px) {
		margin: auto;
		flex-direction: row;
		width: 80%;
		align-items: flex-start;
		justify-content: center;
		padding: 15vh 1rem 3vh 1rem;
	}
	@media (max-width: 1418px) {
		width: 90%;
	}
	@media (max-width: 1256px) {
		width: 100%;
	}
`;

const ResumeContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	box-sizing: border-box;
	gap: 2rem;
	align-items: flex-end;
	position: relative;

	@media (min-width: 870px) {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		align-items: flex-end;
		width: 50%;
		box-sizing: border-box;
		padding: 1rem;
		border-radius: 1rem;
		background: ${(props) => props.theme.primary};
		box-shadow: ${(props) => props.theme.shortShadow};
		transition: all 0.2s ease-in-out;
	}
`;

const Header = styled.div`
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: space-between;
`;

const Title = styled.h6`
	margin: 0;
`;

const Total = styled.h6`
	text-align: end;
`;

const ActionsContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	&& h6 {
		display: none;
	}

	@media (min-width: 870px) {
		&& h6 {
			display: flex;
		}
		position: sticky;
		top: 7rem;
		width: 50%;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		gap: 2rem;
		box-sizing: border-box;
		padding: 1rem;
		border-radius: 1rem;
		background: ${(props) => props.theme.primary};
		box-shadow: ${(props) => props.theme.shortShadow};
	}

	@media (min-width: 1418px) {
		width: 40%;
	}
	@media (min-width: 1256px) {
		width: 40%;
	}
`;

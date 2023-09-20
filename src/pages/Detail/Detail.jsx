import { styled } from "styled-components";
import { CTAsContainer } from "../../components/CTAs/CTAsContainer";
//import { menu } from "../../assets/mockedMenu";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getDishById } from "../../redux/actions/actions";
import { DetailCard } from "../../components/Cards/DetailCard";

// import { addToBasket } from "../../redux/actions/actions";

export const DetailPage = () => {
	// const menu = useMenu()
	// const dishes = menu.flatMap((family) => family.recipes)
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const navigateToEdit = () => {
		navigate(`/manager/edit/${id}`);
	};

	const location = useLocation();
	const $isCustomerView = location.pathname.startsWith("/customer");

	const addCard = () => {
		const cardData = {
			id: productId,
			image: image,
			name,
			shortDesc: description,
			time: minutes,
			price,
			amount: 1,
		};
		const existingBasket = JSON.parse(localStorage.getItem("basket")) || [];
		let existing = false;
		existingBasket.forEach((element) => {
			if (element.id === cardData.id) {
				element.amount++;
				existing = true;
			}
		});
		if (existing) {
			localStorage.setItem("basket", JSON.stringify(existingBasket));
		} else {
			const updatedBasket = [...existingBasket, cardData];
			localStorage.setItem("basket", JSON.stringify(updatedBasket));
		}
	};

	const { id } = useParams();
	const productId = parseInt(id);

	const articleDetails = useSelector((state) => state.detail);
	const { image, name, description, price, time } = articleDetails;

	useEffect(() => {
		dispatch(getDishById(id));
	}, [dispatch]);

	return (
		<StyledView>
		<DetailCard image={image} name={name} desc={description} prepTime={time} price={price}/>
			<CTAsContainer
				text1={$isCustomerView ? `Agregar · $${price}` : `Editar`}
				onClick1={$isCustomerView ? addCard : navigateToEdit}
			/>
		</StyledView>
	);
};

const StyledView = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	margin: 0 auto;
	overflow-y: auto;
	padding: 10vh 4vw 10vh;
	box-sizing: border-box;
	transition: width 0.3s ease-in-out;
	gap: 5rem;

	@media (min-width: 650px) {
		width: 30rem;
		padding: 15vh 0;
	}
`;

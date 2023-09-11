import { styled } from "styled-components";
import { CTAsContainer } from "../../components/CTAs/CTAsContainer";
//import { menu } from "../../assets/mockedMenu";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useMenu from "../../utils/useMenu";
import { useDispatch } from "react-redux";
import { addToBasket } from "../../redux/actions/actions";

export const DetailPage = () => {
	const dispatch = useDispatch();
	const menu = useMenu();
	const dishes = menu.flatMap((family) => family.recipes);
	const navigate = useNavigate();

	const navigateToEdit = () => {
		navigate(`/manager/edit/${id}`);
	};

	const location = useLocation();
	const $isCustomerView = location.pathname.startsWith("/customer");

	const addToCart = () => {
		const cardData = {
			id,
			img,
			name,
			desc,
			time,
			price,
		};

		dispatch(addToBasket(cardData));
		console.log("El item se agrego correctamente");
	};
	const edit = () => console.log(`No fuimo a editar`);

	const { id } = useParams();
	const [articleDetails, setArticleDetails] = useState({
		image: "",
		name: "",
		desc: "",
		price: 0,
	});

	useEffect(() => {
		const selectedMenu = dishes.find((item) => item.id === Number(id));
		if (selectedMenu) {
			setArticleDetails({
				img: selectedMenu.image,
				name: selectedMenu.name,
				desc: selectedMenu.desc,
				time: selectedMenu.time,
				price: selectedMenu.price,
			});
		} else {
			console.error("Como e posible ete susesooo...");
		}
	}, [id]);

	const { img, name, desc, price, time } = articleDetails;

	return (
		<StyledView>
			<StyledImg src={img} />
			<StyledName>{name}</StyledName>
			<StyledDesc>{desc}</StyledDesc>
			<StyledTime>Preparación: {time} minutos</StyledTime>
			<StyledPrice>${price}</StyledPrice>
			<CTAsContainer
				text1={$isCustomerView ? `Agregar · $${price}` : `Editar`}
				onClick1={$isCustomerView ? addToCart : navigateToEdit}
			/>
		</StyledView>
	);
};

const StyledView = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	margin: auto;
	overflow-y: auto;
	padding: 10vh 4vw 10vh;
	box-sizing: border-box;
	transition: width 0.3s ease-in-out;
	gap: 1rem;

	@media (min-width: 650px) {
		width: 30rem;
		padding: 15vh 0;
	}
`;

const StyledImg = styled.img`
	height: 15rem;
	width: 100%;
	border-radius: 0.5rem;
	object-fit: cover;
	box-sizing: border-box;
`;

const StyledName = styled.p`
	font-size: 1.5rem;
	font-weight: 600;
`;

const StyledDesc = styled.p`
	line-height: 1rem;
	font-size: 1rem;
`;

const StyledTime = styled.p`
	line-height: 1rem;
	font-size: 1rem;
`;

const StyledPrice = styled.h6``;

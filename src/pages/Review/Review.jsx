import { styled } from "styled-components";
import { CTAsContainer } from "../../components/CTAs/CTAsContainer";
//import { menu } from "../../assets/mockedMenu";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import { getDishById } from "../../redux/actions/actions";
import { DetailCard } from "../../components/Cards/DetailCard";

// import { addToBasket } from "../../redux/actions/actions";

export const ReviewPage = () => {


	const articleDetails = useSelector((state) => state.detail);
	const { image, name, description, price } = articleDetails;

	return (
		<StyledView>
		<DetailCard img={image} name={name} desc={description} price={price}/>
			<CTAsContainer
				text1={"Enviar"}
				onClick1={null}
                text2={"Ahora no"}
                onClick2={null}
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

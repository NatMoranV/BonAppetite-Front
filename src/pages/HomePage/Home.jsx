import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { MenuCarousel } from "../../components/Carrousel/CarouselMenu";
import { FamiliesCarousel } from "../../components/Carrousel/Carousel";
import { StyledInput } from "../../components/Input/StyledInput";

const search = () => {
	console.log("search");
};

export const Home = () => {
	return (
		<StyledView>
			<FamiliesCarousel />
			<StyledInputWrapper>
				<StyledInput
					placeholder={"Buscar"}
					icono={faMagnifyingGlass}
					onClick={search}
				/>
			</StyledInputWrapper>
			<MenuCarousel />
		</StyledView>
	);
};

const StyledView = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	padding: 1rem;
	margin-top: 4rem;
	align-items: center;
	box-sizing: border-box;
`;
const StyledInputWrapper = styled.div`
	width: 90%;
	padding: 0 0.5rem;
	position: fixed; /* Fijar la posición del componente StyledInput */
	top: 12rem; /* Fija el componente en la parte superior de la página */
	width: 100%; /* Ocupa todo el ancho */
	z-index: 1;
`;

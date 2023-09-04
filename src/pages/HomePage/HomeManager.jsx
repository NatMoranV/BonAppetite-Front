import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

import { FamiliesCarouselToggle } from "../../components/Carrousel/CarouselToggle";
import { StyledInput } from "../../components/Input/StyledInput";
import { MenuCarouselToggle } from "../../components/Carrousel/CarouselMenuToggle";

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
	top: 14rem; /* Fija el componente en la parte superior de la página */
	width: 100%; /* Ocupa todo el ancho */
	z-index: 1;
`;

const search = () => {
	console.log("search");
};

export const HomeManager = () => {
	return (
		<StyledView>
			<FamiliesCarouselToggle />
			<StyledInputWrapper>
				<StyledInput
					placeholder={"Buscar"}
					icono={faMagnifyingGlass}
					onClick={search}
				/>
			</StyledInputWrapper>
			<MenuCarouselToggle />
		</StyledView>
	);
};

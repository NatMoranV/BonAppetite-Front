import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { RecipesList } from "../../components/Recipes/RecipesList";
import { FamiliesSlider } from "../../components/FamiliesSlider/FamiliesSlider";
import { StyledInput } from "../../components/Input/StyledInput";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getFamilies, getMenu } from "../../redux/actions/actions";

const search = () => {
	console.log("search");
};

export const Home = () => {
	const dispatch = useDispatch();

	let mainMenu = useSelector((state) => state.master);
	let mainFamilies = useSelector((state) => {
		state.families;
	});

	useEffect(() => {
		dispatch(getMenu());
		dispatch(getFamilies());
	}, [dispatch]);

	return (
		<StyledView>
			<FamiliesSlider mainFamilies={mainFamilies} />
			<SearchbarContainer>
				<SearchBar
					placeholder={"Buscar"}
					icono={faMagnifyingGlass}
					onClick={search}
				/>
			</SearchbarContainer>

			<RecipesList mainMenu={mainMenu} />
		</StyledView>
	);
};

const StyledView = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	margin-top: 4rem;
	justify-content: center;
	box-sizing: border-box;
`;

const SearchbarContainer = styled.div`
	display: flex;
	position: sticky;
	padding: 1rem 1rem 1rem 1rem;
	top: 3rem;
	width: 100%;
	box-sizing: border-box;
	background-color: ${(props) => props.theme.primary};
	z-index: 1;
`;

const SearchBar = styled(StyledInput)`
	width: 46rem;
	margin: auto;
	box-sizing: border-box;

	@media (max-width: 650px) {
		width: 100%;
	}
`;

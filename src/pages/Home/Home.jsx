import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import { RecipesList } from '../../components/Recipes/RecipesList'
import { FamiliesSlider } from '../../components/FamiliesSlider/FamiliesSlider'
import { Input } from '../../components/Input/Input'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getFamilies, getMenu } from '../../redux/actions/actions'
import { FiltersSlider } from '../../components/FiltersSlider/FilterSlider'
import { RatingSelector } from '../../components/Rating/Rating'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Home = () => {
	const dispatch = useDispatch()

	const [searchTerm, setSearchTerm] = useState('')

	let mainMenu = useSelector((state) => state.filteredMaster)
	let mainFamilies = useSelector((state) => {
		state.families
	})
	useEffect(() => {
		dispatch(getMenu())
		dispatch(getFamilies())
	}, [dispatch])

	const handleSearch = (searchTerm) => {
		const { value } = event.target
		setSearchTerm(value)
	}
	const handleStarClick = (starIndex) => {}

	return (
		<StyledView>
			<FamiliesSlider mainFamilies={mainFamilies} />
			<RatingSelector />
			<SearchbarContainer>
				<SearchBar placeholder={'Buscar'} icono={faMagnifyingGlass} onChange={handleSearch} />
			</SearchbarContainer>
			<FiltersSlider />
			<RecipesList mainMenu={mainMenu} searchTerm={searchTerm} />
		</StyledView>
	)
}

const StyledView = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	margin-top: 4rem;
	justify-content: center;
	box-sizing: border-box;
`

const SearchbarContainer = styled.div`
	display: flex;
	position: sticky;
	align-items: center;
	justify-content: center;
	gap: 1rem;
	padding: 1rem 1rem 1rem 1rem;
	top: 4rem;
	background-color: ${(props) => props.theme.primary};
	z-index: 4;
`

const SearchBar = styled(Input)`
	width: 46rem;
	box-sizing: border-box;

	@media (max-width: 650px) {
		width: 100%;
	}
`

const RatingSelectorContainer = styled.div`
	width: 100%;
	display: flex;
	gap: 1rem;
	justify-content: center;
	padding: 1rem 0;
	font-size: 2.5rem;

	@media (max-width: 650px) {
		justify-content: space-evenly;
	}
`

const StarIcon = styled(FontAwesomeIcon)`
	cursor: pointer;
	transition: all 0.3s ease-in-out;

	&:hover {
		transform: scale(1.2);
	}
`

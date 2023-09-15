import { faFilter, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import { RecipesList } from '../../components/Recipes/RecipesList'
import { FamiliesSlider } from '../../components/FamiliesSlider/FamiliesSlider'
import { StyledInput } from '../../components/Input/StyledInput'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getFamilies, getMenu } from '../../redux/actions/actions'
import { FiltersSlider } from '../../components/FiltersSlider/FilterSlider'


export const Home = () => {
	const dispatch = useDispatch()

	const [searchTerm, setSearchTerm] = useState('')

	let mainMenu = useSelector((state) => state.filteredMaster)
	let mainFamilies = useSelector((state) => {
		state.families
	})
console.log(mainMenu);
	useEffect(() => {
		dispatch(getMenu())
		dispatch(getFamilies())
	}, [dispatch])

	const handleSearch = (searchTerm) => {
		const { value } = event.target
		setSearchTerm(value)
	}

	return (
		<StyledView>
			<FamiliesSlider mainFamilies={mainFamilies} />
			
			<SearchbarContainer>
				<SearchBar placeholder={'Buscar'} icono={faMagnifyingGlass} onChange={handleSearch} />
			</SearchbarContainer>
			<FiltersSlider/>

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
	z-index: 1;
`

const SearchBar = styled(StyledInput)`
	width: 46rem;
	box-sizing: border-box;

	@media (max-width: 650px) {
		width: 100%;
	}
`

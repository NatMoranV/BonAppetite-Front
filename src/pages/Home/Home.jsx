import { faFilter, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { FamiliesSlider } from '../../components/FamiliesSlider/FamiliesSlider'
import { Filters } from '../../components/Filters/Filters'
import { Input } from '../../components/Input/Input'
import { RatingSelector } from '../../components/Rating/Rating'
import { RecipesList } from '../../components/Recipes/RecipesList'
import { getFamilies, getMenu } from '../../redux/actions/actions'
import { CircleButton } from '../../components/CircleButton/CircleButton'

export const Home = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const [visibleSorters, setVisibleSorters] = useState(false)
	const dispatch = useDispatch()
	const location = useLocation().pathname
	const navigate = useNavigate()
	const userRole = useSelector((state) => state.userLogged)
	useEffect(() => {
		if (
			userRole.role !== 'Manager' &&
			location === '/manager/' &&
			userRole.role !== 'Admin' &&
			location === '/manager/'
		) {
			navigate('/')
		}
	}, [navigate])

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

	return (
		<StyledView>
			<FamiliesSlider mainFamilies={mainFamilies} />

			<SearchbarContainer>
				<SearchBar
					placeholder={'Buscar'}
					onChange={handleSearch}
					// icon1={faFilter}
					// onClick1={() => setVisibleSorters(!visibleSorters)}
				/>
				<CircleButton icon={faFilter} onClick={() => setVisibleSorters(!visibleSorters)} />
			</SearchbarContainer>
			<Filters isVisible={visibleSorters} />
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
	padding: 1rem;
	gap: 1rem;
	top: 4rem;
	background-color: ${(props) => props.theme.primary};
	z-index: 4;
`

const SearchBar = styled(Input)`
	width: 43rem;
	box-sizing: border-box;

	@media (max-width: 650px) {
		width: 90%;
	}
`

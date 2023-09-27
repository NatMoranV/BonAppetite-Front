/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { faArrowUp, faFilter } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { FamiliesSlider } from '../../components/FamiliesSlider/FamiliesSlider'
import { Filters } from '../../components/Filters/Filters'
import { Input } from '../../components/Input/Input'
import { RecipesList } from '../../components/Recipes/RecipesList'
import { getFamilies, getMenu } from '../../redux/actions/actions'
import { CircleButton } from '../../components/CircleButton/CircleButton'
import { CTAsContainer } from '../../components/CTAs/CTAsContainer'
import { FloatButton } from '../../components/FloatButton/FloatButton'

export const Home = () => {
	const [aux, setAux] = useState(true)
	const [basketHasItems, setBasketHasItems] = useState(localStorage.basket?.length > 2 || false)
	const eventAdd = useSelector((state) => state.eventAdd)
	useEffect(() => {
		const newBasketValue = localStorage.basket?.length > 2 || false
		setBasketHasItems(newBasketValue)
	}, [eventAdd])

	const [searchTerm, setSearchTerm] = useState('')
	const [visibleSorters, setVisibleSorters] = useState(false)
	const dispatch = useDispatch()
	const location = useLocation().pathname
	const navigate = useNavigate()
	const userRole = useSelector((state) => state.userLogged)
	let mainMenu = useSelector((state) => state.filteredMaster)
	let mainFamilies = useSelector((state) => {
		state.families
	})

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

	useEffect(() => {
		dispatch(getMenu())
		dispatch(getFamilies())
	}, [dispatch])

	const handleSearch = (searchTerm) => {
		const { value } = event.target
		setSearchTerm(value)
	}

	const resetFilters = () => {
		setAux(!aux)
	}

	const scrollTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	}


  return (
    <StyledView>
      <FloatButton icon={faArrowUp} onClick={scrollTop} basketHasItems={basketHasItems}/>
      <FamiliesSlider mainFamilies={mainFamilies} onClick={resetFilters} />

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
			{basketHasItems && <CTAsContainer className={'float'} text1={'Ver canasta'} />}
		</StyledView>
	)
}

const StyledView = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	margin: 4rem 0 10rem 0;
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
	z-index: 2;
`

const SearchBar = styled(Input)`
	width: 43rem;
	box-sizing: border-box;

	@media (max-width: 650px) {
		width: 90%;
	}
`

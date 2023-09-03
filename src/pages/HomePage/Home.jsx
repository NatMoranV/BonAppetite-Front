import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import { MenuCarousel } from '../../components/Carrousel/CarouselMenu'
import { FamiliesCarousel } from '../../components/Carrousel/Carrousel'
import { StyledInput } from '../../components/Input/StyledInput'

const StyledView = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	padding: 1rem;
	margin-top: 4rem;
	align-items: center;
	box-sizing: border-box;
`

const search = console.log('search')

export const Home = () => {
	return (
		<StyledView>
			<FamiliesCarousel />
			<StyledInput placeholder={'Buscar'} icono={faMagnifyingGlass} onClick={search} />
			<MenuCarousel />
		</StyledView>
	)
}

import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import { MenuCarousel } from '../../components/Carrousel/CarouselMenu'
import { FamiliesCarousel } from '../../components/Carrousel/Carrousel'
import { StyledInput } from '../../components/Input/StyledInput'

const Container = styled.div`
	width: 100vw;
	display: flex;
	flex-direction: column;
	padding: 1rem;
	margin-top: 4rem;
	align-items: center;
`

const search = console.log('search')

export const Home = () => {
	return (
		<Container>
			<FamiliesCarousel />
			<StyledInput placeholder={'Buscar'} icono={faMagnifyingGlass} onClick={search} />
			<MenuCarousel />
		</Container>
	)
}

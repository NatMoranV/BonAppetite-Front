/* eslint-disable react/prop-types */
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { OrderCard } from '../../components/Cards/OrderCard'
import { FiltersSlider } from '../../components/FiltersSlider/FilterSlider'
import { Input } from '../../components/Input/Input'
import { getAllOrders } from '../../redux/actions/actions'
import { useNavigate } from 'react-router-dom'

export const ManagerOrders = ({ searchTerm }) => {
	const dispatch = useDispatch()
	const [isDelayed, setIsDelayed] = useState(false)
	const [isReady, setIsReady] = useState(false)
	const filteredOrders = useSelector((state) => state.filteredOrders)
	const allOrders = useSelector((state) => state.allOrders)
	const navigate = useNavigate()
	const userRole = useSelector((state) => state.userLogged)
	useEffect(() => {
		if (userRole.role !== 'Manager' || userRole.role !== 'Admin') {
			navigate('/')
		}
	}, [navigate])
	const handleTimeOff = () => {
		setIsDelayed(true)
	}

	useEffect(() => {
		dispatch(getAllOrders())
	}, [dispatch])
	console.log('filtered', filteredOrders)
	console.log('all', allOrders)

	let ordersToRender = filteredOrders ? filteredOrders : allOrders
	console.log(ordersToRender)
	return (
		<StyledView>
			<FiltersContainer>
				<FiltersSlider />
			</FiltersContainer>

			<SearchBar
				placeholder={'Buscar por número de órden'}
				icono={faMagnifyingGlass}
				// onChange={handleSearch}
			/>

			<OrdersContainer>
				<span>Pendientes</span>
				<HorizontalContainer>
					{ordersToRender.map((order) => (
						<OrderCard
							key={order.id}
							order={order}
							time={order.time}
							onTimeOff={handleTimeOff}
							isDelayed={isDelayed}
							isReady={isReady}
						/>
					))}
				</HorizontalContainer>
			</OrdersContainer>
		</StyledView>
	)
}

const StyledView = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	gap: 1rem;
	box-sizing: border-box;
	padding: 6vh 0 10vh 0.5rem;
	transition: width 0.3s ease-in-out;
`
const OrdersContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	gap: 1rem;
	box-sizing: border-box;
	overflow-y: auto;
	transition: width 0.3s ease-in-out;
`

const FiltersContainer = styled.div`
	position: sticky;
	justify-content: center;
	padding: 2rem 0 0 0;
	top: 2rem;
	background-color: ${(props) => props.theme.primary};
	z-index: 1;
`

const SearchBar = styled(Input)`
	width: 46rem;
	box-sizing: border-box;
	margin: auto;
	@media (max-width: 650px) {
		margin: 0;
		width: 97.5%;
	}
`

const HorizontalContainer = styled.div`
	display: flex;
	gap: 1rem;
	width: 100vw;
	height: 100%;
	overflow-x: scroll;
	padding: 1rem;

	&&::-webkit-scrollbar-thumb {
		background: transparent;
	}
	&&::-webkit-scrollbar {
		width: 0.01px;
	}
`

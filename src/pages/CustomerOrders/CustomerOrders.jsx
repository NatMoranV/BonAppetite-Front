import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { OrderCard } from '../../components/Cards/OrderCard'
import { Modal } from '../../components/Modal/Modal'
import { getOrderById } from '../../redux/actions/actions'
import { Loader } from '../../components/Modal/Loader'

export const CustomerOrders = () => {
	const [loading, setLoading] = useState(false)
	const { referrer } = useParams()
	const user = useSelector((state) => state.userLogged)
	const userOrders = useSelector((state) => state.foundedOrders)
	const reversedUserOrders = userOrders.slice().reverse()
	const dispatch = useDispatch()
	const [loader, setLoader] = useState(true)

	useEffect(() => {
		const timer = setTimeout(() => {
			setLoader(false)
		}, 700)
		return () => clearTimeout(timer)
	}, [])

	useEffect(() => {
		dispatch(getOrderById(user.id))
		if (referrer === 'http://localhost:5173/customer/basket/') {
			setLoading(true)
			const timer = setTimeout(() => {
				setLoading(false)
			}, 3000)
			return () => clearTimeout(timer)
		}
	}, [referrer, dispatch, user])

	return (
		<>
			{loader ? (
				<Loader />
			) : (
				<StyledView>
					{loading && (
						<Modal
							isLoader={loading}
							title={'Abona tu pedido en caja!'}
							msg={'Cuando este listo te avisaremos.'}
						/>
					)}
					<ResumeContainer>
						{/* Render the first card outside the map */}

						{reversedUserOrders[0]?.status === 'pending' ||
						reversedUserOrders[0]?.status === 'delayed' ||
						reversedUserOrders[0]?.status === 'ongoing' ? (
							<>
								<h6>Orden pendiente</h6>
								<CurrentCard style={{ display: 'flex' }}>
									<OrderCard
										key={reversedUserOrders[0].id}
										order={reversedUserOrders[0]}
										time={reversedUserOrders[0].time}
										// onTimeOff={handleTimeOff}
									/>
								</CurrentCard>
								<h6>Tus compras previas</h6>
								<CardsGrid>
									{reversedUserOrders.slice(1).map((order) => (
										<OrderCard
											key={order.id}
											order={order}
											time={order.time}
											// onTimeOff={handleTimeOff}
										/>
									))}
								</CardsGrid>
							</>
						) : (
							<>
								<h6>Tus compras previas</h6>
								<CardsGrid>
									{reversedUserOrders.map((order) => (
										<OrderCard
											key={order.id}
											order={order}
											time={order.time}
											// onTimeOff={handleTimeOff}
										/>
									))}
								</CardsGrid>
							</>
						)}
					</ResumeContainer>

					{/* <CTAsContainer text1={"Volver"} onClick1={navigateHome} /> */}
				</StyledView>
			)}
		</>
	)
}

const StyledView = styled.div`
	position: relative;
	top: 12rem;
	display: flex;
	gap: 2rem;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	margin: auto;
	overflow-y: auto;
	padding: 3vh 4vw 10vh;
	box-sizing: border-box;
	transition: width 0.3s ease-in-out;

	/* @media (min-width: 650px) {
    width: 100%;
    padding: 15vh 0;
  } */
`

const CardsGrid = styled.div`
	width: 100%;
	margin: 1rem 0;
	display: grid;
	gap: 1rem;
	grid-auto-rows: auto;
	grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
`

const CurrentCard = styled.div`
	width: auto;

	@media (max-width: 800px) {
		width: 100%;
		& div {
			width: 100%;
		}
	}
`

const ResumeContainer = styled.div`
	width: 100%;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	align-items: center;
`

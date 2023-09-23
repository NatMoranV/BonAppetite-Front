import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { styled } from 'styled-components'
import { KitchenCard } from '../../components/Cards/KitchenCard'
import { getOrdersToKitchen } from '../../redux/actions/actions'
import { Modal } from '../../components/Modal/Modal'

export const KitchenView = () => {
	const dispatch = useDispatch()
	const orders = useSelector((state) => state.kitchenOrders)
	const [isDelayed, setIsDelayed] = useState(false)
	const [isReady, setIsReady] = useState(false)
	const handleTimeOff = () => {
		setIsDelayed(true)
	}
	useEffect(() => {
		dispatch(getOrdersToKitchen())
	}, [])
	console.log(orders)

	const ongoings = orders[0]
	const delayeds = orders[1]

	return (
		<>
			{orders.length === 0 ? (
				<Modal isLoader={true} title={'Cargando órdenes'} />
			) : (
				<StyledKitchenView>
					<StyledColumn>
						<h6>En Proceso</h6>
						<StyledCardsContainer>
							{ongoings.map((order) => {
								return <KitchenCard key={order.id} order={order} />
							})}
						</StyledCardsContainer>
					</StyledColumn>

					<StyledColumn>
						<h6>Demoradas</h6>
						<StyledCardsContainer>
							{delayeds.map((order) => {
								return (
									<KitchenCard
										key={order.id}
										order={order}
										onTimeOff={handleTimeOff}
										time={order.time}
										isReady={isReady}
									/>
								)
							})}
						</StyledCardsContainer>
					</StyledColumn>
				</StyledKitchenView>
			)}
		</>
	)
}

const StyledKitchenView = styled.div`
	display: flex;
	align-items: flex-start;
	gap: 8rem;
	flex: 1 0 0;
	align-self: stretch;
	padding: 3rem 8rem;
`

const StyledColumn = styled.div`
	display: flex;
	margin-top: 1.5rem;
	flex-direction: column;
	align-items: flex-start;
	gap: 1rem;
`

const StyledCardsContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	flex-direction: row;
	align-items: flex-start;
	gap: 1.5rem;
	align-self: stretch;
`

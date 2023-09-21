import { styled } from 'styled-components'
import { KitchenCard } from '../../components/Cards/KitchenCard'
import { OrderCard } from '../../components/Cards/OrderCard'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getOrdersToKitchen } from '../../redux/actions/actions'

export const KitchenView = () => {
	// const dispatch = useDispatch()
	// const orders = useSelector((state) => state.kitchenOrders)
	const [isDelayed, setIsDelayed] = useState(false)
	const [isReady, setIsReady] = useState(false)
	const handleTimeOff = () => {
		setIsDelayed(true)
	}
	// useEffect(() => {
	// 	dispatch(getOrdersToKitchen())
	// }, [])
	// console.log(orders)

	const ongoings = [
		{
			id: 3,
			status: 'ongoing',
			total: 10,
			payment_status: true,
			time: 15,
			take_away: false,
			notes: 'muy cocido',
			createdAt: '2023-09-19T23:44:08.552Z',
			updatedAt: '2023-09-19T23:44:51.401Z',
			UserId: null,
			OrderDetails: [
				{
					id: 5,
					price: 10,
					amount: 1,
					extras: null,
					OrderId: 3,
					ProductId: 6,
					Product: {
						id: 6,
						name: 'Vacío',
						price: 10,
						image:
							'https://media.istockphoto.com/id/452022555/es/foto/restaurante-especializado-en-carnes-y-quesos-sub.jpg?s=612x612&w=0&k=20&c=C0vYhUgN8KKOoURcvVXvbqTG0-4z9UP6HfyKyIJRd6g=',
						stock: 29,
						qualification: 3,
						time: 15,
						enable: true,
						description: 'Sandwich de vacío existencial.',
						deleted: false,
					},
				},
			],
		},
		{
			id: 5,
			status: 'ongoing',
			total: 115,
			payment_status: true,
			time: 10,
			take_away: true,
			notes: 'sin hielo',
			createdAt: '2023-09-19T23:49:09.751Z',
			updatedAt: '2023-09-19T23:49:20.124Z',
			UserId: null,
			OrderDetails: [
				{
					id: 8,
					price: 23,
					amount: 5,
					extras: null,
					OrderId: 5,
					ProductId: 12,
					Product: {
						id: 12,
						name: 'Agua',
						price: 23,
						image:
							'https://media.istockphoto.com/id/1356056182/es/foto/el-hombre-se-derrama-agua.jpg?s=612x612&w=0&k=20&c=iXpvoDXkli-d7F82BDRtAKcbtms8NKFyS_TfX-03P5U=',
						stock: 50,
						qualification: 3,
						time: 10,
						enable: true,
						description: 'Botella de agua 1500cc.',
						deleted: false,
					},
				},
				{
					id: 5,
					price: 10,
					amount: 1,
					extras: null,
					OrderId: 3,
					ProductId: 6,
					Product: {
						id: 6,
						name: 'Vacío',
						price: 10,
						image:
							'https://media.istockphoto.com/id/452022555/es/foto/restaurante-especializado-en-carnes-y-quesos-sub.jpg?s=612x612&w=0&k=20&c=C0vYhUgN8KKOoURcvVXvbqTG0-4z9UP6HfyKyIJRd6g=',
						stock: 29,
						qualification: 3,
						time: 15,
						enable: true,
						description: 'Sandwich de vacío existencial.',
						deleted: false,
					},
				},
			],
		},
	]
	const delayeds = [
		{
			id: 3,
			status: 'delayed',
			total: 10,
			payment_status: true,
			time: 15,
			take_away: true,
			notes: 'muy cocido',
			createdAt: '2023-09-19T23:44:08.552Z',
			updatedAt: '2023-09-19T23:44:51.401Z',
			UserId: null,
			OrderDetails: [
				{
					id: 5,
					price: 10,
					amount: 1,
					extras: null,
					OrderId: 3,
					ProductId: 6,
					Product: {
						id: 6,
						name: 'Vacío',
						price: 10,
						image:
							'https://media.istockphoto.com/id/452022555/es/foto/restaurante-especializado-en-carnes-y-quesos-sub.jpg?s=612x612&w=0&k=20&c=C0vYhUgN8KKOoURcvVXvbqTG0-4z9UP6HfyKyIJRd6g=',
						stock: 29,
						qualification: 3,
						time: 15,
						enable: true,
						description: 'Sandwich de vacío existencial.',
						deleted: false,
					},
				},
			],
		},
		{
			id: 5,
			status: 'delayed',
			total: 115,
			payment_status: true,
			time: 10,
			take_away: true,
			notes: 'sin hielo',
			createdAt: '2023-09-19T23:49:09.751Z',
			updatedAt: '2023-09-19T23:49:20.124Z',
			UserId: null,
			OrderDetails: [
				{
					id: 8,
					price: 23,
					amount: 5,
					extras: null,
					OrderId: 5,
					ProductId: 12,
					Product: {
						id: 12,
						name: 'Agua',
						price: 23,
						image:
							'https://media.istockphoto.com/id/1356056182/es/foto/el-hombre-se-derrama-agua.jpg?s=612x612&w=0&k=20&c=iXpvoDXkli-d7F82BDRtAKcbtms8NKFyS_TfX-03P5U=',
						stock: 50,
						qualification: 3,
						time: 10,
						enable: true,
						description: 'Botella de agua 1500cc.',
						deleted: false,
					},
				},
				{
					id: 5,
					price: 10,
					amount: 1,
					extras: null,
					OrderId: 3,
					ProductId: 6,
					Product: {
						id: 6,
						name: 'Vacío',
						price: 10,
						image:
							'https://media.istockphoto.com/id/452022555/es/foto/restaurante-especializado-en-carnes-y-quesos-sub.jpg?s=612x612&w=0&k=20&c=C0vYhUgN8KKOoURcvVXvbqTG0-4z9UP6HfyKyIJRd6g=',
						stock: 29,
						qualification: 3,
						time: 15,
						enable: true,
						description: 'Sandwich de vacío existencial.',
						deleted: false,
					},
				},
			],
		},
	]

	return (
		<StyledKitchenView>
			<StyledColumn>
				<h6>En Proceso</h6>
				<StyledCardsContainer>
					{ongoings.map((order) => {
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
	flex-direction: column;
	align-items: flex-start;
	gap: 1.5rem;
	align-self: stretch;
`

/* eslint-disable react/prop-types */
import styled from 'styled-components'
import { Card } from './Card'
import { Divider } from '../Divider/Divider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faMagnifyingGlassDollar,
	faCircleCheck,
	faCircleExclamation,
	faCircleUser,
	faCircleXmark,
	faClock,
} from '@fortawesome/free-solid-svg-icons'
import { Dropdown } from '../Dropdown/StyledDropdown'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const status = ['ongoing', 'delayed']

const statusIcons = {
	ongoing: faClock,
	delayed: faCircleExclamation,
}

export const KitchenCard = ({ order, onTimeOff, time, isReady }) => {
	const [timeInSeconds, setTimeInSeconds] = useState(time)
	const [currentStatus, setCurrentStatus] = useState(order.status)
	const [isDelayed, setIsDelayed] = useState(false)
	const [timerRunning, setTimerRunning] = useState(false)
	const location = useLocation().pathname
	const isOngoing = currentStatus === 'ongoing'

	useEffect(() => {
		if (isDelayed) {
			setCurrentStatus('delayed')
		}
	}, [isDelayed])

	useEffect(() => {
		currentStatus === 'ongoing' || currentStatus === 'delayed'
			? setTimerRunning(true)
			: setTimerRunning(false)
	}, [])

	useEffect(() => {
		let intervalId
		if (timerRunning && !isReady) {
			intervalId = setInterval(() => {
				// Add this log
				if (!isDelayed) {
					if (timeInSeconds > 0) {
						setTimeInSeconds(timeInSeconds - 1)
					} else {
						setIsDelayed(true)
						handleTimeOff()
					}
				} else {
					setTimeInSeconds(timeInSeconds + 1)
				}
			}, 1000)
		}
		return () => clearInterval(intervalId)
	}, [timeInSeconds, isDelayed, timerRunning, onTimeOff, isReady])

	useEffect(() => {
		if (isReady) {
			setTimerRunning(false)
		}
	}, [isReady])

	const formatTime = (seconds) => {
		const minutes = Math.floor(seconds / 60)
		const remainingSeconds = seconds % 60
		return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
	}

	const handleTimeOff = () => {
		setIsDelayed(true)
	}

	const handleChange = (e) => {
		const newStatus = e.target.value
		setCurrentStatus(newStatus)
	}

	return (
		<StyledCard>
			<Header>
				<TheIcon
					icon={statusIcons[currentStatus]}
					className={isDelayed ? 'delayed' : currentStatus}
					$isDelayed={isDelayed}
				/>
				{isOngoing || isDelayed ? (
					<>
						<StyledTimer $isDelayed={isDelayed}>
							{isDelayed ? `+` : '-'}
							{formatTime(timeInSeconds)}
						</StyledTimer>
					</>
				) : null}
			</Header>
			<Order>Orden {order.id}</Order>
			<Divider />
			{order.OrderDetails.map((card) => (
				<Card key={card.id} name={card.Product.name} amount={card.Product.amount} />
			))}
			<Divider />

			{order.take_away && (
				<>
					<TakeHome>Para llevar a casa</TakeHome>
					<Divider />
				</>
			)}
			{order.notes && (
				<>
					<span>{order.notes}</span>
					<Divider />
				</>
			)}
		</StyledCard>
	)
}

const StyledCard = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	height: fit-content;
	min-width: 18rem;
	padding: 2rem 1rem;
	border-radius: 1rem;
	background: ${(props) => props.theme.primary};
	box-shadow: ${(props) => props.theme.shortShadow};
	transition: all 0.2s ease-in-out;
`

const Header = styled.div`
	display: flex;
	justify-content: space-between;
`

const TheIcon = styled(FontAwesomeIcon)`
	font-size: 1.5rem;

	&&.delayed {
		path {
			fill: ${(props) => props.theme.warning};
		}
	}
	&&.ready {
		path {
			fill: ${(props) => props.theme.success};
		}
	}
	&&.delivered {
		path {
			fill: ${(props) => props.theme.info};
		}
	}
	&&.cancelled {
		path {
			fill: ${(props) => props.theme.error};
		}
	}
`

const StyledTimer = styled.span`
	display: flex;
	width: fit-content;
	padding: 0 0 0 1rem;
	font-size: 2rem;
	font-weight: 600;

	${(props) =>
		props.$isDelayed &&
		`

color:  ${props.theme.warning};

`}
`

const Order = styled.span`
	text-align: center;
	font-size: 1.5rem;
	font-weight: 600;
`

const TakeHome = styled.span`
	font-size: 1.3rem;
	font-weight: 600;
`

import styled from 'styled-components'
import { useEffect, useState } from 'react'

export const Timer = ({ time, onTimeOff, isReady }) => {
	const [timeInSeconds, setTimeInSeconds] = useState(time)
	const [isDelayed, setIsDelayed] = useState(false)
	const [timerRunning, setTimerRunning] = useState(true)

	useEffect(() => {
		let intervalId

		if (timerRunning && !isReady) {
			intervalId = setInterval(() => {
				if (!isDelayed) {
					if (timeInSeconds > 0) {
						setTimeInSeconds(timeInSeconds - 1)
					} else {
						setIsDelayed(true)
						onTimeOff()
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

	return (
		<StyledTimer $isDelayed={isDelayed}>
			{isDelayed ? `+` : '-'}
			{formatTime(timeInSeconds)}
		</StyledTimer>
	)
}

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

import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons'
import { faClose, faStar as solidStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { filterByRating, getMenu } from '../../redux/actions/actions'
import { CircleButton } from '../CircleButton/CircleButton'

export const RatingSelector = ({ reset }) => {
	const dispatch = useDispatch()
	const initialStars = Array(5).fill(false)
	const [activeStars, setActiveStars] = useState(initialStars)

	const handleStarClick = (stars) => {
		dispatch(filterByRating(stars))
	}

	const handleStarToggle = (index) => {
		const newActiveStars = activeStars.map((_, i) => i <= index)
		setActiveStars(newActiveStars)
		const newRating = newActiveStars.filter((star) => star).length
		handleStarClick(newRating)
	}

	const resetStars = () => {
		reset()
		setActiveStars(initialStars)
		dispatch(getMenu())
	}

	return (
		<RatingSelectorContainer>
			{Array.from({ length: 5 }, (_, index) => (
				<StarIcon
					key={index}
					icon={activeStars[index] ? solidStar : regularStar}
					onClick={() => {
						handleStarToggle(index)
						reset()
					}}
				/>
			))}
			<CircleButton icon={faClose} onClick={resetStars} />
		</RatingSelectorContainer>
	)
}

const RatingSelectorContainer = styled.div`
	width: 100%;
	display: flex;
	gap: 1rem;
	justify-content: center;
	padding: 0.5rem 0;
	font-size: 2rem;

	@media (min-width: 800px) {
		width: fit-content;
	}
`

const StarIcon = styled(FontAwesomeIcon)`
	cursor: pointer;
	transition: all 0.3s ease-in-out;

	&:hover {
		transform: scale(1.2);
	}
`

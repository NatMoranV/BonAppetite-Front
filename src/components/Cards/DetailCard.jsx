/* eslint-disable react/prop-types */
import styled from 'styled-components'
import { Divider } from '../Divider/Divider'
import { useLocation } from 'react-router-dom'
import { RatingSelector } from '../Rating/Rating'
import { useRef, useState } from 'react'
import { Input } from '../Input/Input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight, faStar } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux' // Import connect
import { CircleButton } from '../CircleButton/CircleButton'

export const DetailCard = ({
	image,
	name,
	description,
	prepTime,
	price,
	qualification,
	inputPlaceholder,
	inputName,
	onUpdateComment,
	data,
	comments,
}) => {
	const location = useLocation().pathname
	const isReview = location === '/isReview/'

	const [inputValue, setInputValue] = useState('')
	const [newQualification, setNewQualification] = useState(0)

	const handleInputChange = (newValue) => {
		setInputValue(newValue)
		onUpdateComment(inputName, newValue)
		// console.log('New comment value:', newValue)
		updateSharedData()
	}

	const handleRatingChange = (newRating) => {
		setNewQualification(newRating)
		updateSharedData()
	}

	const sliderRef = useRef(null)

	const scrollRight = () => {
		if (sliderRef.current) {
			const scrollPercentage = 83.75 
			const currentPosition = sliderRef.current.scrollLeft
			const viewportWidth = sliderRef.current.clientWidth
			const newPosition = currentPosition + (viewportWidth * scrollPercentage) / 100

			sliderRef.current.scrollTo({
				left: newPosition,
				behavior: 'smooth',
			})
		}
	}
	const scrollLeft = () => {
		if (sliderRef.current) {
			const scrollPercentage = 83.75 
			const currentPosition = sliderRef.current.scrollRight
			const viewportWidth = sliderRef.current.clientWidth
			const newPosition = currentPosition + (viewportWidth * scrollPercentage) / 100

			sliderRef.current.scrollTo({
				left: newPosition,
				behavior: 'smooth',
			})
		}
	}

	return (
		<StyledDetailCard $isReview={isReview}>
			<StyledImg src={image} />
			<NameContainer $isReview={isReview}>
				<StyledName>{name}</StyledName>
				{!isReview && (
					<RatingContainer>
						<StyledRating>{qualification}</StyledRating>
						<StarIcon icon={faStar} />
					</RatingContainer>
				)}
			</NameContainer>
			{!isReview && <StyledDesc>{description}</StyledDesc>}
			{/* {!isReview && <StyledTime>Listas en {prepTime} minutos</StyledTime>} */}
			{isReview && <RatingSelector onRatingChange={handleRatingChange} />}
			{isReview && (
				<Input name={inputName} placeholder={inputPlaceholder} onValueChange={handleInputChange} />
			)}
			{!isReview && (
				<>
					<StyledPrice>${price}</StyledPrice>

					{comments?.length > 0 &&  (
						<TextContainer>
							<span>Opiniones de nuestros clientes:</span>
							<ButtonsContainer>
								<CircleButton icon={faChevronLeft} onClick={scrollLeft} />
								<CircleButton icon={faChevronRight} onClick={scrollRight} />
							</ButtonsContainer>
						</TextContainer>
					)}

					<OpinionsSlider ref={sliderRef}>
						{comments?.slice(0,5).map((comment, index) => (
							<OpinionContainer key={index}>
								<Opinion>{comment}</Opinion>
							</OpinionContainer>
						))}
					</OpinionsSlider>
				</>
			)}
		</StyledDetailCard>
	)
}

const StyledDetailCard = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	box-sizing: border-box;
	padding: 1rem;
	border-radius: 1rem;
	background: ${(props) => props.theme.primary};
	box-shadow: ${(props) => props.theme.shortShadow};
	position: relative;
	transition: all 0.2s ease-in-out;
	gap: 1.5rem;

	@media (max-width: 800px) {
		padding: 0;
		background: none;
		box-shadow: none;
	}

	${(props) =>
		props.$isReview &&
		`
&:hover {
  transform: scale(1.02);
}
`}
`

const StyledImg = styled.img`
	height: 10rem;
	width: 100%;
	border-radius: 0.5rem;
	object-fit: cover;
	box-sizing: border-box;

	@media (min-width: 800px) {
		height: 15rem;
	}
`

const NameContainer = styled.div`
	display: flex;
	justify-content: space-between;

	${(props) =>
		props.$isReview &&
		`
  justify-content: center;
  `}
`

const RatingContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 0.5rem;
`

const StyledName = styled.p`
	font-size: 1.5rem;
	font-weight: 600;
`

const StyledRating = styled.p`
	font-size: 1.5rem;
	font-weight: 600;
`

const StarIcon = styled(FontAwesomeIcon)`
	font-size: 1.1rem;
`

const StyledDesc = styled.p`
	line-height: 1.5rem;
	font-size: 1rem;
`

const StyledTime = styled.p`
	line-height: 1.2rem;
	font-size: 1rem;
`

const StyledPrice = styled.p`
	font-size: 2rem;
	font-weight: 700;
`

const OpinionsSlider = styled.div`
	width: 100%;
	box-sizing: border-box;
	display: flex;
	overflow-x: auto;
	gap: 1rem;
	scroll-behavior: smooth;

	&&::-webkit-scrollbar-thumb {
		background: transparent;
	}
	&&::-webkit-scrollbar {
		width: 0.01px;
	}
`

const OpinionContainer = styled.div`
	box-sizing: border-box;
	width: 80%;
	display: flex;
	flex: 0 0 auto;
	border: 1px solid ${(props) => props.theme.text};
	border-radius: 0.5rem;
	padding: 10px;
	height: auto;
`

const Opinion = styled.span`
	display: block;
	width: 100%;
`

const TextContainer = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
`

const ButtonsContainer = styled.div`
	display: flex;
	gap: 1rem;
	@media (max-width: 800px) {
		display: none;
	}
`

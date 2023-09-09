import { faEdit, faPlus, faStar } from '@fortawesome/free-solid-svg-icons'
import { NavLink, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { CircleButton } from '../CircleButton/CircleButton'
import { ToggleButton } from '../ToggleButton/ToggleButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

export const Card = ({ id, img, name, shortDesc, price, time, rating }) => {
	const [isChecked, setIsChecked] = useState(true)

	const location = useLocation()
	const isCustomerView = location.pathname === '/customer' || location.pathname === '/customer/'
	const isManagerView = location.pathname === '/manager' || location.pathname === '/manager/'
	const isCustomerBasket = location.pathname === '/customer/basket'
	const isManagerBasket = location.pathname === '/manager/basket'

	const printId = (event) => {
		event.preventDefault()
		console.log(`${name} tiene el id: ${id}.`)
	}

	const clickHandle = () => {
		setIsChecked(!isChecked)
	}

	const linkStyles = {
		textDecoration: 'none',
		color: 'inherit',
		position: 'absolute',
		top: 0,
		left: 0,
		width: '85%',
		height: '100%',
		zIndex: 1,
	}

	return (
		<StyledCard $isCustomerBasket={isCustomerBasket}>
			{!isCustomerBasket || !isManagerBasket ? <NavLink to={`detail/${id}`} style={linkStyles} /> : null}
			<StyledImg src={img} alt="image" />
			<InfoContainer>
				<StyledName>{name}</StyledName>
				<StyledDesc>{shortDesc}</StyledDesc>
				<StyledTime>{time} min</StyledTime>
				<StyledPrice $isCustomerBasket={isCustomerBasket}>${price}</StyledPrice>
			</InfoContainer>

			{!isCustomerBasket || !isManagerBasket ? (
				<ActionsContainer $isCustomerView={isCustomerView} $isManagerView={isManagerView}>
					{isCustomerView && (
						<>
							<RatingContainer>
								<FontAwesomeIcon icon={faStar} />
								<StyledRating>{rating}</StyledRating>
							</RatingContainer>
							<CircleButton onClick={printId} icon={faPlus} />
						</>
					)}
					{isManagerView && (
						<>
							<NavLink to={`edit/${id}`}>
								<CircleButton icon={faEdit} />
							</NavLink>
							<ToggleButton isChecked={isChecked} onChange={clickHandle} />
						</>
					)}
				</ActionsContainer>
			) : null}
		</StyledCard>
	)
}

const StyledCard = styled.div`
	display: flex;
	width: 100%;
	box-sizing: border-box;
	padding: 1rem;
	border-radius: 1rem;
	background: ${(props) => props.theme.primary};
	box-shadow: ${(props) => props.theme.shortShadow};
	position: relative;
	transition: all 0.2s ease-in-out;

	&:hover {
		transform: scale(1.02);
	}

	&:active {
		box-shadow: ${(props) => props.theme.pressedShadow};
	}

	${(props) =>
		props.$isCustomerBasket &&
		`
    box-shadow: none;
    padding: 0;
    
    &:hover {
      transform: none;
    }
  `}
`

const StyledImg = styled.img`
	width: 5rem;
	height: 100%;
	flex-shrink: 0;
	align-self: stretch;
	object-fit: cover;
	border-radius: 0.5rem;
	margin-right: 1rem;
`

const InfoContainer = styled.div`
	width: 100%;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`

const StyledName = styled.p`
	font-size: 1.5rem;
	font-weight: 600;
	padding-bottom: 0.5rem;
`

const StyledDesc = styled.p`
	line-height: 1rem;
	font-size: 1rem;
	padding-bottom: 0.5rem;
`

const StyledTime = styled.p`
	line-height: 1rem;
	font-size: 1rem;
`

const StyledPrice = styled.h6`
	margin-top: 0.5rem;

	${(props) =>
		props.$isCustomerBasket &&
		`
text-align: end;
  `}
`

const ActionsContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: end;
	justify-content: space-between;
	padding: 0;
	width: 10%;
	height: 100%;
`

const RatingContainer = styled.div`
	display: flex;
	flex-direction: column;
`

const StyledRating = styled.span``

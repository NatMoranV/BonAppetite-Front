/* eslint-disable react/prop-types */
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'
import { CircleButton } from '../CircleButton/CircleButton'
import { InfoDiv, PriceDiv, StyledCard, Container } from './styledCard'

export const Card = (props) => {
	const { id, img, name, shortDesc, price, time } = props

	const printId = (event) => {
		event.stopPropagation()
		console.log(`${name} tiene el id: ${id}.`)
	}

	const linkStyles = {
		textDecoration: 'none',
		color: 'inherit',
		width: '100%',
	}
	return (
		<Container>
			<NavLink to={`detail/${id}`} style={linkStyles}>
				<StyledCard>
					<img src={img} alt="image" />
					<InfoDiv>
						<h6>{name}</h6>
						<p>{shortDesc}</p>

						<>{time} min</>
						<PriceDiv>
							<h6>${price}</h6>
						</PriceDiv>
					</InfoDiv>
				</StyledCard>
			</NavLink>
			<CircleButton onClick={printId} icon={faPlus} />
		</Container>
	)
}

/* eslint-disable react/prop-types */
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ToggleButton } from '../ToggleButton/ToggleButton'
import { InfoDiv, PriceDiv, StyledCard, Container } from './styledCard'

export const CardToggle = (props) => {
	const { id, img, name, shortDesc, price, time } = props
	const [checked, setChecked] = useState(true)

	const clickHandle = () => {
		setChecked(!checked)
		// console.log('click on ' + name)
		// event.preventDefault()
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
			<ToggleButton checked={checked} onChange={clickHandle} />
		</Container>
	)
}

/* eslint-disable react/prop-types */
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ToggleButton } from '../ToggleButton/ToggleButton'
import { InfoDiv, PriceDiv, StyledCard } from './styledCard'

export const CardToggle = (props) => {
	const [checked, setChecked] = useState(true)

	const clickHandle = () => {
		setChecked(!checked)
	}

	const { id, img, name, shortDesc, price, time } = props
	const linkStyles = {
		textDecoration: 'none',
		color: 'inherit',
		width: '100%',
	}
	return (
		<NavLink to={`detail/${id}`} style={linkStyles}>
			<StyledCard>
				<img src={img} alt="image" />
				<InfoDiv>
					<h6>{name}</h6>
					<p>{shortDesc}</p>

					<>{time} min</>
					<PriceDiv>
						<h6>${price}</h6>
						<ToggleButton checked={checked} onClick={clickHandle} />
					</PriceDiv>
				</InfoDiv>
			</StyledCard>
		</NavLink>
	)
}

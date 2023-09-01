import React from 'react'
import { NavLink } from 'react-router-dom'
import { StyledCard } from './styledCard'

export const Card = (props) => {
	const { id, img, name, shortDesc, price } = props
	return (
		<StyledCard>
			<NavLink to={`/detail/${id}`}>
				<img src={img} alt="image" />
				<h6>{name}</h6>
				<p>{shortDesc}</p>
			</NavLink>
		</StyledCard>
	)
}

import React from "react";
import { NavLink } from "react-router-dom";
import { StyledCard, InfoDiv, PriceDiv } from "./styledCard";
import { CircleButton } from "../CircleButton/CircleButton";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export const Card = (props) => {

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
						<CircleButton className={'small'} icon={faPlus} />
					</PriceDiv>
				</InfoDiv>
			</StyledCard>
		</NavLink>
	)
}


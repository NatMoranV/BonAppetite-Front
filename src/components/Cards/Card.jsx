import { faPlus } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { NavLink } from "react-router-dom";
import { CircleButton } from "../CircleButton/CircleButton";
import { InfoDiv, PriceDiv, StyledCard } from "./styledCard";

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


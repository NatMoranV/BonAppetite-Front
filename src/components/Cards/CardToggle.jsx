/* eslint-disable react/prop-types */
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ToggleButton } from "../ToggleButton/ToggleButton";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { InfoDiv, PriceDiv, StyledCard, Container } from "./styledCard";
import { CircleButton } from "../CircleButton/CircleButton";

export const CardToggle = (props) => {
	const navigate = useNavigate();
	const { id, img, name, shortDesc, price, time } = props;
	const [checked, setChecked] = useState(true);

	const navigateEdit = () => {
		navigate("manager/edit");
	};

	const clickHandle = () => {
		setChecked(!checked);
		// console.log('click on ' + name)
		// event.preventDefault()
	};

	const linkStyles = {
		textDecoration: "none",
		color: "inherit",
		width: "100%",
	};
	return (
		<Container>
			<NavLink to={`detail/${id}`} style={linkStyles}>
				<StyledCard>
					<img src={img} alt="image" />
					<InfoDiv>
						<CircleButton onClick={navigateEdit} icon={faPenToSquare} />
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
	);
};

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { CircleButton } from "../CircleButton/CircleButton";

export const Card = (props) => {
	const { id, img, name, shortDesc, price, time } = props;

	const printId = (event) => {
		event.preventDefault();
		console.log(`${name} tiene el id: ${id}.`);
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
					<InfoContainer>
						<h6>{name}</h6>
						<p>{shortDesc}</p>

						<>{time} min</>
						<PriceContainer>
							<h6>${price}</h6>
						</PriceContainer>
					</InfoContainer>
				</StyledCard>
			</NavLink>
			<CircleButton onClick={printId} icon={faPlus} />
		</Container>
	);
};

const StyledCard = styled.div`
	display: flex;
	width: 90%;
	height: 8.5rem;
	padding: 0.5rem;
	margin: 0.5rem;
	gap: 0.5rem;
	border-radius: 1rem;
	background: ${(props) => props.theme.primary};
	box-shadow: ${(props) => props.theme.shortShadow};
	z-index: 1;

	a {
		text-decoration: none;
	}

	img {
		width: 7.8rem;
		height: 8.5rem;
		flex-shrink: 0;
		align-self: stretch;
		object-fit: cover;
		border-radius: 0.5rem;
	}

	&:hover {
		transform: scale(1.02);
		transition: all 0.2s ease-in-out;
	}
`;

const PriceContainer = styled.div`
	width: 100%;
	height: 2rem;
	display: flex;
	flex-direction: row;
	justify-content: space-between;

	button {
		position: relative;

		right: -0.5rem;
	}
`;
const InfoContainer = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
	padding: 0.5rem;
	h6 {
		font-size: 1.3rem;
		text-align: left;
		margin: 0;
	}

	p {
		line-height: 1rem;
		font-size: 1rem;
		text-align: left;
		margin: 0;
	}
`;
export const Container = styled.div`
	width: 100%;
	height: 9.5rem;
	margin-bottom: 0.5rem;
	position: relative;
	button {
		position: absolute;
		bottom: 0.5rem;
		right: 2rem;
	}

	span {
		position: absolute;
		bottom: 0.5rem;
		right: 2rem;
	}
`;

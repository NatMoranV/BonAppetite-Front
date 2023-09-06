import { styled } from "styled-components";
import { menu } from "../../assets/mockedMenu";

export const DetailCard = ({ image, name, shortDesc, price }) => {
	return (
		<CardContainer>
			<img src={image} alt="image" />
			<StyledInfo>
				<h6>{name}</h6>
				<p>{shortDesc}</p>
			</StyledInfo>
			<StyledPrice>
				<h6>${price}</h6>
			</StyledPrice>
		</CardContainer>
	);
};

const CardContainer = styled.div`
	display: flex;
	flex-direction: row;
	max-width: 22rem;

	padding: 0rem 0rem 1rem 0.6rem;
	gap: 0.5rem;
	border-radius: 1rem;
	background: ${(props) => props.theme.primary};
	box-shadow: ${(props) => props.theme.shortShadow};

	img {
		margin-top: 1.2rem;
		width: 5rem;
		height: 4.5rem;
		flex-shrink: 0;
		align-self: stretch;
		border-radius: 0.5rem;
	}
`;

const StyledInfo = styled.div`
	inline-size: 12rem;
	overflow-wrap: break-word;
`;

const StyledPrice = styled.div`
	margin-top: 1.2rem;
`;

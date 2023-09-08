import styled from "styled-components";

export const PriceDiv = styled.div`
	width: 100%;
	height: 2rem;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;
export const InfoDiv = styled.div`
	width: 100%;
	height: 100%;
	position: relative;
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
export const StyledCard = styled.div`
	display: flex;
	width: 90%;
	height: 8.5rem;
	padding: 0.5rem;
	z-index: 1;
	gap: 0.5rem;
	border-radius: 1rem;
	background: ${(props) => props.theme.primary};
	box-shadow: ${(props) => props.theme.shortShadow};

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
export const Container = styled.div`
	width: 100%;
	max-width: 29rem;
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
		right: 2.5rem;
	}
	button {
		position: absolute;
		top: 0rem;
		right: 0.5rem;
	}
`;

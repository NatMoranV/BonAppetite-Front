import React from "react";

import { styled } from "styled-components";

export const DetailCard = (props) => {
	const { id, image, name, shortDesc, price } = props;

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
	min-width: 20rem;
	heigth: auto;
	padding: 0rem 0rem 1rem 0.6rem;
	gap: 0.5rem;
	border-radius: 1rem;
	background: #ecf0f1;
	box-shadow: 4px 4px 8px 0px rgba(189, 195, 199, 0.75),
		8px 8px 12px 0px rgba(189, 195, 199, 0.25),
		-4px -4px 8px 0px rgba(255, 255, 255, 0.75),
		-8px -8px 12px 0px rgba(255, 255, 255, 0.25);

	img {
		margin-top: 1.2rem;
		width: 5rem;
		height: 4.5rem;
		aling-self: end;
		flex-shrink: 0;
		align-self: stretch;
		border-radius: 0.5rem;
	}
`;

const StyledInfo = styled.div`
	aling-content: start;
	inline-size: 12rem;
	overflow-wrap: break-word;
`;

const StyledPrice = styled.div`
	margin-top: 1.2rem;
`;

import React from "react";
import { Card } from "./Card";

import { styled } from "styled-components";

const array = [
	{
		id,
		image,
		name,
		shortDesc,
	},
];

export const DetailCard = () => {
	return (
		<StyledDetailCard>
			{array.map((item) => (
				<Card
					key={item.id}
					id={item.id}
					img={item.image}
					name={item.name}
					shortDesc={item.shortDesc}
				/>
			))}
		</StyledDetailCard>
	);
};

export const StyledDetailCard = styled.div`
	background: ${(props) => props.theme.primary};
	box-shadow: ${(props) => props.theme.shortShadow};
	display: flex;
	width: 21.4375rem;
	padding: 0.5rem 1rem 0.5rem 0.5rem;
	align-items: center;
	gap: 0.5rem;
`;

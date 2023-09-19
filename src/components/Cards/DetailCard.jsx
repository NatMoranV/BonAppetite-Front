import styled from "styled-components";
import { Divider } from "../Divider/Divider";
import { useLocation } from "react-router-dom";
import { RatingSelector } from "../Rating/Rating";



export const DetailCard = ({img, name, desc, prepTime, price}) => {
    const location = useLocation().pathname;
    const isReview = location === "/review"

    return (

        <StyledDetailCard>
            <StyledImg src={img} />
			<StyledName>{name}</StyledName>
			<StyledDesc>{desc}</StyledDesc>
			{!isReview && <StyledTime>Preparación: {prepTime} minutos</StyledTime>}
            {isReview && <RatingSelector/>}
            <Divider/>
			{!isReview && <StyledPrice>${price}</StyledPrice>}
        </StyledDetailCard>

    )

}

const StyledDetailCard = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	margin: 0 auto;
	overflow-y: auto;
	box-sizing: border-box;
	transition: width 0.3s ease-in-out;
	gap: 1rem;

`

const StyledImg = styled.img`
	height: 15rem;
	width: 100%;
	border-radius: 0.5rem;
	object-fit: cover;
	box-sizing: border-box;
`;

const StyledName = styled.p`
	font-size: 1.5rem;
	font-weight: 600;
    margin: 1rem 0;
`;

const StyledDesc = styled.p`
	line-height: 1.2rem;
	font-size: 1.2rem;
    margin: .5rem 0;
`;

const StyledTime = styled.p`
	line-height: 1.2rem;
	font-size: 1.2rem;
    margin: .5rem 0;
`;

const StyledPrice = styled.p`
	font-size: 2rem;
	font-weight: 700;
    margin: 1rem 0;

`;

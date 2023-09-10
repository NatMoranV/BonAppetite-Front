/* eslint-disable react/prop-types */
import { styled } from 'styled-components'
import { CallToAction } from './CallToAction'

export const CTAsContainer = ({ text1, onClick1, buttonClass1, text2, onClick2 }) => {
	return (
		<StyledCTAsContainer>
			<CallToAction text={text1} onClick={onClick1} buttonClass={buttonClass1} />

			{text2 && <CallToAction text={text2} onClick={onClick2} buttonClass={'secondary'} />}
		</StyledCTAsContainer>
	)
}

const StyledCTAsContainer = styled.div`
	display: flex;
	width: 100%;
	box-sizing: border-box;
	flex-direction: row-reverse;
	align-items: center;
	gap: 2vh;
	transition: all 0.3s ease-in-out;

	@media (max-width: 650px) {
		position: fixed;
		bottom: 0;
		left: 0;
		gap: 1vh;
		padding: 2vh 4vw 3vh 4vw;
		border-radius: 1rem 1rem 0rem 0rem;
		background: ${(props) => props.theme.primary};
		box-shadow: ${(props) => props.theme.shortShadow};
		flex-direction: column;
		width: 100%;
	}
`

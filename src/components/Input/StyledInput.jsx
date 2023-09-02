import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const InputContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 1rem;
	position: relative;
	width: 100%;
	box-sizing: border-box;
	min-width: 10rem;
`

const Label = styled.label`
	font-size: 1rem;
	font-style: normal;
	font-weight: 600;
	line-height: normal;
`

const InputField = styled.input`
	width: 100%;
	height: 3rem;
	padding: 0rem 1rem;
	border-radius: 0.5rem;
	background-color: ${(props) => props.theme.primary};
	box-shadow: ${(props) => props.theme.pressedShadow};
	border: none;
	box-sizing: border-box;
	min-width: 10rem;
	&::placeholder {
		font-family: Montserrat;
		font-size: 1rem;
		font-weight: 600;
		line-height: 2%.5;
		letter-spacing: 0em;
		text-align: left;
	}
`

const Helper = styled.span`
	font-size: 0.9rem;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
	text-align: left;
`

const Button = styled.button`
	position: absolute;
	background: transparent;
	border: none;
	top: 4.5rem;
	right: -1.5rem;
	cursor: pointer;
	font-size: 1.1rem;
`

export const StyledInput = ({
	className,
	name,
	id,
	label,
	placeholder,
	type,
	icono,
	helper,
	onClick,
	onChange,
	onBlur,
	value,
	onKeyDown,
}) => {
	return (
		<InputContainer className={className}>
			<Label>{label}</Label>
			<InputField
				type={type}
				id={id}
				name={name}
				placeholder={placeholder}
				onChange={onChange}
				value={value}
				onKeyDown={onKeyDown}
				onBlur={onBlur}
			/>
			{onClick && (
				<Button onClick={onClick}>
					<FontAwesomeIcon icon={icono} />
				</Button>
			)}
			<Helper>{helper}</Helper>
		</InputContainer>
	)
}

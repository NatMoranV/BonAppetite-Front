import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'


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
					{/* <FontAwesomeIcon icon={faMagnifyingGlass} /> */}
				</Button>
			)}
			<Helper>{helper}</Helper>
		</InputContainer>
	)
}

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
		font-size: 1.3rem;
		font-style: normal;
		font-weight: 600;
		line-height: normal;
	`
	
	const InputField = styled.input`
		width: 100%;
		height: 3.5rem;
		padding: 0rem 1rem;
		border-radius: 0.5rem;
		background-color: ${(props) => props.theme.primary};
		box-shadow: ${(props) => props.theme.pressedShadow};
		border: none;
		box-sizing: border-box;
		min-width: 10rem;
		&::placeholder {
			font-size: 1rem;
			font-weight: 600;
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
		top: 1.5rem;
		right: 1rem;
		cursor: pointer;
		font-size: 1.1rem;
	`
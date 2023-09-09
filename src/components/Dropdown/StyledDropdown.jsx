import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router";

export const Dropdown = ({
  onBlur,
  name,
  option1,
  label,
  array,
  id,
  selectedValue,
  onChange,
  helper,
  visibleOption,
}) => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");
  const isDisabled = !array || !array.length;

  return (
    <DropdownContainer>
      <Label htmlFor={id}>{label}</Label>
      <StyledDropdown
        $isDashboard={isDashboard}
        className={isDisabled ? "disabled" : ""}
        name={name}
        id={id}
        value={selectedValue}
        onChange={onChange}
        onBlur={onBlur}
      >
        {option1 && <option value={option1}>{option1}</option>}
        {array.map((item, index) => (
          <option key={index} value={item}>
            {visibleOption && visibleOption[index]
              ? visibleOption[index]
              : item}
          </option>
        ))}
      </StyledDropdown>
      <DropdownIcon $isDashboard={isDashboard}>
        <FontAwesomeIcon icon={faCaretDown} />
      </DropdownIcon>
      <Helper>{helper}</Helper>
    </DropdownContainer>
  );
};

const DropdownContainer = styled.div`
  display: flex;
  width: 100%;
  box-sizing: border-box;
  flex-direction: column;
  position: relative;
  gap: 1rem;

  ${(props) =>
    props.$isDashboard &&
    `
		width: auto;
	`}
`;
const Label = styled.label`
  font-size: 1.3rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
const StyledDropdown = styled.select`
  appearance: none;
  display: flex;
  height: 3.5rem;
  padding: 0 1.5rem;
  vertical-align: auto;
  border: none;
  cursor: pointer;
  border-radius: 3rem;
  background: ${(props) => props.theme.primary};
  box-shadow: ${(props) => props.theme.shortShadow};
  font-size: 1rem;
  font-weight: 600;

  ${(props) =>
    props.$isDashboard &&
    `
    height: 2rem;
		width: 10rem;
    font-weight: 400;
	`}
  

  &:active {
    box-shadow: ${(props) => props.theme.pressedShadow};
  }
`;

const DropdownIcon = styled.span`
  position: absolute;
  background: transparent;
  border: none;
  top: 3.4rem;
  right: 1.5rem;
  font-size: 1.1rem;

  ${(props) =>
    props.$isDashboard &&
    `
    top: 1rem;
    right: 1rem;
	`}
`;

const Helper = styled.span`
  font-size: 0.9rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-align: left;
`;

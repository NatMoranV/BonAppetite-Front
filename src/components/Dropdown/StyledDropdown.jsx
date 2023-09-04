import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";


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
  visibleOption
}) => {
  const isDisabled = !array || !array.length;

  return (
    <DropdownContainer>
      <Label htmlFor={id}>{label}</Label>
      <StyledDropdown
        className={isDisabled ? "disabled" : ""}
        name={name}
        id={id}
        value={selectedValue}
        onChange={onChange}
        onBlur={onBlur}
      >
        {option1 && (<option value={option1}>{option1}</option>)}
        {array.map((item, index) => (
          <option key={index} value={item}>
            {visibleOption && visibleOption[index] ? visibleOption[index] : item}
          </option>
        ))}
      </StyledDropdown>
      <DropdownIcon>
        <FontAwesomeIcon icon={faCaretDown} />
      </DropdownIcon>
      <Helper>{helper}</Helper>
    </DropdownContainer>
  );
};

const DropdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  min-width: 25rem;
`;
const Label = styled.label`
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
const StyledDropdown = styled.select`
  appearance: none;
  display: flex;
  height: 4.5rem;
  padding: 0 2rem;
  vertical-align: auto;
  border: none;
  cursor: pointer;
  margin: 1rem 0;
  border-radius: 3rem;
  background: ${(props) => props.theme.primary};
  box-shadow: ${(props) => props.theme.shortShadow};
  font-size: 1rem;
  font-weight: 600;
  line-height: 3rem;

  &:active {
    box-shadow: ${(props) => props.theme.pressedShadow};
  }
  
`;

const DropdownIcon = styled.span`
  position: absolute;
  background: transparent;
  border: none;
  top: 3.5rem;
  right: 1.5rem;
  font-size: 1.1rem;
`;

const Helper = styled.span`
  font-size: 0.9rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-align: left;
`;
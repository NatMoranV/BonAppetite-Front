import styled from "styled-components";

export const ToggleButton = ({ isChecked, onChange, text }) => {
  return (
    <ToggleWrapper>
      <StyledText>{text}</StyledText>
      <ToggleInput type="checkbox" checked={isChecked} onChange={onChange} />
      <ToggleSlider $isChecked={isChecked} />
    </ToggleWrapper>
  );
};

const ToggleWrapper = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const ToggleInput = styled.input`
  display: none;
`;

const ToggleSlider = styled.span`
  cursor: pointer;
  width: 3rem;
  height: 1.2rem;
  padding: 0.3rem 0.4rem;
  background-color: ${(props) =>
    props.$isChecked ? "#57ae60" : props.theme.primary};
  box-shadow: ${(props) =>
    props.$isChecked
      ? "-2px -2px 4px 0px rgba(105, 254, 80, 0.75) inset, 2px 2px 4px 0px #479446 inset"
      : props.theme.pressedShadow};
  border-radius: 20px;
  display: inline-block;
  position: relative;
  transition: background-color 0.3s ease;

  &::after {
    content: "";
    width: 1.4rem;
    height: 1.4rem;
    background-color: white;
    box-shadow: ${(props) =>
      props.$isChecked
        ? "2px 2px 4px 0px rgba(71, 148, 70, 0.75), 4px 4px 8px 0px rgba(71, 148, 70, 0.25), -2px -2px 4px 0px rgba(105, 254, 80, 0.75), -4px -4px 8px 0px rgba(105, 254, 80, 0.25)"
        : props.theme.shortShadow};
    border-radius: 50%;
    position: absolute;
    top: 0.2rem;
    right: ${(props) => (props.$isChecked ? ".2rem" : "2.2rem")};
    transition: left 0.3s ease;
  }
`;

const StyledText = styled.span`

font-size: 1.5rem;
font-weight: 500;
margin-right: 1rem;

`
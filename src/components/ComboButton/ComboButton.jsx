import styled from "styled-components";

export const ComboButton = ({text1, onClick1, isActive1, text2, onClick2, isActive2}) => {
    return (

        <StyledComboButton>
            <TextButton className={"left"} text={text1} onClick={onClick1} isActive={isActive1}/>
            <TextButton className={"right"} text={text2} onClick={onClick2} isActive={isActive2}/>
        </StyledComboButton>

    )
}



const TextButton = ({
    onClick,
    text,
    isActive,
    className,
  }) => {
  
    return (
      <StyledTextButton
        onClick={onClick}
        className={isActive ? `${className} active` : className}
      >
  
  {text}
      </StyledTextButton>
    );
  };
  
  const StyledTextButton = styled.button`
    display: flex;
    align-items: center;
    gap: 1rem;
    width: fit-content;
    padding: 0rem 1.5rem;
    border: none;
    cursor: pointer;
    background: ${(props) => props.theme.primary};
    box-shadow: ${(props) => props.theme.shortShadow};
    justify-content: flex-start;
    font-size: 1rem;
    font-weight: 600;
    color: ${(props) => props.theme.text};
    white-space: nowrap;
    
    &.left.active {
      box-shadow: ${(props) => props.theme.pressedShadow};
      border-radius: 1rem 0 0 1rem;
    }
    &.right.active {
      box-shadow: ${(props) => props.theme.pressedShadow};
      border-radius: 0 1rem 1rem 0;
    }
    &.left{
        border-radius: 1rem 0 0 1rem;
    }
    &.right{
        border-radius: 0 1rem 1rem 0;
    }
  
    &:active {
      box-shadow: ${(props) => props.theme.pressedShadow};
    }
  
  `;


const StyledComboButton = styled.div`
display: flex;
width: fit-content;

`
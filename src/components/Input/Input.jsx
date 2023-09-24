/* eslint-disable react/prop-types */
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

export const Input = ({
  className,
  name,
  id,
  label,
  placeholder,
  type,
  icon1,
  icon2,
  helper,
  onClick1,
  onClick2,
  onChange,
  onBlur,
  value,
  onKeyDown,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const location = useLocation().pathname;

  const isForm = location.includes("/login/" || "/registry/" || "/recovery/" ) 


  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <InputContainer className={className}>
      {label && <Label>{label}</Label>}
      <InputField
        type={showPassword ? "text" : type}
        id={id}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
      />
      {onClick1 && (
        <Button onClick={onClick1}>
          <FontAwesomeIcon icon={icon1} />
        </Button>
      )}
      {onClick2 && (
        <Button2 onClick={onClick2}>
          <FontAwesomeIcon icon={icon2} />
        </Button2>
      )}
      {type === "password" && (
        <ShowPassword onClick={toggleShowPassword}>
          <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
        </ShowPassword>
      )}
        {helper && <Helper>{helper}</Helper>}
        {isForm && <Error $isError={error}>{error? error : 'aqui va el error'}</Error>}
    </InputContainer>
  );
};

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  position: relative;
  width: 100%;
  box-sizing: border-box;
  min-width: 10rem;
`;

const Label = styled.label`
  font-size: 1.3rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const InputField = styled.input`
  width: 100%;
  height: 2.5rem;
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

`;

const Helper = styled.span`
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-align: left;
`;
const Error = styled.span`
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-align: left;
  color: ${(props) => props.theme.error};
  opacity: 0;
  
  ${(props) => props.$isError&&`
  
  opacity: 1;

  `}`

const Button = styled.button`
  position: absolute;
  background: transparent;
  border: none;
  top: .4rem;
  right: 1rem;
  cursor: pointer;
  font-size: 1.1rem;
`;

const Button2 = styled.button`
  position: absolute;
  background: transparent;
  border: none;
  top: .4rem;
  right: 3rem;
  cursor: pointer;
  font-size: 1.1rem;
`;
const ShowPassword = styled.button`
  position: absolute;
  background: transparent;
  border: none;
  top: 2.9rem;
  right: 1rem;
  cursor: pointer;
  font-size: 1.1rem;
`;

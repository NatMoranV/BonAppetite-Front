import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setName } from "../../redux/actions";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { StyledInput } from "../Input/StyledInput";
import { styled } from "styled-components";

const ActionsContainer = styled.div`

display: flex;
padding: 3rem 19.3125rem;
flex-direction: column;
align-items: center;
gap: 2rem;
align-self: stretch;

`

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");

  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = () => {
    dispatch(setName(searchValue));
    onSearch(searchValue);
  };

  const handleClear = () => {
    setSearchValue("");
    onClearFilter();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <ActionsContainer>
      <StyledInput
        label={"Buscador"}
        placeholder={"Ex. Mexico / MEX "}
        type={"text"}
        helper={"Puedes buscar por nombre o código internacional (ISO)"}
        actionButton = {handleSearch}
        icono = {faSearch}
        onChange={handleInputChange}
        value={searchValue}
        onKeyDown={handleKeyDown}
      />
    </ActionsContainer>
  );
};

export default SearchBar;

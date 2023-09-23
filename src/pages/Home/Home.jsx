import {faFilter, faMagnifyingGlass, faSort } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { RecipesList } from "../../components/Recipes/RecipesList";
import { FamiliesSlider } from "../../components/FamiliesSlider/FamiliesSlider";
import { Input } from "../../components/Input/Input";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {  getFamilies, getMenu } from "../../redux/actions/actions";
import { Filters } from "../../components/FiltersSlider/FiltersSlider";
import { CircleButton } from "../../components/CircleButton/CircleButton";
import { RatingSelector } from '../../components/Rating/Rating'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Home = () => {
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [visibleSorters, setVisibleSorters] = useState(false)


  let mainMenu = useSelector((state) => state.filteredMaster);
  let mainFamilies = useSelector((state) => {
    state.families;
  });
  useEffect(() => {
    dispatch(getMenu());
    dispatch(getFamilies());
  }, [dispatch]);

  const handleSearch = (searchTerm) => {
    const { value } = event.target;
    setSearchTerm(value);
  };

 
  return (
    <StyledView>
      <FamiliesSlider mainFamilies={mainFamilies} />

      <SearchbarContainer>
        <SearchBar
          placeholder={"Buscar"}
          onChange={handleSearch}
		  icon1={faFilter}
          onClick1={() => setVisibleSorters(!visibleSorters)}
        />
      </SearchbarContainer>
      <Filters isVisible={visibleSorters}  />
      <RecipesList mainMenu={mainMenu} searchTerm={searchTerm} />
    </StyledView>
  );
};


const StyledView = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 4rem;
  justify-content: center;
  box-sizing: border-box;
`;

const SearchbarContainer = styled.div`
  display: flex;
  position: sticky;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
  top: 4rem;
  background-color: ${(props) => props.theme.primary};
  z-index: 4;
`;

const SearchBar = styled(Input)`
  width: 46rem;
  box-sizing: border-box;

  @media (max-width: 650px) {
    width: 100%;
  }
`;



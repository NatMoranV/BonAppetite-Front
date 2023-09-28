import { faArrowUp, faFilter } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CTAsContainer } from "../../components/CTAs/CTAsContainer";
import { CircleButton } from "../../components/CircleButton/CircleButton";
import { FamiliesSlider } from "../../components/FamiliesSlider/FamiliesSlider";
import { Filters } from "../../components/Filters/Filters";
import { FloatButton } from "../../components/FloatButton/FloatButton";
import { Input } from "../../components/Input/Input";
import { Loader } from "../../components/Modal/Loader";
import { Modal } from "../../components/Modal/Modal";
import { RecipesList } from "../../components/Recipes/RecipesList";
import { getFamilies, getMenu } from "../../redux/actions/actions";

export const Home = () => {
  const dispatch = useDispatch();
  const location = useLocation().pathname;
  const navigate = useNavigate();

  const [basketHasItems, setBasketHasItems] = useState(
    localStorage.basket?.length > 2 || false
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleSorters, setVisibleSorters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);

  const eventAdd = useSelector((state) => state.eventAdd);
  const userRole = useSelector((state) => state.userLogged);

  const master = useSelector((state) => state.master);

  useEffect(() => {
    dispatch(getMenu());
    dispatch(getFamilies());
  }, [dispatch]);

  useEffect(() => {
    if (master.length > 0) {
      setTimeout(() => {
        setLoading(false);
      }, 800);
    }
  }, [master]);

  useEffect(() => {
    const newBasketValue = localStorage.basket?.length > 2 || false;
    setBasketHasItems(newBasketValue);
  }, [eventAdd]);

  useEffect(() => {
    if (
      userRole.role !== "Manager" &&
      location === "/manager/" &&
      userRole.role !== "Admin" &&
      location === "/manager/"
    ) {
      navigate("/");
    }
  }, [navigate]);

  const handleSearch = (searchTerm) => {
    const { value } = event.target;
    setSearchTerm(value);
  };

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <StyledView>
          {modal && (
            <Modal
              onClose={() => {
                setModal(false);
              }}
              title={"Oops..."}
              msg="algo falló..."
              text1={"Recargar"}
              onClick1={() => {
                setModal(false);
                navigate("/");
              }}
            />
          )}
          <FloatButton
            icon={faArrowUp}
            onClick={scrollTop}
            basketHasItems={basketHasItems}
          />
          <FamiliesSlider />

          <SearchbarContainer>
            <SearchBar placeholder={"Buscar"} onChange={handleSearch} />
            <CircleButton
              icon={faFilter}
              onClick={() => setVisibleSorters(!visibleSorters)}
            />
          </SearchbarContainer>
          <Filters isVisible={visibleSorters} />
          <RecipesList searchTerm={searchTerm} />
          {basketHasItems && (
            <CTAsContainer
              className={"float"}
              text1={"Ver canasta"}
              onClick1={() => navigate("/customer/basket/")}
            />
          )}
        </StyledView>
      )}
    </>
  );
};

const StyledView = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 4rem 0 10rem 0;
  justify-content: center;
  box-sizing: border-box;
`;

const SearchbarContainer = styled.div`
  display: flex;
  position: sticky;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  gap: 1rem;
  top: 4rem;
  background-color: ${(props) => props.theme.primary};
  z-index: 2;
`;

const SearchBar = styled(Input)`
  width: 43rem;
  box-sizing: border-box;

  @media (max-width: 650px) {
    width: 90%;
  }
`;

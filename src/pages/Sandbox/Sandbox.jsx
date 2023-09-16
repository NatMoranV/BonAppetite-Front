import styled from "styled-components";
import { EditImageButton } from "../../components/EditImage/EditImage";

export const Sandbox = () => {
  return (
    <StyledView>
      <EditImageButton img={"https://res.cloudinary.com/bonappetit/image/upload/v1694817050/SI202202150586_news_bmdaln.jpg"}/>
      {/* <EditImageButton /> */}
    </StyledView>
  );
};

const StyledView = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 10rem auto;
  padding: 10vh 4vw 10vh;
  box-sizing: border-box;
  transition: width 0.3s ease-in-out;
  gap: 5rem;

  @media (min-width: 650px) {
    width: 30rem;
    padding: 15vh 0;
  }
`;

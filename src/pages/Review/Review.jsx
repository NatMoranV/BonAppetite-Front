import { styled } from "styled-components";
import { CTAsContainer } from "../../components/CTAs/CTAsContainer";
//import { menu } from "../../assets/mockedMenu";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { getDishById } from "../../redux/actions/actions";
import { DetailCard } from "../../components/Cards/DetailCard";
import { RatingSelector } from "../../components/Rating/Rating";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Input } from "../../components/Input/Input";

// import { addToBasket } from "../../redux/actions/actions";

export const ReviewPage = () => {
  let params = useParams();

  const [articlesArray, setArticlesArray] = useState([]);

  const order = async () => {
    let {orderId} = params
    const { data } = await axios
      .get(`https://resto-p4fa.onrender.com/order/103`)
      .catch((error) => alert(error));
console.log(data);

    const articles = data.OrderDetails.map((article) => {
      return {
        name: article.Product.description,
        id: article.id,
        image: article.Product.image,
        points: 0,
      };
    });
    setArticlesArray(articles);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    const arrQualification = articlesArray.map((article) => {
      return {
        idProduct: article.id,
        points: article.stars,
      };
    });
    const respuesta = { arrQualification: arrQualification };
    await axios
      .post(`http://localhost:3001/qualification/        `, respuesta)
      .then((response) => alert("formulario enviado con exito"))
      .catch((error) => alert(error));
  };

  const updateRating = (articleIndex, rating) => {
    setArticlesArray((prevArticlesArray) => {
      if (prevArticlesArray[articleIndex]) {
        const updatedArticles = [...prevArticlesArray];
        updatedArticles[articleIndex].points = rating;
        return updatedArticles;
      }
      return prevArticlesArray;
    });
  };

  
  useEffect(() => {
    order()
}, [params, setArticlesArray])

  return (
    <StyledView>
     {articlesArray.map((article) => 
      <>
      <DetailCard key={article.id} image={article.image} name={article.name} desc={article.description} price={article.price} updateRating={updateRating} />
     
      </>)}
<>
<CTAsContainer
        text1={"Enviar"}
        onClick1={null}
        text2={"Ahora no"}
        onClick2={null}
      />
	  <button onClick={ (e) => order()}>ok</button>
</>
    </StyledView>
  );
};

const StyledView = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  overflow-y: auto;
  padding: 10vh 1rem 10vh 1rem;
  box-sizing: border-box;
  transition: width 0.3s ease-in-out;
  gap: 5rem;

  @media (min-width: 650px) {
    width: 30rem;
    padding: 15vh 1rem;
  }
`;

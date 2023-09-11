import styled from 'styled-components'
import { Card } from '../Cards/Card'
// import { getMenu } from "../../redux/actions/actions";
import { useSelector } from 'react-redux'
// import { useEffect } from "react";
import translateMenuFromApi from '../../utils/translateMenuFromApi'

export const RecipesList = ({ searchTerm }) => {
	const menuAPI = useSelector((state) => state.filteredMaster)
	const menu = translateMenuFromApi(menuAPI)
	// const dispatch = useDispatch();
	// useEffect(() => {
	//   dispatch(getMenu());
	//   // eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [menu]);

	const filteredMenu = menu
		.map((family) => ({
			...family,
			recipes: family.recipes.filter((card) => card.name.toLowerCase().startsWith(searchTerm.toLowerCase())),
		}))
		.filter((family) => family.recipes.length > 0)

	console.log('filtered menu', filteredMenu)

	const isSearch = searchTerm.length > 0

	return (
		<RecipesContainer>
			{isSearch
				? filteredMenu.map((family) => (
						<FamiliesContainer key={family.id}>
							<h5 key={family.id}>{family.familyName}</h5>
							<CardsGrid>
								{family.recipes.map((card) => (
									<Card
										key={card.id}
										id={card.id}
										name={card.name}
										img={card.image}
										shortDesc={card.desc}
										time={card.time}
										price={card.price}
										rating={card.rating}
									/>
								))}
							</CardsGrid>
						</FamiliesContainer>
				  ))
				: menu.map((family) => (
						<FamiliesContainer key={family.id}>
							<h5 key={family.id}>{family.familyName}</h5>
							<CardsGrid>
								{family.recipes.map((card) => (
									<Card
										key={card.id}
										id={card.id}
										name={card.name}
										img={card.image}
										shortDesc={card.desc}
										time={card.time}
										price={card.price}
										rating={card.rating}
									/>
								))}
							</CardsGrid>
						</FamiliesContainer>
				  ))}
		</RecipesContainer>
	)
}

const RecipesContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	box-sizing: border-box;
	padding: 0 1rem;
`

const FamiliesContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: auto;
	width: 100%;
	box-sizing: border-box;
	margin: 1rem 0;
`

const CardsGrid = styled.div`
	width: 100%;
	margin: 1rem 0;
	display: grid;
	gap: 1rem;
	grid-auto-rows: auto;
	grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
`

const formatDataArticlesTable = (family) =>
  family.recipes.map((recipe) => ({
    image: recipe.image,
    family: family.familyName,
    name: recipe.name,
    price: recipe.price,
    time: recipe.time,
    desc: recipe.desc,
    isEditable: false,
  }));

export default formatDataArticlesTable;

function translateMenuFromApi(datos) {
  // Crear un mapa para almacenar los productos por familia
  const productosPorFamilia = new Map();

  datos.forEach((producto) => {
    const familia = producto.ProductClasses[0].class;
    if (!productosPorFamilia.has(familia)) {
      productosPorFamilia.set(familia, {
        id: producto.id,
        familyName: familia,
        familyImage: producto.ProductClasses[0].image,
        recipes: [],
      });
    }

    // Agregar el producto a la lista de recipes
    const productoTransformado = {
      id: producto.id,
      name: producto.name,
      stock: producto.stock,
      price: producto.price,
      time: parseInt(producto.time.split(":")[2]),
      desc: producto.description,
      image: producto.image,
    };

    productosPorFamilia.get(familia).recipes.push(productoTransformado);
  });

  return Array.from(productosPorFamilia.values());
}
export default translateMenuFromApi;

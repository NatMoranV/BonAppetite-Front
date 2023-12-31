function translateMenuFromApi(datos) {
	const productosPorFamilia = new Map()

	datos.forEach((producto) => {
		const familia = producto.ProductClasses[0]?.class

		if (familia) {
			if (!productosPorFamilia.has(familia)) {
				productosPorFamilia.set(familia, {
					id: producto.ProductClasses[0].id,
					enable: producto.ProductClasses[0].enable,
					familyName: familia,
					familyImage: producto.ProductClasses[0].image,
					recipes: [],
				})
			}

			const productoTransformado = {
				id: producto.id,
				name: producto.name,
				stock: producto.stock,
				price: producto.price,
				time: producto.time,
				desc: producto.description,
				image: producto.image,
				qualification: producto.qualification,
				enable: producto.enable,
			}

			productosPorFamilia.get(familia).recipes.push(productoTransformado)
		}
	})

	return Array.from(productosPorFamilia.values())
}

export default translateMenuFromApi

import { useEffect } from 'react'

const CloudinaryUploadWidget = () => {
	useEffect(() => {
		const cloudName = 'bonappetit'
		const uploadPreset = 'ml_default'

		const openUploadWidget = () => {
			const myWidget = window.cloudinary.createUploadWidget(
				{
					cloudName: cloudName,
					uploadPreset: uploadPreset,
					multiple: false,
					clientAllowedFormats: ['images'],
					maxImageFileSize: 2000000,
					maxImageWidth: 1000,
				},
				(error, result) => {
					if (!error && result && result.event === 'success') {
						console.log('¡Listo! Aquí tienes la información de la imagen: ', result.info)
						document.getElementById('uploadedimage').setAttribute('src', result.info.secure_url)
					}
				}
			)

			myWidget.open()
		}

		document.getElementById('upload_widget').addEventListener('click', openUploadWidget)

		return () => {
			document.getElementById('upload_widget').removeEventListener('click', openUploadWidget)
		}
	}, [])

	return (
		<button id="upload_widget" className="cloudinary-button">
			Upload
		</button>
	)
}

export default CloudinaryUploadWidget

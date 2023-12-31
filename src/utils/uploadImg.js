import axios from 'axios'

export const upload = async (image) => {
	const cloud_name = 'bonappetit'
	const formData = new FormData()
	formData.append('file', image)
	formData.append('upload_preset', 'ml_default')
	const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData)
	const imageURL = response.data.secure_url
	return imageURL
}

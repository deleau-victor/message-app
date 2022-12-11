import React, { ChangeEvent } from 'react'
import { ToastContainer } from 'react-toastify'
import { setAvatarRoute } from '../../utils/RoutesAPI'
import userIcon from '../../assets/images/icon/user-black.svg'
import getBase64 from '../../utils/GetBase64'
import axios from 'axios'
import getAuthToken from '../../utils/getAuthToken'

const SetAvatar = () => {
	const handleFiles = async (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.currentTarget.files![0]
		let bufferedImage = await getBase64(file)
		console.log(bufferedImage)

		let img = document.createElement('img')
		img.classList.add('object-cover')
		img.src = window.URL.createObjectURL(file)
		let label = event.target.previousSibling!
		label.childNodes[0].remove()
		label.appendChild(img)

		let authToken = await getAuthToken()

		const { data } = await axios.post(setAvatarRoute, {
			bufferedImage: bufferedImage,
			authToken,
		})
		console.log(data)
	}

	return (
		<>
			<label
				htmlFor="avatar"
				className="h-16 w-16 flex rounded-full overflow-hidden border border-black"
			>
				<img src={userIcon} alt="avatar utilisateur" className="object-cover" />
			</label>
			<input
				type="file"
				name="avatar"
				id="avatar"
				accept="image/png, image/jpeg"
				onChange={(event) => handleFiles(event)}
				className="hidden"
			/>
			<ToastContainer />
		</>
	)
}

export default SetAvatar

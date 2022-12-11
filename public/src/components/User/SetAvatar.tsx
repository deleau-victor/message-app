import React, { ChangeEvent, FC, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { setAvatarRoute } from '../../utils/RoutesAPI'
import userDefault from '../../assets/images/icon/user-default.svg'
import getBase64 from '../../utils/GetBase64'
import axios from 'axios'
import getAuthToken from '../../utils/getAuthToken'
import getFileFromBase64 from '../../utils/getFileFromBase64'

type Props = {
	isAvatarSet: boolean
	avatar: string
}

const SetAvatar: FC<Props> = ({ isAvatarSet, avatar }) => {
	const [isAvatarSend, setIsAvatarSend] = useState(true)

	const handleFiles = async (event: ChangeEvent<HTMLInputElement>) => {
		let label = event.target.previousSibling!

		// Recupération de l'image et transformation en base64
		const file = event.currentTarget.files![0]
		let bufferedImage = await getBase64(file)

		// Envoi de l'avatar
		let authToken = await getAuthToken()
		setIsAvatarSend(false)
		const { data } = await axios.post(setAvatarRoute, {
			bufferedImage: bufferedImage,
			authToken,
		})
		if (data.status) {
			setIsAvatarSend(true)
			let img = document.createElement('img')
			img.classList.add('object-cover')
			img.src = window.URL.createObjectURL(file)
			label.childNodes[0].remove()
			label.appendChild(img)
		} else {
			setIsAvatarSend(false)
		}
	}

	return (
		<>
			<label
				htmlFor="avatar"
				className="h-16 w-16 flex rounded-full overflow-hidden border border-black"
			>
				{' '}
				{!isAvatarSend ? (
					<div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin"></div>
				) : (
					<img
						src={
							isAvatarSet
								? window.URL.createObjectURL(
										getFileFromBase64(avatar, 'UserProfile'),
								  )
								: userDefault
						}
						alt="avatar utilisateur"
						className="object-cover"
					/>
				)}
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

import React, { ChangeEvent, FC, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { setAvatarRoute } from '../../utils/RoutesAPI'
import userDefault from '../../assets/images/icon/user-default.svg'
import getBase64 from '../../utils/GetBase64'
import axios from 'axios'
import getAuthToken from '../../utils/getAuthToken'
import getFileFromBase64 from '../../utils/getFileFromBase64'
import fetchUser from '../../hooks/fetchUser'
import { useUser } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { render } from 'react-dom'

type Props = {
	isAvatarSet: boolean
	avatar: string
}

const SetAvatar: FC<Props> = ({ isAvatarSet, avatar }) => {
	const [isAvatarSend, setIsAvatarSend] = useState(true)
	const { setUser } = useUser()!
	const navigate = useNavigate()

	const handleFiles = async (event: ChangeEvent<HTMLInputElement>) => {
		let label = event.target.parentNode!.childNodes[1]
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
			img.classList.add(`${isAvatarSend ? 'z-30' : 'z-60'}`)
			img.src = window.URL.createObjectURL(file)

			label.childNodes[1].remove()
			label.appendChild(img)
			fetchUser(navigate, setUser)
		} else {
			setIsAvatarSend(false)
		}
	}

	return (
		<>
			<label
				htmlFor="avatar"
				className="h-16 w-16 flex rounded-full overflow-hidden border border-black justify-center items-center relative"
			>
				<div
					className={`w-16 h-16 border-4 border-dashed rounded-full animate-spin absolute
						${isAvatarSend ? 'left-[300px]' : ''}`}
				></div>
				<img
					src={
						isAvatarSet
							? window.URL.createObjectURL(
									getFileFromBase64(avatar, 'UserProfile'),
							  )
							: userDefault
					}
					alt="avatar utilisateur"
					className={isAvatarSend ? '' : 'left-[300px]'}
				/>
			</label>
			<input
				type="file"
				name="avatar"
				id="avatar"
				accept="image/png, image/jpeg"
				onChange={(event) => handleFiles(event)}
				className="hidden"
			/>
			<label htmlFor="avatar" className="mt-4">
				Changer d'avatar
			</label>

			<ToastContainer />
		</>
	)
}

export default SetAvatar

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SetAvatar from '../components/User/SetAvatar'
import getAuthToken from '../utils/getAuthToken'
import getFileFromBase64 from '../utils/getFileFromBase64'
import { authentification, disconnectRoute } from '../utils/RoutesAPI'
import userDefault from '../assets/images/icon/user-default.svg'
import Button from '../components/UI/Button'
import { disconnect } from 'process'

type user = {
	firstName: string
	lastName: string
	email: string
	isAvatarImageSet: boolean
	avatarImage: string
}

const Inbox = () => {
	const navigate = useNavigate()
	const [user, setUser] = useState<user>()

	useEffect(() => {
		if (!localStorage.getItem('authToken')) {
			navigate('/login')
		}

		const fetchData = async () => {
			const authToken = await getAuthToken()
			const { data } = await axios.post(authentification, authToken)
			if (data.status) {
				setUser(data.user)
			}
		}
		fetchData()
	}, [])

	const disconnect = async () => {
		const authToken = await getAuthToken()
		const { data } = await axios.post(disconnectRoute, authToken)
		if (data.status) {
			localStorage.removeItem('authToken')
			navigate('/login')
		}
	}

	return (
		<div className="h-screen w-full justify-center items-center flex">
			{user ? (
				<>
					<div>Hello {user.firstName}</div>
					<SetAvatar
						avatar={user.avatarImage}
						isAvatarSet={user.isAvatarImageSet}
					></SetAvatar>
					<div className="h-16 w-16 rounded-full overflow-hidden border border-white flex">
						<img
							src={
								user.isAvatarImageSet
									? window.URL.createObjectURL(
											getFileFromBase64(user.avatarImage, 'UserProfile'),
									  )
									: userDefault
							}
							alt="user picture"
							className="object-cover"
						/>
					</div>
					<Button onClick={() => disconnect()}>Déconnexion</Button>
				</>
			) : (
				<div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin"></div>
			)}
		</div>
	)
}

export default Inbox

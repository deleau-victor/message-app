import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from './UI/Button'
import SetAvatar from './User/SetAvatar'
import UserAvatar from './User/UserAvatar'
import UserProfile from './User/UserProfile'
import { useUser } from '../context/UserContext'
import fetchUser from '../hooks/fetchUser'
import getAuthToken from '../utils/getAuthToken'
import { disconnectRoute } from '../utils/RoutesAPI'

const Homepage = () => {
	const { user, setUser } = useUser()!
	const navigate = useNavigate()
	const [isUserProfileOpen, setisUserProfileOpen] = useState<boolean>(false)

	useEffect(() => {
		fetchUser(navigate, setUser)
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
		<div className="h-screen w-full flex bg-[#272a37] text-white px-4 py-6 relative">
			{user ? (
				<>
					<UserProfile
						onClick={() => setisUserProfileOpen(false)}
						isUserProfileOpen={isUserProfileOpen}
					/>
					<div className="h-full rounded-3xl bg-secondary w-32 flex flex-col justify-between items-center py-8 ">
						<div className="font-bold">Hello {user.firstName}</div>
						{/* Profil */}
						<UserAvatar
							isAvatarImageSet={user.isAvatarImageSet}
							avatarImage={user.avatarImage}
							onClick={() => setisUserProfileOpen(true)}
						/>
					</div>

					<Button onClick={() => disconnect()}>Déconnexion</Button>
				</>
			) : (
				<div className="h-full w-full flex justify-center items-center">
					<div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin"></div>
				</div>
			)}
		</div>
	)
}

export default Homepage
